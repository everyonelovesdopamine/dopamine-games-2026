'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import AuthModal from '@/components/AuthModal';

const links = [
  { href: '/', label: 'home' },
  { href: '/workouts/', label: 'workouts' },
  { href: '/open-play/', label: 'open play' },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signup' | 'signin'>('signin');
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const initial = user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || '?';

  const openAuth = (mode: 'signup' | 'signin') => {
    setAuthMode(mode);
    setAuthOpen(true);
    setOpen(false);
  };

  const handleSignOut = () => {
    signOut();
    setMenuOpen(false);
    setOpen(false);
  };

  return (
    <>
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

          <div style={{ display: 'flex', alignItems: 'center', gap: 28 }} className="hide-mobile">
            {links.map((l) => (
              <a key={l.href} href={l.href}
                style={{ fontSize: 14, fontWeight: 500, color: '#707070', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#141514')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#707070')}
              >
                {l.label}
              </a>
            ))}

            {user ? (
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setMenuOpen((v) => !v)}
                  aria-label="account menu"
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    background: 'none', border: 'none', cursor: 'pointer', padding: '4px 6px',
                    fontFamily: 'inherit', color: '#141514',
                  }}
                >
                  <span style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: user.emailVerified
                      ? 'linear-gradient(135deg, #F78DB9 0%, #185BC5 100%)'
                      : '#E4E4E4',
                    color: user.emailVerified ? '#fff' : '#707070',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, fontWeight: 700,
                  }}>
                    {initial}
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '-0.005em' }}>
                    {user.name.split(' ')[0].toLowerCase()}
                  </span>
                </button>

                {menuOpen && (
                  <>
                    <div onClick={() => setMenuOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 60 }} />
                    <div style={{
                      position: 'absolute', right: 0, top: '110%', minWidth: 220,
                      background: '#fff', border: '1px solid #EFEFEF', borderRadius: 16,
                      boxShadow: '0 16px 48px rgba(0,0,0,0.10)', padding: 8, zIndex: 70,
                    }}>
                      <div style={{ padding: '10px 12px 12px', borderBottom: '1px solid #F5F5F5', marginBottom: 4 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#141514' }}>{user.name}</div>
                        <div style={{ fontSize: 11, color: '#707070', marginTop: 2 }}>{user.email}</div>
                        {!user.emailVerified && (
                          <div style={{ fontSize: 10, color: '#D85F93', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 6 }}>
                            email not verified
                          </div>
                        )}
                      </div>
                      <a href="/account" onClick={() => setMenuOpen(false)}
                        style={{
                          display: 'block', padding: '10px 12px', fontSize: 13, fontWeight: 500,
                          color: '#141514', borderRadius: 10, textDecoration: 'none',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = '#F8F8F8')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        my account
                      </a>
                      <button onClick={handleSignOut}
                        style={{
                          display: 'block', width: '100%', textAlign: 'left',
                          padding: '10px 12px', fontSize: 13, fontWeight: 500,
                          color: '#707070', border: 'none', background: 'none',
                          borderRadius: 10, cursor: 'pointer', fontFamily: 'inherit',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = '#F8F8F8')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        sign out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button onClick={() => openAuth('signin')} style={{
                fontSize: 13, fontWeight: 600, color: '#141514',
                background: 'none', border: 'none', padding: '6px 4px',
                cursor: 'pointer', fontFamily: 'inherit',
              }}>
                sign in
              </button>
            )}

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
            {user ? (
              <>
                <a href="/account" onClick={() => setOpen(false)}
                  style={{ display: 'block', padding: '14px 0', fontSize: 15, fontWeight: 500, color: '#141514', borderBottom: '1px solid #EFEFEF' }}>
                  my account
                </a>
                <button onClick={handleSignOut}
                  style={{
                    display: 'block', width: '100%', textAlign: 'left',
                    padding: '14px 0', fontSize: 15, fontWeight: 500, color: '#707070',
                    border: 'none', background: 'none', borderBottom: '1px solid #EFEFEF',
                    fontFamily: 'inherit', cursor: 'pointer',
                  }}>
                  sign out
                </button>
              </>
            ) : (
              <button onClick={() => openAuth('signin')}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  padding: '14px 0', fontSize: 15, fontWeight: 500, color: '#141514',
                  border: 'none', background: 'none', borderBottom: '1px solid #EFEFEF',
                  fontFamily: 'inherit', cursor: 'pointer',
                }}>
                sign in / sign up
              </button>
            )}
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

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} initialMode={authMode} />
    </>
  );
}
