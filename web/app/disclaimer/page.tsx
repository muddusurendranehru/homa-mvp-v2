'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DisclaimerPage() {
  const [accepted, setAccepted] = useState(false);
  const router = useRouter();

  // 100+ Legal Rules
  const rules = [
    "By clicking 'Sign Up' or 'Login', you agree to all terms herein.",
    "This platform is HIPAA-compliant. All data is encrypted end-to-end.",
    "You shall not spread fake news, misinformation, or defamatory content about HOMA Clinics.",
    "In any international court of law, HOMA Clinics Private Limited reserves the right to not comply with foreign judgments.",
    "The 90-Day Metabolic Remission Program is a promise that works ONLY if the recipient follows diligently.",
    "The 90-Day Program cannot be reproduced, copied, stolen, or pirated. Violation will result in legal action.",
    "Users have NO rights to any intellectual property, algorithms, designs, or content within this platform.",
    "No refunds after 15 days of trial. Refunds only granted for poor compliance, language barriers, or attendance irregularity — at sole discretion.",
    "All medical disclaimers are written per Indian law. Claims are subject to Godavari Khani, Peddapalli District jurisdiction.",
    "No screenshots, recordings, or shares of any part of this program are permitted without written consent.",
    "Users have NO rights to claim ownership, derivative works, or commercial use of any part of this program.",
    "We are NOT responsible for any side effects of exercise, diet, supplements, or medications recommended.",
    "Full coordination and cognizance of digital acceptance occurs the moment you sign up or log in.",
    "No separate signature is required for the 90-Day Program — acceptance is implied by usage.",
    "There is NO guarantee of remission, weight loss, or metabolic improvement.",
    "No parts of the 90-Day Program can be copied, reverse-engineered, or shared.",
    "No refunds under any circumstances after 15 days.",
    "No other doctor, clinic, or health center may replicate, imitate, or clone this program without written consent.",
    "Any untoward effects from medicines, supplements, diets, or exercise are NOT guaranteed against.",
    "Quality or degree of motivators, coaches, or doctors is NOT guaranteed.",
    "Users have NO choice in selecting health coaches or doctors.",
    "Dr. Muddu Surendra Nehru and family members are NOT using this screenshot design for personal promotion.",
    "This disclaimer applies to all users, regardless of country, language, or device.",
    "No funds may be raised, crowdsourced, or invested in this program without explicit written consent from HOMA Clinics Private Limited.",
    "The 90-Day Concept may be downloaded in pieces for personal use ONLY — no redistribution allowed.",
    "Language barriers do NOT exempt users from understanding or complying with these terms.",
    "Future supply of foods, supplements, tablets, injections carries NO guarantee of efficacy, safety, or outcome.",
    "Transport, lab tests, hospitalization, and additional services are EXTRA and NOT included.",
    "All prices are subject to change without notice.",
    "First 100 tokens are provided free for NutriBot App usage (calorie tracking for pizzas, dosa, etc.).",
    "After 100 tokens, recharge costs ₹500 minimum (₹1 per token based on demand/country).",
    "Payment gateway: 09963721999@ybl. No responsibility for SWIFT, NEFT, RTGS, or bank transfer errors.",
    "All disputes shall be resolved in Godavari Khani, Peddapalli District courts only.",
    "No third-party apps, integrations, or APIs may access this platform without permission.",
    "Users agree to not reverse-engineer, decompile, or disassemble any part of the software.",
    "No warranty is given for uninterrupted, error-free, or secure operation of the platform.",
    "Users agree to indemnify HOMA Clinics against all claims arising from misuse of the platform.",
    "No liability for indirect, consequential, or punitive damages.",
    "Users waive all rights to sue for emotional distress, inconvenience, or time lost.",
    "All communications via email, SMS, or in-app messages are considered official notices.",
    "Users consent to receive promotional content, health tips, and marketing materials via WhatsApp and SMS.",
    "Personal health data may be used anonymously for research and program improvement.",
    "Users must be 18 years or older, or have parental/guardian consent to use this platform.",
    "Medical advice provided is supplementary and does NOT replace professional medical consultation.",
    "Users must consult their primary physician before making any health-related decisions.",
    "The platform does not diagnose, treat, cure, or prevent any disease — it provides educational support only.",
    "All health metrics (HOMA-IR, TyG, BMI, etc.) are calculated based on user-provided data — accuracy depends on input.",
    "Users are responsible for the accuracy of all information entered into the platform.",
    "HOMA Clinics is not liable for any decisions made based on inaccurate user data.",
    "The 90-Day Program requires strict adherence to diet, exercise, and lifestyle modifications.",
    "Non-compliance with program guidelines may result in suboptimal outcomes.",
    "Users agree that results vary based on individual physiology, genetics, and adherence.",
    "No two patients will have identical outcomes — personalized results depend on multiple factors.",
    "Health coaches are certified but do not hold medical degrees — they provide guidance, not medical advice.",
    "Motivators are trained in behavioral psychology but are not licensed psychologists or psychiatrists.",
    "Mental health support is supplementary — users with serious mental health conditions should seek professional help.",
    "HOMA Clinics does not provide emergency medical services — call 108 or visit nearest hospital for emergencies.",
    "Users acknowledge that telemedicine has limitations compared to in-person consultations.",
    "Video consultations require stable internet — HOMA Clinics is not responsible for connectivity issues.",
    "All consultations are recorded for quality assurance and training purposes.",
    "Users consent to recording and storage of consultation data for up to 7 years as per Indian medical regulations.",
    "Data storage complies with IT Act 2000 and Information Technology Rules 2011.",
    "Users may request data deletion within 30 days of account closure — subject to legal retention requirements.",
    "Account suspension may occur for violation of terms without prior notice.",
    "Banned users forfeit all program fees and access without refund.",
    "Users must not share login credentials — account sharing is strictly prohibited.",
    "Multiple accounts per person are not allowed — detected duplicates will be merged or deleted.",
    "Users must use real names and accurate contact information — fake profiles will be removed.",
    "HOMA Clinics reserves the right to verify user identity through government-issued ID.",
    "Subscription fees are non-transferable between users or accounts.",
    "Subscription auto-renewal occurs unless cancelled 7 days before the renewal date.",
    "Cancellation requests must be submitted via WhatsApp to <a href='https://wa.me/919963721999' target='_blank' rel='noopener noreferrer' class='text-blue-600 hover:underline'>09963721999</a>.",
    "Partial month refunds are NOT available — subscriptions run until the end of the billing cycle.",
    "Currency conversion fees for international payments are borne by the user.",
    "GST (18%) is applicable on all Indian transactions.",
    "Invoice generation occurs within 48 hours of payment confirmation.",
    "Payment disputes must be raised within 7 days of transaction.",
    "Chargebacks may result in immediate account suspension.",
    "Users in restricted territories are responsible for ensuring compliance with local laws.",
    "HOMA Clinics does not operate in sanctioned countries — access from such regions is prohibited.",
    "VPN usage to circumvent geographic restrictions violates these terms.",
    "Users must not use the platform for any illegal, fraudulent, or harmful purposes.",
    "Harassment of staff, coaches, or other users will result in immediate termination.",
    "Feedback and reviews must be honest and not defamatory.",
    "HOMA Clinics may use positive reviews for marketing with user consent.",
    "Negative reviews will be addressed through proper grievance channels before legal action.",
    "BY SIGNING UP OR LOGGING IN, YOU AUTOMATICALLY ACCEPT ALL TERMS AND CONDITIONS OF HOMA CLINICS PRIVATE LIMITED — NO SEPARATE FORM OR SIGNATURE IS REQUIRED.",
    "Health is a DYNAMIC situation — no doctor, clinic, or program can guarantee outcomes. By using this platform, you acknowledge this reality and WAIVE ALL RIGHTS to legal action against HOMA Clinics Private Limited.",
    "HOMA Clinics Private Limited is committed to TRANSPARENCY, follows ETHICAL MEDICAL CODES, and provides EVIDENCE-BASED REGIMENS. We are doing our best to help you — but ultimate responsibility for health outcomes lies with the patient.",
    "Grievance Officer contact: Dr. Muddu Surendra Nehru, <a href='tel:+919963721999' class='text-blue-600 hover:underline'>09963721999</a>, <a href='mailto:homasurendranehru@gmail.com' class='text-blue-600 hover:underline'>homasurendranehru@gmail.com</a>.",
    "Complaints must be acknowledged within 48 hours and resolved within 30 days.",
    "Unresolved disputes may be escalated to consumer courts in Peddapalli District.",
    "Arbitration is preferred over litigation — conducted under Indian Arbitration Act 1996.",
    "Class action lawsuits are waived — disputes must be resolved individually.",
    "Limitation period for claims is 1 year from the date of incident.",
    "Force majeure events (pandemics, wars, natural disasters) exempt HOMA Clinics from performance obligations.",
    "Terms may be updated periodically — continued use implies acceptance of updated terms.",
    "Users will be notified of material changes via email and in-app notifications.",
    "Severability clause: if any term is unenforceable, remaining terms continue in full force.",
    "No waiver of any term shall be deemed a continuing waiver.",
    "These terms constitute the entire agreement between users and HOMA Clinics Private Limited.",
    "Headings are for convenience only and do not affect interpretation.",
    "English version of terms prevails in case of translation discrepancies.",
    "Users acknowledge reading and understanding all 100+ terms before proceeding.",
  ];

  const handleProceed = () => {
    localStorage.setItem('disclaimerAccepted', 'true');
    router.push('/dashboard');
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen py-8 px-4 md:px-8 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating iPhone Mockups */}
        <div className="absolute top-10 -left-20 w-48 h-80 bg-gray-900 rounded-[40px] opacity-10 transform rotate-12"></div>
        <div className="absolute top-40 -right-16 w-40 h-72 bg-gray-900 rounded-[35px] opacity-10 transform -rotate-12"></div>
        <div className="absolute bottom-20 left-10 w-36 h-64 bg-gray-900 rounded-[30px] opacity-5 transform rotate-6"></div>
        <div className="absolute bottom-40 right-20 w-44 h-76 bg-gray-900 rounded-[35px] opacity-5 transform -rotate-6"></div>
        
        {/* Gradient Circles */}
        <div className="absolute top-20 right-40 w-64 h-64 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 left-40 w-80 h-80 bg-teal-200 rounded-full opacity-20 blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header Card */}
        <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-t-2xl p-6 text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-2xl">⚖️</span>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Legal Terms & Consent</h1>
              <p className="text-blue-100 text-sm mt-1">HOMA Clinics Private Limited</p>
            </div>
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-b-2xl shadow-xl p-6 md:p-8">
          {/* Introduction */}
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6 rounded-r-lg">
            <p className="text-yellow-800 font-medium">
              ⚠️ Please read carefully before proceeding
            </p>
            <p className="text-yellow-700 text-sm mt-1">
              By using HOMA Clinic's 90-Day Metabolic Remission Program, you agree to the following terms and conditions.
            </p>
          </div>

          {/* Rules Section */}
          <div className="bg-gray-50 rounded-xl p-4 md:p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">📜</span>
              Terms of Use & Legal Agreement ({rules.length} clauses)
            </h2>
            
            <div className="max-h-80 md:max-h-96 overflow-y-auto pr-2 space-y-2">
              {rules.map((rule, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-3 p-2 rounded-lg hover:bg-white transition-colors"
                >
                  <span className="flex-shrink-0 w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </span>
                  <span className="text-sm text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: rule }} />
                </div>
              ))}
            </div>
          </div>

          {/* Important Highlights */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
              <span className="text-2xl">🚫</span>
              <p className="text-xs text-red-700 font-medium mt-2">No Refunds After 15 Days</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <span className="text-2xl">📍</span>
              <p className="text-xs text-blue-700 font-medium mt-2">Peddapalli District Jurisdiction</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <span className="text-2xl">🔒</span>
              <p className="text-xs text-green-700 font-medium mt-2">HIPAA Compliant & Encrypted</p>
            </div>
          </div>

          {/* Acceptance Checkbox */}
          <div className="bg-gray-100 rounded-xl p-4 mb-6">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700">
                <strong>I have read, understood, and accept all {rules.length} terms and conditions above.</strong>
                <br />
                <span className="text-sm text-gray-500">
                  I understand that by checking this box, I am entering into a legally binding agreement with HOMA Clinics Private Limited.
                </span>
              </span>
            </label>
          </div>

          {/* Proceed Button */}
          <button
            disabled={!accepted}
            onClick={handleProceed}
            className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition duration-300 ${
              accepted
                ? 'bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                : 'bg-gray-300 cursor-not-allowed text-gray-500'
            }`}
          >
            {accepted ? '✅ Proceed to Dashboard →' : '⬜ Please Accept Terms to Continue'}
          </button>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} HOMA Clinics Private Limited. All Rights Reserved.
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Registered Office: Godavari Khani, Peddapalli District, Telangana, India
            </p>
            <div className="flex justify-center gap-4 mt-3 text-xs">
              <a href="tel:+919963721999" className="text-blue-600 hover:underline">📞 09963721999</a>
              <a href="mailto:homasurendranehru@gmail.com" className="text-blue-600 hover:underline">📧 Email</a>
              <a href="https://wa.me/919963721999" target="_blank" className="text-green-600 hover:underline">💬 WhatsApp</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

