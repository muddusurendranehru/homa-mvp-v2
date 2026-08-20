import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { AuthProvider } from '@/lib/auth-context'
import Link from 'next/link'
import Image from 'next/image'
import MobileNav from '@/components/MobileNav'
import HeaderAuth from '@/components/HeaderAuth'
import OnboardingDemo from '@/components/OnboardingDemo'
import WelcomeBot from '@/components/WelcomeBot'
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com'),
  title: 'Dr Muddu\'s HOMA Clinic Gachibowli Hyderabad India - Diabetes Cardio Obesity REMISSION',
  description: 'Years struggling? We test FASTING INSULIN (not glucose) + HOMA-IR. 32yrs ethics-guided care, 35L patients, India #1 5K+ HOMA tests, pioneer cardio-obesity-metabolism. 25 apps built. Pioneer close monitoring → REMISSION.',
  verification: {
    google: 'KR-S5Yw9tbmd22VH8sY4wkwGxD3jv_UiIGHYgeHAlRM',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XJQ762V2MY"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XJQ762V2MY');
          `}
        </Script>
        <meta name="google-site-verification" content="KR-S5Yw9tbmd22VH8sY4wkwGxD3jv_UiIGHYgeHAlRM" />
        <meta name="description" content="Years struggling? We test FASTING INSULIN (not glucose) + HOMA-IR. 32yrs ethics-guided care, 35L patients, India #1 5K+ HOMA tests, pioneer cardio-obesity-metabolism. 25 apps built. Pioneer close monitoring → REMISSION." />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1e40af" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com" />
        <meta property="og:title" content="Dr Muddu Nehru | Diabetologist Gachibowli" />
        <meta property="og:description" content="90 Day Diabetes Remission | 85% Success" />
        <meta property="og:image" content="https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com/images/obesity-reversal-hyderabad-jpg.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com" />
        <meta name="twitter:title" content="Dr Muddu Nehru | Diabetologist Gachibowli" />
        <meta name="twitter:description" content="90 Day Diabetes Remission | 85% Success" />
        <meta name="twitter:image" content="https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com/images/obesity-reversal-hyderabad-jpg.jpg" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalClinic",
              "name": "Dr Muddu's HOMA Clinic Gachibowli Hyderabad India - Diabetes Cardio Obesity REMISSION",
              "alternateName": "Diabetes Reversal Center Health care center Gachibowli",
              "description": "Years struggling? We test FASTING INSULIN (not glucose) + HOMA-IR. 32yrs ethics-guided care, 35L patients, India #1 5K+ HOMA tests, pioneer cardio-obesity-metabolism. 25 apps built. Pioneer close monitoring → REMISSION.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Gachibowli",
                "addressRegion": "Telangana",
                "addressCountry": "IN",
                "streetAddress": "Diabetes Reversal Center Health care center Gachibowli"
              },
              "telephone": "09963721999",
              "url": "https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.7",
                "reviewCount": "350",
                "bestRating": "5",
                "worstRating": "1"
              },
              "priceRange": "₹₹",
              "medicalSpecialty": ["Endocrinology", "Cardiology", "Metabolic Medicine"],
              "founder": {
                "@type": "Person",
                "name": "Dr. Muddu Surendra Nehru",
                "jobTitle": "Professor of Medicine"
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Best diabetologist Gachibowli?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Dr. Muddu Surendra Nehru MD is the best diabetologist in Gachibowli, Hyderabad. With 30+ years of experience, 500,000+ patients treated, and 85% remission rate using the evidence-based 90-day HOMA protocol. Professor of Medicine specializing in diabetes reversal, insulin resistance, and metabolic health."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Diabetes reversal cost Gachibowli?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "₹999 Metabolic Risk Calculator + 90 Day Program. The program includes personalized treatment plans, HOMA-IR testing, nutrition tracking, and continuous monitoring for metabolic remission."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Diabetes reversal cost Hyderabad?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "₹999 Metabolic Risk Calculator + 90 Day Program at HOMA Clinic Gachibowli. Dr. Muddu Nehru MD offers evidence-based diabetes reversal protocols with 85% success rate. Located in Gachibowli, Hyderabad. Call 09963721999 for consultation."
                  }
                },
                {
                  "@type": "Question",
                  "name": "HOMA IR test Gachibowli?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "HOMA-IR test available at HOMA Clinic Gachibowli, Hyderabad. Dr. Muddu Nehru MD offers comprehensive metabolic testing including HOMA-IR (Homeostatic Model Assessment for Insulin Resistance), fasting glucose, triglycerides, and TyG Index. Address: Diabetes Reversal Center Health care center Gachibowli. Phone: 09963721999."
                  }
                }
              ]
            })
          }}
        />
        {/* MedicalClinic Schema for Local SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalClinic",
              "name": "HOMA Clinic - Metabolic Disease Reversal",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "plot:no:140, Gachibowli Rd, beside mehfill restaurant, Rajiv Gandhi Nagar, Gachibowli",
                "addressLocality": "Hyderabad",
                "addressRegion": "Telangana",
                "postalCode": "500032",
                "addressCountry": "IN"
              },
              "telephone": "+919963721999",
              "url": "https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com",
              "sameAs": [
                "https://www.justdial.com/Hyderabad/HOMA-Health-Care-Center",
                "https://www.practo.com/hyderabad/clinic/homa-health-care-center-gachibowli",
                "https://kividoctor.com/clinics/homa-health-care-center-hyderabad",
                "https://www.sulekha.com/homa-health-care-center-hyderabad",
                "https://g.page/dr-muddu-surendra-nehrumd"
              ],
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "17.4487",
                "longitude": "78.3987"
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "name": "Dr Muddu's Health Apps Ecosystem",
              "description": "Comprehensive suite of AI-powered health applications by Dr. Muddu Surendra Nehru MD",
              "itemListElement": [
                {
                  "@type": "SoftwareApplication",
                  "name": "Drug Trials Tracker",
                  "description": "Track and manage clinical drug trials",
                  "url": "https://drug-trials-frontend.onrender.com",
                  "applicationCategory": "HealthApplication",
                  "operatingSystem": "Web",
                  "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "INR"
                  }
                },
                {
                  "@type": "SoftwareApplication",
                  "name": "OCR Report Analyzer",
                  "description": "AI-powered medical report analysis using OCR technology",
                  "url": "https://ai-image-ocr-1.onrender.com",
                  "applicationCategory": "HealthApplication",
                  "operatingSystem": "Web",
                  "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "INR"
                  }
                },
                {
                  "@type": "SoftwareApplication",
                  "name": "PCOS HOMA Score",
                  "description": "Calculate PCOS HOMA-IR score for metabolic assessment",
                  "url": "https://pcos-homaiq-score-frontend.onrender.com",
                  "applicationCategory": "HealthApplication",
                  "operatingSystem": "Web",
                  "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "INR"
                  }
                },
                {
                  "@type": "SoftwareApplication",
                  "name": "90-Day Metrics",
                  "description": "Track your 90-day health journey and metabolic metrics",
                  "url": "https://healthmetrics-render1.onrender.com",
                  "applicationCategory": "HealthApplication",
                  "operatingSystem": "Web",
                  "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "INR"
                  }
                },
                {
                  "@type": "SoftwareApplication",
                  "name": "Nutrition Bot",
                  "description": "AI nutrition guidance powered by HOMA Foods - Get personalized nutrition recommendations",
                  "url": "https://nutrition-bot-frontend.onrender.com",
                  "applicationCategory": "HealthApplication",
                  "operatingSystem": "Web",
                  "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "INR"
                  }
                }
              ]
            })
          }}
        />
        
        {/* Person Schema - Dr. Muddu Surendra Nehru, MD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Dr. Muddu Surendra Nehru, MD",
              "url": "https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com/about",
              "image": "https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com/images/kishnblur1.jpg",
              "jobTitle": "Professor of Medicine",
              "affiliation": "HOMA Health Clinics",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Gachibowli",
                "addressLocality": "Hyderabad",
                "addressRegion": "Telangana",
                "postalCode": "500032",
                "addressCountry": "IN"
              },
              "description": "With 32+ years of clinical experience, Dr. Muddu pioneered the HOMA-IR based metabolic remission approach. Author of 4 books and 300+ articles on diabetes reversal and obesity management."
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <ClerkProvider>
        <AuthProvider>
          {/* Service Worker Registration for PWA */}
          <ServiceWorkerRegistration />
          
          {/* Mobile Navigation */}
          <MobileNav />
          
          {/* Global Header */}
          <header className="bg-teal-600 text-white py-3 px-4 shadow-md">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                  <h1 className="text-sm md:text-base font-bold">
                    DR. MUDDU SURENDRA NEHRU M.D.
                  </h1>
                  <div className="hidden md:block text-gray-300">|</div>
                  <p className="text-xs md:text-sm text-gray-200">
                    Professor of Medicine • Senior Physician • 30+ Years Experience
                  </p>
                </div>
                <div className="flex items-center justify-center md:justify-end gap-2 md:gap-4 mt-1 md:mt-0">
                  <a href="tel:+919963721999" className="text-xs md:text-sm font-semibold hover:text-yellow-300 transition-colors">
                    📞 09963721999
                  </a>
                  <span className="text-gray-400 hidden md:inline">|</span>
                  <div className="flex gap-2 text-xs items-center">
                    <a href="https://wa.me/919963721999" target="_blank" className="hover:text-green-300 transition-colors">JOIN</a>
                    <span className="text-gray-400">•</span>
                    <a href="https://wa.me/919963721999?text=I want to donate" target="_blank" className="hover:text-yellow-300 transition-colors">DONATE</a>
                    <span className="text-gray-400">•</span>
                    <a href="https://wa.me/919963721999?text=I am interested in franchise" target="_blank" className="hover:text-pink-300 transition-colors">FRANCHISE</a>
                    <span className="text-gray-400 hidden md:inline">|</span>
                    <HeaderAuth />
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="min-h-screen">
            {children}
          </main>

          {/* Global Footer */}
          <footer className="bg-gray-900 text-white py-8 px-4">
            <div className="max-w-7xl mx-auto">
              {/* Conditions Internal Linking - SEO - Tiles Version */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-center text-teal-400 mb-6">Conditions We Treat</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  <Link 
                    href="/conditions/diabetes?utm_source=footer&utm_medium=condition_tile&utm_campaign=diabetes" 
                    className="bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-3 rounded-lg text-center text-sm font-semibold transition-all transform hover:scale-105 hover:shadow-lg border-2 border-red-400"
                  >
                    🔴 Diabetes
                  </Link>
                  <Link 
                    href="/conditions/pcos?utm_source=footer&utm_medium=condition_tile&utm_campaign=pcos" 
                    className="bg-gradient-to-br from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-4 py-3 rounded-lg text-center text-sm font-semibold transition-all transform hover:scale-105 hover:shadow-lg border-2 border-pink-400"
                  >
                    💗 PCOS
                  </Link>
                  <Link 
                    href="/conditions/pcos-unexplained-weight-gain?utm_source=footer&utm_medium=condition_tile&utm_campaign=pcos_weight_gain" 
                    className="bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-4 py-3 rounded-lg text-center text-sm font-semibold transition-all transform hover:scale-105 hover:shadow-lg border-2 border-purple-400"
                  >
                    ⚖️ PCOS Weight
                  </Link>
                  <Link 
                    href="/conditions/kidney-disease?utm_source=footer&utm_medium=condition_tile&utm_campaign=kidney_health" 
                    className="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-3 rounded-lg text-center text-sm font-semibold transition-all transform hover:scale-105 hover:shadow-lg border-2 border-blue-400"
                  >
                    🫘 Kidney Health
                  </Link>
                  <Link 
                    href="/conditions/diabetes-swelling-in-legs?utm_source=footer&utm_medium=condition_tile&utm_campaign=diabetes_kidney" 
                    className="bg-gradient-to-br from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white px-4 py-3 rounded-lg text-center text-sm font-semibold transition-all transform hover:scale-105 hover:shadow-lg border-2 border-cyan-400"
                  >
                    💧 Diabetes + Kidney
                  </Link>
                  <Link 
                    href="/conditions/hypertension?utm_source=footer&utm_medium=condition_tile&utm_campaign=hypertension" 
                    className="bg-gradient-to-br from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white px-4 py-3 rounded-lg text-center text-sm font-semibold transition-all transform hover:scale-105 hover:shadow-lg border-2 border-indigo-400"
                  >
                    📊 Hypertension
                  </Link>
                  <Link 
                    href="/conditions/diabetes-hypertension?utm_source=footer&utm_medium=condition_tile&utm_campaign=diabetes_hypertension" 
                    className="bg-gradient-to-br from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white px-4 py-3 rounded-lg text-center text-sm font-semibold transition-all transform hover:scale-105 hover:shadow-lg border-2 border-violet-400"
                  >
                    🩺 Diabetes + Hypertension
                  </Link>
                  <Link 
                    href="/conditions/obesity?utm_source=footer&utm_medium=condition_tile&utm_campaign=obesity" 
                    className="bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 py-3 rounded-lg text-center text-sm font-semibold transition-all transform hover:scale-105 hover:shadow-lg border-2 border-orange-400"
                  >
                    ⚖️ Obesity
                  </Link>
                  <Link 
                    href="/conditions/belly-fat-wont-go-away?utm_source=footer&utm_medium=condition_tile&utm_campaign=belly_fat" 
                    className="bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-4 py-3 rounded-lg text-center text-sm font-semibold transition-all transform hover:scale-105 hover:shadow-lg border-2 border-amber-400"
                  >
                    📏 Belly Fat
                  </Link>
                  <Link 
                    href="/conditions/prediabetes?utm_source=footer&utm_medium=condition_tile&utm_campaign=prediabetes" 
                    className="bg-gradient-to-br from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-4 py-3 rounded-lg text-center text-sm font-semibold transition-all transform hover:scale-105 hover:shadow-lg border-2 border-yellow-400"
                  >
                    🛡️ Prediabetes
                  </Link>
                  <Link 
                    href="/conditions/sugar-normal-high-risk?utm_source=footer&utm_medium=condition_tile&utm_campaign=prediabetes_prevention" 
                    className="bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-3 rounded-lg text-center text-sm font-semibold transition-all transform hover:scale-105 hover:shadow-lg border-2 border-green-400"
                  >
                    ✅ Prediabetes Prevention
                  </Link>
                  <Link 
                    href="/conditions/metabolic-syndrome?utm_source=footer&utm_medium=condition_tile&utm_campaign=metabolic_syndrome" 
                    className="bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-4 py-3 rounded-lg text-center text-sm font-semibold transition-all transform hover:scale-105 hover:shadow-lg border-2 border-emerald-400"
                  >
                    🔄 Metabolic Syndrome
                  </Link>
                  <Link 
                    href="/conditions/family-heart-attack-diabetes?utm_source=footer&utm_medium=condition_tile&utm_campaign=diabetes_heart" 
                    className="bg-gradient-to-br from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-3 rounded-lg text-center text-sm font-semibold transition-all transform hover:scale-105 hover:shadow-lg border-2 border-red-500"
                  >
                    ❤️ Diabetes + Heart
                  </Link>
                  <Link 
                    href="/conditions/tired-at-60-not-just-aging?utm_source=footer&utm_medium=condition_tile&utm_campaign=senior_fatigue" 
                    className="bg-gradient-to-br from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white px-4 py-3 rounded-lg text-center text-sm font-semibold transition-all transform hover:scale-105 hover:shadow-lg border-2 border-slate-400"
                  >
                    👴 Senior Fatigue
                  </Link>
                  <Link 
                    href="/conditions/retired-always-tired?utm_source=footer&utm_medium=condition_tile&utm_campaign=retired_fatigue" 
                    className="bg-gradient-to-br from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-4 py-3 rounded-lg text-center text-sm font-semibold transition-all transform hover:scale-105 hover:shadow-lg border-2 border-gray-400"
                  >
                    🏖️ Retired Fatigue
                  </Link>
                  <Link 
                    href="/conditions/always-exhausted-even-after-sleep?utm_source=footer&utm_medium=condition_tile&utm_campaign=chronic_fatigue" 
                    className="bg-gradient-to-br from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-4 py-3 rounded-lg text-center text-sm font-semibold transition-all transform hover:scale-105 hover:shadow-lg border-2 border-teal-400"
                  >
                    😴 Chronic Fatigue
                  </Link>
                  <Link 
                    href="/conditions/family-metabolic-screening?utm_source=footer&utm_medium=condition_tile&utm_campaign=family_screening" 
                    className="bg-gradient-to-br from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white px-4 py-3 rounded-lg text-center text-sm font-semibold transition-all transform hover:scale-105 hover:shadow-lg border-2 border-rose-400"
                  >
                    👨‍👩‍👧 Family Screening
                  </Link>
                </div>
              </div>

              {/* NEXT STEPS Section - Moved UP */}
              <div className="footer-next-steps bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-xl text-white mb-6">
                <h3 className="text-2xl font-bold text-center mb-6">Dr. Muddu Surendra Nehru MD — Pioneer Achievements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex flex-col items-center text-center bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-4xl mb-3">📊</div>
                  <span className="font-bold text-base mb-2">1. Free Metabolic Calculators</span>
                  <span className="text-xs text-blue-100">HOMA-IR, BMI, TyG Index & more</span>
                  <Link 
                    href="/tools" 
                    className="mt-3 text-sm underline hover:text-yellow-300 transition-colors"
                  >
                    Use Free Tools →
                  </Link>
                </div>
                <div className="flex flex-col items-center text-center bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-4xl mb-3">🤖</div>
                  <span className="font-bold text-base mb-2">2. First Physician Solely Developed</span>
                  <span className="text-xs text-blue-100">AI-Based Bedside Tools</span>
                  <span className="text-xs mt-2 text-blue-200 italic">World's First AI Health App Pioneer</span>
                </div>
                <div className="flex flex-col items-center text-center bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-4xl mb-3">📱</div>
                  <span className="font-bold text-base mb-2">3. Get in Touch</span>
                  <span className="text-xs text-blue-100 mb-2">Connect via Social Media</span>
                  <div className="flex gap-2 mt-2">
                    <a 
                      href="https://www.youtube.com/channel/UCf8avHrw6K07POXSIoKgHwg" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-300 hover:text-red-200 transition-colors"
                      aria-label="YouTube"
                    >
                      📺
                    </a>
                    <a 
                      href="https://instagram.com/homahealthcarecenter" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-300 hover:text-pink-200 transition-colors"
                      aria-label="Instagram"
                    >
                      📷
                    </a>
                    <a 
                      href="https://wa.me/919963721999" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-300 hover:text-green-200 transition-colors"
                      aria-label="WhatsApp"
                    >
                      💬
                    </a>
                  </div>
                </div>
                <div className="flex flex-col items-center text-center bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-4xl mb-3">📚</div>
                  <span className="font-bold text-base mb-2">4. 300+ Articles Written & Reviewed</span>
                  <span className="text-xs text-blue-100 mb-1 font-semibold">Only One Focus:</span>
                  <span className="text-xs text-blue-100 mb-2">Metabolism • HOMA-IR • Diabetes</span>
                  <span className="text-xs text-blue-100 mb-2">Obesity • Heart Attacks</span>
                  <span className="text-xs mt-2 text-yellow-200 font-semibold italic">
                    Goal: Early Detection & Prediction of Obesity, Diabetes & Heart Attacks
                  </span>
                </div>
                </div>
              </div>

              {/* App Ecosystem Section - Moved UP and Renamed */}
              <div className="mt-8 pt-8 border-t border-gray-700 mb-8">
                <h3 className="text-2xl font-bold text-teal-400 mb-2 text-center">🌍 First in the World — Physician Developed Full Stack Web Apps</h3>
                <p className="text-center text-gray-300 mb-6 text-sm italic">Dr. Muddu Surendra Nehru MD — World's First Physician to Develop AI-Based Full Stack Web Applications</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {/* Nutrition Bot - Highlighted */}
                  <a
                    href="https://nutrition-bot-frontend.onrender.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-br from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 rounded-xl p-4 text-white transition-all transform hover:scale-105 shadow-lg border-2 border-green-400"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">🍎</span>
                      <div>
                        <div className="text-xs bg-yellow-400 text-gray-900 px-2 py-0.5 rounded-full font-bold inline-block mb-1">
                          #1 NUTRITION FOCUS
                        </div>
                        <h4 className="font-bold text-lg">Nutrition Bot</h4>
                      </div>
                    </div>
                    <p className="text-sm text-green-100">AI nutrition guidance powered by HOMA Foods</p>
                    <div className="mt-2 text-xs text-green-200">Visit App →</div>
                  </a>

                  {/* Other Apps */}
                  <a
                    href="https://drug-trials-frontend.onrender.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 hover:bg-gray-700 rounded-xl p-4 text-white transition-all transform hover:scale-105 border border-gray-600"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">💊</span>
                      <h4 className="font-bold">Drug Trials Tracker</h4>
                    </div>
                    <p className="text-sm text-gray-400">Track and manage clinical drug trials</p>
                  </a>

                  <a
                    href="https://ai-image-ocr-1.onrender.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 hover:bg-gray-700 rounded-xl p-4 text-white transition-all transform hover:scale-105 border border-gray-600"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">📄</span>
                      <h4 className="font-bold">OCR Report Analyzer</h4>
                    </div>
                    <p className="text-sm text-gray-400">AI-powered medical report analysis</p>
                  </a>

                  <a
                    href="https://pcos-homaiq-score-frontend.onrender.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 hover:bg-gray-700 rounded-xl p-4 text-white transition-all transform hover:scale-105 border border-gray-600"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">🎯</span>
                      <h4 className="font-bold">PCOS HOMA Score</h4>
                    </div>
                    <p className="text-sm text-gray-400">Calculate PCOS HOMA-IR score</p>
                  </a>

                  <a
                    href="https://healthmetrics-render1.onrender.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 hover:bg-gray-700 rounded-xl p-4 text-white transition-all transform hover:scale-105 border border-gray-600"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">📊</span>
                      <h4 className="font-bold">90-Day Metrics</h4>
                    </div>
                    <p className="text-sm text-gray-400">Track your 90-day health journey</p>
                  </a>
                </div>
              </div>

              {/* Interactive Onboarding Demo */}
              <OnboardingDemo />

              {/* GBP Widget - Above Copyright */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-indigo-200 mb-8 mt-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-bold text-indigo-900 mb-2">
                      ⭐ HOMA Clinic Gachibowli
                    </h3>
                    <p className="text-indigo-700 mb-4">
                      Diabetes Reversal Center | Dr. Muddu Nehru MD
                    </p>
                    <div className="flex gap-2 mb-4 flex-wrap">
                      <a 
                        href="https://www.google.com/maps/search/?api=1&query=Diabetes+Reversal+Center+Health+care+center+Gachibowli" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition-colors"
                      >
                        📍 Directions
                      </a>
                      <a 
                        href="tel:+919963721999"
                        className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors"
                      >
                        📱 Call Now
                      </a>
                    </div>
                  </div>
                  <div className="text-center">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.1234567890123!2d78.3489!3d17.4227!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDI1JzIyLjAiTiA3OMKwMjAnNTYuMSJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin" 
                      width="100%" 
                      height="120" 
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-lg"
                      title="Diabetes Reversal Center Health care center Gachibowli Location"
                    />
                  </div>
                </div>
              </div>

              {/* WhatsApp Share Button - Footer */}
              <div className="text-center mt-6 mb-4">
                <a
                  href="https://wa.me/919963721999?text=Best%20diabetologist%20Gachibowli%20Dr%20Muddu%20Nehru%2090%20day%20remission"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-share inline-block bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all transform hover:scale-105"
                >
                  💬 Share on WhatsApp
                </a>
              </div>

              {/* HOMA Clinic Info - Moved UP (before Quick Links) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                {/* Doctor Info */}
                <div>
                  <h3 className="text-lg font-bold text-teal-400 mb-3">🩺 HOMA Clinic</h3>
                  <p className="text-sm text-gray-300 mb-2">
                    <strong>Dr. Muddu Surendra Nehru M.D.</strong>
                  </p>
                  <p className="text-xs text-gray-400">
                    Professor of Medicine<br />
                    Senior Physician<br />
                    30+ Years of Clinical Experience<br />
                    World's First Physician to Develop AI-Based Web App for Nutrition, Health Metrics & Drug Trials
                  </p>
                </div>

                {/* Doctor Training Program */}
                <div>
                  <h3 className="text-lg font-bold text-yellow-400 mb-3">🎓 Doctor Training</h3>
                  <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 rounded-lg p-3 border border-yellow-600/30">
                    <p className="text-sm font-semibold text-yellow-300 mb-2">
                      Become a Certified Metabolism Specialist!
                    </p>
                    <p className="text-xs text-gray-300 mb-2">
                      🌍 Training Available Across the World
                    </p>
                    <div className="flex flex-col gap-1 text-xs text-gray-400 mb-3">
                      <span>✓ Online Training Programs</span>
                      <span>✓ Offline Workshops</span>
                      <span>✓ Certification Course</span>
                      <span>✓ Evidence-Based Protocols</span>
                    </div>
                    <a 
                      href="https://wa.me/919963721999?text=I am a doctor interested in Metabolism Specialist Training Program" 
                      target="_blank"
                      className="inline-block w-full text-center bg-yellow-600 hover:bg-yellow-700 text-white text-xs font-bold py-2 px-3 rounded transition-colors"
                    >
                      📩 Enquire Now
                    </a>
                  </div>
                </div>

                {/* Contact */}
                <div>
                  <h3 className="text-lg font-bold text-teal-400 mb-3">Contact & Connect</h3>
                  <div className="flex flex-col gap-2 text-sm">
                    <a href="tel:+919963721999" className="text-gray-300 hover:text-white transition-colors">
                      📞 09963721999
                    </a>
                    <a href="https://wa.me/919963721999" target="_blank" className="text-gray-300 hover:text-green-400 transition-colors">
                      💬 WhatsApp
                    </a>
                    <a href="https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com" target="_blank" className="text-gray-300 hover:text-white transition-colors">
                      🌐 HOMA Clinic Website
                    </a>
                    <a 
                      href="https://www.youtube.com/channel/UCf8avHrw6K07POXSIoKgHwg" 
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="text-gray-300 hover:text-red-400 transition-colors"
                    >
                      📺 YouTube
                    </a>
                    <a href="https://instagram.com/homahealthcarecenter" target="_blank" className="text-gray-300 hover:text-pink-400 transition-colors">
                      📷 Instagram/FB: homahealthcarecenter
                    </a>
                    <a 
                      href="https://play.google.com/store/apps/details?id=com.homaclinic.app&utm_source=whatsapp&utm_medium=staff_message&utm_campaign=app_launch" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-green-400 transition-colors"
                    >
                      📱 Download Android App
                    </a>
                  </div>
                </div>
              </div>

              {/* GIVE/DONATE Section */}
              <div className="footer-give bg-gradient-to-r from-green-500 to-emerald-600 p-6 rounded-xl text-white text-center mb-6">
                <h3 className="text-xl font-bold mb-2">❤️ GIVE - Support Metabolic Remission</h3>
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/10709/10709095.png" 
                  alt="Donate Heart" 
                  className="w-16 h-16 mx-auto mb-4"
                  loading="lazy"
                />
                <p className="text-sm mb-4">Help 500K+ patients achieve 85% remission</p>
                <a
                  href="https://wa.me/919963721999?text=I want to DONATE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-green-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition"
                >
                  Donate Now (UPI)
                </a>
              </div>

              {/* Quick Links - Moved DOWN (after GIVE/DONATE section) */}
              <div className="mt-8 mb-6">
                <h3 className="text-lg font-bold text-teal-400 mb-4 text-center">Quick Links</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 text-sm">
                  <Link href="/" className="text-gray-300 hover:text-white transition-colors text-center py-2">🏠 Home</Link>
                  <Link href="/tools" className="text-gray-300 hover:text-green-400 transition-colors text-center py-2">📊 Calculators</Link>
                  <Link href="/conditions" className="text-gray-300 hover:text-purple-400 transition-colors text-center py-2">🩺 Conditions</Link>
                  <Link href="/auth" className="text-gray-300 hover:text-white transition-colors text-center py-2">🔐 Login</Link>
                  <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors text-center py-2">📊 Dashboard</Link>
                  <Link href="/remission-program" className="text-gray-300 hover:text-white transition-colors text-center py-2">🎯 Program</Link>
                  <Link href="/testimonials" className="text-gray-300 hover:text-yellow-400 transition-colors text-center py-2">🏆 Stories</Link>
                  <Link href="/upgrade" className="text-gray-300 hover:text-green-400 transition-colors text-center py-2">💎 Premium</Link>
                  <Link href="/enroll" className="text-gray-300 hover:text-yellow-400 transition-colors text-center py-2">🎯 Enroll</Link>
                  <Link href="/ddd" className="text-gray-300 hover:text-teal-400 transition-colors text-center py-2">🩸 D·D·D</Link>
                  <Link href="/products" className="text-gray-300 hover:text-cyan-400 transition-colors text-center py-2">📱 Apps</Link>
                  <Link href="/packages" className="text-gray-300 hover:text-amber-400 transition-colors text-center py-2">💰 Packages</Link>
                  <Link href="/portfolio" className="text-gray-300 hover:text-indigo-400 transition-colors text-center py-2">👤 Portfolio</Link>
                  <Link href="/pricing" className="text-gray-300 hover:text-amber-300 transition-colors text-center py-2">💳 Pricing</Link>
                  <Link href="/zoom" className="text-gray-300 hover:text-purple-400 transition-colors text-center py-2">📹 Zoom</Link>
                  <Link href="/gallery" className="text-gray-300 hover:text-purple-400 transition-colors text-center py-2">📸 Gallery</Link>
                  <Link href="/blog" className="text-gray-300 hover:text-green-400 transition-colors text-center py-2">📝 Blog</Link>
                  <Link href="/disclaimer" className="text-gray-300 hover:text-red-400 transition-colors text-center py-2">⚖️ Legal</Link>
                  <Link href="/security-policy" className="text-gray-300 hover:text-green-400 transition-colors text-center py-2">🔒 Security</Link>
                </div>
              </div>

              {/* PAYMENTS Section - Commented out for now, can add Swift/Visa later */}
              {/* 
              <div className="footer-payments bg-gray-50 p-6 rounded-xl mb-6">
                <h3 className="text-center font-bold text-lg mb-4 text-gray-800">100% Secure Payments</h3>
                <div className="flex flex-wrap justify-center items-center gap-4">
                  <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg shadow">
                    <span className="font-bold text-sm">Visa</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg shadow">
                    <span className="font-bold text-sm">Mastercard</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg shadow">
                    <span className="font-bold text-sm">Swift</span>
                  </div>
                </div>
              </div>
              */}

              {/* Bottom Bar - SEO Internal Links */}
              <div className="border-t border-gray-700 mt-4 pt-4 text-center">
                {/* SEO Internal Links */}
                <div className="flex flex-wrap justify-center gap-4 mb-4 text-sm">
                  <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                    Home
                  </Link>
                  <Link href="/assessment" className="text-gray-300 hover:text-white transition-colors">
                    Free Assessment
                  </Link>
                  <Link href="/gallery" className="text-gray-300 hover:text-white transition-colors">
                    Success Stories
                  </Link>
                  <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">
                    Blog
                  </Link>
                </div>
                
                <div className="text-center text-gray-400 space-y-1">
                  <p className="text-xs">© 2026 HOMA Clinic | Dr. Muddu Surendra Nehru M.D.</p>
                  <p className="text-xs">Best diabetologist in Gachibowli | Metabolic reversal Hyderabad</p>
                  <p className="text-xs">Serving Gachibowli, Ameerpet, Bachupally & Patancheru with at-home metabolic assessments.</p>
                </div>
                
                {/* SEO-Optimized Directory Links */}
                <div className="mt-6 text-center text-sm text-gray-400">
                  <p className="mb-2">Find us on trusted medical directories:</p>
                  <div className="directory-links flex justify-center space-x-4 flex-wrap">
                    <a href="https://www.justdial.com/Hyderabad/HOMA-Health-Care-Center" target="_blank" rel="nofollow" className="text-blue-400 hover:underline">JustDial</a>
                    <a href="https://www.practo.com/hyderabad/clinic/homa-health-care-center-gachibowli" target="_blank" rel="nofollow" className="text-blue-400 hover:underline">Practo</a>
                    <a href="https://kividoctor.com/clinics/homa-health-care-center-hyderabad" target="_blank" rel="nofollow" className="text-blue-400 hover:underline">KiviDoctor</a>
                    <a href="https://www.sulekha.com/homa-health-care-center-hyderabad" target="_blank" rel="nofollow" className="text-blue-400 hover:underline">Sulekha</a>
                    <a href="https://g.page/dr-muddu-surendra-nehrumd" target="_blank" rel="nofollow" className="text-blue-400 hover:underline">Google Business Profile</a>
                  </div>
                </div>
                
                {/* WhatsApp Button */}
                <div className="flex justify-center mb-4">
                  <a
                    href="https://wa.me/919963721999?text=Hi%20Dr.%20Nehru%2C%20I%20want%20to%20start%20my%20free%20metabolic%20risk%20assessment."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors font-medium"
                  >
                    💬 Chat on WhatsApp
                  </a>
                </div>

                {/* UPI QR Code Section - Payment QR Code */}
                <div className="mt-4 text-center">
                  <p className="text-sm font-medium text-gray-300 mb-2">Pay via UPI:</p>
                  <div className="flex justify-center mb-2">
                    <Image
                      src="/images/gbp1.jpg"
                      alt="UPI payment QR code - surendra.muddu-1@okhdfcbank - Scan to pay Dr. Muddu Surendra Nehru MD via UPI"
                      width={200}
                      height={200}
                      className="border-2 border-gray-600 rounded-lg bg-white p-2 shadow-lg"
                      unoptimized
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-2 mb-1">
                    Scan with PhonePe, Google Pay, Paytm, or any UPI app
                  </p>
                  <p className="text-xs text-gray-500 font-mono">
                    UPI ID: surendra.muddu-1@okhdfcbank
                  </p>
                </div>

                <p className="text-xs text-gray-500 mt-4">
                  🎯 "Achieve Metabolic Remission in 90 Days — Not Just Manage It"
                </p>
                <div className="flex justify-center gap-4 mt-3 text-xs">
                  <a href="https://wa.me/919963721999?text=I want to JOIN" target="_blank" rel="noopener noreferrer" className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded transition-colors">
                    JOIN
                  </a>
                  <a href="https://wa.me/919963721999?text=I want to DONATE" target="_blank" rel="noopener noreferrer" className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded transition-colors">
                    DONATE
                  </a>
                  <a href="https://wa.me/919963721999?text=I want FRANCHISE info" target="_blank" rel="noopener noreferrer" className="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded transition-colors">
                    FRANCHISE
                  </a>
                </div>
              </div>
            </div>
          </footer>
          
          {/* Service Area Footer Notice - Outside main footer */}
          <footer className="mt-16 py-6 text-center text-sm text-gray-600 bg-white">
            Serving Gachibowli, Ameerpet, Bachupally & Patancheru with at-home metabolic assessments.
          </footer>
          
          {/* PCOS/Insulin Resistance Message - Bottom */}
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 border-t border-pink-200 py-6 px-4">
            <p className="text-center text-sm md:text-base text-gray-700 max-w-3xl mx-auto">
              <strong>Struggling with PCOS, unexplained weight gain, fatigue, or irregular periods?</strong> These are signs of insulin resistance — not just 'hormonal imbalance'.
            </p>
          </div>

          {/* Welcome Bot */}
          <WelcomeBot />
        </AuthProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}

