import Link from 'next/link';

const WA_INDUSTRY =
  'https://wa.me/919963721999?text=INDUSTRY%20%2F%20INVESTOR%20ENQUIRY%20FOR%20HOMA';
const PARTNER_LOGIN = 'https://feature-step-1-structure-97dp.onrender.com';
const COLLABORATE =
  'https://docs.google.com/forms/d/e/1FAIpQLScFyqzVxG4DzDlEgCHFlwNnPbo6Iz1jHLPHrxdQKQBwA9fEcQ/viewform';

type FooterLink = { href: string; label: string; external?: boolean };

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: 'For Patients',
    links: [
      { href: '/', label: 'Home' },
      { href: '/tools', label: 'Free Calculators' },
      { href: '/auth', label: 'Login' },
      { href: '/packages', label: 'Packages' },
      { href: '/dashboard', label: 'Dashboard' },
      { href: '/remission-program', label: '90-Day Program' },
      { href: '/testimonials', label: 'Success Stories' },
      { href: '/upgrade', label: 'Premium' },
      { href: '/enroll', label: 'Enroll' },
      { href: '/ddd', label: 'D·D·D Campaign' },
      { href: '/pricing', label: 'Pricing' },
    ],
  },
  {
    title: 'Services',
    links: [
      { href: '/labs', label: 'Labs' },
      { href: '/pharmacy', label: 'Pharmacy' },
      { href: '/emergency', label: 'Emergency' },
      { href: '/tools/metabolic-analyzer.html', label: 'Metabolic Analyzer', external: true },
      { href: '/conditions', label: 'Conditions' },
      { href: '/products', label: 'Apps & Tools' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About' },
      { href: '/press', label: 'Press' },
      { href: '/blog', label: 'Blog' },
      { href: '/gallery', label: 'Gallery' },
      { href: '/portfolio', label: 'Portfolio' },
      { href: '/zoom', label: 'Zoom Sundays' },
      { href: '/disclaimer', label: 'Legal' },
      { href: '/security-policy', label: 'Security' },
      { href: '/privacy', label: 'Privacy Policy' },
    ],
  },
  {
    title: 'B2B',
    links: [
      { href: WA_INDUSTRY, label: 'Industry & Investors', external: true },
      { href: PARTNER_LOGIN, label: 'Partner Login', external: true },
      { href: COLLABORATE, label: 'Collaborate', external: true },
    ],
  },
];

function FooterLinkItem({ link }: { link: FooterLink }) {
  const className = 'text-gray-300 hover:text-teal-300 transition-colors text-sm';
  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
        {link.label}
      </a>
    );
  }
  return (
    <Link href={link.href} className={className}>
      {link.label}
    </Link>
  );
}

function FooterColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <details className="sf-col group border-b border-gray-800 md:border-none">
      <summary className="sf-summary cursor-pointer list-none py-3 font-bold text-teal-400 md:hidden [&::-webkit-details-marker]:hidden">
        <span className="flex items-center justify-between gap-2">
          {title}
          <span className="text-gray-500 group-open:rotate-180 transition-transform" aria-hidden="true">
            ▾
          </span>
        </span>
      </summary>
      <div className="pb-4 md:pb-0">
        <h3 className="hidden md:block text-sm font-bold text-teal-400 mb-3 uppercase tracking-wide">
          {title}
        </h3>
        <ul className="flex flex-col gap-2 pl-0 md:pl-0">
          {links.map((link) => (
            <li key={link.label}>
              <FooterLinkItem link={link} />
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}

export default function SiteFooterNav() {
  return (
    <nav className="sf-nav mb-8 border-b border-gray-800 pb-6" aria-label="Site footer">
      <style>{`
        @media (max-width: 767px) {
          .sf-col:not([open]) > div { display: none; }
        }
        @media (min-width: 768px) {
          .sf-col > .sf-summary { display: none; }
          .sf-col > div { display: block !important; }
        }
      `}</style>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-8">
        {COLUMNS.map((col) => (
          <FooterColumn key={col.title} title={col.title} links={col.links} />
        ))}
      </div>
    </nav>
  );
}