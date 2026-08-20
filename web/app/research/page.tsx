import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Metabolic Remission Research | Dr. Muddu Surendra Nehru, MD - Clinical Validation & Academic Tools',
  description: 'Clinical validation data (n=50) for 90-day metabolic remission protocol. Free research tools, API access, and academic collaboration opportunities.',
  keywords: 'metabolic remission research, HOMA-IR clinical validation, prediabetes reversal study, academic collaboration, research tools',
};

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Metabolic Remission Research
          </h1>
          <p className="text-xl text-blue-100">
            Dr. Muddu Surendra Nehru, MD • Professor of Medicine
          </p>
          <p className="text-lg text-blue-200 mt-2">
            32+ Years Experience • Senior Physician
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Clinical Validation Section */}
        <section className="mb-12">
          <div className="bg-white border-2 border-blue-200 rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="text-blue-600">📊</span>
              Clinical Validation (n=50)
            </h2>
            
            <div className="space-y-6">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <h3 className="font-semibold text-gray-900 mb-2">Study Population</h3>
                <p className="text-gray-700">
                  Adults with prediabetes + central obesity (Hyderabad, 2024–2025)
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                <h3 className="font-semibold text-gray-900 mb-2">Protocol</h3>
                <p className="text-gray-700">
                  90-day AI-guided remission (diet, activity, HOMA-IR monitoring)
                </p>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
                <h3 className="font-semibold text-gray-900 mb-4">Results</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>82%</strong> achieved HOMA-IR &lt; 2.0</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Avg. waist reduction: <strong>9.2 cm</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>76%</strong> reduced/eliminated medications</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 border border-gray-300 p-4 rounded italic text-gray-600">
                <p>
                  <strong>Note:</strong> Data anonymized. Full dataset available for academic collaboration.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tools for Researchers Section */}
        <section className="mb-12">
          <div className="bg-white border-2 border-indigo-200 rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="text-indigo-600">🔬</span>
              Tools for Researchers
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Free Public Calculators
                </h3>
                <p className="text-gray-700 mb-4">
                  HOMA-IR, TyG Index, WHtR, WHR, BMI, Waist Circumference — embeddable via iframe for research and educational purposes.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Link 
                    href="/tools/homa-ir-calculator"
                    className="bg-blue-50 hover:bg-blue-100 border border-blue-300 rounded-lg p-4 transition-colors"
                  >
                    <strong className="text-blue-700">HOMA-IR Calculator</strong>
                    <p className="text-sm text-gray-600 mt-1">Insulin resistance assessment</p>
                  </Link>
                  <Link 
                    href="/tools/tyg-index-calculator"
                    className="bg-purple-50 hover:bg-purple-100 border border-purple-300 rounded-lg p-4 transition-colors"
                  >
                    <strong className="text-purple-700">TyG Index Calculator</strong>
                    <p className="text-sm text-gray-600 mt-1">Cardiovascular risk predictor</p>
                  </Link>
                  <Link 
                    href="/tools/whtr-calculator"
                    className="bg-orange-50 hover:bg-orange-100 border border-orange-300 rounded-lg p-4 transition-colors"
                  >
                    <strong className="text-orange-700">WHtR Calculator</strong>
                    <p className="text-sm text-gray-600 mt-1">Waist-to-height ratio</p>
                  </Link>
                  <Link 
                    href="/tools"
                    className="bg-green-50 hover:bg-green-100 border border-green-300 rounded-lg p-4 transition-colors"
                  >
                    <strong className="text-green-700">View All Tools →</strong>
                    <p className="text-sm text-gray-600 mt-1">Complete calculator suite</p>
                  </Link>
                </div>
              </div>

              <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded">
                <h3 className="font-semibold text-gray-900 mb-2">API Access</h3>
                <p className="text-gray-700 mb-3">
                  Available for institutional research. Contact below for API documentation and access credentials.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Use cases:</strong> Large-scale population studies, automated risk assessment, integration with EMR systems.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* For Lectures & Teaching Section */}
        <section className="mb-12">
          <div className="bg-white border-2 border-teal-200 rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="text-teal-600">📚</span>
              For Lectures & Teaching
            </h2>
            
            <div className="space-y-4">
              <div className="bg-teal-50 border-l-4 border-teal-500 p-4 rounded">
                <h3 className="font-semibold text-gray-900 mb-2">Public Tools for Demonstrations</h3>
                <p className="text-gray-700 mb-3">
                  Use our <strong>public calculators</strong> to demonstrate metabolic risk assessment in your lectures, workshops, and PG teaching sessions.
                </p>
                <p className="text-gray-600 text-sm">
                  All tools are free, mobile-responsive, and can be embedded via iframe or linked directly.
                </p>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
                <h3 className="font-semibold text-gray-900 mb-2">Slide Deck Template</h3>
                <p className="text-gray-700 mb-3">
                  Download our <strong>slide deck template</strong> (English/Telugu) for teaching metabolic remission protocols.
                </p>
                <p className="text-gray-600 text-sm italic">
                  Available upon request. Includes clinical data, protocol flowcharts, and patient case studies.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Collaboration Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Academic Collaboration</h2>
            <p className="text-lg text-blue-100 mb-6">
              Interested in research collaboration, data sharing, or joint publications?
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-md mx-auto">
              <p className="text-xl font-semibold mb-2">Contact</p>
              <a 
                href="mailto:dr.muddu.nehr@gmail.com"
                className="text-2xl font-bold text-white hover:text-blue-200 transition-colors underline"
              >
                dr.muddu.nehr@gmail.com
              </a>
              <p className="text-blue-100 mt-4 text-sm">
                For research inquiries, API access, or academic partnerships
              </p>
            </div>
          </div>
        </section>

        {/* Additional Resources */}
        <section className="mb-12">
          <div className="bg-gray-50 border border-gray-300 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Additional Resources</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                <span>All calculators use validated formulas (HOMA-IR: Matthews et al., 1985; TyG: Simental-Mendía et al., 2008)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                <span>Risk thresholds based on WHO, IDF, and ADA guidelines</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                <span>Open-source calculator code available for review (contact for access)</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Back to Home */}
        <div className="text-center">
          <Link 
            href="/"
            className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-6 py-3 rounded-lg transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </main>

      {/* Footer Note */}
      <footer className="bg-gray-100 py-6 px-4 mt-12">
        <div className="max-w-4xl mx-auto text-center text-sm text-gray-600">
          <p>
            <strong>Dr. Muddu Surendra Nehru, MD</strong> • Professor of Medicine • 
            Metabolic Remission Research Platform
          </p>
          <p className="mt-2">
            Serving Gachibowli, Ameerpet, Bachupally & Patancheru, Hyderabad
          </p>
        </div>
      </footer>
    </div>
  );
}
