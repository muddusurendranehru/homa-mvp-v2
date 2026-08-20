import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Zoom Sundays 9AM | HOMA Remission | Dr Muddu\'s Clinic',
  description: 'Join our exclusive Zoom sessions every Sunday 9AM. Members-only HOMA remission guidance. Register now.',
};

export default function ZoomPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            📹 Zoom Sundays 9AM
          </h1>
          <p className="text-lg text-gray-600">
            Exclusive HOMA Remission Sessions for Members Only
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden border-2 border-purple-200">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4">
            <h2 className="text-2xl font-bold text-center">Weekly Schedule</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Day</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Time</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Topic</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Access</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-purple-50">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800">Sunday</td>
                  <td className="px-6 py-4 text-sm text-gray-700">9:00 AM IST</td>
                  <td className="px-6 py-4 text-sm text-gray-700">HOMA Remission Strategies</td>
                  <td className="px-6 py-4">
                    <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full">
                      Members Only
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href="https://wa.me/919963721999?text=I want to register for Zoom Sundays 9AM"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
                    >
                      Register →
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-xl p-6 shadow-lg border border-purple-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4">What to Expect</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-purple-600 font-bold">✓</span>
              <span>Live Q&A with Dr. Muddu Nehru MD</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-600 font-bold">✓</span>
              <span>HOMA-IR test results interpretation</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-600 font-bold">✓</span>
              <span>Personalized remission protocols</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-600 font-bold">✓</span>
              <span>Success stories and case studies</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-600 font-bold">✓</span>
              <span>Access to exclusive VIP membership content</span>
            </li>
          </ul>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600 mb-4">
            Not a member yet? Join our VIP plan to access Zoom Sundays
          </p>
          <Link
            href="/pricing"
            className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold px-8 py-3 rounded-xl shadow-lg transition-all"
          >
            View Membership Plans →
          </Link>
        </div>
      </div>
    </div>
  );
}

