'use client';

import { useState } from 'react';

export default function ProgramHero() {
  const [hoveredPhone, setHoveredPhone] = useState<number | null>(null);

  return (
    <div className="bg-[#f0f7e6] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Headline */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-green-200 text-green-800 rounded-full text-sm font-medium mb-4">
            🎯 90-Day Metabolic Remission Program
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Everything under control in one screen
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            HOMA Clinic brings together everything you need for a full and healthy metabolic lifestyle
          </p>
        </div>

        {/* iPhone Mockups */}
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center mb-12">
          {/* Workout Phone */}
          <div 
            className={`relative w-full max-w-[280px] transform transition-all duration-300 ${hoveredPhone === 1 ? 'scale-105 -rotate-2' : ''}`}
            onMouseEnter={() => setHoveredPhone(1)}
            onMouseLeave={() => setHoveredPhone(null)}
          >
            <div className="bg-gray-900 rounded-[45px] p-3 shadow-2xl border-4 border-gray-800">
              {/* Notch */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-20 h-5 bg-gray-900 rounded-full z-10"></div>
              
              <div className="bg-white rounded-[35px] h-[500px] overflow-hidden">
                {/* Status bar */}
                <div className="flex justify-between items-center px-6 pt-8 pb-2 text-xs text-gray-600">
                  <span>9:41</span>
                  <div className="flex gap-1">
                    <div className="w-4 h-2 bg-gray-400 rounded-sm"></div>
                    <div className="w-6 h-3 bg-green-500 rounded-sm"></div>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-800">🏋️ Workout Tracker</h3>
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-sm">💪</span>
                    </div>
                  </div>

                  {/* Workout Card */}
                  <div className="bg-gradient-to-r from-green-100 to-teal-100 rounded-2xl p-4 mb-4 border border-green-200">
                    <div className="text-xs bg-green-500 text-white px-2 py-1 rounded-full inline-block mb-2 font-medium">
                      WORKOUT BATCH
                    </div>
                    <h4 className="font-bold text-gray-800">Daily Exercise Plan</h4>
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>🔥 250 kcal</span>
                      <span>⏱️ 45 mins</span>
                    </div>
                    <div className="mt-3 bg-white/50 rounded-lg p-2">
                      <div className="text-xs text-gray-600">Today's Progress</div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                  </div>

                  {/* Steps Card */}
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                        <span className="text-2xl">🚶</span>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Daily Steps</div>
                        <div className="text-2xl font-bold text-orange-500">8,450</div>
                        <div className="text-xs text-green-600">↑ 12% from yesterday</div>
                      </div>
                    </div>
                  </div>

                  {/* Waist Card */}
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-purple-100">Waist Progress</div>
                        <div className="text-2xl font-bold">-4 cm</div>
                        <div className="text-xs text-purple-100">This month</div>
                      </div>
                      <div className="text-4xl">📏</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Meal Phone */}
          <div 
            className={`relative w-full max-w-[280px] transform transition-all duration-300 ${hoveredPhone === 2 ? 'scale-105 rotate-2' : ''}`}
            onMouseEnter={() => setHoveredPhone(2)}
            onMouseLeave={() => setHoveredPhone(null)}
          >
            <div className="bg-gray-900 rounded-[45px] p-3 shadow-2xl border-4 border-gray-800">
              {/* Notch */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-20 h-5 bg-gray-900 rounded-full z-10"></div>
              
              <div className="bg-white rounded-[35px] h-[500px] overflow-hidden">
                {/* Status bar */}
                <div className="flex justify-between items-center px-6 pt-8 pb-2 text-xs text-gray-600">
                  <span>9:41</span>
                  <div className="flex gap-1">
                    <div className="w-4 h-2 bg-gray-400 rounded-sm"></div>
                    <div className="w-6 h-3 bg-green-500 rounded-sm"></div>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-800">🍽️ Nutrition Plan</h3>
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-sm">🥗</span>
                    </div>
                  </div>

                  {/* Meal Card */}
                  <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-4 mb-4 border border-green-200">
                    <div className="text-xs bg-green-500 text-white px-2 py-1 rounded-full inline-block mb-2 font-medium">
                      MEAL BATCH
                    </div>
                    <h4 className="font-bold text-gray-800">Personalized Diet Plan</h4>
                    <p className="text-xs text-gray-600 mt-1">
                      Tailored nutrition for metabolic remission
                    </p>
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-xs text-teal-600 font-medium">1,800 kcal/day</span>
                      <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <path d="M9 18l6-6-6-6"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm">📊</span>
                        <span className="text-xs text-gray-500">HOMA-IR</span>
                      </div>
                      <div className="text-xl font-bold text-red-500">2.4</div>
                      <div className="text-xs text-green-600">↓ Improving</div>
                    </div>
                    <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm">📈</span>
                        <span className="text-xs text-gray-500">TyG</span>
                      </div>
                      <div className="text-xl font-bold text-blue-500">8.2</div>
                      <div className="text-xs text-green-600">Normal</div>
                    </div>
                  </div>

                  {/* Calories Card */}
                  <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🔥</span>
                        <span className="text-sm font-medium">Calories</span>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold">1,450</div>
                        <div className="text-xs text-green-100">/ 1,800</div>
                      </div>
                    </div>
                    <div className="bg-white/20 rounded-full h-2">
                      <div className="bg-white rounded-full h-2 w-4/5"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center transform hover:scale-105 transition-all">
            <div className="text-5xl font-bold text-green-600 mb-2">85%</div>
            <div className="text-gray-600">Metabolic remission rate</div>
            <div className="text-xs text-gray-400 mt-1">in 90 days</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center transform hover:scale-105 transition-all">
            <div className="text-5xl font-bold text-green-600 mb-2">500+</div>
            <div className="text-gray-600">Patients treated</div>
            <div className="text-xs text-gray-400 mt-1">and counting</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center transform hover:scale-105 transition-all">
            <div className="text-5xl font-bold text-green-600 mb-2">67%</div>
            <div className="text-gray-600">Daily active users</div>
            <div className="text-xs text-gray-400 mt-1">on the platform</div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6">
          <a 
            href="https://youtube.com/@homasurendranehru" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg hover:bg-red-50 transition-all text-gray-600 hover:text-red-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            <span className="text-sm font-medium">YouTube</span>
          </a>
          <a 
            href="https://instagram.com/homahealthcarecenter" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg hover:bg-pink-50 transition-all text-gray-600 hover:text-pink-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span className="text-sm font-medium">Instagram</span>
          </a>
          <a 
            href="https://www.homahealthcarecenter.in" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg hover:bg-green-50 transition-all text-gray-600 hover:text-green-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            <span className="text-sm font-medium">Website</span>
          </a>
        </div>
      </div>
    </div>
  );
}

