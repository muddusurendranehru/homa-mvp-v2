"use client";
import { useState } from "react";
import Image from "next/image";

export default function GalleryClient({ images }: { images: string[] }) {
  const [visibleCount, setVisibleCount] = useState(10);
  
  // The first image becomes the banner automatically
  const heroImage = images.length > 0 ? images[0] : null;
  const gridImages = images.slice(1); 
  const visibleImages = gridImages.slice(0, visibleCount);

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };

  if (!images || images.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p className="text-lg">No event photos found.</p>
        <p className="text-sm mt-2">Drop images into <code>public/events</code> to see them here.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      
      {/* Hero Banner Section */}
      <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-12 bg-gray-800">
        {heroImage && (
          <img 
            src={`/events/${heroImage}`} 
            alt="Events Banner" 
            className="w-full h-full object-contain object-center opacity-70"
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center px-4 drop-shadow-lg">
            Community Lectures & Events
          </h1>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">
        Past Events Gallery
      </h2>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {visibleImages.map((img, index) => (
          <div 
            key={index} 
            className="relative rounded-xl overflow-hidden shadow-md bg-gray-100 aspect-square"
          >
            {/* Note: If you are using Next.js Image, you might need to configure remotePatterns in next.config.js. Standard img is safer for local files. */}
            <img
              src={`/events/${img}`}
              alt={`Event photo ${index + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              loading="lazy" 
            />
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {visibleCount < gridImages.length && (
        <div className="text-center mt-12">
          <button 
            onClick={loadMore}
            className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-full hover:bg-blue-700 transition-colors shadow-lg"
          >
            Load More Photos ({gridImages.length - visibleCount} remaining)
          </button>
        </div>
      )}
      
    </div>
  );
}