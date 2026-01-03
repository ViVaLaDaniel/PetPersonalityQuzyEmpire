-- Add server-side validation using CHECK constraints
-- This ensures that even direct API calls cannot bypass validation rules

-- Constraints for Community Posts
ALTER TABLE community_posts
ADD CONSTRAINT title_length_check CHECK (char_length(title) >= 5 AND char_length(title) <= 100),
ADD CONSTRAINT content_length_check CHECK (char_length(content) >= 10 AND char_length(content) <= 2000);

-- Constraints for Comments
ALTER TABLE comments
ADD CONSTRAINT comment_content_length_check CHECK (char_length(content) >= 1 AND char_length(content) <= 500);

-- Backfill Profiles for existing users to prevent FK violations
INSERT INTO public.profiles (id, display_name, avatar_url)
SELECT
  id,
  COALESCE(raw_user_meta_data->>'full_name', raw_user_meta_data->>'name', split_part(email, '@', 1)),
  raw_user_meta_data->>'avatar_url'
FROM auth.users
WHERE id NOT IN (SELECT id FROM public.profiles);
