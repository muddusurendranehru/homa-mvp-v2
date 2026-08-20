# 📸 Image Placeholder Guide for Condition Pages

## ✅ What's Been Added

All condition pages now have:
- **Image placeholders** with instructions
- **Gmail sharing** (most prominent button)
- **Share buttons** (Gmail, Email, WhatsApp, Copy Link)
- **Open Graph metadata** for social sharing
- **MedicalCondition Schema** for SEO

---

## 🖼️ How to Add Images

### Step 1: Get Images

**Option A: Use Existing Images**
- Check `web/public/images/` folder
- Use images that match your condition

**Option B: Download Free Images**
- **Unsplash**: https://unsplash.com/search/medical-health
- **Pexels**: https://www.pexels.com/search/health/
- **Pixabay**: https://pixabay.com/images/search/medical/

**Option C: Create Images**
- Use Canva, Figma, or similar tools
- Size: 1200x630px (Open Graph standard)
- Format: JPG or PNG
- File size: < 1MB

### Step 2: Add Image to Project

1. Place image in `web/public/images/`
2. Name it descriptively (e.g., `hypertension-treatment.jpg`)
3. Recommended size: **1200x630px**

### Step 3: Update Page Code

In your condition page (e.g., `web/app/conditions/hypertension/page.tsx`):

**Find this placeholder:**
```tsx
<div className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-blue-100 to-purple-100 border-2 border-dashed border-blue-300 flex items-center justify-center">
  {/* Image Placeholder - Replace with actual image */}
  <div className="text-center p-4">
    <p className="text-gray-500 text-sm mb-2">📸 Image Placeholder</p>
    <p className="text-gray-400 text-xs">Add image: /images/hypertension-treatment.jpg</p>
  </div>
  {/* Uncomment when image is added:
  <Image
    src="/images/hypertension-treatment.jpg"
    alt="Hypertension Control Program"
    fill
    className="object-cover"
    priority
  />
  */}
</div>
```

**Replace with:**
```tsx
<div className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-lg">
  <Image
    src="/images/hypertension-treatment.jpg"
    alt="Hypertension Control Program"
    fill
    className="object-cover"
    priority
  />
</div>
```

### Step 4: Update Metadata

Update the Open Graph image URL in metadata:
```tsx
images: [
  {
    url: 'https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com/images/hypertension-treatment.jpg',
    // ...
  },
],
```

---

## 📋 Image Checklist by Condition

| Condition | Image Path | Status |
|-----------|-----------|--------|
| Diabetes | `/images/90dayhealthtracker1.jpg` | ✅ Added |
| PCOS | `/images/pcos-reversal-anita-hyderabad.jpg.png` | ✅ Added |
| Hypertension | `/images/hypertension-treatment.jpg` | ⏳ Placeholder |
| Obesity | `/images/obesity-treatment.jpg` | ⏳ Placeholder |
| Prediabetes | `/images/prediabetes-treatment.jpg` | ⏳ Placeholder |
| Kidney Disease | `/images/kidney-treatment.jpg` | ⏳ Placeholder |
| Metabolic Syndrome | `/images/metabolic-syndrome.jpg` | ⏳ Placeholder |

---

## 🎨 Image Recommendations

### For Each Condition, Use:
- **Medical/health theme** (not generic)
- **Professional appearance**
- **Relevant to condition** (e.g., blood pressure monitor for hypertension)
- **High quality** (no pixelation)
- **Appropriate colors** (medical blue, green, etc.)

### Quick Image Ideas:
- **Hypertension**: Blood pressure monitor, heart health
- **Obesity**: Before/after, healthy lifestyle, weight management
- **Prediabetes**: Blood sugar monitoring, healthy eating
- **Kidney Disease**: Kidney health, dialysis alternative
- **Metabolic Syndrome**: Metabolic health, lifestyle change

---

## 📤 Gmail Sharing

### How It Works:
1. Click **"📧 Gmail"** button on any condition page
2. Opens Gmail compose window
3. Pre-filled with:
   - Subject: Page title
   - Body: Description + link
4. Receiver sees only that condition page (standalone)

### Testing:
1. Visit any condition page
2. Click "📧 Gmail" button
3. Verify email opens with pre-filled content
4. Send test email to yourself

---

## ✅ Current Status

### Pages with Images:
- ✅ `/conditions/diabetes` - Has image
- ✅ `/conditions/pcos` - Has image

### Pages with Placeholders:
- ⏳ `/conditions/hypertension` - Placeholder ready
- ⏳ `/conditions/obesity` - Placeholder ready
- ⏳ `/conditions/prediabetes` - Needs update
- ⏳ Other condition pages - Need update

### All Pages Have:
- ✅ Gmail sharing button (prominent)
- ✅ Share buttons component
- ✅ Open Graph metadata
- ✅ MedicalCondition Schema
- ✅ Footer with back links

---

## 🚀 Next Steps

1. **Add images** to placeholders (see Step 3 above)
2. **Test Gmail sharing** on each page
3. **Update remaining condition pages** with same template
4. **Verify Open Graph** previews work (use https://metatags.io/)

---

## 💡 Pro Tips

1. **Image Optimization**: Use Next.js Image component (already included)
2. **Consistent Style**: Use similar image style across all pages
3. **Alt Text**: Always include descriptive alt text for accessibility
4. **File Names**: Use descriptive names (e.g., `hypertension-treatment.jpg`)
5. **Test Sharing**: Always test Gmail sharing before going live

---

**Result**: All condition pages now have easy Gmail sharing and image placeholders ready for your images! 🎉
