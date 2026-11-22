-- DentXpert research workspace: initial user-owned data model.
-- Review and apply with an authorized InsForge admin using a versioned migration.
-- Never run admin SQL from browser JavaScript.
-- No patient records, dental images, or medical diagnoses are stored here.
BEGIN;
CREATE TABLE IF NOT EXISTS public.dx_workspace_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  kind text NOT NULL CHECK (kind IN ('task','note')),
  title text NOT NULL CHECK (char_length(title) BETWEEN 1 AND 160),
  body text NOT NULL DEFAULT '' CHECK (char_length(body) <= 10000),
  stage text NOT NULL DEFAULT 'todo' CHECK (stage IN ('todo','doing','done')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS dx_workspace_items_owner_updated_idx
 ON public.dx_workspace_items(user_id, updated_at DESC);
ALTER TABLE public.dx_workspace_items ENABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.dx_workspace_items TO authenticated;
REVOKE ALL ON public.dx_workspace_items FROM anon;
DROP POLICY IF EXISTS dx_workspace_owner_select ON public.dx_workspace_items;
DROP POLICY IF EXISTS dx_workspace_owner_insert ON public.dx_workspace_items;
DROP POLICY IF EXISTS dx_workspace_owner_update ON public.dx_workspace_items;
DROP POLICY IF EXISTS dx_workspace_owner_delete ON public.dx_workspace_items;
CREATE POLICY dx_workspace_owner_select ON public.dx_workspace_items
 FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY dx_workspace_owner_insert ON public.dx_workspace_items
 FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY dx_workspace_owner_update ON public.dx_workspace_items
 FOR UPDATE TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY dx_workspace_owner_delete ON public.dx_workspace_items
 FOR DELETE TO authenticated USING (user_id = auth.uid());
COMMIT;
