'use client';

import { useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

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

// ─── Data ─────────────────────────────────────────────────────────────────────

const STATIONS: Station[] = [
  {
    number: 1, section: 'CARDIO', format: '6 min', score: 'calories',
    movements: [
      { name: 'Ski Erg', image: 'https://images.unsplash.com/photo-1544033527-b192b5e53e9c?w=900&q=90&auto=format&fit=crop' },
    ],
  },
  {
    number: 2, section: 'CARDIO', format: '6 min', score: 'calories',
    movements: [
      { name: 'Row', image: '/images/photos/athlete-rowing-competition-crowd.jpg' },
    ],
  },
  {
    number: 3, section: 'CARDIO', format: '6 min', score: 'calories',
    movements: [
      { name: 'Bike', image: '/images/photos/athlete-assault-bike-intensity.jpg' },
    ],
  },
  {
    number: 4, section: 'STRENGTH & CONDITIONING', format: 'AMRAP · 6 min', score: '20 reps each',
    movements: [
      {
        name: 'Deadlift', image: '/images/photos/athlete-barbell-grip-smiling.jpg',
        weights: {
          core:  { FF: '40 kg', Mixed: '50 kg', MM: '60 kg' },
          elite: { FF: '50 kg', Mixed: '60 kg', MM: '80 kg' },
        },
      },
      {
        name: 'Box Jump Over', image: 'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=900&q=90&auto=format&fit=crop',
        weights: {
          core:  { FF: '20"', Mixed: '20"', MM: '20"' },
          elite: { FF: '20"', Mixed: '20"', MM: '24"' },
        },
      },
    ],
  },
  {
    number: 5, section: 'STRENGTH & CONDITIONING', format: 'AMRAP · 6 min', score: '20 reps each',
    movements: [
      {
        name: 'Sandbag Toss Over Shoulder', image: '/images/photos/athlete-sled-push-competition.jpg',
        weights: {
          core:  { FF: '15 kg', Mixed: '20 kg', MM: '30 kg' },
          elite: { FF: '20 kg', Mixed: '30 kg', MM: '40 kg' },
        },
      },
      {
        name: 'Sandbag Squat', image: '/images/photos/duo-deadlift-outdoor-turf.jpg',
        weights: {
          core:  { FF: '15 kg', Mixed: '20 kg', MM: '30 kg' },
          elite: { FF: '20 kg', Mixed: '30 kg', MM: '40 kg' },
        },
      },
    ],
  },
  {
    number: 6, section: 'STRENGTH & CONDITIONING', format: 'AMRAP · 6 min', score: '20 reps each',
    movements: [
      {
        name: 'Dumbbell Shoulder to Overhead', image: '/images/photos/teammates-barbell-rack-dopamine-tees.jpg',
        weights: {
          core:  { FF: '2 × 7.5 kg', Mixed: '2 × 10 kg', MM: '2 × 12.5 kg', note: 'per dumbbell' },
          elite: { FF: '2 × 10 kg', Mixed: '2 × 15 kg', MM: '2 × 17.5 kg', note: 'per dumbbell' },
        },
      },
      {
        name: 'Burpees', image: '/images/photos/athletes-recovery-games-tee-rowers.jpg',
      },
    ],
  },
  {
    number: 7, section: 'FINISHER', format: '6 min', score: 'metres · you run, I run',
    movements: [
      { name: 'Max Distance Run', image: '/images/photos/women-sprinting-close-up.jpg' },
    ],
  },
];

const SECTION_ORDER: Station['section'][] = ['CARDIO', 'STRENGTH & CONDITIONING', 'FINISHER'];

function getWeightRows(level: 'core' | 'elite') {
  return STATIONS.flatMap((s) =>
    s.movements
      .filter((m) => m.weights)
      .map((m) => ({ station: s.number, name: m.name, ...m.weights![level] }))
  );
}

// All movements flattened for movement standards section
const ALL_MOVEMENTS = STATIONS.flatMap((s) =>
  s.movements.map((m, i) => ({ station: s.number, index: i, total: s.movements.length, ...m }))
);

// ─── Component ────────────────────────────────────────────────────────────────

export default function WorkoutsPage() {
  const [level, setLevel] = useState<'core' | 'elite'>('elite');
  const weightRows = getWeightRows(level);

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', paddingTop: 64 }}>

      <style>{`
        @keyframes iconDrift { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-10px) rotate(2deg); } }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .std-card:hover img { transform: scale(1.04); }
      `}</style>

      {/* Hero */}
      <div style={{ position: 'relative', height: 440, overflow: 'hidden' }} className="grain-overlay">
        <img
          src="/images/photos/duo-deadlift-outdoor-turf.jpg"
          alt="the workouts"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%', filter: 'contrast(1.05)' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(20,21,20,0.15) 0%, rgba(20,21,20,0.9) 100%)' }} />

        {/* floating icons */}
        <img src="/images/icons/community-hearts-white.png" alt="" aria-hidden="true"
          style={{ position: 'absolute', right: '6%', bottom: '12%', height: 80, opacity: 0.05, zIndex: 2, pointerEvents: 'none', animation: 'iconDrift 7s ease-in-out infinite' }} />
        <img src="/images/icons/runners-speed-white.png" alt="" aria-hidden="true"
          style={{ position: 'absolute', left: '5%', top: '20%', height: 52, opacity: 0.03, zIndex: 2, pointerEvents: 'none', animation: 'iconDrift 9s ease-in-out infinite', animationDelay: '1.5s' }} />

        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px' }}>
          <img src="/images/icons/community-hearts-white.png" alt="" aria-hidden="true" style={{ height: 44, opacity: 0.12, marginBottom: 24 }} />
          <h1 style={{ fontSize: 'clamp(48px, 9vw, 84px)', fontWeight: 700, letterSpacing: '-0.03em', color: '#fff', marginBottom: 20 }}>the workouts</h1>
        </div>
      </div>

      {/* ─── Sponsors strip ─── */}
      <div style={{ backgroundColor: '#141514', overflow: 'hidden', padding: '22px 0', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', animation: 'marquee 24s linear infinite', whiteSpace: 'nowrap' }}>
          {Array.from({ length: 2 }).map((_, rep) => (
            <div key={rep} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              {Array.from({ length: 10 }).map((_, i) => (
                <img key={`${rep}-${i}`} src="/images/adidas logos/adidas-stripes.png" alt="adidas" style={{ height: 56, marginRight: 84, filter: 'invert(1)', mixBlendMode: 'screen', opacity: 0.5 }} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ─── Sticky section nav ─── */}
      <div style={{ position: 'sticky', top: 64, zIndex: 20, backgroundColor: '#fff', borderBottom: '1px solid #EFEFEF' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '12px 24px', display: 'flex', gap: 8, overflowX: 'auto', justifyContent: 'center' }}>
          {[
            { label: 'the workout', href: '#workout' },
            { label: 'weights', href: '#weights' },
            { label: 'movement standards', href: '#standards' },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              style={{
                display: 'inline-block', padding: '8px 18px', fontSize: 12, fontWeight: 600,
                color: '#141514', textDecoration: 'none', whiteSpace: 'nowrap',
                border: '1px solid #D0D0D0', borderRadius: 100,
                backgroundColor: '#fff', transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#141514'; e.currentTarget.style.borderColor = '#141514'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.borderColor = '#D0D0D0'; e.currentTarget.style.color = '#141514'; }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          SECTION 1 — THE WORKOUT
      ═══════════════════════════════════════════════ */}
      <section id="workout" style={{ backgroundColor: '#fff', padding: '64px 24px 80px', position: 'relative' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>

          {/* Format stat bar + tagline — dark editorial */}
          <div style={{ backgroundColor: '#141514', borderRadius: 12, overflow: 'hidden', marginBottom: 56, position: 'relative' }}>
            {/* subtle icon watermark */}
            <img src="/images/icons/community-hearts-white.png" alt="" aria-hidden="true"
              style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', height: 80, opacity: 0.04, pointerEvents: 'none' }} />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, padding: '28px 0 20px', position: 'relative', zIndex: 1 }}>
              {[{ label: 'work', value: '6 min' }, { label: 'rest', value: '90 sec' }, { label: 'format', value: 'teams of 2' }].map((b, i) => (
                <div key={b.label} style={{ flex: 1, textAlign: 'center', borderRight: i < 2 ? '1px solid rgba(255,255,255,0.1)' : 'none', padding: '0 20px' }}>
                  <p style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.35)', marginBottom: 6, letterSpacing: '0.1em' }}>{b.label}</p>
                  <p style={{ fontSize: 22, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>{b.value}</p>
                </div>
              ))}
            </div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '14px 0', textAlign: 'center', position: 'relative', zIndex: 1 }}>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.02em' }}>
                you go, i go <span style={{ margin: '0 8px', opacity: 0.3 }}>—</span> 1 partner working · 1 partner resting
              </p>
            </div>
          </div>

          {/* Stations by section */}
          {SECTION_ORDER.map((section, sectionIdx) => {
            const sectionStations = STATIONS.filter((s) => s.section === section);
            const isLastSection = sectionIdx === SECTION_ORDER.length - 1;
            return (
              <div key={section} style={{ marginBottom: isLastSection ? 0 : 0 }}>

                {/* Section header — editorial */}
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 24, paddingBottom: 12, borderBottom: '2px solid #141514' }}>
                  <h3 style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 700, color: '#141514', letterSpacing: '-0.02em' }}>
                    {section.toLowerCase()}
                  </h3>
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#888' }}>
                    {section === 'CARDIO' ? 'as many calories as possible' : section === 'FINISHER' ? 'as many metres as possible' : 'as many reps as possible'}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {sectionStations.map((station, si) => (
                    <div key={station.number}>
                      {/* Station row — editorial card */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '20px 0', position: 'relative' }}>

                        {/* Large number */}
                        <div style={{ width: 64, flexShrink: 0, textAlign: 'center' }}>
                          <span style={{ fontSize: 56, fontWeight: 700, color: '#F78DB9', lineHeight: 1, display: 'block' }}>
                            {String(station.number).padStart(2, '0')}
                          </span>
                        </div>

                        {/* Content */}
                        <div style={{ flex: 1 }}>
                          {station.movements.length > 1 && (
                            <p style={{ fontSize: 10, fontWeight: 700, color: '#888', marginBottom: 8, letterSpacing: '0.06em' }}>AMRAP</p>
                          )}
                          {station.movements.map((m, mi) => (
                            <div key={mi} style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: mi < station.movements.length - 1 ? 6 : 0 }}>
                              <span style={{ fontSize: 'clamp(16px, 2.5vw, 20px)', fontWeight: 700, color: '#141514', letterSpacing: '-0.01em' }}>{m.name}</span>
                              <span style={{ fontSize: 12, fontWeight: 500, color: '#707070', marginLeft: 12, whiteSpace: 'nowrap' }}>
                                {station.movements.length > 1 ? '20 reps' : station.score}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Rest divider between stations */}
                      {si < sectionStations.length - 1 && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 0' }}>
                          <div style={{ height: 1, flex: 1, backgroundColor: '#D0D0D0' }} />
                          <span style={{ fontSize: 10, fontWeight: 700, color: '#707070', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>90 SEC REST</span>
                          <div style={{ height: 1, flex: 1, backgroundColor: '#D0D0D0' }} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Between-section rest */}
                {!isLastSection && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '16px 0 32px' }}>
                    <div style={{ height: 1, flex: 1, backgroundColor: '#D0D0D0' }} />
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#707070', letterSpacing: '0.08em' }}>90 SEC REST</span>
                    <div style={{ height: 1, flex: 1, backgroundColor: '#D0D0D0' }} />
                  </div>
                )}
              </div>
            );
          })}

          {/* Footer note */}
          <p style={{ textAlign: 'center', fontSize: 11, color: '#707070', marginTop: 40, marginBottom: 64, paddingTop: 24, borderTop: '1px solid #EFEFEF' }}>
            1 rep = 1 cal = 1 metre · max reps wins
          </p>

          {/* Workout description */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            {[
              { tag: 'scoring', headline: '1 point = 1 rep = 1 calorie = 1 meter', body: 'Your goal is simple: score as many points as possible. Every rep, every calorie, every meter count as 1 point.' },
              { tag: 'how you compete', headline: 'three workouts. one overall winner.', body: 'Cardio, strength & conditioning, and the finisher are each scored independently. A strong performance on two workouts can carry a weaker one — the team with the best combined score takes the win.' },
              { tag: 'amrap format', headline: 'as many reps as possible in 6 minutes.', body: 'You and your partner cycle through movement 1 for 20 reps, then movement 2 for 20 reps, then back to movement 1 — until time is called. Total reps is your score.' },
              { tag: 'you go, i go', headline: 'one partner works. one partner rests.', body: 'The resting partner may not touch the equipment until the working partner is done. You cannot start a new movement while your partner is still completing theirs.' },
            ].map((card) => (
              <div key={card.tag} style={{ backgroundColor: '#fff', border: '1px solid #E0E0E0', padding: '24px', borderRadius: 4 }}>
                <p style={{ fontSize: 10, fontWeight: 700, color: '#888', marginBottom: 10, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{card.tag}</p>
                <p style={{ fontSize: 14, fontWeight: 700, color: '#141514', marginBottom: 8, lineHeight: 1.3 }}>{card.headline}</p>
                <p style={{ fontSize: 13, color: '#707070', lineHeight: 1.65 }}>{card.body}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 2 — WEIGHTS
      ═══════════════════════════════════════════════ */}
      <section id="weights" style={{ backgroundColor: '#F8F8F8', padding: '80px 24px', position: 'relative' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>

          {/* Header row with toggle */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <img src="/images/icons/community-hearts-black.png" alt="" aria-hidden="true" style={{ height: 28, opacity: 0.06, marginBottom: 16 }} />
              <p style={{ fontSize: 11, fontWeight: 700, color: '#707070', marginBottom: 12 }}>weights by category</p>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, color: '#141514' }}>
                pick up the right weight.
              </h2>
            </div>
            {/* CORE / ELITE toggle */}
            <div style={{ display: 'flex', backgroundColor: '#fff', borderRadius: 100, padding: 4, border: '1px solid #e0e0e0' }}>
              {(['core', 'elite'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLevel(l)}
                  style={{
                    padding: '8px 22px', borderRadius: 100, border: 'none', cursor: 'pointer',
                    fontFamily: 'inherit', fontSize: 12, fontWeight: 700,
                    backgroundColor: level === l ? '#141514' : 'transparent',
                    color: level === l ? '#fff' : '#888',
                    transition: 'all 0.15s',
                  }}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div style={{ border: '1px solid #e0e0e0', borderRadius: 16, overflow: 'hidden', backgroundColor: '#fff' }}>
            {/* Table header */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', backgroundColor: '#141514', padding: '12px 24px' }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#707070' }}>movement</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#F78DB9' }}>FF</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#F78DB9' }}>Mixed</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#F78DB9' }}>MM</span>
            </div>
            {weightRows.map((row, i) => (
              <div key={`${row.station}-${row.name}`} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '14px 24px', backgroundColor: i % 2 === 0 ? '#fff' : '#fafafa', borderTop: '1px solid #EFEFEF', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#141514' }}>{row.name}</span>
                  {row.note && <span style={{ fontSize: 11, color: '#888', marginLeft: 8 }}>{row.note}</span>}
                </div>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#141514' }}>{row.FF}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#141514' }}>{row.Mixed}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#141514' }}>{row.MM}</span>
              </div>
            ))}
          </div>

          <p style={{ fontSize: 11, color: '#888', marginTop: 16 }}>
            FF = Female / Female · Mixed = one female + one male · MM = Male / Male
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 3 — MOVEMENT STANDARDS
      ═══════════════════════════════════════════════ */}
      <section id="standards" style={{ backgroundColor: '#fff', padding: '80px 24px 100px', position: 'relative' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <img src="/images/icons/community-hearts-black.png" alt="" aria-hidden="true" style={{ height: 32, opacity: 0.06, marginBottom: 16 }} />
          <p style={{ fontSize: 11, fontWeight: 700, color: '#707070', marginBottom: 12 }}>how to do the movements</p>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, color: '#141514', marginBottom: 56 }}>
            movement standards.
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
            {ALL_MOVEMENTS.map((m) => (
              <div key={`${m.station}-${m.index}`} className="std-card" style={{ borderBottom: '1px solid #EFEFEF', paddingBottom: 56 }}>

                {/* Headline */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 9, backgroundColor: '#141514', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#F78DB9' }}>{m.station}</span>
                  </div>
                  <h3 style={{ fontSize: 22, fontWeight: 700, color: '#141514' }}>{m.name}</h3>
                </div>

                {/* Video / image */}
                <div className="grain-overlay" style={{ borderRadius: 16, overflow: 'hidden', aspectRatio: '21/9', position: 'relative', backgroundColor: '#141514' }}>
                  {m.videoId ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${m.videoId}?rel=0&modestbranding=1`}
                      style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={`${m.name} demo`}
                    />
                  ) : (
                    <>
                      <img
                        src={m.image}
                        alt={m.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block', transition: 'transform 0.6s ease', filter: 'contrast(1.05)' }}
                      />
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(to bottom, rgba(20,21,20,0.2) 0%, rgba(20,21,20,0.5) 100%)' }}>
                        <div style={{ width: 56, height: 56, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', border: '1.5px solid rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(6px)', transition: 'transform 0.2s' }}>
                          <div style={{ width: 0, height: 0, borderTop: '10px solid transparent', borderBottom: '10px solid transparent', borderLeft: '18px solid rgba(255,255,255,0.8)', marginLeft: 4 }} />
                        </div>
                      </div>
                    </>
                  )}
                </div>

              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <p style={{ fontSize: 14, color: '#555', marginBottom: 20 }}>ready to compete?</p>
            <a href="/register/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '16px 40px', borderRadius: 100, backgroundColor: '#141514', color: '#fff', fontWeight: 700, fontSize: 13, textDecoration: 'none' }}>
              register your team →
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
