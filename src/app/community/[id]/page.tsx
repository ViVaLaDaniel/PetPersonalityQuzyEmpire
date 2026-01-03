'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { ChevronLeft, Heart, Share2, User, Clock, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import CommentSection from '@/components/community/CommentSection';

export default function PostDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    if (id) {
      fetchPost();
      checkIfLiked();
    }
  }, [id, user]);

  const fetchPost = async () => {
    const { data, error } = await supabase
      .from('community_posts')
      .select(`
        *,
        author:user_id (email),
        likes_count:likes(count)
      `)
      .eq('id', id)
      .single();

    if (error) console.error('Error fetching post:', error);
    else setPost(data);
    setLoading(false);
  };

  const checkIfLiked = async () => {
    if (!user || !id) return;
    const { data } = await supabase
      .from('likes')
      .select('id')
      .eq('post_id', id)
      .eq('user_id', user.id)
      .single();
    
    setHasLiked(!!data);
  };

  const toggleLike = async () => {
    if (!user || !id) return;
    
    if (hasLiked) {
      await supabase.from('likes').delete().eq('post_id', id).eq('user_id', user.id);
      setHasLiked(false);
    } else {
      await supabase.from('likes').insert({ post_id: id, user_id: user.id });
      setHasLiked(true);
    }
    fetchPost();
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!post) return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-black text-white mb-4">Post Not Found</h1>
      <Link href="/community" className="text-blue-400 font-bold hover:underline">Return to Feed</Link>
    </div>
  );

  return (
    <div className="container mx-auto px-6 py-12 pt-32">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/community" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-12 text-xs font-black uppercase tracking-widest group"
        >
          <div className="p-2 bg-white/5 rounded-lg group-hover:bg-blue-500 transition-all">
            <ChevronLeft size={16} />
          </div>
          Back to Community
        </Link>

        {/* Post Detail Card */}
        <motion.article 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-10 md:p-16 rounded-[3.5rem] border border-white/10 shadow-2xl relative overflow-hidden mb-12"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[100px] -mr-32 -mt-32" />
          
          <header className="mb-10">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 p-[2px]">
                <div className="w-full h-full bg-[#0a0a0b] rounded-[1.4rem] flex items-center justify-center">
                  <User className="text-blue-400" size={32} />
                </div>
              </div>
              <div>
                <h4 className="text-white font-black text-lg tracking-tight mb-1">
                  {post.author?.email?.split('@')[0]}
                </h4>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 text-blue-500 text-[10px] font-black uppercase tracking-widest">
                    <ShieldCheck size={12} /> Verified Member
                  </span>
                  <span className="flex items-center gap-1 text-gray-600 text-[10px] font-black uppercase tracking-widest">
                    <Clock size={12} /> {new Date(post.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter leading-tight mb-8">
              {post.title}
            </h1>
          </header>

          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-medium whitespace-pre-wrap">
              {post.content}
            </p>
          </div>

          <div className="flex items-center justify-between pt-12 mt-12 border-t border-white/5">
            <div className="flex items-center gap-8">
              <button 
                onClick={toggleLike}
                className={`flex items-center gap-3 px-6 py-3 rounded-2xl transition-all font-black text-xs uppercase tracking-widest ${
                  hasLiked 
                    ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/20' 
                    : 'bg-white/5 text-gray-400 hover:text-pink-500 hover:bg-white/10'
                }`}
              >
                <Heart size={20} fill={hasLiked ? 'currentColor' : 'none'} />
                <span>{post.likes_count?.[0]?.count || 0} Likes</span>
              </button>
              
              <button className="flex items-center gap-3 text-gray-400 hover:text-white transition-all font-black text-xs uppercase tracking-widest group">
                <Share2 size={20} className="group-hover:rotate-12 transition-transform" />
                Share Post
              </button>
            </div>
          </div>
        </motion.article>

        {/* Comments Section */}
        <CommentSection postId={post.id} />
      </div>
    </div>
  );
}
