-- ==============================================================================
-- VELVET SECURITY HARDENING MIGRATION
-- Run this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/nvzszrsdowacqmddymev/sql
-- ==============================================================================

-- 1. Fix Security Definer search_path mutable warning (Supabase Linter 0011)
ALTER FUNCTION public.handle_new_user() SET search_path = public, pg_temp;

-- 2. Freeze sensitive columns on public.profiles to prevent standard users from
-- escalating their role to 'admin' or modifying their 'selected_plan_tier' (Check 3.2)
CREATE OR REPLACE FUNCTION public.protect_profile_roles()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  -- Prevent non-admin clients from modifying role or selected_plan_tier
  IF (OLD.role IS DISTINCT FROM NEW.role) OR 
     (OLD.selected_plan_tier IS DISTINCT FROM NEW.selected_plan_tier) THEN
    -- Only allow service_role or postgres (admin backend) to update these fields
    IF (SELECT current_setting('role', true)) NOT IN ('service_role', 'postgres', 'supabase_admin') THEN
      RAISE EXCEPTION 'Access Denied: Standard users cannot alter profile role or subscription tier.';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS tr_protect_profile_roles ON public.profiles;
CREATE TRIGGER tr_protect_profile_roles
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.protect_profile_roles();

-- 3. Strict Row Level Security on public.project_licenses (Check 3.1 & Check 4.5)
-- Ensures users can only view and register licenses bound to their own auth.uid()
ALTER TABLE public.project_licenses ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "project_licenses_insert_entitled" ON public.project_licenses;
DROP POLICY IF EXISTS "customers read their own licences" ON public.project_licenses;
DROP POLICY IF EXISTS "project_licenses_select_own" ON public.project_licenses;
DROP POLICY IF EXISTS "project_licenses_insert_own" ON public.project_licenses;

GRANT SELECT, INSERT ON TABLE public.project_licenses TO authenticated;

CREATE POLICY "project_licenses_select_own"
ON public.project_licenses FOR SELECT TO authenticated
USING (user_id = (SELECT auth.uid()));

CREATE POLICY "project_licenses_insert_own"
ON public.project_licenses FOR INSERT TO authenticated
WITH CHECK (user_id = (SELECT auth.uid()));
