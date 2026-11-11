import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'BP: The Untold Truth | Dr. Muddu Surendra Nehru MD',
  description:
    'A practical patient-friendly book on blood pressure by Dr. Muddu Surendra Nehru MD — what most people are never told about BP, causes, lifestyle, and working with your doctor. HOMA Healthcare Center.',
  openGraph: {
    title: 'BP: The Untold Truth | HOMA Healthcare Center',
    description:
      'A practical guide to understanding blood pressure — causes, lifestyle, and how to work with your doctor. By Professor of Medicine Dr. Muddu Surendra Nehru MD.',
    images: [{ url: '/images/bp-book.jpg', alt: 'BP: The Untold Truth book cover' }],
  },
};

const WHATSAPP_BUY =
  'https://wa.me/919963721999?text=I%20WANT%20TO%20BUY%20BP%20THE%20UNTOLD%20TRUTH%20BOOK';

const AMAZON_HREF = 'https://www.amazon.in/dp/B0H23M9VPF';

const recognitionPhotos = [
  {
    src: '/images/minister-sridhar-babu-homa.jpg',
    alt: "Hon'ble Minister Sri Duddilla Sridhar Babu receiving BP: The Untold Truth",
    caption:
      "Presented to Hon'ble Minister Sri Duddilla Sridhar Babu, Government of Telangana",
  },
  {
    src: '/images/cm-revanth-reddy-book-homa.jpg',
    alt: "Hon'ble Chief Minister Sri A. Revanth Reddy receiving BP: The Untold Truth",
    caption: "Presented to Hon'ble Chief Minister Sri A. Revanth Reddy",
  },
] as const;

export default function BpUntoldTruthPage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-teal-50/80 via-white to-slate-50 px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-2xl">
        <p className="text-center">
          <Link
            href="/books"
            className="text-sm font-semibold text-[#0D9488] hover:text-teal-700"
          >
            &larr; All books
          </Link>
        </p>

        <header className="mb-8 mt-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#0D9488]">
            HOMA Healthcare Center
          </p>
          <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
            BP: The Untold Truth
          </h1>
          <p className="mt-3 text-sm font-medium text-slate-700 sm:text-base">
            Dr. Muddu Surendra Nehru, M.D.
          </p>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-slate-600">
            Professor of Medicine · 30+ years clinical experience · 13 books published ·
            5,000+ patients treated · DPIIT recognised
          </p>
        </header>

        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-200/60">
          <div className="flex justify-center bg-gradient-to-r from-teal-700 to-emerald-700 px-6 py-8">
            <Image
              src="/images/bp-book.jpg"
              alt="BP: The Untold Truth book cover"
              width={260}
              height={390}
              className="h-auto w-full max-w-[220px] rounded-lg border-2 border-white/30 shadow-md sm:max-w-[260px]"
              priority
            />
          </div>

          <div className="space-y-4 px-6 py-6 sm:px-8 sm:py-8">
            <p className="text-sm font-semibold text-[#0D9488]">
              Why Your Blood Pressure Is High When Every Test Says Normal
            </p>
            <p className="text-base leading-relaxed text-slate-700">
              A practical book on blood pressure for patients and families: what most people
              are never told about BP, common causes, everyday lifestyle choices that matter, and
              how to partner with your doctor for safer, steadier control. Written in clear language
              from decades of internal medicine practice — not a substitute for medical advice, but
              a companion to your care plan.
            </p>
          </div>
        </article>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href={WHATSAPP_BUY}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 px-6 py-4 text-center text-base font-bold text-white shadow-lg shadow-teal-600/25 transition hover:from-teal-700 hover:to-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 sm:w-auto sm:min-w-[220px]"
          >
            Buy on WhatsApp
          </a>
          <a
            href={AMAZON_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center rounded-xl border-2 border-[#0D9488] bg-white px-6 py-4 text-center text-base font-bold text-[#0D9488] transition hover:bg-teal-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 sm:w-auto sm:min-w-[220px]"
          >
            Buy on Amazon
          </a>
        </div>

        <section className="mt-10" aria-labelledby="recognition-heading">
          <h2
            id="recognition-heading"
            className="text-center text-lg font-bold text-slate-900 sm:text-xl"
          >
            Recognition
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-center text-sm text-slate-600">
            Copies of this book have been presented to state leaders in Telangana.
          </p>
          <ul className="mt-6 grid gap-6 sm:grid-cols-2">
            {recognitionPhotos.map((photo) => (
              <li
                key={photo.src}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={640}
                  height={480}
                  className="h-auto w-full object-cover"
                />
                <p className="px-4 py-3 text-center text-xs leading-snug text-slate-600 sm:text-sm">
                  {photo.caption}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-10 text-center">
          <Link href="/" className="text-sm font-semibold text-[#0D9488] hover:text-teal-700">
            &larr; Back to homepage
          </Link>
        </p>
      </div>
    </main>
  );
}
