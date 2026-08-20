'use client';

import { useState } from 'react';

interface FormData {
  // Basic (Q1-5)
  fullName: string;
  whatsappNumber: string;
  email: string;
  age: string;
  gender: string;
  
  // Medical Evaluation (Q6-12)
  height: string;
  weight: string;
  waistCircumference: string;
  fastingBloodSugar: string;
  totalCholesterol: string;
  triglycerides: string;
  weightLossAttempts: string;
  
  // Intent Scoring (Q13-15)
  biggestFrustration: string[];
  investmentTimeline: string;
  commitmentLevel: string;
}

interface Scores {
  bmiScore: number;
  tygIndex: number;
  metabolicRiskScore: number;
  leadQualityScore: number;
}

export default function LeadScoringForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    whatsappNumber: '',
    email: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    waistCircumference: '',
    fastingBloodSugar: '',
    totalCholesterol: '',
    triglycerides: '',
    weightLossAttempts: '',
    biggestFrustration: [],
    investmentTimeline: '',
    commitmentLevel: '',
  });

  const [scores, setScores] = useState<Scores | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Calculate all scores
  const calculateScores = (): Scores => {
    const height = parseFloat(formData.height) / 100; // Convert cm to m
    const weight = parseFloat(formData.weight);
    const waist = parseFloat(formData.waistCircumference);
    const fbs = parseFloat(formData.fastingBloodSugar);
    const tg = parseFloat(formData.triglycerides);
    const weightLossAttempts = parseFloat(formData.weightLossAttempts) || 0;
    const commitmentLevel = parseFloat(formData.commitmentLevel) || 0;

    // BMI Score
    const bmi = weight / (height * height);
    const bmiScore = bmi > 0 ? bmi : 0;

    // TyG Index = Ln[fasting triglycerides(mg/dL) × fasting glucose(mg/dL)/2]
    const tygIndex = fbs > 0 && tg > 0 
      ? Math.log((tg * fbs) / 2) 
      : 0;

    // Metabolic Risk Score = BMI + Waist + TyG + Age factor (0-100%)
    let metabolicRisk = 0;
    const age = parseFloat(formData.age) || 0;
    
    // BMI component (0-30 points)
    if (bmi > 30) metabolicRisk += 30;
    else if (bmi > 25) metabolicRisk += 20;
    else if (bmi > 23) metabolicRisk += 10;
    
    // Waist component (0-25 points)
    if (waist > 90) metabolicRisk += 25;
    else if (waist > 80) metabolicRisk += 15;
    else if (waist > 70) metabolicRisk += 5;
    
    // TyG Index component (0-25 points)
    if (tygIndex > 8.8) metabolicRisk += 25;
    else if (tygIndex > 8.5) metabolicRisk += 15;
    else if (tygIndex > 8.0) metabolicRisk += 10;
    
    // Age factor (0-20 points)
    if (age > 60) metabolicRisk += 20;
    else if (age > 50) metabolicRisk += 15;
    else if (age > 40) metabolicRisk += 10;
    else if (age > 30) metabolicRisk += 5;

    // Lead Quality Score (0-100%)
    let leadQuality = 0;
    
    // Intent scoring (Q13-15) - 60 points max
    const frustrationCount = formData.biggestFrustration.length;
    leadQuality += Math.min(frustrationCount * 15, 30); // Max 30 points
    
    // Investment timeline - 20 points
    if (formData.investmentTimeline === 'Start immediately') leadQuality += 20;
    else if (formData.investmentTimeline === 'Next 30 days') leadQuality += 15;
    else if (formData.investmentTimeline === 'Next 3 months') leadQuality += 10;
    else if (formData.investmentTimeline === 'Just exploring') leadQuality += 5;
    
    // Commitment level - 20 points
    leadQuality += (commitmentLevel / 10) * 20;
    
    // Medical urgency - 20 points
    if (metabolicRisk > 60) leadQuality += 20;
    else if (metabolicRisk > 40) leadQuality += 15;
    else if (metabolicRisk > 20) leadQuality += 10;

    return {
      bmiScore: Math.round(bmiScore * 10) / 10,
      tygIndex: Math.round(tygIndex * 100) / 100,
      metabolicRiskScore: Math.min(metabolicRisk, 100),
      leadQualityScore: Math.min(leadQuality, 100),
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const calculatedScores = calculateScores();
    setScores(calculatedScores);
    
    // Prepare data for API
    const leadData = {
      ...formData,
      ...calculatedScores,
      submittedAt: new Date().toISOString(),
    };

    try {
      // Save to Neon DB via Next.js API route
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData),
      });

      const result = await response.json();
      
      if (result.success) {
        console.log('Lead saved successfully:', result.leadId);
        
        // Open WhatsApp with pre-filled message
        const message = `Hi Dr. Muddu! I completed the Metabolic Evaluation.

Name: ${formData.fullName}
Age: ${formData.age || 'N/A'}
WhatsApp: ${formData.whatsappNumber || 'N/A'}
Email: ${formData.email}

Metabolic Risk Score: ${calculatedScores.metabolicRiskScore}%
Lead Quality Score: ${calculatedScores.leadQualityScore}%
BMI: ${calculatedScores.bmiScore}
TyG Index: ${calculatedScores.tygIndex}

I'm interested in the 90-Day Metabolic Remission Program in Gachibowli, Hyderabad.`;

        window.open(`https://wa.me/919963721999?text=${encodeURIComponent(message)}`, '_blank');
        setSubmitted(true);
      } else {
        console.error('Failed to save lead:', result.error);
        alert('Failed to save your information. Please try again or contact us directly at 09963721999.');
        // Still open WhatsApp even if save fails
        const message = `Hi Dr. Muddu! I completed the Metabolic Evaluation but had trouble saving online.

Name: ${formData.fullName}
Email: ${formData.email}
Metabolic Risk: ${calculatedScores.metabolicRiskScore}%

I'm interested in the 90-Day Program in Gachibowli.`;
        window.open(`https://wa.me/919963721999?text=${encodeURIComponent(message)}`, '_blank');
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while saving. Opening WhatsApp to contact directly...');
      // Still open WhatsApp on error
      const message = `Hi Dr. Muddu! I completed the Metabolic Evaluation.

Name: ${formData.fullName}
Email: ${formData.email}
Metabolic Risk: ${calculatedScores.metabolicRiskScore}%

I'm interested in the 90-Day Program in Gachibowli.`;
      window.open(`https://wa.me/919963721999?text=${encodeURIComponent(message)}`, '_blank');
      setSubmitted(true);
    }
  };

  const updateField = (field: keyof FormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleFrustration = (value: string) => {
    setFormData(prev => ({
      ...prev,
      biggestFrustration: prev.biggestFrustration.includes(value)
        ? prev.biggestFrustration.filter(f => f !== value)
        : [...prev.biggestFrustration, value]
    }));
  };

  if (submitted && scores) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Happily Submitted! 🎉
            </h2>
            <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl p-6 mb-6">
              <p className="text-lg mb-2">Your Metabolic Risk Score</p>
              <p className="text-5xl font-bold">{scores.metabolicRiskScore}% 🔥</p>
            </div>
            
            <div className="bg-green-50 border-2 border-green-400 rounded-xl p-6 mb-6">
              <p className="text-xl font-bold text-green-800">
                ✅ You're eligible for 90-Day Program
              </p>
            </div>

            {/* Smart CTA based on Lead Quality Score */}
            {scores.leadQualityScore >= 100 ? (
              <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold text-yellow-800 mb-2">
                  🏆 High-Value Lead Detected!
                </h3>
                <p className="text-gray-700 mb-4">
                  Your lead quality score is {scores.leadQualityScore}%. You qualify for a direct consultation with Dr. Nehru.
                </p>
                <a
                  href="https://wa.me/919963721999?text=I want to book a premium appointment with Dr. Nehru"
                  target="_blank"
                  className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-8 py-4 rounded-lg transition-transform hover:scale-105 text-lg"
                >
                  📱 Book Dr. Nehru Appointment
                </a>
              </div>
            ) : scores.leadQualityScore >= 60 ? (
              <div className="bg-blue-50 border-2 border-blue-400 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold text-blue-800 mb-2">
                  💬 Warm Lead - Nurturing Path
                </h3>
                <p className="text-gray-700 mb-4">
                  Your lead quality score is {scores.leadQualityScore}%. Join our WhatsApp group and receive our free metabolic health booklet.
                </p>
                <a
                  href="https://wa.me/919963721999?text=I want to join the WhatsApp group and get the free booklet"
                  target="_blank"
                  className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold px-8 py-4 rounded-lg transition-transform hover:scale-105 text-lg"
                >
                  📱 Join WhatsApp Group + Get Booklet
                </a>
              </div>
            ) : (
              <div className="bg-purple-50 border-2 border-purple-400 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold text-purple-800 mb-2">
                  📚 Education First - Future Patient
                </h3>
                <p className="text-gray-700 mb-4">
                  Your lead quality score is {scores.leadQualityScore}%. Start with our educational YouTube content to learn more about metabolic health.
                </p>
                <a
                  href="https://www.youtube.com/channel/UCf8avHrw6K07POXSIoKgHwg"
                  target="_blank"
                  className="inline-block bg-purple-500 hover:bg-purple-600 text-white font-bold px-8 py-4 rounded-lg transition-transform hover:scale-105 text-lg"
                >
                  📺 Watch Educational Videos
                </a>
              </div>
            )}

            {/* Score Breakdown */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">BMI Score</p>
                <p className="text-2xl font-bold text-gray-800">{scores.bmiScore}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">TyG Index</p>
                <p className="text-2xl font-bold text-gray-800">{scores.tygIndex}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">Metabolic Risk</p>
                <p className="text-2xl font-bold text-gray-800">{scores.metabolicRiskScore}%</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">Lead Quality</p>
                <p className="text-2xl font-bold text-gray-800">{scores.leadQualityScore}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* FRUSTRATION → SOLUTION Band - Above Calculator */}
        <div className="frustration grid md:grid-cols-2 gap-4 mb-8">
          <div className="bg-red-50 border-l-4 border-red-400 p-4 md:p-6 rounded-lg">
            <h3 className="text-lg md:text-xl font-bold text-red-800 mb-2">
              Common Frustrations
            </h3>
            <p className="text-sm md:text-base text-red-700">
              Endless pills, side effects, no reversal. Many patients struggle with tablets that only manage symptoms without addressing root causes.
            </p>
          </div>
          <div className="bg-green-50 border-l-4 border-green-400 p-4 md:p-6 rounded-lg">
            <h3 className="text-lg md:text-xl font-bold text-green-800 mb-2">
              HOMA Solution
            </h3>
            <p className="text-sm md:text-base text-green-700">
              Evidence‑based 90‑day protocol with 85% remission rate. Focuses on metabolic root causes, not just symptom management.
            </p>
          </div>
        </div>

        {/* Explainer Video Block */}
        <div className="video-hero mb-8 rounded-2xl overflow-hidden shadow-2xl bg-white">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src="https://www.youtube.com/embed/m3x-eAWeZdk"
              className="absolute top-0 left-0 w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Dr Muddu Nehru | 90 Day Triglycerides Protocol"
            />
          </div>
          <div className="p-4">
            <h3 className="text-center text-lg md:text-xl font-semibold text-indigo-700 mb-2">
              Dr Muddu Nehru | 90 Day Triglycerides Protocol
            </h3>
            <a
              href="#calculator"
              className="block text-center text-sm text-indigo-600 hover:text-indigo-800 underline mt-2 mb-4"
            >
              Prefer to read? Scroll to see how it works.
            </a>
            {/* YouTube Channel Subscribe Button */}
            <div className="yt-channel mt-4 text-center">
              <a
                href="https://www.youtube.com/channel/UCf8avHrw6K07POXSIoKgHwg"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-lg"
              >
                📺 Subscribe Dr Muddu Channel (100+ Doctor Mentor)
              </a>
            </div>
          </div>
        </div>

        {/* SEO H1 - Above Calculator/Form */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-4 px-4">
          Diabetologist in Gachibowli | 90‑Day Diabetes & Heart Risk Reversal – Dr. Muddu Nehru MD
        </h1>

        {/* Who This Is For - Below Hero */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 md:p-6 mb-6 border-l-4 border-teal-500 shadow-md">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 text-center md:text-left">
            Who this is for:
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-teal-600 font-bold mt-1">•</span>
              <span>New diabetics or pre‑diabetics</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-600 font-bold mt-1">•</span>
              <span>Long‑term on tablets with poor control</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-600 font-bold mt-1">•</span>
              <span>Heart disease or obesity with high sugars</span>
            </li>
          </ul>
        </div>
        
        {/* Hero CTA */}
        <div className="text-center mb-6">
          <a
            href="https://wa.me/919963721999?text=Hi%20Dr.%20Muddu!%20I%20want%20to%20start%20the%20Free%20Metabolic%20Risk%20Assessment%20for%20the%2090-Day%20Program%20in%20Gachibowli,%20Hyderabad."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-bold px-6 py-3 md:px-8 md:py-4 rounded-xl text-lg md:text-xl shadow-xl transition-all transform hover:scale-105"
          >
            Free Risk Assessment → WhatsApp 09963721999
          </a>
        </div>

        {/* WhatsApp Share Button */}
        <div className="text-center mb-6">
          <a
            href="https://wa.me/919963721999?text=Best%20diabetologist%20Gachibowli%20Dr%20Muddu%20Nehru%2090%20day%20remission"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-share inline-block bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all transform hover:scale-105"
          >
            💬 Share on WhatsApp
          </a>
        </div>
        
        <div id="calculator" className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              🎯 90-Day Metabolic Freedom Evaluation
            </h2>
            <p className="text-gray-600">
              Complete this 15-question assessment to get your personalized metabolic risk score
            </p>
            <div className="mt-4 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-500 to-teal-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 15) * 100}%` }}
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">Question {currentStep} of 15</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Q1: Full Name */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <label className="block text-lg font-semibold text-gray-700">
                  1. Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => updateField('fullName', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>
            )}

            {/* Q2: WhatsApp Number */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <label className="block text-lg font-semibold text-gray-700">
                  2. WhatsApp Number (Primary contact) *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.whatsappNumber}
                  onChange={(e) => updateField('whatsappNumber', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="10-digit mobile number"
                />
              </div>
            )}

            {/* Q3: Email */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <label className="block text-lg font-semibold text-gray-700">
                  3. Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>
            )}

            {/* Q4: Age */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <label className="block text-lg font-semibold text-gray-700">
                  4. Age *
                </label>
                <input
                  type="number"
                  required
                  min="18"
                  max="100"
                  value={formData.age}
                  onChange={(e) => updateField('age', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your age"
                />
              </div>
            )}

            {/* Q5: Gender */}
            {currentStep === 5 && (
              <div className="space-y-4">
                <label className="block text-lg font-semibold text-gray-700">
                  5. Gender *
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {['M', 'F', 'O'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => updateField('gender', option)}
                      className={`px-6 py-4 border-2 rounded-lg font-semibold transition-all ${
                        formData.gender === option
                          ? 'bg-green-500 text-white border-green-500'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-green-300'
                      }`}
                    >
                      {option === 'M' ? 'Male' : option === 'F' ? 'Female' : 'Other'}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Q6: Height */}
            {currentStep === 6 && (
              <div className="space-y-4">
                <label className="block text-lg font-semibold text-gray-700">
                  6. Height (cm) *
                </label>
                <input
                  type="number"
                  required
                  min="100"
                  max="250"
                  value={formData.height}
                  onChange={(e) => updateField('height', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., 170"
                />
              </div>
            )}

            {/* Q7: Weight */}
            {currentStep === 7 && (
              <div className="space-y-4">
                <label className="block text-lg font-semibold text-gray-700">
                  7. Weight (kg) *
                </label>
                <input
                  type="number"
                  required
                  min="30"
                  max="200"
                  value={formData.weight}
                  onChange={(e) => updateField('weight', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., 75"
                />
              </div>
            )}

            {/* Q8: Waist Circumference */}
            {currentStep === 8 && (
              <div className="space-y-4">
                <label className="block text-lg font-semibold text-gray-700">
                  8. Waist Circumference (cm) *
                </label>
                <input
                  type="number"
                  required
                  min="50"
                  max="200"
                  value={formData.waistCircumference}
                  onChange={(e) => updateField('waistCircumference', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., 90"
                />
              </div>
            )}

            {/* Q9: Fasting Blood Sugar */}
            {currentStep === 9 && (
              <div className="space-y-4">
                <label className="block text-lg font-semibold text-gray-700">
                  9. Fasting Blood Sugar (mg/dl) *
                </label>
                <input
                  type="number"
                  required
                  min="50"
                  max="300"
                  value={formData.fastingBloodSugar}
                  onChange={(e) => updateField('fastingBloodSugar', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., 100"
                />
              </div>
            )}

            {/* Q10: Total Cholesterol */}
            {currentStep === 10 && (
              <div className="space-y-4">
                <label className="block text-lg font-semibold text-gray-700">
                  10. Total Cholesterol (mg/dl) *
                </label>
                <input
                  type="number"
                  required
                  min="100"
                  max="400"
                  value={formData.totalCholesterol}
                  onChange={(e) => updateField('totalCholesterol', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., 200"
                />
              </div>
            )}

            {/* Q11: Triglycerides */}
            {currentStep === 11 && (
              <div className="space-y-4">
                <label className="block text-lg font-semibold text-gray-700">
                  11. Triglycerides (mg/dl) *
                </label>
                <input
                  type="number"
                  required
                  min="50"
                  max="500"
                  value={formData.triglycerides}
                  onChange={(e) => updateField('triglycerides', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., 150"
                />
              </div>
            )}

            {/* Q12: Weight Loss Attempts */}
            {currentStep === 12 && (
              <div className="space-y-4">
                <label className="block text-lg font-semibold text-gray-700">
                  12. Current Weight Loss Attempts (0-10: 10=Many failed) *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  max="10"
                  value={formData.weightLossAttempts}
                  onChange={(e) => updateField('weightLossAttempts', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="0-10"
                />
                <p className="text-sm text-gray-500">0 = No attempts, 10 = Many failed attempts</p>
              </div>
            )}

            {/* Q13: Biggest Frustration */}
            {currentStep === 13 && (
              <div className="space-y-4">
                <label className="block text-lg font-semibold text-gray-700">
                  13. Biggest Frustration? (Select all that apply) *
                </label>
                <div className="space-y-3">
                  {[
                    'Uncontrolled sugars',
                    'Belly fat won\'t go',
                    'Fatigue',
                    'Family pressure'
                  ].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => toggleFrustration(option)}
                      className={`w-full text-left px-4 py-3 border-2 rounded-lg font-medium transition-all ${
                        formData.biggestFrustration.includes(option)
                          ? 'bg-green-500 text-white border-green-500'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-green-300'
                      }`}
                    >
                      {formData.biggestFrustration.includes(option) ? '✓ ' : ''}{option}
                    </button>
                  ))}
                </div>
                {formData.biggestFrustration.length === 0 && (
                  <p className="text-sm text-red-500">Please select at least one option</p>
                )}
              </div>
            )}

            {/* Q14: Investment Timeline */}
            {currentStep === 14 && (
              <div className="space-y-4">
                <label className="block text-lg font-semibold text-gray-700">
                  14. Investment Timeline *
                </label>
                <div className="space-y-3">
                  {[
                    'Start immediately',
                    'Next 30 days',
                    'Next 3 months',
                    'Just exploring'
                  ].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => updateField('investmentTimeline', option)}
                      className={`w-full text-left px-4 py-3 border-2 rounded-lg font-medium transition-all ${
                        formData.investmentTimeline === option
                          ? 'bg-green-500 text-white border-green-500'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-green-300'
                      }`}
                    >
                      {formData.investmentTimeline === option ? '✓ ' : ''}{option}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Q15: Commitment Level */}
            {currentStep === 15 && (
              <div className="space-y-4">
                <label className="block text-lg font-semibold text-gray-700">
                  15. Commitment Level (1-10) *
                </label>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={formData.commitmentLevel}
                    onChange={(e) => updateField('commitmentLevel', e.target.value)}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>1 - Curious</span>
                    <span className="font-bold text-green-600">{formData.commitmentLevel || 5}</span>
                    <span>10 - Ready to start</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    <div className="text-center p-3 bg-gray-100 rounded-lg">
                      <p className="text-xs text-gray-600">1-3</p>
                      <p className="text-sm font-semibold">Curious</p>
                    </div>
                    <div className="text-center p-3 bg-gray-100 rounded-lg">
                      <p className="text-xs text-gray-600">4-6</p>
                      <p className="text-sm font-semibold">Interested</p>
                    </div>
                    <div className="text-center p-3 bg-gray-100 rounded-lg">
                      <p className="text-xs text-gray-600">7-10</p>
                      <p className="text-sm font-semibold">Ready</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                disabled={currentStep === 1}
                className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 transition-colors"
              >
                ← Previous
              </button>
              
              {currentStep < 15 ? (
                <button
                  type="button"
                  onClick={() => {
                    if (currentStep === 13 && formData.biggestFrustration.length === 0) {
                      return; // Don't proceed if no frustration selected
                    }
                    setCurrentStep(prev => Math.min(15, prev + 1));
                  }}
                  disabled={currentStep === 13 && formData.biggestFrustration.length === 0}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-green-600 hover:to-teal-600 transition-all"
                >
                  Next →
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg font-bold hover:from-green-600 hover:to-teal-600 transition-all shadow-lg"
                >
                  🚀 Submit Evaluation
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Benefits Section - After Calculator */}
        <div className="mt-12 mb-8 bg-gradient-to-br from-teal-50 to-green-50 rounded-2xl p-6 md:p-8 shadow-lg border border-teal-100">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-6">
            Why Choose HOMA Clinic?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="flex items-start gap-3 bg-white rounded-lg p-4 shadow-sm">
              <span className="text-2xl">👥</span>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">500,000+ Patients</h3>
                <p className="text-sm text-gray-600">Trusted by thousands across India</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white rounded-lg p-4 shadow-sm">
              <span className="text-2xl">🎯</span>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">85% Remission Rate</h3>
                <p className="text-sm text-gray-600">Proven results in 90 days</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white rounded-lg p-4 shadow-sm">
              <span className="text-2xl">👨‍⚕️</span>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">30+ Years Experience</h3>
                <p className="text-sm text-gray-600">Dr. Muddu Nehru MD, Professor</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white rounded-lg p-4 shadow-sm">
              <span className="text-2xl">❤️</span>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">Heart Risk Focus</h3>
                <p className="text-sm text-gray-600">Addresses cardiovascular health</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white rounded-lg p-4 shadow-sm">
              <span className="text-2xl">📊</span>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">Central Obesity Focus</h3>
                <p className="text-sm text-gray-600">Targets belly fat & metabolic health</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white rounded-lg p-4 shadow-sm">
              <span className="text-2xl">🔬</span>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">Evidence-Based Protocol</h3>
                <p className="text-sm text-gray-600">Science-backed treatment approach</p>
              </div>
            </div>
          </div>
        </div>

        {/* SUBSCRIBE SECTION - Below Calculator */}
        <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 p-6 md:p-8 rounded-2xl text-center shadow-lg">
          <h3 className="text-2xl md:text-3xl font-bold text-indigo-900 mb-4">
            Join 500K+ Patients
          </h3>
          <p className="text-lg text-gray-700 mb-6">
            Early access + Free metabolic tips
          </p>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              const email = (e.target as HTMLFormElement).email.value;
              if (email) {
                // TODO: Connect to your email service/API
                // For now, open WhatsApp with pre-filled message
                window.open(
                  `https://wa.me/919963721999?text=I want to join the waitlist. Email: ${encodeURIComponent(email)}`,
                  '_blank'
                );
              }
            }}
            className="flex flex-col items-center"
          >
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="w-full max-w-md p-4 border-2 border-indigo-200 rounded-xl mb-4 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Join Waitlist
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

