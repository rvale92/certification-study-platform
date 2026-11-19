import type { Dependencies, UsageRow, Reservation } from './core.ts';

export interface Config {
  supabaseUrl: string;
  anonKey: string;
  serviceKey: string;
  apiKey: string;
  model: string;
  adminUserId?: string;
  allowedOrigins: string[];
}
export function readConfig(env: (name: string) => string | undefined): Config {
  const required = (name: string) => {
    const value = env(name)?.trim();
    if (!value) throw new Error(`Missing server configuration: ${name}`);
    return value;
  };
  const supabaseUrl = required('SUPABASE_URL');
  if (new URL(supabaseUrl).protocol !== 'https:' && !['localhost','127.0.0.1','kong'].includes(new URL(supabaseUrl).hostname)) throw new Error('Supabase HTTPS required');
  const adminUserId = env('ADMIN_USER_ID')?.trim() || undefined;
  if (adminUserId && !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(adminUserId)) throw new Error('Invalid ADMIN_USER_ID');
  const allowedOrigins = (env('ALLOWED_ORIGINS') || '').split(',').map(s => s.trim()).filter(Boolean);
  for (const origin of allowedOrigins) {
    const u = new URL(origin);
    if (u.origin !== origin || (u.protocol !== 'https:' && !(u.protocol === 'http:' && ['localhost','127.0.0.1'].includes(u.hostname)))) throw new Error('Invalid allowed origin');
  }
  const model = env('DEEPSEEK_MODEL')?.trim() || 'deepseek-flash';
  if (!/^[a-zA-Z0-9_-]{1,100}$/.test(model)) throw new Error('Invalid model');
  return {supabaseUrl, anonKey:required('SUPABASE_ANON_KEY'),serviceKey:required('SUPABASE_SERVICE_ROLE_KEY'),apiKey:required('DEEPSEEK_API_KEY'),adminUserId,allowedOrigins,model};
}
interface Client {
  auth: {getUser(token: string): Promise<{data:{user:{id:string} | null};error:unknown}>};
  rpc(name:string,args:{p_user_id:string}):PromiseLike<{data:unknown;error:unknown}>;
}
type ClientFactory = (url:string,key:string,options:{auth:{persistSession:boolean;autoRefreshToken:boolean;detectSessionInUrl:boolean}}) => Client;
export function createDependencies(config:Config,createClient:ClientFactory):Dependencies {
  const options={auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false}};
  const verifier=createClient(config.supabaseUrl,config.anonKey,options);
  // Never attach the caller's Authorization header to the privileged client.
  const admin=createClient(config.supabaseUrl,config.serviceKey,options);
  async function rpc<T>(name:string,id:string):Promise<T> {
    const {data,error}=await admin.rpc(name,{p_user_id:id});
    if (error || !Array.isArray(data) || data.length!==1) throw new Error('Quota unavailable');
    return data[0] as T;
  }
  return {
    authenticate:async token => {
      const {data,error}=await verifier.auth.getUser(token);
      if (error) {
        const status=(error as {status?:number}).status;
        if (status===400 || status===401 || status===403) return null;
        throw new Error('Authentication unavailable');
      }
      return data.user ? {id:data.user.id} : null;
    },
    getUsage:id => rpc<UsageRow>('get_tutor_usage',id),
    reserve:id => rpc<Reservation>('reserve_tutor_question',id),
    allowedOrigins:config.allowedOrigins,adminUserId:config.adminUserId,apiKey:config.apiKey,model:config.model,
    fetch:(url,init) => fetch(url,init),
  };
}
