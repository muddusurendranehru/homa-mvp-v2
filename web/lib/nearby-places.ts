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
  {
    id: 'lab-4',
    name: 'Apollo Diagnostics — Financial District',
    address: 'Nanakramguda, Financial District, Hyderabad, Telangana 500032',
    phone: '04066778899',
    lat: 17.4239,
    lng: 78.3418,
  },
  {
    id: 'lab-5',
    name: 'Vijaya Diagnostic Centre — Ameerpet',
    address: 'Ameerpet Main Road, Hyderabad, Telangana 500016',
    phone: '04027654321',
    lat: 17.4375,
    lng: 78.4482,
  },
  {
    id: 'lab-6',
    name: 'Lucid Medical Diagnostics — Secunderabad',
    address: 'SP Road, Secunderabad, Telangana 500003',
    phone: '04027891234',
    lat: 17.4399,
    lng: 78.4983,
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
  {
    id: 'ph-4',
    name: 'Netmeds Store — Jubilee Hills',
    address: 'Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033',
    phone: '04066770011',
    lat: 17.4326,
    lng: 78.4071,
  },
  {
    id: 'ph-5',
    name: 'Guardian Pharmacy — Banjara Hills',
    address: 'Banjara Hills Road No. 12, Hyderabad, Telangana 500034',
    phone: '04023334455',
    lat: 17.4156,
    lng: 78.4487,
  },
  {
    id: 'ph-6',
    name: 'Trust Chemists — Secunderabad',
    address: 'MG Road, Secunderabad, Telangana 500003',
    phone: '04027880099',
    lat: 17.4419,
    lng: 78.5021,
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
