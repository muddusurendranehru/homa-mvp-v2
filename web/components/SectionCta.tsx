"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

const WA_INDUSTRY =
  "https://wa.me/919963721999?text=INDUSTRY%20%2F%20INVESTOR%20ENQUIRY%20FOR%20HOMA";

function bookWhatsAppHref(title: string) {
  return `https://wa.me/919963721999?text=${encodeURIComponent(`I WANT THE BOOK: ${title}`)}`;
}

export type SectionCtaBook = {
  title: string;
  coverSrc: string;
  coverAlt?: string;
};

export type SectionCtaProps = {
  knowMoreHref: string;
  book?: SectionCtaBook;
  /** Show only the book block — for sections that already have their own button row */
  bookOnly?: boolean;
};

export default function SectionCta({ knowMoreHref, book, bookOnly = false }: SectionCtaProps) {
  return (
    <>
      <style>{SC_CSS}</style>
      <Row className={`sc-row${bookOnly ? " sc-row--book-only" : ""}`}>
        {book ? (
          <div className="sc-book">
            <a
              href={bookWhatsAppHref(book.title)}
              target="_blank"
              rel="noopener noreferrer"
              className="sc-book-cover"
              aria-label={`Get the book: ${book.title}`}
            >
              <Image
                src={book.coverSrc}
                alt={book.coverAlt ?? `${book.title} book cover`}
                width={110}
                height={165}
                className="sc-book-img"
                loading="lazy"
              />
              <span className="sc-book-label">Get the book</span>
            </a>
            <div className="sc-book-title">{book.title}</div>
          </div>
        ) : null}
        {!bookOnly ? (
          <div className="sc-actions">
            <Link href={knowMoreHref} className="sc-btn sc-btn-ghost">
              Know more
            </Link>
            <Link href="/packages" className="sc-btn sc-btn-ghost">
              Packages &amp; plans
            </Link>
            <a
              href={WA_INDUSTRY}
              className="sc-btn sc-btn-ghost"
              target="_blank"
              rel="noopener noreferrer"
            >
              Industry &amp; investors
            </a>
          </div>
        ) : null}
      </Row>
    </>
  );
}

function Row({ className, children }: { className: string; children: ReactNode }) {
  return <div className={className}>{children}</div>;
}

export const SECTION_CTA_EXTRA_CSS = `
.hs-how-cta-wrap{
  display:flex;flex-wrap:wrap;align-items:center;justify-content:center;
  gap:16px 20px;margin-top:28px
}
.hs-how-cta-wrap .hs-how-cta{margin-top:0}
`;

const SC_CSS = `
.sc-row{
  display:flex;flex-wrap:wrap;align-items:center;justify-content:center;
  gap:20px 24px;margin-top:28px;padding:20px 16px;
  background:#f8fafc;border:1px solid #e2e8f0;border-radius:16px;
  box-shadow:0 8px 24px -12px rgba(15,23,42,.12)
}
.sc-row--book-only{
  margin-top:0;padding:0;background:transparent;border:none;box-shadow:none;
  justify-content:flex-start;flex:0 0 auto
}
.sc-book{display:flex;align-items:center;gap:14px;min-width:0;max-width:100%}
.sc-book-cover{
  flex-shrink:0;display:flex;flex-direction:column;align-items:center;
  text-decoration:none;color:inherit
}
.sc-book-cover:focus-visible{outline:3px solid #10b981;outline-offset:4px;border-radius:8px}
.sc-book-img{
  width:110px;height:auto;border-radius:10px;
  box-shadow:0 6px 18px rgba(15,23,42,.15);
  border:1px solid #e2e8f0
}
.sc-book-label{
  margin-top:6px;font-size:11px;font-weight:700;color:#0d9488;text-align:center
}
.sc-book-title{
  font-size:14px;font-weight:700;line-height:1.35;color:#0f172a;max-width:160px
}
.sc-actions{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;align-items:center}
.sc-btn{
  display:inline-flex;align-items:center;justify-content:center;min-height:44px;
  padding:0 18px;border-radius:12px;font-weight:700;font-size:14px;text-decoration:none;
  transition:background .15s,border-color .15s
}
.sc-btn-ghost{background:#fff;color:#1e3a8a;border:1px solid #e2e8f0}
.sc-btn-ghost:hover{background:#f1f5f9;border-color:#cbd5e1}
${SECTION_CTA_EXTRA_CSS}
`;