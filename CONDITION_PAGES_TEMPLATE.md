# 📋 Condition Pages Template Guide

## ✅ Structure

All condition pages follow this structure:

```
web/app/conditions/
├── [condition-name]/
│   └── page.tsx
└── components/
    └── ShareButtons.tsx  ← Shared component
```

---

## 🎯 Template for New Condition Pages

### Step 1: Create Page File

Create: `web/app/conditions/[condition-name]/page.tsx`

### Step 2: Copy Template

```tsx
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import ShareButtons from '@/components/ShareButtons';

export const metadata: Metadata = {
  title: '[Condition] Treatment in Hyderabad | Dr. Muddu Surendra Nehru, MD',
  description: '[Brief description for SEO]',
  openGraph: {
    title: '[Condition] Treatment – 90-Day Program | Dr. Muddu Nehru, MD',
    description: '[Description for social sharing]',
    url: 'https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com/conditions/[condition-name]',
    siteName: 'HOMA Health Clinics',
    images: [
      {
        url: 'https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com/images/[condition]-treatment.jpg',
        width: 1200,
        height: 630,
        alt: '[Condition] Treatment Program - Dr. Muddu Nehru, MD',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '[Condition] Treatment – 90-Day Program',
    description: '[Short description]',
    images: ['https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com/images/[condition]-treatment.jpg'],
  },
};

export const dynamic = 'force-static';

export default function [Condition]Page() {
  const pageUrl = 'https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com/conditions/[condition-name]';
  const pageTitle = '[Condition] Treatment – 90-Day Program';
  const pageDescription = '[Description for sharing]';

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero */}
      <header className="bg-gradient-to-r from-blue-50 to-[color]-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            [Condition] Treatment in Gachibowli
          </h1>
          <p className="text-lg text-gray-600">
            [Subtitle/Description]
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Image - Placeholder or actual */}
          <div className="mb-8 text-center">
            <div className="relative h-64 md:h-96 mx-auto rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-[color]-100 to-[color]-100 border-2 border-dashed border-[color]-300 flex items-center justify-center">
              {/* Image Placeholder */}
              <div className="text-center p-4">
                <p className="text-gray-500 text-sm mb-2">📸 Image Placeholder</p>
                <p className="text-gray-400 text-xs">Add image: /images/[condition]-treatment.jpg</p>
                <p className="text-gray-400 text-xs mt-1">Recommended: 1200x630px</p>
              </div>
              {/* Uncomment when image is added:
              <Image
                src="/images/[condition]-treatment.jpg"
                alt="[Condition] Treatment Program"
                fill
                className="object-cover"
                priority
              />
              */}
            </div>
          </div>

          <p className="text-gray-700 mb-6">
            [Main description paragraph]
          </p>
          
          <ul className="list-disc pl-5 mb-8 text-gray-700 space-y-2">
            <li>[Benefit 1]</li>
            <li>[Benefit 2]</li>
            <li>[Benefit 3]</li>
          </ul>

          {/* Share Buttons */}
          <ShareButtons 
            pageUrl={pageUrl} 
            pageTitle={pageTitle}
            pageDescription={pageDescription}
          />

          <div className="bg-green-50 p-6 rounded-lg text-center mt-6">
            <a 
              href="https://wa.me/919963721999" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg"
            >
              📞 Start Free Assessment – 09963721999
            </a>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="py-6 text-center border-t bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/" className="text-blue-600 hover:underline font-medium mr-4">
            ← Back to Home
          </Link>
          <span className="text-gray-400">|</span>
          <Link href="/about" className="text-blue-600 hover:underline font-medium ml-4">
            About Dr. Muddu
          </Link>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          Dr. Muddu Surendra Nehru, MD | HOMA Health Clinics | Gachibowli, Hyderabad
        </p>
      </footer>

      {/* Schema.org - MedicalCondition */}
      <script
        id="[condition]-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalCondition",
            "name": "[Condition Name]",
            "description": "[Medical description]",
            "url": pageUrl,
            "image": "https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com/images/[condition]-treatment.jpg",
            "associatedAnatomy": {
              "@type": "AnatomicalStructure",
              "name": "[Body part/system]"
            },
            "possibleTreatment": {
              "@type": "MedicalTherapy",
              "name": "Metabolic remission protocol, HOMA-IR guided nutrition, lifestyle modification"
            },
            "provider": {
              "@type": "Person",
              "name": "Dr. Muddu Surendra Nehru, MD",
              "url": "https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com/about"
            }
          })
        }}
      />
    </div>
  );
}
```

---

## 📤 ShareButtons Component

**Location**: `web/components/ShareButtons.tsx`

**Props**:
- `pageUrl` (string) - Full URL of the page
- `pageTitle` (string) - Page title for sharing
- `pageDescription` (string, optional) - Description for sharing

**Features**:
- 📧 **Gmail** - Opens Gmail compose (most prominent)
- 📨 **Email** - Generic email client
- 📱 **WhatsApp** - WhatsApp share
- 🔗 **Copy Link** - Copies URL to clipboard
- 📤 **Native Share** - Uses device share API (mobile)

---

## 🖼️ Image Requirements

### File Location
Place images in: `web/public/images/`

### Naming Convention
`[condition]-treatment.jpg` or `[condition]-reversal-hyderabad.jpg`

### Specifications
- **Size**: 1200x630px (Open Graph standard)
- **Format**: JPG or PNG
- **File Size**: < 1MB
- **Quality**: High resolution, professional

### Example Names
- `diabetes-treatment.jpg`
- `pcos-reversal-hyderabad.jpg`
- `hypertension-remission-gachibowli.jpg`
- `obesity-reversal-hyderabad.jpg`

---

## ✅ Checklist for New Condition Page

- [ ] Create page file: `web/app/conditions/[name]/page.tsx`
- [ ] Add metadata (title, description, Open Graph)
- [ ] Add image placeholder or actual image
- [ ] Add ShareButtons component with correct props
- [ ] Add MedicalCondition Schema
- [ ] Add footer with back links
- [ ] Test locally
- [ ] Test Gmail sharing
- [ ] Verify Open Graph preview (use https://metatags.io/)

---

## 📋 Current Condition Pages

| Page | Status | Image | Sharing |
|------|--------|-------|---------|
| `/conditions/diabetes` | ✅ Complete | ✅ Has image | ✅ Added |
| `/conditions/pcos` | ✅ Complete | ✅ Has image | ✅ Added |
| `/conditions/obesity` | ✅ Complete | ⏳ Placeholder | ✅ Added |
| `/conditions/hypertension` | ✅ Complete | ⏳ Placeholder | ✅ Added |

---

## 🎨 Color Schemes by Condition

Use appropriate gradient colors in hero section:

- **Diabetes**: `from-blue-50 to-red-50`
- **PCOS**: `from-pink-50 to-purple-50`
- **Hypertension**: `from-blue-50 to-purple-50`
- **Obesity**: `from-blue-50 to-orange-50`
- **Kidney**: `from-blue-50 to-teal-50`
- **Metabolic Syndrome**: `from-green-50 to-blue-50`

---

## 🚀 Quick Start

1. **Copy template** from an existing page (e.g., `obesity/page.tsx`)
2. **Replace placeholders** with condition-specific content
3. **Add image** to `web/public/images/`
4. **Update metadata** with correct URLs and image paths
5. **Test locally** at `http://localhost:3002/conditions/[name]`
6. **Test sharing** (especially Gmail button)

---

## 💡 Pro Tips

1. **Consistent Structure**: All pages follow the same layout
2. **SEO**: Always include Open Graph and Twitter Card metadata
3. **Schema**: MedicalCondition schema helps with Google search
4. **Standalone**: Pages work independently (minimal navigation)
5. **Sharing**: Gmail button is most prominent for easy email sharing

---

**Result**: All condition pages are now standardized with sharing, images, and SEO! 🎉
