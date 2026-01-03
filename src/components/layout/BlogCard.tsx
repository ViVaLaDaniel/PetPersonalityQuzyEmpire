import React from 'react';
import { BlogPost } from '@/lib/blog-data';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="glass-card rounded-[2rem] overflow-hidden group hover:border-blue-500/50 transition-all duration-500 flex flex-col h-full">
      <div className="h-64 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
        <img 
          src={post.image_url} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          alt={post.title}
        />
        <div className="absolute top-4 left-4 z-20">
          <span className="bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
            {post.category}
          </span>
        </div>
      </div>
      
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex items-center gap-4 text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-4">
          <span className="flex items-center gap-1.5">
            <Calendar size={12} className="text-blue-400" />
            {post.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={12} className="text-purple-400" />
            {post.read_time}
          </span>
        </div>

        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors leading-tight">
          {post.title}
        </h3>

        <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
          {post.excerpt}
        </p>

        <Link 
          href={`/stories/${post.slug}`}
          className="inline-flex items-center gap-2 text-white font-bold text-sm bg-white/5 hover:bg-white/10 px-6 py-3 rounded-xl transition-all self-start group/btn"
        >
          Read Full Story
          <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
}
