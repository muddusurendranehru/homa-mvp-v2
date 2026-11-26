export type Doctor = {
  name: string;
  photoSrc?: string;
};

// Sorted alphabetically by first name after "Dr."
export const DOCTORS: Doctor[] = [
  {
    name: 'Dr. Basawaraj R. Puranik, M.D.',
    photoSrc: '/images/mentors/dr-basawaraj-puranik.webp',
  },
  {
    name: 'Dr. P. Vamsee Krishna, M.D.',
  },
];
