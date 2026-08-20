'use client';

export default function UniqueHook() {
  return (
    <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 py-8 px-6 my-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-start gap-4">
          <div className="text-4xl">💡</div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Why Others Fail & We Succeed
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              <span className="font-bold text-red-600">Others are stuck on glucose testing</span> — 
              we test <span className="font-bold text-teal-600">FASTING INSULIN + HOMA-IR</span> to find the 
              <span className="font-bold"> root cause</span>. 
              Most clinics only check blood sugar, missing the underlying insulin resistance that drives diabetes, 
              heart disease, and obesity. We identify the real problem first, then treat it.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                ❌ Others: Glucose Only
              </span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                ✅ We: Insulin + HOMA-IR
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

