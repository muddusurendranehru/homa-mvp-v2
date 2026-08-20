import { redirect } from 'next/navigation';

/** Footer and bookmarks use /privacy-policy; canonical page is /privacy */
export default function PrivacyPolicyAlias() {
  redirect('/privacy');
}
