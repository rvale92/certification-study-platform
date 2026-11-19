import { createClient } from 'npm:@supabase/supabase-js@2.119.0';
import { createHandler } from './core.ts';
import { readConfig, createDependencies } from './runtime.ts';

// Configuration errors fail closed, without printing secret values.
let handler: (request:Request) => Promise<Response>;
try {
  handler = createHandler(createDependencies(readConfig(name => Deno.env.get(name)), createClient));
} catch {
  handler = async () => Response.json({error:'Tutor is not configured',code:'CONFIGURATION_ERROR'}, {status:503,headers:{'Cache-Control':'no-store'}});
}
Deno.serve(handler);
