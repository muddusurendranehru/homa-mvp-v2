'use client';

import { useState } from 'react';

export default function WaistCircumferenceCalculator() {
  const toolName = "Waist Circumference";
  const [waist, setWaist] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [result, setResult] = useState<{ risk: string; threshold: number } | null>(null);

  const assessRisk = () => {
    const w = parseFloat(waist);
    if (isNaN(w) || w <= 0) {
      alert('Please enter a valid waist circumference.');
      return;
    }
    
    const threshold = gender === 'male' ? 90 : 80; // cm
    let risk = '';
    if (w < threshold) {
      risk = 'Normal – Low Metabolic Risk';
    } else if (w < threshold + 10) {
      risk = 'Increased Risk';
    } else {
      risk = 'High Risk – Central Obesity Present';
    }
    
    setResult({ risk, threshold });
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2">Waist Circumference Assessment</h1>
        <p className="text-gray-700 mb-6 text-center">
          Measure your waist circumference to assess central obesity risk.
        </p>

        <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-lg border-2 border-orange-200">
          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as 'male' | 'female')}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">Waist Circumference (cm)</label>
              <input
                type="number"
                value={waist}
                onChange={(e) => setWaist(e.target.value)}
                placeholder="e.g., 95"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <button
              onClick={assessRisk}
              className="w-full bg-orange-600 text-white py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors"
            >
              Assess Risk
            </button>
          </div>

          {result && (
            <div className="mt-8 p-6 bg-white rounded-lg border-2 border-orange-300 text-center">
              <p className="text-xl font-semibold text-gray-800 mb-2">{result.risk}</p>
              <p className="text-sm text-gray-600 mb-4">
                Threshold: {gender === 'male' ? '90' : '80'} cm ({gender === 'male' ? 'Male' : 'Female'})
              </p>
              {parseFloat(waist) >= result.threshold && (
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
          <p><strong>Note:</strong> This tool is for educational purposes. Always consult Dr. Muddu Surendra Nehru, MD for interpretation.</p>
        </div>

        <div className="mt-6 text-center">
          <a href="/tools" className="text-orange-600 hover:underline">← Back to All Calculators</a>
        </div>
      </div>
    </div>
  );
}

