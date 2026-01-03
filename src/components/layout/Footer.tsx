import React from 'react';
import { PawPrint, Heart, Twitter, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-blue-500 rounded-lg">
              <PawPrint className="text-white" size={20} />
            </div>
            <span className="text-lg font-bold text-white">PawPersona</span>
          </div>
          <p className="text-gray-400 max-w-sm leading-relaxed mb-6">
            Discover the secrets of your inner animal. The world's most accurate and viral pet personality quizzes.
          </p>
          <div className="flex gap-4">
            <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white">
              <Twitter size={20} />
            </a>
            <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white">
              <Instagram size={20} />
            </a>
            <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white">
              <Facebook size={20} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Explore</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><a href="#" className="hover:text-blue-400 transition-colors">Top Quizzes</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Dog Breeds</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Cat Personalities</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Wild Spirit</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Company</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
        <p>© 2026 PawPersona Empire. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Made with <Heart size={12} className="text-red-500 fill-red-500" /> for pet lovers worldwide.
        </p>
      </div>
    </footer>
  );
}
