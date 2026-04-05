'use client';

export default function OpenPlayPage() {
  return (
    <div style={{ backgroundColor: '#ffffff', color: '#141514', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ textAlign: 'center', maxWidth: 600 }}>
        <h1 style={{ fontFamily: "'Ease SemiDisplay', sans-serif", fontSize: 48, fontWeight: 700, marginBottom: 16, color: '#141514' }}>
          open play
        </h1>
        <p style={{ fontSize: 18, color: '#707070', marginBottom: 32, lineHeight: 1.6 }}>
          Book your open play slot and experience everything the dopamine games has to offer.
        </p>
        <a
          href="/"
          style={{
            display: 'inline-block',
            padding: '12px 32px',
            backgroundColor: '#f78db9',
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
