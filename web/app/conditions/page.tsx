import { Metadata } from 'next';
import Link from 'next/link';

// ✅ Force static generation for SEO
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Dr. Muddu Surendra Nehru MD Best Diabetologist Gachibowli | Metabolic Conditions Treatment',
  description: 'Dr. Muddu Surendra Nehru MD best diabetologist Gachibowli. From PCOS to senior care — science-based reversal protocols. Serving Gachibowli, Ameerpet, Bachupally, Patancheru, ISB, IIIT & IKEA with at-home metabolic assessments. Professor of Medicine, 32+ years.',
  keywords: 'Dr Muddu Surendra Nehru MD best diabetologist Gachibowli, best diabetologist Gachibowli, diabetes doctor Hyderabad, PCOS treatment Gachibowli, metabolic syndrome doctor Hyderabad, insulin resistance treatment Gachibowli, diabetologist ISB, diabetologist IIIT',
};

interface ServiceCard {
  title: string;
  description: string;
  icon: string;
  href: string;
  slug: string;
}

const serviceCards: ServiceCard[] = [
  {
    title: 'PCOS & Insulin Resistance',
    description: 'Reverse hormonal imbalance with targeted metabolic protocols.',
    icon: '🩺',
    href: '/conditions/pcos-unexplained-weight-gain',
    slug: 'pcos-unexplained-weight-gain',
  },
  {
    title: 'Senior Citizen Metabolic Care',
    description: 'Prevent frailty, fatigue, and falls with age-tailored nutrition.',
    icon: '👴',
    href: '/conditions/tired-at-60-not-just-aging',
    slug: 'tired-at-60-not-just-aging',
  },
  {
    title: 'Central Obesity Treatment',
    description: 'Targeted protocols to reduce visceral fat and metabolic risk.',
    icon: '⚖️',
    href: '/conditions/belly-fat-wont-go-away',
    slug: 'belly-fat-wont-go-away',
  },
  {
    title: 'Prediabetes Reversal (Pre-DM)',
    description: 'Prevent progression to full diabetes with early intervention.',
    icon: '🛡️',
    href: '/conditions/sugar-normal-high-risk',
    slug: 'sugar-normal-high-risk',
  },
  {
    title: 'Diabetes + Kidney Disease (CKD)',
    description: 'Integrated care for diabetic nephropathy and kidney protection.',
    icon: '✅',
    href: '/conditions/diabetes-swelling-in-legs',
    slug: 'diabetes-swelling-in-legs',
  },
  {
    title: 'Diabetes + Heart Disease',
    description: 'Break the cycle of insulin resistance and cardiovascular risk.',
    icon: '❤️',
    href: '/conditions/family-heart-attack-diabetes',
    slug: 'family-heart-attack-diabetes',
  },
  {
    title: 'Diabetes + Hypertension',
    description: 'Dual condition management & reversal with one protocol.',
    icon: '🩺',
    href: '/conditions/diabetes-hypertension',
    slug: 'diabetes-hypertension',
  },
  {
    title: 'Retired Patients with Metabolic Syndrome',
    description: 'Comprehensive metabolic health for retirees and seniors.',
    icon: '🏖️',
    href: '/conditions/retired-always-tired',
    slug: 'retired-always-tired',
  },
  {
    title: 'Family Metabolic Health Screening',
    description: 'Preventive screening for entire families — early detection saves lives.',
    icon: '👨‍👩‍👧',
    href: '/conditions/family-metabolic-screening',
    slug: 'family-metabolic-screening',
  },
  {
    title: 'Fatigue Caused by Insulin Resistance',
    description: 'Fix root cause of chronic fatigue in 90 days — not just symptoms.',
    icon: '💡',
    href: '/conditions/always-exhausted-even-after-sleep',
    slug: 'always-exhausted-even-after-sleep',
  },
];

export default function ConditionsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            From PCOS to Senior Care — Science-Based Reversal Protocols by Hyderabad&apos;s Trusted Diabetologist
          </h1>
          <p className="text-lg md:text-xl text-purple-100 mb-6">
            Serving Gachibowli, Ameerpet, Bachupally & Patancheru with at-home metabolic assessments.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-white/20 px-4 py-2 rounded-full">📍 Gachibowli</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">📍 Ameerpet</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">📍 Bachupally</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">📍 Patancheru</span>
          </div>
        </div>
      </div>

      {/* Service Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceCards.map((card) => (
            <Link
              key={card.slug}
              href={card.href}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-purple-300 overflow-hidden transform hover:-translate-y-1"
            >
              <div className="p-6 h-full flex flex-col">
                {/* Icon */}
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {card.icon}
                </div>
                
                {/* Title */}
                <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                  {card.title}
                </h2>
                
                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 flex-grow">
                  {card.description}
                </p>
                
                {/* Learn More Link */}
                <div className="flex items-center text-purple-600 font-medium text-sm group-hover:text-purple-700 transition-colors">
                  Learn More
                  <svg
                    className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 py-12 px-4 border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Best Diabetologist in Gachibowli, Hyderabad
          </h2>
          <p className="text-gray-700 mb-6 text-lg">
            Dr. Muddu Surendra Nehru, MD — Professor of Medicine with 32+ years of clinical excellence. 
            Evidence-based metabolic reversal protocols with 85% remission rate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSc4cw6zfm3ZDC7x1aCc7nGFNMRqpd14eogHWa91gj6jRFPXXw/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors text-lg"
            >
              📝 Book Free Assessment
            </a>
            <a
              href="tel:+919963721999"
              className="inline-block bg-white text-green-600 border-2 border-green-600 px-8 py-3 rounded-full font-semibold hover:bg-green-50 transition-colors text-lg"
            >
              📞 Call 09963721999
            </a>
          </div>
        </div>
      </div>

      {/* SEO Section - Location Optimization */}
      <div className="max-w-4xl mx-auto px-4 py-8 text-gray-600 text-sm">
        <h3 className="font-bold text-gray-900 mb-3">Best Diabetologist in Gachibowli, Hyderabad</h3>
        <p className="mb-3">
          Dr. Muddu Surendra Nehru, MD is Hyderabad&apos;s trusted metabolic health specialist, serving patients in Gachibowli, Ameerpet, Bachupally, 
          and Patancheru with evidence-based metabolic reversal protocols.
        </p>
        <p className="mb-3">
          Our clinic specializes in diabetes remission, PCOS treatment, insulin resistance reversal, prediabetes prevention, 
          and metabolic syndrome management. With 32+ years of experience and over 500,000 patients treated, we offer:
        </p>
        <ul className="list-disc pl-5 space-y-1 mb-3">
          <li>90-day metabolic reversal programs with 85% remission rate</li>
          <li>HOMA-IR testing and metabolic health assessments</li>
          <li>Personalized nutrition plans and lifestyle interventions</li>
          <li>At-home metabolic assessments for convenience</li>
          <li>Real-time WhatsApp support from medical team</li>
        </ul>
        <p>
          <strong>Location:</strong> Gachibowli, Hyderabad, Telangana | <strong>Phone:</strong> 09963721999 | 
          <strong> Website:</strong> www.homahealthcarecenter.in
        </p>
      </div>
    </div>
  );
}

