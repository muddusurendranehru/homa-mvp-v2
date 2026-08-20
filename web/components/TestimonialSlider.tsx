'use client';

function testimonialAvatar(name: string) {
  const first = name.split(',')[0].trim();
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(first)}&background=10b981&color=fff&size=80&bold=true`;
}

type Testimonial = { id: number; text: string; name: string; image?: string };

export default function TestimonialSlider() {
  const testimonials: Testimonial[] = [
    { id: 1, text: "Reversed my diabetes in 90 days!", name: "Ramesh, 58 – Hyderabad" },
    { id: 2, text: "Lost 18kg without pills", name: "Anita, 34 – Gachibowli" },
    { id: 3, text: "PCOS gone – now pregnant!", name: "Sneha, 29 – Telangana", image: "/images/before-after-south-indian-9-month.jpg" },
  ];

  return (
    <div className="max-w-4xl mx-auto my-8 px-4">
      {testimonials.map(t => (
        <div key={t.id} className="bg-green-50 p-6 rounded-lg mb-4 flex gap-4 items-start">
          <div className="flex-shrink-0">
            <img
              src={t.image ?? testimonialAvatar(t.name)}
              alt={t.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-green-300 shadow-md"
            />
          </div>
          <div className="flex-1">
            <p className="italic text-gray-800 mb-2">"{t.text}"</p>
            <p className="text-gray-700 font-medium">— {t.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

