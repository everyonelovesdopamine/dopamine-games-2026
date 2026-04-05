'use client';

import { useState } from 'react';

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Team {
  id: string;
  athlete: string;
  partner: string;
  team: string;
  category: string;
  gender: 'FF' | 'MM' | 'MF';
  level: 'core' | 'elite';
  scores: {
    cardio: number;
    strength: number;
    medcon: number;
    finisher: number;
  };
}

const TEAMS: Team[] = [
  // FF ELITE
  { id: 'ffe1', athlete: 'Sophie Hartmann', partner: 'Lena Becker', team: 'Team Voltage', category: 'ff-elite', gender: 'FF', level: 'elite', scores: { cardio: 218, strength: 204, medcon: 231, finisher: 194 } },
  { id: 'ffe2', athlete: 'Mia Torres', partner: 'Nina Schulz', team: 'Double Drop', category: 'ff-elite', gender: 'FF', level: 'elite', scores: { cardio: 201, strength: 212, medcon: 218, finisher: 190 } },
  { id: 'ffe3', athlete: 'Alicia Voss', partner: 'Carla Mende', team: 'Iron Sisters', category: 'ff-elite', gender: 'FF', level: 'elite', scores: { cardio: 210, strength: 198, medcon: 209, finisher: 187 } },
  { id: 'ffe4', athlete: 'Jana Wolff', partner: 'Lea Fischer', team: 'Wild Pair', category: 'ff-elite', gender: 'FF', level: 'elite', scores: { cardio: 195, strength: 207, medcon: 201, finisher: 186 } },
  { id: 'ffe5', athlete: 'Pia Krause', partner: 'Sara Müller', team: 'Pink Noise', category: 'ff-elite', gender: 'FF', level: 'elite', scores: { cardio: 188, strength: 193, medcon: 206, finisher: 185 } },
  { id: 'ffe6', athlete: 'Tina Brand', partner: 'Kim Werner', team: 'No Brakes', category: 'ff-elite', gender: 'FF', level: 'elite', scores: { cardio: 182, strength: 196, medcon: 198, finisher: 182 } },
  { id: 'ffe7', athlete: 'Hanna Stein', partner: 'Rosa Lang', team: 'Lift Off', category: 'ff-elite', gender: 'FF', level: 'elite', scores: { cardio: 179, strength: 184, medcon: 194, finisher: 184 } },
  { id: 'ffe8', athlete: 'Lara König', partner: 'Eva Braun', team: 'Force Field', category: 'ff-elite', gender: 'FF', level: 'elite', scores: { cardio: 175, strength: 181, medcon: 189, finisher: 181 } },

  // FF CORE
  { id: 'ffc1', athlete: 'Nora Bauer', partner: 'Greta Sommer', team: 'First Rep', category: 'ff-core', gender: 'FF', level: 'core', scores: { cardio: 158, strength: 148, medcon: 163, finisher: 143 } },
  { id: 'ffc2', athlete: 'Ida Roth', partner: 'Lisa Kohl', team: 'Starting Line', category: 'ff-core', gender: 'FF', level: 'core', scores: { cardio: 151, strength: 144, medcon: 159, finisher: 140 } },
  { id: 'ffc3', athlete: 'Emma Vogt', partner: 'Anna Frank', team: 'The Rookies', category: 'ff-core', gender: 'FF', level: 'core', scores: { cardio: 148, strength: 141, medcon: 153, finisher: 139 } },
  { id: 'ffc4', athlete: 'Clara Hess', partner: 'Mila Zahn', team: 'Ground Up', category: 'ff-core', gender: 'FF', level: 'core', scores: { cardio: 143, strength: 138, medcon: 148, finisher: 138 } },
  { id: 'ffc5', athlete: 'Feli Stark', partner: 'Julia Engel', team: 'New Chapter', category: 'ff-core', gender: 'FF', level: 'core', scores: { cardio: 139, strength: 134, medcon: 144, finisher: 136 } },
  { id: 'ffc6', athlete: 'Tanja Lenz', partner: 'Petra May', team: 'Day One', category: 'ff-core', gender: 'FF', level: 'core', scores: { cardio: 135, strength: 130, medcon: 140, finisher: 134 } },

  // MM ELITE
  { id: 'mme1', athlete: 'Lukas Bauer', partner: 'Max Richter', team: 'Heavy Metal', category: 'mm-elite', gender: 'MM', level: 'elite', scores: { cardio: 234, strength: 241, medcon: 248, finisher: 189 } },
  { id: 'mme2', athlete: 'Jonas Kern', partner: 'Finn Schreiber', team: 'Atlas Duo', category: 'mm-elite', gender: 'MM', level: 'elite', scores: { cardio: 228, strength: 235, medcon: 241, finisher: 185 } },
  { id: 'mme3', athlete: 'Ben Vogel', partner: 'Tim Sauer', team: 'Loaded', category: 'mm-elite', gender: 'MM', level: 'elite', scores: { cardio: 222, strength: 229, medcon: 238, finisher: 185 } },
  { id: 'mme4', athlete: 'Chris Wolf', partner: 'Alex Braun', team: 'Rogue Two', category: 'mm-elite', gender: 'MM', level: 'elite', scores: { cardio: 218, strength: 224, medcon: 231, finisher: 183 } },
  { id: 'mme5', athlete: 'David Heim', partner: 'Sven Lau', team: 'Raw Output', category: 'mm-elite', gender: 'MM', level: 'elite', scores: { cardio: 214, strength: 218, medcon: 227, finisher: 180 } },
  { id: 'mme6', athlete: 'Nico Busch', partner: 'Paul Seitz', team: 'Threshold', category: 'mm-elite', gender: 'MM', level: 'elite', scores: { cardio: 209, strength: 214, medcon: 222, finisher: 176 } },
  { id: 'mme7', athlete: 'Tom Kraus', partner: 'Felix Wald', team: 'Iron Will', category: 'mm-elite', gender: 'MM', level: 'elite', scores: { cardio: 204, strength: 209, medcon: 218, finisher: 172 } },
  { id: 'mme8', athlete: 'Jan Berg', partner: 'Ole Mayer', team: 'Grid Bros', category: 'mm-elite', gender: 'MM', level: 'elite', scores: { cardio: 199, strength: 205, medcon: 214, finisher: 170 } },

  // MM CORE
  { id: 'mmc1', athlete: 'Simon Lang', partner: 'Marco Frey', team: 'Just Started', category: 'mm-core', gender: 'MM', level: 'core', scores: { cardio: 172, strength: 168, medcon: 181, finisher: 153 } },
  { id: 'mmc2', athlete: 'Leon Graf', partner: 'Kai Stein', team: 'Work in Progress', category: 'mm-core', gender: 'MM', level: 'core', scores: { cardio: 166, strength: 162, medcon: 175, finisher: 148 } },
  { id: 'mmc3', athlete: 'Milo Haas', partner: 'Erik Horn', team: 'Blue Collar', category: 'mm-core', gender: 'MM', level: 'core', scores: { cardio: 161, strength: 159, medcon: 170, finisher: 147 } },
  { id: 'mmc4', athlete: 'Tim Engel', partner: 'Lars Noll', team: 'Build Phase', category: 'mm-core', gender: 'MM', level: 'core', scores: { cardio: 156, strength: 155, medcon: 165, finisher: 143 } },
  { id: 'mmc5', athlete: 'Mo Kraft', partner: 'Beni Rupp', team: 'Two Plates', category: 'mm-core', gender: 'MM', level: 'core', scores: { cardio: 151, strength: 151, medcon: 161, finisher: 139 } },
  { id: 'mmc6', athlete: 'Arne Bock', partner: 'Samu Weis', team: 'Showing Up', category: 'mm-core', gender: 'MM', level: 'core', scores: { cardio: 147, strength: 148, medcon: 157, finisher: 136 } },

  // MF ELITE
  { id: 'mfe1', athlete: 'Philipp Dorn', partner: 'Hannah Reiss', team: 'Chemistry', category: 'mf-elite', gender: 'MF', level: 'elite', scores: { cardio: 225, strength: 228, medcon: 237, finisher: 191 } },
  { id: 'mfe2', athlete: 'Tobias Meier', partner: 'Klara Voss', team: 'Sync Up', category: 'mf-elite', gender: 'MF', level: 'elite', scores: { cardio: 219, strength: 222, medcon: 231, finisher: 187 } },
  { id: 'mfe3', athlete: 'Ralf Zimmer', partner: 'Sarah Beck', team: 'Compound', category: 'mf-elite', gender: 'MF', level: 'elite', scores: { cardio: 214, strength: 217, medcon: 228, finisher: 184 } },
  { id: 'mfe4', athlete: 'Jens Rau', partner: 'Ines Krug', team: 'Balance Act', category: 'mf-elite', gender: 'MF', level: 'elite', scores: { cardio: 209, strength: 213, medcon: 224, finisher: 181 } },
  { id: 'mfe5', athlete: 'Moritz Link', partner: 'Vera Scholz', team: 'Dynamic Duo', category: 'mf-elite', gender: 'MF', level: 'elite', scores: { cardio: 204, strength: 209, medcon: 219, finisher: 179 } },
  { id: 'mfe6', athlete: 'Stefan Rose', partner: 'Maja Gruber', team: 'Mixed Signals', category: 'mf-elite', gender: 'MF', level: 'elite', scores: { cardio: 199, strength: 204, medcon: 215, finisher: 178 } },

  // MF CORE
  { id: 'mfc1', athlete: 'Adrian Beck', partner: 'Lena Wolf', team: 'Better Together', category: 'mf-core', gender: 'MF', level: 'core', scores: { cardio: 162, strength: 157, medcon: 169, finisher: 143 } },
  { id: 'mfc2', athlete: 'Pascal Roth', partner: 'Mona Kraft', team: 'Everyday Athletes', category: 'mf-core', gender: 'MF', level: 'core', scores: { cardio: 156, strength: 153, medcon: 163, finisher: 140 } },
  { id: 'mfc3', athlete: 'René Falk', partner: 'Tanja Bosch', team: 'First Timer', category: 'mf-core', gender: 'MF', level: 'core', scores: { cardio: 151, strength: 149, medcon: 159, finisher: 139 } },
  { id: 'mfc4', athlete: 'Yannick Hahn', partner: 'Kim Specht', team: 'Level Up', category: 'mf-core', gender: 'MF', level: 'core', scores: { cardio: 146, strength: 145, medcon: 153, finisher: 137 } },
  { id: 'mfc5', athlete: 'Daniel Pfaff', partner: 'Sandra Kurz', team: 'Baseline', category: 'mf-core', gender: 'MF', level: 'core', scores: { cardio: 142, strength: 141, medcon: 148, finisher: 133 } },
];

type Section = 'overall' | 'cardio' | 'strength' | 'medcon' | 'finisher';

const SECTIONS: { id: Section; label: string; description: string; unit: string }[] = [
  { id: 'overall', label: 'overall', description: 'Combined score across all four sections', unit: 'pts total' },
  { id: 'cardio', label: 'cardio', description: 'Ski Erg · Bike · Row', unit: 'pts' },
  { id: 'strength', label: 'strength', description: 'Sandbag · Deadlift · Press', unit: 'pts' },
  { id: 'medcon', label: 'med con', description: 'Two-movement conditioning block', unit: 'pts' },
  { id: 'finisher', label: 'finisher', description: 'Final knockout station', unit: 'pts' },
];

const GENDERS = [
  { id: 'FF' as const, label: 'Women (FF)' },
  { id: 'MM' as const, label: 'Men (MM)' },
  { id: 'MF' as const, label: 'Mixed (MF)' },
];

const MEDALS = ['🥇', '🥈', '🥉'];
const PODIUM_COLORS = ['#C9A84C', '#A8A8A8', '#B87333'];

function getScore(team: Team, section: Section): number {
  if (section === 'overall') return team.scores.cardio + team.scores.strength + team.scores.medcon + team.scores.finisher;
  return team.scores[section];
}

export default function LeaderboardPage() {
  const [gender, setGender] = useState<'FF' | 'MM' | 'MF'>('MM');
  const [level, setLevel] = useState<'core' | 'elite'>('elite');
  const [section, setSection] = useState<Section>('overall');

  const filtered = TEAMS
    .filter((t) => t.gender === gender && t.level === level)
    .map((t) => ({ ...t, displayScore: getScore(t, section) }))
    .sort((a, b) => b.displayScore - a.displayScore)
    .map((t, i) => ({ ...t, rank: i + 1 }));

  const top3 = filtered.slice(0, 3);
  const rest = filtered.slice(3);
  const podiumOrder = [top3[1], top3[0], top3[2]].filter(Boolean);
  const currentSection = SECTIONS.find((s) => s.id === section)!;

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', paddingTop: 64 }}>

      {/* Hero */}
      <div className="grain-overlay" style={{ position: 'relative', height: 380, overflow: 'hidden' }}>
        <img
          src="/images/photos/winners-podium-celebration.jpg"
          alt="leaderboard"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%', filter: 'contrast(1.05)' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(20,21,20,0.2) 0%, rgba(20,21,20,0.9) 100%)' }} />
        <img src="/images/icons/community-hearts-white.png" alt="" aria-hidden="true" style={{ position: 'absolute', right: '6%', bottom: '15%', height: 72, opacity: 0.05, zIndex: 2, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px' }}>
          <img src="/images/icons/community-hearts-white.png" alt="" aria-hidden="true" style={{ height: 40, opacity: 0.12, marginBottom: 20 }} />
          <h1 style={{ fontSize: 'clamp(48px, 9vw, 84px)', fontWeight: 700, letterSpacing: '-0.03em', color: '#fff', marginBottom: 10 }}>leaderboard</h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>placeholder results · live on June 6, 2026</p>
        </div>
      </div>

      {/* Sticky controls */}
      <div style={{ position: 'sticky', top: 64, zIndex: 40, backgroundColor: '#fff', borderBottom: '1px solid #f0f0f0' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px' }}>

          {/* Row 1: Gender + Level */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f7f7f7' }}>
            <div style={{ display: 'flex' }}>
              {GENDERS.map((g) => (
                <button key={g.id} onClick={() => setGender(g.id)}
                  style={{
                    padding: '14px 22px', border: 'none', background: 'none', cursor: 'pointer',
                    fontFamily: 'inherit', fontSize: 13, fontWeight: 700,
                    color: gender === g.id ? '#141514' : '#ccc',
                    borderBottom: `2px solid ${gender === g.id ? '#F78DB9' : 'transparent'}`,
                    transition: 'all 0.15s', whiteSpace: 'nowrap',
                  }}
                >
                  {g.label}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              {(['core', 'elite'] as const).map((l) => (
                <button key={l} onClick={() => setLevel(l)}
                  style={{
                    padding: '6px 16px', borderRadius: 100, border: 'none', cursor: 'pointer',
                    fontFamily: 'inherit', fontSize: 11, fontWeight: 700,
                    backgroundColor: level === l ? '#141514' : 'transparent',
                    color: level === l ? '#fff' : '#ccc',
                    transition: 'all 0.15s',
                  }}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Row 2: Section tabs */}
          <div style={{ display: 'flex', overflowX: 'auto', gap: 0 }}>
            {SECTIONS.map((s) => (
              <button key={s.id} onClick={() => setSection(s.id)}
                style={{
                  padding: '12px 20px', border: 'none', background: 'none', cursor: 'pointer',
                  fontFamily: 'inherit', fontSize: 12, fontWeight: 700,
                  color: section === s.id ? '#141514' : '#bbb',
                  borderBottom: `2px solid ${section === s.id ? '#F78DB9' : 'transparent'}`,
                  transition: 'all 0.15s', whiteSpace: 'nowrap', flexShrink: 0,
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '56px 24px 100px', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/icons/hearts-pattern-black.png)', backgroundSize: '180px', backgroundRepeat: 'repeat', opacity: 0.02, pointerEvents: 'none' }} />

        {/* Section header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 6 }}>
            <h2 style={{ fontSize: 'clamp(20px, 3.5vw, 30px)', fontWeight: 700, letterSpacing: '-0.02em' }}>
              {GENDERS.find((g) => g.id === gender)?.label} · {level === 'elite' ? 'Elite' : 'Core'} · {currentSection.label}
            </h2>
            <span style={{ fontSize: 13, color: '#ccc' }}>{filtered.length} teams</span>
          </div>
          <p style={{ fontSize: 13, color: '#bbb' }}>{currentSection.description}</p>
        </div>

        {/* Podium */}
        {top3.length === 3 && (
          <div style={{ marginBottom: 64 }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
              <img src="/images/icons/duo-running-hearts-white.png" alt="" aria-hidden="true" style={{ height: 36, opacity: 0.12, marginBottom: 16 }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 8 }}>
              {podiumOrder.map((entry, i) => {
                const isFirst = entry.rank === 1;
                const medalIdx = entry.rank - 1;
                const heights = [140, 188, 110];
                return (
                  <div key={entry.rank} style={{ flex: 1, maxWidth: 280, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {/* Info above block */}
                    <div style={{ textAlign: 'center', marginBottom: 14, padding: '0 6px' }}>
                      <div style={{ fontSize: isFirst ? 26 : 20, marginBottom: 6 }}>{MEDALS[medalIdx]}</div>
                      <p style={{ fontSize: isFirst ? 15 : 13, fontWeight: 700, color: '#141514', marginBottom: 2, lineHeight: 1.3 }}>
                        {entry.athlete}
                      </p>
                      <p style={{ fontSize: isFirst ? 13 : 11, color: '#999', lineHeight: 1.3, marginBottom: 4 }}>
                        & {entry.partner}
                      </p>
                      <p style={{ fontSize: 11, color: '#ccc' }}>{entry.team}</p>

                      {/* Section score + breakdown */}
                      <p style={{ fontSize: isFirst ? 30 : 24, fontWeight: 700, color: '#141514', marginTop: 10, letterSpacing: '-0.02em', lineHeight: 1 }}>
                        {entry.displayScore}
                        <span style={{ fontSize: 11, color: '#ddd', marginLeft: 4, fontWeight: 500 }}>{currentSection.unit}</span>
                      </p>
                      {section === 'overall' && (
                        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 8, flexWrap: 'wrap' }}>
                          {(['cardio', 'strength', 'medcon', 'finisher'] as const).map((s) => (
                            <span key={s} style={{ fontSize: 10, color: '#bbb', backgroundColor: '#f7f7f7', padding: '2px 8px', borderRadius: 100 }}>
                              {s === 'medcon' ? 'Med Con' : s.charAt(0).toUpperCase() + s.slice(1)}: {entry.scores[s]}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Podium block */}
                    <div style={{
                      width: '100%', height: heights[i], borderRadius: '6px 6px 0 0',
                      backgroundColor: isFirst ? '#141514' : '#f5f5f5',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      borderTop: `3px solid ${PODIUM_COLORS[medalIdx]}`,
                    }}>
                      <span style={{ fontSize: isFirst ? 36 : 28, fontWeight: 900, color: isFirst ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)', letterSpacing: '-0.03em' }}>
                        {entry.rank}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ height: 4, backgroundColor: '#f0f0f0' }} />
          </div>
        )}

        {/* Table header */}
        {rest.length > 0 && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: '40px 1fr repeat(5, auto)', gap: '0 16px', padding: '0 0 10px', borderBottom: '2px solid #f0f0f0', marginBottom: 4 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: '#ccc' }}>#</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: '#ccc' }}>team</span>
              {section === 'overall' ? (
                <>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#ccc', textAlign: 'right' }}>cardio</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#ccc', textAlign: 'right' }}>strength</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#ccc', textAlign: 'right' }}>med con</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#ccc', textAlign: 'right' }}>finisher</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#141514', textAlign: 'right' }}>total</span>
                </>
              ) : (
                <span style={{ fontSize: 10, fontWeight: 700, color: '#141514', textAlign: 'right', gridColumn: 'span 5' }}>score</span>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {rest.map((entry, i) => (
                <div key={entry.id} style={{
                  display: 'grid',
                  gridTemplateColumns: section === 'overall' ? '40px 1fr repeat(5, auto)' : '40px 1fr auto',
                  gap: '0 16px',
                  padding: '18px 0',
                  borderBottom: i < rest.length - 1 ? '1px solid #f8f8f8' : 'none',
                  alignItems: 'center',
                }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#ddd' }}>{entry.rank}</span>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: '#141514', marginBottom: 2 }}>
                      {entry.athlete} <span style={{ fontWeight: 400, color: '#ccc' }}>&</span> {entry.partner}
                    </p>
                    <p style={{ fontSize: 11, color: '#ccc' }}>{entry.team}</p>
                  </div>
                  {section === 'overall' ? (
                    <>
                      <span style={{ fontSize: 13, color: '#999', textAlign: 'right' }}>{entry.scores.cardio}</span>
                      <span style={{ fontSize: 13, color: '#999', textAlign: 'right' }}>{entry.scores.strength}</span>
                      <span style={{ fontSize: 13, color: '#999', textAlign: 'right' }}>{entry.scores.medcon}</span>
                      <span style={{ fontSize: 13, color: '#999', textAlign: 'right' }}>{entry.scores.finisher}</span>
                      <span style={{ fontSize: 15, fontWeight: 700, color: '#141514', textAlign: 'right' }}>{entry.displayScore}</span>
                    </>
                  ) : (
                    <span style={{ fontSize: 16, fontWeight: 700, color: '#141514', textAlign: 'right' }}>{entry.displayScore}</span>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Section winners callout — only on Overall view */}
        {section === 'overall' && (
          <div style={{ marginTop: 64, padding: '32px', borderRadius: 20, backgroundColor: '#EFEFEF', border: '1px solid #f0f0f0' }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#707070', marginBottom: 20 }}>section winners</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
              {(['cardio', 'strength', 'medcon', 'finisher'] as const).map((s) => {
                const winner = [...filtered].sort((a, b) => b.scores[s] - a.scores[s])[0];
                return (
                  <div key={s} style={{ padding: '16px 18px', borderRadius: 14, backgroundColor: '#fff', border: '1px solid #eee' }}>
                    <p style={{ fontSize: 10, fontWeight: 700, color: '#707070', marginBottom: 8 }}>
                      {s === 'medcon' ? 'med con' : s}
                    </p>
                    <p style={{ fontSize: 13, fontWeight: 700, color: '#141514', lineHeight: 1.4, marginBottom: 2 }}>{winner?.team}</p>
                    <p style={{ fontSize: 11, color: '#bbb' }}>{winner?.scores[s]} pts</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* CTA */}
        <div style={{ marginTop: 48, padding: '40px', borderRadius: 20, backgroundColor: '#EFEFEF', border: '1px solid #f0f0f0', textAlign: 'center' }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#707070', marginBottom: 10 }}>not on the board yet?</p>
          <h3 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 8 }}>Register your team.</h3>
          <p style={{ fontSize: 14, color: '#888', marginBottom: 24 }}>Spots are limited. June 6, 2026 · Adidas Sports Base Berlin.</p>
          <a href="/register/" style={{
            display: 'inline-block', padding: '14px 32px', borderRadius: 100,
            backgroundColor: '#141514', color: '#fff',
            fontWeight: 700, fontSize: 13,
            textDecoration: 'none',
          }}>
            register now →
          </a>
        </div>
      </div>
    </div>
  );
}
