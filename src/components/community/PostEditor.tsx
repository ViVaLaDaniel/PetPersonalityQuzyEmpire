'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { Send, Image as ImageIcon, Loader2, AlertCircle } from 'lucide-react';
const Filter = require('bad-words');
import { RuCensor } from 'russian-bad-word-censor';

interface PostEditorProps {
  onPostCreated: () => void;
}

export default function PostEditor({ onPostCreated }: PostEditorProps) {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filter = new Filter();
  const ruCensor = new RuCensor();
  
  const validateText = (text: string) => {
    if (!text) return false;
    // English filtering
    const isProfaneEn = filter.isProfane(text);
    
    // Russian filtering
    const isProfaneRu = ruCensor.isProfane(text);

    return isProfaneEn || isProfaneRu;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (validateText(title) || validateText(content)) {
      setError('Пожалуйста, будьте вежливы. Матерные слова запрещены!');
      return;
    }

    setLoading(true);
    setError(null);

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
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Заголовок вашей истории..."
          className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white font-black italic text-xl focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-gray-600"
          required
        />
        
        <textarea 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="О чем хотите рассказать? (Максимум 1000 символов)"
          rows={4}
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-medium focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-gray-600 resize-none"
          required
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
