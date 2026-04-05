'use client';

import { useEffect, useState } from 'react';
import { getSponsors } from '@/lib/api';

interface Sponsor {
  sponsor_id: string;
  sponsor_name: string;
  logo_url: string;
  website_url?: string;
  tier: string;
}

function useCountdown(target: Date) {
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    function calc() {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) return;
      setT({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    }
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [target]);
  return t;
}

const EVENT_DATE = new Date('2026-06-06T08:00:00');

export default function HomePage() {
  const cd = useCountdown(EVENT_DATE);
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);

  useEffect(() => {
    getSponsors()
      .then((r) => setSponsors(r.data))
      .catch(() => {});
  }, []);

  return (
    <div style={{ backgroundColor: '#ffffff', color: '#141514' }}>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-32px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        .hero-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #141514 0%, #1a1b1a 50%, #0d0e0d 100%);
          opacity: 0.95;
        }
        .accent-blue {
          color: #185bc5;
        }
        .accent-pink {
          color: #f78db9;
        }
        .icon-accent {
          filter: drop-shadow(0 2px 12px rgba(24, 91, 197, 0.15));
          animation: float 4s ease-in-out infinite;
        }
        .card-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(24, 91, 197, 0.1);
        }
        .divider-line {
          height: 1px;
          background: linear-gradient(to right, transparent, #d0d0d0, transparent);
        }
        .section-number {
          font-family: 'Ease SemiDisplay', sans-serif;
          font-size: 72px;
          font-weight: 700;
          line-height: 1;
          opacity: 0.05;
          position: absolute;
          top: -32px;
          right: 0;
        }
        @media (max-width: 768px) {
          .section-number {
            font-size: 48px;
            top: -20px;
          }
        }
      `}</style>

      {/* ──────────────────────── HERO ──────────────────────── */}
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '64px 24px',
          overflow: 'hidden',
        }}
      >
        <div className="hero-gradient" />

        {/* Hero Content */}
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 800, animation: 'fadeInUp 0.8s ease-out' }}>
          <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'center' }}>
            <img
              src="/images/icons/community-hearts-black.png"
              alt=""
              aria-hidden="true"
              className="icon-accent"
              style={{ height: 48, filter: 'brightness(2) drop-shadow(0 4px 16px rgba(247, 141, 185, 0.3))' }}
            />
          </div>

          <h1
            style={{
              fontFamily: "'Ease SemiDisplay', sans-serif",
              fontSize: 'clamp(48px, 9vw, 92px)',
              fontWeight: 700,
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
              color: '#ffffff',
              marginBottom: 16,
            }}
          >
            the dopamine
            <br />
            <span className="accent-blue">games</span>
          </h1>

          <p
            style={{
              fontSize: 'clamp(16px, 2vw, 20px)',
              color: '#d0d0d0',
              fontWeight: 400,
              marginBottom: 32,
              letterSpacing: '0.02em',
            }}
          >
            perform. play. party. together.
          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 48, flexWrap: 'wrap' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 24px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                borderRadius: 8,
                backdropFilter: 'blur(8px)',
              }}
            >
              <span style={{ fontSize: 14, color: '#d0d0d0' }}>📅</span>
              <span style={{ fontSize: 14, fontWeight: 500, color: '#ffffff' }}>June 6, 2026</span>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 24px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                borderRadius: 8,
                backdropFilter: 'blur(8px)',
              }}
            >
              <span style={{ fontSize: 14, color: '#d0d0d0' }}>📍</span>
              <span style={{ fontSize: 14, fontWeight: 500, color: '#ffffff' }}>Adidas Sports Base Berlin</span>
            </div>
          </div>

          <a
            href="/register"
            style={{
              display: 'inline-block',
              padding: '16px 48px',
              backgroundColor: '#185bc5',
              color: '#ffffff',
              fontFamily: "'Inter', sans-serif",
              fontSize: 16,
              fontWeight: 600,
              borderRadius: 8,
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              border: 'none',
              cursor: 'pointer',
              letterSpacing: '0.01em',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1451a8';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(24, 91, 197, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#185bc5';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            register now
          </a>
        </div>

        {/* Countdown */}
        <div style={{ position: 'relative', zIndex: 2, animation: 'fadeInUp 0.8s ease-out 0.2s both' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 'clamp(12px, 3vw, 24px)',
              padding: '32px 24px',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              borderRadius: 12,
              border: '1px solid rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(16px)',
            }}
          >
            {[
              { label: 'days', value: cd.days },
              { label: 'hours', value: cd.hours },
              { label: 'mins', value: cd.minutes },
              { label: 'secs', value: cd.seconds },
            ].map((item, i, arr) => (
              <div key={item.label} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    fontFamily: "'Ease SemiDisplay', sans-serif",
                    fontSize: 'clamp(28px, 6vw, 42px)',
                    fontWeight: 700,
                    color: i % 2 === 0 ? '#185bc5' : '#f78db9',
                    marginBottom: 4,
                  }}
                >
                  {String(item.value).padStart(2, '0')}
                </div>
                <div style={{ fontSize: 12, color: '#999999', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────── THREE PILLARS ──────────────────────── */}
      <section style={{ padding: '96px 24px', backgroundColor: '#ffffff', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ position: 'relative', marginBottom: 72 }}>
            <div className="section-number">01</div>
            <h2
              style={{
                fontFamily: "'Ease SemiDisplay', sans-serif",
                fontSize: 'clamp(40px, 6vw, 64px)',
                fontWeight: 700,
                lineHeight: 1.1,
                color: '#141514',
                marginBottom: 16,
                position: 'relative',
                zIndex: 1,
              }}
            >
              Three chapters,
              <br />
              <span className="accent-blue">one experience</span>
            </h2>
            <p style={{ fontSize: 18, color: '#707070', maxWidth: 600, lineHeight: 1.6 }}>
              From the first rep to the final beat — this is the full spectrum of dopamine. Every station is designed for peak performance.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 32,
              marginTop: 64,
            }}
          >
            {[
              {
                title: 'perform',
                description: 'push your limits across six skill stations designed for champions.',
                icon: '💪',
                color: '#185bc5',
              },
              {
                title: 'play',
                description: 'compete in open play slots and discover new movements.',
                icon: '🎯',
                color: '#f78db9',
              },
              {
                title: 'party',
                description: 'celebrate with 200+ athletes and live music until midnight.',
                icon: '🎉',
                color: '#185bc5',
              },
            ].map((pillar, i) => (
              <div
                key={pillar.title}
                className="card-hover"
                style={{
                  padding: 40,
                  backgroundColor: '#ffffff',
                  border: '1px solid #efefef',
                  borderRadius: 12,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background: pillar.color,
                  }}
                />
                <div style={{ fontSize: 40, marginBottom: 16 }}>{pillar.icon}</div>
                <h3
                  style={{
                    fontFamily: "'Ease SemiDisplay', sans-serif",
                    fontSize: 32,
                    fontWeight: 700,
                    color: '#141514',
                    marginBottom: 12,
                    textTransform: 'lowercase',
                  }}
                >
                  {pillar.title}
                </h3>
                <p style={{ fontSize: 16, color: '#707070', lineHeight: 1.6 }}>{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────── WORKOUTS PREVIEW ──────────────────────── */}
      <section style={{ padding: '96px 24px', backgroundColor: '#efefef', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ position: 'relative', marginBottom: 72 }}>
            <div className="section-number">02</div>
            <h2
              style={{
                fontFamily: "'Ease SemiDisplay', sans-serif",
                fontSize: 'clamp(40px, 6vw, 64px)',
                fontWeight: 700,
                lineHeight: 1.1,
                color: '#141514',
                marginBottom: 16,
                position: 'relative',
                zIndex: 1,
              }}
            >
              master the
              <br />
              <span className="accent-pink">six stations</span>
            </h2>
            <p style={{ fontSize: 18, color: '#707070', maxWidth: 600, lineHeight: 1.6 }}>
              Each movement tested. Each format proven. Each athlete scored.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 12, marginBottom: 48, flexWrap: 'wrap' }}>
            {['all', 'cardio', 'strength', 'finisher'].map((filter) => (
              <button
                key={filter}
                style={{
                  padding: '10px 24px',
                  backgroundColor: filter === 'all' ? '#141514' : '#ffffff',
                  color: filter === 'all' ? '#ffffff' : '#141514',
                  border: '1px solid #d0d0d0',
                  borderRadius: 6,
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textTransform: 'capitalize',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#141514';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  if (filter === 'all') return;
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.color = '#141514';
                }}
              >
                {filter}
              </button>
            ))}
          </div>

          <a
            href="/workouts"
            style={{
              display: 'inline-block',
              padding: '14px 32px',
              backgroundColor: '#f78db9',
              color: '#ffffff',
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              fontWeight: 600,
              borderRadius: 6,
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              border: 'none',
              cursor: 'pointer',
              marginTop: 48,
              letterSpacing: '0.01em',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f465a0';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f78db9';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            view all workouts
          </a>
        </div>
      </section>

      {/* ──────────────────────── SPONSORS ──────────────────────── */}
      {sponsors.length > 0 && (
        <section style={{ padding: '72px 24px', backgroundColor: '#ffffff', borderTop: '1px solid #efefef' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <h2
              style={{
                fontFamily: "'Ease SemiDisplay', sans-serif",
                fontSize: 28,
                fontWeight: 700,
                color: '#141514',
                marginBottom: 48,
                textAlign: 'center',
              }}
            >
              supported by
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: 32,
              }}
            >
              {sponsors.map((sponsor) => (
                <div
                  key={sponsor.sponsor_id}
                  style={{
                    padding: 24,
                    backgroundColor: '#f9f9f9',
                    borderRadius: 8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 120,
                    border: '1px solid #efefef',
                  }}
                >
                  <img
                    src={sponsor.logo_url}
                    alt={sponsor.sponsor_name}
                    style={{ maxHeight: 80, maxWidth: '100%', objectFit: 'contain' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ──────────────────────── FOOTER ──────────────────────── */}
      <footer style={{ padding: '48px 24px', backgroundColor: '#141514', borderTop: '1px solid #efefef' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 48,
              marginBottom: 48,
            }}
          >
            <div>
              <h3 style={{ fontFamily: "'Ease SemiDisplay', sans-serif", fontSize: 18, fontWeight: 700, color: '#ffffff', marginBottom: 16 }}>
                dopamine games
              </h3>
              <p style={{ fontSize: 14, color: '#999999', lineHeight: 1.6 }}>
                June 6, 2026 · Adidas Sports Base Berlin
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: 12, fontWeight: 600, color: '#d0d0d0', textTransform: 'uppercase', marginBottom: 12, letterSpacing: '0.1em' }}>
                explore
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {['register', 'workouts', 'leaderboard', 'open play'].map((item) => (
                  <li key={item} style={{ marginBottom: 8 }}>
                    <a href={`/${item}`} style={{ fontSize: 14, color: '#999999', textDecoration: 'none' }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 24, textAlign: 'center' }}>
            <p style={{ fontSize: 12, color: '#666666' }}>
              © 2026 dopamine studio. perform. play. party. together.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
