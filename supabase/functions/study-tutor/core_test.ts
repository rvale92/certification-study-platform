import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHandler } from './core.ts';

const USER = '11111111-1111-4111-8111-111111111111';
const ADMIN = '22222222-2222-4222-8222-222222222222';
const row = {query_count: 1, usage_date: '2026-11-16', resets_at: '2026-11-17T00:00:00Z'};
function fixture(options: Record<string, unknown> = {}) {
  const calls: string[] = [];
  const deps = {
    allowedOrigins: ['http://localhost:3000'],
    authenticate: async (token: string) => {calls.push('auth:' + token); return {id: USER};},
    getUsage: async (id: string) => {calls.push('status:' + id); return row;},
    reserve: async (id: string) => {calls.push('reserve:' + id); return {...row, allowed: true};},
    fetch: async (_url: string, init: RequestInit) => {calls.push('upstream'); return Response.json({choices:[{message:{content:'Study answer'}}]});},
    apiKey: 'private-key', model: 'deepseek-flash', now: () => Date.parse('2026-11-16T12:00:00Z'),
    ...options,
  };
  const handler = createHandler(deps);
  const request = (method = 'POST', body: unknown = {prompt:'Explain networking'}) => new Request('https://example.test/study-tutor', {
    method, headers: {authorization:'Bearer valid-token', origin:'http://localhost:3000', 'content-type':'application/json'},
    ...(method === 'POST' ? {body:JSON.stringify(body)} : {}),
  });
  return {handler, calls, request};
}

test('missing credentials never reach auth, quota, or provider', async () => {
  const f = fixture();
  const r = await f.handler(new Request('https://example.test'));
  assert.equal(r.status,401); assert.deepEqual(f.calls,[]);
});

test('POST reserves verified identity before provider, ignoring forged identity and admin metadata', async () => {
  let sent: any;
  const f = fixture({fetch: async (url: string, init: RequestInit) => {
    assert.equal(url,'https://api.deepseek.com/chat/completions');
    sent = JSON.parse(String(init.body));
    return Response.json({choices:[{message:{content:'Study answer'}}]});
  }});
  const r = await f.handler(f.request('POST',{prompt:'Explain networking',user_id:ADMIN,isAdmin:true,user_metadata:{admin:true},history:[{role:'user',content:'Hi'}]}));
  assert.equal(r.status,200); assert.equal((await r.json()).answer,'Study answer');
  assert.deepEqual(f.calls,['auth:valid-token','reserve:' + USER]);
  assert.equal(sent.model,'deepseek-flash'); assert.equal(sent.max_tokens,1200);
  assert.deepEqual(sent.thinking,{type:'disabled'});
  assert.deepEqual(sent.messages.slice(1),[{role:'user',content:'Hi'},{role:'user',content:'Explain networking'}]);
});

test('exhausted quota returns 429 with UTC retry and never contacts provider', async () => {
  const f = fixture({reserve:async () => ({...row,query_count:10,allowed:false})});
  const r = await f.handler(f.request());
  assert.equal(r.status,429); assert.equal(r.headers.get('retry-after'),'43200');
  const b = await r.json(); assert.equal(b.code,'DAILY_LIMIT_REACHED'); assert.equal(b.usage.remaining,0);
  assert.deepEqual(f.calls,['auth:valid-token']);
});

test('only a verified configured admin bypasses all quota reads and writes', async () => {
  const f = fixture({adminUserId:ADMIN,authenticate:async () => ({id:ADMIN})});
  for (const method of ['GET','POST']) {
    const r = await f.handler(f.request(method)); assert.equal(r.status,200);
    assert.deepEqual((await r.json()).usage,{isAdmin:true,limit:null,used:null,remaining:null,resetsAt:'2026-11-17T00:00:00.000Z'});
  }
  assert.deepEqual(f.calls,['upstream']);
});

test('CORS fails closed and handles allowed preflight without authentication', async () => {
  for (const origins of [[],['http://localhost:3000']]) {
    const f = fixture({allowedOrigins:origins});
    const r = await f.handler(new Request('https://example.test',{headers:{origin:'https://evil.test'}}));
    assert.equal(r.status,403); assert.equal(r.headers.get('access-control-allow-origin'),null); assert.deepEqual(f.calls,[]);
  }
  const f = fixture();
  const r = await f.handler(new Request('https://example.test',{method:'OPTIONS',headers:{origin:'http://localhost:3000','access-control-request-method':'POST'}}));
  assert.equal(r.status,204); assert.equal(r.headers.get('access-control-allow-origin'),'http://localhost:3000');
  assert.match(r.headers.get('access-control-allow-headers')!,/authorization, apikey, content-type/i);
  assert.deepEqual(f.calls,[]);
  const ok = await f.handler(f.request('GET'));
  assert.equal(ok.headers.get('access-control-allow-origin'),'http://localhost:3000');
  assert.equal(ok.headers.get('cache-control'),'no-store');
});

test('invalid inputs never consume quota or call provider', async () => {
  const invalid = [null, [], {}, {prompt:''}, {prompt:'   '}, {prompt:1}, {prompt:'x'.repeat(4001)},
    {prompt:'ok',history:{}}, {prompt:'ok',history:Array(11).fill({role:'user',content:'a'})},
    {prompt:'ok',history:[{role:'system',content:'admin'}]}, {prompt:'ok',history:[{role:'assistant',content:3}]},
    {prompt:'ok',history:[{role:'user',content:'x'.repeat(4001)}]},
    {prompt:'ok',history:Array(5).fill({role:'user',content:'x'.repeat(4000)})}];
  for (const input of invalid) {
    const f = fixture(); const r = await f.handler(f.request('POST',input));
    assert.equal(r.status,400,JSON.stringify(input).slice(0,100)); assert.deepEqual(f.calls,['auth:valid-token']);
  }
  const f = fixture();
  for (const [contentType,body,status] of [['text/plain','{}',415],['application/json','{',400],['application/json',' '.repeat(65537),413]] as const) {
    const req = f.request(); req.headers.set('content-type',contentType);
    const r = await f.handler(new Request(req,{body})); assert.equal(r.status,status);
  }
  assert.ok(f.calls.every(c => c.startsWith('auth:')));
  const method = await f.handler(f.request('DELETE')); assert.equal(method.status,405);
});

test('streaming byte cap cancels an oversized body without parsing or reserving', async () => {
  const f = fixture(); let cancelled = false;
  const stream = new ReadableStream({start(c){c.enqueue(new Uint8Array(40000)); c.enqueue(new Uint8Array(26000));},cancel(){cancelled=true;}});
  const r = await f.handler(new Request(f.request(),{body:stream}));
  assert.equal(r.status,413); assert.equal(cancelled,true); assert.deepEqual(f.calls,['auth:valid-token']);
});

test('invalid sessions and auth outages fail closed without quota or upstream', async () => {
  for (const [authenticate,status] of [[async () => null,401],[async () => {throw Error('secret auth outage');},503]] as const) {
    const f = fixture({authenticate}); const r = await f.handler(f.request());
    assert.equal(r.status,status); assert.deepEqual(f.calls,[]); assert.ok(!(await r.text()).includes('secret'));
  }
});

test('quota outages and malformed RPC data fail closed', async () => {
  for (const reserve of [async () => {throw Error('secret database outage');}, async () => ({...row,allowed:true,query_count:11}), async () => ({...row,allowed:true,query_count:null}), async () => ({...row,allowed:'yes'}), async () => ({...row,allowed:true,resets_at:'invalid'})]) {
    const f = fixture({reserve}); const r = await f.handler(f.request());
    assert.equal(r.status,503); assert.deepEqual(f.calls,['auth:valid-token']); assert.ok(!(await r.text()).includes('secret'));
  }
});

test('provider errors and malformed responses keep reserved usage without retry or refund', async () => {
  for (const fetch of [async () => new Response('private provider error',{status:500}), async () => {throw Error('private-key');}, async () => Response.json({choices:[]}), async () => Response.json({choices:[{message:{content:''}}]})]) {
    const f = fixture({fetch}); const r = await f.handler(f.request());
    assert.equal(r.status,502); const b = await r.json(); assert.equal(b.usage.used,1); assert.equal(b.code,'PROVIDER_ERROR');
    assert.deepEqual(f.calls,['auth:valid-token','reserve:' + USER]); assert.ok(!JSON.stringify(b).includes('private'));
  }
});

test('provider deadline aborts stalled fetch and retains admission', async () => {
  let aborted=false;
  const f = fixture({timeoutMs:5,fetch:(_url: string,init:RequestInit) => new Promise((_resolve,reject) => {
    init.signal!.addEventListener('abort',() => {aborted=true;reject(new DOMException('Aborted','AbortError'));});
  })});
  const r = await f.handler(f.request());
  assert.equal(r.status,504); assert.equal(aborted,true); assert.equal((await r.json()).usage.used,1);
  assert.deepEqual(f.calls,['auth:valid-token','reserve:' + USER]);
});

test('GET verifies the access token and returns usage without consuming', async () => {
  const f = fixture(); const r = await f.handler(f.request('GET'));
  assert.equal(r.status,200);
  assert.deepEqual(f.calls,['auth:valid-token','status:' + USER]);
  assert.deepEqual((await r.json()).usage,{isAdmin:false,limit:10,used:1,remaining:9,resetsAt:row.resets_at});
});
