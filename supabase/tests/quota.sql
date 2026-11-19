-- Run after migration on a disposable Supabase DB, as postgres. Rolls back fixtures.
\set ON_ERROR_STOP on
BEGIN;
INSERT INTO auth.users(id) VALUES ('11111111-1111-4111-8111-111111111111'), ('22222222-2222-4222-8222-222222222222');
DO $$
DECLARE r record; i integer; today date := (statement_timestamp() AT TIME ZONE 'UTC')::date;
BEGIN
  SELECT * INTO r FROM public.get_tutor_usage('11111111-1111-4111-8111-111111111111');
  ASSERT r.query_count = 0 AND r.usage_date = today, 'status starts at zero';
  ASSERT NOT EXISTS(SELECT 1 FROM public.user_usage), 'status does not mutate';
  ASSERT r.resets_at = ((today + 1)::timestamp AT TIME ZONE 'UTC'), 'reset UTC';
  FOR i IN 1..10 LOOP
    SELECT * INTO r FROM public.reserve_tutor_question('11111111-1111-4111-8111-111111111111');
    ASSERT r.allowed AND r.query_count = i, 'each admission increments';
  END LOOP;
  SELECT * INTO r FROM public.reserve_tutor_question('11111111-1111-4111-8111-111111111111');
  ASSERT NOT r.allowed AND r.query_count = 10, 'eleventh rejected';
  ASSERT (SELECT query_count FROM public.user_usage WHERE user_id = '11111111-1111-4111-8111-111111111111' AND date=today) = 10;
  INSERT INTO public.user_usage VALUES ('22222222-2222-4222-8222-222222222222',today-1,10);
  SELECT * INTO r FROM public.get_tutor_usage('22222222-2222-4222-8222-222222222222');
  ASSERT r.query_count = 0, 'previous UTC day does not consume today';
  ASSERT NOT has_table_privilege('anon','public.user_usage','SELECT');
  ASSERT has_table_privilege('authenticated','public.user_usage','SELECT');
  ASSERT NOT has_table_privilege('authenticated','public.user_usage','INSERT,UPDATE,DELETE');
  ASSERT NOT has_function_privilege('anon','public.reserve_tutor_question(uuid)','EXECUTE');
  ASSERT NOT has_function_privilege('authenticated','public.reserve_tutor_question(uuid)','EXECUTE');
  ASSERT NOT has_function_privilege('anon','public.get_tutor_usage(uuid)','EXECUTE');
  ASSERT NOT has_function_privilege('authenticated','public.get_tutor_usage(uuid)','EXECUTE');
  ASSERT has_function_privilege('service_role','public.reserve_tutor_question(uuid)','EXECUTE');
  ASSERT has_function_privilege('service_role','public.get_tutor_usage(uuid)','EXECUTE');
  BEGIN
    UPDATE public.user_usage SET query_count=11 WHERE user_id='11111111-1111-4111-8111-111111111111';
    RAISE EXCEPTION 'count constraint missing';
  EXCEPTION WHEN check_violation THEN NULL; END;
  BEGIN
    PERFORM public.reserve_tutor_question(NULL);
    RAISE EXCEPTION 'null identity accepted';
  EXCEPTION WHEN not_null_violation THEN NULL; END;
END $$;
SET LOCAL ROLE authenticated;
SELECT set_config('request.jwt.claim.sub','11111111-1111-4111-8111-111111111111',true);
DO $$ BEGIN
  ASSERT (SELECT count(*) FROM public.user_usage)=1, 'RLS only own rows';
  BEGIN
    INSERT INTO public.user_usage VALUES ('11111111-1111-4111-8111-111111111111','2000-01-01',1);
    RAISE EXCEPTION 'client write permitted';
  EXCEPTION WHEN insufficient_privilege THEN NULL; END;
  BEGIN
    PERFORM public.reserve_tutor_question('11111111-1111-4111-8111-111111111111');
    RAISE EXCEPTION 'client RPC permitted';
  EXCEPTION WHEN insufficient_privilege THEN NULL; END;
END $$;
RESET ROLE;
SET LOCAL ROLE service_role;
DO $$ DECLARE r record; BEGIN
  SELECT * INTO r FROM public.reserve_tutor_question('22222222-2222-4222-8222-222222222222');
  ASSERT r.allowed AND r.query_count=1, 'service invoker can reserve';
END $$;
RESET ROLE;
ROLLBACK;
