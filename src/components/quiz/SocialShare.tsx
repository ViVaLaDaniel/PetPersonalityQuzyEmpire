'use client';

import React from 'react';
import { Twitter, Facebook, Send, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface SocialShareProps {
  title: string;
  url: string;
  result: string;
}

export default function SocialShare({ title, url, result }: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  
  const encodedText = encodeURIComponent(`I'm a ${result}! 🐾 I just took the ${title} on PawPersona. Check yours here:`);
  const encodedUrl = encodeURIComponent(url);

  const shareLinks = [
    {
      name: 'Twitter',
      icon: <Twitter size={20} fill="currentColor" />,
      url: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      color: 'bg-[#1DA1F2] hover:bg-[#1a91da]'
    },
    {
      name: 'Facebook',
      icon: <Facebook size={20} fill="currentColor" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'bg-[#1877F2] hover:bg-[#166fe5]'
    },
    {
      name: 'Telegram',
      icon: <Send size={20} fill="currentColor" />,
      url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
      color: 'bg-[#0088cc] hover:bg-[#0077b5]'
    }
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${title}: I'm a ${result}! Take the quiz: ${url}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <p className="text-gray-400 text-sm font-medium uppercase tracking-widest">Share Your Personality</p>
      <div className="flex flex-wrap justify-center gap-3">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${link.color} text-white p-3 rounded-xl transition-all transform hover:scale-110 active:scale-95 shadow-lg flex items-center justify-center`}
            title={`Share on ${link.name}`}
          >
            {link.icon}
          </a>
        ))}
        <button
          onClick={copyToClipboard}
          className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-xl transition-all transform hover:scale-110 active:scale-95 border border-white/20 flex items-center justify-center"
          title="Copy Link"
        >
          {copied ? <Check className="text-green-400" size={20} /> : <Copy size={20} />}
        </button>
      </div>
    </div>
  );
}
