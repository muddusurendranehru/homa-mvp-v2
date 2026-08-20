'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api';
import Link from 'next/link';

export default function AssessmentPage() {
  const { user } = useAuth();
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState({
    age: '',
    gender: 'female',
    height_cm: '',
    weight_kg: '',
    waist_cm: '',
    bp_systolic: '',
    bp_diastolic: '',
    fbs: '',
    fasting_insulin: '',
    post_lunch_bs: '',
    hba1c: '',
    total_cholesterol: '',
    hdl: '',
    ldl: '',
    triglycerides: '',
    vldl: '',
    current_meds: '',
    procedures: '',
    post_menopausal: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Convert form data to proper types
      const assessmentData = {
        age: formData.age ? parseInt(formData.age) : null,
        gender: formData.gender,
        height_cm: formData.height_cm ? parseFloat(formData.height_cm) : null,
        weight_kg: formData.weight_kg ? parseFloat(formData.weight_kg) : null,
        waist_cm: formData.waist_cm ? parseFloat(formData.waist_cm) : null,
        bp_systolic: formData.bp_systolic ? parseInt(formData.bp_systolic) : null,
        bp_diastolic: formData.bp_diastolic ? parseInt(formData.bp_diastolic) : null,
        fbs: formData.fbs ? parseFloat(formData.fbs) : null,
        fasting_insulin: formData.fasting_insulin ? parseFloat(formData.fasting_insulin) : null,
        post_lunch_bs: formData.post_lunch_bs ? parseFloat(formData.post_lunch_bs) : null,
        hba1c: formData.hba1c ? parseFloat(formData.hba1c) : null,
        total_cholesterol: formData.total_cholesterol ? parseFloat(formData.total_cholesterol) : null,
        hdl: formData.hdl ? parseFloat(formData.hdl) : null,
        ldl: formData.ldl ? parseFloat(formData.ldl) : null,
        triglycerides: formData.triglycerides ? parseFloat(formData.triglycerides) : null,
        vldl: formData.vldl ? parseFloat(formData.vldl) : null,
        current_meds: formData.current_meds,
        procedures: formData.procedures,
        post_menopausal: formData.post_menopausal,
      };

      // Use api helper method
      await api.createAssessment(assessmentData);
      
      // Success - redirect to dashboard
      router.push('/dashboard');
    } catch (err: any) {
      console.error('Assessment error:', err);
      setError(err.response?.data?.error || 'Failed to save assessment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Metabolic Health Assessment</h1>
            <p className="text-sm text-gray-600 mt-1">
              Welcome, <span className="font-semibold">{user?.name}</span>
            </p>
          </div>
          <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900">
            Skip to Dashboard →
          </Link>
        </div>

        {/* Google Form Option */}
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-gray-700 mb-3">
            <strong>Quick Option:</strong> Prefer a simple form? Use our Google Form instead.
          </p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSc4cw6zfm3ZDC7x1aCc7nGFNMRqpd14eogHWa91gj6jRFPXXw/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 font-medium"
          >
            📝 Book Your Free Assessment
          </a>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1: Basic Info */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="number"
                placeholder="Age"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
              <label className="flex items-center p-3 border border-gray-300 rounded-md">
                <input
                  type="checkbox"
                  checked={formData.post_menopausal}
                  onChange={(e) => setFormData({ ...formData, post_menopausal: e.target.checked })}
                  className="mr-2"
                />
                <span className="text-sm">Post-Menopausal</span>
              </label>
            </div>
          </div>

          {/* Row 2: Body Metrics */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Body Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="number"
                step="0.1"
                placeholder="Height (cm)"
                value={formData.height_cm}
                onChange={(e) => setFormData({ ...formData, height_cm: e.target.value })}
                className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <input
                type="number"
                step="0.1"
                placeholder="Weight (kg)"
                value={formData.weight_kg}
                onChange={(e) => setFormData({ ...formData, weight_kg: e.target.value })}
                className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <input
                type="number"
                step="0.1"
                placeholder="Waist Circumference (cm) *"
                value={formData.waist_cm}
                onChange={(e) => setFormData({ ...formData, waist_cm: e.target.value })}
                className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Row 2.5: Blood Pressure */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">🩺 Blood Pressure</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Systolic BP (mmHg) - e.g., 120"
                value={formData.bp_systolic}
                onChange={(e) => setFormData({ ...formData, bp_systolic: e.target.value })}
                className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <input
                type="number"
                placeholder="Diastolic BP (mmHg) - e.g., 80"
                value={formData.bp_diastolic}
                onChange={(e) => setFormData({ ...formData, bp_diastolic: e.target.value })}
                className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Normal: &lt;120/80 | Elevated: 120-129/&lt;80 | High: ≥130/80
            </p>
          </div>

          {/* Row 3: Blood Sugar & Insulin */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Blood Sugar & Insulin</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="number"
                step="0.1"
                placeholder="FBS (mg/dL)"
                value={formData.fbs}
                onChange={(e) => setFormData({ ...formData, fbs: e.target.value })}
                className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <input
                type="number"
                step="0.1"
                placeholder="Fasting Insulin (μU/mL)"
                value={formData.fasting_insulin}
                onChange={(e) => setFormData({ ...formData, fasting_insulin: e.target.value })}
                className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <input
                type="number"
                step="0.1"
                placeholder="Post-Lunch BS (mg/dL)"
                value={formData.post_lunch_bs}
                onChange={(e) => setFormData({ ...formData, post_lunch_bs: e.target.value })}
                className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <input
                type="number"
                step="0.1"
                placeholder="HbA1c (%)"
                value={formData.hba1c}
                onChange={(e) => setFormData({ ...formData, hba1c: e.target.value })}
                className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Row 4: Lipid Panel */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Lipid Panel (mg/dL)</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <input
                type="number"
                step="0.1"
                placeholder="Total Cholesterol"
                value={formData.total_cholesterol}
                onChange={(e) => setFormData({ ...formData, total_cholesterol: e.target.value })}
                className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <input
                type="number"
                step="0.1"
                placeholder="HDL"
                value={formData.hdl}
                onChange={(e) => setFormData({ ...formData, hdl: e.target.value })}
                className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <input
                type="number"
                step="0.1"
                placeholder="LDL"
                value={formData.ldl}
                onChange={(e) => setFormData({ ...formData, ldl: e.target.value })}
                className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <input
                type="number"
                step="0.1"
                placeholder="Triglycerides"
                value={formData.triglycerides}
                onChange={(e) => setFormData({ ...formData, triglycerides: e.target.value })}
                className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <input
                type="number"
                step="0.1"
                placeholder="VLDL"
                value={formData.vldl}
                onChange={(e) => setFormData({ ...formData, vldl: e.target.value })}
                className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Row 5: Medical History */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Medical History</h2>
            <div className="space-y-4">
              <textarea
                placeholder="Current Medications (e.g., Metformin 500mg, Atorvastatin 10mg)"
                value={formData.current_meds}
                onChange={(e) => setFormData({ ...formData, current_meds: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                rows={2}
              />
              <textarea
                placeholder="Past Procedures (e.g., Angiography, Bypass surgery)"
                value={formData.procedures}
                onChange={(e) => setFormData({ ...formData, procedures: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                rows={2}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : 'Save & Go to Dashboard'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
