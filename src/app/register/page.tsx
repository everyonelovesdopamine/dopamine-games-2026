'use client';

import { useEffect } from 'react';
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
  athlete_top_size: string; athlete_bottom_size: string; athlete_shoe_size: string;
  partner_top_size: string; partner_bottom_size: string; partner_shoe_size: string;
  liability_waiver: boolean; content_waiver: boolean;
}

const init: FormData = {
  athlete_name: '', athlete_email: '', athlete_phone: '',
  athlete_instagram: '', team_name: '',
  partner_name: '', partner_email: '', partner_instagram: '',
  competition_category: '',
  athlete_top_size: '', athlete_bottom_size: '', athlete_shoe_size: '',
  partner_top_size: '', partner_bottom_size: '', partner_shoe_size: '',
  liability_waiver: false, content_waiver: false,
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
  useEffect(() => {
    window.location.href = 'https://team-aretas.com/competitions/3444';
  }, []);

  const [step, setStep] = useState<Step>('team');
  const [form, setForm] = useState<FormData>(init);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function set(f: keyof FormData, v: string | boolean) {
    setForm((p) => ({ ...p, [f]: v }));
    setError('');
  }

  function validateTeam() {
    if (!form.athlete_name.trim()) return 'we need your name.';
    if (!form.athlete_email.trim() || !form.athlete_email.includes('@')) return 'drop a valid email.';
    if (!form.athlete_instagram.trim()) return 'add your instagram handle.';
    if (!form.partner_name.trim()) return "we need your partner's name.";
    if (!form.partner_email.trim() || !form.partner_email.includes('@')) return "we need your partner's email too.";
    if (!form.partner_instagram.trim()) return "add your partner's instagram handle.";
    if (!form.competition_category) return 'pick a category.';
    return '';
  }

  function validateDetails() {
    if (!form.athlete_top_size) return 'pick your top size.';
    if (!form.athlete_bottom_size) return 'pick your bottom size.';
    if (!form.athlete_shoe_size) return 'pick your shoe size.';
    if (!form.partner_top_size) return "pick your partner's top size.";
    if (!form.partner_bottom_size) return "pick your partner's bottom size.";
    if (!form.partner_shoe_size) return "pick your partner's shoe size.";
    return '';
  }

  function goTo(to: Step, validate: () => string) {
    const err = validate();
    if (err) { setError(err); return; }
    setStep(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function submit() {
    if (!form.liability_waiver) { setError('tick the liability waiver to continue.'); return; }
    if (!form.content_waiver) { setError('tick the content release to continue.'); return; }
    setLoading(true); setError('');
    try {
      const res = await registerAthlete({
        athlete_name: form.athlete_name,
        athlete_email: form.athlete_email,
        athlete_phone: form.athlete_phone || undefined,
        team_name: form.team_name || undefined,
        partner_name: form.partner_name || undefined,
        competition_category: form.competition_category,
        tshirt_size: form.athlete_top_size,
        emergency_contact_name: 'N/A',
        emergency_contact_phone: 'N/A',
        emergency_contact_relationship: 'N/A',
        waiver_signed: form.liability_waiver && form.content_waiver,
      });
      if (res.data.checkoutUrl) { window.location.href = res.data.checkoutUrl; }
      else { setStep('done'); }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'something went wrong. try again.');
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
          <h2 style={{ fontSize: 40, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 12 }}>you're in.</h2>
          <p style={{ color: '#888', marginBottom: 8 }}>you and your partner are locked in. confirmation hitting your inbox.</p>
          <p style={{ fontSize: 14, color: '#555', marginBottom: 36 }}>want to drop in on open play too?</p>
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
              back home
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
            <div><label style={lbl}>instagram *</label>
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
            <div><label style={lbl}>partner's instagram *</label>
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
                  const genderLabel: Record<string, string> = { FF: 'women', MM: 'men', MF: 'mixed' };
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <p style={{ fontSize: 13, color: '#707070', lineHeight: 1.6, margin: 0 }}>
              kit sizing for both of you. top, bottom, shoes.
            </p>

            {(['athlete', 'partner'] as const).map((who) => {
              const isAthlete = who === 'athlete';
              const heading = isAthlete ? (form.athlete_name || 'you').toLowerCase() : (form.partner_name || 'your partner').toLowerCase();
              const topKey = isAthlete ? 'athlete_top_size' : 'partner_top_size';
              const bottomKey = isAthlete ? 'athlete_bottom_size' : 'partner_bottom_size';
              const shoeKey = isAthlete ? 'athlete_shoe_size' : 'partner_shoe_size';
              return (
                <div key={who} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  <div style={{ paddingBottom: 8, borderBottom: '1px solid #1e1e1e' }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: '#707070', textTransform: 'lowercase' }}>{heading}</p>
                  </div>
                  <div>
                    <label style={lbl}>top size *</label>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {TSHIRT_SIZES.map((size) => {
                        const sel = form[topKey] === size;
                        return (
                          <button key={size} onClick={() => set(topKey, size)} style={{
                            width: 56, height: 48, borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: 'pointer',
                            fontFamily: 'inherit',
                            backgroundColor: sel ? '#F78DB9' : '#EFEFEF',
                            border: `1px solid ${sel ? '#F78DB9' : '#eee'}`,
                            color: sel ? '#141514' : '#707070',
                          }}>{size}</button>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <label style={lbl}>bottom size *</label>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {TSHIRT_SIZES.map((size) => {
                        const sel = form[bottomKey] === size;
                        return (
                          <button key={size} onClick={() => set(bottomKey, size)} style={{
                            width: 56, height: 48, borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: 'pointer',
                            fontFamily: 'inherit',
                            backgroundColor: sel ? '#F78DB9' : '#EFEFEF',
                            border: `1px solid ${sel ? '#F78DB9' : '#eee'}`,
                            color: sel ? '#141514' : '#707070',
                          }}>{size}</button>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <label style={lbl}>shoe size (UK) *</label>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {SHOE_SIZES_UK.map((size) => {
                        const sel = form[shoeKey] === size;
                        return (
                          <button key={size} onClick={() => set(shoeKey, size)} style={{
                            minWidth: 52, height: 44, padding: '0 10px', borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: 'pointer',
                            fontFamily: 'inherit',
                            backgroundColor: sel ? '#F78DB9' : '#EFEFEF',
                            border: `1px solid ${sel ? '#F78DB9' : '#eee'}`,
                            color: sel ? '#141514' : '#707070',
                          }}>{size}</button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}

            {error && <Err msg={error} />}
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setStep('team')} style={{
                padding: '16px 24px', borderRadius: 100, border: '1px solid #eee',
                backgroundColor: 'transparent', color: '#888', fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit',
              }}>← back</button>
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
              <p style={{ fontSize: 11, fontWeight: 700, color: '#707070', marginBottom: 20, textTransform: 'uppercase', letterSpacing: '0.08em' }}>summary</p>

              {(() => {
                const dash = '-';
                const groups: { heading: string; rows: { l: string; v: string }[] }[] = [
                  {
                    heading: 'team',
                    rows: [
                      { l: 'team name', v: form.team_name || dash },
                      { l: 'category', v: currentCat?.label ?? dash },
                    ],
                  },
                  {
                    heading: form.athlete_name || 'you',
                    rows: [
                      { l: 'email', v: form.athlete_email },
                      { l: 'instagram', v: form.athlete_instagram ? `@${form.athlete_instagram}` : dash },
                      { l: 'phone', v: form.athlete_phone || dash },
                      { l: 'top', v: form.athlete_top_size },
                      { l: 'bottom', v: form.athlete_bottom_size },
                      { l: 'shoe (uk)', v: form.athlete_shoe_size },
                    ],
                  },
                  {
                    heading: form.partner_name || 'partner',
                    rows: [
                      { l: 'email', v: form.partner_email },
                      { l: 'instagram', v: form.partner_instagram ? `@${form.partner_instagram}` : dash },
                      { l: 'top', v: form.partner_top_size },
                      { l: 'bottom', v: form.partner_bottom_size },
                      { l: 'shoe (uk)', v: form.partner_shoe_size },
                    ],
                  },
                ];
                return groups.map((g, gi) => (
                  <div key={g.heading} style={{ marginTop: gi === 0 ? 0 : 20 }}>
                    <p style={{ fontSize: 10, fontWeight: 700, color: '#707070', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{g.heading}</p>
                    {g.rows.map(({ l, v }) => (
                      <div key={l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 8, gap: 16 }}>
                        <span style={{ color: '#707070' }}>{l}</span>
                        <span style={{ color: '#141514', fontWeight: 600, textAlign: 'right' }}>{v}</span>
                      </div>
                    ))}
                  </div>
                ));
              })()}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer' }}>
                <input type="checkbox" checked={form.liability_waiver} onChange={(e) => set('liability_waiver', e.target.checked)}
                  style={{ marginTop: 2, width: 16, height: 16, accentColor: '#F78DB9', flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: '#888', lineHeight: 1.6 }}>
                  <strong style={{ color: '#141514', fontWeight: 700 }}>liability waiver *</strong><br />
                  i'm fit to compete and i know fitness comes with physical risk, injury included. everything i've entered is accurate. i show up at my own risk and release the dopamine games, its organisers, staff, sponsors, and venue from any liability for injury, loss, or damage tied to my participation.
                </span>
              </label>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer' }}>
                <input type="checkbox" checked={form.content_waiver} onChange={(e) => set('content_waiver', e.target.checked)}
                  style={{ marginTop: 2, width: 16, height: 16, accentColor: '#F78DB9', flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: '#888', lineHeight: 1.6 }}>
                  <strong style={{ color: '#141514', fontWeight: 700 }}>content release *</strong><br />
                  i'm happy to be photographed, filmed, and recorded at the event. the dopamine games can use my name, likeness, and image across marketing, social, and editorial. no compensation expected.
                </span>
              </label>
            </div>
            {error && <Err msg={error} />}
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setStep('details')} style={{
                padding: '16px 24px', borderRadius: 100, border: '1px solid #eee',
                backgroundColor: 'transparent', color: '#888', fontWeight: 700, fontSize: 13, cursor: 'pointer',
              }}>← back</button>
              <button onClick={submit} disabled={loading} style={{
                flex: 1, padding: '16px', borderRadius: 100, backgroundColor: '#141514', color: '#fff',
                fontWeight: 700, fontSize: 13, border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}>
                {loading ? <><Loader2 size={16} className="animate-spin" /> sending...</> : 'register'}
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
