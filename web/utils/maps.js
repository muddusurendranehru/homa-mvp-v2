/**
 * Google Maps directions URL. No API key.
 * Uses lat,lng when both exist; otherwise the address string.
 * @param {{ lat?: number|null, lng?: number|null, address?: string|null }} place
 * @returns {string}
 */
export function mapsDirectionsUrl(place) {
  const lat = place?.lat;
  const lng = place?.lng;
  const hasLat = lat !== undefined && lat !== null && lat !== '';
  const hasLng = lng !== undefined && lng !== null && lng !== '';

  if (hasLat && hasLng) {
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  }

  const address = place?.address ? String(place.address) : '';
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
}
