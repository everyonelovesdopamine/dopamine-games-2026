const API_URL = process.env.NEXT_PUBLIC_API_URL;
const EVENT_ID = process.env.NEXT_PUBLIC_EVENT_ID;

export async function dashboardFetch<T = unknown>(path: string, options: RequestInit = {}): Promise<T> {
  if (!API_URL) throw new Error('NEXT_PUBLIC_API_URL is not configured');
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers as Record<string, string> | undefined) },
  });
  if (!res.ok) {
    let msg = `API error: ${res.status}`;
    try { const b = await res.json(); if (b.error) msg = b.error; } catch {}
    throw new Error(msg);
  }
  return res.json() as Promise<T>;
}

function eventPath(suffix: string = '') {
  if (!EVENT_ID) throw new Error('NEXT_PUBLIC_EVENT_ID is not configured');
  return `/api/events/${EVENT_ID}${suffix}`;
}

export async function registerAthlete(data: {
  athlete_name: string; athlete_email: string; athlete_phone?: string;
  team_name?: string; partner_name?: string; competition_category: string;
  tshirt_size: string; emergency_contact_name: string; emergency_contact_phone: string;
  emergency_contact_relationship: string; waiver_signed: boolean;
}) {
  return dashboardFetch<{ data: { registrationId: string; checkoutUrl?: string } }>(
    eventPath('/registrations'), { method: 'POST', body: JSON.stringify(data) }
  );
}

export async function getBookingSlots() {
  return dashboardFetch<{ data: Array<{
    experience_name: string; slot_date: string; slot_time: string;
    capacity: number; booked: number; available: number;
  }> }>(eventPath('/bookings?view=slots'));
}

export async function createBooking(data: {
  athlete_email: string; athlete_name: string; account_type: string;
  slot_date: string; slot_time: string; experience_name: string;
}) {
  return dashboardFetch(eventPath('/bookings'), { method: 'POST', body: JSON.stringify(data) });
}

export async function getLeaderboard(filters?: { discipline?: string; category?: string }) {
  const p = new URLSearchParams();
  if (filters?.discipline) p.set('discipline', filters.discipline);
  if (filters?.category) p.set('category', filters.category);
  const q = p.toString();
  return dashboardFetch<{ data: Array<{
    rank: number; athlete_name: string; team_name?: string;
    discipline: string; score: number; unit: string;
  }> }>(eventPath(`/scores${q ? `?${q}` : ''}`));
}

export async function getSponsors() {
  return dashboardFetch<{ data: Array<{
    sponsor_id: string; sponsor_name: string; logo_url: string;
    website_url?: string; tier: string;
  }> }>(eventPath('/sponsors'));
}

export async function createAccount(data: { name: string; email: string; phone?: string }) {
  return dashboardFetch(eventPath('/accounts'), { method: 'POST', body: JSON.stringify(data) });
}

export async function getEvent() {
  return dashboardFetch<{ data: {
    event_id: string; event_name: string; start_date: string;
    registration_open: boolean; max_athletes?: number;
  } }>(eventPath());
}
