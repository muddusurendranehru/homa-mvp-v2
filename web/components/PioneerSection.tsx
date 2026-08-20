'use client';

export default function PioneerSection() {
  return (
    <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-teal-900 text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🚀</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pioneer in End-to-End Treatment
          </h2>
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
            Sole developer of 25+ health apps | Complete journey: Test → Monitor → Remission
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-3xl mb-3">🧪</div>
            <h3 className="text-xl font-bold mb-2">Test</h3>
            <p className="text-indigo-100">
              FASTING INSULIN + HOMA-IR testing to identify root cause. Not just glucose—we find the real problem.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="text-xl font-bold mb-2">Monitor</h3>
            <p className="text-indigo-100">
              Close monitoring with 25+ apps built by Dr. Muddu. Real-time tracking, personalized protocols, continuous care.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="text-xl font-bold mb-2">Remission</h3>
            <p className="text-indigo-100">
              85% success rate. Not management—actual remission. Evidence-based protocols that reverse insulin resistance.
            </p>
          </div>
        </div>

        <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
          <h3 className="text-2xl font-bold mb-4 text-center">Why We're Different</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💻</span>
              <div>
                <h4 className="font-bold text-lg mb-1">25+ Apps Built</h4>
                <p className="text-indigo-100 text-sm">
                  Dr. Muddu is the sole developer of India's largest health app ecosystem. No other doctor has built this many tools.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🔬</span>
              <div>
                <h4 className="font-bold text-lg mb-1">Insulin Testing Pioneer</h4>
                <p className="text-indigo-100 text-sm">
                  #1 in India with 5,000+ HOMA tests performed. We test what others ignore—fasting insulin.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">📈</span>
              <div>
                <h4 className="font-bold text-lg mb-1">35 Lakh Patients</h4>
                <p className="text-indigo-100 text-sm">
                  32 years of ethics-guided care. Experience that translates to better outcomes.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <h4 className="font-bold text-lg mb-1">85% Remission Rate</h4>
                <p className="text-indigo-100 text-sm">
                  Not just management—actual remission. Patients reverse insulin resistance and get off medications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

