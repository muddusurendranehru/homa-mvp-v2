type Mentor = {
  name: string;
  title: string;
  line1: string;
  line2: string;
  photoSrc?: string;
};

const MENTORS: Mentor[] = [
  {
    name: "Dr. Basawaraj R. Puranik, M.D.",
    title: "Mentor & Honorary Co-Director",
    line1: "Professor of Medicine, MNR Medical College & Hospital, Sangareddy",
    line2: "26+ years teaching medicine · Former Professor & HOD, Shadan Institute of Medical Sciences",
    photoSrc: "/images/mentors/dr-basawaraj-puranik.webp",
  },
  {
    name: "Dr. P. Vamsee Krishna, M.D.",
    title: "Mentor & Honorary Co-Director",
    line1: "Director, Leela Hospital, Moti Nagar, Hyderabad",
    line2: "MD General Medicine · TSMC Reg. No. 66494",
    photoSrc: undefined,
  },
];

export default function MentorTiles() {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-3">Our Mentors</h2>
      <p className="text-sm text-gray-600 mb-4">
        Honorary roles. Our mentors guide clinical standards and education; they have no financial or day-to-day role in HOMA.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {MENTORS.map((mentor) => {
          const initials = mentor.name
            .replace(/^Dr\.\s*/i, "")
            .split(/\s+/)
            .filter((w) => w.length > 1 && !w.endsWith("."))
            .slice(0, 2)
            .map((w) => w[0])
            .join("")
            .toUpperCase();

          return (
            <div
              key={mentor.name}
              className="bg-white border border-gray-200 rounded-lg p-4 flex flex-row gap-4 items-start"
            >
              {mentor.photoSrc ? (
                <img
                  src={mentor.photoSrc}
                  width={80}
                  height={92}
                  loading="lazy"
                  decoding="async"
                  alt={mentor.name}
                  className="w-20 h-[92px] object-cover object-top rounded-md flex-shrink-0"
                />
              ) : (
                <div className="w-20 h-[92px] rounded-md bg-teal-50 flex items-center justify-center text-teal-700 font-bold text-xl flex-shrink-0">
                  {initials}
                </div>
              )}

              <div>
                <h3 className="font-semibold text-gray-800">{mentor.name}</h3>
                <p className="text-sm text-teal-700">{mentor.title}</p>
                <p className="text-sm text-gray-600">{mentor.line1}</p>
                <p className="text-sm text-gray-600">{mentor.line2}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
