export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  category: string;
};

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: '1',
    src: '/images/gallery/placeholder-1.jpg',
    alt: 'HOMA screening camp',
    category: 'Camps',
  },
  {
    id: '2',
    src: '/images/gallery/placeholder-2.jpg',
    alt: 'HOMA clinic consultation',
    category: 'Clinic',
  },
  {
    id: '3',
    src: '/images/gallery/placeholder-3.jpg',
    alt: 'HOMA community lecture',
    category: 'Lectures',
  },
  {
    id: '4',
    src: '/images/gallery/placeholder-4.jpg',
    alt: 'HOMA patient education session',
    category: 'Education',
  },
  {
    id: '5',
    src: '/images/gallery/placeholder-5.jpg',
    alt: 'HOMA healthcare team',
    category: 'Team',
  },
];
