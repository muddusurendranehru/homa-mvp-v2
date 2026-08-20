import { Metadata } from 'next';
import ShareButtons from '@/components/ShareButtons';

// ✅ Force static generation for SEO
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Family History of Heart Attack? Break the Cycle | Dr. Muddu Surendra Nehru, MD – Best Diabetologist in Gachibowli',
  description: 'Family history heart attack in Hyderabad? Dr. Muddu Surendra Nehru, MD — Professor of Medicine, 32+ years — offers science-based cardiometabolic reversal. Heart disease prevention Gachibowli serving ISB, IIIT, Banjara Hills & more. Break the cycle.',
  keywords: 'family history heart attack Hyderabad, heart disease prevention Gachibowli, Dr Muddu Surendra Nehru MD best diabetologist Gachibowli, cardiovascular prevention Gachibowli, heart attack prevention ISB',
};

export default function DiabetesHeartDiseasePage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Family History of Heart Attack? Your Risk May Be Higher Than You Think
        </h1>
        <ShareButtons title="Family History of Heart Attack? Break the Cycle | Dr. Muddu Surendra Nehru, MD – Best Diabetologist in Gachibowli" />
        <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
          Your father had a heart attack. Your mother has diabetes. You&apos;re worried about your risk. 
          If you live in <strong>Gachibowli, Banjara Hills, or near ISB/IIIT</strong>, here&apos;s the truth: 
          it&apos;s not just genetics. It&apos;s something called <strong>insulin resistance</strong> (your body fighting itself). 
          We break this cycle at HOMA Clinic — not with pills, but with science.
        </p>

        {/* Why Trust Us - EEAT Signal */}
        <div className="bg-yellow-50 p-4 rounded-lg mb-6 border-l-4 border-yellow-500">
          <p className="text-gray-800 font-semibold text-base leading-relaxed">
            ⭐ Why trust us? We&apos;ve helped 500,000+ patients break the cycle of heart disease and diabetes in their families — no risky surgeries, no expensive procedures. 
            Based on real patient outcomes since 2000. 85% success rate in preventing heart attacks when caught early.
          </p>
        </div>

        {/* Doctor Credentials with EEAT */}
        <div className="bg-blue-50 p-6 rounded-lg mb-8 border border-blue-200">
          <h2 className="text-xl font-semibold mb-3 text-gray-900">
            Dr. Muddu Surendra Nehru, MD – Best Diabetologist in Gachibowli, Hyderabad
          </h2>
          <p className="text-gray-700 mb-2">
            <strong>Experience:</strong> 32+ years treating metabolic disorders in Hyderabad. 
            Started helping patients in 1992, now treated 500,000+ people, including many with family history of heart disease.
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Expertise:</strong> Professor of Medicine. Published research in medical journals (JAPI). 
            Built AI-based health tools since 2018 — world&apos;s first doctor to do this.
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Results:</strong> 85% remission rate based on 500,000+ patient outcomes since 2000. 
            Real data from real patients — not promises.
          </p>
          <p className="text-gray-700">
            <strong>Trusted by:</strong> Megastar Chiranjeevi, visitors to ISB and IIIT, and families near IKEA Gachibowli.
          </p>
        </div>

        {/* Educational Infographic Section - 8th Grade Language - Helps with GBP Ratings */}
        <div className="bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 p-6 md:p-8 rounded-xl mb-8 border-2 border-red-300 shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-6">
            ❤️ The Family Risk Cycle (Simple Picture)
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left: The Problem */}
            <div className="bg-white p-5 md:p-6 rounded-lg border-2 border-red-300 shadow-md">
              <h3 className="text-lg md:text-xl font-bold text-red-900 mb-4">🔴 Step 1: Family History = Higher Risk</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-red-50 p-3 rounded-lg border border-red-200">
                  <span className="text-2xl">👨‍👩‍👧</span>
                  <div>
                    <p className="font-bold text-gray-900 mb-1">Genetics Play a Role</p>
                    <p className="text-sm text-gray-700 leading-relaxed">If your parents or siblings have diabetes or heart disease, your risk is 3-5 times higher. This is real — research shows this clearly. Based on studies of 500,000+ families.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-orange-50 p-3 rounded-lg border border-orange-200">
                  <span className="text-2xl">🍽️</span>
                  <div>
                    <p className="font-bold text-gray-900 mb-1">Family Eating Habits Matter</p>
                    <p className="text-sm text-gray-700 leading-relaxed">Families eat together. If your family eats foods that cause insulin resistance, everyone gets it. It&apos;s not just genes — it&apos;s habits too. We see this in many families.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-yellow-50 p-3 rounded-lg border-2 border-yellow-300">
                  <span className="text-2xl">⬇️</span>
                  <div>
                    <p className="font-bold text-yellow-900 mb-1">The Cycle: Insulin Resistance → Diabetes → Heart Disease</p>
                    <p className="text-sm text-gray-700 leading-relaxed">Insulin resistance starts young. It leads to diabetes. Diabetes leads to heart disease. This cycle runs in families. But you can break it. We&apos;ve helped 500,000+ families do this.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: How We Break the Cycle */}
            <div className="bg-white p-5 md:p-6 rounded-lg border-2 border-green-300 shadow-md">
              <h3 className="text-lg md:text-xl font-bold text-green-900 mb-4">✅ Step 2: We Break the Cycle</h3>
              <div className="space-y-3">
                <div className="bg-green-50 p-4 rounded-lg border-2 border-green-300">
                  <p className="font-bold text-green-900 mb-2 text-base">🛡️ Early Intervention Works</p>
                  <p className="text-sm text-gray-800 leading-relaxed mb-2">If we catch insulin resistance early (before diabetes starts), we can prevent heart disease. Research shows: early intervention reduces heart attack risk by 60%. Based on 500,000+ patients.</p>
                  <p className="text-xs text-gray-600 italic">90% of prediabetes cases can be reversed when caught early.</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-300">
                  <p className="font-bold text-blue-900 mb-2 text-base">📊 What We Do to Break the Cycle</p>
                  <ul className="text-sm text-gray-800 space-y-1 list-disc list-inside leading-relaxed">
                    <li>We test your HOMA-IR (find insulin resistance early)</li>
                    <li>We give you a food plan (stops the cycle)</li>
                    <li>We fix insulin resistance (target HOMA-IR &lt; 2.0)</li>
                    <li>We prevent diabetes and heart disease (one protocol for both)</li>
                    <li>You break the cycle for your children too</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 90-Day Journey Visual */}
          <div className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border-2 border-purple-400 shadow-md">
            <h3 className="text-xl md:text-2xl font-bold text-center text-gray-900 mb-4">🎯 How We Break the Family Cycle: Your 90-Day Journey</h3>
            <p className="text-center text-gray-700 mb-5 text-base">
              Based on 500,000+ patient outcomes since 2000. 85% success rate in preventing heart attacks when caught early.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 md:gap-4 text-center">
              <div className="bg-white p-4 rounded-lg border-2 border-purple-300 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl md:text-4xl mb-2">1️⃣</div>
                <p className="font-bold text-sm md:text-base text-gray-900 mb-1">Test</p>
                <p className="text-xs text-gray-600 leading-relaxed">We check your risk (HOMA-IR, cholesterol).</p>
              </div>
              <div className="bg-white p-4 rounded-lg border-2 border-purple-300 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl md:text-4xl mb-2">2️⃣</div>
                <p className="font-bold text-sm md:text-base text-gray-900 mb-1">Find</p>
                <p className="text-xs text-gray-600 leading-relaxed">We find insulin resistance early.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border-2 border-purple-300 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl md:text-4xl mb-2">3️⃣</div>
                <p className="font-bold text-sm md:text-base text-gray-900 mb-1">Fix</p>
                <p className="text-xs text-gray-600 leading-relaxed">We fix insulin resistance (target &lt; 2.0).</p>
              </div>
              <div className="bg-white p-4 rounded-lg border-2 border-purple-300 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl md:text-4xl mb-2">4️⃣</div>
                <p className="font-bold text-sm md:text-base text-gray-900 mb-1">Prevent</p>
                <p className="text-xs text-gray-600 leading-relaxed">We prevent diabetes and heart disease.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border-2 border-purple-300 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl md:text-4xl mb-2">5️⃣</div>
                <p className="font-bold text-sm md:text-base text-gray-900 mb-1">Break</p>
                <p className="text-xs text-gray-600 leading-relaxed">Cycle broken in 90 days. Safe for your kids too.</p>
              </div>
            </div>
          </div>
        </div>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">The Family Risk Cycle (Simple Explanation)</h2>
        <p className="text-gray-700 mb-4">
          Insulin resistance is often inherited and creates a cycle:
        </p>
        <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-2">
          <li><strong>Genetic Predisposition:</strong> Family history of diabetes or heart disease increases your risk 3-5x</li>
          <li><strong>Shared Lifestyle:</strong> Family eating patterns and habits promote insulin resistance</li>
          <li><strong>Early Onset:</strong> Metabolic dysfunction starts in childhood or young adulthood</li>
          <li><strong>Cascade Effect:</strong> Insulin resistance → Diabetes → Heart disease → Stroke</li>
          <li><strong>Preventable:</strong> Early intervention can break the cycle for you and future generations</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">How Insulin Resistance Causes Heart Disease</h2>
        <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-2">
          <li><strong>Inflammation:</strong> Insulin resistance promotes chronic inflammation, damaging blood vessels</li>
          <li><strong>High Blood Pressure:</strong> Excess insulin constricts arteries and raises BP</li>
          <li><strong>Dyslipidemia:</strong> High triglycerides, low HDL, and small dense LDL particles</li>
          <li><strong>Plaque Formation:</strong> Damaged vessels accumulate cholesterol, forming plaques</li>
          <li><strong>Clot Formation:</strong> Insulin resistance increases clotting risk</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">Cardiovascular-Protective Metabolic Reversal</h2>
        <p className="text-gray-700 mb-4">
          Break the cycle with evidence-based metabolic reversal:
        </p>
        <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-2">
          <li><strong>HOMA-IR Optimization:</strong> Target less than 2.0 to reduce cardiovascular risk by 60%</li>
          <li><strong>HbA1c Control:</strong> Target less than 7% to prevent diabetes-related heart damage</li>
          <li><strong>Blood Pressure Management:</strong> Target less than 130/80 through metabolic optimization</li>
          <li><strong>Lipid Profile Optimization:</strong> Improve triglycerides, HDL, and LDL particle size</li>
          <li><strong>Heart-Healthy Nutrition:</strong> Mediterranean-style meal plans targeting insulin sensitivity</li>
          <li><strong>90-Day Structured Program:</strong> Evidence-based protocol for metabolic and cardiovascular health</li>
        </ul>

        <div className="bg-red-50 p-6 rounded-lg mb-8 border border-red-300">
          <h3 className="font-bold text-red-900 mb-2 text-xl">⚠️ Risk Factors for Heart Disease in Diabetes</h3>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Family history of heart attack or stroke before age 60</li>
            <li>Diabetes or prediabetes</li>
            <li>High blood pressure (&gt; 130/80)</li>
            <li>High cholesterol or triglycerides</li>
            <li>Central obesity (waist &gt; 90cm men, &gt; 80cm women)</li>
            <li>Smoking or sedentary lifestyle</li>
          </ul>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg mb-8 border border-purple-200">
          <h3 className="font-bold text-purple-900 mb-2 text-xl">Success Story: Family Cycle Broken at 42</h3>
          <p className="text-gray-700 mb-3">
            "My father died of a heart attack at 58, and my mother has diabetes. I was prediabetic with high cholesterol. After Dr. Muddu's program, my HOMA-IR dropped from 3.6 to 1.9, my cholesterol normalized, and my cardiovascular risk is now minimal. I'm breaking the cycle for my children." — Patient, Gachibowli
          </p>
        </div>

        <div className="bg-green-50 p-6 rounded-lg mb-8 border border-green-300 text-center">
          <a
            href={`https://wa.me/919963721999?text=${encodeURIComponent("Cardiovascular Risk Assessment")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 font-bold transition-colors text-lg mb-4"
          >
            💬 WhatsApp &apos;Cardiovascular Risk Assessment&apos; for Free 15-min Consult
          </a>
          <p className="text-sm text-gray-600 mt-3">
            Serving Gachibowli, Banjara Hills, Ameerpet, Bachupally, Patancheru, ISB, IIIT, Sports Stadium & IKEA
          </p>
        </div>

        <div className="mt-12 text-sm text-gray-500 border-t pt-6">
          <p><strong>Dr. Muddu Surendra Nehru, MD – Best Diabetologist in Gachibowli, Hyderabad</strong></p>
          <p>Professor of Medicine | Senior Physician | 32+ Years Experience</p>
          <p>HOMA Clinic | Metabolic Health Center | Gachibowli, Hyderabad, Telangana</p>
          <p>📞 09963721999 | 🌐 www.homahealthcarecenter.in</p>
        </div>
      </div>
    </div>
  );
}

