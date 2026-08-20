'use client';

import { useState } from 'react';

export default function BMICalculator() {
  const toolName = "BMI";
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState<{ value: number; category: string } | null>(null);

  const calculateBMI = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (isNaN(h) || isNaN(w) || h <= 0 || w <= 0) {
      alert('Please enter valid height and weight values.');
      return;
    }
    // Convert height from cm to meters if > 3 (assuming cm if > 3, meters if < 3)
    const heightInMeters = h > 3 ? h / 100 : h;
    const bmi = w / (heightInMeters * heightInMeters);
    
    let category = '';
    if (bmi < 18.5) category = 'Underweight';
    else if (bmi < 25) category = 'Normal Weight';
    else if (bmi < 30) category = 'Overweight';
    else category = 'Obesity – High Metabolic Risk';
    
    setResult({ value: parseFloat(bmi.toFixed(1)), category });
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2">BMI Calculator</h1>
        <p className="text-gray-700 mb-6 text-center">
          Enter your height and weight to calculate your Body Mass Index.
        </p>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border-2 border-green-200">
          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Height (cm)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="e.g., 170"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">Weight (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="e.g., 70"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <button
              onClick={calculateBMI}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Calculate BMI
            </button>
          </div>

          {result && (
            <div className="mt-8 p-6 bg-white rounded-lg border-2 border-green-300 text-center">
              <p className="text-4xl font-bold text-green-700 mb-2">{result.value}</p>
              <p className="text-xl font-semibold text-gray-800 mb-4">{result.category}</p>
              {result.value >= 25 && (
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
          <a href="/tools" className="text-green-600 hover:underline">← Back to All Calculators</a>
        </div>
      </div>
    </div>
  );
}

