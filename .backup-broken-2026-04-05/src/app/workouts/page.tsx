'use client';

import { useState } from 'react';

interface WeightRow {
  FF: string;
  Mixed: string;
  MM: string;
  note?: string;
}

interface Movement {
  name: string;
  image: string;
  videoId?: string;
  weights?: {
    core: WeightRow;
    elite: WeightRow;
  };
}

interface Station {
  number: number;
  section: 'CARDIO' | 'STRENGTH & CONDITIONING' | 'FINISHER';
  format: string;
  score: string;
  movements: Movement[];
}

const STATIONS: Station[] = [
  {
    number: 1,
    section: 'CARDIO',
    format: '6 min',
    score: 'calories',
    movements: [{ name: 'Ski Erg', image: 'https://images.unsplash.com/photo-1544033527-b192b5e53e9c?w=900&q=90&auto=format&fit=crop' }],
  },
  {
    number: 2,
    section: 'CARDIO',
    format: '6 min',
    score: 'calories',
    movements: [{ name: 'Row', image: '/images/photos/athlete-rowing-competition-crowd.jpg' }],
  },
  {
    number: 3,
    section: 'CARDIO',
    format: '6 min',
    score: 'calories',
    movements: [{ name: 'Bike', image: '/images/photos/athlete-assault-bike-intensity.jpg' }],
  },
  {
    number: 4,
    section: 'STRENGTH & CONDITIONING',
    format: '9 min',
    score: 'reps',
    movements: [
      { name: 'Snatch', image: '/images/photos/athlete-barbell-snatch.jpg' },
      { name: 'Box Jump', image: '/images/photos/athlete-box-jump.jpg' },
    ],
  },
  {
    number: 5,
    section: 'STRENGTH & CONDITIONING',
    format: '9 min',
    score: 'reps',
    movements: [
      { name: 'Clean & Jerk', image: '/images/photos/athlete-clean-jerk.jpg' },
      { name: 'Wall Ball', image: '/images/photos/athlete-wall-ball.jpg' },
    ],
  },
  {
    number: 6,
    section: 'FINISHER',
    format: '3 min',
    score: 'reps',
    movements: [{ name: 'Double Unders', image: '/images/photos/athlete-rope-jump.jpg' }],
  },
];

type SectionFilter = 'all' | 'CARDIO' | 'STRENGTH & CONDITIONING' | 'FINISHER';

export default function WorkoutsPage() {
  const [activeFilter, setActiveFilter] = useState<SectionFilter>('all');

  const filteredStations = activeFilter === 'all' ? STATIONS : STATIONS.filter((s) => s.section === activeFilter);

  const sectionColors: Record<string, { bg: string; accent: string }> = {
    CARDIO: { bg: '#f0f6ff', accent: '#185bc5' },
    'STRENGTH & CONDITIONING': { bg: '#fff0f5', accent: '#f78db9' },
    FINISHER: { bg: '#f5f5f5', accent: '#141514' },
  };

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
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .card-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(24, 91, 197, 0.08);
        }
        .section-badge {
          display: inline-block;
          padding: 8px 16px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          transition: all 0.2s;
        }
        .icon-accent {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>

      {/* ──────────────────────── PAGE HEADER ──────────────────────── */}
      <section style={{ padding: '64px 24px 48px', backgroundColor: '#ffffff', borderBottom: '1px solid #efefef' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ marginBottom: 24 }}>
            <a href="/" style={{ fontSize: 14, color: '#707070', textDecoration: 'none', fontWeight: 500 }}>
              ← back home
            </a>
          </div>
          <h1
            style={{
              fontFamily: "'Ease SemiDisplay', sans-serif",
              fontSize: 'clamp(48px, 8vw, 72px)',
              fontWeight: 700,
              lineHeight: 1.1,
              color: '#141514',
              marginBottom: 16,
            }}
          >
            the six <span style={{ color: '#185bc5' }}>stations</span>
          </h1>
          <p style={{ fontSize: 18, color: '#707070', maxWidth: 600, lineHeight: 1.6 }}>
            Each station is 9 minutes of intense competition. Score is cumulative across all six stations.
          </p>
        </div>
      </section>

      {/* ──────────────────────── FILTERS ──────────────────────── */}
      <section style={{ padding: '32px 24px', backgroundColor: '#ffffff', borderBottom: '1px solid #efefef' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: '#707070', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            filter by section
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {(['all', 'CARDIO', 'STRENGTH & CONDITIONING', 'FINISHER'] as SectionFilter[]).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                style={{
                  padding: '10px 24px',
                  backgroundColor: activeFilter === filter ? '#141514' : '#ffffff',
                  color: activeFilter === filter ? '#ffffff' : '#141514',
                  border: `1px solid ${activeFilter === filter ? '#141514' : '#d0d0d0'}`,
                  borderRadius: 6,
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  textTransform: 'capitalize',
                }}
                onMouseEnter={(e) => {
                  if (activeFilter !== filter) {
                    e.currentTarget.style.borderColor = '#141514';
                    e.currentTarget.style.backgroundColor = '#f9f9f9';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeFilter !== filter) {
                    e.currentTarget.style.borderColor = '#d0d0d0';
                    e.currentTarget.style.backgroundColor = '#ffffff';
                  }
                }}
              >
                {filter === 'all' ? 'view all' : filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────── STATIONS GRID ──────────────────────── */}
      <section style={{ padding: '64px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: 32,
            }}
          >
            {filteredStations.map((station, idx) => {
              const colors = sectionColors[station.section];
              return (
                <div
                  key={station.number}
                  className="card-hover"
                  style={{
                    backgroundColor: colors.bg,
                    border: `1px solid ${colors.accent}20`,
                    borderRadius: 12,
                    overflow: 'hidden',
                    animation: `fadeInUp 0.5s ease-out ${idx * 0.1}s both`,
                  }}
                >
                  {/* Station Header */}
                  <div style={{ padding: 32, position: 'relative' }}>
                    <div
                      style={{
                        fontSize: 56,
                        fontWeight: 700,
                        fontFamily: "'Ease SemiDisplay', sans-serif",
                        color: colors.accent,
                        lineHeight: 1,
                        marginBottom: 12,
                      }}
                    >
                      {station.number}
                    </div>
                    <div className="section-badge" style={{ backgroundColor: colors.accent, color: '#ffffff', marginBottom: 16 }}>
                      {station.section}
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        gap: 16,
                        fontSize: 14,
                        color: '#707070',
                        marginBottom: 24,
                      }}
                    >
                      <span style={{ fontWeight: 600 }}>⏱ {station.format}</span>
                      <span style={{ fontWeight: 600 }}>📊 {station.score}</span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div style={{ height: '1px', background: `${colors.accent}20` }} />

                  {/* Movements */}
                  <div style={{ padding: '24px 32px' }}>
                    <p style={{ fontSize: 12, fontWeight: 600, color: '#707070', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      movements
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {station.movements.map((movement, i) => (
                        <li
                          key={i}
                          style={{
                            padding: '12px 0',
                            fontSize: 15,
                            fontWeight: 500,
                            color: '#141514',
                            borderBottom: i < station.movements.length - 1 ? `1px solid ${colors.accent}15` : 'none',
                          }}
                        >
                          {movement.name}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div style={{ padding: '0 32px 32px' }}>
                    <button
                      style={{
                        width: '100%',
                        padding: '12px 24px',
                        backgroundColor: colors.accent,
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: 6,
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        letterSpacing: '0.01em',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.opacity = '0.9';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.opacity = '1';
                      }}
                    >
                      learn more
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredStations.length === 0 && (
            <div style={{ textAlign: 'center', padding: '64px 24px' }}>
              <p style={{ fontSize: 18, color: '#707070', marginBottom: 24 }}>no stations found for this section.</p>
              <button
                onClick={() => setActiveFilter('all')}
                style={{
                  padding: '12px 32px',
                  backgroundColor: '#185bc5',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: 6,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                view all stations
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ──────────────────────── INFO SECTION ──────────────────────── */}
      <section style={{ padding: '72px 24px', backgroundColor: '#f9f9f9', borderTop: '1px solid #efefef' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: "'Ease SemiDisplay', sans-serif",
              fontSize: 'clamp(32px, 6vw, 52px)',
              fontWeight: 700,
              color: '#141514',
              marginBottom: 48,
              textAlign: 'center',
            }}
          >
            how the <span style={{ color: '#f78db9' }}>scoring</span> works
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 32,
            }}
          >
            {[
              { title: 'Cardio', desc: 'Score is total calories burned. Fastest combined time wins.' },
              { title: 'Strength', desc: 'Score is total reps. Quality counts — every rep must meet standard.' },
              { title: 'Finisher', desc: 'Score is total reps. The ultimate tiebreaker of the day.' },
            ].map((item) => (
              <div key={item.title} style={{ padding: 32, backgroundColor: '#ffffff', borderRadius: 8, border: '1px solid #efefef' }}>
                <h3 style={{ fontFamily: "'Ease SemiDisplay', sans-serif", fontSize: 20, fontWeight: 700, color: '#141514', marginBottom: 12 }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: 15, color: '#707070', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────── FOOTER ──────────────────────── */}
      <footer style={{ padding: '48px 24px', backgroundColor: '#141514', borderTop: '1px solid #262626' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
            <div>
              <h3 style={{ fontFamily: "'Ease SemiDisplay', sans-serif", fontSize: 18, fontWeight: 700, color: '#ffffff', marginBottom: 8 }}>
                ready to compete?
              </h3>
              <p style={{ fontSize: 14, color: '#999999' }}>register now to secure your spot</p>
            </div>
            <a
              href="/register"
              style={{
                padding: '14px 40px',
                backgroundColor: '#185bc5',
                color: '#ffffff',
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: 600,
                borderRadius: 6,
                transition: 'all 0.3s',
                border: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1451a8';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#185bc5';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              register now
            </a>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: 32, paddingTop: 24, textAlign: 'center' }}>
            <p style={{ fontSize: 12, color: '#666666' }}>
              © 2026 dopamine studio · perform. play. party. together.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
