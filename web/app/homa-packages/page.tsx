import { redirect } from 'next/navigation';

/** Friendly URL without .html — same content as /packages */
export default function HomaPackagesAlias() {
  redirect('/packages');
}
