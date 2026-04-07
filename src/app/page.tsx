'use client';

import { useEffect, useState } from 'react';
import { getSponsors } from '@/lib/api';
import { Component as EtherealShadow } from '@/components/ui/etheral-shadow';

interface Sponsor {
  sponsor_id: string; sponsor_name: string; logo_url: string; website_url?: string; tier: string;
}

function useCountdown(target: Date) {
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    function calc() {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) return;
      setT({ days: Math.floor(diff / 86400000), hours: Math.floor((diff % 86400000) / 3600000), minutes: Math.floor((diff % 3600000) / 60000), seconds: Math.floor((diff % 60000) / 1000) });
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

  useEffect(() => { getSponsors().then((r) => setSponsors(r.data)).catch(() => {}); }, []);

  return (
    <div style={{ backgroundColor: '#fff', color: '#141514' }}>

      {/* ──────────────────────── HERO ──────────────────────── */}
      <style>{`
        @keyframes heroZoom { 0% { transform: scale(1); } 100% { transform: scale(1.06); } }
        @keyframes shimmerSweep { 0% { transform: translateX(-120%) skewX(-18deg); opacity: 0; } 8% { opacity: 1; } 92% { opacity: 1; } 100% { transform: translateX(500%) skewX(-18deg); opacity: 0; } }
        @keyframes ringPulse { 0% { transform: translate(-50%, -50%) scale(1); opacity: 0.1; } 100% { transform: translate(-50%, -50%) scale(1.2); opacity: 0; } }
        @keyframes fadeUp { 0% { opacity: 0; transform: translateY(24px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes iconDrift { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-12px) rotate(3deg); } }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .triptych-card:hover img { transform: scale(1.08); }
        .triptych-card:hover .card-overlay { opacity: 0.5; }
        .photo-hover:hover { transform: scale(1.03); }
        .chapter-card:hover img:first-child { filter: blur(3px) brightness(0.4) saturate(0.8) contrast(1.2) !important; transform: scale(1.05); }
        .cinematic-section { height: 52vw; min-height: 560px; max-height: 820px; }
        .cinematic-content { position: absolute; inset: 0; display: flex; align-items: center; }
        .hero-img { top: 64px !important; }
        @media (max-width: 767px) {
          .hero-section { min-height: 85svh !important; }
          .hero-cta { padding: 14px 28px !important; font-size: 14px !important; }
          .cinematic-section { height: auto !important; min-height: 0 !important; max-height: none !important; padding: 80px 0 !important; }
          .cinematic-content { position: relative !important; inset: auto !important; padding: 0 28px !important; }
        }
      `}</style>

      {/* LOCKED - do not modify hero section layout values */}
      {/* LOCKED - do not modify hero section layout */}
      <section className="hero-section" style={{ position: 'relative', minHeight: 'calc(100svh + 100px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', padding: '40px 24px 60px', overflow: 'hidden' }}>
        {/* LOCKED - do not modify */}
        <img
          className="hero-img"
          src="/images/hero/event-creative.png"
          alt="the dopamine games 2026"
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center center',
            animation: 'heroZoom 18s ease-in-out infinite alternate',
          }}
        />
        {/* ethereal shadow overlay */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: 'screen', opacity: 0.55 }}>
          <EtherealShadow
            color="rgba(24, 91, 197, 1)"
            animation={{ scale: 100, speed: 90 }}
            noise={{ opacity: 1, scale: 1.2 }}
            sizing="fill"
          />
        </div>
        {/* dark gradient */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(20,21,20,0.1) 0%, transparent 25%, transparent 60%, rgba(20,21,20,0.85) 95%, #141514 100%)' }} />
        {/* grain */}
        <div className="grain-overlay" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
        {/* concentric rings */}
        {[300, 460, 620].map((size, i) => (
          <div key={size} style={{ position: 'absolute', left: '50%', top: '58%', width: size, height: size, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.05)', transform: 'translate(-50%, -50%)', pointerEvents: 'none', animation: `ringPulse ${7 + i * 2.5}s ease-in-out infinite`, animationDelay: `${i * 1.2}s` }} />
        ))}

        <h1 style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', opacity: 0 }}>the dopamine games 2026</h1>

        {/* spacer: pushes CTA group to bottom of hero */}
        <div style={{ flex: 1, position: 'relative', zIndex: 2 }} />

        {/* bottom spacer */}
        <div style={{ position: 'relative', zIndex: 2, height: 40 }} />
      </section>
      {/* END LOCKED hero section */}

      {/* ──────────────────────── COUNTDOWN ──────────────────────── */}
      <section style={{ backgroundColor: '#141514', padding: '56px 24px', textAlign: 'center' }}>
        <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 28 }}>
          june 6, 2026 · adidas sports base berlin
        </p>
        <div style={{ display: 'flex', gap: 'clamp(8px, 3vw, 48px)', alignItems: 'baseline', justifyContent: 'center' }}>
          {[{ v: cd.days, l: 'days' }, { v: cd.hours, l: 'hrs' }, { v: cd.minutes, l: 'min' }, { v: cd.seconds, l: 'sec' }].map(({ v, l }, i) => (
            <div key={l} style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <span style={{ fontSize: 'clamp(36px, 7vw, 96px)', fontWeight: 700, color: '#fff', fontVariantNumeric: 'tabular-nums', lineHeight: 1, letterSpacing: '-0.03em' }}>
                {String(v).padStart(2, '0')}
              </span>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>{l}</span>
              {i < 3 && <span style={{ fontSize: 'clamp(20px, 4vw, 56px)', color: 'rgba(255,255,255,0.12)', marginLeft: 2 }}>:</span>}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 40 }}>
          <a href="https://team-aretas.com/competitions/3444" target="_blank" rel="noopener noreferrer" style={{ padding: '14px 28px', borderRadius: 100, backgroundColor: '#fff', color: '#141514', fontWeight: 700, fontSize: 'clamp(13px, 2vw, 15px)', textDecoration: 'none', transition: 'opacity 0.2s', whiteSpace: 'nowrap' }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >enter the games</a>
          <a href="/workouts/" style={{ padding: '14px 28px', borderRadius: 100, border: '1px solid rgba(255,255,255,0.25)', color: '#fff', fontWeight: 500, fontSize: 'clamp(13px, 2vw, 15px)', textDecoration: 'none', transition: 'border-color 0.2s', whiteSpace: 'nowrap' }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)')}
          >the workouts</a>
        </div>
        <img src="/images/icons/community-hearts-white.png" alt="" aria-hidden="true" style={{ height: 64, opacity: 0.7, marginTop: 32, display: 'inline-block' }} />
      </section>

      {/* ──────────────────────── PARTNER STRIP ──────────────────────── */}
      <div style={{ backgroundColor: '#141514', overflow: 'hidden', padding: '22px 0', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', animation: 'marquee 56s linear infinite', whiteSpace: 'nowrap' }}>
          {Array.from({ length: 4 }).map((_, rep) => (
            <div key={rep} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              {[
                { src: '/images/adidas logos/adidaslogowhite.png', alt: 'adidas', h: 48 },
                { src: '/images/sponsors/teufel-white.svg', alt: 'teufel', h: 38 },
                { src: '/images/sponsors/burgermeister-placeholder-white.svg', alt: 'burgermeister', h: 54 },
                { src: '/images/sponsors/esn-placeholder-white.svg', alt: 'esn', h: 44 },
                { src: '/images/sponsors/vly-placeholder-white.svg', alt: 'vly', h: 44 },
              ].map((logo, i) => (
                <img key={`${rep}-${i}`} src={logo.src} alt={logo.alt} style={{ height: logo.h, marginRight: 84, opacity: 0.55 }} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          YOUR DAY: overview of the three chapters
      ══════════════════════════════════════════════════════════════ */}
      <style>{`
        .chapter-card-light { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .chapter-card-light:hover { transform: translateY(-4px); box-shadow: 0 24px 60px rgba(15,40,100,0.18) !important; }
        .chapter-card-light:hover .ch-num-light { opacity: 0.18 !important; }
        .cards-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        @media (min-width: 768px) { .chapters-section { overflow: hidden; } }
        @media (max-width: 767px) {
          .chapters-inner { padding: 0 !important; overflow: visible !important; }
          .chapters-header { padding: 0 24px !important; }
          .swipe-hint { display: flex !important; align-items: center; gap: 6px; padding: 0 24px 16px; }
          .cards-grid { display: flex; overflow-x: auto; scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch; gap: 12px; padding: 0 24px 16px !important; margin: 0 !important; scrollbar-width: none; }
          .cards-grid::-webkit-scrollbar { display: none; }
          .chapter-card-light { width: 78vw !important; min-width: 78vw !important; max-width: 78vw !important; scroll-snap-align: start; flex-shrink: 0 !important; }
        }
      `}</style>
      <section className="chapters-section" style={{ position: 'relative', padding: '48px 0 80px', backgroundColor: '#fff' }}>
        <div className="chapters-inner" style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 2, padding: '0 40px' }}>
          {/* header */}
          <div className="chapters-header" style={{ textAlign: 'center', marginBottom: 64 }}>
            <img src="/images/icons/community-hearts-black.png" alt="" aria-hidden="true" style={{ height: 36, opacity: 0.06, marginBottom: 24 }} />
            <h2 style={{ fontSize: 'clamp(40px, 5.5vw, 68px)', fontWeight: 700, lineHeight: 1.0, marginBottom: 16, letterSpacing: '-0.02em', color: '#141514' }}>
              one day. three chapters.
            </h2>
            <p style={{ fontSize: 17, color: '#707070', lineHeight: 1.7, maxWidth: 500, margin: '0 auto' }}>
              june 6, berlin. from the first rep to the last song, this is the full experience.
            </p>
          </div>

          {/* swipe hint: mobile only */}
          <div className="swipe-hint" style={{ display: 'none' }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: '#B0B0B0', letterSpacing: '0.06em' }}>swipe</span>
            <span style={{ fontSize: 16, color: '#B0B0B0' }}>→</span>
          </div>

          {/* cards */}
          <div className="cards-grid" style={{ margin: '0 -40px', padding: '0 40px' }}>
            {[
              {
                num: '01', label: 'perform',
                headline: 'the competition.',
                copy: 'seven stations. teams of two. cardio, strength & conditioning, and a finisher. you go, i go. every rep counts.',
                stats: [{ k: 'stations', v: '07' }, { k: 'format', v: 'teams of 2' }, { k: 'duration', v: '6 min / station' }],
                icon: '/images/icons/community-hearts-black.png',
                href: '/workouts/',
                accent: '#185BC5',
                patternIcon: '/images/icons/community-hearts-black.png',
              },
              {
                num: '02', label: 'play',
                headline: 'the open floor.',
                copy: 'bookable sessions across four spaces. strength, movement, recovery, community. no competition. just show up and move.',
                stats: [{ k: 'spaces', v: '04' }, { k: 'sessions', v: '16+' }, { k: 'access', v: 'open' }],
                icon: '/images/icons/duo-running-hearts-black.png',
                href: '/open-play/',
                accent: '#141514',
                patternIcon: '/images/icons/duo-running-hearts-black.png',
              },
              {
                num: '03', label: 'party',
                headline: 'the closing.',
                copy: 'food, music, dancing, and a karaoke room you didn\'t know you needed. this is how we end it.',
                stats: [{ k: 'dj', v: 'live set' }, { k: 'venue', v: 'outdoor' }, { k: 'dress', v: 'come as you are' }],
                icon: '/images/icons/community-hearts-black.png',
                href: '#party',
                accent: '#F78DB9',
                patternIcon: '/images/icons/community-hearts-black.png',
              },
            ].map((ch) => (
              <a key={ch.num} href={ch.href} className="chapter-card-light" style={{
                position: 'relative', padding: '32px 28px 36px',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                textDecoration: 'none', cursor: 'pointer',
                backgroundColor: '#F7F7F7',
                border: '1px solid #EBEBEB',
                borderRadius: 16,
                minHeight: 400,
                overflow: 'hidden',
                boxShadow: '0 2px 20px rgba(0,0,0,0.04)',
              }}>
                {/* label + headline + copy */}
                <div style={{ marginBottom: 16, position: 'relative', zIndex: 1 }}>
                  <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#B0B0B0', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: 12 }}>{`[ ${ch.label} ]`}</span>
                  <h3 style={{ fontSize: 'clamp(22px, 2.5vw, 26px)', fontWeight: 700, color: '#141514', lineHeight: 1.15, marginBottom: 12 }}>{ch.headline}</h3>
                  <p style={{ fontSize: 13, color: '#707070', lineHeight: 1.65 }}>{ch.copy}</p>
                </div>

                {/* data readouts */}
                <div style={{ borderTop: '1px solid #E8E8E8', paddingTop: 16, marginBottom: 24, position: 'relative', zIndex: 1 }}>
                  {ch.stats.map((s) => (
                    <div key={s.k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#C0C0C0', letterSpacing: '0.06em' }}>{s.k}</span>
                      <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#141514', letterSpacing: '0.06em', fontWeight: 600 }}>{s.v}</span>
                    </div>
                  ))}
                </div>

                {/* large ghost number */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <span className="ch-num-light" style={{ fontSize: 88, fontWeight: 700, color: 'rgba(20,21,20,0.18)', lineHeight: 1, letterSpacing: '-0.04em', display: 'block' }}>{ch.num}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          CHAPTER 1: PERFORM
      ══════════════════════════════════════════════════════════════ */}
      <section className="grain-overlay cinematic-section" style={{ position: 'relative', overflow: 'hidden' }}>
        <img src="/images/photos/team-sled-push-cheering.jpg" alt="the competition" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 35%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(20,21,20,0.88) 0%, rgba(20,21,20,0.4) 60%, transparent 100%)' }} />

        <img src="/images/icons/community-hearts-white.png" alt="" aria-hidden="true"
          style={{ position: 'absolute', right: '6%', bottom: '10%', height: 100, opacity: 0.05, pointerEvents: 'none', animation: 'iconDrift 7s ease-in-out infinite' }} />

        <div className="cinematic-content" style={{ padding: '80px 40px', zIndex: 2 }}>
          <div style={{ maxWidth: 520 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em' }}>01</span>
              <div style={{ width: 60, height: 1, backgroundColor: 'rgba(255,255,255,0.25)' }} />
              <span style={{ fontSize: 16, fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.04em' }}>perform</span>
            </div>

            <h2 style={{ fontSize: 'clamp(40px, 5.5vw, 64px)', fontWeight: 700, lineHeight: 1.0, color: '#fff', marginBottom: 28, letterSpacing: '-0.02em' }}>
              seven stations.<br />one partner.<br />every rep counts.
            </h2>

            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, marginBottom: 40, maxWidth: 440 }}>
              cardio, strength & conditioning, and a finisher. teams of two, you go i go format. 6 minutes per station, 90 seconds rest. your score is your legacy.
            </p>

            <a href="/workouts/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 40px', borderRadius: 100, backgroundColor: '#fff', color: '#141514', fontWeight: 700, fontSize: 14, textDecoration: 'none', transition: 'opacity 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              see the workouts →
            </a>
          </div>
        </div>
      </section>

      {/* ── breather between perform & play ── */}
      <section style={{ padding: '80px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="hearts-bg" />

        {/* playful floating icons */}
        <img src="/images/icons/community-hearts-black.png" alt="" aria-hidden="true"
          style={{ position: 'absolute', left: '6%', top: '18%', height: 56, opacity: 0.5, pointerEvents: 'none', animation: 'iconDrift 7s ease-in-out infinite', transform: 'rotate(-12deg)' }} />
        <img src="/images/icons/runners-speed-black.png" alt="" aria-hidden="true"
          style={{ position: 'absolute', right: '8%', top: '12%', height: 48, opacity: 0.4, pointerEvents: 'none', animation: 'iconDrift 9s ease-in-out infinite', animationDelay: '1s', transform: 'rotate(8deg)' }} />
        <img src="/images/icons/duo-running-hearts-black.png" alt="" aria-hidden="true"
          style={{ position: 'absolute', left: '20%', bottom: '12%', height: 44, opacity: 0.4, pointerEvents: 'none', animation: 'iconDrift 8s ease-in-out infinite', animationDelay: '2s', transform: 'rotate(5deg)' }} />
        <img src="/images/icons/weightlifter-hearts-white.png" alt="" aria-hidden="true"
          style={{ position: 'absolute', right: '15%', bottom: '18%', height: 52, opacity: 0.5, pointerEvents: 'none', animation: 'iconDrift 6s ease-in-out infinite', animationDelay: '0.5s', transform: 'rotate(-6deg)', filter: 'invert(1)' }} />
        <img src="/images/icons/community-hearts-black.png" alt="" aria-hidden="true"
          style={{ position: 'absolute', right: '35%', top: '10%', height: 36, opacity: 0.3, pointerEvents: 'none', animation: 'iconDrift 10s ease-in-out infinite', animationDelay: '3s', transform: 'rotate(15deg)' }} />

        <div style={{ position: 'relative', zIndex: 2 }}>
          {/* icon row */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginBottom: 28 }}>
            <img src="/images/icons/runners-speed-black.png" alt="" aria-hidden="true" style={{ height: 40, opacity: 0.5 }} />
            <img src="/images/icons/community-hearts-black.png" alt="" aria-hidden="true" style={{ height: 40, opacity: 0.5 }} />
            <img src="/images/icons/duo-running-hearts-black.png" alt="" aria-hidden="true" style={{ height: 40, opacity: 0.5 }} />
          </div>
          <p style={{ fontSize: 'clamp(32px, 4vw, 44px)', fontWeight: 700, color: '#141514', margin: 0, lineHeight: 1.15, textAlign: 'center' }}>
            compete. play. or do both.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          CHAPTER 2: PLAY
      ══════════════════════════════════════════════════════════════ */}
      <section className="grain-overlay cinematic-section" style={{ position: 'relative', overflow: 'hidden' }}>
        <img src="/images/photos/athlete-laughing-post-workout.jpg" alt="open play" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(20,21,20,0.88) 0%, rgba(20,21,20,0.4) 60%, transparent 100%)' }} />

        <img src="/images/icons/duo-running-hearts-white.png" alt="" aria-hidden="true"
          style={{ position: 'absolute', right: '6%', bottom: '10%', height: 100, opacity: 0.05, pointerEvents: 'none', animation: 'iconDrift 7s ease-in-out infinite' }} />

        <div className="cinematic-content" style={{ padding: '80px 40px', zIndex: 2 }}>
          <div style={{ maxWidth: 520 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em' }}>02</span>
              <div style={{ width: 60, height: 1, backgroundColor: 'rgba(255,255,255,0.25)' }} />
              <span style={{ fontSize: 16, fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.04em' }}>play</span>
            </div>

            <h2 style={{ fontSize: 'clamp(40px, 5.5vw, 64px)', fontWeight: 700, lineHeight: 1.0, color: '#fff', marginBottom: 28, letterSpacing: '-0.02em' }}>
              an afternoon<br />filled with<br />experiences.
            </h2>

            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, marginBottom: 32, maxWidth: 440 }}>
              book a session, drop into a class, or just explore. strength, movement, recovery, community. something for every kind of person.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 40 }}>
              {['strength', 'boxing', 'yoga', 'dance', 'sound bath', 'breathwork', 'paddle tennis'].map((s) => (
                <span key={s} style={{ fontSize: 13, fontWeight: 500, padding: '8px 16px', borderRadius: 100, border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.45)', transition: 'all 0.2s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; }}
                >{s}</span>
              ))}
            </div>

            <a href="/open-play/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 40px', borderRadius: 100, backgroundColor: '#fff', color: '#141514', fontWeight: 700, fontSize: 14, textDecoration: 'none', transition: 'opacity 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              explore open play →
            </a>
          </div>
        </div>
      </section>

      {/* ── breather between play & party ── */}
      <section style={{ padding: '80px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="hearts-bg" />

        {/* playful floating icons */}
        <img src="/images/icons/community-hearts-black.png" alt="" aria-hidden="true"
          style={{ position: 'absolute', right: '8%', top: '18%', height: 52, opacity: 0.45, pointerEvents: 'none', animation: 'iconDrift 7s ease-in-out infinite', transform: 'rotate(10deg)' }} />
        <img src="/images/icons/duo-running-hearts-black.png" alt="" aria-hidden="true"
          style={{ position: 'absolute', left: '10%', top: '15%', height: 44, opacity: 0.35, pointerEvents: 'none', animation: 'iconDrift 8s ease-in-out infinite', animationDelay: '1.5s', transform: 'rotate(-8deg)' }} />
        <img src="/images/icons/runners-speed-black.png" alt="" aria-hidden="true"
          style={{ position: 'absolute', left: '30%', bottom: '12%', height: 40, opacity: 0.35, pointerEvents: 'none', animation: 'iconDrift 9s ease-in-out infinite', animationDelay: '2s', transform: 'rotate(6deg)' }} />
        <img src="/images/icons/weightlifter-hearts-white.png" alt="" aria-hidden="true"
          style={{ position: 'absolute', right: '25%', bottom: '18%', height: 48, opacity: 0.4, pointerEvents: 'none', animation: 'iconDrift 6s ease-in-out infinite', animationDelay: '0.5s', transform: 'rotate(-5deg)', filter: 'invert(1)' }} />

        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginBottom: 28 }}>
            <img src="/images/icons/community-hearts-black.png" alt="" aria-hidden="true" style={{ height: 40, opacity: 0.5 }} />
          </div>
          <p style={{ fontSize: 'clamp(32px, 4vw, 44px)', fontWeight: 700, color: '#141514', margin: 0, lineHeight: 1.15, textAlign: 'center' }}>
            the reps are done.<br />the night is not.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          CHAPTER 3: PARTY
      ══════════════════════════════════════════════════════════════ */}
      <section id="party" className="grain-overlay cinematic-section" style={{ position: 'relative', overflow: 'hidden' }}>
        <img src="/images/photos/LesMillsxSportsbase_196 (3).jpg" alt="party" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(20,21,20,0.88) 0%, rgba(20,21,20,0.4) 60%, transparent 100%)' }} />

        <img src="/images/icons/community-hearts-white.png" alt="" aria-hidden="true"
          style={{ position: 'absolute', right: '6%', bottom: '10%', height: 100, opacity: 0.05, pointerEvents: 'none', animation: 'iconDrift 7s ease-in-out infinite' }} />

        <div className="cinematic-content" style={{ padding: '80px 40px', zIndex: 2 }}>
          <div style={{ maxWidth: 520 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em' }}>03</span>
              <div style={{ width: 60, height: 1, backgroundColor: 'rgba(255,255,255,0.25)' }} />
              <span style={{ fontSize: 16, fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.04em' }}>party</span>
            </div>

            <h2 style={{ fontSize: 'clamp(40px, 5.5vw, 64px)', fontWeight: 700, lineHeight: 1.0, color: '#fff', marginBottom: 28, letterSpacing: '-0.02em' }}>
              we close loud.
            </h2>

            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, marginBottom: 40, maxWidth: 440 }}>
              food. music. dancing. a karaoke room you didn't know you needed. this is how we send you home.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 40 }}>
              {['live dj', 'food & drinks', 'karaoke', 'dancing', 'afterparty'].map((s) => (
                <span key={s} style={{ fontSize: 13, fontWeight: 500, padding: '8px 16px', borderRadius: 100, border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.45)', transition: 'all 0.2s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; }}
                >{s}</span>
              ))}
            </div>

          </div>
        </div>
      </section>


      {/* ──────────────────────── FINAL CTA ──────────────────────── */}
      <section style={{ padding: '120px 40px', textAlign: 'center', maxWidth: 800, margin: '0 auto', position: 'relative' }}>
        <div className="hearts-bg" />

        <div style={{ position: 'relative', zIndex: 2 }}>
          {/* main games icon */}
          <img src="/images/icons/community-hearts-black.png" alt="" aria-hidden="true" style={{ height: 56, marginBottom: 36, opacity: 0.06 }} />

          <p style={{ fontSize: 12, fontWeight: 500, color: '#707070', marginBottom: 24 }}>june 6, 2026 · berlin</p>
          <h2 style={{ fontSize: 'clamp(46px, 7vw, 88px)', fontWeight: 700, lineHeight: 0.95, marginBottom: 20 }}>
            show up.<br />
            move together.
          </h2>
          <p style={{ fontSize: 18, color: '#D0D0D0', marginBottom: 48, lineHeight: 1.6 }}>
            one day. a lot of energy. people who get it.
          </p>

          {/* hearts divider */}
          <div className="divider-hearts" style={{ marginBottom: 40 }}>
            <img src="/images/icons/community-hearts-black.png" alt="" aria-hidden="true" style={{ height: 28, opacity: 0.06 }} />
          </div>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://team-aretas.com/competitions/3444" target="_blank" rel="noopener noreferrer" style={{ padding: '16px 40px', borderRadius: 100, backgroundColor: '#141514', color: '#fff', fontWeight: 700, fontSize: 14, transition: 'opacity 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.75')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              enter the games
            </a>
          </div>
        </div>
      </section>

      {/* ──────────────────────── PHOTO CAROUSEL ──────────────────────── */}
      <section style={{ overflow: 'hidden', padding: '80px 0' }}>
        <p style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, color: '#ccc', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 32 }}>moments from last year</p>
        <style>{`
          @keyframes photoScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        `}</style>
        <div style={{ display: 'flex', animation: 'photoScroll 60s linear infinite', whiteSpace: 'nowrap' }}>
          {Array.from({ length: 2 }).map((_, rep) => (
            <div key={rep} style={{ display: 'flex', gap: 12, flexShrink: 0, paddingRight: 12 }}>
              {[
                'athlete-sled-push-competition.jpg',
                'LesMillsxSportsbase_142.jpg',
                'athlete-barbell-grip-smiling.jpg',
                'crowd-sitting-field-clapping.jpg',
                'duo-deadlift-outdoor-turf.jpg',
                'athlete-rowing-competition-crowd.jpg',
                'dj-afterparty-crowd-dancing.jpg',
                'women-sprinting-close-up.jpg',
                'team-sled-push-cheering.jpg',
                'athlete-laughing-post-workout.jpg',
                'athletes-dopamine-games-tee-field.jpg',
                'duo-assault-bike-recovery.jpg',
                'afterparty-crowd-outdoor.jpg',
                'winners-podium-celebration.jpg',
                'teammates-barbell-rack-dopamine-tees.jpg',
                'athlete-assault-bike-intensity.jpg',
                'winner-cheque-presentation.jpg',
                'athletes-recovery-games-tee-rowers.jpg',
                'LesMillsxSportsbase_196 (3).jpg',
              ].map((img, i) => (
                <img
                  key={`${rep}-${i}`}
                  src={`/images/photos/${img}`}
                  alt=""
                  style={{ height: 280, width: 'auto', borderRadius: 12, objectFit: 'cover', flexShrink: 0 }}
                />
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ──────────────────────── SPONSORS ──────────────────────── */}
      {sponsors.length > 0 && (
        <section style={{ borderTop: '1px solid #EFEFEF', padding: '112px 40px' }}>
          <p style={{ textAlign: 'center', fontSize: 12, fontWeight: 500, color: '#D0D0D0', marginBottom: 80 }}>our partners</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 96 }}>
            {sponsors.map((s) => (
              <a key={s.sponsor_id} href={s.website_url ?? '#'} target="_blank" rel="noopener noreferrer"
                style={{ opacity: 0.25, transition: 'opacity 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.25')}
              >
                <img src={s.logo_url} alt={s.sponsor_name} style={{ height: 56, objectFit: 'contain' }} />
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
