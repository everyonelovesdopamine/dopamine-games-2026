'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth';

type Mode = 'signup' | 'signin' | 'verify';

export default function AuthModal({
  open,
  onClose,
  initialMode = 'signup',
  reason,
}: {
  open: boolean;
  onClose: () => void;
  initialMode?: 'signup' | 'signin';
  reason?: string;
}) {
  const { user, pendingCode, signUp, signIn, verifyCode, resendCode } = useAuth();
  const [mode, setMode] = useState<Mode>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [instagram, setInstagram] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [demoCode, setDemoCode] = useState<string | null>(null);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    setError(null);
    setCode('');
    if (user && !user.emailVerified) {
      setMode('verify');
      setDemoCode(pendingCode);
      return;
    }
    setMode(initialMode);
  }, [open, initialMode, user, pendingCode]);

  if (!open) return null;

  const submitSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim()) return setError('what should we call you?');
    if (!email.trim() || !email.includes('@')) return setError('a valid email please');
    if (!termsAgreed) return setError('please agree to the photo & recording terms to continue.');
    setSubmitting(true);
    try {
      const { codeForDemo } = await signUp({ name, email, instagram: instagram.replace(/^@/, '').trim() || undefined });
      setDemoCode(codeForDemo || null);
      setMode('verify');
      setName(''); setInstagram('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'something went wrong');
    } finally { setSubmitting(false); }
  };

  const submitSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.trim() || !email.includes('@')) return setError('a valid email please');
    setSubmitting(true);
    try {
      const result = await signIn(email);
      if ('verified' in result) {
        onClose();
        setEmail('');
      } else {
        setDemoCode(result.codeForDemo);
        setMode('verify');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'something went wrong');
    } finally { setSubmitting(false); }
  };

  const submitVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (code.trim().length !== 6) return setError('enter the 6-digit code');
    setSubmitting(true);
    try {
      await verifyCode(code);
      onClose();
      setCode('');
      setEmail('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'something went wrong');
    } finally { setSubmitting(false); }
  };

  const handleResend = async () => {
    setError(null);
    try {
      const { codeForDemo } = await resendCode();
      setDemoCode(codeForDemo);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'something went wrong');
    }
  };

  const overlay: React.CSSProperties = {
    position: 'fixed', inset: 0, background: 'rgba(20,21,20,0.6)', backdropFilter: 'blur(8px)',
    zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: 24, animation: 'overlayIn 0.2s ease',
  };

  const card: React.CSSProperties = {
    background: '#fff', borderRadius: 24, padding: '40px 32px 32px',
    width: '100%', maxWidth: 440, position: 'relative',
    boxShadow: '0 40px 120px rgba(0,0,0,0.3)',
    animation: 'modalIn 0.3s ease',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: 11, fontWeight: 700, color: '#707070',
    letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8,
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '14px 16px', fontSize: 15, fontFamily: 'inherit',
    border: '1.5px solid #E4E4E4', borderRadius: 12, background: '#fff', color: '#141514',
    outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s',
  };

  const btnPrimary: React.CSSProperties = {
    width: '100%', padding: '14px 20px', fontSize: 14, fontWeight: 700,
    background: '#141514', color: '#fff', border: 'none', borderRadius: 100,
    cursor: submitting ? 'wait' : 'pointer', fontFamily: 'inherit', letterSpacing: '-0.005em',
    opacity: submitting ? 0.7 : 1, transition: 'transform 0.2s ease, opacity 0.2s',
  };

  return (
    <div onClick={onClose} style={overlay}>
      <div onClick={(e) => e.stopPropagation()} style={card}>
        <button onClick={onClose} aria-label="close"
          style={{
            position: 'absolute', top: 16, right: 16, width: 32, height: 32, borderRadius: '50%',
            border: 'none', background: '#F5F5F5', cursor: 'pointer', fontSize: 16,
            color: '#707070', fontFamily: 'inherit',
          }}>
          ×
        </button>

        {mode !== 'verify' && (
          <>
            <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', color: '#141514', margin: '0 0 8px' }}>
              {mode === 'signup' ? 'create your account' : 'welcome back'}
            </h2>
            <p style={{ fontSize: 14, color: '#707070', lineHeight: 1.5, margin: '0 0 24px' }}>
              {reason
                ? reason
                : mode === 'signup'
                  ? 'sign up once to book classes and track your schedule.'
                  : 'sign in to access your bookings.'}
            </p>
          </>
        )}

        {mode === 'signup' && (
          <form onSubmit={submitSignUp} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={labelStyle}>name</label>
              <input style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} placeholder="your name" autoFocus />
            </div>
            <div>
              <label style={labelStyle}>email</label>
              <input style={inputStyle} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
            </div>
            <div>
              <label style={labelStyle}>instagram <span style={{ textTransform: 'none', letterSpacing: 0, fontWeight: 500, color: '#A0A0A0' }}>(optional)</span></label>
              <input style={inputStyle} value={instagram} onChange={(e) => setInstagram(e.target.value)} placeholder="@yourhandle" />
            </div>

            {/* photo & recording terms */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 8, cursor: 'pointer', fontSize: 12, color: '#141514', lineHeight: 1.45 }}>
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
                    style={{ background: 'none', border: 'none', color: '#141514', textDecoration: 'underline', cursor: 'pointer', fontSize: 12, padding: 0, fontFamily: 'inherit', fontWeight: 600 }}
                  >
                    photo & recording terms
                  </button>
                </span>
              </label>
              {termsOpen && (
                <div style={{ fontSize: 11.5, color: '#707070', lineHeight: 1.55, background: '#FAFAFA', padding: '12px 14px', borderRadius: 8, maxHeight: 220, overflowY: 'auto' }}>
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

            {error && <div style={{ fontSize: 13, color: '#D85F93', fontWeight: 600 }}>{error}</div>}
            <button type="submit" disabled={submitting} style={btnPrimary}>
              {submitting ? 'creating account…' : 'create account'}
            </button>
            <p style={{ fontSize: 13, color: '#707070', textAlign: 'center', margin: 0 }}>
              already have one?{' '}
              <button type="button" onClick={() => { setMode('signin'); setError(null); }}
                style={{ background: 'none', border: 'none', padding: 0, color: '#141514', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline', fontFamily: 'inherit', fontSize: 13 }}>
                sign in
              </button>
            </p>
          </form>
        )}

        {mode === 'signin' && (
          <form onSubmit={submitSignIn} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={labelStyle}>email</label>
              <input style={inputStyle} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoFocus />
            </div>
            {error && <div style={{ fontSize: 13, color: '#D85F93', fontWeight: 600 }}>{error}</div>}
            <button type="submit" disabled={submitting} style={btnPrimary}>
              {submitting ? 'signing in…' : 'sign in'}
            </button>
            <p style={{ fontSize: 13, color: '#707070', textAlign: 'center', margin: 0 }}>
              new here?{' '}
              <button type="button" onClick={() => { setMode('signup'); setError(null); }}
                style={{ background: 'none', border: 'none', padding: 0, color: '#141514', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline', fontFamily: 'inherit', fontSize: 13 }}>
                create an account
              </button>
            </p>
          </form>
        )}

        {mode === 'verify' && (
          <form onSubmit={submitVerify} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ textAlign: 'center', marginBottom: 4 }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: 'linear-gradient(135deg, #F78DB9 0%, #185BC5 100%)',
                margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 24,
              }}>
                <span style={{ filter: 'brightness(0) invert(1)' }}>✉</span>
              </div>
              <h2 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', color: '#141514', margin: '0 0 8px' }}>
                confirm your email
              </h2>
              <p style={{ fontSize: 14, color: '#707070', lineHeight: 1.5, margin: 0 }}>
                we sent a 6-digit code to{' '}
                <span style={{ color: '#141514', fontWeight: 600 }}>{user?.email}</span>.
              </p>
            </div>

            {demoCode && (
              <div style={{
                background: 'linear-gradient(90deg, rgba(247,141,185,0.12) 0%, rgba(24,91,197,0.10) 100%)',
                border: '1px dashed rgba(20,21,20,0.18)', borderRadius: 12, padding: '12px 14px',
                fontSize: 12, color: '#141514', textAlign: 'center', lineHeight: 1.5,
              }}>
                <div style={{ fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: 10, color: '#707070', marginBottom: 4 }}>
                  demo mode — your code
                </div>
                <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '0.3em', fontVariantNumeric: 'tabular-nums' }}>
                  {demoCode}
                </div>
                <div style={{ fontSize: 11, color: '#707070', marginTop: 4 }}>
                  in production this is sent via email
                </div>
              </div>
            )}

            <div>
              <label style={labelStyle}>verification code</label>
              <input
                style={{ ...inputStyle, fontSize: 22, letterSpacing: '0.3em', textAlign: 'center', fontVariantNumeric: 'tabular-nums' }}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="000000"
                inputMode="numeric"
                autoFocus
                maxLength={6}
              />
            </div>

            {error && <div style={{ fontSize: 13, color: '#D85F93', fontWeight: 600 }}>{error}</div>}

            <button type="submit" disabled={submitting} style={btnPrimary}>
              {submitting ? 'verifying…' : 'confirm email'}
            </button>

            <p style={{ fontSize: 13, color: '#707070', textAlign: 'center', margin: 0 }}>
              didn&apos;t get it?{' '}
              <button type="button" onClick={handleResend}
                style={{ background: 'none', border: 'none', padding: 0, color: '#141514', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline', fontFamily: 'inherit', fontSize: 13 }}>
                resend code
              </button>
            </p>
          </form>
        )}

        <style>{`
          @keyframes modalIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes overlayIn { from { opacity: 0; } to { opacity: 1; } }
          input:focus { border-color: #141514 !important; }
        `}</style>
      </div>
    </div>
  );
}
