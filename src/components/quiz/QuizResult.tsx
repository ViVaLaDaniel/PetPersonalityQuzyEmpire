'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { QuizResult as QuizResultType, Quiz } from '@/types/quiz';
import { ShieldCheck, Zap, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import SocialShare from './SocialShare';

interface QuizResultProps {
  quiz: Quiz;
  result: QuizResultType;
  onReset: () => void;
}

export default function QuizResult({ quiz, result, onReset }: QuizResultProps) {
  useEffect(() => {
    // Trigger confetti on mount
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-3xl mx-auto"
    >
      <div className="bg-white/10 backdrop-blur-xl rounded-[2.5rem] border border-white/20 overflow-hidden shadow-2xl">
        {/* Header Branding */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 py-4 px-8 border-b border-white/10 flex justify-between items-center">
          <span className="text-white/40 text-xs font-bold tracking-widest uppercase flex items-center gap-2">
            <ShieldCheck size={14} className="text-blue-400" />
            Verified PawPersona Match
          </span>
          <span className="text-white/40 text-xs font-medium">Results powered by Gemini AI</span>
        </div>

        <div className="p-8 md:p-12 text-center">
          <span className="text-blue-400 font-bold tracking-widest uppercase text-sm mb-2 block">Your Inner Animal is...</span>
          <h2 className="text-4xl md:text-6xl font-black mb-8 text-white leading-tight">
            {result.title}
          </h2>
          
          <div className="relative w-full aspect-video rounded-3xl overflow-hidden mb-10 border-4 border-white/10 group shadow-2xl">
            <img 
              src={result.image_url} 
              alt={result.title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-4 right-6 text-white/50 text-xs font-bold tracking-tighter flex items-center gap-1">
              PAWPERSONA.COM
            </div>
          </div>

          <div className="text-left space-y-6 mb-12">
            {result.description.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="text-lg md:text-xl text-gray-200 leading-relaxed font-light first-letter:text-3xl first-letter:font-bold first-letter:text-blue-400">
                {paragraph}
              </p>
            ))}
          </div>

          {/* CTA / Monetization Section */}
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-6 mb-12 border border-blue-500/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Zap size={80} fill="currentColor" className="text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 flex items-center justify-center gap-2">
              <Zap size={20} className="text-yellow-400 fill-yellow-400" />
              Want an Even Deeper Analysis?
            </h3>
            <p className="text-gray-300 text-sm mb-6 max-w-lg mx-auto leading-relaxed">
              Unlock our <strong>Premium 2,000-word Personality Deep Dive</strong> for just $4.99. Get expert training tips, behavior analysis, and an Official Match Certificate!
            </p>
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-10 py-4 rounded-xl font-bold transition-all transform hover:scale-105 active:scale-95 shadow-xl">
              Unlock Full Analysis Now
            </button>
          </div>

          {/* Social Sharing Component */}
          <div className="mb-12 py-8 border-y border-white/5">
            <SocialShare 
              title={quiz.title} 
              url={typeof window !== 'undefined' ? window.location.href : ''} 
              result={result.personality_type} 
            />
          </div>
          
          <button 
            onClick={onReset}
            className="flex items-center justify-center gap-2 mx-auto text-gray-400 hover:text-white transition-colors font-medium group"
          >
            <RotateCcw size={18} className="group-hover:rotate-[-180deg] transition-transform duration-500" />
            Retake the Quiz
          </button>
        </div>
      </div>

      {/* Footer Attribution */}
      <div className="text-center mt-8 space-y-2 opacity-50">
        <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Powered by PawPersona Intelligence</p>
        <div className="flex justify-center gap-4">
          <span className="text-[10px] text-gray-600">Privacy-First Analytics</span>
          <span className="text-[10px] text-gray-600">Secure Payments via Stripe</span>
        </div>
      </div>
    </motion.div>
  );
}
