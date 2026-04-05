'use client';

export default function LeaderboardPage() {
  return (
    <div style={{ backgroundColor: '#ffffff', color: '#141514', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ textAlign: 'center', maxWidth: 600 }}>
        <h1 style={{ fontFamily: "'Ease SemiDisplay', sans-serif", fontSize: 48, fontWeight: 700, marginBottom: 16, color: '#141514' }}>
          leaderboard
        </h1>
        <p style={{ fontSize: 18, color: '#707070', marginBottom: 32, lineHeight: 1.6 }}>
          The live leaderboard will be available during the event.
        </p>
        <a
          href="/"
          style={{
            display: 'inline-block',
            padding: '12px 32px',
            backgroundColor: '#185bc5',
            color: '#ffffff',
            textDecoration: 'none',
            fontSize: 14,
            fontWeight: 600,
            borderRadius: 6,
          }}
        >
          back home
        </a>
      </div>
    </div>
  );
}
