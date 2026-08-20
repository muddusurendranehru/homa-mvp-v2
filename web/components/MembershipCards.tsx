'use client';

interface MembershipCardProps {
  name: string;
  price: string;
  features: string[];
  crowdLevel: number; // 1-5
  highlight?: boolean;
  zoomAccess?: boolean;
}

function MembershipCard({ name, price, features, crowdLevel, highlight, zoomAccess }: MembershipCardProps) {
  const crowdMeter = Array.from({ length: 5 }, (_, i) => i < crowdLevel);
  
  return (
    <div className={`bg-white rounded-xl p-6 shadow-lg border-2 transition-all transform hover:scale-105 ${
      highlight ? 'border-yellow-400 ring-4 ring-yellow-200' : 'border-gray-200'
    }`}>
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{name}</h3>
        <div className="text-3xl font-bold text-teal-600 mb-1">{price}</div>
        <div className="text-sm text-gray-500">per month</div>
        {zoomAccess && (
          <div className="mt-2 inline-block bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full">
            Zoom Sundays Included
          </div>
        )}
      </div>
      
      {/* Crowd Meter */}
      <div className="mb-4">
        <div className="text-xs text-gray-600 mb-1 text-center">Current Members</div>
        <div className="flex justify-center gap-1">
          {crowdMeter.map((filled, i) => (
            <div
              key={i}
              className={`w-8 h-2 rounded ${
                filled ? 'bg-green-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        <div className="text-xs text-center text-gray-500 mt-1">
          {crowdLevel}/5 capacity
        </div>
      </div>

      <ul className="space-y-2 mb-4">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
            <span className="text-green-500 font-bold">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <a
        href={`https://wa.me/919963721999?text=I'm interested in ${name} membership`}
        target="_blank"
        rel="noopener noreferrer"
        className={`block w-full text-center py-3 rounded-lg font-bold transition-colors ${
          highlight
            ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
            : 'bg-teal-600 hover:bg-teal-700 text-white'
        }`}
      >
        Join Now →
      </a>
    </div>
  );
}

export default function MembershipCards() {
  return (
    <div className="bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
          Choose Your Membership Plan
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Start your journey to diabetes remission with personalized care
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MembershipCard
            name="Basic"
            price="₹999"
            features={[
              'HOMA-IR Testing',
              'Basic Consultation',
              'Nutrition Guidance',
              'Monthly Check-ins'
            ]}
            crowdLevel={3}
          />
          <MembershipCard
            name="Premium"
            price="₹4,999"
            features={[
              'All Basic Features',
              'Advanced Monitoring',
              'Priority Support',
              'Weekly Consultations',
              'Custom Meal Plans'
            ]}
            crowdLevel={4}
            highlight={true}
          />
          <MembershipCard
            name="VIP"
            price="₹9,999"
            features={[
              'All Premium Features',
              'Zoom Sundays 9AM',
              'Direct Doctor Access',
              '24/7 Support',
              'Personalized Protocols',
              'Family Discounts'
            ]}
            crowdLevel={5}
            zoomAccess={true}
          />
        </div>
      </div>
    </div>
  );
}

