'use client';

import { useState } from 'react';

export default function WHTRCalculator() {
  const toolName = "Waist-to-Height Ratio (WHtR)";
  const [waist, setWaist] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState<{ value: number; stage: string; badgeClass: string; elevated: boolean } | null>(null);

  const calculateWHtR = () => {
    const w = parseFloat(waist);
    const h = parseFloat(height);
    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
      alert('Please enter valid measurements in centimeters.');
      return;
    }
    const whtr = parseFloat((w / h).toFixed(2));
    let stage: string;
    let badgeClass: string;
    let elevated = false;
    if (whtr < 0.40) {
      stage = 'Low';
      badgeClass = 'bg-blue-100 border-blue-500 text-blue-800';
    } else if (whtr < 0.50) {
      stage = 'Healthy';
      badgeClass = 'bg-green-100 border-green-500 text-green-800';
    } else if (whtr < 0.60) {
      stage = 'Increased Risk';
      badgeClass = 'bg-orange-100 border-orange-500 text-orange-800';
      elevated = true;
    } else {
      stage = 'High Risk';
      badgeClass = 'bg-red-100 border-red-500 text-red-800';
      elevated = true;
    }
    setResult({ value: whtr, stage, badgeClass, elevated });
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2">Free WHtR Calculator</h1>
        <p className="text-gray-700 mb-6 text-center">
          Waist-to-Height Ratio (WHtR) is the most accurate predictor of belly fat risk — better than BMI.
        </p>

        <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-lg border-2 border-orange-200">
          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Waist Circumference (cm)</label>
              <input
                type="number"
                value={waist}
                onChange={(e) => setWaist(e.target.value)}
                placeholder="e.g., 90"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">Height (cm)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="e.g., 170"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <button
              onClick={calculateWHtR}
              className="w-full bg-orange-600 text-white py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors"
            >
              Calculate WHtR
            </button>
          </div>

          {result && (
            <div className="mt-8 p-6 bg-white rounded-lg border-2 border-orange-300 text-center">
              <p className="text-4xl font-bold text-orange-700 mb-4">{result.value}</p>
              <span className={`inline-block px-4 py-2 rounded-full border-2 font-semibold text-lg ${result.badgeClass}`}>
                {result.stage}
              </span>
              <p className="text-sm text-gray-500 mt-3 italic">Keep your waist below half your height</p>
              {result.elevated && (
                <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded text-left">
                  <p className="text-gray-800">
                    Your <strong>{toolName}</strong> result suggests elevated metabolic risk.
                  </p>
                  <p className="mt-2 text-gray-700">
                    <strong>Next step:</strong> Get a <span className="text-green-600 font-medium">free 15-minute consultation</span>  
                    with <strong>Dr. Muddu Surendra Nehru, MD</strong> (32+ years) to understand your personalized remission plan.
                  </p>
                  <a 
                    href="https://wa.me/919963721999?text=Assessment"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2.5 rounded-lg transition"
                  >
                    WhatsApp 'Assessment' Now
                  </a>
                  <p className="mt-3 text-xs text-gray-500">
                    No cost. No obligation. Available in English & Telugu.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
          <p><strong>Note:</strong> Keep your waist circumference to less than half your height. Ideal for all adults.</p>
        </div>

        <div className="mt-6 text-center">
          <a href="/tools" className="text-orange-600 hover:underline">← Back to All Calculators</a>
        </div>
      </div>
    </div>
  );
}

