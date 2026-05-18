'use client';

import { useState, useEffect } from 'react';

type Act = {
  id: string;
  name: string;
  time: string;
  color: string;
  instagram?: string;
};

const LINEUP: Act[] = [
  { id: 'redbull',     name: 'red bull dance battle', time: '7:00 pm',         color: '#E03A3E', instagram: 'redbulldance' },
  { id: 'fatfingers',  name: 'dj fat fingers',        time: '7:30 – 8:30 pm',  color: '#185BC5', instagram: 'simonsaidso' },
  { id: 'shari',       name: 'shari who',             time: '8:30 – 9:30 pm',  color: '#F78DB9', instagram: 'shari_who' },
  { id: 'onit',        name: 'dj onit',               time: '9:30 – 10:30 pm', color: '#E8A53C', instagram: 'dj.onit' },
];

const RSVP_KEY = 'party-rsvp';

type PartyRsvp = { name: string; email: string; instagram: string; at: string };

export default function PartyPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', instagram: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<PartyRsvp | null>(null);
  const [error, setError] = useState('');
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(RSVP_KEY);
      if (raw) setSubmitted(JSON.parse(raw));
    } catch {}
  }, []);

  const openModal = () => {
    setError('');
    setTermsOpen(false);
    setTermsAgreed(!!submitted);
    if (submitted) {
      setForm({ name: submitted.name, email: submitted.email, instagram: submitted.instagram });
    }
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const name = form.name.trim();
    const email = form.email.trim();
    const instagram = form.instagram.trim().replace(/^@/, '');
    if (!name) { setError('add your name'); return; }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { setError('that email doesn’t look right'); return; }
    if (!instagram) { setError('add your instagram handle so we can tag you'); return; }
    if (!termsAgreed) { setError('please agree to the photo & recording terms to continue.'); return; }
    setSubmitting(true);
    const entry: PartyRsvp = { name, email, instagram, at: new Date().toISOString() };
    try { localStorage.setItem(RSVP_KEY, JSON.stringify({ ...entry, agreedTerms: true })); } catch {}
    setTimeout(() => {
      setSubmitted(entry);
      setSubmitting(false);
      setModalOpen(false);
    }, 400);
  };

  return (
    <div style={{ backgroundColor: '#141514', minHeight: '100vh', paddingTop: 64, color: '#fff' }}>

      <style>{`
        @keyframes iconDrift { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-10px) rotate(2deg); } }
        @keyframes pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.8; } }
        @keyframes overlayIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modalIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .act-card { transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease; }
        .act-card:hover { transform: translateY(-4px); border-color: rgba(255,255,255,0.32) !important; box-shadow: 0 16px 48px rgba(0,0,0,0.5); }
        .party-cta:hover { transform: translateY(-2px); box-shadow: 0 18px 40px rgba(247,141,185,0.4); }
        .ig-link { transition: color 0.2s ease, transform 0.2s ease, border-color 0.2s ease; }
        .ig-link:hover { color: #F78DB9 !important; border-color: rgba(247,141,185,0.6) !important; transform: scale(1.08); }
      `}</style>

      {/* Hero */}
      <div className="grain-overlay" style={{ position: 'relative', height: 520, overflow: 'hidden' }}>
        <img
          src="/images/photos/afterparty-crowd-outdoor.jpg"
          alt="party"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 45%', filter: 'brightness(0.7) contrast(1.05)' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(20,21,20,0.35) 0%, rgba(20,21,20,0.95) 100%)' }} />

        <img src="/images/icons/community-hearts-white.png" alt="" aria-hidden="true"
          style={{ position: 'absolute', left: '6%', bottom: '14%', height: 60, opacity: 0.05, pointerEvents: 'none', animation: 'iconDrift 7s ease-in-out infinite' }} />
        <img src="/images/icons/duo-running-hearts-white.png" alt="" aria-hidden="true"
          style={{ position: 'absolute', right: '8%', top: '24%', height: 48, opacity: 0.04, pointerEvents: 'none', animation: 'iconDrift 9s ease-in-out infinite', animationDelay: '1s' }} />

        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 40px', zIndex: 2 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24, fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#F78DB9', animation: 'pulse 2.4s ease-in-out infinite' }} />
            after dark
          </span>
          <h1 style={{ fontSize: 'clamp(56px, 11vw, 120px)', fontWeight: 700, letterSpacing: '-0.03em', color: '#fff', marginBottom: 16, lineHeight: 0.95 }}>
            party
          </h1>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.65)', maxWidth: 520, lineHeight: 1.65 }}>
            the lights go down. the bass comes up. four acts, one room, until late.
          </p>
        </div>
      </div>

      {/* Lineup */}
      <section style={{ padding: '100px 24px 80px', maxWidth: 980, margin: '0 auto', position: 'relative' }}>

        {/* decorative glows */}
        <div aria-hidden="true" style={{ position: 'absolute', top: 60, right: '-80px', width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(247,141,185,0.16) 0%, rgba(247,141,185,0) 70%)', pointerEvents: 'none', zIndex: 0 }} />
        <div aria-hidden="true" style={{ position: 'absolute', top: 220, left: '-100px', width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle, rgba(24,91,197,0.18) 0%, rgba(24,91,197,0) 70%)', pointerEvents: 'none', zIndex: 0 }} />

        {/* header */}
        <div style={{ textAlign: 'center', marginBottom: 40, position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <div style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.2)' }} />
            <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              tonight&apos;s lineup
            </span>
            <div style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.2)' }} />
          </div>
          <h2 style={{ fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 700, lineHeight: 0.95, letterSpacing: '-0.03em', color: '#fff', marginBottom: 16 }}>
            celebrate movement<br />
            <span style={{ position: 'relative', display: 'inline-block' }}>
              together.
              <svg aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, bottom: -10, width: '100%', height: 12, pointerEvents: 'none' }} viewBox="0 0 300 12" preserveAspectRatio="none">
                <path d="M2 8 Q 75 2, 150 7 T 298 5" stroke="#F78DB9" strokeWidth="4" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: 480, margin: '20px auto 0' }}>
            the party starts at 7 pm. whether you&apos;ve been with us all day or just want to come to groove — the party is open to everybody, to celebrate movement and community.
          </p>
        </div>

        {/* top sign-up CTA */}
        <div style={{ textAlign: 'center', marginBottom: 72, position: 'relative', zIndex: 1 }}>
          <button
            type="button"
            onClick={openModal}
            className="party-cta"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '16px 36px',
              borderRadius: 100,
              background: submitted ? 'rgba(255,255,255,0.08)' : 'linear-gradient(135deg, #fff 0%, #F78DB9 100%)',
              color: submitted ? '#fff' : '#141514',
              border: submitted ? '1px solid rgba(255,255,255,0.2)' : 'none',
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: '-0.005em',
              cursor: 'pointer',
              fontFamily: 'inherit',
              boxShadow: submitted ? 'none' : '0 12px 32px rgba(247,141,185,0.28)',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
            }}
          >
            {submitted ? `you're on the list, ${submitted.name.split(' ')[0]}` : 'sign up for the party'}
            <span aria-hidden="true" style={{ fontSize: 14, lineHeight: 1 }}>→</span>
          </button>
          {!submitted && (
            <p style={{ marginTop: 12, fontSize: 12, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.04em' }}>
              free entry — takes 30 seconds
            </p>
          )}
        </div>

        {/* poster-style lineup */}
        <div style={{ position: 'relative', zIndex: 1, padding: '48px 16px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.12)', borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
          {/* poster header */}
          <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.32em', textTransform: 'uppercase', marginBottom: 8 }}>
            adidas sports base berlin
          </div>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.32em', textTransform: 'uppercase', marginBottom: 40 }}>
            06 . 06 . 2026 · from 7 pm
          </div>

          {/* lineup poster */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>
            {LINEUP.map((act, idx) => (
              <div key={act.id} style={{ width: '100%', textAlign: 'center' }}>
                {idx > 0 && (
                  <div aria-hidden="true" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 24, color: 'rgba(255,255,255,0.18)', fontSize: 10, letterSpacing: '0.4em' }}>
                    <span style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.12)' }} />
                    ✦
                    <span style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.12)' }} />
                  </div>
                )}
                <div style={{
                  fontSize: idx === 0 ? 'clamp(36px, 8vw, 88px)' : 'clamp(28px, 6vw, 64px)',
                  fontWeight: 700,
                  lineHeight: 0.95,
                  letterSpacing: '-0.04em',
                  color: '#fff',
                  textShadow: '0 0 60px rgba(247,141,185,0.25)',
                  marginBottom: 10,
                }}>
                  {act.name}
                </div>
                <div style={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.6)',
                  marginBottom: 14,
                }}>
                  {act.time}
                </div>
                <a
                  href={act.instagram ? `https://instagram.com/${act.instagram}` : '#'}
                  target={act.instagram ? '_blank' : undefined}
                  rel={act.instagram ? 'noopener noreferrer' : undefined}
                  aria-label={`${act.name} on instagram`}
                  onClick={(e) => { if (!act.instagram) e.preventDefault(); }}
                  className="ig-link"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 34,
                    height: 34,
                    borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* food & drinks note */}
        <div style={{
          marginTop: 56,
          padding: '32px 32px',
          background: 'linear-gradient(135deg, rgba(247,141,185,0.08) 0%, rgba(24,91,197,0.08) 100%)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 20,
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#E8A53C' }} />
            on site
          </span>
          <h3 style={{ fontSize: 24, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', margin: '0 0 8px' }}>
            food + drinks all night
          </h3>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, margin: 0, maxWidth: 440, marginLeft: 'auto', marginRight: 'auto' }}>
            bar and kitchen open from 6:30 pm. card and cash accepted.
          </p>
        </div>

        {/* CTA */}
        <div style={{ marginTop: 80, textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h3 style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.05, margin: '0 0 12px' }}>
            see you on the floor.
          </h3>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, margin: '0 auto 32px', maxWidth: 420 }}>
            {submitted
              ? `you're on the list, ${submitted.name.split(' ')[0]} — we'll tag you when you tag us.`
              : 'free entry — sign up so we know to expect you.'}
          </p>
          <button
            type="button"
            onClick={openModal}
            className="party-cta"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '18px 44px',
              borderRadius: 100,
              background: submitted ? 'rgba(255,255,255,0.08)' : 'linear-gradient(135deg, #fff 0%, #F78DB9 100%)',
              color: submitted ? '#fff' : '#141514',
              border: submitted ? '1px solid rgba(255,255,255,0.2)' : 'none',
              fontWeight: 700,
              fontSize: 15,
              letterSpacing: '-0.005em',
              cursor: 'pointer',
              fontFamily: 'inherit',
              boxShadow: submitted ? 'none' : '0 12px 32px rgba(247,141,185,0.28)',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
            }}
          >
            {submitted ? 'edit your details' : 'sign up for the party'}
            <span aria-hidden="true" style={{ fontSize: 16, lineHeight: 1 }}>→</span>
          </button>
        </div>

        {/* tagline */}
        <p style={{ textAlign: 'center', marginTop: 80, fontSize: 12, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.16em', textTransform: 'uppercase', position: 'relative', zIndex: 1 }}>
          june 6, 2026 · adidas sports base berlin
        </p>
      </section>

      {/* RSVP modal */}
      {modalOpen && (
        <div
          onClick={() => !submitting && setModalOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(8px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
            animation: 'overlayIn 0.25s ease',
          }}
        >
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
            style={{
              background: '#1A1B1A',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 24,
              padding: '32px 32px 28px',
              maxWidth: 440,
              width: '100%',
              position: 'relative',
              animation: 'modalIn 0.3s ease',
            }}
          >
            <button
              type="button"
              onClick={() => !submitting && setModalOpen(false)}
              aria-label="close"
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                background: 'rgba(255,255,255,0.08)',
                border: 'none',
                color: '#fff',
                width: 32,
                height: 32,
                borderRadius: '50%',
                fontSize: 16,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'inherit',
                lineHeight: 1,
              }}
            >
              ×
            </button>

            <h3 style={{ fontSize: 26, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1, margin: '0 0 8px' }}>
              {submitted ? 'update your rsvp' : 'sign up for the party'}
            </h3>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.55, margin: '0 0 24px' }}>
              free entry. three quick fields and you&apos;re in.
            </p>

            <label style={{ display: 'block', marginBottom: 16 }}>
              <span style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>
                name
              </span>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="your name"
                autoComplete="name"
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: 12,
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#fff',
                  fontSize: 14,
                  outline: 'none',
                  fontFamily: 'inherit',
                }}
              />
            </label>

            <label style={{ display: 'block', marginBottom: 16 }}>
              <span style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>
                email
              </span>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                autoComplete="email"
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: 12,
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#fff',
                  fontSize: 14,
                  outline: 'none',
                  fontFamily: 'inherit',
                }}
              />
            </label>

            <label style={{ display: 'block', marginBottom: 20 }}>
              <span style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>
                instagram
              </span>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>@</span>
                <input
                  type="text"
                  value={form.instagram}
                  onChange={(e) => setForm({ ...form, instagram: e.target.value.replace(/^@/, '') })}
                  placeholder="yourhandle"
                  autoComplete="off"
                  style={{
                    width: '100%',
                    padding: '14px 16px 14px 32px',
                    borderRadius: 12,
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#fff',
                    fontSize: 14,
                    outline: 'none',
                    fontFamily: 'inherit',
                  }}
                />
              </div>
            </label>

            {/* photo & recording terms */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 8, cursor: 'pointer', fontSize: 12, color: 'rgba(255,255,255,0.75)', lineHeight: 1.45 }}>
                <input
                  type="checkbox"
                  checked={termsAgreed}
                  onChange={(e) => setTermsAgreed(e.target.checked)}
                  style={{ marginTop: 2, accentColor: '#F78DB9', flexShrink: 0 }}
                />
                <span>
                  i agree to the{' '}
                  <button
                    type="button"
                    onClick={() => setTermsOpen(!termsOpen)}
                    style={{ background: 'none', border: 'none', color: '#fff', textDecoration: 'underline', cursor: 'pointer', fontSize: 12, padding: 0, fontFamily: 'inherit' }}
                  >
                    photo & recording terms
                  </button>
                </span>
              </label>
              {termsOpen && (
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', lineHeight: 1.55, background: 'rgba(255,255,255,0.04)', padding: '12px 14px', borderRadius: 8, maxHeight: 200, overflowY: 'auto' }}>
                  <p style={{ margin: '0 0 8px' }}>by attending this event, you acknowledge and agree that photography, audio, and video recording may take place. by entering the event premises, you:</p>
                  <ul style={{ margin: '0 0 8px', paddingLeft: 16, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <li>consent to being photographed, filmed, and/or recorded, and to the use of your image, likeness, voice, and name in any media captured during the event.</li>
                    <li>allow dopamine, its partners, and affiliates to use this media for any purpose, including but not limited to websites, social media, advertising, content creation, and promotional materials — now and in the future.</li>
                    <li>waive any rights to review, approve, or receive compensation for the use of such media, and release all claims related to privacy, publicity rights, or copyright.</li>
                  </ul>
                  <p style={{ margin: 0 }}>if you do not agree with these terms, we kindly ask that you do not enter the event space.</p>
                </div>
              )}
            </div>

            {error && (
              <p style={{ fontSize: 12, color: '#F78DB9', margin: '0 0 16px', textAlign: 'center' }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              style={{
                width: '100%',
                padding: '16px 24px',
                borderRadius: 100,
                background: 'linear-gradient(135deg, #fff 0%, #F78DB9 100%)',
                color: '#141514',
                border: 'none',
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: '-0.005em',
                cursor: submitting ? 'wait' : 'pointer',
                fontFamily: 'inherit',
                opacity: submitting ? 0.7 : 1,
                transition: 'opacity 0.2s ease',
              }}
            >
              {submitting ? 'saving…' : submitted ? 'save changes' : 'confirm rsvp'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
