'use client';

import { useState } from 'react';
import Image from 'next/image';
import AppShell from '@/components/AppShell';
import { GALLERY_IMAGES } from '@/src/data/gallery';

const PAGE_SIZE = 6;

export default function GalleryPage() {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const visibleImages = GALLERY_IMAGES.slice(0, visibleCount);
  const remaining = GALLERY_IMAGES.length - visibleCount;

  return (
    <AppShell>
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Gallery</h1>
        <p className="mt-2 text-slate-600">
          Screening camps, clinic days, and community sessions at HOMA Healthcare Center.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleImages.map((image) => (
          <figure key={image.id} className="min-w-0">
            <Image
              src={image.src}
              alt={image.alt}
              width={600}
              height={400}
              loading="lazy"
              quality={80}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover rounded-lg w-full h-auto"
            />
            <figcaption className="mt-2 text-sm text-slate-600">
              <span className="font-medium text-slate-800">{image.category}</span>
              <span className="mx-1.5" aria-hidden="true">
                ·
              </span>
              {image.alt}
            </figcaption>
          </figure>
        ))}
      </div>

      {remaining > 0 ? (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
            className="rounded-lg bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-800"
          >
            Load more ({Math.min(PAGE_SIZE, remaining)} more)
          </button>
        </div>
      ) : null}
    </AppShell>
  );
}
