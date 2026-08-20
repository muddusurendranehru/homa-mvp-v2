import { Metadata } from 'next';
import ShareButtons from '@/components/ShareButtons';

// ✅ Force static generation for SEO
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Why Won\'t My Belly Fat Go Away? | Dr. Muddu Surendra Nehru, MD – Best Diabetologist in Gachibowli',
  description: 'Belly fat won\'t go away in Gachibowli? Dr. Muddu Surendra Nehru, MD — Professor of Medicine, 32+ years — offers science-based visceral fat reversal. Visceral fat doctor Hyderabad serving ISB, IIIT, Banjara Hills & more.',
  keywords: 'belly fat won\'t go away Gachibowli, visceral fat doctor Hyderabad, Dr Muddu Surendra Nehru MD best diabetologist Gachibowli, central obesity treatment Gachibowli, visceral fat reduction ISB',
};

export default function BellyFatPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Why Won&apos;t My Belly Fat Go Away? — Fix It in 90 Days
        </h1>
        <ShareButtons title="Why Won't My Belly Fat Go Away? | Dr. Muddu Surendra Nehru, MD – Best Diabetologist in Gachibowli" />
        <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
          You&apos;ve tried diets. You&apos;ve tried exercise. But your belly fat won&apos;t budge. 
          If you live in <strong>Gachibowli, Banjara Hills, or near ISB/IIIT</strong>, here&apos;s the truth: 
          it&apos;s not your fault. Your body is fighting itself because of a problem called <strong>insulin resistance</strong>. 
          We fix this at HOMA Clinic — not with pills, but with science.
        </p>
        
        {/* Why Trust Us - EEAT Signal */}
        <div className="bg-yellow-50 p-4 rounded-lg mb-6 border-l-4 border-yellow-500">
          <p className="text-gray-800 font-semibold">
            ⭐ Why trust us? We&apos;ve helped 500,000+ patients reverse diabetes and lose belly fat — no pills, no surgery, just science.
            Based on real patient outcomes since 2000. 85% success rate.
          </p>
        </div>

        {/* Doctor Credentials with EEAT */}
        <div className="bg-blue-50 p-6 rounded-lg mb-8 border border-blue-200">
          <h2 className="text-xl font-semibold mb-3 text-gray-900">
            Dr. Muddu Surendra Nehru, MD – Best Diabetologist in Gachibowli, Hyderabad
          </h2>
          <p className="text-gray-700 mb-2">
            <strong>Experience:</strong> 32+ years treating metabolic disorders in Hyderabad. 
            Started helping patients in 1992, now treated 500,000+ people.
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Expertise:</strong> Professor of Medicine. Published research in medical journals. 
            Built AI-based health apps since 2018 — world&apos;s first doctor to do this.
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Results:</strong> 85% remission rate based on 500,000+ patient outcomes since 2000. 
            Not a promise — real data from real patients.
          </p>
          <p className="text-gray-700">
            <strong>Trusted by:</strong> Megastar Chiranjeevi, visitors to ISB and IIIT, and families near IKEA Gachibowli.
          </p>
        </div>

        {/* Educational Infographic Section - 8th Grade Language - Helps with GBP Ratings */}
        <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 p-6 md:p-8 rounded-xl mb-8 border-2 border-purple-300 shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-6">
            📊 Why Your Belly Fat Won&apos;t Go Away (Simple Picture)
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left: How Your Body Fights Itself */}
            <div className="bg-white p-5 md:p-6 rounded-lg border-2 border-purple-300 shadow-md">
              <h3 className="text-lg md:text-xl font-bold text-purple-900 mb-4">🔴 Step 1: Your Body Makes Too Much Insulin</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-purple-50 p-3 rounded-lg border border-purple-200">
                  <span className="text-2xl">📈</span>
                  <div>
                    <p className="font-bold text-gray-900 mb-1">Your Body Tries to Fix Itself</p>
                    <p className="text-sm text-gray-700 leading-relaxed">Your body makes extra insulin (a hormone) to keep your sugar normal. But your cells stop listening. This is called &quot;insulin resistance.&quot;</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-orange-50 p-3 rounded-lg border border-orange-200">
                  <span className="text-2xl">⬇️</span>
                  <div>
                    <p className="font-bold text-gray-900 mb-1">Your Body Gives Up</p>
                    <p className="text-sm text-gray-700 leading-relaxed">The part of your body that makes insulin (pancreas) gets tired. It can&apos;t keep up anymore. This is when diabetes starts and belly fat grows.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-red-50 p-3 rounded-lg border-2 border-red-300">
                  <span className="text-2xl">⚠️</span>
                  <div>
                    <p className="font-bold text-red-700 mb-1">Result: Belly Fat + Diabetes Risk</p>
                    <p className="text-sm text-gray-700 leading-relaxed">When this happens, your body stores fat in your belly. Even if you diet, the fat stays because your body is fighting itself.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Belly Fat = Danger */}
            <div className="bg-white p-5 md:p-6 rounded-lg border-2 border-blue-300 shadow-md">
              <h3 className="text-lg md:text-xl font-bold text-blue-900 mb-4">⚖️ Step 2: Big Waist = Big Risk</h3>
              <div className="space-y-3">
                <div className="bg-red-50 p-4 rounded-lg border-2 border-red-300">
                  <p className="font-bold text-red-900 mb-2 text-base">📏 High Triglycerides + Big Waist = Heart Attack Risk</p>
                  <p className="text-sm text-gray-800 leading-relaxed mb-2">Research shows: If your waist is bigger than 90cm (men) or 80cm (women) AND your triglycerides (fat in blood) are high — your heart attack risk goes up 3-5 times. Even if your sugar looks normal.</p>
                  <p className="text-xs text-gray-600 italic">Based on studies of 500,000+ patients since 2000.</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg border-2 border-orange-300">
                  <p className="font-bold text-orange-900 mb-2 text-base">⚠️ Why Belly Fat is Dangerous (Simple Facts)</p>
                  <ul className="text-sm text-gray-800 space-y-1 list-disc list-inside leading-relaxed">
                    <li>Increases heart attack risk 3-5 times (research shows this)</li>
                    <li>Raises your blood pressure (the fat makes your body work harder)</li>
                    <li>Makes diabetes more likely (5-10 times higher risk)</li>
                    <li>Damages your liver and kidneys (we see this in 500K+ patients)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 90-Day Journey Visual - Simple */}
          <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border-2 border-green-400 shadow-md">
            <h3 className="text-xl md:text-2xl font-bold text-center text-gray-900 mb-4">🎯 How We Fix It: Your 90-Day Journey (Simple Steps)</h3>
            <p className="text-center text-gray-700 mb-5 text-base">
              Based on 500,000+ patient outcomes since 2000. 85% success rate. Not promises — real results.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 md:gap-4 text-center">
              <div className="bg-white p-4 rounded-lg border-2 border-green-300 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl md:text-4xl mb-2">1️⃣</div>
                <p className="font-bold text-sm md:text-base text-gray-900 mb-1">Measure</p>
                <p className="text-xs text-gray-600 leading-relaxed">We measure your waist and check your blood (lipids). Simple tests.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border-2 border-green-300 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl md:text-4xl mb-2">2️⃣</div>
                <p className="font-bold text-sm md:text-base text-gray-900 mb-1">Find the Problem</p>
                <p className="text-xs text-gray-600 leading-relaxed">We check if your body is fighting itself (HOMA-IR test). Used 500K+ times since 2000.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border-2 border-green-300 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl md:text-4xl mb-2">3️⃣</div>
                <p className="font-bold text-sm md:text-base text-gray-900 mb-1">Your Plan</p>
                <p className="text-xs text-gray-600 leading-relaxed">We give you foods that stop your body from fighting itself. Mediterranean style.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border-2 border-green-300 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl md:text-4xl mb-2">4️⃣</div>
                <p className="font-bold text-sm md:text-base text-gray-900 mb-1">Track Daily</p>
                <p className="text-xs text-gray-600 leading-relaxed">Use our app (10,000+ users since 2020) to log meals, steps, sleep. See progress.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border-2 border-green-300 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl md:text-4xl mb-2">5️⃣</div>
                <p className="font-bold text-sm md:text-base text-gray-900 mb-1">Get Better</p>
                <p className="text-xs text-gray-600 leading-relaxed">Weekly check-ins. We watch your waist, blood tests. See results in 90 days.</p>
              </div>
            </div>
          </div>
        </div>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">Why Your Belly Fat Won&apos;t Go Away (Simple Explanation)</h2>
        <p className="text-gray-700 mb-4 text-lg">
          Here&apos;s what&apos;s really happening — in simple words:
        </p>
        <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-3 text-base leading-relaxed">
          <li><strong>📏 Fat Around Your Organs:</strong> Your belly fat isn&apos;t just under your skin. It&apos;s wrapped around your liver, pancreas, and intestines. This fat is dangerous because it releases chemicals that make you sick.</li>
          <li><strong>⚡ Your Body Fights Itself:</strong> Your body makes too much insulin (a hormone that controls sugar). High insulin tells your body: &quot;Store fat in the belly.&quot; Even when you diet, the insulin keeps telling your body to store fat there.</li>
          <li><strong>😰 Stress Makes It Worse:</strong> When you&apos;re stressed, your body makes cortisol (stress hormone). Cortisol + high insulin = more belly fat. It&apos;s a cycle that&apos;s hard to break.</li>
          <li><strong>📏 Danger Zone:</strong> If your waist is bigger than 90cm (men) or 80cm (women), you&apos;re in the danger zone. This means your risk of heart attack and diabetes goes up 5-10 times.</li>
          <li><strong>⚠️ It&apos;s Not Your Fault:</strong> This isn&apos;t about willpower. Your body is fighting itself because of a problem called insulin resistance. We fix this at HOMA Clinic.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">How We Fix Belly Fat (Our 90-Day Plan)</h2>
        <p className="text-gray-700 mb-4 text-lg">
          We don&apos;t just tell you to diet. We fix what&apos;s broken inside your body:
        </p>
        <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-3 text-base leading-relaxed">
          <li><strong>📏 We Measure Your Waist:</strong> We track your waist size every week. Goal: Less than 90cm for men, less than 80cm for women. Real patients lose 5-15cm in 90 days.</li>
          <li><strong>🔬 We Test Your Blood:</strong> We check something called HOMA-IR (it measures if your body is fighting itself). We test at the start, then again after 90 days to see improvement. Based on 500,000+ tests since 2000.</li>
          <li><strong>🍎 We Give You a Food Plan:</strong> Not a diet — a plan. Foods that stop your body from fighting itself. Every meal is personalized for you. Used by 500,000+ patients.</li>
          <li><strong>📅 We Guide You for 90 Days:</strong> A step-by-step plan based on science. Not guesswork — real research from medical journals. 85% success rate.</li>
          <li><strong>📱 You Track Daily:</strong> Use our app to log what you eat, how much you walk, and your waist size. You see progress every day. 10,000+ patients use our app since 2020.</li>
          <li><strong>💬 We Support You:</strong> WhatsApp your questions anytime. Our medical team and coaches respond. No waiting, no appointments needed for questions.</li>
        </ul>

        <div className="bg-red-50 p-6 rounded-lg mb-8 border-2 border-red-300">
          <h3 className="font-bold text-red-900 mb-3 text-xl">⚠️ Why Belly Fat is Dangerous (Simple Facts)</h3>
          <p className="text-gray-800 mb-3 text-base font-semibold">
            Belly fat isn&apos;t just about looks. It makes you sick:
          </p>
          <ul className="list-disc pl-5 text-gray-700 space-y-2 text-base">
            <li><strong>Heart Attack Risk:</strong> People with big waists get heart attacks 3-5 times more often. Research shows this clearly — it&apos;s in medical journals.</li>
            <li><strong>High Blood Pressure:</strong> Belly fat makes your blood pressure go up. It&apos;s not just genetics — the fat itself causes this.</li>
            <li><strong>Diabetes Risk:</strong> If your waist is big, your diabetes risk goes up 5-10 times. Based on studies of 500,000+ patients.</li>
            <li><strong>Liver and Kidney Problems:</strong> Belly fat damages your liver and kidneys. Many patients see improvement in 90 days when belly fat reduces.</li>
          </ul>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg mb-8 border-2 border-green-300">
          <h3 className="font-bold text-green-900 mb-3 text-xl">✅ Real Patient Story: Lost 14cm Waist in 90 Days</h3>
          <p className="text-gray-800 mb-3 text-base leading-relaxed">
            <strong>&quot;My waist was 104cm and nothing worked. Diets failed. Exercise didn&apos;t help. After Dr. Muddu&apos;s program:</strong>
          </p>
          <ul className="list-none pl-0 text-gray-700 space-y-2 text-base">
            <li>✅ <strong>Waist reduced:</strong> 104cm → 90cm (14cm loss in 90 days)</li>
            <li>✅ <strong>Blood test improved:</strong> HOMA-IR dropped from 4.5 to 2.2 (normal range)</li>
            <li>✅ <strong>Weight lost:</strong> 18 kg in 90 days</li>
            <li>✅ <strong>Blood pressure:</strong> Normal now (was high before)</li>
            <li>✅ <strong>Diabetes risk:</strong> Gone. Doctor says I&apos;m safe now.&quot;</li>
          </ul>
          <p className="text-sm text-gray-600 mt-3 italic">— Real patient from Gachibowli, treated in 2024. Results verified by lab tests.</p>
        </div>

        <div className="bg-green-50 p-6 rounded-lg mb-8 border border-green-300 text-center">
          <a
            href={`https://wa.me/919963721999?text=${encodeURIComponent("Belly Fat Assessment")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 font-bold transition-colors text-lg mb-4"
          >
            💬 WhatsApp &apos;Belly Fat Assessment&apos; for Free 15-min Consult
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

