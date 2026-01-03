'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Dog, Cat, Bird, Trees as Tree, Sparkles } from 'lucide-react';

export default function CategoriesPage() {
  const categories = [
    { title: 'Dogs', icon: <Dog size={40} />, count: 12, color: 'from-orange-500 to-red-600', delay: 0 },
    { title: 'Cats', icon: <Cat size={40} />, count: 8, color: 'from-blue-500 to-indigo-600', delay: 0.1 },
    { title: 'Wild Animals', icon: <Tree size={40} />, count: 15, color: 'from-green-500 to-emerald-600', delay: 0.2 },
    { title: 'Birds', icon: <Bird size={40} />, count: 5, color: 'from-yellow-400 to-orange-500', delay: 0.3 },
    { title: 'Spirit Guides', icon: <Sparkles size={40} />, count: 20, color: 'from-purple-500 to-pink-600', delay: 0.4 },
  ];

  return (
    <div className="container mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 text-center"
      >
        <h1 className="text-5xl font-black text-white mb-6 uppercase tracking-tighter italic">Quiz Categories</h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
          Find the perfect test for your mood. Explore our niche-specific personality collections.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: cat.delay }}
            className={`relative p-10 rounded-[2.5rem] bg-gradient-to-br ${cat.color} group overflow-hidden cursor-pointer shadow-2xl hover:-translate-y-2 transition-transform duration-500`}
          >
            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-125 transition-transform duration-700">
              {cat.icon}
            </div>
            
            <div className="relative z-10">
              <div className="bg-white/20 w-fit p-4 rounded-3xl mb-8">
                {cat.icon}
              </div>
              <h3 className="text-4xl font-black text-white mb-2">{cat.title}</h3>
              <p className="text-white/80 font-bold uppercase tracking-widest text-xs">
                {cat.count} Quizzes Available
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
