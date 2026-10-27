'use client';

import { useCallback, useMemo, useState } from 'react';
import {
  HYDERABAD_FALLBACK,
  MOCK_LABS,
  MOCK_PHARMACIES,
  NearbyPlace,
  formatDistanceKm,
  googleMapsDirectionsUrl,
  sortPlacesByDistance,
  telHref,
} from '@/lib/nearby-places';

export type PartnerLink = { label: string; href: string };

type Props = {
  kind: 'lab' | 'pharmacy';
  pageTitle: string;
  intro: string;
  partnersTitle: string;
  partners: PartnerLink[];
  onlineBannerTitle?: string;
};

export default function NearbyPlacesFinder({
  kind,
  pageTitle,
  intro,
  partnersTitle,
  partners,
  onlineBannerTitle,
}: Props) {
  const places: NearbyPlace[] = kind === 'lab' ? MOCK_LABS : MOCK_PHARMACIES;
  const [search, setSearch] = useState('');
  const [origin, setOrigin] = useState<{ lat: number; lng: number } | null>(null);
  const [locationNote, setLocationNote] = useState<string | null>(null);
  const [locating, setLocating] = useState(false);

  const useMyLocation = useCallback(() => {
    setLocating(true);
    setLocationNote(null);
    if (!navigator.geolocation) {
      setOrigin(HYDERABAD_FALLBACK);
      setLocationNote('Geolocation is not supported in this browser. Showing sample locations near Gachibowli.');
      setLocating(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setOrigin({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocationNote('Showing locations sorted by distance from your position.');
        setLocating(false);
      },
      () => {
        setOrigin(HYDERABAD_FALLBACK);
        setLocationNote(
          kind === 'lab'
            ? 'Location access was denied or unavailable. Showing sample diagnostic centers near Gachibowli, Hyderabad.'
            : 'Location access was denied or unavailable. Showing sample pharmacies near Gachibowli, Hyderabad.',
        );
        setLocating(false);
      },
      { enableHighAccuracy: false, timeout: 12000, maximumAge: 300000 },
    );
  }, [kind]);

  const sorted = useMemo(() => {
    const lat = origin?.lat ?? HYDERABAD_FALLBACK.lat;
    const lng = origin?.lng ?? HYDERABAD_FALLBACK.lng;
    return sortPlacesByDistance(places, lat, lng, search);
  }, [places, origin, search]);

  const showDefaultList = !origin && !search.trim();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold text-slate-900">{pageTitle}</h1>
          <p className="mt-3 text-slate-600">{intro}</p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        <section className="bg-white rounded-2xl shadow-md border border-slate-100 p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[#0D9488]">
            {partnersTitle}
          </h2>
          {onlineBannerTitle && (
            <p className="mt-1 text-lg font-semibold text-slate-800">{onlineBannerTitle}</p>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            {partners.map((p) => (
              <a
                key={p.href}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-xl border border-[#0D9488]/30 bg-teal-50 px-4 py-2 text-sm font-medium text-[#0D9488] hover:bg-teal-100 transition-colors"
              >
                {p.label}
              </a>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl shadow-md border border-slate-100 p-5">
          <label htmlFor="place-search" className="block text-sm font-medium text-slate-700">
            Search by name or area
          </label>
          <div className="mt-2 flex flex-col sm:flex-row gap-3">
            <input
              id="place-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={kind === 'lab' ? 'e.g. Gachibowli, Thyrocare…' : 'e.g. Madhapur, MedPlus…'}
              className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-slate-900 shadow-sm focus:border-[#0D9488] focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20"
            />
            <button
              type="button"
              onClick={useMyLocation}
              disabled={locating}
              className="rounded-xl bg-[#0D9488] px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-teal-700 disabled:opacity-60 transition-colors"
            >
              {locating ? 'Locating…' : 'Use My Location'}
            </button>
          </div>
          {locationNote && (
            <p className="mt-3 text-sm text-slate-600 bg-teal-50 border border-teal-100 rounded-lg px-3 py-2">
              {locationNote}
            </p>
          )}
          {showDefaultList && (
            <p className="mt-3 text-sm text-slate-500">
              Tap &quot;Use My Location&quot; to sort by distance, or search above. Sample listings are for
              education only — confirm hours and services with the lab or pharmacy directly.
            </p>
          )}
        </section>

        <ul className="space-y-4">
          {sorted.map((place) => (
            <li
              key={place.id}
              className="bg-white rounded-2xl shadow-md border border-slate-100 p-5"
            >
              <h3 className="text-lg font-semibold text-slate-900">{place.name}</h3>
              <p className="mt-1 text-sm text-slate-600">{place.address}</p>
              <p className="mt-2 text-sm font-medium text-[#0D9488]">
                {origin || search.trim()
                  ? `~${formatDistanceKm(place.distanceKm)} away`
                  : 'Distance shown after you use location or search'}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={telHref(place.phone)}
                  className="inline-flex rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-200"
                >
                  Call
                </a>
                <a
                  href={googleMapsDirectionsUrl(place.address)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-xl bg-[#0D9488] px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700"
                >
                  Get Directions
                </a>
              </div>
            </li>
          ))}
          {sorted.length === 0 && (
            <li className="text-center text-slate-500 py-8">No matches for your search.</li>
          )}
        </ul>
      </main>
    </div>
  );
}
