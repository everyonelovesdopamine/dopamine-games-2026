'use client';

import { useState } from 'react';

const links = [
  { href: '/', label: 'home' },
  { href: '/workouts/', label: 'workouts' },
  { href: '/open-play/', label: 'open play' },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      backgroundColor: 'rgba(255,255,255,0.97)',
      borderBottom: '1px solid #EFEFEF',
      backdropFilter: 'blur(16px)',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        <a href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/logo-white.svg" alt="dopamine™" style={{ height: 22, width: 'auto', filter: 'invert(1)' }} />
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }} className="hide-mobile">
          {links.map((l) => (
            <a key={l.href} href={l.href}
              style={{ fontSize: 14, fontWeight: 500, color: '#707070', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#141514')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#707070')}
            >
              {l.label}
            </a>
          ))}
          <a href="https://team-aretas.com/competitions/3444" target="_blank" rel="noopener noreferrer" style={{
            fontSize: 14, fontWeight: 700,
            padding: '9px 22px', borderRadius: 100,
            backgroundColor: '#141514', color: '#fff',
          }}>
            register
          </a>
        </div>

        <button onClick={() => setOpen(!open)} className="show-mobile"
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, padding: 4, color: '#141514' }}
          aria-label="Menu"
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {open && (
        <div style={{ backgroundColor: '#fff', borderTop: '1px solid #EFEFEF', padding: '16px 40px 28px' }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              style={{ display: 'block', padding: '14px 0', fontSize: 15, fontWeight: 500, color: '#707070', borderBottom: '1px solid #EFEFEF' }}
            >
              {l.label}
            </a>
          ))}
          <a href="https://team-aretas.com/competitions/3444" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} style={{
            display: 'block', marginTop: 16, textAlign: 'center', padding: 14,
            borderRadius: 100, backgroundColor: '#141514', color: '#fff',
            fontWeight: 700, fontSize: 14,
          }}>
            register
          </a>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) { .show-mobile { display: none !important; } }
        @media (max-width: 767px) { .hide-mobile { display: none !important; } }
      `}</style>
    </nav>
  );
}
