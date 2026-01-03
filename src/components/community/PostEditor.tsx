'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { Send, Image as ImageIcon, Loader2, AlertCircle } from 'lucide-react';
import { createPostSchema } from '@/lib/validation';
import { z, ZodError } from 'zod';
import { Filter } from 'bad-words';

interface PostEditorProps {
  onPostCreated: () => void;
}

export default function PostEditor({ onPostCreated }: PostEditorProps) {
  const { user } = useAuth();
  const { profile } = useProfile();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateProfanity = (text: string) => {
    if (!text) return false;
    
    let isProfaneEn = false;
    try {
      const filter = new Filter();
      isProfaneEn = filter.isProfane(text);
    } catch (e) {
      console.warn('Filter check failed', e);
      // Basic fallback
      const enBadWords = ['fuck', 'shit', 'asshole', 'bitch'];
      isProfaneEn = enBadWords.some(word => text.toLowerCase().includes(word));
    }
    
    // Russian filtering - even more comprehensive protection!
    const lowerText = text.toLowerCase();
    const badWords = [
      'сука', 'бля', 'хуй', 'пиздец', 'ебать', 'гондон', 'залупа', 
      'пидор', 'мразь', 'шлюха', 'курва', 'отсоси'
    ];
    const isProfaneRu = badWords.some(word => lowerText.includes(word));

    return isProfaneEn || isProfaneRu;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setError(null);

    // 1. Zod Validation
    try {
      createPostSchema.parse({ title, content });
    } catch (err) {
      if (err instanceof ZodError) {
        setError(err.errors[0].message);
        return;
      }
    }

    // 2. Profanity Check
    if (validateProfanity(title) || validateProfanity(content)) {
      setError('Пожалуйста, будьте вежливы. Матерные слова запрещены!');
      return;
    }

    setLoading(true);

    const { error: postError } = await supabase
      .from('community_posts')
      .insert({
        user_id: user.id,
        title,
        content
      });

    if (postError) {
      setError(postError.message);
    } else {
      setTitle('');
      setContent('');
      onPostCreated();
    }
    setLoading(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-8 rounded-[2.5rem] border border-white/20 shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
      
      <div className="flex items-center gap-4 mb-6">
         {profile?.avatar_url ? (
            <img src={profile.avatar_url} alt={profile.display_name || 'User'} className="w-10 h-10 rounded-full border border-white/10 object-cover" />
         ) : (
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white font-bold">
               {profile?.display_name?.[0] || user?.email?.[0] || '?'}
            </div>
         )}
         <div>
            <p className="text-white font-bold text-sm">{profile?.display_name || user?.email?.split('@')[0]}</p>
            <p className="text-gray-500 text-xs">Share your story</p>
         </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Заголовок вашей истории..."
          className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white font-black italic text-xl focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-gray-600"
          disabled={loading}
        />
        
        <textarea 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="О чем хотите рассказать? (Максимум 2000 символов)"
          rows={4}
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-medium focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-gray-600 resize-none"
          disabled={loading}
        />

        {error && (
          <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-red-400 text-xs font-bold animate-shake">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <button type="button" className="flex items-center gap-2 text-gray-500 hover:text-blue-400 text-xs font-black uppercase tracking-widest transition-colors">
            <ImageIcon size={18} />
            Add Image
          </button>
          
          <button 
            type="submit"
            disabled={loading || !title || !content}
            className="flex items-center gap-3 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/30"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
            Post Story
          </button>
        </div>
      </form>
    </motion.div>
  );
}
