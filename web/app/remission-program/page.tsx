'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api';
import Link from 'next/link';

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
              <p className="text-sm text-gray-600">
                Day <span className="font-bold text-teal-600">{highestDayLogged}</span> of 90 • {daysRemaining} days remaining
              </p>
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

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-teal-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Program Overview */}
        <div className="mb-8 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg shadow-lg p-6 text-white">
          <h2 className="text-2xl font-bold mb-3">🏆 Your Metabolic Remission Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-3xl font-bold">{highestDayLogged}</div>
              <div className="text-sm opacity-90">Days Completed</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-3xl font-bold">{daysRemaining}</div>
              <div className="text-sm opacity-90">Days Remaining</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-3xl font-bold">{dailyLogs.length}</div>
              <div className="text-sm opacity-90">Logs Recorded</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-3xl font-bold">{progressPercentage.toFixed(0)}%</div>
              <div className="text-sm opacity-90">Progress</div>
            </div>
          </div>
        </div>

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

        {/* Log Habits Button */}
        {!showLogForm && (
          <div className="mb-8">
            <button
              onClick={() => setShowLogForm(true)}
              className="w-full md:w-auto px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg shadow-lg transition-colors text-lg"
            >
              📝 Log Habits (Any Day)
            </button>
          </div>
        )}

        {/* Log Form */}
        {showLogForm && (
          <div className="mb-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Log Day Habits</h3>
              <button
                onClick={() => setShowLogForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕ Cancel
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Day Selector */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  📅 Select Day to Log
                </label>
                <select
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(Number(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 bg-teal-50 font-semibold"
                >
                  {Array.from({ length: 90 }, (_, i) => i + 1).map(day => (
                    <option key={day} value={day}>
                      Day {day} of 90 {dailyLogs.some(log => log.day === day) ? '(✓ Logged)' : ''}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-600 mt-1">
                  You can log any day, even if you missed previous days
                </p>
              </div>
              
              {/* Nutrition */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  🥗 Nutrition (Calories/Day)
                </label>
                <select
                  value={todayLog.nutrition}
                  onChange={(e) => setTodayLog({ ...todayLog, nutrition: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  required
                >
                  <option value="">Select...</option>
                  <option value="2000">2000 kcal (Weight Loss)</option>
                  <option value="3500">3500 kcal (Maintenance)</option>
                  <option value="5000">5000 kcal (High Activity)</option>
                  <option value="foodie">Foodie (No tracking)</option>
                </select>
              </div>

              {/* Sleep */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  😴 Sleep Quality
                </label>
                <select
                  value={todayLog.sleep}
                  onChange={(e) => setTodayLog({ ...todayLog, sleep: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  required
                >
                  <option value="">Select...</option>
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

              {/* Steps */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  🚶 Daily Steps
                </label>
                <select
                  value={todayLog.steps}
                  onChange={(e) => setTodayLog({ ...todayLog, steps: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  required
                >
                  <option value="">Select...</option>
                  <option value="500">500 steps (Sedentary)</option>
                  <option value="2500">2,500 steps (Low Active)</option>
                  <option value="5000">5,000 steps (Active)</option>
                  <option value="10000">✅ 10,000 steps (Target)</option>
                  <option value="12000">🔥 12,000 steps (Very Active)</option>
                  <option value="15000">⭐ 15,000+ steps (Athlete)</option>
                </select>
              </div>

              {/* Medicines */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  💊 Treatment Approach
                </label>
                <select
                  value={todayLog.medicines}
                  onChange={(e) => setTodayLog({ ...todayLog, medicines: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  required
                >
                  <option value="">Select...</option>
                  <option value="allopathic">💊 Allopathic Medicine</option>
                  <option value="alternative">🌿 Alternative Medicine</option>
                  <option value="homeopathic">💧 Homeopathic</option>
                  <option value="keto">🥑 Keto Diet</option>
                  <option value="nature-cure">🌱 Heavy Nature Cure</option>
                  <option value="multi-organ">🏥 Multi-Organ Medicines</option>
                </select>
              </div>

              {/* Notes */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  📝 Notes (Optional)
                </label>
                <textarea
                  value={todayLog.notes}
                  onChange={(e) => setTodayLog({ ...todayLog, notes: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  rows={3}
                  placeholder="Write your medicines taken today, how you feel, any challenges or wins, symptoms, blood pressure, weight changes..."
                ></textarea>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setShowLogForm(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveLog}
                disabled={!todayLog.nutrition || !todayLog.sleep || !todayLog.steps || !todayLog.medicines}
                className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Save Log
              </button>
            </div>
          </div>
        )}

        {/* History Logs */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            📊 Your Progress Log ({dailyLogs.length} days recorded)
          </h2>
          
          {dailyLogs.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Logs Yet</h3>
              <p className="text-gray-600 mb-6">
                Start tracking your daily habits to achieve metabolic remission
              </p>
              <button
                onClick={() => setShowLogForm(true)}
                className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg"
              >
                Log Your First Day
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">🥗 Nutrition</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">😴 Sleep</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">🚶 Steps</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">💊 Treatment</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">📝 Notes</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {dailyLogs.slice().reverse().map((log, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Day {log.day}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {new Date(log.date).toLocaleDateString('en-IN')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {log.nutrition}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {log.sleep}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {log.steps}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {log.medicines}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                          {log.notes || '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

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

