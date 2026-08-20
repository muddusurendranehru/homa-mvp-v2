# 📤 Social Media Sharing Guide for Condition Pages

## ✅ What's Been Implemented

### 1. **Separate Condition Pages**
- ✅ `/conditions/diabetes` - Type 2 Diabetes Remission
- ✅ `/conditions/pcos` - PCOS Treatment & Reversal
- Each page is standalone and shareable

### 2. **Open Graph Metadata (Social Media Sharing)**
Each condition page includes:
- **Open Graph tags** for Facebook, LinkedIn, WhatsApp
- **Twitter Card** metadata
- **Custom images** for each condition
- **Proper URLs** for sharing

### 3. **Share Buttons on Each Page**
- 📱 **WhatsApp Share** - Direct link with pre-filled message
- 📧 **Email Share** - Opens email client with subject & body
- 🔗 **Copy Link** - Copies URL to clipboard (or uses native share)

### 4. **Images Added**
- **Diabetes**: `/images/90dayhealthtracker1.jpg`
- **PCOS**: `/images/pcos-reversal-anita-hyderabad.jpg.png`

### 5. **Standalone Design**
- Minimal footer (only Back to Home + About links)
- No full website navigation
- Focused content for easy sharing

---

## 📋 Step-by-Step Implementation Guide

### Step 1: Add Images to Public Folder
Place condition-specific images in `web/public/images/`:
- Recommended size: 1200x630px (Open Graph standard)
- Format: JPG or PNG
- Name them descriptively (e.g., `diabetes-remission.jpg`, `pcos-treatment.jpg`)

### Step 2: Update Metadata for Each Condition Page

**Template for `web/app/conditions/[condition]/page.tsx`:**

```typescript
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: "[Condition] Treatment | Dr. Muddu Nehru, MD",
  description: "[Brief description for SEO]",
  openGraph: {
    title: "[Condition] Treatment & Reversal | Dr. Muddu Nehru, MD",
    description: "[Description for social sharing]",
    url: "https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com/conditions/[condition]",
    siteName: "HOMA Health Clinics",
    images: [
      {
        url: "https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com/images/[image-name].jpg",
        width: 1200,
        height: 630,
        alt: "[Condition] Treatment - Dr. Muddu Nehru, MD",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "[Condition] Treatment & Reversal",
    description: "[Short description]",
    images: ["https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com/images/[image-name].jpg"],
  },
};
```

### Step 3: Add Image to Page Content

```tsx
<div className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-lg">
  <Image
    src="/images/[your-image].jpg"
    alt="[Condition] Treatment Program"
    fill
    className="object-cover"
    priority
  />
</div>
```

### Step 4: Add Share Buttons Component

Create `web/app/conditions/[condition]/ShareButtons.tsx`:

```tsx
'use client';

export default function ShareButtons({ url, title, description }: { 
  url: string; 
  title: string; 
  description: string 
}) {
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${title}\n${url}`)}`;
  const emailUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${description}\n\n${url}`)}`;

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title, text: description, url });
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copied!');
    }
  };

  return (
    <div className="bg-blue-50 p-6 rounded-lg mb-6 border border-blue-200">
      <h3 className="font-bold text-blue-900 mb-3">📤 Share This Page</h3>
      <div className="flex flex-wrap gap-3">
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="...">
          📱 WhatsApp
        </a>
        <a href={emailUrl} className="...">📧 Email</a>
        <button onClick={handleShare} className="...">🔗 Copy Link</button>
      </div>
    </div>
  );
}
```

### Step 5: Add MedicalCondition Schema

```tsx
<script
  id="[condition]-schema"
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "MedicalCondition",
      "name": "[Condition Name]",
      "description": "[Medical description]",
      "url": "https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com/conditions/[condition]",
      "image": "https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com/images/[image].jpg",
      "provider": {
        "@type": "Person",
        "name": "Dr. Muddu Surendra Nehru, MD",
        "url": "https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com/about"
      }
    })
  }}
/>
```

---

## 🎯 How Sharing Works

### When Shared via Email:
1. Receiver clicks link → Opens **only that condition page**
2. Minimal navigation (Back to Home, About)
3. No full website header/footer
4. Focused content for that condition

### When Shared on Social Media:
1. **Facebook/LinkedIn**: Shows Open Graph image + title + description
2. **WhatsApp**: Shows preview card with image
3. **Twitter**: Shows large image card
4. **Email**: Shows preview in Gmail/Outlook

### Share Button Functions:
- **WhatsApp**: Opens WhatsApp with pre-filled message
- **Email**: Opens email client with subject & body
- **Copy Link**: Copies URL (or uses native share on mobile)

---

## 📸 Image Requirements

### Recommended Specifications:
- **Size**: 1200x630px (Open Graph standard)
- **Format**: JPG or PNG
- **File Size**: < 1MB (for fast loading)
- **Content**: Should represent the condition/treatment

### Current Images Used:
- Diabetes: `90dayhealthtracker1.jpg`
- PCOS: `pcos-reversal-anita-hyderabad.jpg.png`

---

## ✅ Testing Checklist

### Local Testing:
1. ✅ Visit `http://localhost:3002/conditions/diabetes`
2. ✅ Check image loads correctly
3. ✅ Test share buttons (WhatsApp, Email, Copy)
4. ✅ Verify Open Graph tags (use [Meta Tags Preview](https://metatags.io/))

### Social Media Testing:
1. **Facebook Debugger**: https://developers.facebook.com/tools/debug/
2. **Twitter Card Validator**: https://cards-dev.twitter.com/validator
3. **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/

### Email Testing:
1. Send link to yourself via Gmail
2. Check preview card appears
3. Click link → Verify standalone page loads

---

## 🚀 Next Steps

### To Add More Condition Pages:

1. **Copy template** from `diabetes/page.tsx` or `pcos/page.tsx`
2. **Update metadata** with condition-specific info
3. **Add condition image** to `web/public/images/`
4. **Update schema** with condition name/description
5. **Test locally** before pushing

### Example: Adding Obesity Page

```typescript
// web/app/conditions/obesity/page.tsx
export const metadata: Metadata = {
  title: "Obesity Treatment & Weight Loss | Dr. Muddu Nehru, MD",
  description: "...",
  openGraph: {
    images: [{
      url: "https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com/images/obesity-treatment.jpg",
      // ...
    }],
  },
};
```

---

## 📊 Current Status

| Page | Status | Image | Share Buttons | Schema |
|------|--------|-------|---------------|--------|
| `/conditions/diabetes` | ✅ Complete | ✅ Added | ✅ Added | ✅ Added |
| `/conditions/pcos` | ✅ Complete | ✅ Added | ✅ Added | ✅ Added |

---

## 💡 Pro Tips

1. **Image Optimization**: Use Next.js Image component for automatic optimization
2. **Unique Images**: Each condition should have its own image for better social sharing
3. **Test Before Sharing**: Always test Open Graph previews before sharing publicly
4. **Update Schema**: Keep MedicalCondition schema accurate for SEO
5. **Mobile First**: Share buttons work best on mobile devices

---

## 🔗 Useful Tools

- **Open Graph Preview**: https://metatags.io/
- **Facebook Debugger**: https://developers.facebook.com/tools/debug/
- **Twitter Card Validator**: https://cards-dev.twitter.com/validator
- **Schema Validator**: https://validator.schema.org/

---

**Result**: Each condition page is now:
- ✅ Shareable via WhatsApp, Email, Social Media
- ✅ Shows beautiful preview cards when shared
- ✅ Standalone design (minimal navigation)
- ✅ Includes images and proper metadata
- ✅ SEO-optimized with MedicalCondition schema
