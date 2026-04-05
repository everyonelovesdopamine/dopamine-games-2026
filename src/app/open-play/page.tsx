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
            when the competition ends, the day keeps going. four spaces. sixteen sessions. move how you want.
          </p>
        </div>
      </div>

      {/* Intro section */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '80px 40px 40px', textAlign: 'center' }}>
        <img src="/images/icons/community-hearts-black.png" alt="" aria-hidden="true" style={{ height: 36, opacity: 0.06, marginBottom: 24 }} />
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, lineHeight: 1.05, marginBottom: 20 }}>
          you don't have to compete<br />to belong here.
        </h2>
        <p style={{ fontSize: 17, color: '#707070', lineHeight: 1.75, maxWidth: 560, margin: '0 auto 40px' }}>
          from 3 pm to 9 pm, the Adidas Sports Base opens up for bookable sessions — strength, movement, recovery, and community. pick what calls you.
        </p>

        {/* experience pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 24 }}>
          {['barbell foundations', 'kettlebell flow', 'olympic lifting', 'hip hop dance', 'animal flow', 'handstand lab', 'breathwork', 'sound bath', 'parkour', 'jump rope hiit', 'calisthenics', 'mobility & stretch', 'community trivia', 'dj open floor'].map((s) => (
            <span key={s} className="exp-pill" style={{ fontSize: 13, fontWeight: 500, padding: '8px 18px', borderRadius: 100, border: '1px solid #EFEFEF', color: '#707070' }}>{s}</span>
          ))}
        </div>
      </section>

      {/* Four spaces — editorial grid */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 40px 100px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {[
            {
              name: 'strength gym',
              tagline: 'load up. move well. get strong.',
              description: 'barbells, kettlebells, and competition-style partner workouts. coached reps, real feedback, zero ego. from foundations to olympic lifting — there is a session for every level.',
              img: '/images/photos/athlete-barbell-grip-smiling.jpg',
              imgPos: 'center 30%',
              icon: '/images/icons/community-hearts-black.png',
              sessions: ['barbell foundations', 'kettlebell flow', 'olympic lifting clinic', 'partner strength challenge'],
            },
            {
              name: 'movement gym',
              tagline: 'explore what your body can do.',
              description: 'dance, animal flow, handstands, and deep stretching. these sessions build body awareness, coordination, and the kind of movement quality that carries over to everything else.',
              img: '/images/photos/duo-deadlift-outdoor-turf.jpg',
              imgPos: 'center 40%',
              icon: '/images/icons/duo-running-hearts-black.png',
              sessions: ['hip hop dance', 'animal flow', 'handstand lab', 'mobility & deep stretch'],
            },
            {
              name: 'clubhouse',
              tagline: 'where the community lives.',
              description: 'breathwork, sound baths, trivia, and the dj open floor. this is where you recover, connect, and warm up for the afterparty. no equipment needed — just show up.',
              img: '/images/photos/dj-afterparty-crowd-dancing.jpg',
              imgPos: 'center 50%',
              icon: '/images/icons/community-hearts-black.png',
              sessions: ['breathwork session', 'community trivia', 'sound bath', 'dj open floor'],
            },
            {
              name: 'playground',
              tagline: 'move fast. play hard. have fun.',
              description: 'parkour, jump rope hiit, calisthenics, and agility circuits. high energy, skill-based, and surprisingly competitive. the sessions that make you feel like a kid again.',
              img: '/images/photos/women-sprinting-close-up.jpg',
              imgPos: 'center 35%',
              icon: '/images/icons/runners-speed-black.png',
              sessions: ['parkour intro', 'jump rope hiit', 'calisthenics basics', 'agility circuit'],
            },
          ].map((space) => (
            <div key={space.name} className="space-card" style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid #EFEFEF', backgroundColor: '#fff' }}>
              {/* image */}
              <div style={{ aspectRatio: '16/9', overflow: 'hidden', position: 'relative' }} className="grain-overlay">
                <img src={space.img} alt={space.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: space.imgPos, display: 'block', transition: 'transform 0.6s ease' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(20,21,20,0.6) 100%)' }} />
                {/* icon watermark */}
                <img src={space.icon} alt="" aria-hidden="true" style={{ position: 'absolute', right: 16, top: 16, height: 32, opacity: 0.06, filter: 'invert(1)', pointerEvents: 'none' }} />
                {/* space name on image */}
                <div style={{ position: 'absolute', bottom: 20, left: 24, zIndex: 2 }}>
                  <h3 style={{ fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{space.name}</h3>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>{space.tagline}</p>
                </div>
              </div>
              {/* content */}
              <div style={{ padding: '24px 28px 28px' }}>
                <p style={{ fontSize: 14, color: '#707070', lineHeight: 1.7, marginBottom: 20 }}>{space.description}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {space.sessions.map((s) => (
                    <div key={s} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F5F5F5' }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#141514' }}>{s}</span>
                      <span style={{ fontSize: 11, color: '#D0D0D0' }}>90 min</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Schedule CTA */}
      <section style={{ backgroundColor: '#141514', padding: '80px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/icons/hearts-pattern-black.png)', backgroundSize: '140px', backgroundRepeat: 'repeat', opacity: 0.015, filter: 'invert(1)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 600, margin: '0 auto' }}>
          <img src="/images/icons/community-hearts-white.png" alt="" aria-hidden="true" style={{ height: 44, opacity: 0.1, marginBottom: 28 }} />
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: '#fff', marginBottom: 16, lineHeight: 1.05 }}>
            full schedule drops soon.
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, marginBottom: 36 }}>
            exact times, coaches, and booking will open closer to the event. register for the games to get early access.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <a href="/register/" style={{ padding: '16px 36px', borderRadius: 100, backgroundColor: '#fff', color: '#141514', fontWeight: 700, fontSize: 14, transition: 'opacity 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              register your team
            </a>
          </div>
        </div>
      </section>

      {/* Info bar */}
      <section style={{ borderTop: '1px solid #EFEFEF', padding: '48px 40px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, textAlign: 'center' }}>
          {[
            { label: 'when', value: 'June 6, 3 – 9 pm' },
            { label: 'where', value: 'Adidas Sports Base Berlin' },
            { label: 'price', value: 'included with games ticket' },
          ].map((item) => (
            <div key={item.label}>
              <p style={{ fontSize: 11, fontWeight: 600, color: '#D0D0D0', marginBottom: 6, letterSpacing: '0.06em' }}>{item.label}</p>
              <p style={{ fontSize: 15, fontWeight: 700, color: '#141514' }}>{item.value}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
