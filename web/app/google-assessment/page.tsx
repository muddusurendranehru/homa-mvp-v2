import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Metabolic Assessment | Dr. Muddu Surendra Nehru, MD - Gachibowli, Hyderabad',
  description: 'Take our free metabolic assessment to evaluate your risk for diabetes, insulin resistance, and metabolic syndrome. Get personalized insights from Dr. Muddu Surendra Nehru, MD.',
};

export default function GoogleAssessmentPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Advanced Health Assessment
          </h1>
          <p className="text-gray-600">
            Complete this comprehensive form to receive personalized metabolic health insights from Dr. Muddu's team.
          </p>
        </div>

        {/* Google Form Embed */}
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
          <div className="w-full" style={{ minHeight: '600px' }}>
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSc4cw6zfm3ZDC7x1aCc7nGFNMRqpd14eogHWa91gj6jRFPXXw/viewform?embedded=true"
              width="100%"
              height="600"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              className="w-full rounded-lg"
              style={{ minHeight: '600px' }}
              title="Advanced Health Assessment Form"
            >
              Loading…
            </iframe>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h2 className="font-semibold text-blue-900 mb-2">📋 Form Fields Include:</h2>
          <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
            <li>Personal Information (Name, Age, Sex, Height, Weight, Waist)</li>
            <li>Medical History (Post-menopause, Surgery, Pregnancy, PCOS)</li>
            <li>Lifestyle Factors (Smoking, Pan, Alcohol, Drugs)</li>
            <li>Health Conditions (BP, Diabetes, Heart, Stroke, Cancer)</li>
            <li>Family History</li>
          </ul>
        </div>

        {/* Back to Dashboard */}
        <div className="mt-6 text-center">
          <a
            href="/dashboard"
            className="inline-block px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
          >
            ← Back to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}

