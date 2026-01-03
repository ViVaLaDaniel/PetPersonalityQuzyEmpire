'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { User, Mail, Calendar, Settings, Shield, Award } from 'lucide-react';
import { redirect } from 'next/navigation';

export default function ProfilePage() {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) redirect('/');

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-[3rem] p-8 md:p-12 mb-8 flex flex-col md:flex-row items-center gap-8 border border-white/10"
        >
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-1 shadow-2xl">
              <div className="w-full h-full rounded-full bg-[#0a0a0b] flex items-center justify-center">
                <User size={64} className="text-white opacity-20" />
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-blue-500 p-3 rounded-2xl shadow-lg border-4 border-[#0a0a0b]">
              <Settings size={20} className="text-white" />
            </div>
          </div>

          <div className="text-center md:text-left">
            <span className="text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-2 block">Premium Member</span>
            <h1 className="text-4xl font-black text-white italic tracking-tighter mb-4">
              {user.email?.split('@')[0]}
            </h1>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <span className="flex items-center gap-2 text-gray-500 text-xs font-bold bg-white/5 px-4 py-2 rounded-xl">
                <Mail size={14} /> {user.email}
              </span>
              <span className="flex items-center gap-2 text-gray-500 text-xs font-bold bg-white/5 px-4 py-2 rounded-xl">
                <Calendar size={14} /> Joined Jan 2026
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

        {/* Recent Activity */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-[2.5rem] border border-white/5 p-8 md:p-12 overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] -mr-32 -mt-32" />
          <h3 className="text-2xl font-black text-white mb-8 italic">Your Empire Record</h3>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/5 group hover:border-blue-500/30 transition-all">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-xl overflow-hidden shadow-xl">
                  <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">What Dog Breed Are You?</h4>
                  <p className="text-gray-500 text-xs">Personality: Golden Retriever</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-blue-400 text-xs font-black uppercase tracking-widest mb-1">Completed</div>
                <div className="text-gray-600 text-[10px]">Jan 3, 2026</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
