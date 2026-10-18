import type { Metadata } from "next";
import Link from "next/link";
import ShareButtons from "@/components/ShareButtons";

export const metadata: Metadata = {
  title: "HOMA Lifestyle | Gear, News & Community",
  description: "Live loud. Manage your metabolic health with the best gear, breaking health news, and a community that thrives.",
};

export default function LifestylePage() {
  return (
    <main className="bg-gray-50 min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center">
          <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
            The HOMA Lifestyle
          </span>
          <h1 className="mt-4 text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900">
            Eat. Pray. Sleep. <span className="text-green-600">Conquer.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Health isn't just about avoiding sugar. It's about living your best life. Discover the latest gear, news, and communities to help you thrive.
          </p>
          
          <div className="mt-8 flex justify-center">
            <ShareButtons title="Eat. Pray. Sleep. Conquer. - The HOMA Lifestyle" />
          </div>
        </div>
      </section>

      {/* 2. THE GEAR WE LOVE (Affiliate Section) */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">The Gear We Love</h2>
            <p className="text-gray-600 mt-2">Tools to track your journey, from your wrist to your shoes.</p>
          </div>
          <Link href="/directory" className="text-green-600 font-semibold hover:underline hidden sm:block">
            View Full Directory &rarr;
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
            <div className="h-48 bg-gray-200 relative">
              <div className="absolute inset-0 flex items-center justify-center text-4xl">⌚</div>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-xl text-gray-900">Apple Watch Ultra</h3>
              <p className="text-gray-600 text-sm mt-2 mb-4">ECG, fall detection, and precise workout tracking for your daily walks.</p>
              <a href="#" className="text-green-600 font-semibold text-sm hover:underline">View on Amazon &rarr;</a>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
            <div className="h-48 bg-gray-200 relative">
              <div className="absolute inset-0 flex items-center justify-center text-4xl">📉</div>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-xl text-gray-900">Continuous Glucose Monitor (CGM)</h3>
              <p className="text-gray-600 text-sm mt-2 mb-4">Real-time data. See exactly how your food and exercise affect your sugar.</p>
              <a href="#" className="text-green-600 font-semibold text-sm hover:underline">View Options &rarr;</a>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
            <div className="h-48 bg-gray-200 relative">
              <div className="absolute inset-0 flex items-center justify-center text-4xl">👟</div>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-xl text-gray-900">New Balance / Nike Running Shoes</h3>
              <p className="text-gray-600 text-sm mt-2 mb-4">Protect your joints and feet. Essential for diabetic neuropathy prevention.</p>
              <a href="#" className="text-green-600 font-semibold text-sm hover:underline">Shop Shoes &rarr;</a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BREAKING NEWS & TRENDING */}
      <section className="bg-gray-900 text-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold mb-8">Trending Now</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="border border-gray-700 p-6 rounded-xl hover:bg-gray-800 transition">
              <span className="text-green-400 text-xs font-bold uppercase tracking-wider">Health News</span>
              <h3 className="text-xl font-bold mt-2 mb-2">Why Athletes Are Obsessed with CGMs</h3>
              <p className="text-gray-400 text-sm">From Tour de France cyclists to cricketers, continuous glucose monitors are changing how athletes fuel their bodies.</p>
            </div>
            <div className="border border-gray-700 p-6 rounded-xl hover:bg-gray-800 transition">
              <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">Sports & Events</span>
              <h3 className="text-xl font-bold mt-2 mb-2">The Impact of Diabetes in the NBA</h3>
              <p className="text-gray-400 text-sm">How players manage their metabolic health on and off the court, and what we can learn from them.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HASHTAGS & COMMUNITY */}
      <section className="mx-auto max-w-6xl px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Join the Movement</h2>
        <p className="text-gray-600 mb-8 max-w-xl mx-auto">Tag us in your daily walks, healthy meals, and gym sessions. Let's build a positive community together.</p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <span className="bg-white border border-gray-200 text-gray-800 font-semibold px-4 py-2 rounded-lg shadow-sm">#EatPraySleepConquer</span>
          <span className="bg-white border border-gray-200 text-gray-800 font-semibold px-4 py-2 rounded-lg shadow-sm">#HOMALifestyle</span>
          <span className="bg-white border border-gray-200 text-gray-800 font-semibold px-4 py-2 rounded-lg shadow-sm">#DiabetesReversal</span>
        </div>

        <a href="mailto:info@homahealthcarecenter.in" className="inline-block bg-green-600 text-white font-semibold px-8 py-3 rounded-full hover:bg-green-700 transition-colors shadow-md">
          Partner With Us or Share Your Story
        </a>
      </section>

    </main>
  );
}