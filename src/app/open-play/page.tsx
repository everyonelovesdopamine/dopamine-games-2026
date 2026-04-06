'use client';

export default function OpenPlayPage() {
  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', paddingTop: 64 }}>

      <style>{`
        @keyframes iconDrift { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-10px) rotate(2deg); } }
        .space-card { transition: transform 0.5s ease, box-shadow 0.3s ease; }
        .space-card:hover { transform: translateY(-4px); box-shadow: 0 20px 60px rgba(0,0,0,0.08); }
        .space-card:hover img { transform: scale(1.06); }
        .exp-pill { transition: all 0.2s; cursor: default; }
        .exp-pill:hover { border-color: #141514 !important; color: #141514 !important; }
      `}</style>

      {/* Hero */}
      <div className="grain-overlay" style={{ position: 'relative', height: 480, overflow: 'hidden' }}>
        <img
          src="/images/photos/afterparty-crowd-outdoor.jpg"
          alt="open play"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', filter: 'brightness(0.85) contrast(1.05)' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(20,21,20,0.2) 0%, rgba(20,21,20,0.85) 100%)' }} />

        {/* floating icons */}
        <img src="/images/icons/community-hearts-white.png" alt="" aria-hidden="true"
          style={{ position: 'absolute', left: '6%', bottom: '18%', height: 60, opacity: 0.05, pointerEvents: 'none', animation: 'iconDrift 7s ease-in-out infinite' }} />
        <img src="/images/icons/duo-running-hearts-white.png" alt="" aria-hidden="true"
          style={{ position: 'absolute', right: '8%', top: '25%', height: 48, opacity: 0.04, pointerEvents: 'none', animation: 'iconDrift 9s ease-in-out infinite', animationDelay: '1s' }} />

        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 40px', zIndex: 2 }}>
          <img src="/images/icons/duo-running-hearts-white.png" alt="" aria-hidden="true" style={{ height: 40, opacity: 0.15, marginBottom: 24 }} />
          <h1 style={{ fontSize: 'clamp(48px, 9vw, 88px)', fontWeight: 700, letterSpacing: '-0.03em', color: '#fff', marginBottom: 16, lineHeight: 0.95 }}>open play</h1>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.55)', maxWidth: 520, lineHeight: 1.65 }}>
            move how you want
          </p>
        </div>
      </div>

      {/* Intro section */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '80px 40px 40px', textAlign: 'center' }}>
        <img src="/images/icons/community-hearts-black.png" alt="" aria-hidden="true" style={{ height: 36, opacity: 0.06, marginBottom: 24 }} />
        <p style={{ fontSize: 17, color: '#707070', lineHeight: 1.75, maxWidth: 560, margin: '0 auto 0' }}>
          book a session, drop into a class, or just explore. strength, movement, recovery, community. something for every kind of person.
        </p>
      </section>

      {/* Schedule coming soon */}
      <section style={{ padding: '40px 40px 120px', textAlign: 'center' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, color: '#707070', letterSpacing: '0.14em', textTransform: 'uppercase', padding: '8px 16px', border: '1px solid #EFEFEF', borderRadius: 100, marginBottom: 32 }}>
            booking opens soon
          </span>
          <h2 style={{ fontSize: 'clamp(44px, 7vw, 88px)', fontWeight: 700, lineHeight: 0.95, letterSpacing: '-0.03em', color: '#141514', marginBottom: 24 }}>
            schedule<br />dropping soon.
          </h2>
          <p style={{ fontSize: 16, color: '#707070', lineHeight: 1.7, maxWidth: 480, margin: '0 auto' }}>
            want to book a session? sit tight. full lineup, times, and sign-ups land closer to the event.
          </p>
        </div>
      </section>
    </div>
  );
}
