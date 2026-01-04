'use client';

import { useEffect } from 'react';

export default function KofiWidget() {
  useEffect(() => {
    let intervalId: any;
    let attempts = 0;

    const initKofi = () => {
      attempts++;
      if (typeof window !== 'undefined' && (window as any).kofiWidgetOverlay) {
        clearInterval(intervalId);
        
        // Clear any existing widgets to prevent duplicates
        const existingWidget = document.getElementById('kofi-widget-overlay');
        if (existingWidget) return;

        try {
          (window as any).kofiWidgetOverlay.draw('danielzamiatin', {
            'type': 'floating-chat',
            'floating-chat.donateButton.text': 'Support me',
            'floating-chat.donateButton.background-color': '#00b9fe',
            'floating-chat.donateButton.text-color': '#fff'
          });

          // Aggressive CSS to force position and add pulsing animation
          const styleId = 'kofi-final-fix';
          if (!document.getElementById(styleId)) {
            const style = document.createElement('style');
            style.id = styleId;
            style.textContent = `
              /* 1. FORCE POSITION TO BOTTOM RIGHT FOR ALL POTENTIAL CONTAINERS */
              #kofi-widget-overlay,
              .kofi-widget-overlay-container,
              .floatingchat-container,
              .floatingchat-container-mobi,
              [id*="kofi"],
              [class*="floatingchat"] {
                right: auto !important;
                left: 25px !important;
                bottom: 100px !important;
                position: fixed !important;
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
                z-index: 2147483647 !important; /* Max z-index */
              }

              /* 2. ENSURE THE IFRAME INSIDE ALSO OBEYS */
              .floatingchat-container iframe,
              .kofi-widget-overlay-container iframe {
                right: 0 !important;
                left: auto !important;
              }

              /* 3. OCCASIONAL VIBRATION ANIMATION */
              .floatingchat-container,
              .floatingchat-container-mobi {
                animation: kofi-vibrate 5s infinite ease-in-out !important;
              }

              @keyframes kofi-vibrate {
                0%, 85%, 100% { transform: translate(0, 0) rotate(0); }
                87% { transform: translate(2px, 2px) rotate(1deg); }
                89% { transform: translate(-2px, -1px) rotate(-1deg); }
                91% { transform: translate(2px, -2px) rotate(1deg); }
                93% { transform: translate(-1px, 2px) rotate(-1deg); }
                95% { transform: translate(1px, -1px) rotate(1deg); }
                97% { transform: translate(-1px, 1px) rotate(-1deg); }
              }

              /* 4. DON'T LET KO-FI'S INTERNAL STYLES WIN */
              div[style*="left: 0px"], 
              div[style*="left:0px"],
              iframe[style*="left: 0px"] {
                left: auto !important;
                right: 25px !important;
              }
            `;
            document.head.appendChild(style);
          }
        } catch (e) {
          console.error('Kofi init error:', e);
        }
      }
      
      if (attempts > 60) clearInterval(intervalId); // Poll for 30 seconds
    };

    intervalId = setInterval(initKofi, 500);
    initKofi();

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return null;
}
