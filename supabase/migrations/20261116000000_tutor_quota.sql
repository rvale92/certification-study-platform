-- Fixed daily quota: only the Edge Function's service role can reserve.
CREATE TABLE public.user_usage (
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date date NOT NULL,
  query_count integer NOT NULL CHECK (query_count BETWEEN 0 AND 10),
  PRIMARY KEY (user_id, date)
);
ALTER TABLE public.user_usage ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.user_usage FROM PUBLIC, anon, authenticated;
GRANT SELECT ON TABLE public.user_usage TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.user_usage TO service_role;
CREATE POLICY user_usage_select_own ON public.user_usage FOR SELECT TO authenticated
  USING ((SELECT auth.uid()) = user_id);

CREATE FUNCTION public.get_tutor_usage(p_user_id uuid)
RETURNS TABLE(query_count integer, usage_date date, resets_at timestamptz)
LANGUAGE plpgsql SECURITY INVOKER SET search_path = pg_catalog, public AS $$
DECLARE v_date date := (statement_timestamp() AT TIME ZONE 'UTC')::date;
BEGIN
  IF p_user_id IS NULL THEN
    RAISE EXCEPTION 'user id is required' USING ERRCODE = '23502';
  END IF;
  RETURN QUERY SELECT coalesce((SELECT u.query_count FROM public.user_usage AS u
    WHERE u.user_id = p_user_id AND u.date = v_date), 0),
    v_date, ((v_date + 1)::timestamp AT TIME ZONE 'UTC');
END;
$$;

CREATE FUNCTION public.reserve_tutor_question(p_user_id uuid)
RETURNS TABLE(allowed boolean, query_count integer, usage_date date, resets_at timestamptz)
LANGUAGE plpgsql SECURITY INVOKER SET search_path = pg_catalog, public AS $$
DECLARE
  v_date date := (statement_timestamp() AT TIME ZONE 'UTC')::date;
  v_count integer;
  v_allowed boolean;
BEGIN
  -- The unique index serializes competing reservations, with the limit checked
  -- against the locked current row (not a race-prone SELECT before UPDATE).
  INSERT INTO public.user_usage AS u (user_id, date, query_count)
  VALUES (p_user_id, v_date, 1)
  ON CONFLICT (user_id, date) DO UPDATE
    SET query_count = u.query_count + 1 WHERE u.query_count < 10
  RETURNING u.query_count INTO v_count;
  v_allowed := FOUND;
  IF NOT v_allowed THEN
    SELECT u.query_count INTO v_count FROM public.user_usage AS u
      WHERE u.user_id = p_user_id AND u.date = v_date;
  END IF;
  RETURN QUERY SELECT v_allowed, v_count, v_date,
    ((v_date + 1)::timestamp AT TIME ZONE 'UTC');
END;
$$;

REVOKE ALL ON FUNCTION public.get_tutor_usage(uuid) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.reserve_tutor_question(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_tutor_usage(uuid) TO service_role;
GRANT EXECUTE ON FUNCTION public.reserve_tutor_question(uuid) TO service_role;
