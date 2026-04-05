'use client';

import './globals.css';
import Navigation from '@/components/Navigation';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>The Dopamine Games 2026</title>
        <meta name="description" content="PERFORM. PLAY. PARTY. TOGETHER. — June 6, 2026 · Adidas Sports Base Berlin" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo-symbol.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body style={{ backgroundColor: '#fff', color: '#141514', margin: 0, padding: 0 }}>
        <Navigation />
        <main>{children}</main>
        <footer style={{ backgroundColor: '#141514', padding: '56px 24px', textAlign: 'center' }}>
          <img src="/logo-white.svg" alt="Dopamine Studio" style={{ height: 26, width: 'auto', margin: '0 auto 16px', display: 'block' }} />
          <p style={{ fontSize: 13, color: '#666' }}>June 6, 2026 · Adidas Sports Base Berlin</p>
          <p style={{ fontSize: 11, color: '#333', marginTop: 20 }}>© 2026 Dopamine Studio. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
