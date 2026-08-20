'use client';

import { useState, useEffect } from 'react';

interface FormData {
  fullName: string;
  whatsappNumber: string;
  email: string;
  age: string;
  gender: string;
  height: string;
  weight: string;
  waistCircumference: string;
  fastingBloodSugar: string;
  totalCholesterol: string;
  triglycerides: string;
  weightLossAttempts: string;
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

interface RiskTestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RiskTestModal({ isOpen, onClose }: RiskTestModalProps) {
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

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(1);
      setSubmitted(false);
      setScores(null);
      setFormData({
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
    }
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const updateField = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateScores = (): Scores => {
    const height = parseFloat(formData.height) / 100;
    const weight = parseFloat(formData.weight);
    const waist = parseFloat(formData.waistCircumference);
    const fbs = parseFloat(formData.fastingBloodSugar);
    const tg = parseFloat(formData.triglycerides);
    const weightLossAttempts = parseFloat(formData.weightLossAttempts) || 0;
    const commitmentLevel = parseFloat(formData.commitmentLevel) || 0;

    const bmi = weight / (height * height);
    const bmiScore = bmi > 0 ? bmi : 0;

    const tygIndex = fbs > 0 && tg > 0 
      ? Math.log((tg * fbs) / 2) 
      : 0;

    let metabolicRisk = 0;
    const age = parseFloat(formData.age) || 0;
    
    if (bmi > 30) metabolicRisk += 30;
    else if (bmi > 25) metabolicRisk += 20;
    else if (bmi > 23) metabolicRisk += 10;
    
    if (waist > 90) metabolicRisk += 25;
    else if (waist > 80) metabolicRisk += 15;
    else if (waist > 70) metabolicRisk += 5;
    
    if (tygIndex > 8.8) metabolicRisk += 25;
    else if (tygIndex > 8.5) metabolicRisk += 15;
    else if (tygIndex > 8.0) metabolicRisk += 10;
    
    if (age > 60) metabolicRisk += 20;
    else if (age > 50) metabolicRisk += 15;
    else if (age > 40) metabolicRisk += 10;
    else if (age > 30) metabolicRisk += 5;

    // Lead Quality Score calculation
    let leadQuality = 0;
    const frustrationCount = formData.biggestFrustration.length;
    leadQuality += Math.min(frustrationCount * 15, 30);
    
    if (formData.investmentTimeline === 'Start immediately') leadQuality += 20;
    else if (formData.investmentTimeline === 'Next 30 days') leadQuality += 15;
    else if (formData.investmentTimeline === 'Next 3 months') leadQuality += 10;
    else if (formData.investmentTimeline === 'Just exploring') leadQuality += 5;
    
    leadQuality += (commitmentLevel / 10) * 20;
    
    if (metabolicRisk > 60) leadQuality += 20;
    else if (metabolicRisk > 40) leadQuality += 15;
    else if (metabolicRisk > 20) leadQuality += 10;

    return {
      bmiScore: Math.round(bmiScore * 10) / 10,
      tygIndex: Math.round(tygIndex * 100) / 100,
      metabolicRiskScore: Math.min(100, Math.round(metabolicRisk)),
      leadQualityScore: Math.min(100, Math.round(leadQuality)),
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 15) {
      setCurrentStep(prev => prev + 1);
      return;
    }

    const calculatedScores = calculateScores();
    setScores(calculatedScores);
    setSubmitted(true);
  };

  const getRiskLevel = (score: number): { level: string; color: string; message: string } => {
    if (score >= 70) return { level: 'High', color: 'red', message: 'High Risk' };
    if (score >= 40) return { level: 'Medium', color: 'yellow', message: 'Medium Risk' };
    return { level: 'Low', color: 'green', message: 'Low Risk' };
  };

  if (!isOpen) return null;

  // Results Screen
  if (submitted && scores) {
    const risk = getRiskLevel(scores.metabolicRiskScore);
    const whatsappMessage = `Hi! I completed the HOMA Risk Test.\n\nName: ${formData.fullName}\nHOMA Score: ${risk.level} Risk (${scores.metabolicRiskScore}%)\n\nI want to Book ₹999 Basic Plan`;

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50">
        <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-normal w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded transition-colors z-10"
          >
            ×
          </button>

          <div className="p-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Your HOMA Risk Assessment
              </h2>
              <p className="text-gray-600 text-sm">Assessment complete</p>
            </div>

            {/* Score Display */}
            <div className={`${
              risk.color === 'red' ? 'bg-red-50 border-red-200' :
              risk.color === 'yellow' ? 'bg-yellow-50 border-yellow-200' :
              'bg-green-50 border-green-200'
            } border rounded-lg p-6 mb-6 text-center`}>
              <p className="text-sm text-gray-600 mb-2">Your HOMA Score</p>
              <p className="text-3xl font-semibold text-gray-900 mb-1">{risk.level} Risk</p>
              <p className="text-2xl font-medium text-gray-700">{scores.metabolicRiskScore}%</p>
            </div>

            {/* WhatsApp CTA */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">
                Next Steps
              </h3>
              <p className="text-gray-700 mb-4 text-center text-sm">
                Book your <span className="font-semibold">₹999 Basic Plan</span> to start your journey to remission
              </p>
              <a
                href={`https://wa.me/919963721999?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-md text-center transition-colors"
              >
                Book ₹999 Basic Plan
              </a>
            </div>

            {/* Score Breakdown */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                <p className="text-xs text-gray-600 mb-1">BMI</p>
                <p className="text-xl font-semibold text-gray-900">{scores.bmiScore}</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                <p className="text-xs text-gray-600 mb-1">TyG Index</p>
                <p className="text-xl font-semibold text-gray-900">{scores.tygIndex}</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-6 py-2 rounded-md transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Form Screen
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Free Risk Test</h2>
            <p className="text-gray-500 text-sm mt-1">Question {currentStep} of 15</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-normal w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
          >
            ×
          </button>
        </div>

        {/* Progress Bar */}
        <div className="bg-gray-100 h-1">
          <div 
            className="bg-green-600 h-1 transition-all duration-300"
            style={{ width: `${(currentStep / 15) * 100}%` }}
          />
        </div>

        {/* Form Content */}
        <div className="p-6 flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit}>
            {/* Q1: Full Name */}
            {currentStep === 1 && (
              <div className="space-y-3">
                <label className="block text-base font-medium text-gray-700">
                  1. Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => updateField('fullName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  placeholder="Enter your full name"
                />
              </div>
            )}

            {/* Q2: WhatsApp */}
            {currentStep === 2 && (
              <div className="space-y-3">
                <label className="block text-base font-medium text-gray-700">
                  2. WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.whatsappNumber}
                  onChange={(e) => updateField('whatsappNumber', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  placeholder="10-digit mobile number"
                />
              </div>
            )}

            {/* Q3: Email */}
            {currentStep === 3 && (
              <div className="space-y-3">
                <label className="block text-base font-medium text-gray-700">
                  3. Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  placeholder="your.email@example.com"
                />
              </div>
            )}

            {/* Q4: Age */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <label className="block text-xl font-bold text-gray-800 mb-3">
                  4. Age *
                </label>
                <input
                  type="number"
                  required
                  min="18"
                  max="100"
                  value={formData.age}
                  onChange={(e) => updateField('age', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  placeholder="Your age"
                />
              </div>
            )}

            {/* Q5: Gender */}
            {currentStep === 5 && (
              <div className="space-y-4">
                <label className="block text-xl font-bold text-gray-800 mb-3">
                  5. Gender *
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {['Male', 'Female', 'Other'].map((gender) => (
                    <button
                      key={gender}
                      type="button"
                      onClick={() => updateField('gender', gender)}
                      className={`px-4 py-3 rounded-lg border-2 transition-all ${
                        formData.gender === gender
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {gender}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Q6: Height */}
            {currentStep === 6 && (
              <div className="space-y-4">
                <label className="block text-xl font-bold text-gray-800 mb-3">
                  6. Height (cm) *
                </label>
                <input
                  type="number"
                  required
                  min="100"
                  max="250"
                  value={formData.height}
                  onChange={(e) => updateField('height', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  placeholder="e.g., 170"
                />
              </div>
            )}

            {/* Q7: Weight */}
            {currentStep === 7 && (
              <div className="space-y-4">
                <label className="block text-xl font-bold text-gray-800 mb-3">
                  7. Weight (kg) *
                </label>
                <input
                  type="number"
                  required
                  min="30"
                  max="200"
                  value={formData.weight}
                  onChange={(e) => updateField('weight', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  placeholder="e.g., 75"
                />
              </div>
            )}

            {/* Q8: Waist */}
            {currentStep === 8 && (
              <div className="space-y-4">
                <label className="block text-xl font-bold text-gray-800 mb-3">
                  8. Waist Circumference (cm) *
                </label>
                <input
                  type="number"
                  required
                  min="50"
                  max="200"
                  value={formData.waistCircumference}
                  onChange={(e) => updateField('waistCircumference', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  placeholder="e.g., 90"
                />
              </div>
            )}

            {/* Q9: Fasting Blood Sugar */}
            {currentStep === 9 && (
              <div className="space-y-4">
                <label className="block text-xl font-bold text-gray-800 mb-3">
                  9. Fasting Blood Sugar (mg/dl) *
                </label>
                <input
                  type="number"
                  required
                  min="50"
                  max="300"
                  value={formData.fastingBloodSugar}
                  onChange={(e) => updateField('fastingBloodSugar', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  placeholder="e.g., 100"
                />
              </div>
            )}

            {/* Q10: Cholesterol */}
            {currentStep === 10 && (
              <div className="space-y-4">
                <label className="block text-xl font-bold text-gray-800 mb-3">
                  10. Total Cholesterol (mg/dl) *
                </label>
                <input
                  type="number"
                  required
                  min="100"
                  max="400"
                  value={formData.totalCholesterol}
                  onChange={(e) => updateField('totalCholesterol', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  placeholder="e.g., 200"
                />
              </div>
            )}

            {/* Q11: Triglycerides */}
            {currentStep === 11 && (
              <div className="space-y-4">
                <label className="block text-xl font-bold text-gray-800 mb-3">
                  11. Triglycerides (mg/dl) *
                </label>
                <input
                  type="number"
                  required
                  min="50"
                  max="500"
                  value={formData.triglycerides}
                  onChange={(e) => updateField('triglycerides', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  placeholder="e.g., 150"
                />
              </div>
            )}

            {/* Q12: Weight Loss Attempts */}
            {currentStep === 12 && (
              <div className="space-y-4">
                <label className="block text-xl font-bold text-gray-800 mb-3">
                  12. Weight Loss Attempts (0-10) *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  max="10"
                  value={formData.weightLossAttempts}
                  onChange={(e) => updateField('weightLossAttempts', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  placeholder="0-10"
                />
                <p className="text-sm text-gray-500">0 = No attempts, 10 = Many failed attempts</p>
              </div>
            )}

            {/* Q13: Biggest Frustration */}
            {currentStep === 13 && (
              <div className="space-y-4">
                <label className="block text-xl font-bold text-gray-800 mb-3">
                  13. Biggest Frustration? (Select all) *
                </label>
                <div className="space-y-3">
                  {['Uncontrolled sugars', 'Belly fat won\'t go', 'Fatigue', 'Family pressure'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        const current = formData.biggestFrustration;
                        if (current.includes(option)) {
                          updateField('biggestFrustration', current.filter(f => f !== option));
                        } else {
                          updateField('biggestFrustration', [...current, option]);
                        }
                      }}
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
              </div>
            )}

            {/* Q14: Investment Timeline */}
            {currentStep === 14 && (
              <div className="space-y-4">
                <label className="block text-xl font-bold text-gray-800 mb-3">
                  14. Investment Timeline *
                </label>
                <div className="space-y-3">
                  {['Start immediately', 'Next 30 days', 'Next 3 months', 'Just exploring'].map((option) => (
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
                <label className="block text-xl font-bold text-gray-800 mb-3">
                  15. Commitment Level (1-10) *
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  required
                  value={formData.commitmentLevel}
                  onChange={(e) => updateField('commitmentLevel', e.target.value)}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>1 - Curious</span>
                  <span className="font-bold text-green-600 text-lg">{formData.commitmentLevel || 5}</span>
                  <span>10 - Ready</span>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-md transition-colors"
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                disabled={currentStep === 13 && formData.biggestFrustration.length === 0}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentStep < 15 ? 'Next' : 'Get Results'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

