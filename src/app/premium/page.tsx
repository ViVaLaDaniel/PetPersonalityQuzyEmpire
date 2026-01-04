'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Shield, Star, Crown } from 'lucide-react';
import { getStripe } from '@/lib/stripe/client';

const tiers = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for getting started',
    features: [
      'Unlimited Basic Quizzes',
      'Community Access',
      'Public Sharing',
      'Standard Results'
    ],
    cta: 'Current Plan',
    popular: false,
    priceId: null
  },
  {
    name: 'Premium',
    price: '$4.99',
    period: '/mo',
    description: 'For real pet enthusiasts',
    features: [
      'Deep AI Analysis (Gemini)',
      'Ad-Free Experience',
      'Exclusive Quizzes',
      'History Tracking',
      'Official Certificates',
      'Premium Profile Badges'
    ],
    cta: 'Upgrade to Premium',
    popular: true,
    priceId: 'price_premium_placeholder'
  },
  {
    name: 'Empire',
    price: '$12.99',
    period: '/mo',
    description: 'Ultimate power for pet lovers',
    features: [
      'Everything in Premium',
      'Priority AI Generation',
      'Unlimited AI Quiz Creation',
      'Custom Results Branding',
      'VIP Community Status',
      'Direct Support'
    ],
    cta: 'Join The Empire',
    popular: false,
    priceId: 'price_ultra_placeholder'
  }
];

export default function PremiumPage() {
  const handleCheckout = async (priceId: string | null) => {
    if (!priceId) return;

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId,
          successUrl: window.location.origin + '/profile',
          cancelUrl: window.location.origin + '/premium',
        }),
      });

      const { url } = await response.json();
      if (url) window.location.href = url;
    } catch (err) {
      console.error('Checkout error:', err);
    }
  };

  return (
    <div className="container mx-auto px-6 py-20">
      <div className="text-center mb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 px-4 py-2 rounded-full mb-6 text-yellow-500 text-sm font-bold"
        >
          <Crown size={16} />
          SUPPORT THE EMPIRE
        </motion.div>
        
        <h1 className="text-6xl md:text-7xl font-black text-white mb-8 tracking-tight">
          Level Up Your <br />
          <span className="text-gradient">Experience</span>
        </h1>
        
        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Upgrade to unlock the full power of Gemini AI personality analysis, 
          ad-free browsing, and exclusive features.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {tiers.map((tier, idx) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`relative rounded-[2.5rem] p-10 border transition-all duration-500 flex flex-col ${
              tier.popular 
                ? 'bg-gradient-to-b from-blue-600/20 to-purple-600/10 border-blue-500/50 shadow-[0_0_50px_rgba(59,130,246,0.2)]' 
                : 'bg-white/5 border-white/10 hover:border-white/20'
            }`}
          >
            {tier.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                Most Popular
              </div>
            )}

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-black text-white">{tier.price}</span>
                {tier.period && <span className="text-gray-500 font-medium">{tier.period}</span>}
              </div>
              <p className="text-gray-400 text-sm">{tier.description}</p>
            </div>

            <div className="space-y-4 mb-10 flex-grow">
              {tier.features.map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <div className={`mt-1 p-0.5 rounded-full ${tier.popular ? 'bg-blue-500/20 text-blue-400' : 'bg-white/10 text-gray-400'}`}>
                    <Check size={14} />
                  </div>
                  <span className="text-gray-300 text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => handleCheckout(tier.priceId)}
              disabled={!tier.priceId}
              className={`w-full py-4 rounded-2xl font-black transition-all transform active:scale-95 ${
                tier.popular
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-xl hover:scale-[1.02]'
                  : tier.priceId 
                    ? 'bg-white text-black hover:bg-gray-100'
                    : 'bg-white/5 text-gray-500 cursor-default uppercase text-xs tracking-widest'
              }`}
            >
              {tier.cta}
            </button>
          </motion.div>
        ))}
      </div>

      <div className="mt-32 max-w-4xl mx-auto text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto text-blue-400">
              <Shield size={24} />
            </div>
            <h4 className="text-white font-bold">Secure Payments</h4>
            <p className="text-gray-500 text-xs">Full encryption via Stripe infrastructure.</p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto text-purple-400">
              <Zap size={24} />
            </div>
            <h4 className="text-white font-bold">Instant Unlock</h4>
            <p className="text-gray-500 text-xs">Gemini analysis available immediately after purchase.</p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-yellow-500/10 rounded-2xl flex items-center justify-center mx-auto text-yellow-400">
              <Star size={24} />
            </div>
            <h4 className="text-white font-bold">Premium Support</h4>
            <p className="text-gray-500 text-xs">Empire members get 24/7 priority response.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
