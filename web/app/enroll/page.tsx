'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function EnrollmentPage() {
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'full'>('full');
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    if (!token) {
      router.push('/auth');
      return;
    }
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, [router]);

  const plans = {
    monthly: {
      name: 'Monthly Plan',
      price: '₹999',
      priceUSD: '$12',
      duration: 'per month',
      total: '₹2,997 for 90 days',
      features: [
        'Full dashboard access',
        'Daily habit tracking',
        'HOMA-IR & TyG monitoring',
        'Cancel anytime',
      ],
    },
    full: {
      name: '90-Day Complete Program',
      price: '₹1,999',
      priceUSD: '$25',
      duration: 'one-time',
      total: 'Save ₹998 vs monthly',
      badge: 'Best Value',
      features: [
        'Everything in Monthly, plus:',
        '3 video consultations with Dr. Muddu',
        'Personalized diet plan',
        'WhatsApp priority support',
        'Progress report PDFs',
        'Success guarantee',
      ],
    },
  };

  const handleUPIPayment = () => {
    const plan = plans[selectedPlan];
    const message = `Hi Dr. Muddu, I want to enroll in the ${plan.name} (${plan.price}). My email: ${user?.email || 'N/A'}`;
    window.open(`https://wa.me/919963721999?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleStripeCheckout = async () => {
    setLoading(true);
    try {
      // This will work when Stripe is configured
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          plan: selectedPlan,
          email: user?.email 
        }),
      });
      const data = await res.json();
      
      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe
      } else {
        // Stripe not configured yet - fallback to UPI
        alert('Online payment coming soon! Please use UPI/WhatsApp for now.');
        handleUPIPayment();
      }
    } catch (err) {
      console.error(err);
      // Fallback to UPI
      alert('Online payment coming soon! Please use UPI/WhatsApp for now.');
      handleUPIPayment();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-teal-600 to-blue-700 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-1 bg-yellow-500/30 text-yellow-200 rounded-full text-sm font-medium mb-4">
            🎯 Limited Time Offer
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Enroll in the 90-Day Metabolic Remission Program
          </h1>
          <p className="text-lg text-teal-100 max-w-2xl mx-auto">
            Join Dr. Muddu's proven protocol to reverse insulin resistance, 
            reduce waist circumference, and achieve metabolic health.
          </p>
        </div>
      </section>

      {/* Plan Selection */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Monthly Plan */}
          <div 
            onClick={() => setSelectedPlan('monthly')}
            className={`bg-white rounded-2xl p-6 border-2 cursor-pointer transition-all ${
              selectedPlan === 'monthly' 
                ? 'border-teal-500 shadow-lg' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">{plans.monthly.name}</h3>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selectedPlan === 'monthly' ? 'border-teal-500 bg-teal-500' : 'border-gray-300'
              }`}>
                {selectedPlan === 'monthly' && <span className="text-white text-sm">✓</span>}
              </div>
            </div>
            <div className="mb-4">
              <span className="text-4xl font-bold text-gray-900">{plans.monthly.price}</span>
              <span className="text-gray-500 ml-2">{plans.monthly.duration}</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">{plans.monthly.total}</p>
            <ul className="space-y-2">
              {plans.monthly.features.map((feature, i) => (
                <li key={i} className="flex items-start text-sm text-gray-600">
                  <span className="text-teal-500 mr-2">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Full Program */}
          <div 
            onClick={() => setSelectedPlan('full')}
            className={`bg-white rounded-2xl p-6 border-2 cursor-pointer transition-all relative ${
              selectedPlan === 'full' 
                ? 'border-teal-500 shadow-lg' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            {plans.full.badge && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                ⭐ {plans.full.badge}
              </span>
            )}
            <div className="flex items-center justify-between mb-4 mt-2">
              <h3 className="text-xl font-bold text-gray-800">{plans.full.name}</h3>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selectedPlan === 'full' ? 'border-teal-500 bg-teal-500' : 'border-gray-300'
              }`}>
                {selectedPlan === 'full' && <span className="text-white text-sm">✓</span>}
              </div>
            </div>
            <div className="mb-4">
              <span className="text-4xl font-bold text-teal-600">{plans.full.price}</span>
              <span className="text-gray-500 ml-2">{plans.full.duration}</span>
            </div>
            <p className="text-sm text-green-600 font-medium mb-4">{plans.full.total}</p>
            <ul className="space-y-2">
              {plans.full.features.map((feature, i) => (
                <li key={i} className="flex items-start text-sm text-gray-600">
                  <span className="text-teal-500 mr-2">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Payment Options */}
        <div className="mt-10 bg-white rounded-2xl shadow-lg p-8 border">
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
            Choose Payment Method
          </h2>
          
          <div className="space-y-4">
            {/* UPI Payment - Primary */}
            <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6 border border-green-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">💳</span>
                  <div>
                    <h3 className="font-bold text-gray-800">UPI Payment</h3>
                    <p className="text-sm text-gray-500">GPay • PhonePe • Paytm • BHIM</p>
                  </div>
                </div>
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">Recommended</span>
              </div>
              <button
                onClick={handleUPIPayment}
                className="w-full py-3 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center"
              >
                <span className="mr-2">💬</span>
                Pay {plans[selectedPlan].price} via WhatsApp
              </button>
              <p className="text-xs text-gray-500 mt-2 text-center">
                You'll receive UPI QR code on WhatsApp • Instant confirmation
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="px-4 text-gray-400 text-sm">or</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            {/* Card Payment - Coming Soon */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 relative overflow-hidden">
              <div className="absolute top-2 right-2">
                <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">Coming Soon</span>
              </div>
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">💳</span>
                <div>
                  <h3 className="font-bold text-gray-800">Card / Net Banking</h3>
                  <p className="text-sm text-gray-500">Visa • Mastercard • RuPay • Net Banking</p>
                </div>
              </div>
              <button
                onClick={handleStripeCheckout}
                disabled={loading}
                className={`w-full py-3 rounded-xl font-medium transition-all flex items-center justify-center ${
                  loading 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>Pay {plans[selectedPlan].price} with Card</>
                )}
              </button>
              <p className="text-xs text-gray-400 mt-2 text-center">
                Stripe/Razorpay integration coming soon
              </p>
            </div>
          </div>

          {/* Security Badge */}
          <div className="mt-6 flex items-center justify-center space-x-6 text-sm text-gray-500">
            <span className="flex items-center">
              <span className="mr-1">🔒</span> Secure Payment
            </span>
            <span className="flex items-center">
              <span className="mr-1">✅</span> 7-Day Guarantee
            </span>
            <span className="flex items-center">
              <span className="mr-1">📞</span> 24/7 Support
            </span>
          </div>
        </div>

        {/* What You Get */}
        <div className="mt-10">
          <h2 className="text-xl font-bold text-center text-gray-800 mb-6">
            🎁 What's Included in Your Enrollment
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-5 shadow-md text-center">
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-semibold text-gray-800">Full Dashboard</h3>
              <p className="text-sm text-gray-500">Track HOMA-IR, TyG, BMI, BP daily</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-md text-center">
              <div className="text-3xl mb-2">👨‍⚕️</div>
              <h3 className="font-semibold text-gray-800">Doctor Support</h3>
              <p className="text-sm text-gray-500">Direct WhatsApp with Dr. Muddu</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-md text-center">
              <div className="text-3xl mb-2">🏆</div>
              <h3 className="font-semibold text-gray-800">Success System</h3>
              <p className="text-sm text-gray-500">Proven 90-day remission protocol</p>
            </div>
          </div>
        </div>

        {/* Guarantee */}
        <div className="mt-10 bg-yellow-50 rounded-2xl p-6 border border-yellow-200 text-center">
          <h3 className="text-lg font-bold text-gray-800 mb-2">
            🛡️ 7-Day Satisfaction Guarantee
          </h3>
          <p className="text-gray-600 text-sm max-w-xl mx-auto">
            If you're not completely satisfied with the program within 7 days, 
            contact us for a full refund. No questions asked. We're confident 
            you'll love the results!
          </p>
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link href="/dashboard" className="text-teal-600 hover:text-teal-700 font-medium">
            ← Back to Dashboard
          </Link>
        </div>
      </section>
    </div>
  );
}

