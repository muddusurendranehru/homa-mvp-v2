import Link from 'next/link';

export default function AiimsCourse() {
  const waNumber = "919963721999";
  const waLink = `https://wa.me/${waNumber}?text=I am interested in the HOMA 2026 / AIIMS Course. Please send me the fee structure and enrollment details.`;
  const waResearch = `https://wa.me/${waNumber}?text=I am a doctor/student and I want to apply for the Research Co-authorship program.`;

  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 font-sans">
      
      {/* Top Navigation */}
      <nav className="p-4 bg-white shadow-sm flex justify-between items-center">
        <Link href="/" className="text-teal-600 font-semibold hover:underline flex items-center gap-2">
          ← Back to HOMA Home
        </Link>
      </nav>

      {/* Hero Section */}
      <header className="bg-[#0a1930] text-white py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-teal-400 font-bold tracking-widest uppercase text-sm mb-4 block">AIIMS - Asian Institute of Insulin and Metabolic Studies</span>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            HOMA 2026: The First Conference
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            36 Chapters. 9 Hours per day. 4 Training sessions daily.<br/>
            From basic science to bedside — one integrated training program.
          </p>
          <a 
            href={waLink} target="_blank" rel="noopener noreferrer"
            className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition"
          >
            Enroll as a Delegate
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto py-16 px-6">
        
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why We Started</h2>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-teal-600 font-bold">✔</span> 
                <p>India has 100+ million diabetes cases, with 7-10 years of being undiagnosed.</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-teal-600 font-bold">✔</span> 
                <p>HbA1c detects the consequence, not the cause. We need a new framework — built in India, for India.</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-teal-600 font-bold">✔</span> 
                <p>We are moving beyond old models to a new, comprehensive metabolic paradigm.</p>
              </li>
            </ul>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-[#0a1930] mb-4">The Framework</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-teal-700">36 Chapters</h4>
                <p className="text-sm text-gray-600">From anatomy, physiology, and biochemistry — to real-world clinical evidence.</p>
              </div>
              <div>
                <h4 className="font-bold text-teal-700">Pharmacology</h4>
                <p className="text-sm text-gray-600">12+ drugs — where and when to use each. Case-based, not textbook-based.</p>
              </div>
              <div>
                <h4 className="font-bold text-teal-700">DDD Metric Explorer</h4>
                <p className="text-sm text-gray-600">Metabolism Analyzer — 30-day precision diet, 32 subtypes, exercise, sleep.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Research Opportunity Banner */}
        <div className="bg-teal-900 text-white rounded-xl p-8 text-center mb-16 shadow-lg">
          <h3 className="text-2xl font-bold mb-4">Are You a Medical Student?</h3>
          <p className="text-teal-100 mb-6 max-w-2xl mx-auto">
            We are selecting 5 sharp MBBS students to co-author a clinical case series on Sarcopenic Obesity and VAT Scans. 
            This is a massive opportunity to build your resume and present at conferences.
          </p>
          <a 
            href={waResearch} target="_blank" rel="noopener noreferrer"
            className="inline-block bg-white text-teal-900 hover:bg-gray-100 font-bold py-2 px-6 rounded transition"
          >
            Apply for Research Co-authorship
          </a>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to master metabolic medicine?</h3>
          <p className="text-gray-600 mb-6">Contact Dr. Muddu's team to get the fee structure and registration details.</p>
          <a 
            href={waLink} target="_blank" rel="noopener noreferrer"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition"
          >
            WhatsApp for Details
          </a>
                    <div className="mt-8">
            <a 
              href="/cme-2026.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-lg shadow-md transition"
            >
              📸 View Photos from our Recent CMEs
            </a>
          </div>
          
          <p className="mt-8 text-sm text-gray-500 border-t pt-4">
            Dr. Muddu Surendra Nehru, MD | HOMA Healthcare Center<br/>
            📞 +91 99637 21999 | ✉️ info@homahealthcarecenter.in
          </p>
        </div>

      </main>
    </div>
  );
}