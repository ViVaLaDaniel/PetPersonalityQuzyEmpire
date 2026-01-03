'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quiz, Question, QuizResult } from '@/types/quiz';
import { cn } from '@/lib/utils';
import { ChevronRight, RotateCcw, Zap, Info, ShieldCheck } from 'lucide-react';
import SocialShare from './SocialShare';

interface QuizEngineProps {
  quiz: Quiz;
}

export default function QuizEngine({ quiz }: QuizEngineProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [result, setResult] = useState<QuizResult | null>(null);

  const questions = quiz.questions || [];
  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (optionScores: Record<string, number>) => {
    const newScores = { ...scores };
    Object.entries(optionScores).forEach(([type, value]) => {
      newScores[type] = (newScores[type] || 0) + value;
    });
    setScores(newScores);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      calculateResult(newScores);
    }
  };

  const calculateResult = (finalScores: Record<string, number>) => {
    if (!quiz.results) return;

    let bestMatch = '';
    let maxScore = -Infinity;

    Object.entries(finalScores).forEach(([type, score]) => {
      if (score > maxScore) {
        maxScore = score;
        bestMatch = type;
      }
    });

    const finalResult = quiz.results.find(r => r.personality_type === bestMatch) || quiz.results[0];
    setResult(finalResult);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScores({});
    setResult(null);
  };

  if (result) {
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
            <span className="text-white/40 text-xs font-medium">Results powered by AI Analysis</span>
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
              {/* Branding overlay on image */}
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
              onClick={resetQuiz}
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

  if (!currentQuestion) return <div>Loading...</div>;

  const progress = ((currentQuestionIndex) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Section */}
      <div className="mb-12">
        <div className="flex justify-between items-end mb-4">
          <div className="space-y-1">
            <span className="text-blue-400 font-bold uppercase tracking-widest text-xs">Question {currentQuestionIndex + 1} of {questions.length}</span>
            <p className="text-white/60 text-xs flex items-center gap-1 italic">
              <Info size={12} />
              Almost there! High accuracy expected.
            </p>
          </div>
          <span className="text-white font-bold text-sm tracking-tighter">{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden border border-white/5">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-blue-400 to-purple-500 shadow-[0_0_20px_rgba(96,165,250,0.5)]"
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white/5 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden"
        >
          {/* Decorative background circle */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 leading-snug relative z-10">
            {currentQuestion.text}
          </h2>

          <div className="grid gap-4 relative z-10">
            {currentQuestion.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(option.scores)}
                className="group relative flex items-center justify-between text-left p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-400/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl overflow-hidden"
              >
                <span className="text-lg text-gray-200 relative z-10 group-hover:text-white font-medium pr-10">
                  {option.text}
                </span>
                <div className="bg-blue-400/20 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all transform scale-75 group-hover:scale-100">
                  <ChevronRight className="text-blue-400" size={24} />
                </div>
                {/* Subtle Hover Glow */}
                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <p className="text-center mt-12 text-gray-500 text-[10px] uppercase font-bold tracking-[0.2em]">
        © PAWPERSONA EMPIRE • TRUSTED BY 1M+ USERS
      </p>
    </div>
  );
}
