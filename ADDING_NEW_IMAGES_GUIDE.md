# 📸 Guide: Adding New Images to Condition Pages

## ✅ Quick Steps After Adding an Image

### Step 1: Add Image File
1. Place your image in: `web/public/images/`
2. Use descriptive filename: `[condition]-[outcome]-[location].jpg`
3. Recommended size: **1200x630px**
4. File size: **< 1MB**

**Example:**
```
web/public/images/obesity-reversal-hyderabad.jpg
```

---

### Step 2: Update Page Code

Open the condition page file: `web/app/conditions/[condition-name]/page.tsx`

#### Find the Image Component Section:

Look for this pattern (around line 54-70):

```tsx
<div className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-lg">
  <Image
    src="/images/[old-filename].jpg"
    alt="[Description]"
    fill
    className="object-cover"
    priority
  />
</div>
```

#### Update the Image Path:

Change `src="/images/[old-filename].jpg"` to match your new image:

```tsx
<Image
  src="/images/obesity-reversal-hyderabad.jpg"  // ← Update this
  alt="Obesity Reversal Program"
  fill
  className="object-cover"
  priority
/>
```

---

### Step 3: Update Metadata (3 places)

Update the image URL in **3 locations** in the same file:

#### Location 1: Open Graph Images (around line 14-20)

```tsx
openGraph: {
  images: [
    {
      url: 'https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com/images/obesity-reversal-hyderabad.jpg',  // ← Update
      width: 1200,
      height: 630,
      alt: 'Obesity Reversal Program',
    },
  ],
},
```

#### Location 2: Twitter Card Images (around line 25-30)

```tsx
twitter: {
  images: ['https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com/images/obesity-reversal-hyderabad.jpg'],  // ← Update
},
```

#### Location 3: Schema.org Image (around line 130-140)

```tsx
<script
  id="[condition]-schema"
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "MedicalCondition",
      "name": "Obesity",
      "image": "https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com/images/obesity-reversal-hyderabad.jpg",  // ← Update
      // ... rest of schema
    })
  }}
/>
```

---

### Step 4: Test Locally

1. **Start server** (if not running):
   ```powershell
   cd web
   npm run dev
   ```

2. **Visit page in browser**:
   - http://localhost:3002/conditions/[condition-name]

3. **Check image loads**:
   - [ ] Image appears on page
   - [ ] No broken image icon
   - [ ] Image is properly sized
   - [ ] No console errors (F12 → Console)

4. **Check DevTools Network tab**:
   - Open DevTools (F12)
   - Go to Network tab
   - Refresh page
   - Look for image request:
     - [ ] Status: 200 (success)
     - [ ] No 404 errors

---

### Step 5: Verify All References

Use **Find & Replace** in your editor to update all occurrences:

**Search for:** `[old-filename].jpg`
**Replace with:** `[new-filename].jpg`

**Make sure to update:**
- ✅ Image component `src` attribute
- ✅ Open Graph `url` in metadata
- ✅ Twitter Card `images` array
- ✅ Schema.org `image` field

---

## 🔍 Quick Checklist

After adding a new image:

- [ ] Image file saved to `web/public/images/`
- [ ] Filename matches exactly (case-sensitive)
- [ ] Image component `src` updated
- [ ] Open Graph image URL updated
- [ ] Twitter Card image URL updated
- [ ] Schema.org image URL updated
- [ ] Tested locally - image loads
- [ ] No console errors
- [ ] Image displays correctly

---

## 🐛 Common Issues & Fixes

### Issue: Image Not Loading (404 Error)

**Possible Causes:**
1. Filename mismatch (case-sensitive)
2. Wrong file extension (.jpg vs .png)
3. Image not in `web/public/images/` folder
4. Double extension (e.g., `.jpg.jpg`)

**Fix:**
- Check exact filename in folder
- Verify path in code matches exactly
- Check file extension
- Clear browser cache (Ctrl+F5)

### Issue: Image Shows But Wrong Size

**Fix:**
- Resize image to 1200x630px
- Use image editing tool (Photoshop, Canva, etc.)
- Maintain aspect ratio

### Issue: Image Too Large (Slow Loading)

**Fix:**
- Compress image (< 1MB)
- Use online tools: TinyPNG, Squoosh
- Optimize for web

### Issue: Double Extension (.jpg.jpg)

**If your file is:** `obesity-reversal-hyderabad.jpg.jpg`

**Update code to:**
```tsx
src="/images/obesity-reversal-hyderabad.jpg.jpg"
```

**Or rename file to:** `obesity-reversal-hyderabad.jpg`

---

## 📋 Example: Adding Obesity Image

### Step 1: Add File
```
web/public/images/obesity-reversal-hyderabad.jpg
```

### Step 2: Update `web/app/conditions/obesity/page.tsx`

**Find:**
```tsx
<Image
  src="/images/obesity-reversal-hyderabad.jpg"
  alt="Obesity remission success - Hyderabad patient"
  fill
  className="object-cover"
  priority
/>
```

**Already correct!** ✅

**Update Open Graph:**
```tsx
images: [
  {
    url: 'https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com/images/obesity-reversal-hyderabad.jpg',
    // ...
  },
],
```

**Update Twitter:**
```tsx
images: ['https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com/images/obesity-reversal-hyderabad.jpg'],
```

**Update Schema:**
```tsx
"image": "https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com/images/obesity-reversal-hyderabad.jpg",
```

### Step 3: Test
- Visit: http://localhost:3002/conditions/obesity
- Verify image loads
- Check DevTools Network tab

---

## 🚀 After Testing

Once image loads correctly:

1. **Commit Changes:**
   ```bash
   git add web/app/conditions/[condition-name]/page.tsx
   git add web/public/images/[image-name].jpg
   git commit -m "feat: add image for [condition] page"
   git push
   ```

2. **Deploy:**
   - Changes auto-deploy on Render
   - Wait for deployment

3. **Test Production:**
   - Visit production URL
   - Verify image loads
   - Test Open Graph preview (use https://metatags.io/)

---

## 💡 Pro Tips

1. **Consistent Naming**: Use pattern: `[condition]-[outcome]-[location].jpg`
2. **File Size**: Keep images < 1MB for fast loading
3. **Dimensions**: Use 1200x630px for Open Graph standard
4. **Alt Text**: Always include descriptive alt text for accessibility
5. **Test First**: Always test locally before deploying

---

## 📝 Quick Reference

**File Location:**
```
web/public/images/[your-image].jpg
```

**Update in 4 Places:**
1. Image component `src` (line ~60)
2. Open Graph `url` (line ~16)
3. Twitter Card `images` (line ~29)
4. Schema.org `image` (line ~130)

**Test URL:**
```
http://localhost:3002/conditions/[condition-name]
```

---

**Result**: You now know exactly what to do when adding new images! 🎉
