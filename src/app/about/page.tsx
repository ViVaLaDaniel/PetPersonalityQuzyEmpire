'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Heart, Sparkles, Zap, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <section className="max-w-4xl mx-auto text-center mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-blue-500 font-black uppercase tracking-[0.3em] text-sm mb-4 block">Our Mission</span>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter italic">About PawPersona</h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            We are a group of pet lovers, data scientists, and storytellers who believe that the bond between humans and animals is sacred. Our goal is to use AI and psychology to help you understand your pet (and yourself) on a deeper level.
          </p>
        </motion.div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto mb-32">
        {[
          { icon: <ShieldCheck className="text-blue-400" />, title: 'Accurate Logic', desc: 'Our algorithms are fine-tuned to provide results that actually make sense.' },
          { icon: <Heart className="text-red-400" />, title: 'Animal First', desc: 'Everything we do is designed to celebrate the incredible diversity of animal life.' },
          { icon: <Award className="text-yellow-400" />, title: 'Premium Design', desc: 'We value aesthetics as much as accuracy. A better experience for everyone.' }
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-10 rounded-[2.5rem] border border-white/5 text-center"
          >
            <div className="bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-8">
              {item.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <section className="glass rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -mr-48 -mt-48" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <Zap className="text-yellow-400 mx-auto mb-8" size={64} fill="currentColor" />
          <h2 className="text-4xl font-black text-white mb-6">Join the Empire</h2>
          <p className="text-gray-400 mb-10 text-lg">
            Stay updated with our latest quizzes and stories. We’re building the world's largest pet personality community.
          </p>
          <button className="bg-white text-black px-12 py-5 rounded-2xl font-black text-lg transition-all hover:scale-105 active:scale-95 shadow-2xl">
            Get News Weekly
          </button>
        </div>
      </section>
    </div>
  );
}
