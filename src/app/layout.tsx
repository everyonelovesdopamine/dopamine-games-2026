'use client';

import './globals.css';
import Navigation from '@/components/Navigation';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>the dopamine games 2026</title>
        <meta name="description" content="perform. play. party. together. june 6, 2026 · adidas sports base berlin" />
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
          <p style={{ fontSize: 13, color: '#666' }}>june 6, 2026 · adidas sports base berlin</p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 28, flexWrap: 'wrap' }}>
            <a href="https://www.instagram.com/thedopaminestudio/" target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 12, color: '#999', textDecoration: 'none' }}>instagram</a>
            <a href="mailto:info@thedopaminestudio.com"
              style={{ fontSize: 12, color: '#999', textDecoration: 'none' }}>info@thedopaminestudio.com</a>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 14, flexWrap: 'wrap' }}>
            <a href="https://thedopaminestudio.com/terms" target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 11, color: '#666', textDecoration: 'none' }}>terms of service</a>
            <a href="https://thedopaminestudio.com/privacy" target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 11, color: '#666', textDecoration: 'none' }}>privacy policy</a>
            <a href="https://thedopaminestudio.com/legal" target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 11, color: '#666', textDecoration: 'none' }}>legal notice</a>
          </div>

          <p style={{ fontSize: 11, color: '#333', marginTop: 24 }}>© 2026 dopamine studio. all rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
