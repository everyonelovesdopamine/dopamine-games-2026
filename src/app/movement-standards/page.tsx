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
      'Athlete must start standing behind the machine with handles at full extension overhead.',
      'Both handles must be pulled down simultaneously — no alternating.',
      'Full arm extension must be reached at the top of each stroke.',
      'Score is total calories. Both athletes alternate — you go, I go.',
      'The monitor must be reset before the start of each team\'s attempt.',
    ],
  },
  {
    id: 'row',
    name: 'Row',
    section: 'CARDIO',
    station: 2,
    image: '/images/photos/athlete-rowing-competition-crowd.jpg',
    standards: [
      'Athlete starts seated with feet securely strapped into the footrests.',
      'Drive sequence: legs first, then lean back, then pull the handle to the lower sternum.',
      'Return in the reverse order: arms extend, then hinge forward, then knees bend.',
      'The damper setting may be adjusted freely between athletes.',
      'Score is total calories. Alternate with your partner after each set.',
    ],
  },
  {
    id: 'bike',
    name: 'Bike',
    section: 'CARDIO',
    station: 3,
    image: '/images/photos/athlete-assault-bike-intensity.jpg',
    standards: [
      'Athlete starts seated. Both feet must remain in the pedals throughout the effort.',
      'Both hands must be on the handles — either position is allowed.',
      'Score is total calories displayed on the monitor.',
      'Monitor must be reset to zero before each changeover.',
      'Alternate with your partner — you go, I go.',
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
      'Athlete starts standing with the sandbag on the ground in front of them.',
      'The sandbag must be lifted from the ground and tossed over one shoulder.',
      'The sandbag must fully clear the shoulder and land completely behind the athlete to count as a rep.',
      'Shoulders and hips must be facing forward at the start of each rep.',
      'Alternating shoulders is not required. Athlete may choose preferred side.',
      'Partner retrieves and repositions the sandbag. Alternate reps between partners.',
    ],
    note: 'FF Beginner 20 kg / Advanced 30 kg · Mixed Beginner 30 kg / Advanced 40 kg · MM Beginner 40 kg / Advanced 60 kg',
  },
  {
    id: 'dumbbell-push-press',
    name: 'Dumbbell Push Press',
    section: 'STRENGTH',
    station: 5,
    image: '/images/photos/teammates-barbell-rack-dopamine-tees.jpg',
    standards: [
      'Athlete starts standing with dumbbells at shoulder height, palms facing in.',
      'Slight dip at the knees — hips stay above parallel throughout the dip.',
      'Drive both dumbbells overhead to full lockout: arms straight, head through the window.',
      'Both dumbbells must move together — no staggered pressing.',
      'Lower under control back to shoulders before next rep.',
      'Alternate reps with your partner — you go, I go.',
    ],
    note: 'Weight shown per dumbbell. FF Beginner 10 kg / Advanced 15 kg · Mixed Beginner 15 kg / Advanced 17.5 kg · MM Beginner 17.5 kg / Advanced 22.5 kg',
  },
  {
    id: 'barbell-deadlift',
    name: 'Barbell Deadlift',
    section: 'STRENGTH',
    station: 6,
    image: '/images/photos/athlete-barbell-grip-smiling.jpg',
    standards: [
      'Bar starts on the ground. Athlete sets up with feet hip-width apart.',
      'Grip must be outside the legs — mixed or double overhand, no straps.',
      'Back must be neutral throughout the lift — no excessive rounding.',
      'Rep is complete when hips and knees are fully extended and shoulders are behind the bar.',
      'Plates must return to the ground and make contact between each rep.',
      'Dropping the bar from the top is permitted. Controlled descent is not required.',
    ],
    note: 'FF Beginner 50 kg / Advanced 80 kg · Mixed Beginner 60 kg / Advanced 90 kg · MM Beginner 80 kg / Advanced 110 kg',
  },

  // POWER & CONDITIONING
  {
    id: 'box-jump-over',
    name: 'Box Jump Over',
    section: 'POWER & CONDITIONING',
    station: 7,
    image: 'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=800&q=90&auto=format&fit=crop&crop=entropy',
    standards: [
      'Athlete starts standing facing the box.',
      'Both feet must leave the ground simultaneously — no step-up allowed.',
      'Both feet must land on top of the box.',
      'Athlete then jumps or steps down the other side. Landing on top counts as one rep.',
      'Step-down off the back is permitted. Jump-off is allowed but not required.',
      'Do not jump sideways off the box — cross over the top only.',
    ],
    note: 'FF Beginner 20" / Advanced 20" · Mixed Beginner 20" / Advanced 24" · MM Beginner 24" / Advanced 24"',
  },
  {
    id: 'burpee',
    name: 'Burpee',
    section: 'POWER & CONDITIONING',
    station: 8,
    image: '/images/photos/athletes-recovery-games-tee-rowers.jpg',
    standards: [
      'Athlete starts standing. One rep = chest to ground + jump with clap overhead.',
      'Full burpee: the entire body must be flat on the ground — chest, hips, and thighs.',
      'Knee-down option (Beginner FF and Mixed): knees touch ground before chest, then full extension. Chest must still touch.',
      'Push up to standing — no worming or snaking. Hips and chest rise together.',
      'At the top, both feet must leave the ground and hands must clap overhead.',
      'Alternate reps with your partner.',
    ],
    note: 'Full burpee required for MM Beginner and all Advanced athletes. Knee-down permitted for FF and Mixed Beginner.',
  },

  // FINISHER
  {
    id: 'max-distance-run',
    name: 'Max Distance Run',
    section: 'FINISHER',
    station: 9,
    image: '/images/photos/women-sprinting-close-up.jpg',
    standards: [
      'One athlete runs while the other waits at the designated rest zone.',
      'Athletes alternate — you run, I run. Each lap is completed individually.',
      'The running athlete must complete the full marked course before tagging in their partner.',
      'Score is total metres covered by both athletes combined.',
      'Beginner teams: walking is permitted throughout.',
      'Advanced teams: running is expected. Walking is not penalised but not encouraged.',
      '1 metre = 1 point. Maximum metres wins.',
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
  permitted: ['Chalk', 'Knee sleeves', 'Weightlifting shoes', 'Wrist wraps', 'Shin guards (deadlift)', 'Athletic tape'],
  prohibited: ['Lifting straps', 'Knee wraps', 'Deadlift suits', 'Ammonia / smelling salts', 'Any gear not listed above'],
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
          Read these before you compete. Every rep counts. Every standard applies.
        </p>

        {/* Format info */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 20, padding: '12px 24px', borderRadius: 100, backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            '5 min work · 1 min rest',
            '9 stations',
            'teams of 2 — you go I go',
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
                  — {SECTION_LABELS[section]}
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
                          <span style={{ fontSize: 12, color: '#ccc', textAlign: 'center', padding: 20 }}>Photo coming soon</span>
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
          <p style={{ fontSize: 14, color: '#555', marginBottom: 20 }}>Ready to compete?</p>
          <a href="/register/" style={{
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
