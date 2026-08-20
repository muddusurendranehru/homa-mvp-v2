'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import ProgramHero from '@/components/ProgramHero';
import HOMAWebApps from '@/components/HOMAWebApps';
import AppEcosystemCarousel from '@/components/AppEcosystemCarousel';
import TrustBadges from '@/components/TrustBadges';
import MembershipCards from '@/components/MembershipCards';
import UniqueHook from '@/components/UniqueHook';
import SpectrumSections from '@/components/SpectrumSections';
import PioneerSection from '@/components/PioneerSection';
import RiskTestModal from '@/components/RiskTestModal';

export default function HomePageClient() {
  const [isHovering, setIsHovering] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        setUser(JSON.parse(userStr));
      } catch (e) {
        setUser(null);
      }
    }
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-50">
      {/* Modern Background with subtle pattern */}
      <div className="absolute inset-0 z-0">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-100/30 via-blue-100/20 to-indigo-100/30"></div>
        {/* Subtle accent circles */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-teal-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
      </div>

      {/* 10 Tokens Free Badge - Left Side Circular */}
      <div className="absolute top-20 left-3 z-20 md:top-4 md:left-4">
        {user ? (
          // Logged in - Clickable badge linking to internal NutriBot
          <Link href="/nutri-bot" className="flex flex-col items-center group cursor-pointer">
            {/* Circular Badge */}
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-teal-500 to-blue-500 rounded-full shadow-xl flex flex-col items-center justify-center border-4 border-white group-hover:scale-110 transition-transform">
              <span className="text-lg md:text-xl">🎁</span>
              <span className="text-xs md:text-sm font-bold text-white leading-none">10</span>
              <span className="text-[8px] md:text-[10px] font-semibold text-white leading-none">FREE</span>
            </div>
            {/* Small text below */}
            <span className="mt-1 text-[10px] md:text-xs text-gray-700 font-medium bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full shadow-sm group-hover:bg-teal-50 transition-colors">
              NutriBot App →
            </span>
          </Link>
        ) : (
          // Not logged in - Badge links to login
          <Link href="/auth" className="flex flex-col items-center group cursor-pointer">
            {/* Circular Badge */}
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-teal-500 to-blue-500 rounded-full shadow-xl flex flex-col items-center justify-center border-4 border-white group-hover:scale-110 transition-transform">
              <span className="text-lg md:text-xl">🎁</span>
              <span className="text-xs md:text-sm font-bold text-white leading-none">10</span>
              <span className="text-[8px] md:text-[10px] font-semibold text-white leading-none">FREE</span>
            </div>
            {/* Small text below */}
            <span className="mt-1 text-[10px] md:text-xs text-gray-700 font-medium bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full shadow-sm group-hover:bg-teal-50 transition-colors">
              Login to Use →
            </span>
          </Link>
        )}
      </div>

      {/* Auth Buttons - Right Side Below Hamburger Area */}
      <div className="absolute top-20 right-3 z-20 md:top-4 md:right-4 flex flex-col gap-2">
        <Link
          href="/auth"
          className="px-4 py-2 bg-gradient-to-r from-teal-600 to-blue-600 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg hover:from-teal-700 hover:to-blue-700 transition-all text-center"
        >
          Sign Up
        </Link>
        <Link
          href="/auth"
          className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-gray-800 text-sm font-semibold rounded-lg shadow-md hover:shadow-lg hover:bg-white transition-all text-center border border-gray-200"
        >
          Login
        </Link>
      </div>

      {/* Trust Badges - Top */}
      <div className="relative z-10 pt-16 md:pt-20">
        <TrustBadges />
      </div>

      {/* App Ecosystem Carousel - Top Section */}
      <div className="relative z-10 pt-6">
        <AppEcosystemCarousel />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-6 py-16 md:py-24 max-w-7xl mx-auto min-h-screen">
        
        {/* Left Side - Text Content */}
        <div className="max-w-2xl space-y-8 text-center lg:text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-teal-700 shadow-sm border border-teal-100">
            <span className="text-lg">🩺</span>
            <span>Dr. Muddu's Metabolic Health Platform</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
            Diabetes <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">REMISSION</span>
            <br />
            <span className="text-3xl md:text-4xl lg:text-5xl text-gray-700">Gachibowli, Hyderabad</span>
          </h1>
          
          {/* Doctor Info */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 text-lg text-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-2xl">👨‍⚕️</span>
              <span className="font-semibold">Dr. Muddu Surendra Nehru, MD</span>
            </div>
            <span className="hidden sm:inline text-gray-400">•</span>
            <a href="tel:+919963721999" className="text-teal-600 hover:text-teal-700 font-medium hover:underline">
              📞 09963721999
            </a>
          </div>
          
          {/* Key Stats */}
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            {[
              { label: '85% Success', icon: '🎯' },
              { label: 'Insulin Testing Pioneer', icon: '🔬' },
              { label: '32+ Years Experience', icon: '⭐' }
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm border border-gray-100">
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm font-semibold text-gray-700">{item.label}</span>
              </div>
            ))}
          </div>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
            <span className="font-bold text-gray-900">Evidence-Based Protocols!</span> We test{' '}
            <span className="font-bold text-teal-600">FASTING INSULIN + HOMA-IR</span> to find root cause.{' '}
            <span className="font-semibold text-blue-600">85% remission rate in 90 days.</span>
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center lg:justify-start">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-4 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 text-lg"
            >
              🎯 Free Risk Test
            </button>
            <Link
              href="/pricing"
              className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border-2 border-gray-200 text-lg"
            >
              💰 See Packages
            </Link>
          </div>
          
          {/* Trust badges */}
          <div className="flex flex-wrap gap-6 justify-center lg:justify-start mt-8 text-base text-gray-600">
            <div className="flex items-center gap-2">
              <span className="text-green-500 text-xl">✓</span>
              <span className="font-semibold">5,00,000+ Patients</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500 text-xl">✓</span>
              <span className="font-semibold">85% Remission</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500 text-xl">✓</span>
              <span className="font-semibold">30+ Years Exp</span>
            </div>
          </div>
        </div>

        {/* Right Side - iPhone Mockup */}
        <div className="relative w-full lg:w-1/2 mt-12 lg:mt-0 flex justify-center">
          <div 
            className="relative w-full max-w-sm transform transition-transform duration-300 hover:scale-105"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* iPhone Frame */}
            <div className="bg-gray-900 rounded-[50px] p-3 shadow-2xl border-4 border-gray-800">
              {/* Notch */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-full z-20"></div>
              
              {/* Screen */}
              <div className="bg-gradient-to-b from-teal-50 to-white rounded-[40px] h-[550px] overflow-hidden relative">
                {/* Status Bar */}
                <div className="flex justify-between items-center px-6 pt-8 pb-2 text-xs text-gray-600">
                  <span>9:41</span>
                  <div className="flex gap-1">
                    <div className="w-4 h-2 bg-gray-400 rounded-sm"></div>
                    <div className="w-4 h-2 bg-gray-400 rounded-sm"></div>
                    <div className="w-6 h-3 bg-green-500 rounded-sm"></div>
                  </div>
                </div>

                {/* App Header */}
                <div className="px-4 pb-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-lg font-bold text-gray-800">🩺 HOMA Dashboard</h2>
                      <p className="text-xs text-gray-500">Welcome, Patient</p>
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      P
                    </div>
                  </div>
                </div>

                {/* Meal Plan Card */}
                <div className="mx-4 mb-3">
                  <div className="bg-gradient-to-r from-green-100 to-teal-100 rounded-2xl p-4 border border-green-200">
                    <div className="text-xs bg-green-500 text-white px-2 py-1 rounded-full inline-block mb-2 font-medium">
                      🎯 90-DAY PROGRAM
                    </div>
                    <h3 className="font-bold text-gray-800">Metabolic Remission Plan</h3>
                    <p className="text-xs text-gray-600 mt-1">
                      Personalized nutrition for your health goals
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-teal-600 font-medium">Day 15 of 90</span>
                      <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <path d="M9 18l6-6-6-6"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 mx-4 mb-3">
                  {/* HOMA-IR */}
                  <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                        <span className="text-xs">📊</span>
                      </div>
                      <span className="text-xs text-gray-500">HOMA-IR</span>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-500">2.4</div>
                      <div className="text-xs text-green-600">↓ Improving</div>
                    </div>
                  </div>

                  {/* TyG Index */}
                  <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-xs">📈</span>
                      </div>
                      <span className="text-xs text-gray-500">TyG Index</span>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-500">8.2</div>
                      <div className="text-xs text-green-600">Normal</div>
                    </div>
                  </div>
                </div>

                {/* BMI & Steps */}
                <div className="grid grid-cols-2 gap-3 mx-4 mb-3">
                  <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-xs">⚖️</span>
                      </div>
                      <span className="text-xs text-gray-500">BMI</span>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-500">24.8</div>
                      <div className="text-xs text-green-600">Healthy</div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="text-xs">🚶</span>
                      </div>
                      <span className="text-xs text-gray-500">Steps</span>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-500">8,450</div>
                      <div className="text-xs text-gray-500">Today</div>
                    </div>
                  </div>
                </div>

                {/* Calories Card */}
                <div className="mx-4">
                  <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-2xl p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🔥</span>
                        <span className="text-sm font-medium">Calories Today</span>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold">1,450</div>
                        <div className="text-xs text-green-100">/ 1,800 kcal</div>
                      </div>
                    </div>
                    {/* Progress bar */}
                    <div className="mt-2 bg-white/20 rounded-full h-2">
                      <div className="bg-white rounded-full h-2 w-4/5"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className={`absolute -bottom-4 -right-4 bg-white rounded-2xl p-3 shadow-xl border transform transition-all duration-300 ${isHovering ? 'scale-110 rotate-3' : ''}`}>
              <div className="text-center">
                <div className="text-2xl">🏆</div>
                <div className="text-xs font-bold text-gray-800">85%</div>
                <div className="text-xs text-gray-500">Remission</div>
              </div>
            </div>

            {/* Floating Heart */}
            <div className={`absolute -top-4 -left-4 bg-red-500 rounded-2xl p-3 shadow-xl transform transition-all duration-300 ${isHovering ? 'scale-110 -rotate-3' : ''}`}>
              <div className="text-center text-white">
                <div className="text-2xl">❤️</div>
                <div className="text-xs font-bold">Healthy</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Stats Section */}
      <div className="relative z-10 bg-white/10 backdrop-blur-sm py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            <div>
              <div className="text-3xl md:text-4xl font-bold">5,00,000+</div>
              <div className="text-orange-100 text-sm">Patients Treated</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold">85%</div>
              <div className="text-orange-100 text-sm">Remission Rate</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold">90</div>
              <div className="text-orange-100 text-sm">Day Program</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold">30+</div>
              <div className="text-orange-100 text-sm">Years Experience</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="relative z-10 bg-gray-900 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-4">
            Start Your Metabolic Journey
          </h2>
          
          {/* Watch Demo Pointer - Right under heading */}
          <div className="text-center mb-6 animate-bounce">
            <div className="text-2xl">👇</div>
            <p className="text-gray-400 text-xs">See demo below</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/testimonials" className="bg-gray-800 hover:bg-gray-700 rounded-2xl p-6 text-center transition-all group">
              <div className="text-4xl mb-3">🏆</div>
              <h3 className="font-bold text-white mb-2">Success Stories</h3>
              <p className="text-gray-400 text-sm">See real patient transformations</p>
            </Link>
            <Link href="/pricing" className="bg-gradient-to-br from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 rounded-2xl p-6 text-center transition-all group">
              <div className="text-4xl mb-3">💰</div>
              <h3 className="font-bold text-white mb-2">View Packages</h3>
              <p className="text-teal-100 text-sm">₹999 to ₹99,999 plans</p>
            </Link>
            <Link href="/auth" className="bg-gray-800 hover:bg-gray-700 rounded-2xl p-6 text-center transition-all group">
              <div className="text-4xl mb-3">🔐</div>
              <h3 className="font-bold text-white mb-2">Login / Sign Up</h3>
              <p className="text-gray-400 text-sm">Access your dashboard</p>
            </Link>
          </div>
        </div>
      </div>

      {/* Unique Hook Section */}
      <div className="relative z-10">
        <UniqueHook />
      </div>

      {/* HOMA Web Apps Section */}
      <div className="relative z-10 bg-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <HOMAWebApps />
        </div>
      </div>

      {/* Membership Cards Section */}
      <div className="relative z-10">
        <MembershipCards />
      </div>

      {/* Spectrum Sections */}
      <div className="relative z-10">
        <SpectrumSections />
      </div>

      {/* Pioneer Section */}
      <div className="relative z-10">
        <PioneerSection />
      </div>

      {/* Program Hero Section */}
      <ProgramHero />

      {/* Risk Test Modal */}
      <RiskTestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

