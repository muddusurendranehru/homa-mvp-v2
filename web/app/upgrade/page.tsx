'use client';

import Link from 'next/link';

export default function UpgradePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-teal-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm font-medium mb-4">
            💎 Upgrade Your Health Journey
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Premium Metabolic Care
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Unlock advanced features, personalized coaching, and priority support 
            to accelerate your metabolic remission journey.
          </p>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Basic Plan */}
          <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-8 relative">
            <div className="absolute top-4 right-4">
              <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                Current Plan
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Basic</h3>
            <div className="flex items-baseline mb-6">
              <span className="text-4xl font-bold text-gray-900">Free</span>
              <span className="text-gray-500 ml-2">Forever</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-600">Health Assessment Form</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-600">HOMA-IR & TyG Calculation</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-600">Basic Dashboard</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-600">90-Day Program Access</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-600">Daily Habit Tracking</span>
              </li>
              <li className="flex items-start text-gray-400">
                <span className="mr-2">✗</span>
                <span>Advanced Analytics</span>
              </li>
              <li className="flex items-start text-gray-400">
                <span className="mr-2">✗</span>
                <span>Personalized Coaching</span>
              </li>
              <li className="flex items-start text-gray-400">
                <span className="mr-2">✗</span>
                <span>Priority Support</span>
              </li>
            </ul>
            <Link
              href="/dashboard"
              className="block w-full text-center py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
            >
              Continue Free
            </Link>
          </div>

          {/* Premium Plan */}
          <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl shadow-xl border-2 border-teal-400 p-8 relative">
            <div className="absolute top-4 right-4">
              <span className="bg-gradient-to-r from-teal-500 to-blue-500 text-white text-xs px-3 py-1 rounded-full">
                ⭐ Recommended
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Premium</h3>
            <div className="flex items-baseline mb-6">
              <span className="text-4xl font-bold text-teal-600">₹999</span>
              <span className="text-gray-500 ml-2">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <span className="text-teal-500 mr-2">✓</span>
                <span className="text-gray-700 font-medium">Everything in Basic, plus:</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-500 mr-2">✓</span>
                <span className="text-gray-700">📊 <strong>Advanced Analytics</strong> - Trend graphs, prediction models</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-500 mr-2">✓</span>
                <span className="text-gray-700">🎯 <strong>Personalized Coaching</strong> - Tailored diet & exercise plans</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-500 mr-2">✓</span>
                <span className="text-gray-700">⚡ <strong>Priority Support</strong> - Direct WhatsApp with Dr. Muddu</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-500 mr-2">✓</span>
                <span className="text-gray-700">📱 <strong>Weekly Check-ins</strong> - Video consultations</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-500 mr-2">✓</span>
                <span className="text-gray-700">📋 <strong>Detailed Reports</strong> - Monthly progress PDFs</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-500 mr-2">✓</span>
                <span className="text-gray-700">🏆 <strong>Success Guarantee</strong> - Extended support if needed</span>
              </li>
            </ul>
            <a
              href="https://wa.me/919963721999?text=I want to upgrade to Premium plan (₹999/month)"
              target="_blank"
              className="block w-full text-center py-3 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg transition-all"
            >
              💬 Contact to Upgrade
            </a>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            🚀 Why Upgrade to Premium?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md text-center">
              <div className="text-4xl mb-3">📈</div>
              <h3 className="font-bold text-gray-800 mb-2">Deeper Insights</h3>
              <p className="text-gray-600 text-sm">
                Advanced analytics reveal hidden patterns in your metabolic data. 
                Understand what's working and what needs adjustment.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md text-center">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="font-bold text-gray-800 mb-2">Tailored Advice</h3>
              <p className="text-gray-600 text-sm">
                Personalized nutrition and exercise plans based on YOUR body, 
                YOUR lifestyle, and YOUR goals. No generic advice.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md text-center">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="font-bold text-gray-800 mb-2">Faster Results</h3>
              <p className="text-gray-600 text-sm">
                Priority support means your questions get answered quickly. 
                Direct access to Dr. Muddu accelerates your progress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Info Section */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-8 border border-green-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">💳</span> Simple & Secure Payment via UPI
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">How It Works:</h3>
              <ol className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="bg-teal-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                  Contact us via WhatsApp or phone
                </li>
                <li className="flex items-start">
                  <span className="bg-teal-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                  Receive UPI payment link (GPay/PhonePe/Paytm)
                </li>
                <li className="flex items-start">
                  <span className="bg-teal-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                  Complete payment & share screenshot
                </li>
                <li className="flex items-start">
                  <span className="bg-teal-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">4</span>
                  Premium activated within 24 hours
                </li>
              </ol>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">Why UPI?</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Widely used by clinics & small businesses in India
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Keeps costs low - savings passed to you
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  No complex payment gateway bureaucracy
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Lean, affordable, and functional for Indian users
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-800">
              <strong>📝 Note:</strong> Manual payment verification is our current approach - 
              it works great for our pilot phase! As we grow, we'll integrate automated 
              payment gateways for instant reconciliation.
            </p>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-center mb-8 flex items-center justify-center">
            <span className="mr-2">🔒</span> Your Data is Safe with Us
          </h2>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl mb-2">🔐</div>
              <h3 className="font-semibold text-teal-400 mb-1">Encrypted</h3>
              <p className="text-gray-400 text-sm">All data encrypted in transit and at rest</p>
            </div>
            <div>
              <div className="text-3xl mb-2">🚫</div>
              <h3 className="font-semibold text-teal-400 mb-1">Never Shared</h3>
              <p className="text-gray-400 text-sm">Your health data is never sold or shared</p>
            </div>
            <div>
              <div className="text-3xl mb-2">✅</div>
              <h3 className="font-semibold text-teal-400 mb-1">Trusted Partners</h3>
              <p className="text-gray-400 text-sm">Neon PostgreSQL & Render cloud hosting</p>
            </div>
            <div>
              <div className="text-3xl mb-2">👨‍⚕️</div>
              <h3 className="font-semibold text-teal-400 mb-1">Doctor-Led</h3>
              <p className="text-gray-400 text-sm">30+ years medical ethics & confidentiality</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-teal-600 to-blue-700 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">
            📞 Contact Our Team
          </h2>
          <p className="text-teal-100 mb-6 max-w-xl mx-auto">
            Have questions about Premium? Want a demo of advanced features? 
            We're here to help you make the right decision for your health journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <a
              href="https://wa.me/919963721999?text=I have questions about the Premium plan"
              target="_blank"
              className="inline-flex items-center justify-center px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl shadow-lg transition-all"
            >
              💬 WhatsApp: 09963721999
            </a>
            <a
              href="tel:+919963721999"
              className="inline-flex items-center justify-center px-8 py-3 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-xl transition-all"
            >
              📞 Call: 09963721999
            </a>
          </div>
          <p className="text-teal-200 text-sm">
            📧 Email: <a href="mailto:homahealthcarecenter@gmail.com" className="underline hover:text-white">homahealthcarecenter@gmail.com</a>
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          ❓ Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-6 shadow-md border">
            <h3 className="font-semibold text-gray-800 mb-2">Is UPI payment safe?</h3>
            <p className="text-gray-600 text-sm">
              Yes! UPI is India's most trusted payment method, backed by RBI. Millions of 
              small businesses and healthcare providers use UPI daily. Your payment goes 
              directly to our verified business account.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md border">
            <h3 className="font-semibold text-gray-800 mb-2">Can I cancel anytime?</h3>
            <p className="text-gray-600 text-sm">
              Yes! Premium is month-to-month. Simply don't renew next month if you wish to 
              stop. No hidden fees, no long-term contracts.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md border">
            <h3 className="font-semibold text-gray-800 mb-2">What if I'm not satisfied?</h3>
            <p className="text-gray-600 text-sm">
              We offer a 7-day satisfaction guarantee. If Premium doesn't meet your 
              expectations, contact us for a full refund - no questions asked.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md border">
            <h3 className="font-semibold text-gray-800 mb-2">Will you add card payments later?</h3>
            <p className="text-gray-600 text-sm">
              Yes! As we grow, we'll integrate Razorpay/Stripe for automated payments 
              with cards, net banking, and auto-renewal. UPI keeps things lean for now.
            </p>
          </div>
        </div>
      </section>

      {/* Back to Dashboard */}
      <section className="text-center pb-12">
        <Link
          href="/dashboard"
          className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium"
        >
          ← Back to Dashboard
        </Link>
      </section>
    </div>
  );
}

