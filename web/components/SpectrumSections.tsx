'use client';

interface SpectrumSection {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const spectrumSections: SpectrumSection[] = [
  {
    id: 'young-type2',
    title: 'Young Type 2 Diabetes',
    description: 'Early intervention for patients under 40. Reverse insulin resistance before complications set in.',
    icon: '👨‍💼',
    color: 'blue',
  },
  {
    id: 'women-pcos',
    title: 'Women with PCOS',
    description: 'HOMA-IR testing reveals insulin resistance driving PCOS symptoms. Targeted treatment for hormonal balance.',
    icon: '👩',
    color: 'pink',
  },
  {
    id: 'seniors-cardio',
    title: 'Seniors Cardio Risk',
    description: 'Heart disease prevention through metabolic optimization. Reduce cardiac events with HOMA-guided care.',
    icon: '👴',
    color: 'purple',
  },
  {
    id: 'retired-obesity',
    title: 'Retired Obesity Management',
    description: 'Sustainable weight loss for retirees. Age-appropriate protocols that work with your lifestyle.',
    icon: '👵',
    color: 'orange',
  },
  {
    id: 'men-metabolic',
    title: 'Men Metabolic Health',
    description: 'Address low testosterone, energy, and metabolic syndrome. Restore vitality through insulin optimization.',
    icon: '👨',
    color: 'teal',
  },
  {
    id: 'heart-risk',
    title: 'Heart Risk Prevention',
    description: 'Lower cardiovascular risk through HOMA-IR management. Prevent heart attacks and strokes.',
    icon: '❤️',
    color: 'red',
  },
  {
    id: 'hypertension',
    title: 'Hypertension Control',
    description: 'Blood pressure normalization via metabolic remission. Reduce medication dependency.',
    icon: '🩺',
    color: 'indigo',
  },
  {
    id: 'prediabetes',
    title: 'Prediabetes Reversal',
    description: 'Stop progression to full diabetes. Early HOMA testing catches insulin resistance before damage.',
    icon: '📊',
    color: 'green',
  },
  {
    id: 'kidney-protection',
    title: 'Kidney Protection',
    description: 'Prevent diabetic nephropathy through early metabolic intervention. Protect your kidneys.',
    icon: '🔬',
    color: 'cyan',
  },
  {
    id: 'family-history',
    title: 'Family History Prevention',
    description: 'Break the cycle of inherited diabetes. Proactive HOMA testing for at-risk families.',
    icon: '👨‍👩‍👧‍👦',
    color: 'amber',
  },
];

export default function SpectrumSections() {
  const colorClasses: Record<string, string> = {
    blue: 'from-blue-500 to-blue-600',
    pink: 'from-pink-500 to-pink-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600',
    teal: 'from-teal-500 to-teal-600',
    red: 'from-red-500 to-red-600',
    indigo: 'from-indigo-500 to-indigo-600',
    green: 'from-green-500 to-green-600',
    cyan: 'from-cyan-500 to-cyan-600',
    amber: 'from-amber-500 to-amber-600',
  };

  return (
    <div className="bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
          Complete Spectrum of Care
        </h2>
        <p className="text-center text-gray-600 mb-8">
          We treat every stage and type of metabolic condition
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {spectrumSections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`bg-gradient-to-br ${colorClasses[section.color]} text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105`}
            >
              <div className="text-4xl mb-3">{section.icon}</div>
              <h3 className="text-xl font-bold mb-2">{section.title}</h3>
              <p className="text-white/90 text-sm">{section.description}</p>
              <div className="mt-4 text-xs text-white/80 font-semibold">
                Learn More →
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

