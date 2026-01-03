'use client';

import React from 'react';
import QuizEngine from '@/components/quiz/QuizEngine';
import BlogCard from '@/components/layout/BlogCard';
import { mockDogQuiz } from '@/lib/mock-data';
import { blogPosts } from '@/lib/blog-data';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Users, BookOpen, ChevronRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="container mx-auto px-6">
      {/* Hero Section */}
      <section className="text-center mb-32 max-w-4xl mx-auto pt-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full mb-8 text-blue-400 text-sm font-bold animate-pulse">
            <Sparkles size={16} />
            OVER 1,000,000 QUIZZES TAKEN!
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tight leading-none">
            Discover Your <br />
            <span className="text-gradient">Inner Animal</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed mb-12 max-w-2xl mx-auto">
            The world's most accurate and viral pet personality quizzes. 
            Join millions of pet lovers uncovering their FurCode!
          </p>

          <div className="flex flex-wrap justify-center gap-8 text-gray-400 text-sm font-medium">
            <div className="flex items-center gap-2">
              <TrendingUp className="text-blue-500" size={18} />
              Viral Social Sharing
            </div>
            <div className="flex items-center gap-2">
              <Users className="text-purple-500" size={18} />
              Community Results
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="text-yellow-500" size={18} />
              AI Powered Logic
            </div>
          </div>
        </motion.div>
      </section>

      {/* Main Feature Quiz */}
      <section className="mb-40 scroll-mt-32" id="quiz-main">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 italic tracking-tighter uppercase">Try Our Most Popular Quiz</h2>
            <p className="text-gray-500 font-medium">12 Questions • 1 Million Shares • Totally Free</p>
            <div className="h-1.5 w-24 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full mt-6" />
          </div>

          <QuizEngine quiz={mockDogQuiz} />
        </motion.div>
      </section>

      {/* SEO Articles / Stories Block */}
      <section className="mb-40 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative glass-card rounded-[3rem] p-12 md:p-20 overflow-hidden"
        >
          {/* Decorative gradients */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] -ml-48 -mb-48" />

          <div className="relative z-20 flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 text-blue-400 font-bold mb-4">
                <BookOpen size={24} />
                <span className="uppercase tracking-[0.3em] text-sm">PawPersona Stories</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
                Explore The World of <br /> 
                <span className="text-gradient">Pet Personalities</span>
              </h2>
              <p className="text-gray-400 mt-6 leading-relaxed">
                We believe every animal has a story. Dive into our latest articles, scientific insights, and heartwarming tales to better understand your pet’s unique character.
              </p>
            </div>
            <button className="flex items-center gap-2 bg-white text-black px-8 py-4 rounded-2xl font-black transition-all hover:scale-105 active:scale-95 shadow-xl whitespace-nowrap">
              View All Stories
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-20">
            {blogPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </motion.div>
      </section>

      {/* Trending Quizzes Grid */}
      <section className="max-w-7xl mx-auto pb-20">
        <div className="flex justify-between items-end mb-16 px-4">
          <div>
            <h3 className="text-4xl font-black text-white mb-2 tracking-tighter uppercase italic">Trending Quizzes</h3>
            <p className="text-gray-500 font-medium">Updated every hour based on social mentions.</p>
          </div>
          <button className="text-blue-400 font-bold hover:text-blue-300 transition-colors flex items-center gap-2 group">
            All Quizzes 
            <ChevronRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass rounded-[2rem] overflow-hidden group hover:border-blue-500/50 transition-all cursor-pointer">
              <div className="h-48 bg-gray-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                <img 
                  src={`https://images.unsplash.com/photo-${1517841905240 + i}-472988babdf9?q=80&w=400`} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  alt="Quiz cover"
                />
              </div>
              <div className="p-8">
                <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] px-3 py-1 bg-blue-400/10 rounded-full mb-4 inline-block">Pet Psychology</span>
                <h4 className="text-xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">Amazing Pet Quiz Title {i}</h4>
                <div className="flex items-center justify-between text-gray-500 text-[10px] font-black uppercase tracking-widest pt-4 border-t border-white/5">
                  <span className="flex items-center gap-1"><Users size={12} /> 45k Completes</span>
                  <span className="text-purple-400">🔥 Viral Now</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
