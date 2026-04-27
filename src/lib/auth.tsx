'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

export type User = {
  id: string;
  name: string;
  email: string;
  instagram?: string;
  emailVerified: boolean;
  createdAt: string;
};

export type Booking = {
  id: string;
  experienceId: string;
  title: string;
  place: string;
  time: string;
  coach: string;
  bookedAt: string;
};

export type EmailNotification = {
  id: string;
  type: 'waitlist_promoted';
  subject: string;
  preview: string;
  body: string;
  experienceId: string;
  createdAt: string;
  read: boolean;
};

type AuthCtx = {
  user: User | null;
  bookings: Booking[];
  waitlist: Booking[];
  notifications: EmailNotification[];
  loading: boolean;
  pendingCode: string | null;
  signUp: (input: { name: string; email: string; instagram?: string }) => Promise<{ codeForDemo: string }>;
  signIn: (email: string) => Promise<{ codeForDemo: string } | { verified: true }>;
  verifyCode: (code: string) => Promise<void>;
  resendCode: () => Promise<{ codeForDemo: string }>;
  signOut: () => void;
  addBookings: (items: Array<Omit<Booking, 'id' | 'bookedAt'>>) => void;
  removeBooking: (id: string) => { promoted?: { name: string; email: string; title: string } } | void;
  joinWaitlist: (items: Array<Omit<Booking, 'id' | 'bookedAt'>>) => void;
  leaveWaitlist: (id: string) => void;
  markNotificationRead: (id: string) => void;
  refreshFromStorage: () => void;
};

const Ctx = createContext<AuthCtx | null>(null);

const USER_KEY = 'dopamine.user';
const USERS_KEY = 'dopamine.users';
const CODES_KEY = 'dopamine.verifyCodes';
const bookingsKey = (uid: string) => `dopamine.bookings.${uid}`;
const waitlistKey = (uid: string) => `dopamine.waitlist.${uid}`;
const notificationsKey = (uid: string) => `dopamine.notifications.${uid}`;
const queueKey = (experienceId: string) => `dopamine.classQueue.${experienceId}`;

type CodeRecord = { code: string; createdAt: string };

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

function readUsersDir(): Record<string, User> {
  return readJson<Record<string, User>>(USERS_KEY, {});
}

function writeUsersDir(dir: Record<string, User>) {
  writeJson(USERS_KEY, dir);
}

function readCodes(): Record<string, CodeRecord> {
  return readJson<Record<string, CodeRecord>>(CODES_KEY, {});
}

function writeCodes(c: Record<string, CodeRecord>) {
  writeJson(CODES_KEY, c);
}

function genId(prefix: string) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function genCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function findUserById(uid: string): User | null {
  const dir = readUsersDir();
  return Object.values(dir).find((u) => u.id === uid) || null;
}

function tryPromoteWaitlistFor(experienceId: string): { user: User; experience: Booking } | null {
  const queue = readJson<string[]>(queueKey(experienceId), []);
  while (queue.length > 0) {
    const nextUid = queue.shift()!;
    const wl = readJson<Booking[]>(waitlistKey(nextUid), []);
    const entry = wl.find((w) => w.experienceId === experienceId);
    if (!entry) continue;
    const promotedUser = findUserById(nextUid);
    if (!promotedUser) continue;

    writeJson(waitlistKey(nextUid), wl.filter((w) => w.experienceId !== experienceId));

    const bookings = readJson<Booking[]>(bookingsKey(nextUid), []);
    const promoted: Booking = { ...entry, id: genId('b'), bookedAt: new Date().toISOString() };
    writeJson(bookingsKey(nextUid), [...bookings, promoted]);

    const notifs = readJson<EmailNotification[]>(notificationsKey(nextUid), []);
    const note: EmailNotification = {
      id: genId('n'),
      type: 'waitlist_promoted',
      subject: `you're in — ${entry.title} just opened up`,
      preview: `a spot opened in ${entry.title} at ${entry.time}. we locked it in for you.`,
      body: `hi ${promotedUser.name.split(' ')[0]},\n\ngreat news — a spot just opened up in ${entry.title} (${entry.time}) at the ${entry.place}, and you were next on the waitlist. we automatically booked you in.\n\nyour seat is locked. see you with ${entry.coach}.\n\n— the dopamine games team`,
      experienceId,
      createdAt: new Date().toISOString(),
      read: false,
    };
    writeJson(notificationsKey(nextUid), [...notifs, note]);

    writeJson(queueKey(experienceId), queue);
    return { user: promotedUser, experience: promoted };
  }
  writeJson(queueKey(experienceId), queue);
  return null;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [waitlist, setWaitlist] = useState<Booking[]>([]);
  const [notifications, setNotifications] = useState<EmailNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [pendingCode, setPendingCode] = useState<string | null>(null);

  const hydrateFor = (u: User) => {
    setBookings(readJson<Booking[]>(bookingsKey(u.id), []));
    setWaitlist(readJson<Booking[]>(waitlistKey(u.id), []));
    setNotifications(readJson<EmailNotification[]>(notificationsKey(u.id), []));
  };

  useEffect(() => {
    try {
      const raw = localStorage.getItem(USER_KEY);
      if (raw) {
        const u: User = JSON.parse(raw);
        setUser(u);
        hydrateFor(u);
        if (!u.emailVerified) {
          const codes = readCodes();
          if (codes[u.id]) setPendingCode(codes[u.id].code);
        }
      }
    } catch {}
    setLoading(false);
  }, []);

  const persistBookings = (uid: string, items: Booking[]) => {
    writeJson(bookingsKey(uid), items);
  };

  const persistWaitlist = (uid: string, items: Booking[]) => {
    writeJson(waitlistKey(uid), items);
  };

  const persistNotifications = (uid: string, items: EmailNotification[]) => {
    writeJson(notificationsKey(uid), items);
  };

  const refreshFromStorage = useCallback(() => {
    if (!user) return;
    hydrateFor(user);
  }, [user]);

  const issueCode = (uid: string): string => {
    const codes = readCodes();
    const code = genCode();
    codes[uid] = { code, createdAt: new Date().toISOString() };
    writeCodes(codes);
    setPendingCode(code);
    return code;
  };

  const clearCode = (uid: string) => {
    const codes = readCodes();
    delete codes[uid];
    writeCodes(codes);
    setPendingCode(null);
  };

  const signUp: AuthCtx['signUp'] = useCallback(async ({ name, email, instagram }) => {
    const cleanEmail = email.trim().toLowerCase();
    const dir = readUsersDir();
    const existing = dir[cleanEmail];
    if (existing) {
      writeJson(USER_KEY, existing);
      setUser(existing);
      hydrateFor(existing);
      if (!existing.emailVerified) {
        const code = issueCode(existing.id);
        return { codeForDemo: code };
      }
      return { codeForDemo: '' };
    }
    const u: User = {
      id: genId('u'),
      name: name.trim(),
      email: cleanEmail,
      instagram: instagram?.trim() || undefined,
      emailVerified: false,
      createdAt: new Date().toISOString(),
    };
    dir[cleanEmail] = u;
    writeUsersDir(dir);
    writeJson(USER_KEY, u);
    setUser(u);
    setBookings([]);
    setWaitlist([]);
    setNotifications([]);
    persistBookings(u.id, []);
    persistWaitlist(u.id, []);
    persistNotifications(u.id, []);
    const code = issueCode(u.id);
    return { codeForDemo: code };
  }, []);

  const signIn: AuthCtx['signIn'] = useCallback(async (email) => {
    const cleanEmail = email.trim().toLowerCase();
    const dir = readUsersDir();
    const existing = dir[cleanEmail];
    if (!existing) throw new Error('no account found for that email — create one instead');
    writeJson(USER_KEY, existing);
    setUser(existing);
    hydrateFor(existing);
    if (!existing.emailVerified) {
      const code = issueCode(existing.id);
      return { codeForDemo: code };
    }
    return { verified: true };
  }, []);

  const verifyCode: AuthCtx['verifyCode'] = useCallback(async (code) => {
    if (!user) throw new Error('not signed in');
    const codes = readCodes();
    const rec = codes[user.id];
    if (!rec) throw new Error('no pending code — request a new one');
    if (rec.code !== code.trim()) throw new Error('that code doesn\'t match');
    const verified: User = { ...user, emailVerified: true };
    const dir = readUsersDir();
    dir[verified.email] = verified;
    writeUsersDir(dir);
    writeJson(USER_KEY, verified);
    setUser(verified);
    clearCode(verified.id);
  }, [user]);

  const resendCode: AuthCtx['resendCode'] = useCallback(async () => {
    if (!user) throw new Error('not signed in');
    const code = issueCode(user.id);
    return { codeForDemo: code };
  }, [user]);

  const signOut: AuthCtx['signOut'] = useCallback(() => {
    localStorage.removeItem(USER_KEY);
    setUser(null);
    setBookings([]);
    setWaitlist([]);
    setNotifications([]);
    setPendingCode(null);
  }, []);

  const addBookings: AuthCtx['addBookings'] = useCallback((items) => {
    setBookings((prev) => {
      const seen = new Set(prev.map((p) => p.experienceId));
      const fresh: Booking[] = items
        .filter((i) => !seen.has(i.experienceId))
        .map((i) => ({ ...i, id: genId('b'), bookedAt: new Date().toISOString() }));
      const next = [...prev, ...fresh];
      if (user) persistBookings(user.id, next);
      return next;
    });
  }, [user]);

  const removeBooking: AuthCtx['removeBooking'] = useCallback((id) => {
    if (!user) return;
    const removed = bookings.find((b) => b.id === id);
    const nextBookings = bookings.filter((b) => b.id !== id);
    setBookings(nextBookings);
    persistBookings(user.id, nextBookings);
    if (!removed) return;
    const promotion = tryPromoteWaitlistFor(removed.experienceId);
    if (!promotion) return;
    if (promotion.user.id === user.id) {
      hydrateFor(user);
    }
    return { promoted: { name: promotion.user.name, email: promotion.user.email, title: removed.title } };
  }, [user, bookings]);

  const joinWaitlist: AuthCtx['joinWaitlist'] = useCallback((items) => {
    if (!user) return;
    setWaitlist((prev) => {
      const seenW = new Set(prev.map((p) => p.experienceId));
      const fresh: Booking[] = items
        .filter((i) => !seenW.has(i.experienceId))
        .map((i) => ({ ...i, id: genId('w'), bookedAt: new Date().toISOString() }));
      const next = [...prev, ...fresh];
      persistWaitlist(user.id, next);
      for (const f of fresh) {
        const q = readJson<string[]>(queueKey(f.experienceId), []);
        if (!q.includes(user.id)) {
          q.push(user.id);
          writeJson(queueKey(f.experienceId), q);
        }
      }
      return next;
    });
  }, [user]);

  const leaveWaitlist: AuthCtx['leaveWaitlist'] = useCallback((id) => {
    if (!user) return;
    const entry = waitlist.find((w) => w.id === id);
    const next = waitlist.filter((b) => b.id !== id);
    setWaitlist(next);
    persistWaitlist(user.id, next);
    if (entry) {
      const q = readJson<string[]>(queueKey(entry.experienceId), []);
      writeJson(queueKey(entry.experienceId), q.filter((uid) => uid !== user.id));
    }
  }, [user, waitlist]);

  const markNotificationRead: AuthCtx['markNotificationRead'] = useCallback((id) => {
    if (!user) return;
    setNotifications((prev) => {
      const next = prev.map((n) => (n.id === id ? { ...n, read: true } : n));
      persistNotifications(user.id, next);
      return next;
    });
  }, [user]);

  return (
    <Ctx.Provider value={{
      user, bookings, waitlist, notifications, loading, pendingCode,
      signUp, signIn, verifyCode, resendCode, signOut,
      addBookings, removeBooking, joinWaitlist, leaveWaitlist,
      markNotificationRead, refreshFromStorage,
    }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
