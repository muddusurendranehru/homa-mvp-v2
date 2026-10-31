'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  HYDERABAD_FALLBACK,
  NearbyPlace,
  formatDistanceKm,
  sortPlacesByDistance,
  telHref,
} from '@/lib/nearby-places';
import { buildStaffGuideWhatsAppUrl } from '@/lib/homa-contact';
import { mapsDirectionsUrl } from '@/utils/maps';

export type PartnerLink = {
  label: string;
  href: string;
  buttonLabel: string;
};

type Props = {
  kind: 'lab' | 'pharmacy';
  pageTitle: string;
  intro: string;
  partnersSectionTitle: string;
  partners: PartnerLink[];
  nearYouSectionTitle: string;
};

export default function NearbyPlacesFinder({
  kind,
  pageTitle,
  intro,
  partnersSectionTitle,
  partners,
  nearYouSectionTitle,
}: Props) {
  const [labs, setLabs] = useState<NearbyPlace[]>([]);
  const [pharmacies, setPharmacies] = useState<NearbyPlace[]>([]);
  const [placesLoaded, setPlacesLoaded] = useState(false);
  const places: NearbyPlace[] = kind === 'lab' ? labs : pharmacies;
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

  useEffect(() => {
    function mapPlace(row: Record<string, unknown>): NearbyPlace {
      return {
        id: String(row.id ?? ''),
        name: row.name == null ? '' : String(row.name),
        address: row.address == null ? '' : String(row.address),
        phone: row.phone == null ? '' : String(row.phone),
        lat: Number(row.lat),
        lng: Number(row.lng),
      };
    }

    async function loadPlaces() {
      const res = await fetch('/api/nearby-places');
      if (!res.ok) {
        const detail = await res.text().catch(() => '');
        throw new Error(`nearby-places ${res.status} ${detail}`);
      }
      const data = (await res.json()) as { places?: unknown } | unknown[];
      const rows = Array.isArray(data) ? data : data.places;
      if (!Array.isArray(rows)) {
        throw new Error('nearby-places response missing places array');
      }

      const nextLabs: NearbyPlace[] = [];
      const nextPharmacies: NearbyPlace[] = [];
      for (const raw of rows) {
        if (!raw || typeof raw !== 'object') continue;
        const row = raw as Record<string, unknown>;
        const placeKind = String(row.kind ?? '').trim().toLowerCase();
        const place = mapPlace(row);
        if (placeKind === 'lab') nextLabs.push(place);
        else if (placeKind === 'pharmacy') nextPharmacies.push(place);
      }

      setLabs(nextLabs);
      setPharmacies(nextPharmacies);
    }

    loadPlaces()
      .catch((error) => {
        console.error('Failed to load nearby places', error);
      })
      .finally(() => {
        setPlacesLoaded(true);
      });
  }, []);

  const sorted = useMemo(() => {
    const lat = origin?.lat ?? HYDERABAD_FALLBACK.lat;
    const lng = origin?.lng ?? HYDERABAD_FALLBACK.lng;
    return sortPlacesByDistance(places, lat, lng, search);
  }, [places, origin, search]);

  const showDistance = Boolean(origin || search.trim());

  const runSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);

  return (
    <div className="w-full space-y-8">
      <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-3xl font-bold text-slate-900">{pageTitle}</h1>
        <p className="mt-3 text-slate-600">{intro}</p>
      </header>

      <div className="space-y-8">
        <section className="bg-white rounded-2xl shadow-md border border-slate-100 p-6">
          <h2 className="text-lg font-bold text-slate-900">{partnersSectionTitle}</h2>
          <p className="mt-1 text-sm text-slate-600">
            {kind === 'lab'
              ? 'Book a home sample collection with a trusted partner (links open in a new tab).'
              : 'Order medicines online from verified storefronts (links open in a new tab).'}
          </p>
          <ul className="mt-5 space-y-3">
            {partners.map((p) => (
              <li
                key={p.label}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3 shadow-sm"
              >
                <span className="font-semibold text-slate-800">{p.label}</span>
                <a
                  href={p.href}
                  {...(p.href !== '#'
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  className="inline-flex justify-center rounded-xl bg-[#0D9488] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-700 transition-colors"
                >
                  {p.buttonLabel}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white rounded-2xl shadow-md border border-slate-100 p-6">
          <h2 className="text-lg font-bold text-slate-900">{nearYouSectionTitle}</h2>
          <p className="mt-1 text-sm text-slate-600">
            Listings from the HOMA places directory.
          </p>
          <p className="mt-2 text-sm text-[#0D9488]">
            Not sure which location to choose? HOMA staff can guide you on WhatsApp — tap WhatsApp on any card below.
          </p>
          <label htmlFor="place-search" className="mt-4 block text-sm font-medium text-slate-700">
            Search by name or area
          </label>
          <div className="mt-2 flex flex-col sm:flex-row gap-3">
            <input
              id="place-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  runSearch(e.currentTarget.value);
                }
              }}
              placeholder={kind === 'lab' ? 'e.g. Gachibowli, Thyrocare…' : 'e.g. Madhapur, MedPlus…'}
              className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-slate-900 shadow-sm focus:border-[#0D9488] focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20"
            />
            <button
              type="button"
              onClick={() => runSearch(search)}
              className="rounded-xl border border-[#0D9488] bg-white px-5 py-3 text-sm font-semibold text-[#0D9488] shadow-sm hover:bg-teal-50 transition-colors"
            >
              Search
            </button>
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
          {!showDistance && (
            <p className="mt-3 text-sm text-slate-500">
              Tap &quot;Use My Location&quot; to sort by distance. Confirm hours and services with each location
              directly.
            </p>
          )}
        </section>

        <ul className="space-y-4" aria-label={nearYouSectionTitle}>
          {sorted.map((place) => (
            <li
              key={place.id}
              className="bg-white rounded-2xl shadow-md border border-slate-100 p-5"
            >
              <h3 className="text-lg font-semibold text-slate-900">{place.name}</h3>
              <p className="mt-1 text-sm text-slate-600">{place.address}</p>
              {showDistance && (
                <p className="mt-2 text-sm font-medium text-[#0D9488]">
                  ~{formatDistanceKm(place.distanceKm)} away
                </p>
              )}
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={telHref(place.phone)}
                  className="inline-flex rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50"
                >
                  Call
                </a>
                <a
                  href={buildStaffGuideWhatsAppUrl(place.name, kind)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
                >
                  WhatsApp
                </a>
                <a
                  href={mapsDirectionsUrl(place)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-xl bg-[#0D9488] px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700"
                >
                  Directions
                </a>
              </div>
            </li>
          ))}
          {placesLoaded && sorted.length === 0 && (
            <li className="text-center text-slate-500 py-8 bg-white rounded-2xl border border-slate-100">
              No matches for your search.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
