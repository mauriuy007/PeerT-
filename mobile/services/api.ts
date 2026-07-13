import { Platform } from 'react-native';

const BASE_URL =
  Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

export interface AuthResponse {
  token: string;
  user: { id: number; email: string; name: string; lastName: string };
}

async function request<T>(path: string, options: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...options.headers },
    });
  } catch {
    throw new Error('No se pudo conectar con el servidor. Verifica tu conexión.');
  }
  if (res.status === 204) return undefined as T;
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.error ?? body.errors?.[0] ?? 'Error desconocido');
  return body as T;
}

/** Same as `request`, but attaches the Bearer token required by every route behind `authenticate`. */
function authedRequest<T>(path: string, token: string, options: RequestInit = {}): Promise<T> {
  return request<T>(path, {
    ...options,
    headers: { Authorization: `Bearer ${token}`, ...options.headers },
  });
}

export const authApi = {
  login: (email: string, password: string) =>
    request<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (name: string, lastName: string, email: string, password: string) =>
    request<AuthResponse>('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ name, lastName, email, password }),
    }),

  socialLogin: (provider: 'apple' | 'google', payload: {
    idToken: string;
    email?: string;
    name?: string;
    lastName?: string;
  }) =>
    request<AuthResponse>('/api/auth/social', {
      method: 'POST',
      body: JSON.stringify({ provider, ...payload }),
    }),
};

// ---------------------------------------------------------------------------
// Trips / Destinations / Itinerary
//
// Shapes below mirror prisma/schema.prisma + the Joi validators in
// src/validators/{tripValidator,destinationValidator,itineraryValidator}.ts
// exactly (read from source, not guessed). Notable backend quirks that shape
// this file:
//  - createTripSchema requires `ownerId` in the body even though tripService
//    ignores it and derives the real owner from the authenticated user. We
//    still send the logged-in user's id to satisfy validation.
//  - Trip has NO `description` column/field anywhere in the schema/validator,
//    so it is intentionally not part of CreateTripInput.
//  - Destination has NO relation to Trip and NO date fields. The only way to
//    persist "this destination belongs to this trip" is via an
//    ItineraryItem (tripId + destinationId + date + name + description).
// ---------------------------------------------------------------------------

export type TripParticipantRole = 'OWNER' | 'MEMBER';

export interface TripParticipant {
  id: number;
  userId: number;
  tripId: number;
  role: TripParticipantRole;
  joinedAt: string;
}

export interface Trip {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  participants: TripParticipant[];
}

export interface Destination {
  id: number;
  city: string;
  country: string;
  countryCode: string;
  latitude: number;
  longitude: number;
  timezone: string;
  description?: string | null;
  imageUrl?: string | null;
  externalId?: string | null;
}

export interface ItineraryItem {
  id: number;
  tripId: number;
  date: string;
  destinationId: number;
  name: string;
  description: string;
  destination?: Destination;
}

export interface TripDetail extends Trip {
  bookings: unknown[];
  expenses: unknown[];
  itineraryItems: ItineraryItem[];
}

export interface CreateTripInput {
  name: string;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  ownerId: number;
}

export interface CreateDestinationInput {
  city: string;
  country: string;
  countryCode: string; // 2-letter, uppercase
  latitude: number;
  longitude: number;
  timezone: string;
}

export interface CreateItineraryItemInput {
  tripId: number;
  date: string;
  destinationId: number;
  name: string;
  description: string;
}

export const tripsApi = {
  list: (token: string) => authedRequest<Trip[]>('/api/trips', token),

  create: (token: string, data: CreateTripInput) =>
    authedRequest<Trip>('/api/trips', token, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getById: (token: string, id: number) =>
    authedRequest<TripDetail>(`/api/trips/${id}`, token),
};

export const destinationsApi = {
  create: (token: string, data: CreateDestinationInput) =>
    authedRequest<Destination>('/api/destinations', token, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

export const itineraryApi = {
  create: (token: string, data: CreateItineraryItemInput) =>
    authedRequest<ItineraryItem>('/api/itinerary', token, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};
