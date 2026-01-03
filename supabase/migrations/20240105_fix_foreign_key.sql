-- Migration to add Foreign Key for PostgREST join
-- This allows us to select profiles via community_posts

ALTER TABLE community_posts
DROP CONSTRAINT IF EXISTS community_posts_user_id_fkey, -- Drop old FK to auth.users if needed, or keep it.
-- Actually, we can have multiple FKs, but for PostgREST detection we need one to profiles.
-- However, user_id is currently referencing auth.users.
-- We can add a second FK or change it.
-- Changing it is safer for consistency: user_id points to profiles(id) which points to auth.users(id).

ADD CONSTRAINT community_posts_user_id_profiles_fkey
FOREIGN KEY (user_id)
REFERENCES public.profiles(id)
ON DELETE CASCADE;

-- Do the same for comments and likes to enable fetching author info there too
ALTER TABLE comments
ADD CONSTRAINT comments_user_id_profiles_fkey
FOREIGN KEY (user_id)
REFERENCES public.profiles(id)
ON DELETE CASCADE;

ALTER TABLE likes
ADD CONSTRAINT likes_user_id_profiles_fkey
FOREIGN KEY (user_id)
REFERENCES public.profiles(id)
ON DELETE CASCADE;
