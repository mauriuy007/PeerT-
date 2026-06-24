const API_KEY = process.env.GOOGLE_PLACES_API_KEY!;
const PLACES_BASE = 'https://places.googleapis.com/v1';
const TIMEZONE_BASE = 'https://maps.googleapis.com/maps/api/timezone/json';

export interface CitySearchResult {
  placeId: string;
  displayName: string;
  formattedAddress: string;
}

export interface PlaceDestinationDetails {
  placeId: string;
  city: string;
  country: string;
  countryCode: string;
  latitude: number;
  longitude: number;
  timezone: string;
  imageUrl: string | null;
  description: string | null;
}

export async function searchCities(query: string): Promise<CitySearchResult[]> {
  const res = await fetch(`${PLACES_BASE}/places:autocomplete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': API_KEY,
    },
    body: JSON.stringify({
      input: query,
      includedPrimaryTypes: ['(cities)'],
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Places autocomplete error ${res.status}: ${body}`);
  }

  const data = (await res.json()) as any;

  return (data.suggestions ?? []).map((s: any) => ({
    placeId: s.placePrediction.placeId,
    displayName: s.placePrediction.structuredFormat?.mainText?.text ?? s.placePrediction.text.text,
    formattedAddress: s.placePrediction.text.text,
  }));
}

export async function getDestinationDetails(placeId: string): Promise<PlaceDestinationDetails> {
  const res = await fetch(`${PLACES_BASE}/places/${placeId}`, {
    headers: {
      'X-Goog-Api-Key': API_KEY,
      'X-Goog-FieldMask': 'displayName,addressComponents,location,photos,editorialSummary',
    },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Place details error ${res.status}: ${body}`);
  }

  const place = (await res.json()) as any;

  let country = '';
  let countryCode = '';
  for (const comp of place.addressComponents ?? []) {
    if (comp.types.includes('country')) {
      country = comp.longText;
      countryCode = comp.shortText;
    }
  }

  const latitude: number = place.location.latitude;
  const longitude: number = place.location.longitude;

  const [timezone, imageUrl] = await Promise.all([
    fetchTimezone(latitude, longitude),
    fetchPhotoUrl(place.photos?.[0]?.name),
  ]);

  return {
    placeId,
    city: place.displayName?.text ?? '',
    country,
    countryCode,
    latitude,
    longitude,
    timezone,
    imageUrl,
    description: place.editorialSummary?.text ?? null,
  };
}

async function fetchTimezone(lat: number, lng: number): Promise<string> {
  const timestamp = Math.floor(Date.now() / 1000);
  const url = `${TIMEZONE_BASE}?location=${lat},${lng}&timestamp=${timestamp}&key=${API_KEY}`;
  try {
    const res = await fetch(url);
    if (!res.ok) return 'UTC';
    const data = (await res.json()) as any;
    return data.timeZoneId ?? 'UTC';
  } catch {
    return 'UTC';
  }
}

async function fetchPhotoUrl(photoName?: string): Promise<string | null> {
  if (!photoName) return null;
  try {
    const url = `${PLACES_BASE}/${photoName}/media?key=${API_KEY}&maxHeightPx=800&maxWidthPx=1200&skipHttpRedirect=true`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = (await res.json()) as any;
    return data.photoUri ?? null;
  } catch {
    return null;
  }
}
