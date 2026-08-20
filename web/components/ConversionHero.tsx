'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ConversionHero() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    homaTest: '',
    frustration: '',
    nextStep: '',
  });

  const [calculatorData, setCalculatorData] = useState({
    triglycerides: '',
    glucose: '',
    bmi: '',
    waist: '',
  });

  const [tygResult, setTygResult] = useState<number | null>(null);
  const [bmiResult, setBmiResult] = useState<number | null>(null);

  const calculateTyG = () => {
    const tg = parseFloat(calculatorData.triglycerides);
    const gl = parseFloat(calculatorData.glucose);
    if (tg && gl) {
      const tyg = Math.log10(tg * gl / 2);
      setTygResult(tyg);
    }
  };

  const calculateBMI = () => {
    const bmi = parseFloat(calculatorData.bmi);
    const waist = parseFloat(calculatorData.waist);
    if (bmi && waist) {
      setBmiResult(bmi);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Name: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nHOMA Test: ${formData.homaTest}\nFrustration: ${formData.frustration}\nNext Step: ${formData.nextStep}`;
    window.open(`https://wa.me/919963721999?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="w-full">
      {/* 1. HERO SECTION */}
      <section className="bg-gradient-to-br from-green-600 via-teal-600 to-blue-700 text-white py-12 md:py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Uncontrolled sugars? Belly fat won't go?
            <br />
            <span className="text-yellow-300">90 Days Metabolic Freedom - GUARANTEED</span>
          </h1>
          <p className="text-lg md:text-xl mb-6 text-green-100">
            Dr. Muddu Nehru MD | Professor | 3 Lakh+ patients
          </p>
          <a
            href="https://wa.me/919963721999?text=I want to know more about the 90 Day Metabolic Freedom Program"
            target="_blank"
            className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-4 rounded-xl text-lg shadow-2xl transition-transform hover:scale-105"
          >
            📱 WhatsApp: 09963721999
          </a>
        </div>
      </section>

      {/* 2. FREE CALCULATOR SECTION */}
      <section className="bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">
            🧮 FREE Metabolic Calculator
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Triglycerides Glucose Index Calculator */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold mb-4 text-teal-600">
                Triglycerides Glucose Index (HOMA-IR proxy)
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Triglycerides (mg/dL)
                  </label>
                  <input
                    type="number"
                    value={calculatorData.triglycerides}
                    onChange={(e) => setCalculatorData({ ...calculatorData, triglycerides: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="e.g., 150"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Glucose (mg/dL)
                  </label>
                  <input
                    type="number"
                    value={calculatorData.glucose}
                    onChange={(e) => setCalculatorData({ ...calculatorData, glucose: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="e.g., 100"
                  />
                </div>
                <button
                  onClick={calculateTyG}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-lg transition-colors"
                >
                  Calculate TyG Index
                </button>
                {tygResult !== null && (
                  <div className="mt-4 p-4 bg-teal-50 rounded-lg">
                    <p className="text-lg font-bold text-teal-800">
                      Your TyG Index: <span className="text-2xl">{tygResult.toFixed(2)}</span>
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      {tygResult > 8.8 ? '⚠️ High - Consider metabolic intervention' : '✅ Normal range'}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* BMI + Waist Calculator */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold mb-4 text-blue-600">
                BMI + Waist Calculator
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    BMI
                  </label>
                  <input
                    type="number"
                    value={calculatorData.bmi}
                    onChange={(e) => setCalculatorData({ ...calculatorData, bmi: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 25.5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Waist Circumference (cm)
                  </label>
                  <input
                    type="number"
                    value={calculatorData.waist}
                    onChange={(e) => setCalculatorData({ ...calculatorData, waist: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 90"
                  />
                </div>
                <button
                  onClick={calculateBMI}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors"
                >
                  Calculate
                </button>
                {bmiResult !== null && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-lg font-bold text-blue-800">
                      Your BMI: <span className="text-2xl">{bmiResult.toFixed(1)}</span>
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      {bmiResult > 25 ? '⚠️ Overweight - Metabolic risk' : '✅ Healthy range'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FORM SECTION */}
      <section className="bg-white py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">
            🎯 Start Your 90-Day Journey
          </h2>
          <form onSubmit={handleSubmit} className="bg-gradient-to-br from-green-50 to-teal-50 p-6 md:p-8 rounded-xl shadow-lg">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="10-digit mobile number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Have you done HOMA test? *
                </label>
                <select
                  required
                  value={formData.homaTest}
                  onChange={(e) => setFormData({ ...formData, homaTest: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select...</option>
                  <option value="yes">Yes, I have done it</option>
                  <option value="no">No, not yet</option>
                  <option value="planning">Planning to do it</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  What's your biggest frustration? *
                </label>
                <textarea
                  required
                  value={formData.frustration}
                  onChange={(e) => setFormData({ ...formData, frustration: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., Belly fat won't reduce, sugar levels keep rising..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  What's your next step? *
                </label>
                <select
                  required
                  value={formData.nextStep}
                  onChange={(e) => setFormData({ ...formData, nextStep: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select...</option>
                  <option value="consultation">Book a consultation</option>
                  <option value="program">Join 90-day program</option>
                  <option value="info">Get more information</option>
                  <option value="test">Schedule HOMA test</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-bold py-4 rounded-lg text-lg shadow-xl transition-transform hover:scale-105"
              >
                🚀 Submit & Connect on WhatsApp
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* 4. PROOF SECTION */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            🏆 Trusted by 3 Lakh+ Patients
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">30+</div>
              <div className="text-lg text-gray-300">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-green-400 mb-2">3 Lakh+</div>
              <div className="text-lg text-gray-300">Patients Treated</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-teal-400 mb-2">85%</div>
              <div className="text-lg text-gray-300">Remission Rate</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

