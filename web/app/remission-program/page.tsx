'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api';
import Link from 'next/link';
import MealAppProgress from '@/components/MealAppProgress';

interface DailyLog {
  day: number;
  date: string;
  nutrition: string;
  sleep: string;
  steps: string;
  medicines: string;
  notes: string;
}

export default function RemissionProgramPage() {
  const { isAuthenticated, loading: authLoading, user, logout } = useAuth();
  const router = useRouter();
  
  const [currentDay, setCurrentDay] = useState(1);
  const [dailyLogs, setDailyLogs] = useState<DailyLog[]>([]);
  const [showLogForm, setShowLogForm] = useState(false);
  const [selectedDay, setSelectedDay] = useState(1); // Day selector
  
  // OKR/KPI Metrics from assessment
  const [metrics, setMetrics] = useState<any>(null);
  
  // Today's log form
  const [todayLog, setTodayLog] = useState({
    nutrition: '',
    sleep: '',
    steps: '',
    medicines: '',
    notes: '',
  });

  // Load logs from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('remission_logs');
      if (saved) {
        const logs = JSON.parse(saved);
        setDailyLogs(logs);
        // Set currentDay based on highest day logged
        const maxDay = logs.length > 0 ? Math.max(...logs.map((l: DailyLog) => l.day)) : 0;
        setCurrentDay(maxDay + 1);
        // Set selected day to next available
        setSelectedDay(maxDay + 1 <= 90 ? maxDay + 1 : 90);
      }
    }
  }, []);

  // Fetch latest assessment metrics for OKR/KPI tracking
  useEffect(() => {
    const fetchMetrics = async () => {
      if (!isAuthenticated) return;
      try {
        const response = await api.getLatestAssessment();
        if (response.assessment) {
          setMetrics(response.assessment);
        }
      } catch (err) {
        console.error('Error fetching metrics:', err);
      }
    };
    
    if (isAuthenticated && !authLoading) {
      fetchMetrics();
    }
  }, [isAuthenticated, authLoading]);

  // Save today's log
  const handleSaveLog = () => {
    const newLog: DailyLog = {
      day: selectedDay,
      date: new Date().toISOString().split('T')[0],
      ...todayLog,
    };

    // Remove any existing log for this day, then add new one
    const filteredLogs = dailyLogs.filter(log => log.day !== selectedDay);
    const updatedLogs = [...filteredLogs, newLog].sort((a, b) => a.day - b.day);
    setDailyLogs(updatedLogs);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('remission_logs', JSON.stringify(updatedLogs));
    }

    // Reset form and increment day selector
    setTodayLog({
      nutrition: '',
      sleep: '',
      steps: '',
      medicines: '',
      notes: '',
    });
    
    setShowLogForm(false);
    
    // Update currentDay based on highest day logged
    const maxDay = Math.max(...updatedLogs.map(l => l.day));
    setCurrentDay(maxDay + 1);
    
    // Set next day for convenience
    if (selectedDay < 90) {
      setSelectedDay(selectedDay + 1);
    }
  };

  // Calculate progress based on highest day logged
  const highestDayLogged = dailyLogs.length > 0 ? Math.max(...dailyLogs.map(l => l.day)) : 0;
  const daysRemaining = Math.max(0, 90 - highestDayLogged);
  const progressPercentage = Math.min(100, (highestDayLogged / 90) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                🎯 30-Day Metabolic Remission Program
              </h1>
              <a
                href="https://healthmetrics30daymeals.onrender.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 px-6 py-3 hover:opacity-90 text-white font-bold rounded-lg"
                style={{ background: "#16a34a" }}
              >
                🍽️ Open my 30-day meal plan
              </a>
              <p className="text-xs text-gray-500 mt-1">Sign in with your meal-plan login.</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="text-sm text-teal-600 hover:text-teal-700 font-medium"
              >
                ← Back to Dashboard
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
        <MealAppProgress />
        
        {/* OKR/KPI Metabolic Goals */}
        {metrics && (
          <div className="mb-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              🎯 Your Metabolic Goals (90-Day Targets)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* HOMA-IR Goal */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">HOMA-IR</div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className={`text-2xl font-bold ${metrics.homa_ir > 2.5 ? 'text-red-600' : 'text-green-600'}`}>
                    {metrics.homa_ir != null ? metrics.homa_ir.toFixed(2) : 'N/A'}
                  </span>
                  <span className="text-sm text-gray-500">→ Goal: &lt; 2.0</span>
                </div>
                <div className="text-xs text-gray-600">{metrics.homa_ir_interpretation}</div>
              </div>

              {/* TyG Goal */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">TyG Index</div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className={`text-2xl font-bold ${metrics.tyg_index > 8.8 ? 'text-red-600' : 'text-green-600'}`}>
                    {metrics.tyg_index != null ? metrics.tyg_index.toFixed(2) : 'N/A'}
                  </span>
                  <span className="text-sm text-gray-500">→ Goal: &lt; 8.5</span>
                </div>
                <div className="text-xs text-gray-600">{metrics.tyg_interpretation}</div>
              </div>

              {/* BMI Goal */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">BMI</div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className={`text-2xl font-bold ${metrics.bmi > 25 ? 'text-orange-600' : 'text-green-600'}`}>
                    {metrics.bmi != null ? metrics.bmi.toFixed(1) : 'N/A'}
                  </span>
                  <span className="text-sm text-gray-500">→ Goal: &lt; 25</span>
                </div>
                <div className="text-xs text-gray-600">{metrics.bmi_category}</div>
              </div>

              {/* Waist Goal */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Waist (cm)</div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className={`text-2xl font-bold ${
                    metrics.waist_cm >= 90 ? 'text-red-600' : 
                    metrics.waist_cm >= 80 ? 'text-orange-600' : 
                    'text-green-600'
                  }`}>
                    {metrics.waist_cm || 'N/A'}
                  </span>
                  <span className="text-sm text-gray-500">→ Goal: &lt; 80</span>
                </div>
                <div className="text-xs text-gray-600">
                  {metrics.waist_cm >= 90 ? 'High Risk' : 
                   metrics.waist_cm >= 80 ? 'Increased Risk' : 'Healthy'}
                </div>
              </div>

            </div>
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900">
                <strong>📊 Progress Tracking:</strong> Get your labs re-tested every 30 days (Day 30, 60, 90) 
                and create a new assessment to track improvements!
              </p>
            </div>
          </div>
        )}

        {/* Next Steps & Guidelines */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Program Guidelines */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">📋 Program Guidelines</h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="mr-2">✅</span>
                <span>Log your habits daily for accurate tracking</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✅</span>
                <span>Aim for 8 hours of sleep and 10,000 steps daily</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✅</span>
                <span>Follow your prescribed treatment consistently</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✅</span>
                <span>Monitor nutrition based on your metabolic goals</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✅</span>
                <span>Schedule follow-up assessments every 30 days</span>
              </li>
            </ul>
          </div>

          {/* Contact Support */}
          <div className="bg-teal-50 rounded-lg shadow-sm border border-teal-200 p-6">
            <h3 className="text-lg font-bold text-teal-900 mb-4">💬 Need Support?</h3>
            <p className="text-sm text-teal-800 mb-4">
              Contact Dr. Muddu Surendra Nehru for personalized guidance
            </p>
            <a
              href="https://wa.me/919963721999"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg text-center transition-colors"
            >
              📱 WhatsApp: 09963721999
            </a>
            <div className="mt-4 text-xs text-teal-700 space-y-1">
              <p>🩺 Professor of Medicine</p>
              <p>📍 <a href="https://www.homahealthcarecenter.in" target="_blank" rel="noopener noreferrer" className="underline hover:text-teal-900">www.homahealthcarecenter.in</a></p>
              <p>📺 YouTube: homasurendranehru</p>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}

