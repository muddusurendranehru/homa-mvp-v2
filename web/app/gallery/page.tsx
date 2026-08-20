import { Metadata } from 'next';
import ImageCard from '../../components/ImageCard';
import YouTubeEmbed from '../../components/YouTubeEmbed';

// ✅ Force static generation for SEO
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Patient Success Stories | Dr. Muddu Surendra Nehru, MD - Hyderabad',
  description: 'Real patient stories of metabolic remission at HOMA Clinic in Gachibowli, Hyderabad. See before and after photos, diabetes reversal, PCOS remission, and weight loss success stories.',
  openGraph: {
    title: 'Patient Success Stories | Dr. Muddu Surendra Nehru, MD',
    description: 'Real patient transformations: Diabetes reversal, PCOS remission, weight loss - 90-day metabolic remission program in Gachibowli, Hyderabad.',
    images: [
      {
        url: '/images/obesity-reversal-hyderabad-jpg.jpg',
        alt: 'Patient success story - Metabolic health improvement',
      },
    ],
  },
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Patient Success Stories</h1>
        <p className="text-gray-700 mb-6">
          See how patients reversed diabetes, lost weight, and regained health under Dr. Nehru's 90-day protocol.
        </p>

        {/* Patient Video */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Watch Patient Stories</h2>
          <YouTubeEmbed 
            videoId="ZajBOTMisjY" 
            title="Patient Success Stories - HOMA Clinic"
            className="max-w-4xl mx-auto"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <ImageCard
            src="/images/central-obesity-4-phases-1.jpg"
            alt="Patient waist measurement showing metabolic health improvement - Dr. Muddu Surendra Nehru 90-day program Gachibowli Hyderabad"
            caption="Reversed diabetes in 90 days"
          />
          <ImageCard
            src="/images/before-after-2.jpg"
            alt="Patient progress tracking waist circumference reduction - HOMA Clinic metabolic remission program"
            caption="Lost 20kg with metabolic plan"
          />
          <ImageCard
            src="/images/before-after-3.jpg"
            alt="Patient health transformation before and after - Type 2 diabetes reversal Gachibowli"
            caption="HOMA-IR normalized in 90 days"
          />
          <ImageCard
            src="/images/wc-ads-1.jpg"
            alt="Metabolic remission success story waist measurement - Dr. Muddu Surendra Nehru MD patient results"
            caption="Waist circumference reduced - Metabolic health improved"
          />
          <ImageCard
            src="/images/pcos-reversal-anita-hyderabad-jpg.jpg"
            alt="PCOS reversal success story Anita from Hyderabad - Dr. Muddu metabolic health program"
            caption="PCOS reversed - Now pregnant! Anita, 34 - Hyderabad"
          />
          <ImageCard
            src="/images/public.jpg"
            alt="Patient success story metabolic health improvement - HOMA Clinic Gachibowli 90-day program"
            caption="Insulin resistance reversed - Metabolic syndrome resolved"
          />
          <ImageCard
            src="/images/public-1.jpg"
            alt="Patient transformation metabolic remission - Dr. Muddu Surendra Nehru MD patient results"
            caption="HbA1c normalized - Diabetes in remission"
          />
          <ImageCard
            src="/images/public-2.jpg"
            alt="Patient success story weight loss metabolic health - HOMA Clinic Gachibowli Hyderabad"
            caption="BMI reduced - Cardiovascular risk lowered"
          />
          <ImageCard
            src="/images/kishnblur1.jpg"
            alt="Dr. Muddu Surendra Nehru MD - Metabolic health expert Gachibowli Hyderabad"
            caption="Dr. Muddu Surendra Nehru, MD - 32+ Years Experience"
          />
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm mb-6">
            *All photos are from real patients with consent.*
          </p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSc4cw6zfm3ZDC7x1aCc7nGFNMRqpd14eogHWa91gj6jRFPXXw/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 font-medium text-lg shadow-lg transition-colors"
          >
            📝 Start Your Journey - Book Free Assessment
          </a>
        </div>
      </div>
    </div>
  );
}
