'use client';

import { useState, useEffect } from 'react';

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
        name: 'Barbell Deadlift', image: '/images/photos/athlete-barbell-grip-smiling.jpg',
        weights: {
          core:  { FF: '50 kg', Mixed: '60 kg', MM: '80 kg' },
          elite: { FF: '75 kg', Mixed: '80 kg', MM: '100 kg' },
        },
      },
      {
        name: 'Burpee', image: '/images/photos/athletes-recovery-games-tee-rowers.jpg',
      },
    ],
  },
  {
    number: 5, section: 'STRENGTH & CONDITIONING', format: 'AMRAP · 6 min', score: '20 reps each',
    movements: [
      {
        name: 'Sandbag Toss Over Shoulder', image: '/images/photos/athlete-sled-push-competition.jpg',
        weights: {
          core:  { FF: '20 kg', Mixed: '30 kg', MM: '40 kg' },
          elite: { FF: '30 kg', Mixed: '40 kg', MM: '60 kg' },
        },
      },
      {
        name: 'Sandbag Squat', image: '/images/photos/duo-deadlift-outdoor-turf.jpg',
      },
    ],
  },
  {
    number: 6, section: 'STRENGTH & CONDITIONING', format: 'AMRAP · 6 min', score: '20 reps each',
    movements: [
      {
        name: 'Dumbbell Push Press', image: '/images/photos/teammates-barbell-rack-dopamine-tees.jpg',
        weights: {
          core:  { FF: '10 kg', Mixed: '12.5 kg', MM: '15 kg', note: 'per db' },
          elite: { FF: '15 kg', Mixed: '17.5 kg', MM: '22.5 kg', note: 'per db' },
        },
      },
      {
        name: 'Box Jump Over', image: 'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=900&q=90&auto=format&fit=crop',
        weights: {
          core:  { FF: '20"', Mixed: '24"', MM: '24"' },
          elite: { FF: '24"', Mixed: '24"', MM: '30"' },
        },
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

// ─── Component ────────────────────────────────────────────────────────────────

export default function WorkoutsPage() {
  const [level, setLevel] = useState<'core' | 'elite'>('elite');
  const [activeSection, setActiveSection] = useState<string>('workout');
  const weightRows = getWeightRows(level);

  useEffect(() => {
    const ids = ['workout', 'weights', 'how-it-works'];
    const handler = () => {
      const offset = 160; // account for nav + sticky tabs
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top - offset <= 0) current = id;
      }
      setActiveSection(current);
    };
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', paddingTop: 64 }}>

      <style>{`
        @keyframes iconDrift { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-10px) rotate(2deg); } }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .std-card:hover img { transform: scale(1.04); }
      `}</style>

      {/* Hero: editorial spec-sheet overlay */}
      <div style={{ position: 'relative', height: 'clamp(440px, 60vh, 640px)', overflow: 'hidden' }} className="grain-overlay">
        <img
          src="/images/photos/athlete-sled-push-competition.jpg"
          alt="the workouts"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center', filter: 'contrast(1.08) saturate(0.9)' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(20,21,20,0.25) 0%, rgba(20,21,20,0.35) 50%, rgba(20,21,20,0.9) 100%)' }} />

        {/* floating icons */}
        <img src="/images/icons/community-hearts-white.png" alt="" aria-hidden="true"
          style={{ position: 'absolute', right: '6%', bottom: '16%', height: 80, opacity: 0.05, zIndex: 2, pointerEvents: 'none', animation: 'iconDrift 7s ease-in-out infinite' }} />
        <img src="/images/icons/runners-speed-white.png" alt="" aria-hidden="true"
          style={{ position: 'absolute', left: '5%', top: '28%', height: 52, opacity: 0.03, zIndex: 2, pointerEvents: 'none', animation: 'iconDrift 9s ease-in-out infinite', animationDelay: '1.5s' }} />

        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', textAlign: 'left', padding: '0 24px', maxWidth: 900, margin: '0 auto', left: 0, right: 0, zIndex: 2 }}>
          <h1 style={{ fontSize: 'clamp(56px, 11vw, 120px)', fontWeight: 700, letterSpacing: '-0.04em', color: '#fff', lineHeight: 0.92 }}>the workout.</h1>
        </div>
      </div>

      {/* ─── Sponsors strip ─── */}
      <div style={{ backgroundColor: '#141514', overflow: 'hidden', padding: '22px 0', position: 'relative', marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', animation: 'marquee 56s linear infinite', whiteSpace: 'nowrap' }}>
          {Array.from({ length: 4 }).map((_, rep) => (
            <div key={rep} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <img key={`${rep}-${i}`} src="/images/adidas logos/adidaslogowhite.png" alt="adidas" style={{ height: 48, marginRight: 84, opacity: 0.55 }} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ─── Sticky section nav ─── */}
      <div style={{ position: 'sticky', top: 64, zIndex: 20, backgroundColor: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #EFEFEF' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '14px 24px', display: 'flex', gap: 8, overflowX: 'auto', justifyContent: 'center' }}>
          {[
            { label: 'the workout', id: 'workout' },
            { label: 'weights', id: 'weights' },
            { label: 'how it works', id: 'how-it-works' },
          ].map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '10px 20px', fontSize: 12, fontWeight: 700,
                  color: isActive ? '#fff' : '#141514', textDecoration: 'none', whiteSpace: 'nowrap',
                  border: `1.5px solid ${isActive ? '#F78DB9' : '#E5E5E5'}`,
                  borderRadius: 100,
                  backgroundColor: isActive ? '#F78DB9' : '#fff',
                  transition: 'all 0.2s',
                  letterSpacing: '0.01em',
                }}
                onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.borderColor = '#F78DB9'; e.currentTarget.style.color = '#F78DB9'; } }}
                onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.borderColor = '#E5E5E5'; e.currentTarget.style.color = '#141514'; } }}
              >
                {isActive && <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#fff' }} />}
                {item.label}
              </a>
            );
          })}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          SECTION 1: THE WORKOUT
      ═══════════════════════════════════════════════ */}
      <section id="workout" style={{ backgroundColor: '#fff', padding: '40px 24px 48px', position: 'relative', overflow: 'hidden' }}>
        {/* Big community-hearts watermark (two people + barbell with heart plates) */}
        <img
          src="/images/icons/community-hearts-black.png"
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '50%',
            top: '12%',
            transform: 'translateX(-50%)',
            width: 'clamp(500px, 70vw, 900px)',
            opacity: 0.14,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
        <div style={{ maxWidth: 720, margin: '0 auto', position: 'relative', zIndex: 1 }}>

          {/* Section marker */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 10, color: '#888', letterSpacing: '0.14em' }}>
            <span style={{ width: 24, height: 1, backgroundColor: '#141514' }} />
            <span>§01 / THE WORKOUT SPEC</span>
          </div>

          {/* Format stat cards: editorial spec-sheet layout */}
          <div style={{ marginBottom: 36 }}>
            {/* Row 1: work + rest */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
              {[
                { code: 'W-01', label: 'work', value: '6', unit: 'min' },
                { code: 'R-01', label: 'rest', value: '90', unit: 'sec' },
              ].map((b) => (
                <div key={b.label} style={{ backgroundColor: '#141514', borderRadius: 10, padding: '18px 18px 16px', position: 'relative', overflow: 'hidden' }}>
                  <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")`, backgroundSize: '180px 180px', opacity: 0.25, mixBlendMode: 'overlay', pointerEvents: 'none' }} />
                  <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                    <p style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>{b.label}</p>
                    <span style={{ fontSize: 9, fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>{b.code}</span>
                  </div>
                  <p style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                    <span style={{ fontSize: 40, fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>{b.value}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{b.unit}</span>
                  </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Row 2: format full-width */}
            <div style={{ backgroundColor: '#141514', borderRadius: 10, padding: '18px 18px 16px', marginBottom: 14, position: 'relative', overflow: 'hidden' }}>
              <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(135deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 8px)', pointerEvents: 'none' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                  <p style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>format</p>
                  <span style={{ fontSize: 9, fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>F-02</span>
                </div>
                <p style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>teams of</span>
                  <span style={{ fontSize: 40, fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>2</span>
                </p>
              </div>
            </div>

            {/* Tagline */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, justifyContent: 'center' }}>
              <span style={{ height: 1, flex: 1, maxWidth: 60, backgroundColor: '#D0D0D0' }} />
              <p style={{ fontSize: 11, color: '#707070', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>
                you go, i go · 1 working · 1 resting
              </p>
              <span style={{ height: 1, flex: 1, maxWidth: 60, backgroundColor: '#D0D0D0' }} />
            </div>
          </div>

          {/* Stations by section */}
          {SECTION_ORDER.map((section, sectionIdx) => {
            const sectionStations = STATIONS.filter((s) => s.section === section);
            const isLastSection = sectionIdx === SECTION_ORDER.length - 1;
            return (
              <div key={section} style={{ marginBottom: isLastSection ? 0 : 0 }}>

                {/* Section header: editorial */}
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12, paddingBottom: 10, borderBottom: '2px solid #141514' }}>
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
                      {/* Station row: editorial card */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '14px 0', position: 'relative' }}>

                        {/* Large number with spec code */}
                        <div style={{ width: 72, flexShrink: 0 }}>
                          <p style={{ fontSize: 9, fontWeight: 600, color: '#888', letterSpacing: '0.1em', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', marginBottom: 2 }}>ST-{String(station.number).padStart(2, '0')}</p>
                          <span style={{ fontSize: 56, fontWeight: 700, color: '#F78DB9', lineHeight: 0.9, display: 'block', letterSpacing: '-0.04em' }}>
                            {String(station.number).padStart(2, '0')}
                          </span>
                        </div>

                        {/* Content */}
                        <div style={{ flex: 1 }}>
                          {station.movements.length > 1 && (
                            <p style={{ fontSize: 9, fontWeight: 700, color: '#141514', backgroundColor: '#F78DB9', display: 'inline-block', padding: '3px 8px', borderRadius: 3, marginBottom: 10, letterSpacing: '0.08em', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>AMRAP · 6:00</p>
                          )}
                          {station.movements.map((m, mi) => (
                            <div key={mi} style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: mi < station.movements.length - 1 ? 6 : 0 }}>
                              <span style={{ fontSize: 'clamp(16px, 2.5vw, 20px)', fontWeight: 700, color: '#141514', letterSpacing: '-0.01em' }}>{m.name}</span>
                              <span style={{ fontSize: 11, fontWeight: 600, color: '#707070', marginLeft: 12, whiteSpace: 'nowrap', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', letterSpacing: '0.04em' }}>
                                {station.movements.length > 1 ? '20 REPS' : station.score.toUpperCase()}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Rest divider between stations */}
                      {si < sectionStations.length - 1 && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '6px 0' }}>
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '10px 0 20px' }}>
                    <div style={{ height: 1, flex: 1, backgroundColor: '#D0D0D0' }} />
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#707070', letterSpacing: '0.08em' }}>90 SEC REST</span>
                    <div style={{ height: 1, flex: 1, backgroundColor: '#D0D0D0' }} />
                  </div>
                )}
              </div>
            );
          })}

          {/* Footer note */}
          <p style={{ textAlign: 'center', fontSize: 11, color: '#707070', marginTop: 24, marginBottom: 24, paddingTop: 18, borderTop: '1px solid #EFEFEF' }}>
            1 rep = 1 cal = 1 metre · max reps wins
          </p>


        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 2: WEIGHTS
      ═══════════════════════════════════════════════ */}
      <section id="weights" style={{ backgroundColor: '#F8F8F8', padding: '80px 24px', position: 'relative' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>

          {/* Category intro */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 10, color: '#888', letterSpacing: '0.14em' }}>
              <span style={{ width: 24, height: 1, backgroundColor: '#141514' }} />
              <span>§02 / TWO WAYS TO COMPETE</span>
            </div>
            <h2 style={{ fontSize: 'clamp(40px, 7vw, 72px)', fontWeight: 700, color: '#141514', letterSpacing: '-0.03em', lineHeight: 0.95 }}>
              choose your category.
            </h2>
          </div>

          {/* Category cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 64 }}>
            {[
              {
                title: 'core',
                body: 'for anyone who wants to move, have fun, and test themselves without pressure. accessible, low-barrier, and built for newcomers or anyone chasing a full-body challenge with their team.',
                image: '/images/photos/teammates-barbell-rack-dopamine-tees.jpg',
                imgPos: 'center 40%',
                accent: '#F78DB9',
              },
              {
                title: 'elite',
                body: 'for athletes ready to push their limits. faster, heavier, more demanding. elite is for those who thrive on pressure and want to measure up against the best.',
                image: '/images/photos/women-sprinting-close-up.jpg',
                imgPos: 'center 30%',
                accent: '#185BC5',
              },
            ].map((c) => (
              <div key={c.title} className="grain-overlay" style={{ borderRadius: 12, padding: '140px 32px 32px', position: 'relative', overflow: 'hidden', minHeight: 340, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                <img src={c.image} alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: c.imgPos, filter: 'contrast(1.15) saturate(0.75) grayscale(0.15)' }} />
                <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, rgba(20,21,20,0.55) 0%, rgba(20,21,20,0.85) 60%, rgba(20,21,20,0.95) 100%)` }} />
                <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.55 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")`, backgroundSize: '200px 200px', opacity: 0.55, mixBlendMode: 'overlay', pointerEvents: 'none' }} />
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <h3 style={{ fontSize: 'clamp(44px, 6vw, 64px)', fontWeight: 700, color: '#fff', marginBottom: 16, letterSpacing: '-0.03em', lineHeight: 0.9 }}>{c.title}</h3>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.82)', lineHeight: 1.6 }}>{c.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Header row with toggle */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 10, color: '#888', letterSpacing: '0.14em' }}>
                <span style={{ width: 24, height: 1, backgroundColor: '#141514' }} />
                <span>§03 / WEIGHTS BY CATEGORY</span>
              </div>
              <h2 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, color: '#141514', letterSpacing: '-0.03em', lineHeight: 0.95 }}>
                pick up the right weight.
              </h2>
              <p style={{ fontSize: 15, color: '#707070', lineHeight: 1.65, maxWidth: 560, marginTop: 16 }}>
                we designed these categories to keep competition fair while making sure everyone has a place to play. athletes choose the category that best reflects their identity and where they feel they can compete fairly.
              </p>
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
            ff = female / female · mixed = one female + one male · mm = male / male
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 4: HOW IT WORKS
      ═══════════════════════════════════════════════ */}
      <section id="how-it-works" style={{ backgroundColor: '#F8F8F8', padding: '80px 24px 100px', position: 'relative' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 10, color: '#888', letterSpacing: '0.14em' }}>
            <span style={{ width: 24, height: 1, backgroundColor: '#141514' }} />
            <span>§04 / THE FORMAT, EXPLAINED</span>
          </div>
          <h2 style={{ fontSize: 'clamp(40px, 7vw, 72px)', fontWeight: 700, color: '#141514', marginBottom: 56, letterSpacing: '-0.03em', lineHeight: 0.95 }}>
            how it works.
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {[
              { num: '01', tag: 'scoring', headline: '1 point = 1 rep = 1 calorie = 1 metre', body: 'the goal is simple. score as many points as possible. every rep, every calorie, every metre counts as one point.' },
              { num: '02', tag: 'how you compete', headline: 'three workouts. one overall winner.', body: 'cardio, strength & conditioning, and the finisher are each scored on their own. a strong run on two can carry a weaker one. the team with the best combined score takes the win.' },
              { num: '03', tag: 'amrap format', headline: 'as many reps as possible in 6 minutes.', body: 'you and your partner cycle through movement 1 for 20 reps, then movement 2 for 20 reps, then back to movement 1, until time is called. total reps is your score.' },
              { num: '04', tag: 'you go, i go', headline: 'one partner works. one partner rests.', body: 'the resting partner can\'t touch the equipment until the working partner is done. you can\'t start a new movement while your partner is still on theirs.' },
            ].map((card) => (
              <div key={card.tag} style={{ backgroundColor: '#fff', border: '1px solid #E5E5E5', padding: '24px', borderRadius: 8, position: 'relative', overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 18 }}>
                  <span style={{ fontSize: 72, fontWeight: 700, color: '#F78DB9', lineHeight: 0.8, letterSpacing: '-0.04em' }}>{card.num}</span>
                  <span style={{ fontSize: 9, fontWeight: 600, color: '#888', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', marginTop: 8 }}>{card.tag}</span>
                </div>
                <div style={{ height: 1, backgroundColor: '#141514', marginBottom: 16 }} />
                <p style={{ fontSize: 15, fontWeight: 700, color: '#141514', marginBottom: 10, lineHeight: 1.3, letterSpacing: '-0.01em' }}>{card.headline}</p>
                <p style={{ fontSize: 13, color: '#707070', lineHeight: 1.65 }}>{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
