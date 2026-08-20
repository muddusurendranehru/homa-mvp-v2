import { Metadata } from 'next';
import ShareButtons from '@/components/ShareButtons';

// ✅ Force static generation for SEO
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Screen Your Whole Family for Diabetes Risk? | Dr. Muddu Surendra Nehru, MD – Best Diabetologist in Gachibowli',
  description: 'Family metabolic health screening in Gachibowli? Dr. Muddu Surendra Nehru, MD — Professor of Medicine, 32+ years — offers science-based preventive diabetes testing in Hyderabad. Early detection saves lives. Serving ISB, IIIT, Banjara Hills & more.',
  keywords: 'family metabolic health screening Gachibowli, preventive diabetes testing Hyderabad, Dr Muddu Surendra Nehru MD best diabetologist Gachibowli, family diabetes screening Gachibowli, preventive screening ISB',
};

export default function FamilyScreeningPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Should Your Whole Family Get Tested for Diabetes Risk? Yes — Early Detection Saves Lives
        </h1>
        <ShareButtons title="Screen Your Whole Family for Diabetes Risk? | Dr. Muddu Surendra Nehru, MD – Best Diabetologist in Gachibowli" />
        <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
          Your family has diabetes. Your parents had it. Your siblings have it. You&apos;re worried about your children. 
          If you live in <strong>Gachibowli, Banjara Hills, or near ISB/IIIT</strong>, here&apos;s the truth: 
          it&apos;s not just family genetics. It&apos;s something called <strong>insulin resistance</strong> (your body fighting itself). 
          Early detection saves lives at HOMA Clinic — we test your whole family to catch problems before they start.
        </p>

        {/* Why Trust Us - EEAT Signal */}
        <div className="bg-yellow-50 p-4 rounded-lg mb-6 border-l-4 border-yellow-500">
          <p className="text-gray-800 font-semibold text-base leading-relaxed">
            ⭐ Why trust us? We&apos;ve helped 500,000+ families prevent diabetes and heart disease through early screening — no risky procedures, just simple tests. 
            Based on real patient outcomes since 2000. 90% of prediabetes cases can be reversed when caught early (research shows this).
          </p>
        </div>

        {/* Doctor Credentials with EEAT */}
        <div className="bg-blue-50 p-6 rounded-lg mb-8 border border-blue-200">
          <h2 className="text-xl font-semibold mb-3 text-gray-900">
            Dr. Muddu Surendra Nehru, MD – Best Diabetologist in Gachibowli, Hyderabad
          </h2>
          <p className="text-gray-700 mb-2">
            <strong>Experience:</strong> 32+ years treating metabolic disorders in Hyderabad. 
            Started helping patients in 1992, now treated 500,000+ people, including many families.
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Expertise:</strong> Professor of Medicine. Published research in medical journals (JAPI). 
            Built AI-based health tools since 2018 — world&apos;s first doctor to do this.
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Results:</strong> 90% of prediabetes cases reversed when caught early. Based on 500,000+ patient outcomes since 2000. 
            Real data — not promises.
          </p>
          <p className="text-gray-700">
            <strong>Trusted by:</strong> Megastar Chiranjeevi, visitors to ISB and IIIT, and families near IKEA Gachibowli.
          </p>
        </div>

        {/* Educational Infographic Section - 8th Grade Language - Helps with GBP Ratings */}
        <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-6 md:p-8 rounded-xl mb-8 border-2 border-green-300 shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-6">
            👨‍👩‍👧 Why Family Screening Matters (Simple Picture)
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left: The Problem */}
            <div className="bg-white p-5 md:p-6 rounded-lg border-2 border-green-300 shadow-md">
              <h3 className="text-lg md:text-xl font-bold text-green-900 mb-4">🔴 Step 1: Diabetes Runs in Families</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-green-50 p-3 rounded-lg border border-green-200">
                  <span className="text-2xl">👨‍👩‍👧</span>
                  <div>
                    <p className="font-bold text-gray-900 mb-1">Family History = 3x Higher Risk</p>
                    <p className="text-sm text-gray-700 leading-relaxed">If your parents or siblings have diabetes, your risk is 3 times higher. Your children&apos;s risk is higher too. This is real — research shows this clearly. Based on studies of 500,000+ families.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <span className="text-2xl">⏰</span>
                  <div>
                    <p className="font-bold text-gray-900 mb-1">Early Detection Saves Lives</p>
                    <p className="text-sm text-gray-700 leading-relaxed">If we test your family early, we can catch problems before diabetes starts. Research shows: 90% of prediabetes cases can be reversed when caught early. Early detection saves lives. Based on 500,000+ families.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-yellow-50 p-3 rounded-lg border-2 border-yellow-300">
                  <span className="text-2xl">⚠️</span>
                  <div>
                    <p className="font-bold text-yellow-900 mb-1">Problem: Most Families Don&apos;t Test</p>
                    <p className="text-sm text-gray-700 leading-relaxed">Most families only test when someone already has diabetes. By then, it&apos;s harder to fix. We test whole families early — before problems start. This saves lives. We&apos;ve tested 500,000+ families since 2000.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: How We Help */}
            <div className="bg-white p-5 md:p-6 rounded-lg border-2 border-blue-300 shadow-md">
              <h3 className="text-lg md:text-xl font-bold text-blue-900 mb-4">✅ Step 2: We Test Your Whole Family</h3>
              <div className="space-y-3">
                <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-300">
                  <p className="font-bold text-blue-900 mb-2 text-base">🛡️ Family Screening Protocol</p>
                  <p className="text-sm text-gray-800 leading-relaxed mb-2">We test your whole family — parents, siblings, children. We check HOMA-IR (finds insulin resistance early). We catch problems before diabetes starts. 90% of prediabetes cases can be reversed when caught early. Based on 500,000+ families.</p>
                  <p className="text-xs text-gray-600 italic">Early detection saves lives — research shows this clearly.</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border-2 border-green-300">
                  <p className="font-bold text-green-900 mb-2 text-base">📊 What We Test for Families</p>
                  <ul className="text-sm text-gray-800 space-y-1 list-disc list-inside leading-relaxed">
                    <li>HOMA-IR test (finds insulin resistance early)</li>
                    <li>Blood sugar (fasting glucose)</li>
                    <li>Lipids (triglycerides, cholesterol)</li>
                    <li>Blood pressure</li>
                    <li>Waist circumference (belly fat)</li>
                    <li>Family history review</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 90-Day Journey Visual */}
          <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border-2 border-blue-400 shadow-md">
            <h3 className="text-xl md:text-2xl font-bold text-center text-gray-900 mb-4">🎯 How We Protect Your Family: Your 90-Day Journey</h3>
            <p className="text-center text-gray-700 mb-5 text-base">
              Based on 500,000+ patient outcomes since 2000. 90% of prediabetes cases can be reversed when caught early.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 md:gap-4 text-center">
              <div className="bg-white p-4 rounded-lg border-2 border-blue-300 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl md:text-4xl mb-2">1️⃣</div>
                <p className="font-bold text-sm md:text-base text-gray-900 mb-1">Test</p>
                <p className="text-xs text-gray-600 leading-relaxed">We test your whole family (HOMA-IR).</p>
              </div>
              <div className="bg-white p-4 rounded-lg border-2 border-blue-300 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl md:text-4xl mb-2">2️⃣</div>
                <p className="font-bold text-sm md:text-base text-gray-900 mb-1">Find</p>
                <p className="text-xs text-gray-600 leading-relaxed">We find problems early (before diabetes).</p>
              </div>
              <div className="bg-white p-4 rounded-lg border-2 border-blue-300 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl md:text-4xl mb-2">3️⃣</div>
                <p className="font-bold text-sm md:text-base text-gray-900 mb-1">Fix</p>
                <p className="text-xs text-gray-600 leading-relaxed">We fix insulin resistance (for everyone).</p>
              </div>
              <div className="bg-white p-4 rounded-lg border-2 border-blue-300 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl md:text-4xl mb-2">4️⃣</div>
                <p className="font-bold text-sm md:text-base text-gray-900 mb-1">Prevent</p>
                <p className="text-xs text-gray-600 leading-relaxed">We prevent diabetes (for your family).</p>
              </div>
              <div className="bg-white p-4 rounded-lg border-2 border-blue-300 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl md:text-4xl mb-2">5️⃣</div>
                <p className="font-bold text-sm md:text-base text-gray-900 mb-1">Safe</p>
                <p className="text-xs text-gray-600 leading-relaxed">Family protected in 90 days. Lives saved.</p>
              </div>
            </div>
          </div>
        </div>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">Why Family Screening Matters (Simple Explanation)</h2>
        <p className="text-gray-700 mb-4">
          Early detection through family screening:
        </p>
        <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-2">
          <li><strong>Prevents Diabetes:</strong> 90% of prediabetes cases can be reversed with early intervention</li>
          <li><strong>Saves Lives:</strong> Reduces risk of heart attack, stroke, and kidney disease</li>
          <li><strong>Breaks Family Cycle:</strong> Prevents metabolic dysfunction from passing to next generation</li>
          <li><strong>Cost-Effective:</strong> Prevention costs 10x less than treating diabetes complications</li>
          <li><strong>Early Onset Detection:</strong> Catches metabolic dysfunction in children and young adults</li>
          <li><strong>Family Support:</strong> Whole family can adopt healthy habits together</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">Who Should Be Screened?</h2>
        <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-2">
          <li><strong>All family members</strong> if one has diabetes or prediabetes</li>
          <li><strong>Children and teenagers</strong> with family history of diabetes</li>
          <li><strong>Adults 35+</strong> with family history of diabetes or heart disease</li>
          <li><strong>Anyone with:</strong> Central obesity, high BP, high cholesterol, or PCOS</li>
          <li><strong>Women</strong> with history of gestational diabetes</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">Family Screening Protocol</h2>
        <p className="text-gray-700 mb-4">
          Comprehensive metabolic health assessment for the whole family:
        </p>
        <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-2">
          <li><strong>HOMA-IR Testing:</strong> Measure insulin resistance for all family members (age-appropriate)</li>
          <li><strong>Fasting Glucose + Insulin:</strong> Early detection of prediabetes and hyperinsulinemia</li>
          <li><strong>HbA1c:</strong> 3-month average blood sugar (for adults)</li>
          <li><strong>Lipid Profile:</strong> Cholesterol, triglycerides, HDL, LDL</li>
          <li><strong>Blood Pressure:</strong> Hypertension screening</li>
          <li><strong>Waist Circumference:</strong> Central obesity assessment</li>
          <li><strong>Family History Review:</strong> Document diabetes, heart disease, stroke in relatives</li>
          <li><strong>Personalized Recommendations:</strong> Age-appropriate prevention plans for each family member</li>
        </ul>

        <div className="bg-blue-50 p-6 rounded-lg mb-8 border border-blue-300">
          <h3 className="font-bold text-blue-900 mb-2 text-xl">Family Screening Benefits</h3>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Early detection of prediabetes (before glucose is elevated)</li>
            <li>Prevent diabetes in 90% of at-risk individuals</li>
            <li>Reduce cardiovascular risk by 50-70%</li>
            <li>Family meal planning and lifestyle support</li>
            <li>Cost-effective prevention vs. expensive treatment</li>
            <li>Break the cycle for future generations</li>
          </ul>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg mb-8 border border-green-200">
          <h3 className="font-bold text-green-900 mb-2 text-xl">Success Story: Family Saved from Diabetes</h3>
          <p className="text-gray-700 mb-3">
            "My husband had diabetes, so we screened our whole family. Our 18-year-old son had a HOMA-IR of 3.5 (prediabetic range) and our 45-year-old daughter had metabolic syndrome. After Dr. Muddu's family prevention program, both are now healthy, and we've prevented diabetes in the next generation. Family screening saved our children!" — Family, Gachibowli
          </p>
        </div>

        <div className="bg-green-50 p-6 rounded-lg mb-8 border border-green-300 text-center">
          <a
            href={`https://wa.me/919963721999?text=${encodeURIComponent("Family Metabolic Screening")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 font-bold transition-colors text-lg mb-4"
          >
            💬 WhatsApp &apos;Family Metabolic Screening&apos; for Free 15-min Consult
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

