# 📸 Image Filenames Reference

## ✅ Standardized Image Filenames for Condition Pages

All condition pages now use consistent, descriptive image filenames following this pattern:

`[condition]-[outcome]-[location].jpg`

---

## 📋 Image Filenames by Condition

| Condition | Image Filename | Status |
|-----------|---------------|--------|
| **Hypertension** | `hypertension-remission-gachibowli.jpg` | ✅ Updated |
| **Prediabetes** | `prediabetes-reversal-hyderabad.jpg` | ✅ Updated |
| **PCOS (general)** | `pcos-metabolic-reversal.jpg` | ✅ Updated |
| **Kidney Disease** | `ckd-insulin-resistance-hyderabad.jpg` | ✅ Updated |
| **Diabetes** | `90dayhealthtracker1.jpg` | ✅ Existing |
| **Obesity** | `obesity-reversal-hyderabad.jpg` | ✅ Placeholder |

---

## 📁 Image Location

All images should be placed in:
```
web/public/images/
```

**Full path example:**
```
web/public/images/hypertension-remission-gachibowli.jpg
```

---

## 🖼️ Image Specifications

### Recommended Settings:
- **Size**: 1200x630px (Open Graph standard)
- **Format**: JPG or PNG
- **File Size**: < 1MB (for fast loading)
- **Quality**: High resolution, professional

### Content Guidelines:
- 💡 **Use real patient success photos (with consent)** for maximum trust
- Professional medical/health theme
- Relevant to condition
- High quality, no pixelation
- Appropriate colors (medical blue, green, etc.)

---

## 🔄 How to Add Images

### Step 1: Get Image
- Use existing patient photos (with consent)
- Or download from free stock sites:
  - Unsplash: https://unsplash.com/search/medical-health
  - Pexels: https://www.pexels.com/search/health/
  - Pixabay: https://pixabay.com/images/search/medical/

### Step 2: Save Image
1. Save image to `web/public/images/`
2. Use the exact filename from the table above
3. Ensure size is 1200x630px (resize if needed)

### Step 3: Update Page Code
In the condition page file, uncomment the Image component:

**Find:**
```tsx
{/* Uncomment when image is added:
<Image
  src="/images/[filename].jpg"
  alt="[Description]"
  fill
  className="object-cover"
  priority
/>
*/}
```

**Replace with:**
```tsx
<Image
  src="/images/[filename].jpg"
  alt="[Description]"
  fill
  className="object-cover"
  priority
/>
```

**Remove the placeholder div:**
```tsx
{/* Remove this placeholder div */}
<div className="text-center p-4">
  <p className="text-gray-500 text-sm mb-2">📸 Image Placeholder</p>
  ...
</div>
```

---

## ✅ Current Status

### Pages with Images:
- ✅ `/conditions/diabetes` - Uses `90dayhealthtracker1.jpg`
- ✅ `/conditions/pcos` - Ready for `pcos-metabolic-reversal.jpg`

### Pages with Placeholders:
- ⏳ `/conditions/hypertension` - Ready for `hypertension-remission-gachibowli.jpg`
- ⏳ `/conditions/prediabetes` - Ready for `prediabetes-reversal-hyderabad.jpg`
- ⏳ `/conditions/kidney-disease` - Ready for `ckd-insulin-resistance-hyderabad.jpg`
- ⏳ `/conditions/obesity` - Ready for `obesity-reversal-hyderabad.jpg`

---

## 📝 Metadata Updates

All pages have been updated with:
- ✅ Open Graph image URLs
- ✅ Twitter Card image URLs
- ✅ Schema.org image URLs
- ✅ Image placeholders with instructions

**Example Open Graph:**
```tsx
images: [
  {
    url: 'https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com/images/hypertension-remission-gachibowli.jpg',
    width: 1200,
    height: 630,
    alt: 'Hypertension Control Program - Dr. Muddu Nehru, MD',
  },
],
```

---

## 🎯 Quick Checklist

When adding a new image:

- [ ] Image saved to `web/public/images/` with correct filename
- [ ] Image size is 1200x630px
- [ ] Image file size < 1MB
- [ ] Image component uncommented in page code
- [ ] Placeholder div removed
- [ ] Alt text is descriptive
- [ ] Test image loads locally
- [ ] Verify Open Graph preview works

---

## 💡 Pro Tips

1. **Consistency**: Use similar style across all condition images
2. **Consent**: Always get patient consent for photos
3. **Optimization**: Compress images before uploading
4. **Naming**: Follow the filename pattern exactly
5. **Testing**: Always test image loads before deploying

---

**Result**: All condition pages now use standardized image filenames! 🎉
