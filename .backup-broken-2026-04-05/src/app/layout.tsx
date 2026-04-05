import './globals.css';
import Navigation from '@/components/Navigation';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>The Dopamine Games 2026</title>
        <meta name="description" content="perform. play. party. together. — June 6, 2026 · Adidas Sports Base Berlin" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo-symbol.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body style={{ backgroundColor: '#fff', color: '#141514', margin: 0, padding: 0 }}>
        <Navigation />
        <main>{children}</main>
        <footer style={{ backgroundColor: '#141514', padding: '64px 24px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          {/* Hearts pattern texture */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'url(/images/icons/hearts-pattern-black.png)',
            backgroundSize: '140px',
            backgroundRepeat: 'repeat',
            opacity: 0.015,
            filter: 'invert(1)',
            pointerEvents: 'none',
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Logo symbol */}
            <img src="/brand/logos/symbol/style-1/dopamine-logo-symbol-style-1-white.png" alt="" aria-hidden="true" style={{ height: 32, margin: '0 auto 20px', display: 'block', opacity: 0.15 }} />
            {/* Wordmark */}
            <img src="/logo-white.svg" alt="Dopamine Studio" style={{ height: 26, width: 'auto', margin: '0 auto 8px', display: 'block' }} />

            <p style={{ fontSize: 13, color: '#666', marginBottom: 24 }}>June 6, 2026 · Adidas Sports Base Berlin</p>

            {/* Community hearts divider */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 24 }}>
              <div style={{ height: 1, width: 60, background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)' }} />
              <img src="/images/icons/duo-running-hearts-white.png" alt="" aria-hidden="true" style={{ height: 20, opacity: 0.1 }} />
              <div style={{ height: 1, width: 60, background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)' }} />
            </div>

            <p style={{ fontSize: 11, color: '#333' }}>© 2026 Dopamine Studio. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
