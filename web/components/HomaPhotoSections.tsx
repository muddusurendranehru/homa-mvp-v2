/**
 * Homepage photo sections: Free Screening Camps, Lectures & Recognition, Visit the Clinic.
 * Uses plain <img loading="lazy"> like HomepagePhotoGallery (avoids Next Image optimizer issues).
 * Patient faces are blurred in the source images. No names, numbers or results in captions.
 */

type Photo = { src: string; alt: string; caption: string; pos?: string };

const screening: Photo[] = [
  { src: "/images/homa-lions-ramagundam-camp.jpg", alt: "Dr. Muddu Surendra Nehru MD with Lions Club of Ramagundam members at a diabetes screening camp", caption: "Diabetes screening camp with Lions Club of Ramagundam", pos: "center 40%" },
  { src: "/images/homa-bp-check-1.jpg", alt: "Health worker doing a check-up at a free screening camp", caption: "Check-up at a free camp" },
  { src: "/images/homa-bp-check-2.jpg", alt: "Health worker checking a patient at a screening camp", caption: "Basic health check" },
  { src: "/images/homa-sugar-test-1.jpg", alt: "Finger-prick sugar test at a screening camp", caption: "Finger-prick sugar test" },
  { src: "/images/homa-sugar-test-2.jpg", alt: "Blood sugar test being done for an elderly patient", caption: "Sugar screening for seniors" },
  { src: "/images/homa-sugar-test-3.jpg", alt: "Blood sugar test at a community screening camp", caption: "Community sugar screening" },
];

const lectures: Photo[] = [
  { src: "/images/homa-thub-agenda-launch.jpg", alt: "HOMA Agenda conference launch with doctors and partners on stage", caption: "HOMA Agenda conference: diabetes care research launch", pos: "center 40%" },
  { src: "/images/homa-thub-junior-doctors.jpg", alt: "Junior doctors from the HOMA research team at T-Hub, Hyderabad", caption: "Junior doctors outreach and T-Hub research collaboration", pos: "center 45%" },
  { src: "/images/homa-lecture-premier-talk.jpg", alt: "Dr. Muddu Surendra Nehru MD giving a metabolic health talk at Premier Hospital", caption: "Metabolic health talk at Premier Hospital", pos: "center 40%" },
  { src: "/images/homa-lecture-premier-screen.jpg", alt: "Dr. Muddu Surendra Nehru MD presenting on obesity and metabolic health at Premier Hospital", caption: "Patient education session on metabolic health", pos: "center 35%" },
  { src: "/images/homa-mnr-book-handover.jpg", alt: "Dr. Muddu Surendra Nehru MD presenting his book at MNR Medical College, Sangareddy", caption: "Book presentation at MNR Medical College" },
  { src: "/images/homa-mnr-vice-chairman-students.jpg", alt: "Dr. Muddu Surendra Nehru MD with MNR Vice Chairman Sri Manthena Raju and a student volunteer", caption: "With Vice Chairman Sri Manthena Raju and student volunteer", pos: "center 30%" },
  { src: "/images/homa-mnr-research-meeting.jpg", alt: "Research team meeting at MNR Medical College", caption: "TyG index research team, MNR Sangareddy" },
  { src: "/images/homa-lecture-book-launch.jpg", alt: "Book launch event for HOMA Agenda on diabetes care", caption: "HOMA Agenda book launch", pos: "center 25%" },
  { src: "/images/homa-lecture-agenda-team.jpg", alt: "HOMA team presenting the HOMA Agenda", caption: "Presenting the HOMA Agenda" },
  { src: "/images/homa-lecture-press-coverage.jpg", alt: "Newspaper coverage of a HOMA health event", caption: "In the news", pos: "center top" },
  { src: "/images/homa-mnr-cme-certificate.jpg", alt: "Certificate for HOMA 2026 Metabolic Medicine CME at MNR Medical College", caption: "HOMA 2026 Metabolic Medicine CME" },
  { src: "/images/homa-press-meet-panel.jpg", alt: "Dr. Muddu Surendra Nehru MD at a press meet panel", caption: "Press meet on metabolic health" },
  { src: "/images/homa-event-stage-panel.jpg", alt: "Dr. Muddu Surendra Nehru MD on a stage panel", caption: "Speaking on a health panel" },
  { src: "/images/homa-felicitation-1.jpg", alt: "Dr. Muddu Surendra Nehru MD being felicitated", caption: "Felicitation at an event" },
  { src: "/images/homa-felicitation-2.jpg", alt: "Dr. Muddu Surendra Nehru MD receiving recognition", caption: "Recognition for service" },
  { src: "/images/homa-felicitation-group.jpg", alt: "Group photo at a felicitation event", caption: "With the organising team" },
];

function PhotoGrid({ photos }: { photos: Photo[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 max-w-4xl mx-auto">
      {photos.map((p) => (
        <figure key={p.src} className="m-0">
          <div className="w-full overflow-hidden rounded-lg bg-gray-100" style={{ aspectRatio: "4 / 3" }}>
            <img src={p.src} alt={p.alt} loading="lazy" decoding="async" className="w-full h-full object-cover" style={p.pos ? { objectPosition: p.pos } : undefined} />
          </div>
          <figcaption className="mt-1 text-xs md:text-sm text-gray-700 text-center">{p.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}

export function FreeScreeningCamps() {
  return (
    <section id="screening-camps" className="bg-white py-12 px-4">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[#07153a]">Free Screening Camps</h2>
        <p className="mt-3 text-gray-700">
          Dr. Muddu Surendra Nehru MD and the HOMA Healthcare Center team run free sugar and blood pressure screening camps for the community.
        </p>
      </div>
      <PhotoGrid photos={screening} />
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto">
        <a href="/health-check" className="block text-center bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-3 rounded-lg">Book a health check</a>
        <a href="https://wa.me/919963721999?text=Hi%20HOMA%2C%20I%20am%20interested%20in%20free%20screening%20camps" target="_blank" rel="noopener noreferrer" className="block text-center bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-3 rounded-lg">WhatsApp: I'm interested</a>
        <a href="https://docs.google.com/forms/d/e/1FAIpQLScFyqzVxG4DzDlEgCHFlwNnPbo6Iz1jHLPHrxdQKQBwA9fEcQ/viewform" target="_blank" rel="noopener noreferrer" className="block text-center bg-[#07153a] hover:bg-[#0D2B4E] text-white font-semibold px-5 py-3 rounded-lg">Volunteer / Join</a>
        <a href="https://wa.me/919963721999?text=Hi%20HOMA%2C%20I%20would%20like%20to%20donate%20%2F%20support%20free%20screening%20camps" target="_blank" rel="noopener noreferrer" className="block text-center border-2 border-[#07153a] text-[#07153a] hover:bg-gray-50 font-semibold px-5 py-3 rounded-lg">Donate / Support</a>
      </div>
      <p className="text-center mt-4">
        <a href="/normal-values" className="text-[#0D2B4E] font-semibold underline">Cutoff values: BMI, waist, and daily needs</a>
      </p>
    </section>
  );
}

export function LecturesRecognition() {
  return (
    <section id="lectures-recognition" className="bg-[#f8f7f3] py-12 px-4">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[#07153a]">Lectures &amp; Recognition</h2>
        <p className="mt-3 text-gray-700">
          Dr. Muddu Surendra Nehru MD of HOMA Healthcare Center speaks at medical colleges, press meets and public health events on diabetes and metabolic health. At MNR Medical College, Sangareddy, with Vice Chairman Sri Manthena Raju, student volunteers join our TyG index research and CME work.
        </p>
      </div>
      <PhotoGrid photos={lectures} />
    </section>
  );
}

export function VisitClinic() {
  return (
    <section id="visit-clinic" className="bg-white py-12 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="w-full overflow-hidden rounded-lg bg-gray-100" style={{ aspectRatio: "4 / 3" }}>
          <img src="/images/homa-clinic-team-premier.jpg" alt="Dr. Muddu Surendra Nehru MD with the HOMA Healthcare Center team" loading="lazy" decoding="async" className="w-full h-full object-cover" />
        </div>
        <div className="w-full overflow-hidden rounded-lg bg-gray-100 md:order-none" style={{ aspectRatio: "16 / 9" }}>
          <img src="/images/homa-premier-front.jpg" alt="Dr. Muddu Surendra Nehru MD outside Premier Hospital" loading="lazy" decoding="async" className="w-full h-full object-cover" style={{ objectPosition: "center 40%" }} />
        </div>
        <div className="w-full overflow-hidden rounded-lg bg-gray-100" style={{ aspectRatio: "16 / 9" }}>
          <img src="/images/homa-consultation-room.jpg" alt="Dr. Muddu Surendra Nehru MD in the consultation room at HOMA Healthcare Center" loading="lazy" decoding="async" className="w-full h-full object-cover" style={{ objectPosition: "center 40%" }} />
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-[#07153a]">Visit HOMA Healthcare Center</h2>
          <p className="mt-3 text-gray-700">
            Meet Dr. Muddu Surendra Nehru MD at HOMA Healthcare Center, Gachibowli, Hyderabad.
          </p>
          <p className="mt-2 text-gray-700">Clinic hours: Monday to Friday, 7 PM to 9 PM</p>
          <p className="mt-2 text-gray-700">Phone: +91 99637 21999</p>
        </div>
      </div>
    </section>
  );
}
