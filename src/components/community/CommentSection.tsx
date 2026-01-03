'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { Send, User, MessageCircle, MoreHorizontal, Loader2, AlertCircle } from 'lucide-react';
import * as RussianCensor from 'russian-bad-word-censor';
const RuCensor = (RussianCensor as any).Censor || (RussianCensor as any).RuCensor || (RussianCensor as any).default;

interface CommentSectionProps {
  postId: string;
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const { user } = useAuth();
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetching, setFetching] = useState(true);

  const ruCensor = RuCensor ? new RuCensor() : null;

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('comments')
      .select(`
        *,
        author:user_id (email)
      `)
      .eq('post_id', postId)
      .order('created_at', { ascending: true });

    if (error) console.error('Error fetching comments:', error);
    else setComments(data || []);
    setFetching(false);
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newComment.trim()) return;

    let isProfane = false;
    if (ruCensor) {
      isProfane = ruCensor.isProfane(newComment);
    } else {
      const lowerText = newComment.toLowerCase();
      ['сука', 'бля', 'хуй', 'пиздец', 'ебать'].forEach(word => {
        if (lowerText.includes(word)) isProfane = true;
      });
    }

    if (isProfane) {
      setError('Пожалуйста, будьте вежливы. Матерные слова запрещены!');
      return;
    }

    setLoading(true);
    setError(null);

    const { error: commentError } = await supabase
      .from('comments')
      .insert({
        post_id: postId,
        user_id: user.id,
        content: newComment
      });

    if (commentError) {
      setError(commentError.message);
    } else {
      setNewComment('');
      fetchComments();
    }
    setLoading(false);
  };

  return (
    <div className="mt-12 space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <MessageCircle className="text-blue-400" size={24} />
        <h3 className="text-xl font-black text-white italic tracking-tighter">
          Comments ({comments.length})
        </h3>
      </div>

      {/* Write Comment */}
      {user ? (
        <form onSubmit={handleComment} className="relative mb-12">
          <div className="glass-card p-2 rounded-2xl border border-white/10 flex items-center gap-2 group focus-within:border-blue-500/50 transition-all">
            <input 
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a thoughtful comment..."
              className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-white text-sm font-medium placeholder:text-gray-600"
            />
            <button 
              type="submit"
              disabled={loading || !newComment.trim()}
              className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white p-3 rounded-xl transition-all active:scale-95"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
            </button>
          </div>
          {error && (
            <p className="absolute -bottom-6 left-2 text-[10px] font-bold text-red-400 flex items-center gap-1">
              <AlertCircle size={10} /> {error}
            </p>
          )}
        </form>
      ) : (
        <div className="p-6 rounded-2xl bg-white/5 border border-dashed border-white/10 text-center mb-12">
          <p className="text-gray-500 text-xs font-bold">Log in to join the conversation</p>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-6">
        {fetching ? (
          <div className="text-center py-10 text-gray-600">Loading comments...</div>
        ) : comments.length > 0 ? (
          <AnimatePresence>
            {comments.map((comment) => (
              <motion.div 
                key={comment.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex gap-4 group"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <User className="text-gray-500" size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-blue-400 text-xs font-black tracking-tight">
                      {comment.author?.email?.split('@')[0]}
                    </span>
                    <span className="text-[10px] font-black text-gray-700 uppercase tracking-widest">
                      {new Date(comment.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="bg-white/5 border border-white/5 p-4 rounded-2xl rounded-tl-none">
                    <p className="text-gray-400 text-sm font-medium leading-relaxed">
                      {comment.content}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 mt-2 ml-4">
                    <button className="text-[10px] font-black text-gray-600 hover:text-white uppercase tracking-widest transition-colors">Reply</button>
                    <button className="text-[10px] font-black text-gray-600 hover:text-pink-500 uppercase tracking-widest transition-colors">Like</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-600 text-sm font-bold italic">No comments yet. Start the discussion!</p>
          </div>
        )}
      </div>
    </div>
  );
}
