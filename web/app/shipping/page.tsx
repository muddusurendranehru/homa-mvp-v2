import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping & Delivery Policy | HOMA CLINICS PRIVATE LIMITED',
  description:
    'Shipping and delivery policy of HOMA CLINICS PRIVATE LIMITED for pharmacy and other physical orders: Hyderabad and Telangana delivery, pan-India shipping, timelines, charges, and damaged or incorrect medicines.',
};

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <header className="bg-gradient-to-r from-green-50 to-teal-50 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold tracking-wide text-teal-700 uppercase mb-3">
            HOMA CLINICS PRIVATE LIMITED
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Shipping &amp; Delivery Policy
          </h1>
          <p className="text-lg text-gray-600">
            Pharmacy items and other physical orders
          </p>
          <p className="text-sm text-gray-500 mt-3">Last updated: 16 November 2026</p>
        </div>
      </header>

      <article className="py-10 px-4">
        <div className="prose prose-slate max-w-4xl mx-auto text-gray-700 leading-relaxed">
          <p className="mb-4">
            This Shipping &amp; Delivery Policy explains how{' '}
            <strong>HOMA CLINICS PRIVATE LIMITED</strong> (&quot;HOMA&quot;, &quot;we&quot;, &quot;us&quot;, or
            &quot;our&quot;) delivers physical goods ordered through mvp.homahealthcarecenter.in,
            www.homahealthcarecenter.in, and related checkout pages (the &quot;Platform&quot;). It covers
            pharmacy items and other products we agree to ship. Consultations, teleconsultations, and
            digital programs are delivered online or at the clinic and are not shipped parcels.
          </p>
          <p className="mb-8">
            This policy is part of our{' '}
            <Link href="/terms" className="text-green-700 hover:text-green-800 underline">
              Terms &amp; Conditions
            </Link>
            . Questions about an order may be sent to{' '}
            <a
              href="mailto:info@homahealthcarecenter.in"
              className="text-green-700 hover:text-green-800 underline"
            >
              info@homahealthcarecenter.in
            </a>{' '}
            or by phone at{' '}
            <a href="tel:+919963721999" className="text-green-700 hover:text-green-800 underline">
              +91 9963721999
            </a>
            . Our clinic practice is based in Gachibowli, Hyderabad, Telangana, India.
          </p>

          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-4">
              1. Delivery Areas
            </h2>
            <p className="mb-4">We deliver to serviceable pin codes in India, as follows:</p>
            <ul className="list-disc pl-6 space-y-3 mb-4">
              <li>
                <strong>Local delivery:</strong> Hyderabad and the rest of Telangana, including
                Gachibowli and nearby areas we serve, for pharmacy items and other physical products
                we list for local dispatch.
              </li>
              <li>
                <strong>Pan-India delivery:</strong> pharmacy items that can be shipped safely by our
                courier partners to serviceable pin codes across India.
              </li>
            </ul>
            <p className="mb-4">
              At checkout, enter a complete address and a working mobile number. If a pin code is not
              serviceable, or a medicine cannot be shipped to that location (including items that need
              special storage, a valid prescription we have not received, or a product restricted by
              law), we will not confirm the shipment. We will contact you to change the address, substitute
              only with your agreement, or cancel and refund the undelivered item.
            </p>
            <p>
              We do not ship outside India. Prescription medicines are dispensed only against a valid
              prescription where the law requires one, and only to the patient or a person authorised to
              receive them.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-4">
              2. Delivery Timelines
            </h2>
            <p className="mb-4">
              Dispatch begins after payment is successfully confirmed and, where required, after the
              prescription is verified. Business days are Monday to Saturday, excluding public holidays
              in Telangana and national holidays.
            </p>
            <ul className="list-disc pl-6 space-y-3 mb-4">
              <li>
                <strong>Local (Hyderabad and Telangana):</strong> 2 to 4 business days from dispatch.
              </li>
              <li>
                <strong>National (rest of India):</strong> 5 to 7 business days from dispatch.
              </li>
            </ul>
            <p className="mb-4">
              These are estimated transit times, not guaranteed delivery dates. Remote pin codes, weather,
              courier delays, incomplete addresses, and verification of a prescription can add time. If a
              product page or checkout screen states a different estimate for that order, the estimate
              shown at checkout applies to that order.
            </p>
            <p>
              Risk of loss in ordinary transit remains with us until the courier records delivery to the
              address you provided, or until you or a person at that address accepts the parcel. Please
              check the package at the time of delivery.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-4">
              3. Shipping Charges
            </h2>
            <p className="mb-4">
              Shipping is charged in Indian Rupees (INR). The amount, if any, is shown before you pay.
              Standard rates are:
            </p>
            <ul className="list-disc pl-6 space-y-3 mb-4">
              <li>
                <strong>Hyderabad and Telangana:</strong> free when the pharmacy or product order value
                is ₹499 or more. Below ₹499, a flat shipping charge of ₹49 applies.
              </li>
              <li>
                <strong>Rest of India:</strong> free when the pharmacy or product order value is ₹999 or
                more. Below ₹999, a flat shipping charge of ₹79 applies.
              </li>
            </ul>
            <p>
              Order value for the free-shipping threshold is the price of the goods before shipping.
              Taxes shown at checkout are included as displayed. Cold-chain, oversized, or specially
              packed items may carry an extra handling charge, which will be shown before payment. If
              checkout displays a different shipping amount, the amount you accept at payment is the
              charge for that order.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-4">
              4. Damaged or Incorrect Medicines
            </h2>
            <p className="mb-4">
              You must report a damaged, leaking, tampered, expired, or incorrect medicine{' '}
              <strong>within 24 hours of delivery</strong>. Contact us at{' '}
              <a
                href="mailto:info@homahealthcarecenter.in"
                className="text-green-700 hover:text-green-800 underline"
              >
                info@homahealthcarecenter.in
              </a>{' '}
              or{' '}
              <a href="tel:+919963721999" className="text-green-700 hover:text-green-800 underline">
                +91 9963721999
              </a>{' '}
              with:
            </p>
            <ul className="list-disc pl-6 space-y-3 mb-4">
              <li>Your order number and the delivery date.</li>
              <li>
                Clear photographs of the outer package, the product label (name, batch, and expiry), and
                the damage or the item that does not match your order.
              </li>
              <li>
                A short note of what you received versus what you ordered. Do not use a medicine that is
                damaged, leaking, tampered, expired, or not what was prescribed or ordered.
              </li>
            </ul>
            <p className="mb-4">
              Keep the product and its packing until we confirm the next step. Where we confirm damage or
              an incorrect item, we will replace it or refund the price of that item and the related
              shipping charge for it. A replacement follows the timelines in this policy from the date we
              approve it.
            </p>
            <p>
              Reports made after 24 hours of delivery, or claims without the product and photographs we
              need to verify the problem, may be declined, except where the law requires otherwise. This
              24-hour notice does not apply to a medicine you must not use because of a safety recall we
              announce; we will contact you with instructions if a recall applies to a batch we supplied.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-4">
              5. Failed Delivery and Address Changes
            </h2>
            <ul className="list-disc pl-6 space-y-3 mb-4">
              <li>
                If the courier cannot deliver because the address or phone number is incomplete, or no
                one is available to receive the parcel, they may attempt redelivery under their usual
                process. After a failed return to us, we will refund the product price. Outbound shipping
                already incurred on an order returned for an incorrect address or repeated non-availability
                may be deducted, unless the law requires a full refund.
              </li>
              <li>
                Tell us before dispatch if you need to change the address. After the parcel is handed to
                the courier, a change depends on whether the courier can still update the shipment.
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
