import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readConfig, createDependencies} from './runtime.ts';
const base = {SUPABASE_URL:'https://project.supabase.co',SUPABASE_ANON_KEY:'public',SUPABASE_SERVICE_ROLE_KEY:'service',DEEPSEEK_API_KEY:'private'};

test('configuration requires server secrets and rejects invalid admin UUID; empty origins fail closed', () => {
  assert.throws(() => readConfig(() => undefined));
  assert.throws(() => readConfig(k => ({...base,ADMIN_USER_ID:'not-a-uuid'} as Record<string,string>)[k]));
  const config = readConfig(k => (base as Record<string,string>)[k]);
  assert.deepEqual(config.allowedOrigins,[]); assert.equal(config.adminUserId,undefined);
  assert.equal(config.model,'deepseek-flash');
  const custom = readConfig(k => ({...base,ALLOWED_ORIGINS:'https://example.com, http://localhost:3000'} as Record<string,string>)[k]);
  assert.deepEqual(custom.allowedOrigins,['https://example.com','http://localhost:3000']);
  for (const origin of ['*','https://example.com/path','null','http://example.com','https://example.com/']) {
    assert.throws(() => readConfig(k => ({...base,ALLOWED_ORIGINS:origin} as Record<string,string>)[k]));
  }
});

test('adapter sends explicit token to getUser and only service role invokes fixed RPC names', async () => {
  const calls: unknown[] = [];
  const config = readConfig(k => (base as Record<string,string>)[k]);
  const deps = createDependencies(config,(_url:string,key:string,options:unknown) => {
    calls.push(['client',key,options]);
    return {auth:{getUser:async (token:string) => {calls.push(['auth',key,token]);return {data:{user:{id:'verified'}},error:null};}},
      rpc:(name:string,args:unknown) => {calls.push(['rpc',key,name,args]); return Promise.resolve({data:[{query_count:0,usage_date:'2026-11-16',resets_at:'2026-11-17T00:00:00Z'}],error:null});}};
  });
  await deps.authenticate('explicit-access-token');
  assert.ok(!calls.some(c => Array.isArray(c) && c[0] === 'rpc'));
  await deps.getUsage('verified'); await deps.reserve('verified');
  assert.ok(calls.some(c => JSON.stringify(c) === JSON.stringify(['auth','public','explicit-access-token'])));
  assert.ok(calls.some(c => JSON.stringify(c) === JSON.stringify(['rpc','service','get_tutor_usage',{p_user_id:'verified'}])));
  assert.ok(calls.some(c => JSON.stringify(c) === JSON.stringify(['rpc','service','reserve_tutor_question',{p_user_id:'verified'}])));
});
