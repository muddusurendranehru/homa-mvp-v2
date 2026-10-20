import Link from 'next/link';
import Image from 'next/image';

export default function TyGHero() {
  const whatsappNumber = "919963721999"; 
  const whatsappMessage = encodeURIComponent("I'm interested");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="relative w-full min-h-screen max-w-md mx-auto overflow-hidden bg-teal-900 flex flex-col justify-between">
      
      {/* Background Image */}
      <Image
        src="/images/tyg-hero-bg.webp"
        alt="Homa Health Background"
        fill
        className="object-cover object-center z-0"
        priority
      />

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col h-full min-h-screen p-4 justify-between">
        
        {/* Top Text Box */}
        <div className="bg-white/95 rounded-xl p-4 shadow-lg mt-16">
          <h1 className="text-lg font-bold text-teal-900 leading-tight">
            Lipid profile + FBS in hand? Know your insulin resistance risk in 60 seconds.
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Free. Doctor-built. No fasting insulin test. Just 2 numbers from your report.
          </p>
          
          {/* NEW LINE: Explaining why no HbA1c/BP (English only for clean look) */}
          <div className="mt-3 bg-teal-50 border border-teal-100 rounded-md p-2">
            <p className="text-xs font-bold text-teal-800">
              Even without HbA1c or BP, these 2 numbers reveal hidden risks for diabetes, heart attack, and BP patients.
            </p>
          </div>
        </div>

        {/* Middle Mock Inputs & Button */}
        <div className="space-y-4 my-auto pt-4">
          {/* Mock Input 1 */}
          <div className="w-full rounded-lg border-2 border-teal-600 bg-white/95 px-4 py-2 shadow-md">
            <span className="text-gray-800 text-sm">Triglycerides: <strong>180</strong> mg/dL</span>
          </div>
          
          {/* Mock Input 2 */}
          <div className="w-full rounded-lg border-2 border-teal-600 bg-white/95 px-4 py-2 shadow-md">
            <span className="text-gray-800 text-sm">Fasting Sugar: <strong>110</strong> mg/dL</span>
          </div>

          {/* Green Button */}
          <Link 
            href="/tools/tyg-index-calculator"
            className="block w-full text-center rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold py-3 shadow-lg transition-colors"
          >
            Click to know →
          </Link>
        </div>

        {/* Bottom WhatsApp & Footer */}
        <div className="space-y-3 mb-6">
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 shadow-lg transition-colors"
          >
            I'm interested → WhatsApp
          </a>
          
          <p className="text-center text-xs text-black font-bold drop-shadow-md bg-white/80 rounded-md py-1 mx-2">
            Share with someone who has a lipid report. Free for everyone.
          </p>
        </div>

      </div>
    </div>
  );
}