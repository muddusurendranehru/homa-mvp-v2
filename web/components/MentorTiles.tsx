import { DOCTORS } from '@/data/doctors';

function getInitials(name: string): string {
  // Strip titles (Dr., Prof.) and suffixes (M.D., MD, MBBS, Ph.D.)
  const cleaned = name
    .replace(/\b(Dr|Prof|Mr|Mrs|Ms)\.?\b/gi, '')
    .replace(/\b(M\.?D\.?|MBBS|Ph\.?D|BAMS|BHMS)\b\.?/gi, '')
    .replace(/[,\.]/g, '')
    .trim();

  const words = cleaned.split(/\s+/).filter(Boolean);
  // Skip single-letter tokens (e.g. "R", "P") — they are initials, not names
  const meaningful = words.filter((w) => w.length > 1);

  if (meaningful.length === 0) {
    return words.length > 0 ? words[0][0].toUpperCase() : '?';
  }
  if (meaningful.length === 1) {
    return meaningful[0][0].toUpperCase();
  }
  // First + last meaningful word → e.g. "Basawaraj Puranik" -> "BP"
  return (meaningful[0][0] + meaningful[meaningful.length - 1][0]).toUpperCase();
}

export default function MentorTiles() {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Doctors Who Stand With Us
      </h2>
      <p className="text-sm text-gray-700 mb-1 max-w-3xl">
        Real doctors, real relationships. Each of them has known Dr. Muddu Surendra Nehru for decades and has watched him give the last 8 years, along with his family practice, time and savings, to building a new approach to diabetes, heart health and obesity.
      </p>
      <p className="text-xs text-gray-500 mb-5 max-w-3xl">
        Honorary roles only; no financial or day-to-day role in HOMA.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {DOCTORS.map((doc) => {
          const initials = getInitials(doc.name);
          return (
            <div key={doc.name} className="flex flex-col items-center text-center">
              {doc.photoSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={doc.photoSrc}
                  width={56}
                  height={56}
                  loading="lazy"
                  decoding="async"
                  alt={doc.name}
                  className="w-14 h-14 rounded-full object-cover object-top flex-shrink-0"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-teal-50 flex items-center justify-center text-teal-700 font-bold text-base flex-shrink-0">
                  {initials}
                </div>
              )}
              <p className="mt-2 text-xs text-gray-700 leading-tight">{doc.name}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
