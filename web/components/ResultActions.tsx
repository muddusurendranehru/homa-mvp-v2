const WHATSAPP_NUMBER = '919963721999';
const BOOK_TEXT = 'I want to book an appointment at HOMA Clinic';

type ResultActionsProps = {
  testName: string;
  score: string | number;
  category: string;
};

/**
 * Three action buttons shown under every calculator result
 * (normal or high): WhatsApp Dr. Muddu, Book Appointment, 30-Day Diet Plan.
 */
export default function ResultActions({ testName, score, category }: ResultActionsProps) {
  const message = `My ${testName} result is ${score} (${category}). I want to know more.`;
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  const bookHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(BOOK_TEXT)}`;

  return (
    <div data-testid="result-actions" className="mt-6 flex flex-col sm:flex-row flex-wrap gap-3 justify-center">
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block text-center bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-lg transition"
      >
        WhatsApp Dr. Muddu
      </a>
      <a
        href={bookHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block text-center text-white font-semibold px-5 py-2.5 rounded-lg transition hover:opacity-90"
        style={{ backgroundColor: '#0D2B4E' }}
      >
        Book Appointment
      </a>
      <a
        href="/diet"
        className="inline-block text-center font-semibold px-5 py-2.5 rounded-lg transition hover:opacity-90"
        style={{ backgroundColor: '#d4af37', color: '#07153a' }}
      >
        30-Day Diet Plan
      </a>
    </div>
  );
}
