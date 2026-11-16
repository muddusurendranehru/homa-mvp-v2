import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refund Policy | HOMA CLINICS PRIVATE LIMITED',
  description:
    'Refund and cancellation policy of HOMA CLINICS PRIVATE LIMITED for consultations, programs, pharmacy orders, and Razorpay payments.',
};

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <header className="bg-gradient-to-r from-green-50 to-teal-50 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold tracking-wide text-teal-700 uppercase mb-3">
            HOMA CLINICS PRIVATE LIMITED
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Refund Policy</h1>
          <p className="text-lg text-gray-600">
            Cancellations and refunds for consultations, programs, and pharmacy orders
          </p>
          <p className="text-sm text-gray-500 mt-3">Last updated: 16 November 2026</p>
        </div>
      </header>

      <article className="py-10 px-4">
        <div className="prose prose-slate max-w-4xl mx-auto text-gray-700 leading-relaxed">
          <p className="mb-4">
            This Refund Policy explains when <strong>HOMA CLINICS PRIVATE LIMITED</strong> (&quot;HOMA&quot;,
            &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) refunds payments made on mvp.homahealthcarecenter.in,
            www.homahealthcarecenter.in, and related checkout pages (the &quot;Platform&quot;). It applies
            together with our{' '}
            <Link href="/terms" className="text-green-700 hover:text-green-800 underline">
              Terms &amp; Conditions
            </Link>{' '}
            and{' '}
            <Link href="/shipping" className="text-green-700 hover:text-green-800 underline">
              Shipping &amp; Delivery Policy
            </Link>
            .
          </p>
          <p className="mb-8">
            To request a cancellation or refund, email{' '}
            <a
              href="mailto:info@homahealthcarecenter.in"
              className="text-green-700 hover:text-green-800 underline"
            >
              info@homahealthcarecenter.in
            </a>{' '}
            or call{' '}
            <a href="tel:+919963721999" className="text-green-700 hover:text-green-800 underline">
              +91 9963721999
            </a>{' '}
            with your name, order or appointment reference, and the payment date. Our clinic practice
            is based in Gachibowli, Hyderabad, Telangana, India.
          </p>

          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-4">
              1. How refunds are paid
            </h2>
            <ul className="list-disc pl-6 space-y-3 mb-4">
              <li>
                Approved refunds are sent to the original payment method through Razorpay. We do not
                refund to a different account unless the original method cannot receive the credit and
                the law requires another route.
              </li>
              <li>
                After we initiate a refund, your bank or card issuer usually credits it in 5 to 10
                working days. Some banks take longer. A failed or duplicate debit that never became a
                successful payment is reversed by the bank or Razorpay, typically within 5 to 7
                working days.
              </li>
              <li>
                Where a payment-gateway charge is non-refundable and has actually been incurred, we
                may deduct that charge, unless the law requires a full refund.
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-4">
              2. Consultations
            </h2>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                If we receive your cancellation at least 24 hours before the scheduled start, we
                refund the consultation fee.
              </li>
              <li>
                A consultation missed without prior notice, or cancelled inside 24 hours, is not
                refundable, except where we cancel the appointment or the law requires a refund.
              </li>
              <li>
                If we cancel and cannot offer a suitable reschedule, we refund the full amount paid
                for that consultation.
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-4">
              3. Programs
            </h2>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                For a multi-week program, you may request a refund within 7 days of successful
                payment if no consultation has been delivered and no personalised plan has been
                issued.
              </li>
              <li>
                After a consultation or personalised plan has been provided, program fees are not
                refundable, because clinical time and preparation have been used. Unused future
                sessions may be rescheduled once, subject to clinician availability.
              </li>
              <li>
                If we cannot deliver a paid service, we will offer a reschedule or a full refund of
                the amount paid for the undelivered part.
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-4">
              4. Pharmacy and other shipped items
            </h2>
            <ul className="list-disc pl-6 space-y-3 mb-4">
              <li>
                Report a damaged, leaking, tampered, expired, or incorrect medicine within 24 hours
                of delivery, with your order number and photographs of the package and the product
                label. Do not use that medicine.
              </li>
              <li>
                Where we confirm the problem, we will replace the item or refund its price and the
                related shipping charge.
              </li>
              <li>
                If a parcel is returned to us because the address or phone number was incomplete, or
                because no one was available to receive it after the courier&apos;s redelivery attempts,
                we refund the product price. Outbound shipping already incurred may be deducted,
                unless the law requires a full refund.
              </li>
              <li>
                An order cancelled before dispatch is refunded in full, including the shipping charge
                collected for that order.
              </li>
            </ul>
            <p>
              Delivery areas, timelines, and shipping rates are set out in the{' '}
              <Link href="/shipping" className="text-green-700 hover:text-green-800 underline">
                Shipping &amp; Delivery Policy
              </Link>
              .
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-4">
              5. What we do not refund
            </h2>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                Medicines or other goods that have been used, or that were correctly supplied and
                later refused because of a change of mind, where returning them would be unsafe or
                unlawful.
              </li>
              <li>
                Services already delivered, including a completed consultation or a personalised plan
                already issued.
              </li>
              <li>
                Amounts paid to outside laboratories, pharmacies, hospitals, or couriers that we did
                not collect.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-4">6. Contact</h2>
            <p className="mb-2">
              <strong>HOMA CLINICS PRIVATE LIMITED</strong>
            </p>
            <p className="mb-1">Gachibowli, Hyderabad, Telangana, India</p>
            <p className="mb-1">
              Phone:{' '}
              <a href="tel:+919963721999" className="text-green-700 hover:text-green-800 underline">
                +91 9963721999
              </a>
            </p>
            <p className="mb-1">
              Email:{' '}
              <a
                href="mailto:info@homahealthcarecenter.in"
                className="text-green-700 hover:text-green-800 underline"
              >
                info@homahealthcarecenter.in
              </a>
            </p>
            <p>
              Website:{' '}
              <a
                href="https://www.homahealthcarecenter.in"
                className="text-green-700 hover:text-green-800 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.homahealthcarecenter.in
              </a>
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
