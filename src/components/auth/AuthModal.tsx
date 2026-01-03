'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { X, Mail, Github, Chrome, Facebook, Twitter, Loader2, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const { signInWithGoogle, signInWithFacebook, signInWithTwitter } = useAuth();

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = isSignUp 
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      if (isSignUp) {
        setMessage({ type: 'success', text: 'Check your email for confirmation link!' });
      } else {
        onClose();
      }
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md" 
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-md glass-card rounded-[2.5rem] border border-white/20 overflow-hidden shadow-2xl p-8 md:p-10"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full mb-4 text-blue-400 text-[10px] font-black uppercase tracking-widest">
            <ShieldCheck size={14} />
            Secure Authentication
          </div>
          <h2 className="text-3xl font-black text-white italic tracking-tight">
            {isSignUp ? 'Create Empire Account' : 'Welcome Back'}
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            Join 1M+ pet lovers and track your results.
          </p>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <button 
            onClick={() => signInWithGoogle()}
            className="flex items-center justify-center p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/50 transition-all group"
          >
            <Chrome size={20} className="text-gray-400 group-hover:text-blue-400" />
          </button>
          <button 
            onClick={() => signInWithFacebook()}
            className="flex items-center justify-center p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/50 transition-all group"
          >
            <Facebook size={20} className="text-gray-400 group-hover:text-blue-600" />
          </button>
          <button 
            onClick={() => signInWithTwitter()}
            className="flex items-center justify-center p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/50 transition-all group"
          >
            <Twitter size={20} className="text-gray-400 group-hover:text-blue-400" />
          </button>
        </div>

        <div className="relative mb-8 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <span className="relative z-10 bg-[#0a0a0b] px-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">
            or continue with email
          </span>
        </div>

        <form onSubmit={handleEmailAuth} className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="paws@empire.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all font-medium"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-all font-medium"
            />
          </div>

          {message && (
            <div className={`p-4 rounded-xl text-xs font-bold ${message.type === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
              {message.text}
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-4 rounded-xl font-black text-sm tracking-widest uppercase transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : (isSignUp ? 'Create Free Account' : 'Sign Into Empire')}
          </button>
        </form>

        <p className="mt-8 text-center text-gray-500 text-xs">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          <button 
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-blue-400 font-bold ml-1 hover:underline underline-offset-4"
          >
            {isSignUp ? 'Log In' : 'Sign Up Free'}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
