'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { mockDogQuiz } from '@/lib/mock-data';
import { Users, Clock, Play } from 'lucide-react';
import Link from 'next/link';

export default function QuizzesPage() {
  const quizzes = [mockDogQuiz, { ...mockDogQuiz, id: 'cat-quiz', title: 'Which Cat Personality Are You?', category: 'cats', slug: 'cat-personality' }];

  return (
    <div className="container mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 text-center"
      >
        <h1 className="text-5xl font-black text-white mb-6 uppercase tracking-tighter italic">Explore All Quizzes</h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
          From dogs and cats to wild spirit guides, our library of AI-powered personality tests is growing every day.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {quizzes.map((quiz, i) => (
          <motion.div
            key={quiz.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-[2.5rem] overflow-hidden group hover:border-blue-500/50 transition-all cursor-pointer flex flex-col"
          >
            <div className="h-56 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
              <img 
                src={quiz.image_url} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                alt={quiz.title}
              />
              <div className="absolute top-4 left-4 z-20">
                <span className="bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                  {quiz.category}
                </span>
              </div>
            </div>

            <div className="p-8 flex flex-col flex-grow">
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors leading-tight">
                {quiz.title}
              </h3>
              <p className="text-gray-400 text-sm mb-8 flex-grow">
                {quiz.description}
              </p>
              
              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <div className="flex gap-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                  <span className="flex items-center gap-1"><Users size={14} /> 12k+</span>
                  <span className="flex items-center gap-1"><Clock size={14} /> 2 min</span>
                </div>
                <Link 
                  href={`/quizzes/${quiz.slug}`}
                  className="bg-white/5 hover:bg-blue-500 text-white p-3 rounded-xl transition-all group-hover:bg-blue-500 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                >
                  <Play size={16} fill="currentColor" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
