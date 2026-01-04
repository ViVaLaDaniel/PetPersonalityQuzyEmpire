'use client';

import React from 'react';
import { Share2, Twitter, Facebook, Link as LinkIcon } from 'lucide-react';

interface SocialShareProps {
  title: string;
  url: string;
  result: string;
}

export default function SocialShare({ title, url, result }: SocialShareProps) {
  const shareText = `I got "${result}" on the ${title} quiz! Discover your inner animal:`;
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <h4 className="text-white text-sm font-bold uppercase tracking-widest">Share Your Result</h4>

      <div className="flex gap-4">
        {/* Twitter Share */}
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 bg-[#1DA1F2]/20 hover:bg-[#1DA1F2] text-[#1DA1F2] hover:text-white rounded-2xl transition-all transform hover:scale-110"
        >
          <Twitter size={24} fill="currentColor" />
        </a>

        {/* Facebook Share */}
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 bg-[#4267B2]/20 hover:bg-[#4267B2] text-[#4267B2] hover:text-white rounded-2xl transition-all transform hover:scale-110"
        >
          <Facebook size={24} fill="currentColor" />
        </a>

        {/* Copy Link */}
        <button
          onClick={handleCopyLink}
          className="p-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl transition-all transform hover:scale-110"
        >
          <LinkIcon size={24} />
        </button>
      </div>

      <p className="text-gray-500 text-xs">Share with friends to compare personalities!</p>
    </div>
  );
}
