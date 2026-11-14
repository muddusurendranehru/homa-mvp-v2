const VOLUNTEER_WA =
  "https://wa.me/919963721999?text=Hi%20Dr%20Muddu%2C%20I%20want%20to%20volunteer%20with%20HOMA";

export default function QualityOfLifeBanner() {
  return (
    <a
      href={VOLUNTEER_WA}
      target="_blank"
      rel="noopener noreferrer"
      className="group block w-full max-w-sm mx-auto h-full no-underline text-inherit"
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col h-full">
        <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden">
          <img
            src="/images/qol-woman.jpg"
            alt="HOMA community volunteers"
            width={400}
            height={300}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-green-700 shadow-sm">
            New
          </div>
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-gray-900 mb-2 font-serif group-hover:text-green-700 transition-colors">
            HOMA Community Volunteers
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
            Help your neighbours walk, eat right and stay healthy. Lead morning walks and earn HOMA Coins.
          </p>
          <div className="text-green-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
            Join as Volunteer <span aria-hidden="true">&rarr;</span>
          </div>
        </div>
      </div>
    </a>
  );
}