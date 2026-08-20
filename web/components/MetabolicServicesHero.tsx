import Link from 'next/link';

export default function MetabolicServicesHero() {
  const services = [
    {
      id: 1,
      title: 'PCOS & Insulin Resistance',
      icon: '🩺',
      description: 'Reverse hormonal imbalance with targeted metabolic protocols.',
    },
    {
      id: 2,
      title: 'Senior Citizen Metabolic Care',
      icon: '👴',
      description: 'Prevent frailty, fatigue, and falls with age-tailored nutrition.',
    },
    {
      id: 3,
      title: 'Central Obesity Treatment',
      icon: '⚖️',
      description: 'Targeted protocols to reduce visceral fat and metabolic risk.',
    },
    {
      id: 4,
      title: 'Prediabetes Reversal (Pre-DM)',
      icon: '🛡️',
      description: 'Prevent progression to full diabetes',
    },
    {
      id: 5,
      title: 'Diabetes + Kidney Disease (CKD)',
      icon: '🫘',
      description: 'Integrated care for diabetic nephropathy',
    },
    {
      id: 6,
      title: 'Diabetes + Heart Disease',
      icon: '❤️',
      description: 'Break the cycle of insulin resistance and cardiovascular risk.',
    },
    {
      id: 7,
      title: 'Diabetes + Hypertension',
      icon: '🩺',
      description: 'Dual condition management & reversal',
    },
    {
      id: 8,
      title: 'Retired Patients with Metabolic Syndrome',
      icon: '🏖️',
      description: 'Comprehensive metabolic health for retirees',
    },
    {
      id: 9,
      title: 'Family Metabolic Health Screening',
      icon: '👨‍👩‍👧‍👦',
      description: 'Preventive screening for entire families',
    },
    {
      id: 10,
      title: 'Fatigue Caused by Insulin Resistance',
      icon: '🔋',
      description: 'Restore energy levels by addressing root metabolic dysfunction.',
    },
  ];

  return (
    <section className="bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Headline */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-4">
          Personalized Metabolic Care for Every Life Stage
        </h2>
        
        {/* Subheading */}
        <p className="text-lg md:text-xl text-gray-700 text-center mb-8 max-w-3xl mx-auto">
          From PCOS to senior care — science-based reversal protocols by Hyderabad's trusted diabetologist
        </p>

        {/* Hyperlocal Service Area Notice */}
        <p className="text-sm md:text-base text-gray-600 text-center mb-12">
          Serving Gachibowli, Ameerpet, Bachupally & Patancheru with at-home metabolic assessments.
        </p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-start gap-4">
                <span className="text-4xl flex-shrink-0">{service.icon}</span>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    {service.title}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link
            href="/assessment"
            className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Start Your Free Assessment →
          </Link>
        </div>

        {/* Doctor Credentials */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>
            <strong>Dr. Muddu Surendra Nehru, MD</strong> | Professor of Medicine | 32+ Years Experience
          </p>
          <p className="mt-1">
            Best diabetologist in Gachibowli | Metabolic reversal Hyderabad
          </p>
        </div>
      </div>
    </section>
  );
}

