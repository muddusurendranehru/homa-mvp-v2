'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api';
import Link from 'next/link';
import ProgramHero from '@/components/ProgramHero';

interface Assessment {
  id: string;
  patient_name: string;
  age: number;
  gender: string;
  height_cm: number;
  weight_kg: number;
  waist_cm: number;
  bp_systolic: number;
  bp_diastolic: number;
  fbs: number;
  fasting_insulin: number;
  hba1c: number;
  triglycerides: number;
  bmi: number;
  bmi_category: string;
  homa_ir: number;
  homa_ir_interpretation: string;
  tyg_index: number;
  tyg_interpretation: string;
  whtr: number;
  whtr_status: string;
  created_at: string;
}

export default function DashboardPage() {
  const { isAuthenticated, loading: authLoading, user, logout } = useAuth();
  const router = useRouter();
  
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Daily habits tracker with detailed options (local state for v1)
  const [habits, setHabits] = useState({
    nutrition: '',      // 2000, 3500, 5000 cal, or Foodie
    sleep: '',          // 4h, 6h, 8h, or issues
    steps: '',          // 500, 2500, 5000, 10000, 12000, 15000+
    medicines: '',      // Allopathic, Alternative, etc.
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/auth');
    }
  }, [authLoading, isAuthenticated, router]);

  // Fetch latest assessment
  useEffect(() => {
    const fetchAssessment = async () => {
      if (!isAuthenticated) return;

      try {
        const response = await api.getLatestAssessment();
        if (response.assessment) {
          setAssessment(response.assessment);
        } else {
          // No assessment found, redirect to assessment form
          router.push('/assessment');
        }
      } catch (err: any) {
        console.error('Error fetching assessment:', err);
        if (err.response?.status === 404) {
          router.push('/assessment');
        } else {
          setError('Failed to load assessment data');
        }
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated && !authLoading) {
      fetchAssessment();
    }
  }, [isAuthenticated, authLoading, router]);

  // Show loading
  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl mb-2">🩺</div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  // Helper function to get waist color
  const getWaistColor = (waist: number) => {
    if (waist < 80) return 'text-green-600';
    if (waist < 90) return 'text-orange-600';
    return 'text-red-600';
  };

  const getWaistBg = (waist: number) => {
    if (waist < 80) return 'bg-green-50 border-green-200';
    if (waist < 90) return 'bg-orange-50 border-orange-200';
    return 'bg-red-50 border-red-200';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                🩺 HOMA Clinic Dashboard
              </h1>
              <p className="text-sm text-gray-600">
                Welcome, <span className="font-semibold">{assessment?.patient_name || user?.name || user?.email || 'Patient'}</span>
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/assessment"
                className="text-sm text-teal-600 hover:text-teal-700 font-medium"
              >
                New Assessment
              </Link>
              <Link
                href="/google-assessment"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Advanced Assessment → Google Form
              </Link>
            <Link
              href="/diet?day=1"
              className="text-sm font-medium text-green-700 bg-green-50 border border-green-200 px-3 py-1.5 rounded-md hover:bg-green-100 transition"
            >
              View My Diet
            </Link>
              <button
                onClick={logout}
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {assessment ? (
          <>
            {/* Metabolic Metrics - 4 Cards */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Your Metabolic Metrics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* HOMA-IR Card */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="text-sm text-gray-600 mb-2">HOMA-IR</div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {assessment.homa_ir != null ? assessment.homa_ir.toFixed(2) : 'N/A'}
                  </div>
                  <div className="text-xs text-gray-600">
                    {assessment.homa_ir_interpretation || 'Need fasting insulin value'}
                  </div>
                  <div className="mt-4 text-xs text-gray-500">
                    Insulin Resistance Index
                  </div>
                </div>

                {/* TyG Index Card */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="text-sm text-gray-600 mb-2">TyG Index</div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {assessment.tyg_index != null ? assessment.tyg_index.toFixed(2) : 'N/A'}
                  </div>
                  <div className="text-xs text-gray-600">
                    {assessment.tyg_interpretation || 'Need triglycerides & FBS'}
                  </div>
                  <div className="mt-4 text-xs text-gray-500">
                    Metabolic Risk Score
                  </div>
                </div>

                {/* BMI Card */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="text-sm text-gray-600 mb-2">BMI</div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {assessment.bmi != null ? assessment.bmi.toFixed(1) : 'N/A'}
                  </div>
                  <div className="text-xs text-gray-600">
                    {assessment.bmi_category || 'Need height & weight'}
                  </div>
                  <div className="mt-4 text-xs text-gray-500">
                    Body Mass Index
                  </div>
                </div>

                {/* Waist Card with Color Zones */}
                <div className={`rounded-lg shadow-sm border p-6 ${getWaistBg(assessment.waist_cm)}`}>
                  <div className="text-sm text-gray-600 mb-2">Waist Circumference</div>
                  <div className={`text-3xl font-bold mb-2 ${getWaistColor(assessment.waist_cm)}`}>
                    {assessment.waist_cm} cm
                  </div>
                  <div className="text-xs text-gray-600">
                    {assessment.waist_cm < 80 && '✓ Healthy Range'}
                    {assessment.waist_cm >= 80 && assessment.waist_cm < 90 && '⚠ Increased Risk'}
                    {assessment.waist_cm >= 90 && '⚠ High Risk'}
                  </div>
                  <div className="mt-4 text-xs text-gray-500">
                    Central Obesity Marker
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Metrics */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Additional Health Markers
              </h2>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                  {/* Blood Pressure */}
                  <div>
                    <div className="text-sm text-gray-600">🩺 Blood Pressure</div>
                    <div className={`text-xl font-bold ${
                      assessment.bp_systolic >= 140 || assessment.bp_diastolic >= 90 
                        ? 'text-red-600' 
                        : assessment.bp_systolic >= 130 || assessment.bp_diastolic >= 80
                          ? 'text-orange-600'
                          : 'text-green-600'
                    }`}>
                      {assessment.bp_systolic && assessment.bp_diastolic 
                        ? `${assessment.bp_systolic}/${assessment.bp_diastolic}` 
                        : 'N/A'}
                    </div>
                    <div className="text-xs text-gray-600">
                      {assessment.bp_systolic >= 140 || assessment.bp_diastolic >= 90 
                        ? '⚠ High'
                        : assessment.bp_systolic >= 130 || assessment.bp_diastolic >= 80
                          ? '⚠ Elevated'
                          : assessment.bp_systolic ? '✓ Normal' : ''}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">HbA1c</div>
                    <div className="text-xl font-bold text-gray-900">
                      {assessment.hba1c != null ? `${assessment.hba1c}%` : 'N/A'}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">FBS</div>
                    <div className="text-xl font-bold text-gray-900">
                      {assessment.fbs != null ? `${assessment.fbs} mg/dL` : 'N/A'}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Triglycerides</div>
                    <div className="text-xl font-bold text-gray-900">
                      {assessment.triglycerides != null ? `${assessment.triglycerides} mg/dL` : 'N/A'}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">WHtR</div>
                    <div className="text-xl font-bold text-gray-900">
                      {assessment.whtr != null ? assessment.whtr.toFixed(3) : 'N/A'}
                    </div>
                    <div className="text-xs text-gray-600">
                      {assessment.whtr_status || ''}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Daily Habits Tracker with Options */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Daily Habits (Today)
              </h2>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Nutrition Options */}
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span className="text-2xl mr-2">🥗</span>
                      <h3 className="font-semibold text-gray-900">Nutrition (Calories/Day)</h3>
                    </div>
                    <select
                      value={habits.nutrition}
                      onChange={(e) => setHabits({ ...habits, nutrition: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    >
                      <option value="">Select your intake...</option>
                      <option value="2000">2000 kcal (Weight Loss)</option>
                      <option value="3500">3500 kcal (Maintenance)</option>
                      <option value="5000">5000 kcal (High Activity)</option>
                      <option value="foodie">Foodie (No tracking)</option>
                    </select>
                  </div>

                  {/* Sleep Options */}
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span className="text-2xl mr-2">😴</span>
                      <h3 className="font-semibold text-gray-900">Sleep Quality</h3>
                    </div>
                    <select
                      value={habits.sleep}
                      onChange={(e) => setHabits({ ...habits, sleep: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    >
                      <option value="">Select sleep status...</option>
                      <option value="8h">✅ 8 hours (Optimal)</option>
                      <option value="6h">⚠️ 6 hours (Adequate)</option>
                      <option value="4h">❌ 4 hours (Insufficient)</option>
                      <option value="insomnia">😫 Insomnia</option>
                      <option value="snoring">😤 Snoring</option>
                      <option value="apnea">🚨 Sleep Apnea</option>
                      <option value="day-sleeping">🌞 Day Sleeping</option>
                      <option value="not-getting">❌ Not Getting Sleep</option>
                    </select>
                  </div>

                  {/* Steps Options */}
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span className="text-2xl mr-2">🚶</span>
                      <h3 className="font-semibold text-gray-900">Daily Steps</h3>
                    </div>
                    <select
                      value={habits.steps}
                      onChange={(e) => setHabits({ ...habits, steps: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    >
                      <option value="">Select step count...</option>
                      <option value="500">500 steps (Sedentary)</option>
                      <option value="2500">2,500 steps (Low Active)</option>
                      <option value="5000">5,000 steps (Active)</option>
                      <option value="10000">✅ 10,000 steps (Target)</option>
                      <option value="12000">🔥 12,000 steps (Very Active)</option>
                      <option value="15000">⭐ 15,000+ steps (Athlete)</option>
                    </select>
                  </div>

                  {/* Medicines Options */}
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span className="text-2xl mr-2">💊</span>
                      <h3 className="font-semibold text-gray-900">Treatment Approach</h3>
                    </div>
                    <select
                      value={habits.medicines}
                      onChange={(e) => setHabits({ ...habits, medicines: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    >
                      <option value="">Select treatment type...</option>
                      <option value="allopathic">💊 Allopathic Medicine</option>
                      <option value="alternative">🌿 Alternative Medicine</option>
                      <option value="homeopathic">💧 Homeopathic</option>
                      <option value="keto">🥑 Keto Diet</option>
                      <option value="nature-cure">🌱 Heavy Nature Cure</option>
                      <option value="multi-organ">🏥 Multi-Organ Medicines</option>
                    </select>
                  </div>

                </div>
                
                {/* Display Selected Habits Summary */}
                {(habits.nutrition || habits.sleep || habits.steps || habits.medicines) && (
                  <div className="mt-6 p-4 bg-teal-50 border border-teal-200 rounded-lg">
                    <h4 className="font-semibold text-teal-900 mb-2">📊 Today's Log:</h4>
                    <div className="text-sm text-teal-800 space-y-1">
                      {habits.nutrition && <div>• Nutrition: <strong>{habits.nutrition}</strong></div>}
                      {habits.sleep && <div>• Sleep: <strong>{habits.sleep}</strong></div>}
                      {habits.steps && <div>• Steps: <strong>{habits.steps}</strong></div>}
                      {habits.medicines && <div>• Treatment: <strong>{habits.medicines}</strong></div>}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Take Action
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 30-Day Plan */}
                <Link
                  href="/remission-program"
                  className="block bg-teal-600 hover:bg-teal-700 text-white rounded-lg shadow-sm p-6 transition-colors"
                >
                  <div className="text-lg font-semibold mb-2">
                    🎯 Start 30-Day Remission Plan
                  </div>
                  <div className="text-sm opacity-90">
                    Track daily habits, monitor progress, achieve metabolic remission
                  </div>
                </Link>

                {/* WhatsApp Contact */}
                <a
                  href="https://wa.me/919963721999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-sm p-6 transition-colors"
                >
                  <div className="text-lg font-semibold mb-2">
                    💬 Contact Dr. Muddu
                  </div>
                  <div className="text-sm opacity-90">
                    WhatsApp: 09963721999
                  </div>
                </a>
              </div>
            </div>

            {/* Assessment Date */}
            <div className="text-center text-sm text-gray-600">
              Assessment Date: {new Date(assessment.created_at).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              No Assessment Found
            </h2>
            <p className="text-gray-600 mb-6">
              Complete your first assessment to see your metabolic metrics
            </p>
            <Link
              href="/assessment"
              className="inline-block px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-md transition-colors"
            >
              Start Assessment
            </Link>
          </div>
        )}

        {/* Program Hero Section */}
        <div className="mt-8">
          <ProgramHero />
        </div>
      </main>
    </div>
  );
}
