'use client';

import { useState } from 'react';
import { registerAthlete } from '@/lib/api';
import { CATEGORIES, CATEGORY_LEVELS, TSHIRT_SIZES, SHOE_SIZES_UK } from '@/config/event';
import { AlertCircle, Loader2, Check } from 'lucide-react';

type Step = 'team' | 'details' | 'confirm' | 'done';

interface FormData {
  athlete_name: string; athlete_email: string; athlete_phone: string;
  athlete_instagram: string; team_name: string;
  partner_name: string; partner_email: string; partner_instagram: string;
  competition_category: string;
  tshirt_size: string; shoe_size: string; waiver_signed: boolean;
}

const init: FormData = {
  athlete_name: '', athlete_email: '', athlete_phone: '',
  athlete_instagram: '', team_name: '',
  partner_name: '', partner_email: '', partner_instagram: '',
  competition_category: '',
  tshirt_size: '', shoe_size: '', waiver_signed: false,
};

const STEPS = [
  { id: 'team', label: 'team info' },
  { id: 'details', label: 'details' },
  { id: 'confirm', label: 'confirm' },
];

const inp = {
  width: '100%', padding: '14px 16px', borderRadius: 12,
  backgroundColor: '#EFEFEF', border: '1px solid #eee', color: '#141514',
  fontSize: 14, outline: 'none', fontFamily: 'inherit',
} as React.CSSProperties;

const lbl = {
  display: 'block', fontSize: 11, fontWeight: 700,
  color: '#707070', marginBottom: 8,
} as React.CSSProperties;

export default function RegisterPage() {
  const [step, setStep] = useState<Step>('team');
  const [form, setForm] = useState<FormData>(init);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function set(f: keyof FormData, v: string | boolean) {
    setForm((p) => ({ ...p, [f]: v }));
    setError('');
  }

  function validateTeam() {
    if (!form.athlete_name.trim()) return 'Please enter your name.';
    if (!form.athlete_email.trim() || !form.athlete_email.includes('@')) return 'Please enter a valid email.';
    if (!form.partner_name.trim()) return "Please enter your partner's name.";
    if (!form.partner_email.trim() || !form.partner_email.includes('@')) return "Please enter your partner's email.";
    if (!form.competition_category) return 'Please select a category.';
    return '';
  }

  function validateDetails() {
    if (!form.tshirt_size) return 'Please select a t-shirt size.';
    if (!form.shoe_size) return 'Please select a shoe size.';
    return '';
  }

  function goTo(to: Step, validate: () => string) {
    const err = validate();
    if (err) { setError(err); return; }
    setStep(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function submit() {
    if (!form.waiver_signed) { setError('Please accept the terms and conditions.'); return; }
    setLoading(true); setError('');
    try {
      const res = await registerAthlete({
        athlete_name: form.athlete_name,
        athlete_email: form.athlete_email,
        athlete_phone: form.athlete_phone || undefined,
        team_name: form.team_name || undefined,
        partner_name: form.partner_name || undefined,
        competition_category: form.competition_category,
        tshirt_size: form.tshirt_size,
        emergency_contact_name: 'N/A',
        emergency_contact_phone: 'N/A',
        emergency_contact_relationship: 'N/A',
        waiver_signed: form.waiver_signed,
      });
      if (res.data.checkoutUrl) { window.location.href = res.data.checkoutUrl; }
      else { setStep('done'); }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An error occurred.');
    } finally { setLoading(false); }
  }

  const currentCat = CATEGORIES.find((c) => c.id === form.competition_category);
  const stepIdx = STEPS.findIndex((s) => s.id === step);

  if (step === 'done') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px', backgroundColor: '#fff' }}>
        <div style={{ textAlign: 'center', maxWidth: 440 }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', backgroundColor: '#F78DB9', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <Check size={28} color="#141514" />
          </div>
          <h2 style={{ fontSize: 40, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 12 }}>You're in!</h2>
          <p style={{ color: '#888', marginBottom: 8 }}>Registration successful. You'll receive a confirmation by email.</p>
          <p style={{ fontSize: 14, color: '#555', marginBottom: 36 }}>Want to book some Open Play sessions?</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
            <a href="/open-play/" style={{
              padding: '14px 32px', borderRadius: 100,
              backgroundColor: '#141514', color: '#fff',
              fontWeight: 700, fontSize: 13,
              textDecoration: 'none',
            }}>
              book open play →
            </a>
            <a href="/" style={{ fontSize: 13, color: '#444', textDecoration: 'none', marginTop: 8 }}>
              Back to Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', padding: '100px 24px 80px', backgroundColor: '#fff' }}>
      <div style={{ maxWidth: 520, margin: '0 auto' }}>

        <div style={{ marginBottom: 40 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#707070', marginBottom: 8 }}>the dopamine games 2026</p>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, letterSpacing: '-0.02em' }}>register your team</h1>
        </div>

        {/* Step indicator */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 40 }}>
          {STEPS.map((s, i) => {
            const done = i < stepIdx;
            const active = i === stepIdx;
            return (
              <div key={s.id} style={{ display: 'flex', alignItems: 'center', flex: i < STEPS.length - 1 ? 1 : 'none' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%',
                    backgroundColor: done || active ? '#F78DB9' : 'transparent',
                    border: `2px solid ${done || active ? '#F78DB9' : '#ddd'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, fontWeight: 700,
                    color: done || active ? '#141514' : '#444',
                  }}>
                    {done ? <Check size={13} /> : i + 1}
                  </div>
                  <span style={{ fontSize: 11, marginTop: 6, color: active ? '#F78DB9' : '#333', fontWeight: 600 }}>{s.label}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div style={{ flex: 1, height: 1, backgroundColor: done ? '#F78DB9' : '#eee', margin: '0 12px', marginBottom: 18 }} />
                )}
              </div>
            );
          })}
        </div>

        {/* ── TEAM ── */}
        {step === 'team' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ paddingBottom: 8, borderBottom: '1px solid #1e1e1e', marginBottom: 4 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#707070' }}>you</p>
            </div>
            <div><label style={lbl}>your name *</label><input style={inp} value={form.athlete_name} onChange={(e) => set('athlete_name', e.target.value)} placeholder="Max Mustermann" /></div>
            <div><label style={lbl}>your email *</label><input style={inp} type="email" value={form.athlete_email} onChange={(e) => set('athlete_email', e.target.value)} placeholder="max@example.com" /></div>
            <div><label style={lbl}>instagram (optional)</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#444', fontSize: 14 }}>@</span>
                <input style={{ ...inp, paddingLeft: 32 }} value={form.athlete_instagram} onChange={(e) => set('athlete_instagram', e.target.value)} placeholder="yourhandle" />
              </div>
            </div>
            <div><label style={lbl}>phone (optional)</label><input style={inp} value={form.athlete_phone} onChange={(e) => set('athlete_phone', e.target.value)} placeholder="+49 170 123 4567" /></div>

            <div style={{ paddingBottom: 8, borderBottom: '1px solid #1e1e1e', marginBottom: 4, marginTop: 8 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#707070' }}>your partner</p>
            </div>
            <div><label style={lbl}>partner's name *</label><input style={inp} value={form.partner_name} onChange={(e) => set('partner_name', e.target.value)} placeholder="Lisa Muster" /></div>
            <div><label style={lbl}>partner's email *</label><input style={inp} type="email" value={form.partner_email} onChange={(e) => set('partner_email', e.target.value)} placeholder="lisa@example.com" /></div>
            <div><label style={lbl}>partner's instagram (optional)</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#444', fontSize: 14 }}>@</span>
                <input style={{ ...inp, paddingLeft: 32 }} value={form.partner_instagram} onChange={(e) => set('partner_instagram', e.target.value)} placeholder="partnerhandle" />
              </div>
            </div>

            <div style={{ paddingBottom: 8, borderBottom: '1px solid #1e1e1e', marginBottom: 4, marginTop: 8 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#707070' }}>team</p>
            </div>
            <div><label style={lbl}>team name (optional)</label><input style={inp} value={form.team_name} onChange={(e) => set('team_name', e.target.value)} placeholder="Team Thunder" /></div>

            <div style={{ paddingBottom: 8, borderBottom: '1px solid #1e1e1e', marginBottom: 4, marginTop: 16 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#707070' }}>category</p>
            </div>

            {/* Level explanation */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {Object.values(CATEGORY_LEVELS).map((lvl) => (
                <div key={lvl.id} style={{ padding: '16px', borderRadius: 12, backgroundColor: '#EFEFEF', border: '1px solid #eee' }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#141514', marginBottom: 6 }}>{lvl.label}</p>
                  <p style={{ fontSize: 12, color: '#888', lineHeight: 1.5 }}>{lvl.description}</p>
                </div>
              ))}
            </div>

            {/* Category grid: FF / MM / MF rows, Core | Elite columns */}
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr', gap: 8, alignItems: 'center' }}>
                <div />
                <div style={{ fontSize: 11, fontWeight: 700, color: '#aaa', textAlign: 'center', paddingBottom: 4 }}>core</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#aaa', textAlign: 'center', paddingBottom: 4 }}>elite</div>

                {(['FF', 'MM', 'MF'] as const).map((gender) => {
                  const genderLabel: Record<string, string> = { FF: 'Women', MM: 'Men', MF: 'Mixed' };
                  const coreCat = CATEGORIES.find((c) => c.gender === gender && c.level === 'core')!;
                  const eliteCat = CATEGORIES.find((c) => c.gender === gender && c.level === 'elite')!;
                  return [
                    <div key={`label-${gender}`} style={{ fontSize: 12, fontWeight: 700, color: '#555' }}>{genderLabel[gender]}</div>,
                    ...[coreCat, eliteCat].map((cat) => {
                      const sel = form.competition_category === cat.id;
                      return (
                        <button key={cat.id} onClick={() => set('competition_category', cat.id)} style={{
                          padding: '14px 10px', borderRadius: 12, textAlign: 'center', cursor: 'pointer', fontFamily: 'inherit',
                          backgroundColor: sel ? 'rgba(247,141,185,0.08)' : '#EFEFEF',
                          border: `2px solid ${sel ? '#F78DB9' : '#eee'}`,
                          transition: 'all 0.15s',
                        }}>
                          <div style={{ fontSize: 13, fontWeight: 700, color: sel ? '#F78DB9' : '#141514' }}>{cat.gender}</div>
                          <div style={{ fontSize: 11, color: sel ? '#F78DB9' : '#aaa', marginTop: 2 }}>{cat.level === 'core' ? 'core' : 'elite'}</div>
                        </button>
                      );
                    }),
                  ];
                })}
              </div>
            </div>
            {error && <Err msg={error} />}
            <button onClick={() => goTo('details', validateTeam)} style={{
              padding: '16px', borderRadius: 100, backgroundColor: '#141514', color: '#fff',
              fontWeight: 700, fontSize: 13, border: 'none', cursor: 'pointer',
            }}>
              continue →
            </button>
          </div>
        )}

        {/* ── DETAILS ── */}
        {step === 'details' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <label style={lbl}>t-shirt size *</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {TSHIRT_SIZES.map((size) => {
                  const sel = form.tshirt_size === size;
                  return (
                    <button key={size} onClick={() => set('tshirt_size', size)} style={{
                      width: 56, height: 48, borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: 'pointer',
                      fontFamily: 'inherit',
                      backgroundColor: sel ? '#F78DB9' : '#111',
                      border: `1px solid ${sel ? '#F78DB9' : '#2a2a2a'}`,
                      color: sel ? '#141514' : '#aaa',
                    }}>
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <label style={lbl}>shoe size (UK) *</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {SHOE_SIZES_UK.map((size) => {
                  const sel = form.shoe_size === size;
                  return (
                    <button key={size} onClick={() => set('shoe_size', size)} style={{
                      minWidth: 52, height: 44, padding: '0 10px', borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: 'pointer',
                      fontFamily: 'inherit',
                      backgroundColor: sel ? '#F78DB9' : '#111',
                      border: `1px solid ${sel ? '#F78DB9' : '#2a2a2a'}`,
                      color: sel ? '#141514' : '#aaa',
                    }}>
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
            {error && <Err msg={error} />}
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setStep('team')} style={{
                padding: '16px 24px', borderRadius: 100, border: '1px solid #eee',
                backgroundColor: 'transparent', color: '#888', fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit',
              }}>← Back</button>
              <button onClick={() => goTo('confirm', validateDetails)} style={{
                flex: 1, padding: '16px', borderRadius: 100, backgroundColor: '#141514', color: '#fff',
                fontWeight: 700, fontSize: 13, border: 'none', cursor: 'pointer', fontFamily: 'inherit',
              }}>continue →</button>
            </div>
          </div>
        )}

        {/* ── CONFIRM ── */}
        {step === 'confirm' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ backgroundColor: '#EFEFEF', border: '1px solid #eee', borderRadius: 16, padding: 24 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#707070', marginBottom: 20 }}>summary</p>
              {[
                { l: 'Athlete', v: form.athlete_name },
                { l: 'Your Email', v: form.athlete_email },
                { l: 'Your Instagram', v: form.athlete_instagram ? `@${form.athlete_instagram}` : '—' },
                { l: 'Partner', v: form.partner_name },
                { l: "Partner's Email", v: form.partner_email },
                { l: "Partner's Instagram", v: form.partner_instagram ? `@${form.partner_instagram}` : '—' },
                { l: 'Team', v: form.team_name || '—' },
                { l: 'Category', v: currentCat?.label ?? '—' },
                { l: 'T-Shirt', v: form.tshirt_size },
                { l: 'Shoe Size (UK)', v: form.shoe_size },
              ].map(({ l, v }) => (
                <div key={l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 12 }}>
                  <span style={{ color: '#444' }}>{l}</span>
                  <span style={{ color: '#fff', fontWeight: 600 }}>{v}</span>
                </div>
              ))}
            </div>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer' }}>
              <input type="checkbox" checked={form.waiver_signed} onChange={(e) => set('waiver_signed', e.target.checked)}
                style={{ marginTop: 2, width: 16, height: 16, accentColor: '#F78DB9', flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: '#888', lineHeight: 1.6 }}>
                I accept the terms and conditions and confirm all information is accurate. I participate at my own risk.
              </span>
            </label>
            {error && <Err msg={error} />}
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setStep('details')} style={{
                padding: '16px 24px', borderRadius: 100, border: '1px solid #eee',
                backgroundColor: 'transparent', color: '#888', fontWeight: 700, fontSize: 13, cursor: 'pointer',
              }}>← Back</button>
              <button onClick={submit} disabled={loading} style={{
                flex: 1, padding: '16px', borderRadius: 100, backgroundColor: '#141514', color: '#fff',
                fontWeight: 700, fontSize: 13, border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}>
                {loading ? <><Loader2 size={16} className="animate-spin" /> Sending...</> : 'register & pay →'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Err({ msg }: { msg: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', borderRadius: 10, backgroundColor: 'rgba(239,68,68,0.07)', color: '#f87171', fontSize: 13 }}>
      <AlertCircle size={15} /> {msg}
    </div>
  );
}
