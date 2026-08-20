import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Patient Success Stories – Metabolic Remission | Dr. Muddu Surendra Nehru, MD",
  description: "Real results from 500+ patients who reversed diabetes, obesity, and PCOS with Dr. Muddu's 90-day metabolic program in Hyderabad.",
};

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero */}
      <header className="bg-gradient-to-r from-green-50 to-teal-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Success Stories
          </h1>
          <p className="text-lg text-gray-600">
            Real Patients. Real Results. Real Metabolic Remission.
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="py-12 px-4">
        <div className="max-w-4xl mx-auto">

          {/* Lakshmi R. - Prediabetes/Diabetes */}
          <section className="mb-12 p-6 border rounded-lg bg-gray-50">
            <h2 className="text-xl font-bold text-gray-800">Lakshmi R.</h2>
            <p className="text-gray-600 mb-2">52 yrs • Hyderabad</p>
            <p className="italic text-gray-700 mb-4">
              "After 3 months with Dr. Muddu's program, my HOMA-IR dropped from 8.5 to 2.1! I never thought I could reverse my prediabetes without heavy medications. The daily tracking kept me accountable."
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="font-semibold">Before Program</h3>
                <ul className="text-sm text-gray-600">
                  <li>HOMA-IR: 8.5</li>
                  <li>BMI: 32.4</li>
                  <li>HbA1c: 7.2%</li>
                  <li>Waist: 98 cm</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold">After 90 Days</h3>
                <ul className="text-sm text-gray-600">
                  <li>HOMA-IR: 2.1</li>
                  <li>BMI: 27.8</li>
                  <li>HbA1c: 5.8%</li>
                  <li>Waist: 84 cm</li>
                </ul>
              </div>
            </div>
            <p className="text-center mt-2">
              <Link href="/conditions/diabetes" className="text-blue-600 hover:underline">
                Reverse type 2 diabetes naturally in Hyderabad →
              </Link>
            </p>
          </section>

          {/* Rajesh K. - High Triglycerides / Metabolic Syndrome */}
          <section className="mb-12 p-6 border rounded-lg bg-gray-50">
            <h2 className="text-xl font-bold text-gray-800">Rajesh K.</h2>
            <p className="text-gray-600 mb-2">45 yrs • Bangalore</p>
            <p className="italic text-gray-700 mb-4">
              "My triglycerides were 380 and TyG index was dangerously high. Dr. Muddu's metabolic approach helped me understand the science behind insulin resistance. Now I feel 10 years younger!"
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="font-semibold">Before Program</h3>
                <ul className="text-sm text-gray-600">
                  <li>HOMA-IR: 6.2</li>
                  <li>BMI: 29.1</li>
                  <li>HbA1c: 6.8%</li>
                  <li>TyG: 9.8</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold">After 90 Days</h3>
                <ul className="text-sm text-gray-600">
                  <li>HOMA-IR: 1.8</li>
                  <li>BMI: 25.5</li>
                  <li>HbA1c: 5.4%</li>
                  <li>TyG: 8.2</li>
                </ul>
              </div>
            </div>
            <p className="text-center mt-2">
              <Link href="/conditions/diabetes" className="text-blue-600 hover:underline">
                Reverse insulin resistance naturally in Gachibowli →
              </Link>
            </p>
          </section>

          {/* Priya S. - PCOS */}
          <section className="mb-12 p-6 border rounded-lg bg-gray-50">
            <h2 className="text-xl font-bold text-gray-800">Priya S.</h2>
            <p className="text-gray-600 mb-2">38 yrs • Chennai</p>
            <p className="italic text-gray-700 mb-4">
              "Post-pregnancy weight and PCOD made my life difficult. The 90-day program was life-changing. My waist reduced from 96cm to 82cm and I finally feel confident again!"
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="font-semibold">Before Program</h3>
                <ul className="text-sm text-gray-600">
                  <li>HOMA-IR: 5.8</li>
                  <li>BMI: 31.2</li>
                  <li>HbA1c: 6.5%</li>
                  <li>Waist: 96 cm</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold">After 90 Days</h3>
                <ul className="text-sm text-gray-600">
                  <li>HOMA-IR: 1.6</li>
                  <li>BMI: 24.8</li>
                  <li>HbA1c: 5.2%</li>
                  <li>Waist: 82 cm</li>
                </ul>
              </div>
            </div>
            <p className="text-center mt-2">
              <Link href="/conditions/pcos" className="text-blue-600 hover:underline">
                PCOS weight loss program in Gachibowli →
              </Link>
            </p>
          </section>

          {/* Suresh M. - Hypertension + Obesity */}
          <section className="mb-12 p-6 border rounded-lg bg-gray-50">
            <h2 className="text-xl font-bold text-gray-800">Suresh M.</h2>
            <p className="text-gray-600 mb-2">58 yrs • Mumbai</p>
            <p className="italic text-gray-700 mb-4">
              "As a businessman, I ignored my health for years. My fasting insulin was through the roof. Dr. Muddu's scientific approach and the daily habit tracking changed everything."
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="font-semibold">Before Program</h3>
                <ul className="text-sm text-gray-600">
                  <li>HOMA-IR: 9.2</li>
                  <li>BMI: 33.5</li>
                  <li>HbA1c: 8.1%</li>
                  <li>BP: 150/95</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold">After 90 Days</h3>
                <ul className="text-sm text-gray-600">
                  <li>HOMA-IR: 2.4</li>
                  <li>BMI: 28.2</li>
                  <li>HbA1c: 6.2%</li>
                  <li>BP: 128/82</li>
                </ul>
              </div>
            </div>
            <p className="text-center mt-2">
              <Link href="/conditions/hypertension" className="text-blue-600 hover:underline">
                Hypertension reversal program in Gachibowli Hyderabad →
              </Link>
            </p>
          </section>

          {/* Anita G. - Menopausal Obesity */}
          <section className="mb-12 p-6 border rounded-lg bg-gray-50">
            <h2 className="text-xl font-bold text-gray-800">Anita G.</h2>
            <p className="text-gray-600 mb-2">48 yrs • Delhi</p>
            <p className="italic text-gray-700 mb-4">
              "Being post-menopausal, I thought weight gain was inevitable. Wrong! The metabolic remission program helped me lose 12kg and my energy levels are incredible now."
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="font-semibold">Before Program</h3>
                <ul className="text-sm text-gray-600">
                  <li>HOMA-IR: 7.1</li>
                  <li>BMI: 30.8</li>
                  <li>HbA1c: 6.9%</li>
                  <li>Waist: 94 cm</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold">After 90 Days</h3>
                <ul className="text-sm text-gray-600">
                  <li>HOMA-IR: 1.9</li>
                  <li>BMI: 26.1</li>
                  <li>HbA1c: 5.6%</li>
                  <li>Waist: 80 cm</li>
                </ul>
              </div>
            </div>
            <p className="text-center mt-2">
              <Link href="/conditions/obesity" className="text-blue-600 hover:underline">
                Belly fat reversal program in Gachibowli Hyderabad →
              </Link>
            </p>
          </section>

          {/* Final CTA */}
          <div className="bg-blue-50 p-6 rounded-lg text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              Ready to Write Your Success Story?
            </h2>
            <p className="mb-4">
              Join 500+ patients who have achieved metabolic remission with Dr. Muddu's 90-day program.
            </p>
            <a 
              href="https://wa.me/919963721999" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg"
            >
              📞 Start Free Assessment – 09963721999
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center border-t">
        <Link href="/" className="text-blue-600 hover:underline">
          ← Back to Home
        </Link>
      </footer>
    </div>
  );
}
