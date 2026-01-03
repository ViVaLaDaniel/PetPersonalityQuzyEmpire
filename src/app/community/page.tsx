'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import PostEditor from '@/components/community/PostEditor';
import PostCard from '@/components/community/PostCard';
import { MessageSquare, Users, TrendingUp, Sparkles } from 'lucide-react';

export default function CommunityPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('community_posts')
      .select(`
        *,
        author:user_id (email),
        likes_count:likes(count),
        comments_count:comments(count)
      `)
      .order('created_at', { ascending: false });

    if (error) console.error('Error fetching posts:', error);
    else setPosts(data || []);
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-6 py-12 pt-32">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full mb-6 text-blue-400 text-xs font-black uppercase tracking-widest"
          >
            <Users size={16} />
            Empire Community
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-black text-white italic tracking-tighter mb-6">
            Share Your <span className="text-blue-500">Paw Stories</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium">
            Общайтесь с другими владельцами, делитесь опытом и советами по воспитанию ваших питомцев.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Feed */}
          <div className="lg:col-span-8 space-y-8">
            {user ? (
              <PostEditor onPostCreated={fetchPosts} />
            ) : (
              <div className="glass-card p-8 rounded-[2rem] border border-white/10 text-center">
                <p className="text-gray-400 font-bold mb-4">Войдите, чтобы поделиться своей историей</p>
              </div>
            )}

            <div className="space-y-6">
              {loading ? (
                [1, 2, 3].map(i => (
                  <div key={i} className="glass-card h-64 rounded-[2rem] animate-pulse bg-white/5 border border-white/5" />
                ))
              ) : posts.length > 0 ? (
                posts.map((post) => (
                  <PostCard key={post.id} post={post} onUpdate={fetchPosts} />
                ))
              ) : (
                <div className="text-center py-20 bg-white/5 rounded-[2rem] border border-dashed border-white/10">
                  <MessageSquare size={48} className="mx-auto text-gray-600 mb-4" />
                  <p className="text-gray-500 font-bold">Пока здесь ничего нет. Станьте первым!</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="glass-card p-8 rounded-[2.5rem] border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] rounded-full -mr-16 -mt-16" />
              <h3 className="text-xl font-black text-white italic mb-6 flex items-center gap-3">
                <TrendingUp className="text-blue-400" size={20} />
                Trending Topics
              </h3>
              <div className="space-y-4">
                {['#DogTraining', '#CatNutrition', '#PuppyTips', '#EmpireStories'].map((tag) => (
                  <button key={tag} className="block w-full text-left p-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-xs font-bold transition-all border border-transparent hover:border-white/10">
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="glass-card p-8 rounded-[2.5rem] bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10">
              <Sparkles className="text-yellow-400 mb-4" size={24} />
              <h3 className="text-xl font-black text-white italic mb-2">Empire Rules</h3>
              <ul className="text-xs text-gray-400 space-y-3 font-medium">
                <li className="flex items-start gap-2">• Be kind to other pet owners</li>
                <li className="flex items-start gap-2">• No spam or affiliate links</li>
                <li className="flex items-start gap-2">• No offensive language</li>
                <li className="flex items-start gap-2">• Share real pet photos!</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
