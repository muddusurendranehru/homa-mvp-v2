'use client';

import { useState } from 'react';
import Link from 'next/link';

interface DayPreview {
  day: number;
  title: string;
  icon: string;
  color: string;
  borderColor: string;
  textColor: string;
  subject: string;
  preview: string[];
  features: string[];
}

const dayPreviews: DayPreview[] = [
  {
    day: 1,
    title: 'Welcome & Setup',
    icon: '📋',
    color: 'from-blue-900/50 to-blue-800/30',
    borderColor: 'border-blue-600/30 hover:border-blue-400',
    textColor: 'text-blue-300',
    subject: 'Welcome to Your 90-Day Metabolic Remission Journey!',
    preview: [
      '🎯 Your personalized dashboard is ready',
      '📊 First assessment completed - baseline metrics saved',
      '📱 WhatsApp support group access',
      '📖 Day 1 nutrition guidelines attached',
    ],
    features: [
      'Personalized HOMA-IR baseline',
      'BMI & Waist tracking setup',
      'WhatsApp community access',
      '24/7 support contact',
    ],
  },
  {
    day: 3,
    title: 'Nutrition Guide',
    icon: '🥗',
    color: 'from-green-900/50 to-green-800/30',
    borderColor: 'border-green-600/30 hover:border-green-400',
    textColor: 'text-green-300',
    subject: 'Day 3: Your Personalized Nutrition Plan is Ready!',
    preview: [
      '🍽️ Customized meal plan based on your metrics',
      '🛒 Grocery shopping list for Week 1',
      '📹 Video: Understanding Glycemic Index',
      '💬 Check-in: How are you feeling?',
    ],
    features: [
      'Personalized calorie targets',
      'Indian diet meal plans',
      'Low GI food recommendations',
      'Recipe videos & guides',
    ],
  },
  {
    day: 7,
    title: 'Week 1 Check',
    icon: '📊',
    color: 'from-yellow-900/50 to-yellow-800/30',
    borderColor: 'border-yellow-600/30 hover:border-yellow-400',
    textColor: 'text-yellow-300',
    subject: 'Week 1 Complete! Time for Your First Progress Check',
    preview: [
      '📈 Week 1 progress report attached',
      '⚖️ Weight & waist measurement reminder',
      '🎯 Goals review: How did you do?',
      '💪 Week 2 action plan',
    ],
    features: [
      'Progress comparison chart',
      'Habit streak tracker',
      'Personalized tips based on Week 1',
      'Motivation boost content',
    ],
  },
  {
    day: 30,
    title: 'Month Review',
    icon: '🏆',
    color: 'from-orange-900/50 to-orange-800/30',
    borderColor: 'border-orange-600/30 hover:border-orange-400',
    textColor: 'text-orange-300',
    subject: '🎉 30 Days Complete! Your Monthly Progress Report',
    preview: [
      '📊 Full month analytics dashboard',
      '🩸 Time for lab tests: FBS, HbA1c, Lipid profile',
      '📈 HOMA-IR & TyG Index trends',
      '🎯 Month 2 optimization plan',
    ],
    features: [
      'Detailed 30-day report',
      'Lab test recommendations',
      'Doctor consultation scheduling',
      'Month 2 goals setting',
    ],
  },
  {
    day: 90,
    title: 'Final Report',
    icon: '🎯',
    color: 'from-purple-900/50 to-purple-800/30',
    borderColor: 'border-purple-600/30 hover:border-purple-400',
    textColor: 'text-purple-300',
    subject: '🏆 Congratulations! Your 90-Day Transformation Complete!',
    preview: [
      '📊 Complete 90-day transformation report',
      '🎓 Remission certificate (if achieved)',
      '📈 Before vs After comparison',
      '🔄 Maintenance plan for long-term success',
    ],
    features: [
      'Full transformation analytics',
      'Remission achievement badge',
      'Maintenance protocol',
      'Alumni community access',
    ],
  },
];

export default function OnboardingDemo() {
  const [selectedDay, setSelectedDay] = useState<DayPreview | null>(null);

  return (
    <>
      {/* Demo: 90-Day Onboarding Journey Preview */}
      <div className="border-t border-gray-700 mt-8 pt-4 md:pt-6 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-4 md:p-6">
        <div className="text-center mb-3 md:mb-6">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-full mb-2">
            <span className="text-lg">👋</span>
            <span className="font-bold text-sm md:text-base">Get Hands-On Experience</span>
          </div>
          <h3 className="text-sm md:text-lg font-bold text-orange-800 mb-1">📧 90-Day Journey Demo</h3>
          <p className="text-[10px] md:text-xs text-gray-600 px-2">Tap to preview each milestone</p>
        </div>
        {/* Mobile: Vertical stack, Desktop: Horizontal grid */}
        <div className="flex flex-col md:flex-row md:grid md:grid-cols-5 gap-2 md:gap-3 max-w-3xl mx-auto px-4 md:px-0">
          {dayPreviews.map((day) => (
            <button
              key={day.day}
              onClick={() => setSelectedDay(day)}
              className={`bg-gradient-to-b ${day.color} rounded-lg p-3 border ${day.borderColor} transition-all transform hover:scale-105 cursor-pointer flex items-center md:flex-col md:text-center gap-3 md:gap-0`}
            >
              <div className="text-2xl md:text-2xl">{day.icon}</div>
              <div className="flex-1 md:flex-none text-left md:text-center">
                <div className={`text-sm md:text-xs font-bold ${day.textColor}`}>Day {day.day}</div>
                <div className="text-xs text-gray-400 md:hidden">{day.title}</div>
              </div>
              <div className="text-gray-500 md:hidden">→</div>
            </button>
          ))}
        </div>
        <p className="text-center text-[10px] md:text-xs text-gray-500 mt-3 md:mt-4">
          ✨ Approved patients get direct link
        </p>
      </div>

      {/* Modal Popup */}
      {selectedDay && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedDay(null)}
        >
          <div 
            className="bg-gray-900 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={`bg-gradient-to-r ${selectedDay.color} p-6 rounded-t-2xl`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{selectedDay.icon}</span>
                  <div>
                    <div className={`text-2xl font-bold ${selectedDay.textColor}`}>Day {selectedDay.day}</div>
                    <div className="text-white text-sm">{selectedDay.title}</div>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedDay(null)}
                  className="text-white hover:text-gray-300 text-2xl"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Email Preview */}
            <div className="p-6">
              {/* Email Subject */}
              <div className="bg-gray-800 rounded-lg p-4 mb-4">
                <div className="text-xs text-gray-500 mb-1">📧 Email Subject:</div>
                <div className="text-white font-semibold">{selectedDay.subject}</div>
              </div>

              {/* Email Content Preview */}
              <div className="bg-gray-800 rounded-lg p-4 mb-4">
                <div className="text-xs text-gray-500 mb-3">📄 What's Inside:</div>
                <ul className="space-y-2">
                  {selectedDay.preview.map((item, index) => (
                    <li key={index} className="text-gray-300 text-sm">{item}</li>
                  ))}
                </ul>
              </div>

              {/* Features */}
              <div className="bg-gray-800 rounded-lg p-4 mb-6">
                <div className="text-xs text-gray-500 mb-3">✨ Key Features:</div>
                <div className="grid grid-cols-2 gap-2">
                  {selectedDay.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs text-gray-400">
                      <span className="text-green-400">✓</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/enroll"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-center transition-colors"
                  onClick={() => setSelectedDay(null)}
                >
                  🚀 Enroll Now
                </Link>
                <Link
                  href="/pricing"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-center transition-colors"
                  onClick={() => setSelectedDay(null)}
                >
                  💰 View Packages
                </Link>
              </div>

              {/* Contact */}
              <div className="mt-4 text-center">
                <a 
                  href="https://wa.me/919963721999?text=I want to know more about Day ${selectedDay.day} onboarding"
                  target="_blank"
                  className="text-sm text-gray-400 hover:text-green-400 transition-colors"
                >
                  💬 Questions? WhatsApp us: 09963721999
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

