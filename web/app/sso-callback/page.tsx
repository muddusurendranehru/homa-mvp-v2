'use client';

import { AuthenticateWithRedirectCallback } from '@clerk/nextjs';

export default function SSOCallbackPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-teal-900 flex flex-col items-center justify-center p-4">
      <div className="text-center text-white">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-teal-400 border-t-transparent mx-auto mb-4" />
        <p className="text-teal-200">Completing sign in...</p>
      </div>
      <AuthenticateWithRedirectCallback
        signInForceRedirectUrl="/dashboard"
        signUpForceRedirectUrl="/dashboard"
      />
    </div>
  );
}
