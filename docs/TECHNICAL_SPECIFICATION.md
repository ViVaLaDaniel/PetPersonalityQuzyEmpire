# Technical Specification (ТЗ) — PawPersona Empire 2.0

**Objective:** Transform the MVP into a high-retention, viral entertainment platform.

## 1. Frontend & UX/UI Overhaul

### A. The "Swipe" Quiz Interface
*   **Goal:** Make taking quizzes feel like a game, not a form.
*   **Implementation:**
    *   Use `framer-motion` for Tinder-like card swiping.
    *   **Progress Bar:** Animated, pulsing to show progress.
    *   **Haptic Feedback:** Vibrate on mobile when selecting an answer.
    *   **Sound Effects:** Subtle "pop" or "click" sounds (optional, toggleable).

### B. Dynamic Result Pages (Viral Engine)
*   **Feature:** Dynamic Open Graph (OG) Images.
*   **Tech:** `next/og` (ImageResponse).
*   **Logic:** When a user shares `pawpersona.com/result/123`, the preview image on WhatsApp/Telegram/Twitter must generate on the fly showing *their* specific result name and avatar.

### C. Gamified User Profiles
*   **XP System:**
    *   +50 XP for taking a quiz.
    *   +10 XP for a like on a post.
    *   +100 XP for sharing a result.
*   **Ranks:**
    *   Lvl 1-5: "Stray"
    *   Lvl 5-10: "House Pet"
    *   Lvl 20+: "Empire Noble"
*   **Visuals:** Progress bar under the avatar in the Navbar.

---

## 2. Backend & Database (Supabase)

### A. New Tables
1.  `user_progress`: Tracks XP, Level, and Streak.
2.  `achievements`: Definitions of badges (e.g., "Quiz Master").
3.  `user_achievements`: Link table.
4.  `premium_subscriptions`: Tracks active status and tier.

### B. Logic Changes
*   **Quiz Results:** Store *every* submission anonymously first, then link to account if they sign up (Conversion optimization).
*   **Feed Algorithm:** Sort posts not just by `created_at` but by `(likes + comments) / time_decay` (Trending Algorithm).

---

## 3. Monetization Implementation

### A. Premium Gating
*   Create a generic `<PremiumGuard>` component.
*   Wrap "Deep Analysis" sections in this component.
*   If user is free -> Show blur effect + "Unlock" button.
*   If user is premium -> Show content.

---

## 4. Implementation Plan (Step-by-Step)

### Phase 1: The "Viral" Upgrade (Priority High)
1.  Implement `next/og` for dynamic social cards.
2.  Redesign Quiz UI to be "Swipeable" and animated.
3.  Add "Share" buttons that copy a smart link.

### Phase 2: Gamification (Retention)
1.  Create XP system database tables.
2.  Add "Level" indicator to Header and Profile.
3.  Add "Daily Streak" logic.

### Phase 3: Monetization (Revenue)
1.  Build the "Premium" landing page.
2.  Implement Stripe or LemonSqueezy integration.
3.  Lock "Deep Analytics" behind the paywall.
