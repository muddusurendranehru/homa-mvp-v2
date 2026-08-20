'use client';

import { useState } from 'react';
import Link from 'next/link';

const packages = [
  {
    id: 1,
    name: "Mera Bharath Mahaan",
    price: "₹999",
    duration: "/month",
    icon: "🇮🇳",
    color: "from-orange-400 to-green-500",
    badge: "Starter",
    features: [
      "1 O.P. Visit (In-Clinic)",
      "1 Free 10-min Counselling Session",
      "Basic HOMA-IR & BMI Tracking",
      "Access to Daily Logging App"
    ],
    cta: "Start with ₹999",
    popular: false
  },
  {
    id: 2,
    name: "Mera Abhimaan",
    price: "₹9,999",
    duration: "",
    icon: "🛡️",
    color: "from-blue-400 to-indigo-500",
    badge: "Essential",
    features: [
      "1 Virtual O.P. Visit",
      "1 Single Episode Program Intro (10 min)",
      "1 Free Lab Profile",
      "NutriBot App (Free Access)",
      "Exercise Program (Free)",
      "Mental Assessment (Free)",
      "1 Medical Nutrition Intro (10 min)"
    ],
    cta: "Enroll Now →",
    popular: false
  },
  {
    id: 3,
    name: "Remission Pro",
    price: "₹29,999",
    duration: "",
    icon: "🎯",
    color: "from-teal-400 to-green-500",
    badge: "Most Popular",
    features: [
      "Monthly 2 Free Doctor O.P. Visits",
      "1 Free Lab Profile + End-of-Season Free Lab",
      "30-Day Fixed Diet Remission Program",
      "Exercise Program (Free)",
      "Mental Assessment + 10-min Counselling (Free)"
    ],
    cta: "Get Full Remission Plan",
    popular: true
  },
  {
    id: 4,
    name: "Lion Heart Palladium",
    price: "₹49,999",
    duration: "",
    icon: "🦁",
    color: "from-purple-400 to-pink-500",
    badge: "Premium",
    features: [
      "4 Weekly Virtual Visits (Zoom)",
      "Dedicated Counsellor On Board",
      "24/7 Follow-up Support",
      "NutriBot App (Free)",
      "30-Day Variable Remission Diet",
      "Exercise Program (Free)",
      "1 Lab Profile + 50% Off Next Lab",
      "20% Discount on Medicines",
      "Free Medicine Delivery (Within 20 km)",
      "Weekly Virtual Meeting + PJR",
      "10 Free Queries + 100 Tokens"
    ],
    cta: "Unlock Premium Care",
    popular: false
  },
  {
    id: 5,
    name: "Gold Membership",
    price: "₹99,999",
    duration: " (90 Days)",
    icon: "🥇",
    color: "from-yellow-400 to-amber-500",
    badge: "Ultimate",
    features: [
      "All Lab Tests Free (4 Times)",
      "NutriBot App (Free)",
      "3 Doctors Online 24/7",
      "1000 Free Tokens",
      "30% Discount on Medicines",
      "Free Medicine Delivery Anywhere",
      "2 Medical Counselling Sessions",
      "Online Exercise Trainer (Free)",
      "Meditation Guru (Free)",
      "30-min Weekly Mental Counselling",
      "Daily 10-min Motivation Expert",
      "24/7 Follow-up",
      "30-Day On-Demand 1800-Calorie Diet",
      "Future Web Apps & Membership Free",
      "Membership Card + Online Brochure",
      "Access to YT Videos, Recipes, Tailored Programs"
    ],
    cta: "Go Gold →",
    popular: false
  }
];

export default function PricingPage() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const handleEnroll = (pkgId: number, pkgName: string, price: string) => {
    const message = `Hi Dr. Muddu, I want to enroll in the ${pkgName} package (${price}). Please share payment details.`;
    window.open(`https://wa.me/919963721999?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="bg-gradient-to-b from-[#f0f7e6] to-[#e8f5e0] min-h-screen py-12 px-4 md:px-8">
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto mb-12">
        <span className="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
          💎 Premium Health Packages
        </span>
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
          Choose Your Metabolic Remission Journey
        </h1>
        <p className="text-lg md:text-xl text-gray-600">
          From basic tracking to gold-tier 24/7 care — find your perfect fit with Dr. Muddu
        </p>
      </div>

      {/* Packages Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 flex flex-col ${
                hoveredId === pkg.id ? 'shadow-2xl scale-[1.02] -translate-y-1' : ''
              } ${pkg.popular ? 'ring-2 ring-green-500' : ''}`}
              onMouseEnter={() => setHoveredId(pkg.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Badge */}
              <div className={`bg-gradient-to-r ${pkg.color} text-white text-center py-2 text-sm font-semibold`}>
                {pkg.badge}
                {pkg.popular && ' ⭐'}
              </div>

              <div className="p-5 flex-1 flex flex-col">
                {/* Icon + Title */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{pkg.icon}</span>
                  <h3 className="text-lg font-bold text-gray-800 leading-tight">{pkg.name}</h3>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <span className="text-3xl font-bold text-green-600">{pkg.price}</span>
                  <span className="text-gray-500 text-sm">{pkg.duration}</span>
                </div>

                {/* App Screenshot Placeholder */}
                <div className="relative w-full h-24 mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-blue-50 opacity-50"></div>
                  <div className="relative text-center">
                    <div className="text-3xl mb-1">{pkg.icon}</div>
                    <div className="text-xs text-gray-500">App Preview</div>
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute top-2 right-2 w-8 h-1 bg-gray-300 rounded"></div>
                  <div className="absolute top-4 right-2 w-6 h-1 bg-gray-300 rounded"></div>
                  <div className="absolute bottom-2 left-2 w-4 h-4 bg-green-200 rounded-full"></div>
                </div>

                {/* Features */}
                <ul className="space-y-2 mb-6 flex-1 text-sm">
                  {pkg.features.slice(0, 6).map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-600">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <span className="leading-tight">{feature}</span>
                    </li>
                  ))}
                  {pkg.features.length > 6 && (
                    <li className="text-green-600 font-medium text-xs pl-5">
                      +{pkg.features.length - 6} more features
                    </li>
                  )}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => handleEnroll(pkg.id, pkg.name, pkg.price)}
                  className={`w-full text-center px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white shadow-lg'
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  {pkg.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Note */}
      <div className="max-w-4xl mx-auto mt-12 bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
          📊 Quick Comparison
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-2">Feature</th>
                <th className="text-center py-2 px-1">🇮🇳</th>
                <th className="text-center py-2 px-1">🛡️</th>
                <th className="text-center py-2 px-1 bg-green-50">🎯</th>
                <th className="text-center py-2 px-1">🦁</th>
                <th className="text-center py-2 px-1">🥇</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              <tr className="border-b">
                <td className="py-2 px-2">HOMA-IR Tracking</td>
                <td className="text-center">✓</td>
                <td className="text-center">✓</td>
                <td className="text-center bg-green-50">✓</td>
                <td className="text-center">✓</td>
                <td className="text-center">✓</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-2">Doctor Visits</td>
                <td className="text-center">1</td>
                <td className="text-center">1</td>
                <td className="text-center bg-green-50">2/mo</td>
                <td className="text-center">4/mo</td>
                <td className="text-center">Unlimited</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-2">Lab Profile</td>
                <td className="text-center">-</td>
                <td className="text-center">1</td>
                <td className="text-center bg-green-50">2</td>
                <td className="text-center">2</td>
                <td className="text-center">4 (Free)</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-2">24/7 Support</td>
                <td className="text-center">-</td>
                <td className="text-center">-</td>
                <td className="text-center bg-green-50">-</td>
                <td className="text-center">✓</td>
                <td className="text-center">✓</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-2">Medicine Discount</td>
                <td className="text-center">-</td>
                <td className="text-center">-</td>
                <td className="text-center bg-green-50">-</td>
                <td className="text-center">20%</td>
                <td className="text-center">30%</td>
              </tr>
              <tr>
                <td className="py-2 px-2">Diet Program</td>
                <td className="text-center">-</td>
                <td className="text-center">-</td>
                <td className="text-center bg-green-50">Fixed</td>
                <td className="text-center">Variable</td>
                <td className="text-center">On-Demand</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="max-w-4xl mx-auto mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
        <span className="flex items-center gap-1">🔒 Secure Payment</span>
        <span className="flex items-center gap-1">✅ 7-Day Guarantee</span>
        <span className="flex items-center gap-1">👨‍⚕️ 30+ Years Experience</span>
        <span className="flex items-center gap-1">📞 24/7 Support</span>
      </div>

      {/* Footer Note */}
      <div className="text-center mt-8 text-sm text-gray-500">
        All packages include 90-day access unless specified. Prices in INR. Terms apply.
      </div>

      {/* Contact CTA */}
      <div className="max-w-md mx-auto mt-8 text-center">
        <p className="text-gray-600 mb-4">Need help choosing? Talk to our team!</p>
        <a
          href="https://wa.me/919963721999?text=Hi Dr. Muddu, I need help choosing the right package for my metabolic health journey."
          target="_blank"
          className="inline-flex items-center px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl shadow-lg transition-all"
        >
          💬 Chat with Dr. Muddu
        </a>
      </div>

      {/* 30-Day Diet Plan - After Enrollment */}
      <div className="max-w-2xl mx-auto mt-12 bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-2xl p-6 text-center">
        <div className="text-4xl mb-3">🥗</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">30-Day Diet Plan Included!</h3>
        <p className="text-gray-600 mb-4">
          After enrollment, access your personalized Indian diet plan with daily meal guides, recipes & shopping lists.
        </p>
        <a
          href="https://healthmetrics-render1.onrender.com/diet"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl shadow-lg transition-all"
        >
          🍽️ View 30-Day Diet Plan →
        </a>
        <p className="text-xs text-gray-500 mt-3">Free access after package enrollment</p>
      </div>

      {/* Back Link */}
      <div className="text-center mt-8">
        <Link href="/" className="text-green-600 hover:text-green-700 font-medium">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

