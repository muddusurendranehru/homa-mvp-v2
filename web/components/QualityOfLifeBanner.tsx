import Link from 'next/link';
import Image from 'next/image';

export default function QualityOfLifeBanner() {
  return (
    <Link href="/partners" className="group block w-full max-w-sm mx-auto h-full">
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col h-full">
        
        {/* Thumbnail Image */}
        <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden">
          <Image 
            src="/images/qol-woman.jpg" 
            alt="HOMA Lifestyle - Eat, Pray, Sleep, Conquer"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-green-200 to-teal-100 -z-10 flex items-center justify-center text-gray-500 text-sm text-center p-4">
            Add qol-woman.jpg to public/images
          </div>
          
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-green-700 shadow-sm">
            New
          </div>
        </div>

        {/* Text Content */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-gray-900 mb-2 font-serif group-hover:text-green-700 transition-colors">
            The HOMA Lifestyle
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
            Eat. Pray. Sleep. Conquer & Enjoy the Journey. Be the master, not the slave. Join our community to live vibrantly.
          </p>
          <div className="text-green-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
            Join the Community <span aria-hidden="true">&rarr;</span>
          </div>
        </div>

      </div>
    </Link>
  );
}