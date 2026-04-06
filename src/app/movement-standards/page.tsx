'use client';

import { useState } from 'react';

interface Movement {
  id: string;
  name: string;
  section: string;
  station: number;
  image: string;
  standards: string[];
  note?: string;
}

const MOVEMENTS: Movement[] = [
  // CARDIO
  {
    id: 'ski-erg',
    name: 'Ski Erg',
    section: 'CARDIO',
    station: 1,
    image: 'https://images.unsplash.com/photo-1544033527-b192b5e53e9c?w=800&q=90&auto=format&fit=crop&crop=center',
    standards: [
      'start standing behind the machine with handles at full extension overhead.',
      'both handles pulled down together. no alternating.',
      'full arm extension at the top of every stroke.',
      'score is total calories. you go, i go with your partner.',
      'reset the monitor before each team\'s attempt.',
    ],
  },
  {
    id: 'row',
    name: 'Row',
    section: 'CARDIO',
    station: 2,
    image: '/images/photos/athlete-rowing-competition-crowd.jpg',
    standards: [
      'start seated with feet strapped into the footrests.',
      'drive sequence: legs first, then lean back, then pull the handle to the lower sternum.',
      'return in reverse: arms extend, hinge forward, knees bend.',
      'damper setting can be adjusted freely between athletes.',
      'score is total calories. swap with your partner after each set.',
    ],
  },
  {
    id: 'bike',
    name: 'Bike',
    section: 'CARDIO',
    station: 3,
    image: '/images/photos/athlete-assault-bike-intensity.jpg',
    standards: [
      'start seated. both feet stay in the pedals throughout.',
      'both hands on the handles. either position is fine.',
      'score is total calories on the monitor.',
      'reset the monitor to zero before each swap.',
      'you go, i go with your partner.',
    ],
  },

  // STRENGTH
  {
    id: 'sandbag-toss',
    name: 'Sandbag Toss Over Shoulder',
    section: 'STRENGTH',
    station: 4,
    image: '/images/photos/athlete-sled-push-competition.jpg',
    standards: [
      'start standing with the sandbag on the ground in front of you.',
      'lift the sandbag off the ground and toss it over one shoulder.',
      'sandbag must fully clear the shoulder and land behind you to count.',
      'shoulders and hips face forward at the start of every rep.',
      'alternating shoulders not required. pick your side.',
      'partner resets the sandbag. alternate reps between partners.',
    ],
    note: 'ff core 20 kg / elite 30 kg · mixed core 30 kg / elite 40 kg · mm core 40 kg / elite 60 kg',
  },
  {
    id: 'dumbbell-push-press',
    name: 'Dumbbell Push Press',
    section: 'STRENGTH',
    station: 5,
    image: '/images/photos/teammates-barbell-rack-dopamine-tees.jpg',
    standards: [
      'start standing with dumbbells at shoulder height, palms facing in.',
      'slight dip at the knees. hips stay above parallel through the dip.',
      'drive both dumbbells overhead to full lockout: arms straight, head through the window.',
      'both dumbbells move together. no staggered pressing.',
      'lower under control back to the shoulders before the next rep.',
      'you go, i go with your partner.',
    ],
    note: 'weight per dumbbell. ff core 10 kg / elite 15 kg · mixed core 15 kg / elite 17.5 kg · mm core 17.5 kg / elite 22.5 kg',
  },
  {
    id: 'barbell-deadlift',
    name: 'Barbell Deadlift',
    section: 'STRENGTH',
    station: 6,
    image: '/images/photos/athlete-barbell-grip-smiling.jpg',
    standards: [
      'bar starts on the ground. set up with feet hip-width apart.',
      'grip outside the legs. mixed or double overhand. no straps.',
      'neutral back throughout. no excessive rounding.',
      'rep counts when hips and knees are fully extended and shoulders are behind the bar.',
      'plates return to the ground and make contact between every rep.',
      'dropping the bar from the top is fine. controlled descent not required.',
    ],
    note: 'ff core 50 kg / elite 80 kg · mixed core 60 kg / elite 90 kg · mm core 80 kg / elite 110 kg',
  },

  // POWER & CONDITIONING
  {
    id: 'box-jump-over',
    name: 'Box Jump Over',
    section: 'POWER & CONDITIONING',
    station: 7,
    image: 'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=800&q=90&auto=format&fit=crop&crop=entropy',
    standards: [
      'start standing facing the box.',
      'both feet leave the ground together. no step-up.',
      'both feet land on top of the box.',
      'jump or step down the other side. landing on top counts as the rep.',
      'step-down off the back is fine. jump-off allowed but not required.',
      'no sideways jumps off the box. cross over the top only.',
    ],
    note: 'ff core 20" / elite 20" · mixed core 20" / elite 24" · mm core 24" / elite 24"',
  },
  {
    id: 'burpee',
    name: 'Burpee',
    section: 'POWER & CONDITIONING',
    station: 8,
    image: '/images/photos/athletes-recovery-games-tee-rowers.jpg',
    standards: [
      'start standing. one rep = chest to ground, jump, clap overhead.',
      'full burpee: the whole body flat on the ground. chest, hips, thighs.',
      'knee-down option (ff and mixed core): knees touch before chest, then full extension. chest still touches.',
      'push up to standing. no worming or snaking. hips and chest rise together.',
      'at the top, both feet leave the ground and hands clap overhead.',
      'alternate reps with your partner.',
    ],
    note: 'full burpee required for mm core and all elite athletes. knee-down allowed for ff and mixed core.',
  },

  // FINISHER
  {
    id: 'max-distance-run',
    name: 'Max Distance Run',
    section: 'FINISHER',
    station: 9,
    image: '/images/photos/women-sprinting-close-up.jpg',
    standards: [
      'one athlete runs while the other waits in the rest zone.',
      'you run, i run. each lap is completed individually.',
      'the running athlete completes the full marked course before tagging their partner.',
      'score is total metres covered by both athletes combined.',
      'core teams: walking is fine throughout.',
      'elite teams: running is expected. walking not penalised but not encouraged.',
      '1 metre = 1 point. max metres wins.',
    ],
  },
];

const SECTIONS = ['CARDIO', 'STRENGTH', 'POWER & CONDITIONING', 'FINISHER'];

const SECTION_LABELS: Record<string, string> = {
  CARDIO: 'cardio',
  STRENGTH: 'strength',
  'POWER & CONDITIONING': 'power & conditioning',
  FINISHER: 'finisher',
};

const SECTION_COLOR: Record<string, string> = {
  CARDIO: '#185BC5',
  STRENGTH: '#F78DB9',
  'POWER & CONDITIONING': '#9b51e0',
  FINISHER: '#e55353',
};

const EQUIPMENT = {
  permitted: ['chalk', 'knee sleeves', 'weightlifting shoes', 'wrist wraps', 'shin guards (deadlift)', 'athletic tape'],
  prohibited: ['lifting straps', 'knee wraps', 'deadlift suits', 'ammonia / smelling salts', 'any gear not listed above'],
};

export default function MovementStandardsPage() {
  const [activeSection, setActiveSection] = useState<string>('');
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const filtered = activeSection
    ? MOVEMENTS.filter((m) => m.section === activeSection)
    : MOVEMENTS;

  const grouped = SECTIONS.reduce<Record<string, Movement[]>>((acc, s) => {
    acc[s] = filtered.filter((m) => m.section === s);
    return acc;
  }, {});

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', paddingTop: 64, position: 'relative' }}>
      {/* Hearts pattern texture background */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/icons/hearts-pattern-black.png)', backgroundSize: '180px', backgroundRepeat: 'repeat', opacity: 0.015, pointerEvents: 'none', zIndex: 0 }} />

      {/* Hero */}
      <div style={{ backgroundColor: '#141514', padding: '72px 40px 56px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <img src="/images/icons/duo-running-hearts-black.png" alt="" aria-hidden="true" style={{ height: 32, opacity: 0.08, marginBottom: 20, display: 'inline-block' }} />
        <h1 style={{ fontSize: 'clamp(40px, 7vw, 72px)', fontWeight: 700, letterSpacing: '-0.03em', color: '#fff', marginBottom: 16 }}>
          movement standards
        </h1>
        <p style={{ fontSize: 15, color: '#555', maxWidth: 520, margin: '0 auto 32px' }}>
          read these before you compete. every rep counts. every standard applies.
        </p>

        {/* Format info */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 20, padding: '12px 24px', borderRadius: 100, backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            '5 min work · 1 min rest',
            '9 stations',
            'teams of 2 · you go, i go',
            '1 rep = 1 cal = 1 metre',
          ].map((item, i) => (
            <span key={i} style={{ fontSize: 12, fontWeight: 600, color: '#888' }}>{item}</span>
          ))}
        </div>
      </div>

      {/* Section filter */}
      <div style={{ borderBottom: '1px solid #EFEFEF', backgroundColor: '#EFEFEF', padding: '0 40px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', gap: 0, overflowX: 'auto' }}>
          <button
            onClick={() => setActiveSection('')}
            style={{
              padding: '16px 20px', fontSize: 12, fontWeight: 700,
              border: 'none', borderBottom: activeSection === '' ? '2px solid #F78DB9' : '2px solid transparent',
              backgroundColor: 'transparent', color: activeSection === '' ? '#141514' : '#888',
              cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap', transition: 'color 0.2s',
            }}
          >
            all
          </button>
          {SECTIONS.map((s) => (
            <button key={s} onClick={() => setActiveSection(s === activeSection ? '' : s)}
              style={{
                padding: '16px 20px', fontSize: 12, fontWeight: 700,
                border: 'none', borderBottom: activeSection === s ? `2px solid ${SECTION_COLOR[s]}` : '2px solid transparent',
                backgroundColor: 'transparent', color: activeSection === s ? '#141514' : '#888',
                cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap', transition: 'color 0.2s',
              }}
            >
              {SECTION_LABELS[s]}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 40px 100px', position: 'relative', zIndex: 1 }}>
        {SECTIONS.map((section) => {
          const sectionMovements = grouped[section];
          if (!sectionMovements || sectionMovements.length === 0) return null;
          const accent = SECTION_COLOR[section];

          return (
            <div key={section} style={{ marginBottom: 80 }}>
              {/* Section title */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 40, paddingBottom: 16, borderBottom: `2px solid ${accent}` }}>
                <div style={{ width: 6, height: 24, borderRadius: 3, backgroundColor: accent, flexShrink: 0 }} />
                <h2 style={{ fontSize: 11, fontWeight: 700, color: '#707070' }}>
                  / {SECTION_LABELS[section]}
                </h2>
              </div>

              {/* Movements */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
                {sectionMovements.map((movement) => (
                  <div key={movement.id} style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 48, alignItems: 'start', borderBottom: '1px solid #EFEFEF', paddingBottom: 48 }}>

                    {/* Image */}
                    <div style={{ borderRadius: 16, overflow: 'hidden', aspectRatio: '4/3', backgroundColor: '#f5f5f5', flexShrink: 0, position: 'relative' }}>
                      {!imageErrors.has(movement.id) ? (
                        <img
                          src={movement.image}
                          alt={movement.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                          onError={() => setImageErrors((prev) => new Set(prev).add(movement.id))}
                        />
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5' }}>
                          <span style={{ fontSize: 12, color: '#ccc', textAlign: 'center', padding: 20 }}>photo coming soon</span>
                        </div>
                      )}
                      {/* Grain overlay */}
                      <div className="grain-overlay" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
                    </div>

                    {/* Standards */}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 20 }}>
                        <div>
                          <div style={{
                            width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                            backgroundColor: accent, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 14, fontWeight: 700, color: '#fff',
                          }}>
                            {movement.station}
                          </div>
                          {/* Decorative icon based on movement type */}
                          {['ski-erg', 'row', 'bike'].includes(movement.id) && (
                            <img src="/images/icons/runners-speed-black.png" alt="" aria-hidden="true" style={{ height: 28, opacity: 0.08, marginTop: 12 }} />
                          )}
                          {['sandbag-toss', 'dumbbell-push-press', 'barbell-deadlift'].includes(movement.id) && (
                            <img src="/images/icons/weightlifter-hearts-white.png" alt="" aria-hidden="true" style={{ height: 28, opacity: 0.08, marginTop: 12, filter: 'invert(1)' }} />
                          )}
                          {['box-jump-over', 'burpee', 'max-distance-run'].includes(movement.id) && (
                            <img src="/images/icons/runners-speed-black.png" alt="" aria-hidden="true" style={{ height: 28, opacity: 0.08, marginTop: 12 }} />
                          )}
                        </div>
                        <div>
                          <h3 style={{ fontSize: 20, fontWeight: 700, color: '#141514', marginTop: 0 }}>
                            {movement.name}
                          </h3>
                        </div>
                      </div>

                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12, marginBottom: movement.note ? 20 : 0 }}>
                        {movement.standards.map((std, i) => (
                          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 14, lineHeight: 1.65, color: '#555' }}>
                            <span style={{ flexShrink: 0, marginTop: 6, width: 6, height: 6, borderRadius: '50%', backgroundColor: accent, display: 'block' }} />
                            {std}
                          </li>
                        ))}
                      </ul>

                      {movement.note && (
                        <div style={{ marginTop: 20, padding: '12px 16px', borderRadius: 10, backgroundColor: '#EFEFEF', border: '1px solid #e0e0e0' }}>
                          <p style={{ fontSize: 12, color: '#888', lineHeight: 1.6 }}>
                            <span style={{ fontWeight: 700, color: '#707070', marginRight: 6 }}>weights</span>
                            {movement.note}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Equipment */}
        <div style={{ marginTop: 40, padding: '40px', borderRadius: 20, backgroundColor: '#EFEFEF', border: '1px solid #e0e0e0' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 28 }}>equipment rules</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#4ade80', marginBottom: 14 }}>✓ permitted</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {EQUIPMENT.permitted.map((item) => (
                  <li key={item} style={{ fontSize: 14, color: '#555', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#4ade80', flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#f87171', marginBottom: 14 }}>✕ prohibited</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {EQUIPMENT.prohibited.map((item) => (
                  <li key={item} style={{ fontSize: 14, color: '#555', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#f87171', flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: 64 }}>
          <p style={{ fontSize: 14, color: '#555', marginBottom: 20 }}>ready to compete?</p>
          <a href="https://team-aretas.com/competitions/3444" target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '16px 40px', borderRadius: 100,
            backgroundColor: '#141514', color: '#fff',
            fontWeight: 700, fontSize: 13,
            textDecoration: 'none',
          }}>
            register your team →
          </a>
        </div>
      </div>
    </div>
  );
}
