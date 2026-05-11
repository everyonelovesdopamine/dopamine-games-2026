'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import AuthModal from '@/components/AuthModal';

type Place = {
  id: string;
  name: string;
  color: string;
};

type ClassSession = {
  id: string;
  placeId: string;
  title: string;
  time: string;
  totalSlots: number;
  slotsTaken: number;
  coach: string;
  coachBio: string;
  coachPhoto: string;
  description: string;
  duration: string;
  level: 'all levels' | 'beginner' | 'intermediate' | 'advanced';
  instagram?: string;
};

const PLACES: Place[] = [
  { id: 'strength-gym',   name: 'strength gym',   color: '#185BC5' },
  { id: 'movement-gym',   name: 'movement gym',   color: '#F78DB9' },
  { id: 'clubhouse',      name: 'clubhouse',      color: '#E8A53C' },
  { id: 'recovery-zone',  name: 'recovery zone',  color: '#D85F93' },
  { id: 'paddle-court',   name: 'padel court',    color: '#4CAE6A' },
  { id: 'back-yard',      name: 'back yard',      color: '#7B5CC4' },
  { id: '5k-run',         name: '5k run',         color: '#C97A4A' },
];

const CLASSES: ClassSession[] = [
  // strength gym
  { id: 'sg-1', placeId: 'strength-gym', title: 'calisthenics (pull-up clinic)', time: '2:00 – 2:50 pm', totalSlots: 30, slotsTaken: 18, coach: 'the 1 pull up club',    coachBio: 'beginners’ calisthenics community. for every person and every body — scaled drills, prioritising new movers.',                                  coachPhoto: '/images/photos/athlete-barbell-grip-smiling.jpg',      description: 'the 1 pull up club is a beginners calisthenics community. suitable for all levels, beginners are prioritised — for every person, and every body. this session focuses on building toward your first pull-up.', duration: '50 min', level: 'all levels', instagram: '1pu.club' },
  { id: 'sg-2', placeId: 'strength-gym', title: 'mobility',   time: '3:00 – 3:50 pm', totalSlots: 30, slotsTaken: 12, coach: 'edgar',   coachBio: 'movement coach blending yoga, gymnastics prep, and primal patterns. eight years coaching athletes back to full range.',          coachPhoto: '/images/photos/athlete-laughing-post-workout.jpg',     description: 'unhurried, unfussy. a flow that restores rotation, opens hips, unlocks shoulders. come barefoot.',         duration: '50 min', level: 'all levels', instagram: 'tbd' },
  { id: 'sg-3', placeId: 'strength-gym', title: 'calisthenics (handstand clinic)', time: '4:00 – 4:50 pm', totalSlots: 30, slotsTaken: 9,  coach: 'the 1 pull up club',    coachBio: 'beginners’ calisthenics community. for every person and every body — scaled drills, prioritising new movers.',                                  coachPhoto: '/images/photos/athlete-barbell-grip-smiling.jpg',      description: 'the 1 pull up club is a beginners calisthenics community. suitable for all levels, beginners are prioritised — for every person, and every body. this session focuses on the fundamentals of the handstand.',  duration: '50 min', level: 'intermediate', instagram: '1pu.club' },
  { id: 'sg-4', placeId: 'strength-gym', title: 'mobility',   time: '5:00 – 5:50 pm', totalSlots: 30, slotsTaken: 14, coach: 'edgar',   coachBio: 'movement coach blending yoga, gymnastics prep, and primal patterns. eight years coaching athletes back to full range.',          coachPhoto: '/images/photos/athlete-laughing-post-workout.jpg',     description: 'late-day mobility for tired bodies. slower flow, longer holds, deeper recovery.',                          duration: '50 min', level: 'all levels', instagram: 'tbd' },

  // movement gym
  { id: 'mg-1', placeId: 'movement-gym', title: 'dopamine boxing', time: '3:00 – 3:50 pm', totalSlots: 24, slotsTaken: 16, coach: 'sidney rosa', coachBio: 'former amateur boxer turned coach. teaches footwork and stance before fury. ten years in the corner.',   coachPhoto: '/images/photos/teammates-barbell-rack-dopamine-tees.jpg', description: 'whether you’ve never thrown a punch or you’ve been training for years, this class is built for you. beginners get the real foundations: stance, the 1–6 punches, defence, and footwork — broken down by coaches who actually box. experienced practitioners get the repetition that keeps technique sharp and the high-intensity padwork that makes this one of the best cardio sessions you’ll find anywhere. no ego. no experience required. just real boxing. gloves provided.', duration: '50 min', level: 'all levels', instagram: 'tbd' },
  { id: 'mg-2', placeId: 'movement-gym', title: 'dopamine boxing', time: '5:00 – 5:50 pm', totalSlots: 24, slotsTaken: 21, coach: 'sidney rosa', coachBio: 'former amateur boxer turned coach. teaches footwork and stance before fury. ten years in the corner.',   coachPhoto: '/images/photos/teammates-barbell-rack-dopamine-tees.jpg', description: 'whether you’ve never thrown a punch or you’ve been training for years, this class is built for you. beginners get the real foundations: stance, the 1–6 punches, defence, and footwork — broken down by coaches who actually box. experienced practitioners get the repetition that keeps technique sharp and the high-intensity padwork that makes this one of the best cardio sessions you’ll find anywhere. no ego. no experience required. just real boxing. gloves provided.',                                     duration: '50 min', level: 'intermediate', instagram: 'tbd' },

  // clubhouse
  { id: 'ch-1', placeId: 'clubhouse', title: 'les mills — bodypump',    time: '2:00 – 2:50 pm', totalSlots: 30, slotsTaken: 30, coach: 'les mills team', coachBio: 'certified les mills instructors rotating through every session. high-energy, programmed to the bpm.',                  coachPhoto: '/images/photos/LesMillsxSportsbase_142.jpg',     description: 'the rep-effect workout. barbell, plates, a room full of people moving together to music.',                            duration: '50 min', level: 'all levels', instagram: 'tbd' },
  { id: 'ch-2', placeId: 'clubhouse', title: 'les mills — bodycombat',  time: '3:00 – 3:50 pm', totalSlots: 30, slotsTaken: 19, coach: 'les mills team', coachBio: 'certified les mills instructors rotating through every session. high-energy, programmed to the bpm.',                  coachPhoto: '/images/photos/LesMillsxSportsbase_196 (3).jpg', description: 'fierce, non-contact cardio inspired by martial arts. punch, kick, sweat, repeat.',                                    duration: '50 min', level: 'all levels', instagram: 'tbd' },
  { id: 'run-1', placeId: '5k-run', title: '5k run',                       time: '4:00 – 4:50 pm', totalSlots: 80, slotsTaken: 22, coach: 'blend kollektiv', coachBio: 'berlin running collective. hosts friendly 5ks with pace groups, route briefings, and post-run hangs. open door, every pace.',           coachPhoto: '/images/photos/women-sprinting-close-up.jpg',    description: 'outdoor 5k along the river loop. meet in the clubhouse for pace groups, route briefing, and snacks — then head out on the hour. all paces welcome.', duration: '50 min', level: 'all levels', instagram: 'blendkollektiv' },
  { id: 'ch-4', placeId: 'clubhouse', title: 'les mills — bodybalance', time: '5:00 – 5:50 pm', totalSlots: 30, slotsTaken: 8,  coach: 'les mills team', coachBio: 'certified les mills instructors rotating through every session. high-energy, programmed to the bpm.',                  coachPhoto: '/images/photos/LesMillsxSportsbase_142.jpg',     description: 'yoga, tai chi, and pilates in one flow. a long exhale after the day’s harder efforts.',                                duration: '50 min', level: 'all levels', instagram: 'tbd' },
  { id: 'ch-5', placeId: 'clubhouse', title: 'dance — hip hop',                    time: '6:00 – 6:50 pm', totalSlots: 30, slotsTaken: 17, coach: 'project x by jay',     coachBio: 'choreographer and movement teacher. teaches beginners how to feel rhythm in their hips first, steps second.',          coachPhoto: '/images/photos/duo-assault-bike-recovery.jpg',   description: 'a beginner-friendly hip hop class to close out the day. learn a short routine to a track everyone knows.',             duration: '50 min', level: 'all levels', instagram: 'tbd' },

  // recovery zone — sauna & ice bathing, 30-min slots every half hour, 2pm – 6:30pm
  { id: 'rz-1', placeId: 'recovery-zone', title: 'sauna & ice bathing', time: '2:00 – 2:30 pm', totalSlots: 16, slotsTaken: 8,  coach: 'the dopamine team', coachBio: 'the dopamine games crew. running the heat, the cold, and everything in between.', coachPhoto: '/images/photos/athletes-recovery-games-tee-rowers.jpg', description: 'a 30-minute contrast session — sauna heat and ice plunge. enter dry, leave reset.', duration: '30 min', level: 'all levels', instagram: 'tbd' },
  { id: 'rz-2', placeId: 'recovery-zone', title: 'sauna & ice bathing', time: '2:30 – 3:00 pm', totalSlots: 16, slotsTaken: 11, coach: 'the dopamine team', coachBio: 'the dopamine games crew. running the heat, the cold, and everything in between.', coachPhoto: '/images/photos/athletes-recovery-games-tee-rowers.jpg', description: 'a 30-minute contrast session — sauna heat and ice plunge. enter dry, leave reset.', duration: '30 min', level: 'all levels', instagram: 'tbd' },
  { id: 'rz-3', placeId: 'recovery-zone', title: 'sauna & ice bathing', time: '3:00 – 3:30 pm', totalSlots: 16, slotsTaken: 9,  coach: 'the dopamine team', coachBio: 'the dopamine games crew. running the heat, the cold, and everything in between.', coachPhoto: '/images/photos/athletes-recovery-games-tee-rowers.jpg', description: 'a 30-minute contrast session — sauna heat and ice plunge. enter dry, leave reset.', duration: '30 min', level: 'all levels', instagram: 'tbd' },
  { id: 'rz-4', placeId: 'recovery-zone', title: 'sauna & ice bathing', time: '3:30 – 4:00 pm', totalSlots: 16, slotsTaken: 12, coach: 'the dopamine team', coachBio: 'the dopamine games crew. running the heat, the cold, and everything in between.', coachPhoto: '/images/photos/athletes-recovery-games-tee-rowers.jpg', description: 'a 30-minute contrast session — sauna heat and ice plunge. enter dry, leave reset.', duration: '30 min', level: 'all levels', instagram: 'tbd' },
  { id: 'rz-5', placeId: 'recovery-zone', title: 'sauna & ice bathing', time: '4:00 – 4:30 pm', totalSlots: 16, slotsTaken: 7,  coach: 'the dopamine team', coachBio: 'the dopamine games crew. running the heat, the cold, and everything in between.', coachPhoto: '/images/photos/athletes-recovery-games-tee-rowers.jpg', description: 'a 30-minute contrast session — sauna heat and ice plunge. enter dry, leave reset.', duration: '30 min', level: 'all levels', instagram: 'tbd' },
  { id: 'rz-6', placeId: 'recovery-zone', title: 'sauna & ice bathing', time: '4:30 – 5:00 pm', totalSlots: 16, slotsTaken: 10, coach: 'the dopamine team', coachBio: 'the dopamine games crew. running the heat, the cold, and everything in between.', coachPhoto: '/images/photos/athletes-recovery-games-tee-rowers.jpg', description: 'a 30-minute contrast session — sauna heat and ice plunge. enter dry, leave reset.', duration: '30 min', level: 'all levels', instagram: 'tbd' },
  { id: 'rz-7', placeId: 'recovery-zone', title: 'sauna & ice bathing', time: '5:00 – 5:30 pm', totalSlots: 16, slotsTaken: 14, coach: 'the dopamine team', coachBio: 'the dopamine games crew. running the heat, the cold, and everything in between.', coachPhoto: '/images/photos/athletes-recovery-games-tee-rowers.jpg', description: 'a 30-minute contrast session — sauna heat and ice plunge. enter dry, leave reset.', duration: '30 min', level: 'all levels', instagram: 'tbd' },
  { id: 'rz-8', placeId: 'recovery-zone', title: 'sauna & ice bathing', time: '5:30 – 6:00 pm', totalSlots: 16, slotsTaken: 13, coach: 'the dopamine team', coachBio: 'the dopamine games crew. running the heat, the cold, and everything in between.', coachPhoto: '/images/photos/athletes-recovery-games-tee-rowers.jpg', description: 'a 30-minute contrast session — sauna heat and ice plunge. enter dry, leave reset.', duration: '30 min', level: 'all levels', instagram: 'tbd' },
  { id: 'rz-9', placeId: 'recovery-zone', title: 'sauna & ice bathing', time: '6:00 – 6:30 pm', totalSlots: 16, slotsTaken: 5,  coach: 'the dopamine team', coachBio: 'the dopamine games crew. running the heat, the cold, and everything in between.', coachPhoto: '/images/photos/athletes-recovery-games-tee-rowers.jpg', description: 'a 30-minute contrast session — sauna heat and ice plunge. enter dry, leave reset.', duration: '30 min', level: 'all levels', instagram: 'tbd' },

  // padel court
  { id: 'pc-1', placeId: 'paddle-court', title: 'padel', time: '2:00 – 2:50 pm', totalSlots: 16, slotsTaken: 10, coach: 'offcourt collective', coachBio: 'berlin padel collective. hosts open courts, mixed-level matches, and friendly americana brackets.', coachPhoto: '/images/photos/LesMillsxSportsbase_142.jpg',        description: 'open padel — rotating doubles on four courts. rackets provided. all levels mixed for fun matches.',      duration: '50 min', level: 'all levels', instagram: 'offcourt_collective' },
  { id: 'pc-2', placeId: 'paddle-court', title: 'padel', time: '3:00 – 3:50 pm', totalSlots: 16, slotsTaken: 14, coach: 'offcourt collective', coachBio: 'berlin padel collective. hosts open courts, mixed-level matches, and friendly americana brackets.', coachPhoto: '/images/photos/LesMillsxSportsbase_196 (3).jpg',    description: 'americana format — new partners every round, short games, fast resets.',                                  duration: '50 min', level: 'all levels', instagram: 'offcourt_collective' },
  { id: 'pc-3', placeId: 'paddle-court', title: 'padel', time: '4:00 – 4:50 pm', totalSlots: 16, slotsTaken: 11, coach: 'offcourt collective', coachBio: 'berlin padel collective. hosts open courts, mixed-level matches, and friendly americana brackets.', coachPhoto: '/images/photos/athlete-sled-push-competition.jpg',  description: 'third padel block with a competitive edge. ranked matches if you want them — friendlies if you don’t.',   duration: '50 min', level: 'intermediate', instagram: 'offcourt_collective' },
  { id: 'pc-4', placeId: 'paddle-court', title: 'padel', time: '5:00 – 5:50 pm', totalSlots: 16, slotsTaken: 7,  coach: 'offcourt collective', coachBio: 'berlin padel collective. hosts open courts, mixed-level matches, and friendly americana brackets.', coachPhoto: '/images/photos/LesMillsxSportsbase_142.jpg',        description: 'final padel block of the day. open play with coaching available courtside.',                              duration: '50 min', level: 'all levels', instagram: 'offcourt_collective' },

  // back yard
  { id: 'by-1', placeId: 'back-yard', title: 'beats & burpees', time: '6:00 – 6:50 pm', totalSlots: 40, slotsTaken: 26, coach: 'beats & burpees', coachBio: 'berlin-born hybrid training crew. hyrox and hiit sessions set to techno and house — workout meets whole experience.', coachPhoto: '/images/photos/athlete-assault-bike-intensity.jpg', description: 'welcome to beats & burpees. we combine strong hyrox and hiit sessions with techno and house music — it’s not only a workout, but a whole experience. closing event of the day.', duration: '50 min', level: 'all levels', instagram: 'beats.and.burpees' },
];

const TIME_SLOTS = [
  '2:00 – 2:50 pm',
  '3:00 – 3:50 pm',
  '4:00 – 4:50 pm',
  '5:00 – 5:50 pm',
  '6:00 – 6:50 pm',
];

const MAX_CART = 3;

function parseTimeRange(timeStr: string): { start: number; end: number } | null {
  const m = timeStr.match(/(\d+):(\d+)\s*(am|pm)?\s*[–-]\s*(\d+):(\d+)\s*(am|pm)/i);
  if (!m) return null;
  let h1 = parseInt(m[1], 10);
  const mm1 = parseInt(m[2], 10);
  let h2 = parseInt(m[4], 10);
  const mm2 = parseInt(m[5], 10);
  const per2 = m[6].toLowerCase();
  const per1 = (m[3] || per2).toLowerCase();
  if (per1 === 'pm' && h1 !== 12) h1 += 12;
  if (per1 === 'am' && h1 === 12) h1 = 0;
  if (per2 === 'pm' && h2 !== 12) h2 += 12;
  if (per2 === 'am' && h2 === 12) h2 = 0;
  return { start: h1 * 60 + mm1, end: h2 * 60 + mm2 };
}

function rangesOverlap(a: { start: number; end: number }, b: { start: number; end: number }): boolean {
  return a.start < b.end && b.start < a.end;
}

function classesConflict(a: ClassSession, b: ClassSession): boolean {
  const ra = parseTimeRange(a.time);
  const rb = parseTimeRange(b.time);
  if (!ra || !rb) return false;
  return rangesOverlap(ra, rb);
}

export default function OpenPlayPage() {
  const { user, bookings, waitlist, addBookings, joinWaitlist } = useAuth();
  const [activePlace, setActivePlace] = useState<string>(PLACES[0].id);
  const [cart, setCart] = useState<string[]>([]);
  const [modalClass, setModalClass] = useState<ClassSession | null>(null);
  const [showCartToast, setShowCartToast] = useState<string | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signup' | 'signin'>('signup');
  const [authReason, setAuthReason] = useState<string | undefined>();
  const [confirmedToast, setConfirmedToast] = useState(false);
  const [partyRsvpExists, setPartyRsvpExists] = useState(false);
  const [partyPopupOpen, setPartyPopupOpen] = useState(false);
  const [pendingPartyOptIn, setPendingPartyOptIn] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      setPartyRsvpExists(!!localStorage.getItem('party-rsvp'));
    } catch {}
  }, [confirmedToast]);

  const bookedIds = new Set(bookings.map((b) => b.experienceId));
  const waitlistedIds = new Set(waitlist.map((b) => b.experienceId));
  const visibleClasses = CLASSES.filter((c) => c.placeId === activePlace);
  const cartClasses = CLASSES.filter((c) => cart.includes(c.id));
  const totalScheduled = cart.length + bookings.length + waitlist.length;

  const hasConflict = (candidate: ClassSession): ClassSession | null => {
    for (const c of cartClasses) {
      if (c.id === candidate.id) continue;
      if (classesConflict(candidate, c)) return c;
    }
    for (const b of bookings) {
      const booked = CLASSES.find((c) => c.id === b.experienceId);
      if (!booked || booked.id === candidate.id) continue;
      if (classesConflict(candidate, booked)) return booked;
    }
    for (const w of waitlist) {
      const wl = CLASSES.find((c) => c.id === w.experienceId);
      if (!wl || wl.id === candidate.id) continue;
      if (classesConflict(candidate, wl)) return wl;
    }
    return null;
  };

  const toggleCart = (id: string) => {
    if (bookedIds.has(id) || waitlistedIds.has(id)) {
      setShowCartToast('already in your schedule — manage in /account');
      setTimeout(() => setShowCartToast(null), 2600);
      return;
    }
    setCart((prev) => {
      if (prev.includes(id)) {
        return prev.filter((x) => x !== id);
      }
      if (prev.length + bookings.length + waitlist.length >= MAX_CART) {
        setShowCartToast('schedule full — three classes max');
        setTimeout(() => setShowCartToast(null), 2400);
        return prev;
      }
      const candidate = CLASSES.find((c) => c.id === id);
      if (candidate) {
        const conflict = prev
          .map((pid) => CLASSES.find((c) => c.id === pid))
          .filter((c): c is ClassSession => !!c)
          .find((c) => classesConflict(candidate, c));
        if (conflict) {
          setShowCartToast(`time clash with ${conflict.title}`);
          setTimeout(() => setShowCartToast(null), 2600);
          return prev;
        }
        const bookingConflict = bookings.find((b) => {
          const booked = CLASSES.find((c) => c.id === b.experienceId);
          return booked && classesConflict(candidate, booked);
        });
        if (bookingConflict) {
          setShowCartToast(`time clash with ${bookingConflict.title}`);
          setTimeout(() => setShowCartToast(null), 2600);
          return prev;
        }
        const waitlistConflict = waitlist.find((w) => {
          const wl = CLASSES.find((c) => c.id === w.experienceId);
          return wl && classesConflict(candidate, wl);
        });
        if (waitlistConflict) {
          setShowCartToast(`time clash with ${waitlistConflict.title}`);
          setTimeout(() => setShowCartToast(null), 2600);
          return prev;
        }
      }
      return [...prev, id];
    });
  };

  const handleConfirm = () => {
    // step 1: ask about the after-party (unless they've already RSVP'd or already answered this turn)
    if (!partyRsvpExists && pendingPartyOptIn === null) {
      setPartyPopupOpen(true);
      return;
    }
    finalizeBooking();
  };

  const finalizeBooking = () => {
    if (!user) {
      setAuthMode('signup');
      setAuthReason('create an account to lock in your classes — takes 30 seconds.');
      setAuthOpen(true);
      return;
    }
    if (!user.emailVerified) {
      setAuthReason('confirm your email to finish booking — we just sent a code.');
      setAuthOpen(true);
      return;
    }
    const placeNameById: Record<string, string> = Object.fromEntries(PLACES.map((p) => [p.id, p.name]));
    const toEntry = (c: ClassSession) => ({
      experienceId: c.id,
      title: c.title,
      place: placeNameById[c.placeId] || c.placeId,
      time: c.time,
      coach: c.coach,
    });
    const bookable = cartClasses.filter((c) => c.totalSlots - c.slotsTaken > 0);
    const waitlisted = cartClasses.filter((c) => c.totalSlots - c.slotsTaken <= 0);
    if (bookable.length > 0) addBookings(bookable.map(toEntry));
    if (waitlisted.length > 0) joinWaitlist(waitlisted.map(toEntry));
    if (pendingPartyOptIn === true && !partyRsvpExists) {
      const handle = ((user as { instagram?: string }).instagram || '').replace(/^@/, '').trim();
      try {
        localStorage.setItem('party-rsvp', JSON.stringify({
          name: user.name || '',
          email: user.email || '',
          instagram: handle,
          agreedTerms: true,
          at: new Date().toISOString(),
        }));
      } catch {}
    }
    setCart([]);
    setPendingPartyOptIn(null);
    setConfirmedToast(true);
    setTimeout(() => setConfirmedToast(false), 3200);
  };

  const handlePartyChoiceYes = () => {
    setPendingPartyOptIn(true);
    setPartyPopupOpen(false);
    setTimeout(finalizeBooking, 0);
  };

  const handlePartyChoiceNo = () => {
    setPendingPartyOptIn(false);
    setPartyPopupOpen(false);
    setTimeout(finalizeBooking, 0);
  };

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', paddingTop: 64 }}>

      <style>{`
        @keyframes iconDrift { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-10px) rotate(2deg); } }
        @keyframes modalIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes overlayIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes cartSlide { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .space-card { transition: transform 0.5s ease, box-shadow 0.3s ease; }
        .space-card:hover { transform: translateY(-4px); box-shadow: 0 20px 60px rgba(0,0,0,0.08); }
        .space-card:hover img { transform: scale(1.06); }
        .exp-pill { transition: all 0.2s; cursor: default; }
        .exp-pill:hover { border-color: #141514 !important; color: #141514 !important; }
        .place-tab { transition: all 0.25s ease; }
        .place-tab:hover { color: #141514; }
        .class-card { transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease; cursor: pointer; }
        .class-card:hover { transform: translateY(-2px); box-shadow: 0 16px 40px rgba(0,0,0,0.06); border-color: #141514 !important; }
        .signup-btn { transition: all 0.2s ease; }
        .signup-btn:hover { transform: translateY(-1px); }
        .signup-btn-add:hover { background: #141514 !important; color: #fff !important; }
        .signup-btn-remove:hover { background: #fff !important; color: #141514 !important; border-color: #141514 !important; }
        .modal-close:hover { background: rgba(255,255,255,0.1) !important; }
      `}</style>

      {/* Hero */}
      <div className="grain-overlay" style={{ position: 'relative', height: 480, overflow: 'hidden' }}>
        <img
          src="/images/photos/team-sled-push-cheering.jpg"
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

      {/* Schedule */}
      <section style={{ padding: '100px 24px 200px', maxWidth: 1120, margin: '0 auto', position: 'relative' }}>

        {/* decorative bg shapes */}
        <div aria-hidden="true" style={{ position: 'absolute', top: 80, right: '-60px', width: 240, height: 240, borderRadius: '50%', background: 'radial-gradient(circle, rgba(247,141,185,0.18) 0%, rgba(247,141,185,0) 70%)', pointerEvents: 'none', zIndex: 0 }} />
        <div aria-hidden="true" style={{ position: 'absolute', top: 200, left: '-80px', width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(24,91,197,0.14) 0%, rgba(24,91,197,0) 70%)', pointerEvents: 'none', zIndex: 0 }} />

        {/* header */}
        <div style={{ textAlign: 'center', marginBottom: 56, position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 700, lineHeight: 0.95, letterSpacing: '-0.03em', color: '#141514', marginBottom: 20 }}>
            pick a place.<br />
            <span style={{ position: 'relative', display: 'inline-block' }}>
              pick a class.
              <svg aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, bottom: -10, width: '100%', height: 12, pointerEvents: 'none' }} viewBox="0 0 300 12" preserveAspectRatio="none">
                <path d="M2 8 Q 75 2, 150 7 T 298 5" stroke="#F78DB9" strokeWidth="4" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h2>
          <p style={{ fontSize: 16, color: '#707070', lineHeight: 1.7, maxWidth: 460, margin: '16px auto 0' }}>
            seven spaces, twenty-one sessions. sign up for up to three. tap a class to meet your coach.
          </p>
        </div>

        {/* full day overview */}
        <div style={{ marginBottom: 64, position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center', marginBottom: 20 }}>
            <div style={{ flex: '0 0 24px', height: 1, background: '#E0E0E0' }} />
            <span style={{ fontSize: 10, fontWeight: 700, color: '#707070', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
              the full day at a glance
            </span>
            <div style={{ flex: '0 0 24px', height: 1, background: '#E0E0E0' }} />
          </div>

          <div style={{ borderRadius: 16, border: '1px solid #EFEFEF', background: '#fff', boxShadow: '0 4px 24px rgba(20,21,20,0.04)', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
              <colgroup>
                <col style={{ width: '11%' }} />
                {PLACES.map((p) => (
                  <col key={p.id} />
                ))}
              </colgroup>
              <thead>
                <tr style={{ background: '#FAFAFA' }}>
                  <th style={{ padding: '14px 6px', textAlign: 'center', fontSize: 9, fontWeight: 700, color: '#707070', letterSpacing: '0.04em', textTransform: 'uppercase', borderBottom: '1px solid #EFEFEF', whiteSpace: 'nowrap', verticalAlign: 'middle' }}>
                    time
                  </th>
                  {PLACES.map((p) => (
                    <th key={p.id} style={{ padding: '14px 4px', textAlign: 'center', fontSize: 9, fontWeight: 700, color: '#141514', letterSpacing: '0.04em', textTransform: 'uppercase', borderBottom: '1px solid #EFEFEF', borderLeft: '1px solid #F5F5F5', whiteSpace: 'nowrap', verticalAlign: 'middle' }}>
                      <span style={{ lineHeight: 1.2 }}>{p.name}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TIME_SLOTS.map((slot, rowIdx) => (
                  <tr key={slot} className="overview-row" style={{ background: rowIdx % 2 === 1 ? '#FCFCFC' : '#fff' }}>
                    <td style={{ padding: '10px 8px', fontSize: 11, fontWeight: 600, color: '#141514', borderBottom: '1px solid #F5F5F5', whiteSpace: 'nowrap', transition: 'color 0.2s ease' }}>
                      {slot.replace(/ – \d+:\d+/, '')}
                    </td>
                    {PLACES.map((p) => {
                      const c = p.id === 'recovery-zone'
                        ? CLASSES.find((x) => x.placeId === p.id && parseInt(x.time, 10) === parseInt(slot, 10))
                        : CLASSES.find((x) => x.placeId === p.id && x.time === slot);
                      if (!c) {
                        return (
                          <td key={p.id} style={{ padding: '8px 4px', borderBottom: '1px solid #F5F5F5', borderLeft: '1px solid #F5F5F5', textAlign: 'center' }}>
                            <span style={{ color: '#C8C8C8', fontSize: 12 }}>—</span>
                          </td>
                        );
                      }
                      const isBooked = bookedIds.has(c.id);
                      const isWaitlisted = waitlistedIds.has(c.id);
                      const inCart = cart.includes(c.id);
                      const inSchedule = inCart || isBooked || isWaitlisted;
                      return (
                        <td key={p.id} style={{ padding: '6px 4px', borderBottom: '1px solid #F5F5F5', borderLeft: '1px solid #F5F5F5', verticalAlign: 'middle' }}>
                          <div
                            style={{
                              background: inSchedule ? p.color : '#fff',
                              color: inSchedule ? '#fff' : '#141514',
                              border: `1px solid ${inSchedule ? p.color : '#EFEFEF'}`,
                              borderRadius: 8,
                              padding: '8px 6px',
                              fontSize: 11,
                              fontWeight: 600,
                              letterSpacing: '-0.005em',
                              textAlign: 'center',
                              width: '100%',
                              lineHeight: 1.25,
                            }}
                          >
                            {c.title}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p style={{ textAlign: 'center', fontSize: 12, color: '#707070', marginTop: 14, letterSpacing: '-0.005em' }}>
            pick a space below to see coach details and sign up.
          </p>
        </div>

        {/* place tabs label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center', marginBottom: 16, position: 'relative', zIndex: 1 }}>
          <div style={{ flex: '0 0 24px', height: 1, background: '#E0E0E0' }} />
          <span style={{ fontSize: 10, fontWeight: 700, color: '#707070', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
            choose your space
          </span>
          <div style={{ flex: '0 0 24px', height: 1, background: '#E0E0E0' }} />
        </div>

        {/* place tabs - colorful pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginBottom: 48, position: 'relative', zIndex: 1 }}>
          {PLACES.map((p) => {
            const isActive = p.id === activePlace;
            return (
              <button
                key={p.id}
                onClick={() => setActivePlace(p.id)}
                className="place-tab"
                style={{
                  background: isActive ? '#141514' : '#fff',
                  color: isActive ? '#fff' : '#141514',
                  border: `1.5px solid ${isActive ? '#141514' : '#E4E4E4'}`,
                  borderRadius: 100,
                  padding: '10px 20px',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  letterSpacing: '-0.01em',
                  fontFamily: 'inherit',
                  boxShadow: isActive ? '0 4px 14px rgba(20,21,20,0.18)' : '0 1px 2px rgba(0,0,0,0.02)',
                }}
              >
                {p.name}
              </button>
            );
          })}
        </div>

        {/* schedule full banner */}
        {totalScheduled >= MAX_CART && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            padding: '14px 24px',
            background: 'linear-gradient(90deg, rgba(247,141,185,0.14) 0%, rgba(24,91,197,0.12) 100%)',
            border: '1px solid rgba(20,21,20,0.08)',
            borderRadius: 100,
            marginBottom: 24,
            maxWidth: 560,
            margin: '0 auto 24px',
            position: 'relative',
            zIndex: 1,
          }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#F78DB9', flexShrink: 0 }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: '#141514', letterSpacing: '-0.005em' }}>
              schedule full — three classes locked in. remove one to swap.
            </span>
          </div>
        )}

        {/* class grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, position: 'relative', zIndex: 1 }}>
          {visibleClasses.map((c) => {
            const isBooked = bookedIds.has(c.id);
            const isWaitlisted = waitlistedIds.has(c.id);
            const inCart = cart.includes(c.id);
            const inSchedule = inCart || isBooked || isWaitlisted;
            const slotsLeft = c.totalSlots - c.slotsTaken;
            const isFull = slotsLeft <= 0;
            const scheduleFull = totalScheduled >= MAX_CART;
            const conflictWith = !inSchedule ? hasConflict(c) : null;
            const isDimmed = (scheduleFull && !inSchedule) || !!conflictWith;
            const fillPct = (c.slotsTaken / c.totalSlots) * 100;
            const activePlaceColor = PLACES.find((p) => p.id === c.placeId)?.color || '#141514';

            return (
              <article
                key={c.id}
                className="class-card"
                onClick={() => setModalClass(c)}
                style={{
                  background: '#fff',
                  border: `1px solid ${inSchedule ? '#141514' : '#EFEFEF'}`,
                  borderRadius: 20,
                  padding: 28,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 18,
                  opacity: isDimmed ? 0.35 : 1,
                  transition: 'opacity 0.4s ease, border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
                  pointerEvents: isDimmed ? 'none' : 'auto',
                  position: 'relative',
                }}
              >
                {/* in-schedule ribbon */}
                {inSchedule && (
                  <div style={{
                    position: 'absolute',
                    top: -10,
                    right: 20,
                    background: isBooked ? '#141514' : isWaitlisted ? '#E8A53C' : '#F78DB9',
                    color: isBooked || isWaitlisted ? '#fff' : '#141514',
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    padding: '5px 12px',
                    borderRadius: 100,
                  }}>
                    {isBooked ? '✓ booked' : isWaitlisted ? 'on waitlist' : 'in your schedule'}
                  </div>
                )}

                {/* time row */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#141514', letterSpacing: '-0.005em' }}>{c.time}</span>
                </div>

                {/* title */}
                <h3 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', color: '#141514', lineHeight: 1.1, margin: 0 }}>
                  {c.title}
                </h3>

                {/* coach */}
                <div style={{ fontSize: 14, color: '#707070', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontWeight: 500 }}>with</span>
                  <span style={{ color: '#141514', fontWeight: 600 }}>{c.coach}</span>
                </div>

                {/* slots */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#707070', fontWeight: 500 }}>
                    <span>{slotsLeft} of {c.totalSlots} spots left</span>
                    <span>{c.duration}</span>
                  </div>
                  <div style={{ height: 3, background: '#F5F5F5', borderRadius: 100, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${fillPct}%`, background: fillPct > 85 ? '#F78DB9' : '#141514', borderRadius: 100, transition: 'width 0.4s ease' }} />
                  </div>
                </div>

                {/* signup button */}
                <button
                  onClick={(e) => { e.stopPropagation(); if (isBooked || isWaitlisted) { window.location.href = '/account'; return; } if (!isDimmed) toggleCart(c.id); }}
                  disabled={isDimmed}
                  className={`signup-btn ${inCart ? 'signup-btn-remove' : 'signup-btn-add'}`}
                  style={{
                    marginTop: 4,
                    background: isBooked ? '#141514' : isWaitlisted ? '#E8A53C' : inCart ? (isFull ? '#E8A53C' : '#F78DB9') : '#fff',
                    color: isBooked || isWaitlisted || (inCart && isFull) ? '#fff' : '#141514',
                    border: `1px solid ${isBooked ? '#141514' : isWaitlisted ? '#E8A53C' : inCart ? (isFull ? '#E8A53C' : '#F78DB9') : isFull ? '#E8A53C' : '#E0E0E0'}`,
                    borderRadius: 100,
                    padding: '12px 20px',
                    fontSize: 13,
                    fontWeight: 600,
                    letterSpacing: '-0.005em',
                    cursor: isDimmed ? 'not-allowed' : 'pointer',
                    fontFamily: 'inherit',
                  }}
                >
                  {isBooked ? 'booked — manage in account'
                    : isWaitlisted ? 'on waitlist — manage in account'
                    : inCart ? (isFull ? '✓ joining waitlist' : '✓ added to schedule')
                    : conflictWith ? `clashes with ${conflictWith.title}`
                    : isFull ? 'full — join waitlist'
                    : 'add to schedule'}
                </button>
              </article>
            );
          })}
        </div>
      </section>

      {/* floating cart */}
      {cart.length > 0 && (
        <div style={{
          position: 'fixed',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#141514',
          color: '#fff',
          borderRadius: 4,
          padding: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          boxShadow: '0 16px 48px rgba(0,0,0,0.24)',
          zIndex: 50,
          animation: 'cartSlide 0.3s ease',
          width: 'min(360px, calc(100vw - 32px))',
        }}>
          {/* header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
            <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '-0.005em' }}>
              {cart.length} new {cart.length === 1 ? 'pick' : 'picks'}
              {(bookings.length > 0 || waitlist.length > 0) && (
                <span style={{ color: 'rgba(255,255,255,0.45)', fontWeight: 500 }}>
                  {bookings.length > 0 && <> · {bookings.length} booked</>}
                  {waitlist.length > 0 && <> · {waitlist.length} on waitlist</>}
                </span>
              )}
            </span>
          </div>

          {/* list */}
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {cartClasses.map((c) => (
              <li key={c.id} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
                padding: '8px 10px',
                background: 'rgba(255,255,255,0.04)',
                borderRadius: 4,
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '-0.005em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'flex', alignItems: 'center', gap: 6 }}>
                    {c.title}
                    {c.totalSlots - c.slotsTaken <= 0 && (
                      <span style={{
                        fontSize: 9, fontWeight: 700, color: '#141514', background: '#E8A53C',
                        letterSpacing: '0.1em', textTransform: 'uppercase',
                        padding: '2px 6px', borderRadius: 100,
                      }}>
                        waitlist
                      </span>
                    )}
                  </span>
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', letterSpacing: '-0.005em' }}>
                    {c.time}
                  </span>
                </div>
                <button
                  onClick={() => toggleCart(c.id)}
                  aria-label={`remove ${c.title}`}
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: 'none',
                    color: '#fff',
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontSize: 14,
                    lineHeight: 1,
                    fontFamily: 'inherit',
                    flexShrink: 0,
                    transition: 'background 0.2s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#F78DB9'; e.currentTarget.style.color = '#141514'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#fff'; }}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={handleConfirm}
            style={{
              background: '#fff',
              color: '#141514',
              border: 'none',
              borderRadius: 4,
              padding: '12px 18px',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'inherit',
              letterSpacing: '-0.005em',
              width: '100%',
            }}
          >
            {!user ? 'create account to confirm' : !user.emailVerified ? 'confirm email to book' : 'confirm sign-up'}
          </button>
        </div>
      )}

      {/* toast */}
      {showCartToast && (
        <div style={{
          position: 'fixed',
          top: 100,
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#F78DB9',
          color: '#141514',
          borderRadius: 100,
          padding: '10px 20px',
          fontSize: 13,
          fontWeight: 600,
          zIndex: 60,
          animation: 'cartSlide 0.2s ease',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        }}>
          {showCartToast}
        </div>
      )}

      {/* booked success toast */}
      {confirmedToast && (
        <div style={{
          position: 'fixed',
          top: 100,
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#141514',
          color: '#fff',
          borderRadius: 100,
          padding: '12px 22px',
          fontSize: 13,
          fontWeight: 600,
          zIndex: 60,
          animation: 'cartSlide 0.2s ease',
          boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <span>✓ booked. <a href="/account" style={{ color: '#F78DB9', textDecoration: 'underline' }}>view in account</a></span>
        </div>
      )}

      <AuthModal open={authOpen} onClose={() => { setAuthOpen(false); setAuthReason(undefined); }} initialMode={authMode} reason={authReason} />

      {/* party invite popup */}
      {partyPopupOpen && (
        <div
          onClick={() => { setPartyPopupOpen(false); }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(20,21,20,0.75)',
            backdropFilter: 'blur(8px)',
            zIndex: 110,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
            animation: 'overlayIn 0.25s ease',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#141514',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 24,
              padding: '36px 32px 28px',
              maxWidth: 460,
              width: '100%',
              position: 'relative',
              color: '#fff',
              animation: 'modalIn 0.3s ease',
            }}
          >
            <button
              type="button"
              onClick={() => { setPartyPopupOpen(false); }}
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

            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#F78DB9' }} />
              after dark
            </span>

            <h3 style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1, margin: '0 0 14px', color: '#fff' }}>
              also sign me up for the after-party?
            </h3>

            <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, margin: '0 0 12px' }}>
              don&apos;t worry — there&apos;s no charge, and the after-party doesn&apos;t count as one of your three open play experiences. signing up just lets us know you&apos;re coming so we can plan accordingly.
            </p>
            <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.5)', lineHeight: 1.55, margin: '0 0 24px' }}>
              you can also sign up later — head to <strong style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>party</strong> in the nav bar any time.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button
                type="button"
                onClick={handlePartyChoiceYes}
                style={{
                  width: '100%',
                  padding: '14px 20px',
                  borderRadius: 100,
                  background: 'linear-gradient(135deg, #fff 0%, #F78DB9 100%)',
                  color: '#141514',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: 14,
                  letterSpacing: '-0.005em',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                yes, sign me up
              </button>
              <button
                type="button"
                onClick={handlePartyChoiceNo}
                style={{
                  width: '100%',
                  padding: '14px 20px',
                  borderRadius: 100,
                  background: 'transparent',
                  color: 'rgba(255,255,255,0.7)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  fontWeight: 600,
                  fontSize: 13,
                  letterSpacing: '-0.005em',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                no thanks, just the classes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* modal */}
      {modalClass && (
        <div
          onClick={() => setModalClass(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(20,21,20,0.75)',
            backdropFilter: 'blur(8px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
            animation: 'overlayIn 0.25s ease',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#fff',
              borderRadius: 24,
              maxWidth: 560,
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
              position: 'relative',
              animation: 'modalIn 0.3s ease',
            }}
          >
            {/* logo hero on black */}
            <div style={{ position: 'relative', height: 180, overflow: 'hidden', borderRadius: '24px 24px 0 0', background: '#141514', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src="/images/icons/community-hearts-white.png"
                alt="dopamine games"
                style={{ width: 'auto', height: 96, objectFit: 'contain', opacity: 0.95 }}
              />
            </div>

            <button
              onClick={() => setModalClass(null)}
              className="modal-close"
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                background: 'rgba(0,0,0,0.4)',
                border: 'none',
                color: '#fff',
                width: 36,
                height: 36,
                borderRadius: '50%',
                fontSize: 18,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'inherit',
                lineHeight: 1,
                zIndex: 2,
              }}
              aria-label="close"
            >
              ×
            </button>

            <div style={{ padding: '28px 32px 32px' }}>
              {/* title + time */}
              <h3 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', color: '#141514', lineHeight: 1.05, margin: '0 0 8px' }}>
                {modalClass.title}
              </h3>

              {/* meta row */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 24, fontSize: 13, color: '#707070' }}>
                <span><strong style={{ color: '#141514', fontWeight: 600 }}>{modalClass.time}</strong></span>
                <span>·</span>
                <span>{modalClass.duration}</span>
                <span>·</span>
                <span>{modalClass.totalSlots - modalClass.slotsTaken} of {modalClass.totalSlots} spots left</span>
              </div>

              {/* description */}
              <p style={{ fontSize: 15, color: '#141514', lineHeight: 1.65, margin: '0 0 28px' }}>
                {modalClass.description}
              </p>

              {/* coach block */}
              <div style={{ borderTop: '1px solid #EFEFEF', paddingTop: 24, marginBottom: 28 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#707070', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12 }}>
                  your coach
                </div>
                <div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#141514', letterSpacing: '-0.01em', marginBottom: 4 }}>
                      {modalClass.coach}
                    </div>
                    <p style={{ fontSize: 13, color: '#707070', lineHeight: 1.55, margin: 0 }}>
                      {modalClass.coachBio}
                    </p>
                    {modalClass.instagram && (
                      modalClass.instagram === 'tbd' ? (
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          marginTop: 12,
                          padding: '6px 12px',
                          background: '#F5F5F5',
                          color: '#A0A0A0',
                          borderRadius: 100,
                          fontSize: 12,
                          fontWeight: 600,
                          letterSpacing: '-0.005em',
                        }}>
                          instagram — coming soon
                        </span>
                      ) : (
                        <a
                          href={`https://instagram.com/${modalClass.instagram}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 6,
                            marginTop: 12,
                            padding: '6px 12px',
                            background: '#141514',
                            color: '#fff',
                            borderRadius: 100,
                            fontSize: 12,
                            fontWeight: 600,
                            textDecoration: 'none',
                            letterSpacing: '-0.005em',
                          }}
                        >
                          @{modalClass.instagram} →
                        </a>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* signup from modal */}
              {(() => {
                const added = cart.includes(modalClass.id);
                const modalConflict = !added ? hasConflict(modalClass) : null;
                const disabled = !added && (cart.length >= MAX_CART || !!modalConflict);
                const label = added
                  ? '✓ added to schedule — tap to remove'
                  : modalConflict
                    ? `clashes with ${modalConflict.title}`
                    : cart.length >= MAX_CART
                      ? 'schedule full — remove one to swap'
                      : 'add to schedule';
                return (
                  <button
                    onClick={() => { if (!disabled) toggleCart(modalClass.id); }}
                    disabled={disabled}
                    className={`signup-btn ${added ? 'signup-btn-remove' : 'signup-btn-add'}`}
                    style={{
                      width: '100%',
                      background: disabled ? '#E4E4E4' : added ? '#F78DB9' : '#185BC5',
                      color: disabled ? '#8a8a8a' : added ? '#141514' : '#fff',
                      border: `1px solid ${disabled ? '#E4E4E4' : added ? '#F78DB9' : '#185BC5'}`,
                      borderRadius: 100,
                      padding: '16px 24px',
                      fontSize: 15,
                      fontWeight: 700,
                      cursor: disabled ? 'not-allowed' : 'pointer',
                      fontFamily: 'inherit',
                      letterSpacing: '-0.005em',
                    }}
                  >
                    {label}
                  </button>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
