'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { User, Mail, Calendar, Settings, Shield, Award, Edit3 } from 'lucide-react';
import { redirect } from 'next/navigation';
import EditProfileModal from '@/components/profile/EditProfileModal';
import { supabase } from '@/lib/supabase';

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading } = useProfile();
  const [isEditOpen, setIsEditOpen] = useState(false);
  // Force re-fetch profile logic could be implemented by adding a refetch function to useProfile
  // For now, we'll reload the page or rely on state update via callback if we had a global store.
  // A simple way is to pass a "refetch" trigger to the modal, or just reload window for simplicity in this iteration,
  // OR better: use SWR or React Query. Since we don't have those, we can use a key to force re-render or just assume profile updates eventually.
  // Actually, useProfile listens to useEffect on user. We can manually refetch if we expose it.

  // Let's implement a simple refresh trigger
  const [refreshKey, setRefreshKey] = useState(0);

  const handleUpdate = () => {
    setRefreshKey(prev => prev + 1);
    // Reload to ensure all data is fresh if simple state update isn't enough
    window.location.reload();
  };

  if (authLoading || profileLoading) {
     return <div className="min-h-screen flex items-center justify-center bg-[#0a0a0b] text-white">Loading...</div>;
  }

  if (!user) redirect('/');

  // Fallback values
  const displayName = profile?.display_name || user.email?.split('@')[0] || 'Anonymous';
  const bio = profile?.bio || 'No bio yet. Tell us about your pets!';
  const avatarUrl = profile?.avatar_url;

  return (
    <div className="container mx-auto px-6 py-12 pt-32">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-[3rem] p-8 md:p-12 mb-8 flex flex-col md:flex-row items-center gap-8 border border-white/10 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

          <div className="relative group cursor-pointer" onClick={() => setIsEditOpen(true)}>
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-1 shadow-2xl">
              <div className="w-full h-full rounded-full bg-[#0a0a0b] flex items-center justify-center overflow-hidden">
                {avatarUrl ? (
                    <img src={avatarUrl} alt={displayName} className="w-full h-full object-cover" />
                ) : (
                    <User size={64} className="text-white opacity-20" />
                )}
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-blue-500 p-3 rounded-2xl shadow-lg border-4 border-[#0a0a0b] group-hover:scale-110 transition-transform">
              <Edit3 size={20} className="text-white" />
            </div>
          </div>

          <div className="text-center md:text-left flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <span className="text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-2 block">Premium Member</span>
                    <h1 className="text-4xl font-black text-white italic tracking-tighter mb-2">
                    {displayName}
                    </h1>
                </div>
                <button
                    onClick={() => setIsEditOpen(true)}
                    className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
                >
                    Edit Profile
                </button>
            </div>

            <p className="text-gray-400 font-medium mb-6 max-w-lg mx-auto md:mx-0 leading-relaxed">
                {bio}
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <span className="flex items-center gap-2 text-gray-500 text-xs font-bold bg-white/5 px-4 py-2 rounded-xl">
                <Mail size={14} /> {user.email}
              </span>
              <span className="flex items-center gap-2 text-gray-500 text-xs font-bold bg-white/5 px-4 py-2 rounded-xl">
                <Calendar size={14} /> Joined {new Date(user.created_at || Date.now()).toLocaleDateString()}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Stats & Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {[
            { label: 'Quizzes Taken', val: '1', icon: <Award className="text-yellow-400" /> },
            { label: 'Rank', val: 'Pet Lover', icon: <Shield className="text-blue-400" /> },
            { label: 'Empire Points', val: '150', icon: <Award className="text-purple-400" /> },
          ].map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 rounded-[2rem] border border-white/5 text-center"
            >
              <div className="bg-white/5 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                {stat.icon}
              </div>
              <div className="text-3xl font-black text-white mb-1">{stat.val}</div>
              <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <EditProfileModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        profile={profile}
        onUpdate={handleUpdate}
      />
    </div>
  );
}
