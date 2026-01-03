'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageSquare, Share2, MoreHorizontal, User } from 'lucide-react';
import Link from 'next/link';

interface PostCardProps {
  post: any;
  onUpdate: () => void;
}

export default function PostCard({ post, onUpdate }: PostCardProps) {
  // Use profile data if available, fallback to email, then Anonymous
  // The query structure is now expected to be:
  // post.author (which is the profile object joined by user_id)
  // OR post.user_email (if we joined that way, but let's stick to profile)

  // 'author' is the joined profile data.
  const displayName = post.author?.display_name || 'Anonymous';
  const avatarUrl = post.author?.avatar_url;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 md:p-8 rounded-[2.5rem] border border-white/5 hover:border-white/20 transition-all group"
    >
      {/* Post Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform overflow-hidden relative">
            {avatarUrl ? (
                <img src={avatarUrl} alt={displayName} className="w-full h-full object-cover" />
            ) : (
                <User className="text-blue-400" size={24} />
            )}
          </div>
          <div>
            <h4 className="text-white font-bold text-sm tracking-tight">{displayName}</h4>
            <span className="text-gray-500 text-[10px] uppercase font-black tracking-widest">Empire Resident</span>
          </div>
        </div>
        <button className="text-gray-600 hover:text-white transition-colors">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Post Content */}
      <Link href={`/community/${post.id}`} className="block mb-8 group/content">
        <h3 className="text-2xl font-black text-white italic tracking-tighter mb-4 group-hover/content:text-blue-400 transition-colors">
          {post.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed font-medium line-clamp-3">
          {post.content}
        </p>
      </Link>

      {/* Post Actions */}
      <div className="flex items-center gap-6 pt-6 border-t border-white/5">
        <button className="flex items-center gap-2 text-gray-500 hover:text-pink-500 text-xs font-black uppercase tracking-widest transition-all">
          <Heart size={18} />
          <span>{post.likes_count?.[0]?.count || 0}</span>
        </button>
        
        <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 text-xs font-black uppercase tracking-widest transition-all">
          <MessageSquare size={18} />
          <span>{post.comments_count?.[0]?.count || 0}</span>
        </button>

        <div className="ml-auto flex items-center gap-4">
          <span className="text-[10px] font-black text-gray-700 uppercase tracking-widest">
            {new Date(post.created_at).toLocaleDateString('en-GB')}
          </span>
          <button className="text-gray-500 hover:text-white transition-colors">
            <Share2 size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
