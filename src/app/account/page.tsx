'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth';
import AuthModal from '@/components/AuthModal';

export default function AccountPage() {
  const { user, bookings, waitlist, notifications, loading, signOut, removeBooking, leaveWaitlist, markNotificationRead, pendingCode } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [confirmRemoveId, setConfirmRemoveId] = useState<string | null>(null);
  const [confirmWaitlistId, setConfirmWaitlistId] = useState<string | null>(null);
  const [promotionToast, setPromotionToast] = useState<{ name: string; title: string } | null>(null);
  const [openEmailId, setOpenEmailId] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) setAuthOpen(true);
  }, [loading, user]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 64 }}>
        <span style={{ fontSize: 13, color: '#707070' }}>loading…</span>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <div style={{ minHeight: '100vh', paddingTop: 64, background: '#fff' }}>
          <section style={{ maxWidth: 560, margin: '0 auto', padding: '120px 24px', textAlign: 'center' }}>
            <h1 style={{ fontSize: 'clamp(40px, 6vw, 56px)', fontWeight: 700, letterSpacing: '-0.03em', color: '#141514', margin: '0 0 16px', lineHeight: 1 }}>
              your account
            </h1>
            <p style={{ fontSize: 16, color: '#707070', lineHeight: 1.6, margin: '0 0 32px' }}>
              sign in to view your booked experiences and manage your schedule.
            </p>
            <button onClick={() => setAuthOpen(true)} style={{
              padding: '14px 32px', fontSize: 14, fontWeight: 700,
              background: '#141514', color: '#fff', border: 'none', borderRadius: 100,
              cursor: 'pointer', fontFamily: 'inherit',
            }}>
              sign in / sign up
            </button>
          </section>
        </div>
        <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} initialMode="signin" />
      </>
    );
  }

  const sortedBookings = [...bookings].sort((a, b) => a.time.localeCompare(b.time));
  const sortedWaitlist = [...waitlist].sort((a, b) => a.time.localeCompare(b.time));

  return (
    <div style={{ minHeight: '100vh', paddingTop: 64, background: '#fff' }}>
      <section style={{ maxWidth: 880, margin: '0 auto', padding: '80px 24px 120px' }}>

        {/* header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 12 }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: user.emailVerified
              ? 'linear-gradient(135deg, #F78DB9 0%, #185BC5 100%)'
              : '#E4E4E4',
            color: user.emailVerified ? '#fff' : '#707070',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 24, fontWeight: 700, flexShrink: 0,
          }}>
            {user.name[0].toUpperCase()}
          </div>
          <div>
            <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, letterSpacing: '-0.02em', color: '#141514', margin: '0 0 4px', lineHeight: 1 }}>
              {user.name.toLowerCase()}
            </h1>
            <p style={{ fontSize: 14, color: '#707070', margin: 0 }}>{user.email}</p>
          </div>
        </div>

        {/* not verified banner */}
        {!user.emailVerified && (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
            padding: '14px 18px',
            background: 'linear-gradient(90deg, rgba(216,95,147,0.10) 0%, rgba(247,141,185,0.10) 100%)',
            border: '1px solid rgba(216,95,147,0.25)',
            borderRadius: 14, marginTop: 24, flexWrap: 'wrap',
          }}>
            <div style={{ fontSize: 13, color: '#141514' }}>
              <strong style={{ fontWeight: 700 }}>confirm your email</strong> to start booking classes.
              {pendingCode && <span style={{ color: '#707070' }}> demo code: <span style={{ fontWeight: 700, color: '#141514', letterSpacing: '0.15em' }}>{pendingCode}</span></span>}
            </div>
            <button onClick={() => setAuthOpen(true)}
              style={{
                fontSize: 12, fontWeight: 700, color: '#fff', background: '#141514',
                border: 'none', borderRadius: 100, padding: '8px 16px', cursor: 'pointer',
                fontFamily: 'inherit',
              }}>
              enter code
            </button>
          </div>
        )}

        {/* meta row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 24, marginBottom: 64 }}>
          {user.instagram && (
            <span style={{
              padding: '6px 14px', borderRadius: 100, border: '1px solid #EFEFEF',
              fontSize: 12, fontWeight: 500, color: '#707070',
            }}>
              @{user.instagram}
            </span>
          )}
          <span style={{
            padding: '6px 14px', borderRadius: 100, border: '1px solid #EFEFEF',
            fontSize: 12, fontWeight: 500, color: '#707070',
          }}>
            member since {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toLowerCase()}
          </span>
          <span style={{
            padding: '6px 14px', borderRadius: 100,
            border: `1px solid ${user.emailVerified ? '#4CAE6A' : '#E4E4E4'}`,
            fontSize: 12, fontWeight: 600,
            color: user.emailVerified ? '#4CAE6A' : '#707070',
          }}>
            {user.emailVerified ? '✓ email verified' : 'email not verified'}
          </span>
        </div>

        {/* inbox — surfaces auto-promotion emails */}
        {notifications.length > 0 && (
          <div style={{ marginBottom: 56 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 16, gap: 16, flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: '#141514', margin: 0, display: 'flex', alignItems: 'center', gap: 12 }}>
                inbox
                {notifications.some((n) => !n.read) && (
                  <span style={{
                    fontSize: 10, fontWeight: 700, color: '#fff', background: '#D85F93',
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    padding: '4px 10px', borderRadius: 100,
                  }}>
                    {notifications.filter((n) => !n.read).length} new
                  </span>
                )}
              </h2>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[...notifications].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).map((n) => {
                const open = openEmailId === n.id;
                return (
                  <li key={n.id} style={{
                    border: `1px solid ${n.read ? '#EFEFEF' : 'rgba(216,95,147,0.4)'}`,
                    background: n.read ? '#fff' : 'linear-gradient(90deg, rgba(247,141,185,0.08) 0%, rgba(24,91,197,0.04) 100%)',
                    borderRadius: 14,
                    overflow: 'hidden',
                  }}>
                    <button
                      onClick={() => {
                        setOpenEmailId(open ? null : n.id);
                        if (!n.read) markNotificationRead(n.id);
                      }}
                      style={{
                        width: '100%', textAlign: 'left',
                        padding: '16px 18px', background: 'none', border: 'none', cursor: 'pointer',
                        fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 14,
                      }}>
                      <span style={{
                        width: 36, height: 36, borderRadius: '50%',
                        background: 'linear-gradient(135deg, #F78DB9 0%, #185BC5 100%)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#fff', fontSize: 14, fontWeight: 700, flexShrink: 0,
                      }}>
                        ✉
                      </span>
                      <span style={{ flex: 1, minWidth: 0 }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                          {!n.read && <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#D85F93' }} />}
                          <span style={{ fontSize: 13, fontWeight: n.read ? 500 : 700, color: '#141514', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {n.subject}
                          </span>
                        </span>
                        <span style={{ fontSize: 12, color: '#707070', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {n.preview}
                        </span>
                      </span>
                      <span style={{ fontSize: 11, color: '#707070', flexShrink: 0 }}>
                        {new Date(n.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toLowerCase()}
                      </span>
                    </button>
                    {open && (
                      <div style={{
                        padding: '4px 18px 20px 68px',
                        fontSize: 13, color: '#141514', lineHeight: 1.7,
                        whiteSpace: 'pre-wrap', borderTop: '1px solid rgba(20,21,20,0.06)',
                      }}>
                        <div style={{ fontSize: 11, color: '#707070', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, marginTop: 14, marginBottom: 8 }}>
                          from: the dopamine games · to: {user.email}
                        </div>
                        {n.body}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* bookings */}
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 24, gap: 16, flexWrap: 'wrap' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', color: '#141514', margin: 0 }}>
            your experiences
          </h2>
          <span style={{ fontSize: 13, color: '#707070' }}>
            {sortedBookings.length === 0 ? 'nothing booked yet' : `${sortedBookings.length} booked`}
          </span>
        </div>

        {sortedBookings.length === 0 ? (
          <div style={{
            border: '1.5px dashed #E4E4E4', borderRadius: 20, padding: '60px 24px',
            textAlign: 'center',
          }}>
            <p style={{ fontSize: 15, color: '#707070', margin: '0 0 20px', lineHeight: 1.6 }}>
              you haven&apos;t booked any experiences yet.
            </p>
            <a href="/open-play" style={{
              display: 'inline-block', padding: '12px 24px', fontSize: 13, fontWeight: 700,
              background: '#141514', color: '#fff', borderRadius: 100, textDecoration: 'none',
            }}>
              browse open play →
            </a>
          </div>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {sortedBookings.map((b) => (
              <li key={b.id} style={{
                display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 16,
                padding: '20px 22px', border: '1px solid #EFEFEF', borderRadius: 16, background: '#fff',
              }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 6 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#141514' }}>{b.time}</span>
                    <span style={{
                      fontSize: 10, fontWeight: 700, color: '#707070',
                      letterSpacing: '0.12em', textTransform: 'uppercase',
                      padding: '3px 9px', border: '1px solid #EFEFEF', borderRadius: 100,
                    }}>
                      {b.place}
                    </span>
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.01em', color: '#141514', marginBottom: 4 }}>
                    {b.title}
                  </div>
                  <div style={{ fontSize: 13, color: '#707070' }}>with {b.coach}</div>
                </div>
                <button onClick={() => setConfirmRemoveId(b.id)}
                  style={{
                    padding: '10px 18px', fontSize: 12, fontWeight: 700,
                    background: '#fff', color: '#141514', border: '1.5px solid #141514', borderRadius: 100,
                    cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '-0.005em',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#141514'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#141514'; }}
                >
                  sign out of class
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* waitlist */}
        {sortedWaitlist.length > 0 && (
          <>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 56, marginBottom: 12, gap: 16, flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: '#141514', margin: 0 }}>
                on the waitlist
              </h2>
              <span style={{ fontSize: 13, color: '#707070' }}>
                {sortedWaitlist.length} {sortedWaitlist.length === 1 ? 'class' : 'classes'}
              </span>
            </div>
            <p style={{ fontSize: 13, color: '#707070', lineHeight: 1.6, margin: '0 0 20px', maxWidth: 540 }}>
              we&apos;ll email you the moment a spot opens up. you&apos;ll have a few minutes to claim it before the next person on the list is offered.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {sortedWaitlist.map((b) => (
                <li key={b.id} style={{
                  display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 16,
                  padding: '20px 22px',
                  border: '1px solid rgba(232,165,60,0.35)',
                  background: 'linear-gradient(90deg, rgba(232,165,60,0.06) 0%, rgba(232,165,60,0.02) 100%)',
                  borderRadius: 16,
                }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 6 }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: '#141514' }}>{b.time}</span>
                      <span style={{
                        fontSize: 10, fontWeight: 700, color: '#707070',
                        letterSpacing: '0.12em', textTransform: 'uppercase',
                        padding: '3px 9px', border: '1px solid #EFEFEF', borderRadius: 100,
                      }}>
                        {b.place}
                      </span>
                      <span style={{
                        fontSize: 10, fontWeight: 700, color: '#fff', background: '#E8A53C',
                        letterSpacing: '0.12em', textTransform: 'uppercase',
                        padding: '3px 9px', borderRadius: 100,
                      }}>
                        waitlisted
                      </span>
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.01em', color: '#141514', marginBottom: 4 }}>
                      {b.title}
                    </div>
                    <div style={{ fontSize: 13, color: '#707070' }}>with {b.coach}</div>
                  </div>
                  <button onClick={() => setConfirmWaitlistId(b.id)}
                    style={{
                      padding: '10px 18px', fontSize: 12, fontWeight: 700,
                      background: '#fff', color: '#141514', border: '1.5px solid #141514', borderRadius: 100,
                      cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '-0.005em',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#141514'; e.currentTarget.style.color = '#fff'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#141514'; }}
                  >
                    leave waitlist
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}

        {/* sign out */}
        <div style={{ marginTop: 56, paddingTop: 32, borderTop: '1px solid #EFEFEF' }}>
          <button onClick={signOut} style={{
            fontSize: 13, fontWeight: 600, color: '#707070',
            background: 'none', border: 'none', padding: '6px 0', cursor: 'pointer',
            fontFamily: 'inherit', textDecoration: 'underline',
          }}>
            sign out
          </button>
        </div>
      </section>

      {/* sign-out-of-class warning */}
      {confirmRemoveId && (() => {
        const target = bookings.find((b) => b.id === confirmRemoveId);
        if (!target) return null;
        return (
          <div onClick={() => setConfirmRemoveId(null)}
            style={{
              position: 'fixed', inset: 0, background: 'rgba(20,21,20,0.6)', backdropFilter: 'blur(8px)',
              zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
              animation: 'overlayIn 0.2s ease',
            }}>
            <div onClick={(e) => e.stopPropagation()}
              style={{
                background: '#fff', borderRadius: 24, padding: '40px 32px 28px',
                width: '100%', maxWidth: 440, position: 'relative',
                boxShadow: '0 40px 120px rgba(0,0,0,0.3)', animation: 'modalIn 0.3s ease',
                textAlign: 'center',
              }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: 'linear-gradient(135deg, #D85F93 0%, #F78DB9 100%)',
                margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: 26, fontWeight: 700,
              }}>
                !
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: '#141514', margin: '0 0 12px' }}>
                sign out of {target.title}?
              </h3>
              <p style={{ fontSize: 14, color: '#707070', lineHeight: 1.6, margin: '0 0 8px' }}>
                your spot opens up for someone else immediately.
              </p>
              <p style={{ fontSize: 14, color: '#141514', lineHeight: 1.6, fontWeight: 600, margin: '0 0 28px' }}>
                if the class fills up, it&apos;s full — you won&apos;t be able to get back in.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <button onClick={() => {
                    const result = removeBooking(confirmRemoveId);
                    setConfirmRemoveId(null);
                    if (result && 'promoted' in result && result.promoted) {
                      setPromotionToast({ name: result.promoted.name, title: result.promoted.title });
                      setTimeout(() => setPromotionToast(null), 6000);
                    }
                  }}
                  style={{
                    padding: '14px 20px', fontSize: 13, fontWeight: 700,
                    background: '#D85F93', color: '#fff', border: 'none', borderRadius: 100,
                    cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '-0.005em',
                  }}>
                  yes, sign me out
                </button>
                <button onClick={() => setConfirmRemoveId(null)}
                  style={{
                    padding: '14px 20px', fontSize: 13, fontWeight: 600,
                    background: 'none', color: '#707070', border: 'none',
                    cursor: 'pointer', fontFamily: 'inherit',
                  }}>
                  keep my spot
                </button>
              </div>
              <style>{`
                @keyframes modalIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes overlayIn { from { opacity: 0; } to { opacity: 1; } }
              `}</style>
            </div>
          </div>
        );
      })()}

      {/* promotion notice toast */}
      {promotionToast && (
        <div style={{
          position: 'fixed', top: 84, left: '50%', transform: 'translateX(-50%)',
          background: '#141514', color: '#fff',
          borderRadius: 16, padding: '14px 20px',
          fontSize: 13, fontWeight: 500, lineHeight: 1.5,
          zIndex: 60, maxWidth: 'min(440px, calc(100vw - 32px))',
          boxShadow: '0 16px 48px rgba(0,0,0,0.3)',
          display: 'flex', alignItems: 'center', gap: 14,
          animation: 'cartSlide 0.3s ease',
        }}>
          <span style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'linear-gradient(135deg, #F78DB9 0%, #185BC5 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, fontWeight: 700, flexShrink: 0,
          }}>
            ✉
          </span>
          <span>
            spot opened up — we just emailed{' '}
            <strong style={{ fontWeight: 700 }}>{promotionToast.name.split(' ')[0].toLowerCase()}</strong> who was first on the waitlist for <em style={{ fontStyle: 'normal', fontWeight: 600 }}>{promotionToast.title}</em>.
          </span>
        </div>
      )}

      <style>{`
        @keyframes cartSlide { from { opacity: 0; transform: translate(-50%, -8px); } to { opacity: 1; transform: translate(-50%, 0); } }
      `}</style>

      {/* leave-waitlist confirm */}
      {confirmWaitlistId && (() => {
        const target = waitlist.find((b) => b.id === confirmWaitlistId);
        if (!target) return null;
        return (
          <div onClick={() => setConfirmWaitlistId(null)}
            style={{
              position: 'fixed', inset: 0, background: 'rgba(20,21,20,0.6)', backdropFilter: 'blur(8px)',
              zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
              animation: 'overlayIn 0.2s ease',
            }}>
            <div onClick={(e) => e.stopPropagation()}
              style={{
                background: '#fff', borderRadius: 24, padding: '40px 32px 28px',
                width: '100%', maxWidth: 440, position: 'relative',
                boxShadow: '0 40px 120px rgba(0,0,0,0.3)', animation: 'modalIn 0.3s ease',
                textAlign: 'center',
              }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: '#E8A53C',
                margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: 26, fontWeight: 700,
              }}>
                ?
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: '#141514', margin: '0 0 12px' }}>
                leave the waitlist for {target.title}?
              </h3>
              <p style={{ fontSize: 14, color: '#707070', lineHeight: 1.6, margin: '0 0 8px' }}>
                you&apos;ll lose your place in line.
              </p>
              <p style={{ fontSize: 14, color: '#141514', lineHeight: 1.6, fontWeight: 600, margin: '0 0 28px' }}>
                if you change your mind, you&apos;ll rejoin at the back of the queue.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <button onClick={() => { leaveWaitlist(confirmWaitlistId); setConfirmWaitlistId(null); }}
                  style={{
                    padding: '14px 20px', fontSize: 13, fontWeight: 700,
                    background: '#E8A53C', color: '#fff', border: 'none', borderRadius: 100,
                    cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '-0.005em',
                  }}>
                  yes, leave waitlist
                </button>
                <button onClick={() => setConfirmWaitlistId(null)}
                  style={{
                    padding: '14px 20px', fontSize: 13, fontWeight: 600,
                    background: 'none', color: '#707070', border: 'none',
                    cursor: 'pointer', fontFamily: 'inherit',
                  }}>
                  stay on the list
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} initialMode="signin" />
    </div>
  );
}
