import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') || 'PawPersona';
  const subtitle = searchParams.get('subtitle') || 'Discover your inner animal';
  const score = searchParams.get('score'); // Optional: e.g. "98% Match"
  const image = searchParams.get('image'); // Optional: Background image URL

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0b',
          backgroundImage: 'linear-gradient(to bottom right, #0a0a0b, #1a1a2e)',
          color: 'white',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Background Accent */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          right: '-20%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, rgba(0,0,0,0) 70%)',
        }} />

        {/* Logo / Brand */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '20px',
          opacity: 0.8,
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="#3b82f6">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
          </svg>
          <span style={{ fontSize: 24, fontWeight: 'bold' }}>PawPersona</span>
        </div>

        {/* Main Content */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0 40px',
          zIndex: 10,
        }}>
          <div style={{
            fontSize: 64,
            fontWeight: 900,
            backgroundImage: 'linear-gradient(90deg, #fff, #9ca3af)',
            backgroundClip: 'text',
            color: 'transparent',
            marginBottom: '20px',
            lineHeight: 1.1,
            letterSpacing: '-2px',
          }}>
            {title}
          </div>

          <div style={{
            fontSize: 32,
            color: '#9ca3af',
            marginBottom: '40px',
          }}>
            {subtitle}
          </div>

          {score && (
            <div style={{
              display: 'flex',
              padding: '12px 32px',
              backgroundColor: '#3b82f6',
              borderRadius: '999px',
              fontSize: 28,
              fontWeight: 'bold',
              color: 'white',
              boxShadow: '0 4px 20px rgba(59,130,246,0.5)',
            }}>
              {score}
            </div>
          )}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
