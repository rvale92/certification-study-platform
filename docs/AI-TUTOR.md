# Authenticated AI study tutor

## Deployed backend

- Supabase project: `certification-study-platform` (`xxnpclhfoitbqjlvghyb`), existing Free-plan organization, `us-east-2`.
- Endpoint: `https://xxnpclhfoitbqjlvghyb.supabase.co/functions/v1/study-tutor`.
- Function: `study-tutor`; platform JWT verification **on**, plus an explicit `auth.getUser(access_token)` check inside the function.
- DeepSeek API: `https://api.deepseek.com/chat/completions`, OpenAI-compatible request format, model `deepseek-flash`, non-thinking mode, bounded output and 45-second provider deadline.
- Owner account was invited to the email supplied in chat. Its Auth UUID is configured in the server-only `ADMIN_USER_ID` secret. Neither client metadata nor a body `user_id`/admin flag grants privileges.

The backend and React frontend are deployed. The GitHub Pages release was verified against the local production bundle, and the live Tutor sign-in drawer and Supabase CORS connectivity were checked on desktop/mobile. Pages release commit: `bc5a85602921786732ff8071aa76c2b7deb86272`.

## Quota semantics

A regular account may submit **10 admitted prompt requests per UTC day**. Counts reset logically at midnight UTC because each user has a separate `(user_id, date)` row; no reset cron is required. Chat history sent with one prompt does not incur additional admissions.

The server reserves quota **before** contacting DeepSeek. Accepted attempts still count if the provider fails or times out; there are no automatic POST retries or refunds. Reading usage with GET is free. The owner admin bypasses the daily quota entirely, but normal authentication, input-size, output-size, and request-timeout protections still apply.

`public.user_usage` has a foreign key to `auth.users`, a composite primary key, a 0..10 constraint, and RLS. Signed-in clients can SELECT only their own rows; they cannot insert, update, delete, or call quota RPCs. Only the Edge Function's separate service-role client can execute:

- `get_tutor_usage(p_user_id uuid)`: read-only current UTC usage/reset timestamp.
- `reserve_tutor_question(p_user_id uuid)`: atomic INSERT/UPSERT, incrementing only while the locked row is below 10. Concurrent reservations cannot exceed 10.

Migration: `supabase/migrations/20261116000000_tutor_quota.sql`. Applied to the hosted project and recorded in its migration ledger as version `20261116000000`.

## Browser configuration and sign-in

`.env.local` is configured locally and gitignored. Only the **public** project URL and anon key are present there. See `.env.example`.

```sh
npm install
PORT=3001 npm start
```

Port 3001 avoids this Mac's Grafana on port 3000. The allowed CORS origins include this project's GitHub Pages origin and localhost/127.0.0.1 on ports 3000 and 3001. The Auth redirect allowlist includes the Pages path and local 3001 app path.

Open the floating **Tutor** button. Testers can create accounts and confirm email, then sign in with email/password. **Custom SMTP is not configured yet**: Supabase's default sender delivers Auth email only to authorized project-team addresses. External testers need custom SMTP (or an explicitly approved alternative email hook) before self-service email confirmation will work. Email confirmation remains enabled; do not disable it to work around mail delivery restrictions. The owner invitation was accepted by Supabase's mail API.

The drawer shows server-reported remaining quota and handles 429 responses/reset times. Admin sees **Unlimited prompts**. Invited users can use **Set sign-in password** after accepting their invitation; a password is never stored by this application outside Supabase Auth.

The chat transcript stays in memory and is cleared on sign-out/account switch. Pending responses are ignored after account changes. Responses are displayed as escaped text, not injected HTML. Quota refreshes at midnight and late GETs cannot overwrite newer prompt usage.

### Publishing the frontend

The existing deployment command is `npm run deploy`. It publishes the local CRA build to the repository's `gh-pages` branch. Review local changes, public assets, and the configured `.env.local` before publishing; **do not put a service-role or DeepSeek key in any browser variable**. The admin invitation points at the Pages app, so the new UI must be published before using that invitation there.

## Server secrets and redeployment

Hosted Supabase supplies `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY`. Additional secrets: `DEEPSEEK_API_KEY`, `DEEPSEEK_MODEL`, `ADMIN_USER_ID`, and `ALLOWED_ORIGINS`.

`supabase/.env.deploy` contains ignored non-provider deployment settings on this Mac. The DeepSeek key was provisioned directly from the existing host credential and is not written into source or frontend configuration. The generated database password is stored in macOS Keychain under service `certification-study-platform Supabase DB`, account equal to the project ref.

```sh
supabase link --project-ref xxnpclhfoitbqjlvghyb
# Future migrations only; the existing migration is already recorded as applied.
supabase db push
# Fill an ignored env file from supabase/functions/.env.example first.
supabase secrets set --project-ref xxnpclhfoitbqjlvghyb --env-file supabase/functions/.env
supabase functions deploy study-tutor --project-ref xxnpclhfoitbqjlvghyb --use-api
```

Do not use `--no-verify-jwt`. Do not reset the database or rerun CREATE TABLE manually on this deployed project.

## HTTP contract

Both methods require `Authorization: Bearer <user access token>` and the project's public key on `apikey`.

- `GET`: `{ "usage": { "isAdmin", "limit", "used", "remaining", "resetsAt" } }`.
- `POST`: `{ "prompt": "...", "history": [{"role":"user|assistant","content":"..."}] }`.
- Success: `{ "answer": "...", "usage": ... }`.
- Daily limit: HTTP 429, `code: DAILY_LIMIT_REACHED`, authoritative usage, and a `Retry-After` header.
- Admin usage: `isAdmin: true`; `limit`, `used`, and `remaining` are null.

Prompt limit 4,000 characters; history at most 10 messages/16,000 characters; JSON body at most 64 KiB. Clients cannot submit system-role messages or choose the upstream endpoint.

## Verification

```sh
CI=true npm test -- --watchAll=false --runInBand
npm run build
deno check supabase/functions/study-tutor/index.ts
deno test supabase/functions/study-tutor/core_test.ts supabase/functions/study-tutor/runtime_test.ts
```

SQL assertions in `supabase/tests/quota.sql` are intended for a **disposable** database. They test admissions 1..10, denial at 11, previous-day isolation/UTC reset, row-level read isolation, write/RPC denial, grants, and service-role execution. `bootstrap.sql` provides minimal roles/auth fixtures for standalone Postgres, **not** production.

Live verification on the new project additionally exercised a real DeepSeek answer, authenticated read-only usage, HTTP 429 at exhausted quota, forbidden client counter mutation, 25 concurrent real reservations admitting exactly 10, and an admin request with an exhausted fixture counter. Disposable test users were removed and the owner admin configuration restored and verified. No owner's quota was consumed.

The frontend tests mock Auth/network for deterministic UI checks; live backend checks used genuine temporary Supabase users and real provider calls. Browser smoke checks verified desktop/mobile sign-in drawer rendering without JS errors. Existing CRA dependencies still report npm audit findings; resolving the legacy build-tool dependency tree is separate maintenance.
