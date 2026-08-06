import { ImageResponse } from 'next/og';

export const alt = 'AstralixNodes - Premium Game Hosting & VPS Servers';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #020202 0%, #180228 100%)',
          position: 'relative',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Decorative glows */}
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            left: '-10%',
            width: '800px',
            height: '800px',
            background: '#64189D',
            filter: 'blur(200px)',
            opacity: 0.4,
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-20%',
            right: '-10%',
            width: '800px',
            height: '800px',
            background: '#a855f7',
            filter: 'blur(200px)',
            opacity: 0.3,
            borderRadius: '50%',
          }}
        />
        
        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            padding: '40px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: '32px',
              fontWeight: 800,
              color: '#d1d5db',
              textTransform: 'uppercase',
              letterSpacing: '4px',
              marginBottom: '20px',
            }}
          >
            astralixnodes.com
          </div>
          <h1
            style={{
              fontSize: '85px',
              fontWeight: 900,
              color: 'white',
              marginBottom: '30px',
              textTransform: 'uppercase',
              letterSpacing: '-2px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            ASTRALIX<span style={{ color: '#c084fc' }}>NODES</span>
          </h1>
          <p
            style={{
              fontSize: '40px',
              fontWeight: 600,
              color: '#e5e7eb',
              maxWidth: '950px',
              textAlign: 'center',
              lineHeight: 1.4,
              marginBottom: '60px'
            }}
          >
            Infraestructura Cloud y Game Hosting de Alto Rendimiento
          </p>
          
          <div
            style={{
              display: 'flex',
              gap: '30px',
              marginTop: '20px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', color: 'white', fontSize: '28px', fontWeight: 600, background: 'rgba(255,255,255,0.05)', padding: '16px 32px', borderRadius: '24px', border: '1px solid rgba(100,24,157,0.5)' }}>
              <span style={{ color: '#4ade80', marginRight: '12px' }}>●</span> 99.9% Uptime
            </div>
            <div style={{ display: 'flex', alignItems: 'center', color: 'white', fontSize: '28px', fontWeight: 600, background: 'rgba(255,255,255,0.05)', padding: '16px 32px', borderRadius: '24px', border: '1px solid rgba(100,24,157,0.5)' }}>
              <span style={{ color: '#60a5fa', marginRight: '12px' }}>🛡️</span> Protección DDoS
            </div>
            <div style={{ display: 'flex', alignItems: 'center', color: 'white', fontSize: '28px', fontWeight: 600, background: 'rgba(255,255,255,0.05)', padding: '16px 32px', borderRadius: '24px', border: '1px solid rgba(100,24,157,0.5)' }}>
              <span style={{ color: '#fbbf24', marginRight: '12px' }}>⚡</span> Low Latency
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
