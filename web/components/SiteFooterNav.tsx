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

const linkClassName = 'text-gray-300 hover:text-white transition-colors text-sm';

function FooterLinkItem({ link }: { link: FooterLink }) {
  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClassName}>
        {link.label}
      </a>
    );
  }
  return (
    <Link href={link.href} className={linkClassName}>
      {link.label}
    </Link>
  );
}

function FooterLinkList({ links }: { links: FooterLink[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {links.map((link) => (
        <li key={link.label}>
          <FooterLinkItem link={link} />
        </li>
      ))}
    </ul>
  );
}

function DesktopFooterColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <h3 className="text-sm font-bold text-teal-400 mb-3 uppercase tracking-wide">{title}</h3>
      <FooterLinkList links={links} />
    </div>
  );
}

function MobileFooterColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <details className="group border-b border-gray-800">
      <summary className="cursor-pointer list-none py-3 font-bold text-[#d4af37] [&::-webkit-details-marker]:hidden">
        <span className="flex items-center justify-between gap-2">
          {title}
          <span className="text-gray-500 group-open:rotate-180 transition-transform" aria-hidden="true">
            ▾
          </span>
        </span>
      </summary>
      <div className="pb-4">
        <FooterLinkList links={links} />
      </div>
    </details>
  );
}

export default function SiteFooterNav() {
  return (
    <nav className="mb-6 mt-2 border-t border-gray-700 py-6" aria-label="Site footer">
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {COLUMNS.map((col) => (
          <DesktopFooterColumn key={col.title} title={col.title} links={col.links} />
        ))}
      </div>
      <div className="md:hidden">
        {COLUMNS.map((col) => (
          <MobileFooterColumn key={col.title} title={col.title} links={col.links} />
        ))}
      </div>
    </nav>
  );
}