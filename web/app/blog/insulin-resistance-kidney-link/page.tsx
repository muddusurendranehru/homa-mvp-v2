import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import BlogLayout from '@/components/BlogLayout'

const CTA_URL =
  'https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com'

export const dynamic = 'force-static'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Insulin Resistance & Kidney Disease: The Hidden Metabolic-Renal Link | HOMA Clinic',
    description:
      'Discover how insulin resistance and hyperinsulinemia directly damage kidneys—increasing risk of proteinuria, hypertension, and diabetic nephropathy in Indians.',
    keywords: 'insulin resistance, kidney disease, hyperinsulinemia, diabetic nephropathy, HOMA-IR, kidney damage, metabolic renal link',
    openGraph: {
      title: 'Insulin Resistance & Kidney Disease: The Hidden Metabolic-Renal Link | HOMA Clinic',
      description:
        'Discover how insulin resistance and hyperinsulinemia directly damage kidneys—increasing risk of proteinuria, hypertension, and diabetic nephropathy in Indians.',
      type: 'article',
    },
  }
}

export default function InsulinResistanceKidneyBlog() {
  return (
    <BlogLayout>
      <article className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden my-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-6 px-6 pt-6">
          <Link href="/" className="hover:text-green-600 transition">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-green-600 transition">
            Blog
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Insulin Resistance & Kidney Disease</span>
        </nav>

        {/* Meta Info */}
        <div className="mb-8 px-6">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm">
              🔬 Science
            </span>
            <span className="text-gray-500 text-sm">Dec 12, 2025</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-500 text-sm">8 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
            Insulin Resistance and the Metabolic-Renal Link: How Hyperinsulinemia Drives Kidney Damage
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed font-medium">
            Discover how insulin resistance and hyperinsulinemia directly damage kidneys—increasing risk of proteinuria, hypertension, and diabetic nephropathy in Indians.
          </p>
        </div>

        {/* Author Info */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 shadow-md mb-8 mx-6 border-l-4 border-blue-600">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              DM
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Dr. Muddu Surendra Nehru M.D.</h3>
              <p className="text-gray-700 text-sm font-medium">Professor of Medicine, Senior Physician | 30+ Years Experience</p>
              <p className="text-gray-600 text-xs mt-1">5,00,000+ Patients Treated | 85% Remission Rate</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-6 pb-8 md:px-8 md:pb-12 prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:text-gray-700 prose-li:text-gray-700 prose-blockquote:border-blue-500">
          
          {/* Introduction */}
          <div className="mb-10">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Most people know insulin resistance leads to <strong className="text-gray-900">type 2 diabetes</strong>. Few realize it also silently damages the <strong className="text-gray-900">kidneys</strong>—even before blood sugar rises.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              At <strong className="text-blue-600">HOMA Clinic</strong>, we&apos;ve observed that patients with high HOMA-IR often show early signs of <strong className="text-gray-900">microalbuminuria</strong> or reduced eGFR—long before a diabetes diagnosis. Why?
            </p>
          </div>

          {/* Section 1 */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-8">Insulin Doesn&apos;t Just Act on Muscle and Liver—It Acts on the Kidney Too</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              While insulin&apos;s classic targets are <strong>skeletal muscle, liver, adipose tissue, and pancreas</strong>, it also binds to receptors in the <strong>kidney</strong>, influencing:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Cell growth and hypertrophy</li>
              <li>Microcirculation in glomeruli</li>
              <li>Fibrotic pathways</li>
              <li>Glomerular filtration rate (GFR)</li>
              <li>Tubuloglomerular feedback mechanisms</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-6">
              In states of <strong>insulin resistance</strong>, the body compensates with <strong>hyperinsulinemia</strong>—flooding the kidneys with excess insulin that triggers harmful signaling.
            </p>
            {/* Pathways Image */}
            <div className="my-8 p-4 bg-gray-50 rounded-lg">
              <Image
                src="/images/metabolic-syndrome-and-chronic-kidney-disease-a-pathophysiologic-cascade.jpg"
                alt="Hyperinsulinemia, Insulin Resistance, and Kidney Damage"
                width={1200}
                height={800}
                className="w-full h-auto rounded-md shadow-sm"
                priority={false}
              />
              <p className="text-xs text-gray-600 mt-2">
                Illustration showing how insulin resistance and hyperinsulinemia accelerate kidney damage through renal cell proliferation, AT1R upregulation, endothelin-1 stimulation, and endothelial dysfunction.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-8">How Hyperinsulinemia Directly Harms the Kidneys</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Insulin itself—when chronically elevated—becomes a <strong>pro-injury hormone</strong> in renal tissue:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-3 mb-4">
              <li>
                <strong>Promotes renal cell proliferation</strong> and upregulates growth factors like <strong>IGF-1 and TGF-β</strong>—key drivers of kidney scarring (fibrosis).
              </li>
              <li>
                <strong>Increases angiotensin II type 1 receptor (AT1R)</strong> in mesangial cells, amplifying the damaging effects of angiotensin II (a major pathway in hypertension and kidney disease).
              </li>
              <li>
                <strong>Stimulates endothelin-1</strong>, a potent vasoconstrictor that reduces renal blood flow and promotes inflammation.
              </li>
              <li>
                Causes <strong>endothelial dysfunction</strong> by reducing <strong>nitric oxide (NO)</strong> and increasing <strong>oxidative stress</strong>—both accelerate <strong>diabetic nephropathy</strong>, even in non-diabetics.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-8">Clinical Consequences: More Than Just &quot;Diabetic Kidney Disease&quot;</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              This metabolic-renal axis explains why insulin resistance is linked to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li><strong>Microalbuminuria</strong> in non-diabetic individuals (Mykkänen et al., Diabetes 1998)</li>
              <li><strong>Albuminuria</strong> in type 2 diabetes (Niskanen & Laakso, Metabolism 1993)</li>
              <li><strong>Chronic kidney disease (CKD)</strong> in normoglycemic adults with high HOMA-IR (Chen et al., JASN 2003)</li>
              <li>Worsening <strong>hypertension and dyslipidemia</strong>—further straining kidney function</li>
            </ul>
            <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700 my-6 bg-blue-50 py-4 rounded-r-lg">
              &quot;Insulin resistance is not just a metabolic disorder—it&apos;s a systemic condition with direct renal toxicity.&quot;  
              <br />— Supported by clinical evidence from Sarafidis & Bakris, Kidney Int 2006
            </blockquote>
          </section>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl my-8 border-l-4 border-blue-500">
            <h3 className="text-xl font-semibold text-blue-800 mb-3">
              Early Detection Saves Kidneys
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              At HOMA Clinic, we assess kidney risk not just with creatinine—but with <strong>HOMA-IR, urine albumin, and metabolic markers</strong> to catch damage before it&apos;s irreversible.
            </p>
            <a
              href={CTA_URL}
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-blue-700 transition shadow-md hover:shadow-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Check Your Metabolic & Kidney Risk →
            </a>
          </div>

          {/* References */}
          <section className="mb-10 border-t pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">References</h2>
            <div className="text-sm text-gray-600 space-y-2 prose-sm">
              <p>
                Sarafidis PA, Bakris GL: Protection of the kidney by thiazolidinediones: an assessment from bench to bedside. <em>Kidney Int</em> 2006.
              </p>
              <p>
                Mykkänen L, et al.: Microalbuminuria is associated with insulin resistance in nondiabetic subjects. <em>Diabetes</em> 1998;47:793–800.
              </p>
              <p>
                Niskanen L, Laakso M: Insulin resistance is related to albuminuria in type II diabetes. <em>Metabolism</em> 1993;42:1541–1545.
              </p>
              <p>
                Spangler JG, Konen JC: Hypertension, hyperlipidemia, and microalbuminuria in NIDDM. <em>J Am Board Fam Pract</em> 1996;9:1–6.
              </p>
              <p>
                Chen J, et al.: Insulin resistance and risk of CKD in nondiabetic US adults. <em>J Am Soc Nephrol</em> 2003;14:469–477.
              </p>
              <p>
                Bastard JP, et al.: Relationship between PAI-1 and insulin resistance. <em>Diabetes Metab Res Rev</em> 2000;16:192–201.
              </p>
            </div>
          </section>

          {/* Instagram/FB Post Cards */}
          <section className="mb-10 border-t pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">📱 Share This Article</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Facebook Post Card */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 shadow-md border border-blue-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">📘 Facebook Post</h3>
                <p className="text-gray-700 mb-4 text-sm">
                  <strong>Caption:</strong> "🔬 How Insulin Resistance Silently Damages Kidneys 🔥 Discover the hidden metabolic-renal link. Hyperinsulinemia drives kidney damage even before diabetes. Learn how to protect your kidneys with HOMA-IR testing. 📍 HOMA Clinic Gachibowli | 📱 09963721999"
                </p>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com/blog/insulin-resistance-kidney-link')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 px-4 rounded-lg font-semibold transition-colors"
                >
                  📘 Share on Facebook
                </a>
              </div>

              {/* Instagram Post Card */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 shadow-md border border-purple-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">📷 Instagram Post</h3>
                <p className="text-gray-700 mb-4 text-sm">
                  <strong>Caption:</strong> "🔬 Insulin Resistance & Kidney Disease: The Hidden Link 🔥 Hyperinsulinemia damages kidneys even before diabetes. Protect your kidneys with early HOMA-IR testing. Dr. Muddu Nehru MD | HOMA Clinic Gachibowli 📍 Link in bio 👆 #InsulinResistance #KidneyHealth #HOMAClinic #Gachibowli"
                </p>
                <a
                  href={`https://www.instagram.com/create/story/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-center py-3 px-4 rounded-lg font-semibold transition-colors"
                >
                  📷 Share on Instagram
                </a>
              </div>
            </div>
          </section>

        </div>

        {/* Related Posts */}
        <div className="mt-12 px-6 pb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/blog/can-prediabetes-be-reversed-in-90-days" className="bg-gradient-to-br from-green-50 to-white rounded-xl p-6 shadow-md hover:shadow-xl transition border border-green-100">
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Can Prediabetes Be Reversed in 90 Days?</h4>
              <p className="text-gray-600">Discover Dr. Muddu&apos;s metabolic remission protocol for Indian patients...</p>
            </Link>
            <Link href="/blog" className="bg-gradient-to-br from-teal-50 to-white rounded-xl p-6 shadow-md hover:shadow-xl transition border border-teal-100">
              <h4 className="text-xl font-semibold text-gray-900 mb-2">View All Blog Posts</h4>
              <p className="text-gray-600">Explore more articles on metabolic health and remission...</p>
            </Link>
          </div>
        </div>

        {/* Back to Blog */}
        <div className="mt-8 pb-8 text-center px-6">
          <Link
            href="/blog"
            className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition text-lg"
          >
            ← Back to All Articles
          </Link>
        </div>
      </article>
    </BlogLayout>
  )
}

