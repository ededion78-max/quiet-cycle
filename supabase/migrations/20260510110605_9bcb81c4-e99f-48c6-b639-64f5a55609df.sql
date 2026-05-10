
-- Profiles
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own profile select" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "own profile insert" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "own profile update" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Cycle data backups (full app data as JSONB)
CREATE TABLE public.cycle_backups (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.cycle_backups ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own backup select" ON public.cycle_backups FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "own backup insert" ON public.cycle_backups FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own backup update" ON public.cycle_backups FOR UPDATE USING (auth.uid() = user_id);

-- Partner shares
CREATE TABLE public.partner_shares (
  code TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (now() + INTERVAL '30 days')
);
ALTER TABLE public.partner_shares ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner manage shares" ON public.partner_shares FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- Anyone authenticated can look up a share code (then read backup via SECURITY DEFINER fn)
CREATE POLICY "auth read shares" ON public.partner_shares FOR SELECT TO authenticated USING (true);

-- Function to read partner data via a code
CREATE OR REPLACE FUNCTION public.get_partner_data(_code TEXT)
RETURNS JSONB
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _uid UUID;
  _data JSONB;
BEGIN
  SELECT user_id INTO _uid FROM public.partner_shares
   WHERE code = _code AND expires_at > now();
  IF _uid IS NULL THEN
    RETURN NULL;
  END IF;
  SELECT data INTO _data FROM public.cycle_backups WHERE user_id = _uid;
  RETURN _data;
END;
$$;

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)));
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
