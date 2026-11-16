import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | HOMA CLINICS PRIVATE LIMITED',
  description:
    'Terms and Conditions for services, website use, and payments offered by HOMA CLINICS PRIVATE LIMITED, including medical disclaimer, user responsibilities, Razorpay payments, and limitation of liability.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <header className="bg-gradient-to-r from-green-50 to-teal-50 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold tracking-wide text-teal-700 uppercase mb-3">
            HOMA CLINICS PRIVATE LIMITED
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Terms &amp; Conditions
          </h1>
          <p className="text-lg text-gray-600">
            Website, clinical services, and online payments
          </p>
          <p className="text-sm text-gray-500 mt-3">Last updated: 16 November 2026</p>
        </div>
      </header>

      <article className="py-10 px-4">
        <div className="prose prose-slate max-w-4xl mx-auto text-gray-700 leading-relaxed">
          <p className="mb-4">
            These Terms &amp; Conditions (&quot;Terms&quot;) govern access to and use of the websites,
            applications, consultations, programs, and paid services operated by{' '}
            <strong>HOMA CLINICS PRIVATE LIMITED</strong> (&quot;HOMA&quot;, &quot;we&quot;, &quot;us&quot;, or
            &quot;our&quot;), including mvp.homahealthcarecenter.in and www.homahealthcarecenter.in
            (together, the &quot;Platform&quot;). By using the Platform or paying for a service, you agree
            to these Terms.
          </p>
          <p className="mb-8">
            Questions about these Terms may be sent to{' '}
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
              1. Acceptance of Terms
            </h2>
            <p className="mb-4">
              By browsing the Platform, creating an account, booking a consultation, enrolling in a
              program, or making a payment, you confirm that you have read, understood, and agree to
              be bound by these Terms and by our{' '}
              <Link href="/privacy" className="text-green-700 hover:text-green-800 underline">
                Privacy Policy
              </Link>
              . If you do not agree, do not use the Platform or purchase our services.
            </p>
            <p className="mb-4">
              You must be at least 18 years of age, or use the Platform with the consent and
              supervision of a parent or legal guardian. If you accept these Terms on behalf of
              another person or an organisation, you represent that you have authority to bind that
              person or organisation.
            </p>
            <p className="mb-4">
              We may update these Terms from time to time. The &quot;Last updated&quot; date above shows
              when they were last revised. Continued use of the Platform after a change is posted
              constitutes acceptance of the revised Terms. Material changes that affect paid orders
              already placed will not alter the price or core service description of that completed
              order, except where required by law.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-4">
              2. Medical Disclaimer
            </h2>
            <p className="mb-4 font-medium text-gray-800">
              This section is essential. Please read it carefully before relying on any content or
              paying for a service.
            </p>
            <ul className="list-disc pl-6 space-y-3 mb-4">
              <li>
                Content on the Platform — including articles, calculators (such as HOMA-IR, TyG, BMI,
                and related tools), scores, diet suggestions, videos, and automated messages — is for
                general education. It is not a diagnosis, prescription, or a substitute for an
                in-person medical examination.
              </li>
              <li>
                HOMA CLINICS PRIVATE LIMITED and its clinicians do not create a doctor–patient
                relationship merely because you visit the website, use a calculator, or send a
                message. A clinical relationship begins only when a qualified clinician accepts you
                for care after an appropriate consultation.
              </li>
              <li>
                Metabolic programs, including any 90-day remission or lifestyle program, support
                education, monitoring, and behaviour change. Outcomes differ. We do not guarantee
                remission, weight loss, normal laboratory values, or freedom from medication.
              </li>
              <li>
                Do not start, stop, or change any medicine, insulin, or supplement based only on
                Platform content. Continue the treatment plan given by your treating physician unless
                that physician changes it.
              </li>
              <li>
                The Platform is not an emergency service. If you have chest pain, severe
                breathlessness, confusion, very high or very low blood sugar with symptoms, signs of
                stroke, heavy bleeding, or any other emergency, call 108 or go to the nearest
                hospital immediately.
              </li>
              <li>
                Teleconsultation has limits. A video or phone visit cannot replace examination,
                investigations, or emergency care when those are clinically required.
              </li>
              <li>
                Calculators and scores depend on the numbers you enter. Incorrect inputs produce
                incorrect results. They are screening and education aids, not laboratory reports.
              </li>
            </ul>
            <p>
              Nothing on the Platform is an offer to practise medicine outside the jurisdictions and
              registrations under which our clinicians are permitted to practise.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-4">
              3. User Responsibilities
            </h2>
            <p className="mb-4">You agree to:</p>
            <ul className="list-disc pl-6 space-y-3 mb-4">
              <li>
                Provide true, current, and complete information, including your name, email, phone
                number, and health details you choose to share.
              </li>
              <li>
                Keep your login credentials confidential and notify us promptly if you suspect
                unauthorised access to your account.
              </li>
              <li>
                Use the Platform only for lawful personal or clinical purposes, and not to upload
                malware, scrape data, harass staff or other users, or misrepresent your identity.
              </li>
              <li>
                Follow clinical and program instructions you accept, attend scheduled visits, and
                tell your clinician about other medicines, allergies, pregnancy, and relevant history.
              </li>
              <li>
                Obtain and pay for investigations, medicines, hospital care, transport, and other
                third-party services that are not expressly included in the package you purchase.
              </li>
              <li>
                Respect our intellectual property. Text, protocols, images, software, and branding on
                the Platform belong to HOMA CLINICS PRIVATE LIMITED or its licensors. You may not
                copy them for commercial use without written permission.
              </li>
            </ul>
            <p>
              We may suspend or close an account that breaches these Terms, threatens patient safety,
              or is used for fraud. Where a paid service has already been delivered, fees already
              earned are not refundable solely because an account was later restricted for misuse.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-4">
              4. Payments
            </h2>
            <p className="mb-4">
              Paid services — including consultations, program fees, and other offerings listed on
              the Platform — are charged in Indian Rupees (INR) unless a page clearly states another
              currency. The price, what is included, and any taxes shown at checkout are the price
              you agree to pay.
            </p>
            <p className="mb-4">
              Online card, UPI, net-banking, and wallet payments are processed by{' '}
              <strong>Razorpay</strong> (Razorpay Software Private Limited and its banking partners),
              our authorised payment service provider. When you pay, you also agree to Razorpay&apos;s
              applicable terms and to your bank or card issuer&apos;s terms. HOMA CLINICS PRIVATE
              LIMITED does not store your full card number, CVV, or UPI PIN on our servers. Payment
              credentials are handled by Razorpay and the relevant bank or network.
            </p>
            <ul className="list-disc pl-6 space-y-3 mb-4">
              <li>
                A payment is complete only when we receive successful authorisation from Razorpay.
                If a payment fails, is declined, or is marked pending, the service is not confirmed
                until a successful payment is recorded.
              </li>
              <li>
                If an amount is debited but the payment status remains failed or pending, contact
                us with the Razorpay payment reference. Duplicate or failed debits are reversed by
                the bank or Razorpay according to their timelines, typically within 5 to 7 working
                days, and may take longer depending on the issuing bank.
              </li>
              <li>
                You authorise us and Razorpay to charge the payment method you select for the amount
                displayed, including applicable taxes.
              </li>
              <li>
                Prices may change for future purchases. A confirmed order keeps the price accepted
                at the time of successful payment.
              </li>
              <li>
                Unless a specific offer says otherwise, program and consultation fees are for the
                services described at purchase. Laboratory tests, medicines, devices, hospital
                admission, and home sample collection by third parties are billed separately when
                they are not included in writing.
              </li>
            </ul>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Cancellations and refunds</h3>
            <ul className="list-disc pl-6 space-y-3 mb-4">
              <li>
                You may request cancellation of a consultation before the appointment time by
                contacting us on the phone number or email above. If we receive the request at least
                24 hours before the scheduled start, we will refund the consultation fee to the
                original payment method, after deducting any non-refundable payment-gateway charges
                actually incurred, unless the law requires a full refund.
              </li>
              <li>
                A consultation missed without prior notice, or cancelled inside 24 hours, is not
                refundable, except where we cancel or where required by law.
              </li>
              <li>
                For a multi-week program, you may request a refund within 7 days of successful
                payment if no consultation has been delivered and no personalised plan has been
                issued. After a consultation or personalised plan has been provided, fees are not
                refundable, because clinical time and preparation have been used. Unused future
                sessions may be rescheduled once, subject to clinician availability.
              </li>
              <li>
                If we cannot deliver a paid service because of our cancellation, we will offer a
                reschedule or a full refund of the amount paid for the undelivered service.
              </li>
              <li>
                Approved refunds are initiated to the original payment method through Razorpay.
                Credit to your account depends on your bank and usually takes 5 to 10 working days
                after we initiate the refund.
              </li>
            </ul>
            <p>
              We do not ask for your password, OTP, CVV, or UPI PIN by phone, email, or WhatsApp.
              Pay only on our official checkout or a Razorpay payment page linked from it.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-4">
              5. Limitation of Liability
            </h2>
            <p className="mb-4">
              To the fullest extent permitted by the laws of India, including the Consumer Protection
              Act, 2019:
            </p>
            <ul className="list-disc pl-6 space-y-3 mb-4">
              <li>
                The Platform and educational content are provided on an &quot;as is&quot; and &quot;as available&quot;
                basis. We do not warrant that the site will be uninterrupted, error-free, or free of
                harmful components.
              </li>
              <li>
                HOMA CLINICS PRIVATE LIMITED, its directors, clinicians, and staff are not liable for
                indirect, incidental, special, or consequential loss, including loss of profits,
                data, or goodwill, arising from use of the Platform.
              </li>
              <li>
                We are not liable for acts or omissions of Razorpay, banks, telecom providers,
                laboratories, pharmacies, or other independent third parties.
              </li>
              <li>
                Nothing in these Terms excludes liability for death or personal injury caused by
                proven negligence, for fraud, or for any other liability that Indian law does not
                allow us to limit.
              </li>
              <li>
                Where liability can legally be limited, our total aggregate liability arising out of
                a paid service is limited to the fees you actually paid to HOMA CLINICS PRIVATE
                LIMITED for that service in the three months before the claim arose.
              </li>
            </ul>
            <p>
              You agree to use clinical judgment resources, including your own physician, and not to
              rely on the Platform alone for decisions that could affect your health.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-4">
              6. Governing Law
            </h2>
            <p>
              These Terms are governed by the laws of India. Subject to any mandatory rights you have
              as a consumer, the courts at Hyderabad, Telangana, shall have exclusive jurisdiction
              over disputes arising from these Terms or the Platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-4">7. Contact</h2>
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
