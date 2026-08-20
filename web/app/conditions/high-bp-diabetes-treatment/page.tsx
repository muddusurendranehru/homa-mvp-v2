import { Metadata } from 'next';
import ShareButtons from '@/components/ShareButtons';

// ✅ Force static generation for SEO
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'High BP + Diabetes? Manage Both With One Protocol | Dr. Muddu Surendra Nehru, MD – Best Diabetologist in Gachibowli',
  description: 'Diabetes + hypertension treatment in Gachibowli? Dr. Muddu Surendra Nehru, MD — Professor of Medicine, 32+ years — offers science-based dual condition management. Dual condition doctor Hyderabad serving ISB, IIIT, Banjara Hills & more.',
  keywords: 'diabetes + hypertension treatment Gachibowli, dual condition doctor Hyderabad, Dr Muddu Surendra Nehru MD best diabetologist Gachibowli, high BP diabetes treatment Gachibowli, dual management ISB',
};

export default function DiabetesHypertensionPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          High BP + Diabetes? Managing Both Together Is Key to Long-Term Health
        </h1>
        <ShareButtons title="High BP + Diabetes? Manage Both With One Protocol | Dr. Muddu Surendra Nehru, MD – Best Diabetologist in Gachibowli" />
        <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
          You have diabetes. You also have high blood pressure. You take pills for both. You&apos;re worried about your long-term health. 
          If you live in <strong>Gachibowli, Banjara Hills, or near ISB/IIIT</strong>, here&apos;s the truth: 
          it&apos;s not two separate problems. It&apos;s something called <strong>insulin resistance</strong> (your body fighting itself). 
          We fix both together at HOMA Clinic — not with more pills, but with science.
        </p>

        {/* Why Trust Us - EEAT Signal */}
        <div className="bg-yellow-50 p-4 rounded-lg mb-6 border-l-4 border-yellow-500">
          <p className="text-gray-800 font-semibold text-base leading-relaxed">
            ⭐ Why trust us? We&apos;ve helped 500,000+ patients manage both diabetes and high BP together — reducing medications, preventing kidney disease, and avoiding heart attacks. 
            Based on real patient outcomes since 2000. 85% success rate in controlling both conditions with one protocol.
          </p>
        </div>

        {/* Doctor Credentials with EEAT */}
        <div className="bg-blue-50 p-6 rounded-lg mb-8 border border-blue-200">
          <h2 className="text-xl font-semibold mb-3 text-gray-900">
            Dr. Muddu Surendra Nehru, MD – Best Diabetologist in Gachibowli, Hyderabad
          </h2>
          <p className="text-gray-700 mb-2">
            <strong>Experience:</strong> 32+ years treating metabolic disorders in Hyderabad. 
            Started helping patients in 1992, now treated 500,000+ people, including many with both diabetes and high BP.
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
        <div className="bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 p-6 md:p-8 rounded-xl mb-8 border-2 border-blue-300 shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-6">
            💊 Why Diabetes and High BP Go Together (Simple Picture)
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left: The Problem */}
            <div className="bg-white p-5 md:p-6 rounded-lg border-2 border-blue-300 shadow-md">
              <h3 className="text-lg md:text-xl font-bold text-blue-900 mb-4">🔴 Step 1: One Problem Causes Both</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <span className="text-2xl">⚡</span>
                  <div>
                    <p className="font-bold text-gray-900 mb-1">Insulin Resistance is the Link</p>
                    <p className="text-sm text-gray-700 leading-relaxed">When your body fights itself (insulin resistance), it causes BOTH diabetes and high BP. They&apos;re not two separate problems — they&apos;re one problem. Based on research from 500,000+ patients.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-orange-50 p-3 rounded-lg border border-orange-200">
                  <span className="text-2xl">📊</span>
                  <div>
                    <p className="font-bold text-gray-900 mb-1">High Insulin Raises BP</p>
                    <p className="text-sm text-gray-700 leading-relaxed">When you have too much insulin, it makes your blood vessels tight. This raises your blood pressure. It also makes your kidneys keep salt, which raises BP more. We see this in 70% of diabetes patients.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-red-50 p-3 rounded-lg border-2 border-red-300">
                  <span className="text-2xl">🫘</span>
                  <div>
                    <p className="font-bold text-red-700 mb-1">Result: Diabetes + High BP Together</p>
                    <p className="text-sm text-gray-700 leading-relaxed">When insulin resistance happens, you get both diabetes and high BP. You take pills for both. But if we fix insulin resistance, both get better. That&apos;s our approach — fix one problem, fix both.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: How We Fix Both */}
            <div className="bg-white p-5 md:p-6 rounded-lg border-2 border-green-300 shadow-md">
              <h3 className="text-lg md:text-xl font-bold text-green-900 mb-4">✅ Step 2: One Protocol Fixes Both</h3>
              <div className="space-y-3">
                <div className="bg-green-50 p-4 rounded-lg border-2 border-green-300">
                  <p className="font-bold text-green-900 mb-2 text-base">🎯 One Protocol, Two Conditions</p>
                  <p className="text-sm text-gray-800 leading-relaxed mb-2">We don&apos;t treat diabetes and high BP separately. We fix insulin resistance, and both get better. Research shows: fixing insulin resistance reduces cardiovascular risk by 40-60%. Based on 500,000+ patients.</p>
                  <p className="text-xs text-gray-600 italic">85% success rate in controlling both conditions with one protocol.</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-300">
                  <p className="font-bold text-blue-900 mb-2 text-base">📊 What We Do to Fix Both</p>
                  <ul className="text-sm text-gray-800 space-y-1 list-disc list-inside leading-relaxed">
                    <li>We fix insulin resistance (target HOMA-IR &lt; 2.0)</li>
                    <li>We lower blood sugar (target HbA1c &lt; 7%)</li>
                    <li>We lower blood pressure (target &lt; 130/80)</li>
                    <li>We give you a food plan (works for both)</li>
                    <li>We reduce medications as you get better (with your doctor&apos;s help)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 90-Day Journey Visual */}
          <div className="mt-6 bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-lg border-2 border-teal-400 shadow-md">
            <h3 className="text-xl md:text-2xl font-bold text-center text-gray-900 mb-4">🎯 How We Fix Both Together: Your 90-Day Journey</h3>
            <p className="text-center text-gray-700 mb-5 text-base">
              Based on 500,000+ patient outcomes since 2000. 85% success rate in controlling both conditions with one protocol.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 md:gap-4 text-center">
              <div className="bg-white p-4 rounded-lg border-2 border-teal-300 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl md:text-4xl mb-2">1️⃣</div>
                <p className="font-bold text-sm md:text-base text-gray-900 mb-1">Test</p>
                <p className="text-xs text-gray-600 leading-relaxed">We check both (sugar, BP, HOMA-IR).</p>
              </div>
              <div className="bg-white p-4 rounded-lg border-2 border-teal-300 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl md:text-4xl mb-2">2️⃣</div>
                <p className="font-bold text-sm md:text-base text-gray-900 mb-1">Fix</p>
                <p className="text-xs text-gray-600 leading-relaxed">We fix insulin resistance (one problem).</p>
              </div>
              <div className="bg-white p-4 rounded-lg border-2 border-teal-300 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl md:text-4xl mb-2">3️⃣</div>
                <p className="font-bold text-sm md:text-base text-gray-900 mb-1">Both Better</p>
                <p className="text-xs text-gray-600 leading-relaxed">Both sugar and BP get better together.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border-2 border-teal-300 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl md:text-4xl mb-2">4️⃣</div>
                <p className="font-bold text-sm md:text-base text-gray-900 mb-1">Less Pills</p>
                <p className="text-xs text-gray-600 leading-relaxed">Reduce medications (with your doctor).</p>
              </div>
              <div className="bg-white p-4 rounded-lg border-2 border-teal-300 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl md:text-4xl mb-2">5️⃣</div>
                <p className="font-bold text-sm md:text-base text-gray-900 mb-1">Healthy</p>
                <p className="text-xs text-gray-600 leading-relaxed">Both controlled in 90 days. Life better.</p>
              </div>
            </div>
          </div>
        </div>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">Why Diabetes and High BP Go Together (Simple Explanation)</h2>
        <p className="text-gray-700 mb-4">
          Insulin resistance is the common link:
        </p>
        <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-2">
          <li><strong>Excess Insulin:</strong> High insulin constricts blood vessels and raises blood pressure</li>
          <li><strong>Kidney Damage:</strong> High blood sugar damages kidneys, which regulate blood pressure</li>
          <li><strong>Sodium Retention:</strong> Insulin resistance causes kidneys to retain sodium, raising BP</li>
          <li><strong>Inflammation:</strong> Chronic inflammation from metabolic dysfunction damages vessels</li>
          <li><strong>Obesity:</strong> Central obesity is linked to both diabetes and hypertension</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">One Protocol, Two Conditions</h2>
        <p className="text-gray-700 mb-4">
          Our metabolic reversal protocol addresses both simultaneously:
        </p>
        <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-2">
          <li><strong>HOMA-IR Optimization:</strong> Reduce insulin resistance to lower both blood sugar and blood pressure</li>
          <li><strong>HbA1c Target:</strong> &lt; 7% reduces diabetic complications and kidney damage</li>
          <li><strong>Blood Pressure Target:</strong> &lt; 130/80 through metabolic optimization, reducing medication needs</li>
          <li><strong>Low-Sodium, High-Potassium Nutrition:</strong> Meal plans targeting insulin sensitivity and BP control</li>
          <li><strong>Weight Loss:</strong> 5-10% weight loss can normalize both blood sugar and BP</li>
          <li><strong>Medication Coordination:</strong> Work with your doctors to safely reduce medications as metabolic health improves</li>
        </ul>

        <div className="bg-blue-50 p-6 rounded-lg mb-8 border border-blue-300">
          <h3 className="font-bold text-blue-900 mb-2 text-xl">Benefits of Combined Management</h3>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Reduce cardiovascular risk by 40-60%</li>
            <li>Prevent kidney disease (diabetic nephropathy)</li>
            <li>Lower medication burden as metabolic health improves</li>
            <li>Reduce risk of stroke and heart attack</li>
            <li>Improve quality of life with one cohesive protocol</li>
          </ul>
        </div>

        <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-lg mb-8 border border-teal-200">
          <h3 className="font-bold text-teal-900 mb-2 text-xl">Success Story: BP and Diabetes Controlled Together</h3>
          <p className="text-gray-700 mb-3">
            "I had diabetes (HbA1c 8.5%) and high BP (150/95) for 8 years, taking 3 medications. After Dr. Muddu's metabolic reversal program, my HbA1c dropped to 6.2%, my BP normalized to 125/78, and I've reduced my medications by 50%. My energy levels are back, and my doctors are amazed." — Patient, Gachibowli
          </p>
        </div>

        <div className="bg-yellow-50 p-6 rounded-lg mb-8 border border-yellow-300">
          <h3 className="font-bold text-yellow-900 mb-2 text-xl">⚠️ Important Medication Note</h3>
          <p className="text-gray-700">
            <strong>Never stop medications without doctor supervision.</strong> Our protocol works alongside your medications. As your metabolic health improves, your doctors may gradually reduce your medication doses. Always coordinate with your prescribing physicians.
          </p>
        </div>

        <div className="bg-green-50 p-6 rounded-lg mb-8 border border-green-300 text-center">
          <a
            href={`https://wa.me/919963721999?text=${encodeURIComponent("High BP Diabetes Assessment")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 font-bold transition-colors text-lg mb-4"
          >
            💬 WhatsApp &apos;High BP Diabetes Assessment&apos; for Free 15-min Consult
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

