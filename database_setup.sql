-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 1. Create Role ENUM
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('superadmin', 'admin', 'peserta', 'penilai');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Create Profiles Table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role user_role DEFAULT 'peserta',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Innovations Table
CREATE TABLE IF NOT EXISTS public.innovations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  summary TEXT,
  business_value TEXT,
  status TEXT DEFAULT 'draft', -- 'draft', 'submitted', 'review', 'approved', 'rejected'
  ai_analysis JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.innovations ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies for `profiles`
-- Any registered user can view profiles (to see names/team)
CREATE POLICY "Profiles are viewable by authenticated users" 
ON public.profiles FOR SELECT TO authenticated USING (true);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

-- Superadmin can manage everything in profiles
CREATE POLICY "Superadmin full access profiles" 
ON public.profiles FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'superadmin')
);

-- 6. RLS Policies for `innovations`
-- Superadmin and Admin can do anything
CREATE POLICY "Superadmin and Admin full access innovations" 
ON public.innovations FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('superadmin', 'admin'))
);

-- Peserta can SELECT their own innovations
CREATE POLICY "Peserta can view own innovations" 
ON public.innovations FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- Peserta can INSERT their own innovations
CREATE POLICY "Peserta can insert own innovations" 
ON public.innovations FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Peserta can UPDATE their own draft/submitted innovations
CREATE POLICY "Peserta can update own innovations" 
ON public.innovations FOR UPDATE TO authenticated USING (auth.uid() = user_id AND status IN ('draft', 'submitted'));

-- Penilai can SELECT submitted/review/approved innovations (cannot see drafts)
CREATE POLICY "Penilai can view submitted innovations" 
ON public.innovations FOR SELECT TO authenticated USING (
  status != 'draft' AND 
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'penilai')
);

-- Public (Unauthenticated) CANNOT view anything unless explicitly given policy. (Implicitly denied).

-- 7. Trigger to auto-create profile when user registers
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    new.id, 
    new.email, 
    COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)), 
    COALESCE((new.raw_user_meta_data->>'role')::user_role, 'peserta'::user_role)
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- 8. SEED DATA (Dummy Users)
-- We insert directly to auth.users. The trigger will create their profiles.
DO $$
DECLARE
  super_id UUID := uuid_generate_v4();
  admin_id UUID := uuid_generate_v4();
  peserta_id UUID := uuid_generate_v4();
  penilai_id UUID := uuid_generate_v4();
  pwd_hash TEXT := crypt('password123', gen_salt('bf'));
BEGIN
  -- Insert Superadmin
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'superadmin@pegadaian.co.id') THEN
    INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at)
    VALUES (super_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'superadmin@pegadaian.co.id', pwd_hash, now(), '{"provider": "email", "providers": ["email"]}', '{"role": "superadmin", "full_name": "Wahyu Superadmin"}', now(), now());
  END IF;

  -- Insert Admin
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'admin@pegadaian.co.id') THEN
    INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at)
    VALUES (admin_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'admin@pegadaian.co.id', pwd_hash, now(), '{"provider": "email", "providers": ["email"]}', '{"role": "admin", "full_name": "Siti Admin CMS"}', now(), now());
  END IF;

  -- Insert Peserta
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'peserta@pegadaian.co.id') THEN
    INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at)
    VALUES (peserta_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'peserta@pegadaian.co.id', pwd_hash, now(), '{"provider": "email", "providers": ["email"]}', '{"role": "peserta", "full_name": "Budi Inovator"}', now(), now());
  END IF;

  -- Insert Penilai
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'penilai@pegadaian.co.id') THEN
    INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at)
    VALUES (penilai_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'penilai@pegadaian.co.id', pwd_hash, now(), '{"provider": "email", "providers": ["email"]}', '{"role": "penilai", "full_name": "Pak Juri Penilai"}', now(), now());
  END IF;
END $$;
