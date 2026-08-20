import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Security Policy – HOMA Healthcare Center | Dr. Muddu Surendra Nehru MD',
  description: 'Report security vulnerabilities responsibly. HOMA Healthcare Center security policy, contact details, and responsible disclosure.',
};

export default function SecurityPolicyPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero Header */}
      <header className="bg-gradient-to-r from-green-50 to-teal-50 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Security Policy
          </h1>
          <p className="text-lg text-gray-600">
            Responsible Vulnerability Disclosure
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <p className="text-gray-700 leading-relaxed mb-4">
              At HOMA Healthcare Center, we take security seriously. If you discover a vulnerability in our systems, apps, or website, please report it responsibly so we can address it promptly.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-4">
              Reporting a Vulnerability
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li>
                <strong>Email:</strong>{' '}
                <a href="mailto:security@homahealthcarecenter.in" className="text-green-600 hover:text-green-700 hover:underline">
                  security@homahealthcarecenter.in
                </a>
              </li>
              <li>
                <strong>PGP Key:</strong>{' '}
                <Link href="/pgp-key.txt" className="text-green-600 hover:text-green-700 hover:underline">
                  Download
                </Link>
              </li>
              <li>
                <strong>Response time:</strong> Within 48 hours
              </li>
            </ul>
          </section>

          {/* Contact Box */}
          <div className="bg-gray-50 border-l-4 border-green-600 p-6 rounded-r-lg mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Us</h3>
            <div className="space-y-2 text-gray-700">
              <p>
                <a href="mailto:security@homahealthcarecenter.in" className="text-green-600 hover:text-green-700 hover:underline">
                  security@homahealthcarecenter.in
                </a>
              </p>
              <p>
                <a href="tel:+919963721999" className="text-green-600 hover:text-green-700 hover:underline">
                  Phone: +91 99637 21999
                </a>
              </p>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-12 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500 mb-4">
              © 2026 HOMA Healthcare Center. All rights reserved.
            </p>
            <Link
              href="/"
              className="inline-block text-green-600 hover:text-green-700 hover:underline font-medium"
            >
              ← Back to Home
            </Link>
          </footer>
        </div>
      </main>
    </div>
  );
}
