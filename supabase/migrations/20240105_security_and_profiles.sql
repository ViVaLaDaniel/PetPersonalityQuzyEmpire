-- Migration file: 20240105_security_and_profiles.sql

-- 1. Create Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Enable RLS on Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- 4. Auto-create Profile Trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, avatar_url)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists to avoid duplication errors on re-run
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 5. Fix Security on Existing Tables (STRICT RLS)

-- Community Posts
ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can create their own posts" ON community_posts;
CREATE POLICY "Users can create their own posts"
  ON community_posts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own posts" ON community_posts;
CREATE POLICY "Users can update their own posts"
  ON community_posts FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own posts" ON community_posts;
CREATE POLICY "Users can delete their own posts"
  ON community_posts FOR DELETE
  USING (auth.uid() = user_id);

-- Comments
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Authenticated users can comment" ON comments;
CREATE POLICY "Authenticated users can comment"
  ON comments FOR INSERT
  WITH CHECK (auth.role() = 'authenticated' AND auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own comments" ON comments;
CREATE POLICY "Users can delete their own comments"
  ON comments FOR DELETE
  USING (auth.uid() = user_id);

-- Likes
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Authenticated users can like" ON likes;
CREATE POLICY "Authenticated users can like"
  ON likes FOR INSERT
  WITH CHECK (auth.role() = 'authenticated' AND auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can unlike" ON likes;
CREATE POLICY "Users can unlike"
  ON likes FOR DELETE
  USING (auth.uid() = user_id);

-- 6. Grant usage on public schema (standard precaution)
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;
