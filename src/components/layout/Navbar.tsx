'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PawPrint, Zap, User as UserIcon, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import AuthModal from '@/components/auth/AuthModal';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto glass rounded-2xl px-6 py-3 flex items-center justify-between border border-white/10 shadow-lg">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-blue-500 rounded-lg group-hover:rotate-12 transition-transform shadow-[0_0_15px_rgba(59,130,246,0.5)]">
              <PawPrint className="text-white" size={24} />
            </div>
            <span className="text-xl font-black text-white tracking-tighter">
              Paw<span className="text-blue-400">Persona</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-black uppercase tracking-widest text-gray-400">
            <Link href="/quizzes" className="hover:text-blue-400 transition-colors">Quizzes</Link>
            <Link href="/community" className="hover:text-blue-400 transition-colors">Community</Link>
            <Link href="/categories" className="hover:text-blue-400 transition-colors">Categories</Link>
            <Link href="/about" className="hover:text-blue-400 transition-colors">About</Link>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-none mb-1">Welcome back</span>
                  <span className="text-xs font-bold text-white leading-none">{user.email?.split('@')[0]}</span>
                </div>
                <div className="bg-white/5 p-2 rounded-xl group relative cursor-pointer hover:bg-white/10 transition-colors border border-white/10">
                  <UserIcon size={20} className="text-blue-400" />
                  {/* Dropdown can go here */}
                  <div className="absolute right-0 top-full mt-4 w-48 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all pt-2">
                    <div className="glass shadow-2xl rounded-xl border border-white/10 p-2">
                      <button 
                        onClick={() => signOut()}
                        className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-red-500/10 text-red-400 text-xs font-bold transition-colors"
                      >
                        <LogOut size={16} />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="text-xs font-black uppercase tracking-widest text-white hover:text-blue-400 transition-colors"
              >
                Sign In
              </button>
            )}

            <button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(59,130,246,0.3)] border border-white/10">
              <Zap size={14} fill="currentColor" className="text-yellow-400" />
              Go Premium
            </button>
          </div>
        </div>
      </nav>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  );
}
