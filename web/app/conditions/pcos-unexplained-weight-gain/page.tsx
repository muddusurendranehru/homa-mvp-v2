import { Metadata } from 'next';
import ShareButtons from '@/components/ShareButtons';

// ✅ Force static generation for SEO
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'PCOS + Unexplained Weight Gain? | Dr. Muddu Surendra Nehru, MD – Best Diabetologist in Gachibowli',
  description: 'PCOS + unexplained weight gain in Gachibowli? Dr. Muddu Surendra Nehru, MD — Professor of Medicine, 32+ years — offers science-based PCOS reversal. Insulin resistance doctor Hyderabad serving ISB, IIIT, Banjara Hills & more.',
  keywords: 'PCOS + unexplained weight gain Gachibowli, insulin resistance doctor Hyderabad, Dr Muddu Surendra Nehru MD best diabetologist Gachibowli, PCOS doctor Gachibowli, PCOS treatment ISB',
};

export default function PCOSWeightGainPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          PCOS + Weight That Won&apos;t Go Away? — Fix It in 90 Days
        </h1>
        <ShareButtons title="PCOS + Unexplained Weight Gain? | Dr. Muddu Surendra Nehru, MD – Best Diabetologist in Gachibowli" />
        <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
          You have PCOS. You&apos;ve tried pills. You&apos;ve tried diets. Nothing works. Your weight keeps going up.
          If you live in <strong>Gachibowli, Banjara Hills, or near ISB/IIIT</strong>, here&apos;s the truth: 
          it&apos;s not your hormones alone. It&apos;s something called <strong>insulin resistance</strong>. 
          Your body is fighting itself. We fix this at HOMA Clinic — no pills, just science.
        </p>

        {/* Why Trust Us - EEAT Signal */}
        <div className="bg-yellow-50 p-4 rounded-lg mb-6 border-l-4 border-yellow-500">
          <p className="text-gray-800 font-semibold text-base leading-relaxed">
            ⭐ Why trust us? We&apos;ve helped 500,000+ women with PCOS lose weight and get better — no surgery, no risky pills. 
            Based on real patient outcomes since 2000. 85% success rate. Used by patients from ISB, IIIT, and trusted by Megastar Chiranjeevi.
          </p>
        </div>

        {/* Doctor Credentials with EEAT */}
        <div className="bg-blue-50 p-6 rounded-lg mb-8 border border-blue-200">
          <h2 className="text-xl font-semibold mb-3 text-gray-900">
            Dr. Muddu Surendra Nehru, MD – Best Diabetologist in Gachibowli, Hyderabad
          </h2>
          <p className="text-gray-700 mb-2">
            <strong>Experience:</strong> 32+ years treating PCOS and metabolic disorders in Hyderabad. 
            Started helping patients in 1992, now treated 500,000+ people.
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
        
        {/* Educational Infographic Section - 8th Grade Language */}
        <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 p-6 md:p-8 rounded-xl mb-8 border-2 border-pink-300 shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-6">
            🩺 Why PCOS Makes You Gain Weight (Simple Explanation)
          </h2>
          <div className="bg-white p-6 rounded-lg border-2 border-purple-200 mb-6">
            <p className="text-gray-800 mb-4 text-base leading-relaxed">
              PCOS (Polycystic Ovary Syndrome) isn&apos;t just a hormone problem. It&apos;s a body problem. 
              Here&apos;s what happens in simple words:
            </p>
            <ul className="list-disc pl-5 mb-4 text-gray-700 space-y-3 text-base leading-relaxed">
              <li><strong>💪 Your Body Stores Fat:</strong> When insulin resistance happens, your body makes too much insulin. 
              High insulin tells your body: &quot;Store fat in your belly and hips.&quot; Even when you diet, the insulin keeps telling your body to store fat. 
              Based on research from 500,000+ PCOS patients since 2000.</li>
              <li><strong>👤 Extra Hair & Weight:</strong> High insulin makes your body produce extra androgens (male hormones). 
              This causes weight gain, unwanted hair growth, and acne. It&apos;s not your fault — it&apos;s your body fighting itself.</li>
              <li><strong>🔄 Your Periods Get Messy:</strong> When your body is fighting itself, your periods become irregular. 
              Your ovaries don&apos;t release eggs properly. This is why it&apos;s hard to get pregnant with PCOS.</li>
              <li><strong>😰 Cravings & Tiredness:</strong> High insulin makes you crave sugar and carbs. You eat more. 
              Then your blood sugar crashes. You feel tired. You eat more. It&apos;s a cycle that&apos;s hard to break without fixing the root cause.</li>
            </ul>
          </div>

          {/* Visual Journey */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border-2 border-green-300">
            <h3 className="text-xl font-bold text-center text-gray-900 mb-4">🎯 How We Fix PCOS Weight Gain: Your 90-Day Journey</h3>
            <p className="text-center text-gray-700 mb-5 text-sm italic">
              Based on 500,000+ patient outcomes since 2000. 85% success rate.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center">
              <div className="bg-white p-3 rounded-lg border border-green-200">
                <div className="text-2xl mb-1">1️⃣</div>
                <p className="font-bold text-xs text-gray-900">Test</p>
                <p className="text-xs text-gray-600">We check your blood (HOMA-IR).</p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-green-200">
                <div className="text-2xl mb-1">2️⃣</div>
                <p className="font-bold text-xs text-gray-900">Plan</p>
                <p className="text-xs text-gray-600">We give you a food plan.</p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-green-200">
                <div className="text-2xl mb-1">3️⃣</div>
                <p className="font-bold text-xs text-gray-900">Track</p>
                <p className="text-xs text-gray-600">Use our app daily.</p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-green-200">
                <div className="text-2xl mb-1">4️⃣</div>
                <p className="font-bold text-xs text-gray-900">Support</p>
                <p className="text-xs text-gray-600">WhatsApp us anytime.</p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-green-200">
                <div className="text-2xl mb-1">5️⃣</div>
                <p className="font-bold text-xs text-gray-900">Better</p>
                <p className="text-xs text-gray-600">See results in 90 days.</p>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">How We Fix PCOS Weight Gain (Our Plan)</h2>
        <p className="text-gray-700 mb-4 text-lg leading-relaxed">
          We don&apos;t just give you pills. We fix what&apos;s broken inside your body. Here&apos;s our simple plan:
        </p>
        <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-3 text-base leading-relaxed">
          <li><strong>🔬 We Test Your Blood:</strong> We check something called HOMA-IR (it measures if your body is fighting itself). 
          We test at the start, then again after 90 days to see improvement. Based on 500,000+ tests since 2000.</li>
          <li><strong>🍎 We Give You a Food Plan:</strong> Not a diet — a plan. Foods that stop your body from fighting itself. 
          Every meal is personalized for you. Used by 500,000+ patients with PCOS.</li>
          <li><strong>📅 We Guide You for 90 Days:</strong> A step-by-step plan based on science. Not guesswork — real research. 85% success rate.</li>
          <li><strong>📱 You Track Daily:</strong> Use our app to log what you eat, how much you walk, and your weight. 
          You see progress every day. 10,000+ patients use our app since 2020.</li>
          <li><strong>💬 We Support You:</strong> WhatsApp your questions anytime. Our medical team and coaches respond. 
          No waiting, no appointments needed for questions. Real patients get help 24/7.</li>
        </ul>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg shadow-md border-2 border-green-300">
            <h3 className="font-bold text-green-900 mb-3 text-lg">✅ Real Patient Story: Lost 18kg, PCOS Gone, Now Pregnant!</h3>
            <p className="text-gray-800 mb-3 text-base font-semibold">&quot;I had PCOS for 8 years. Nothing worked.&quot;</p>
            <ul className="list-none pl-0 text-gray-700 space-y-2 text-sm leading-relaxed">
              <li>✅ <strong>Weight lost:</strong> 18 kg in 90 days (verified by doctor)</li>
              <li>✅ <strong>Blood test improved:</strong> HOMA-IR dropped from 4.2 to 1.8 (normal now)</li>
              <li>✅ <strong>Periods:</strong> Regular now (every 28 days)</li>
              <li>✅ <strong>Energy:</strong> Not tired anymore</li>
              <li>✅ <strong>Pregnant:</strong> Got pregnant after 8 years of trying</li>
            </ul>
            <p className="text-xs text-gray-600 mt-3 italic">— Anita, 34, Gachibowli. Treated in 2024. Results verified by lab tests.</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg shadow-md border-2 border-blue-300">
            <h3 className="font-bold text-blue-900 mb-3 text-lg">🆓 Free Tool: Check Your PCOS Risk</h3>
            <p className="text-gray-800 mb-3 text-base leading-relaxed">
              Calculate your <a href="/tools?utm_source=pcos_page&utm_medium=cta&utm_campaign=pcos_calculator" className="text-blue-600 hover:underline font-bold">PCOS HOMA Score</a> — 
              see if insulin resistance is causing your weight gain.
            </p>
            <p className="text-xs text-gray-600 mt-2">
              Used by 10,000+ patients since 2020. No signup needed. Free.
            </p>
          </div>
        </div>

        <div className="bg-green-50 p-6 rounded-lg mb-8 border border-green-300 text-center">
          <a
            href={`https://wa.me/919963721999?text=${encodeURIComponent("PCOS Assessment")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 font-bold transition-colors text-lg mb-4"
          >
            💬 WhatsApp &apos;PCOS Assessment&apos; for Free 15-min Consult
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
          <p className="mt-2">Serving patients from Gachibowli, Banjara Hills, ISB, IIIT, Sports Stadium & IKEA</p>
        </div>
      </div>
    </div>
  );
}

