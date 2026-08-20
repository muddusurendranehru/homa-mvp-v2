import { redirect } from 'next/navigation';

/** Friendly URL without .html — static hero preview in public/ */
export default function HomaPhotoHeroAlias() {
  redirect('/homa-photo-hero.html');
}
