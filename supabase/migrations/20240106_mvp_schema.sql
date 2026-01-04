-- Phase 1: MVP Schema Extension

-- 1. Newsletter Subscribers
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Analytics Events
CREATE TABLE IF NOT EXISTS public.analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. User Progress (Gamification)
CREATE TABLE IF NOT EXISTS public.user_progress (
  user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  streak INTEGER DEFAULT 0,
  last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Achievements Definitions
CREATE TABLE IF NOT EXISTS public.achievements (
  id TEXT PRIMARY KEY, -- human readable ID like 'quiz-master'
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_url TEXT,
  xp_reward INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. User Achievements (Link table)
CREATE TABLE IF NOT EXISTS public.user_achievements (
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  achievement_id TEXT REFERENCES public.achievements(id) ON DELETE CASCADE,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (user_id, achievement_id)
);

-- 6. Premium Subscriptions
CREATE TABLE IF NOT EXISTS public.premium_subscriptions (
  user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  plan_tier TEXT DEFAULT 'free', -- 'free', 'premium', 'ultra'
  status TEXT DEFAULT 'inactive', -- 'active', 'canceled', 'past_due'
  current_period_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.premium_subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Newsletter: Anyone can subscribe, only admin can view (basic for now)
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON public.newsletter_subscribers;
CREATE POLICY "Anyone can subscribe to newsletter" ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);

-- Analytics: Authenticated users can insert their own events
DROP POLICY IF EXISTS "Users can log their own events" ON public.analytics_events;
CREATE POLICY "Users can log their own events" ON public.analytics_events FOR INSERT WITH CHECK (auth.uid() = user_id);

-- User Progress: Publicly viewable, only system/user can update (logic usually in edge functions or RPC)
DROP POLICY IF EXISTS "Public progress viewable" ON public.user_progress;
CREATE POLICY "Public progress viewable" ON public.user_progress FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can update their own progress" ON public.user_progress;
CREATE POLICY "Users can update their own progress" ON public.user_progress FOR UPDATE USING (auth.uid() = user_id);

-- Achievements: Publicly viewable
DROP POLICY IF EXISTS "Achievements viewable by all" ON public.achievements;
CREATE POLICY "Achievements viewable by all" ON public.achievements FOR SELECT USING (true);

-- User Achievements: Publicly viewable
DROP POLICY IF EXISTS "User achievements viewable by all" ON public.user_achievements;
CREATE POLICY "User achievements viewable by all" ON public.user_achievements FOR SELECT USING (true);

-- Premium Subscriptions: Views only for the user
DROP POLICY IF EXISTS "Users can view their own subscription" ON public.premium_subscriptions;
CREATE POLICY "Users can view their own subscription" ON public.premium_subscriptions FOR SELECT USING (auth.uid() = user_id);

-- Create trigger for auto-creating user_progress
CREATE OR REPLACE FUNCTION public.handle_new_user_progress()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_progress (user_id)
  VALUES (new.id);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_profile_created_create_progress ON public.profiles;
CREATE TRIGGER on_profile_created_create_progress
  AFTER INSERT ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user_progress();

-- Backfill user_progress for existing profiles
INSERT INTO public.user_progress (user_id)
SELECT id FROM public.profiles
WHERE id NOT IN (SELECT user_id FROM public.user_progress)
ON CONFLICT (user_id) DO NOTHING;

-- Grant permissions
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT INSERT ON public.newsletter_subscribers TO anon, authenticated;
GRANT INSERT ON public.analytics_events TO authenticated;
GRANT UPDATE ON public.user_progress TO authenticated;
