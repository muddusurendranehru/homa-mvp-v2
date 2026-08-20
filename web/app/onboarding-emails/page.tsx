'use client';

import { useState } from 'react';

export default function OnboardingEmailsPage() {
  const [activeEmail, setActiveEmail] = useState(1);

  const emails = [
    {
      day: 1,
      subject: "Welcome to Your 90-Day Metabolic Remission Journey!",
      preview: "Hello [Name], your dashboard is ready. Log your first meal, steps, and symptoms today.",
      cta: "Open Dashboard →",
      color: "from-green-400 to-teal-500",
      icon: "🚀"
    },
    {
      day: 3,
      subject: "Day 3 Check-In: How's Your Energy Level?",
      preview: "Track your HOMA-IR trend. Did you notice any changes since Day 1? Log now.",
      cta: "Log Today's Progress →",
      color: "from-blue-400 to-indigo-500",
      icon: "📊"
    },
    {
      day: 7,
      subject: "Week 1 Complete! 🎉 Here's Your Progress Report",
      preview: "You've logged 7 days straight! View your BMI & TyG Index trends + get Week 2 tips.",
      cta: "View My Report →",
      color: "from-purple-400 to-pink-500",
      icon: "🎉"
    },
    {
      day: 30,
      subject: "Halfway There! 30 Days of Transformation",
      preview: "Your HOMA-IR improved by 12%! Celebrate with a free 10-min counselling session.",
      cta: "Book Your Session →",
      color: "from-orange-400 to-red-500",
      icon: "🔥"
    },
    {
      day: 90,
      subject: "Congratulations! You've Completed Your 90-Day Remission Program",
      preview: "Download your final report, see before/after stats, and choose your next step.",
      cta: "Get My Final Report →",
      color: "from-yellow-400 to-amber-500",
      icon: "🏆"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-teal-50 min-h-screen py-8 px-4 md:px-8 relative overflow-hidden">
      {/* Floating iPhone Mockups (Decorative CSS) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 -left-10 w-32 h-56 bg-gray-900 rounded-[30px] opacity-10 transform rotate-12"></div>
        <div className="absolute top-20 right-10 w-28 h-48 bg-gray-900 rounded-[25px] opacity-10 transform -rotate-12"></div>
        <div className="absolute bottom-40 left-20 w-24 h-44 bg-gray-900 rounded-[20px] opacity-5 transform rotate-6"></div>
        <div className="absolute bottom-20 right-40 w-36 h-60 bg-gray-900 rounded-[30px] opacity-5 transform -rotate-6"></div>
        <div className="absolute top-1/2 left-1/3 w-20 h-36 bg-gray-900 rounded-[18px] opacity-5 transform rotate-12"></div>
        
        {/* Gradient Circles */}
        <div className="absolute top-20 right-1/4 w-64 h-64 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-40 left-1/4 w-80 h-80 bg-teal-200 rounded-full opacity-20 blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-t-2xl p-6 text-white">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-3xl">📧</span>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Your 90-Day Onboarding Journey</h1>
              <p className="text-blue-100 text-sm mt-1">Automated email sequence for patient retention & engagement</p>
            </div>
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-b-2xl shadow-xl p-4 md:p-8">
          {/* Info Banner */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r-lg">
            <p className="text-blue-800 font-medium">
              📬 Automated Email Sequence
            </p>
            <p className="text-blue-700 text-sm mt-1">
              These emails are triggered automatically based on user enrollment date. No manual intervention needed.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-400 via-blue-400 to-amber-400 hidden md:block"></div>

            {/* Email Cards */}
            <div className="space-y-6">
              {emails.map((email, index) => (
                <div
                  key={index}
                  className={`relative transition-all duration-300 ${
                    activeEmail === email.day ? 'scale-[1.02]' : ''
                  }`}
                  onMouseEnter={() => setActiveEmail(email.day)}
                >
                  <div className={`ml-0 md:ml-14 p-4 md:p-6 rounded-xl border-2 transition-all duration-300 ${
                    activeEmail === email.day
                      ? 'border-blue-500 bg-blue-50 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                  }`}>
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      {/* Day Badge - Mobile */}
                      <div className="flex items-center gap-3 md:hidden">
                        <div className={`bg-gradient-to-br ${email.color} text-white font-bold rounded-full w-12 h-12 flex items-center justify-center shadow-lg`}>
                          D{email.day}
                        </div>
                        <span className="text-2xl">{email.icon}</span>
                      </div>

                      {/* Day Badge - Desktop (positioned on timeline) */}
                      <div className={`hidden md:flex absolute left-0 bg-gradient-to-br ${email.color} text-white font-bold rounded-full w-10 h-10 items-center justify-center shadow-lg text-sm`}>
                        {email.day}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <h2 className="text-lg md:text-xl font-semibold text-gray-800 leading-tight">
                            {email.subject}
                          </h2>
                          <span className="text-2xl hidden md:block">{email.icon}</span>
                        </div>
                        <p className="text-gray-600 mt-2 text-sm md:text-base">{email.preview}</p>
                        
                        {/* CTA Button */}
                        <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3">
                          <a
                            href={
                              email.day === 1 ? '/dashboard' :
                              email.day === 3 ? '/remission-program' :
                              email.day === 7 ? '/follow-up' :
                              email.day === 30 ? 'https://wa.me/919963721999?text=I want to book my Day 30 counselling session' :
                              '/follow-up'
                            }
                            target={email.day === 30 ? '_blank' : '_self'}
                            className={`px-4 py-2 bg-gradient-to-r ${email.color} text-white font-medium rounded-lg shadow hover:shadow-md transition duration-200 text-sm text-center`}
                          >
                            {email.cta}
                          </a>
                          <span className="text-xs text-gray-400">
                            Sent on Day {email.day} after enrollment
                          </span>
                        </div>
                      </div>

                      {/* Mini Phone Mockup */}
                      <div className="hidden lg:block">
                        <div className="w-24 h-40 bg-gray-900 rounded-xl p-1 shadow-lg transform hover:scale-105 transition-transform">
                          <div className={`w-full h-full bg-gradient-to-br ${email.color} rounded-lg flex flex-col items-center justify-center text-white`}>
                            <span className="text-2xl mb-1">{email.icon}</span>
                            <span className="text-[10px] font-bold">Day {email.day}</span>
                            <span className="text-[8px] opacity-75">Email</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Stats */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-600">5</div>
              <div className="text-xs text-green-700">Emails in Sequence</div>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">90</div>
              <div className="text-xs text-blue-700">Day Journey</div>
            </div>
            <div className="bg-purple-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">85%</div>
              <div className="text-xs text-purple-700">Open Rate Target</div>
            </div>
            <div className="bg-amber-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-amber-600">100%</div>
              <div className="text-xs text-amber-700">Automated</div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500">
              📧 All emails are HIPAA-compliant and follow CAN-SPAM guidelines.
            </p>
            <p className="text-xs text-gray-400 mt-2">
              © {new Date().getFullYear()} HOMA Clinics Private Limited. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

