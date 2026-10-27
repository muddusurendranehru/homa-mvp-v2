/** Mock nearby places for Hyderabad / Telangana — no external Places API required. */

export type NearbyPlace = {
  id: string;
  name: string;
  address: string;
  phone: string;
  lat: number;
  lng: number;
};

/** Gachibowli — used when geolocation is denied or unavailable */
export const HYDERABAD_FALLBACK = { lat: 17.4487, lng: 78.3987 };

/** Sample listings (3 each). Replace via Google Places when API key is configured. */
export const MOCK_LABS: NearbyPlace[] = [
  {
    id: 'lab-1',
    name: 'Thyrocare — Gachibowli Collection Center',
    address: 'Plot 12, Telecom Nagar, Gachibowli, Hyderabad, Telangana 500032',
    phone: '04040111111',
    lat: 17.4401,
    lng: 78.3489,
  },
  {
    id: 'lab-2',
    name: 'Dr. Lal PathLabs — Madhapur',
    address: 'Mindspace Road, Madhapur, Hyderabad, Telangana 500081',
    phone: '04023456789',
    lat: 17.4485,
    lng: 78.3908,
  },
  {
    id: 'lab-3',
    name: 'Metropolis Healthcare — Kondapur',
    address: 'Kothaguda X Roads, Kondapur, Hyderabad, Telangana 500084',
    phone: '04044556677',
    lat: 17.4612,
    lng: 78.3662,
  },
];

export const MOCK_PHARMACIES: NearbyPlace[] = [
  {
    id: 'ph-1',
    name: 'Apollo Pharmacy — Gachibowli',
    address: 'Gachibowli Main Road, Hyderabad, Telangana 500032',
    phone: '04040112233',
    lat: 17.4462,
    lng: 78.3567,
  },
  {
    id: 'ph-2',
    name: 'MedPlus — Madhapur',
    address: 'Hitech City Road, Madhapur, Hyderabad, Telangana 500081',
    phone: '04044557788',
    lat: 17.4501,
    lng: 78.3912,
  },
  {
    id: 'ph-3',
    name: 'Wellness Forever — Kondapur',
    address: 'Kondapur Junction, Hyderabad, Telangana 500084',
    phone: '04033445566',
    lat: 17.4588,
    lng: 78.3711,
  },
];

const RADIUS_KM = 6371;

function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}

/** Great-circle distance in km */
export function distanceKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return RADIUS_KM * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function formatDistanceKm(km: number): string {
  if (km < 1) return `${Math.round(km * 1000)} m`;
  return `${km.toFixed(1)} km`;
}

export function googleMapsDirectionsUrl(address: string): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
}

export function telHref(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) return `tel:+91${digits}`;
  if (digits.startsWith('91') && digits.length === 12) return `tel:+${digits}`;
  return `tel:${digits}`;
}

export type PlaceWithDistance = NearbyPlace & { distanceKm: number };

export function sortPlacesByDistance(
  places: NearbyPlace[],
  originLat: number,
  originLng: number,
  searchQuery?: string,
): PlaceWithDistance[] {
  const q = searchQuery?.trim().toLowerCase() ?? '';
  return places
    .filter(
      (p) =>
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q),
    )
    .map((p) => ({
      ...p,
      distanceKm: distanceKm(originLat, originLng, p.lat, p.lng),
    }))
    .sort((a, b) => a.distanceKm - b.distanceKm);
}

/**
 * Nearby places data source. Today: static Hyderabad samples.
 * Future: call Google Places (or similar) when `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY` is set.
 */
export async function fetchNearbyPlaces(
  kind: 'lab' | 'pharmacy',
  _lat: number,
  _lng: number,
): Promise<NearbyPlace[]> {
  void _lat;
  void _lng;
  // if (process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY) { ... }
  return kind === 'lab' ? MOCK_LABS : MOCK_PHARMACIES;
}
