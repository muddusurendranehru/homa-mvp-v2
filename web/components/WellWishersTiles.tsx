import { WELL_WISHERS } from '@/data/doctors';

function getInitials(name: string): string {
  const cleaned = name
    .replace(/\b(Dr|Prof|Mr|Mrs|Ms)\.?\b/gi, '')
    .replace(/\b(M\.?D\.?|MBBS|Ph\.?D|BAMS|BHMS)\b\.?/gi, '')
    .replace(/[,\.]/g, '')
    .trim();

  const words = cleaned.split(/\s+/).filter(Boolean);
  const meaningful = words.filter((w) => w.length > 1);

  if (meaningful.length === 0) {
    return words.length > 0 ? words[0][0].toUpperCase() : '?';
  }
  if (meaningful.length === 1) {
    return meaningful[0][0].toUpperCase();
  }
  return (meaningful[0][0] + meaningful[meaningful.length - 1][0]).toUpperCase();
}

export default function WellWishersTiles() {
  return (
    <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Community Partners
      </h2>
      <p className="text-sm text-gray-600 mb-5 max-w-3xl">
        Trusted colleagues, local leaders, and friends who support our mission to build a new approach to diabetes, heart health, and obesity.
        Honorary roles only; no financial or day-to-day role in HOMA.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {WELL_WISHERS.map((person) => {
          const initials = getInitials(person.name);
          return (
            <div key={person.name} className="flex flex-col items-center text-center">
              {person.photoSrc ? (
                <img
                  src={person.photoSrc}
                  width={56}
                  height={56}
                  loading="lazy"
                  decoding="async"
                  alt={person.name}
                  className="w-14 h-14 rounded-full object-cover object-top flex-shrink-0"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-teal-50 flex items-center justify-center text-teal-700 font-bold text-base flex-shrink-0">
                  {initials}
                </div>
              )}
              <p className="mt-2 text-xs text-gray-700 leading-tight">{person.name}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}