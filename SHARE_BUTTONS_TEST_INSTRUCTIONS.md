# Share Buttons Test Instructions

## What Was Fixed

1. **Created ShareButton Component** (`web/components/ShareButtons.tsx`)
   - Supports WhatsApp, Facebook, Twitter, LinkedIn sharing
   - Copy link functionality
   - Reusable across all condition pages

2. **Merged Condition Pages**
   - Combined diabetes and hypertension pages into one optimized page
   - New page: `/conditions/diabetes-hypertension`
   - Includes all content from both pages with enhanced structure

3. **Added Share Buttons**
   - Share buttons at TOP of the page
   - Share buttons at BOTTOM of the page
   - Fully functional social media sharing

4. **Updated Navigation**
   - Updated `/conditions` listing page to use new merged page
   - Updated footer navigation in `layout.tsx` to use new merged page

5. **Added WhatsApp CTA**
   - "Book free 15-min assessment → WhatsApp 09963721999" button
   - Includes local keywords: Gachibowli, Banjara Hills, ISB, IIIT

## Testing Steps

### 1. Test ShareButton Component

```bash
# Navigate to the new merged page
http://localhost:3000/conditions/diabetes-hypertension
```

**Verify:**
- Share buttons appear at TOP of the page (below header, before H1)
- Share buttons appear at BOTTOM of the page (above footer)
- All 5 buttons are visible: WhatsApp, Facebook, Twitter, LinkedIn, Copy Link

### 2. Test WhatsApp Share Button

**Steps:**
1. Click "💬 WhatsApp" button
2. Verify WhatsApp opens with pre-filled message
3. Message should include page title and URL

**Expected:** WhatsApp app/web opens with share text

### 3. Test Facebook Share Button

**Steps:**
1. Click "📘 Facebook" button
2. Verify Facebook share dialog opens
3. URL should be pre-filled with page URL

**Expected:** Facebook share dialog opens in new tab

### 4. Test Twitter Share Button

**Steps:**
1. Click "🐦 Twitter" button
2. Verify Twitter compose window opens
3. Tweet should include page title and URL

**Expected:** Twitter compose window opens in new tab

### 5. Test LinkedIn Share Button

**Steps:**
1. Click "💼 LinkedIn" button
2. Verify LinkedIn share dialog opens
3. URL should be pre-filled

**Expected:** LinkedIn share dialog opens in new tab

### 6. Test Copy Link Button

**Steps:**
1. Click "🔗 Copy Link" button
2. Verify alert shows "Link copied to clipboard!"
3. Paste (Ctrl+V) in a text field
4. Verify URL is correct: `http://localhost:3000/conditions/diabetes-hypertension`

**Expected:** Link copied successfully, can paste correct URL

### 7. Test WhatsApp CTA Button

**Steps:**
1. Scroll to WhatsApp CTA section (green box with "Free Risk Assessment")
2. Click "💬 Book free 15-min assessment → WhatsApp 09963721999"
3. Verify WhatsApp opens with message: "Book free 15-min assessment"

**Expected:** WhatsApp opens with pre-filled message

### 8. Test Navigation Links

**Steps:**
1. Go to `/conditions` page
2. Click on "Diabetes + Hypertension" card
3. Verify it navigates to `/conditions/diabetes-hypertension`

**Expected:** Navigation works correctly

### 9. Test Footer Navigation

**Steps:**
1. Scroll to footer on any page
2. Click "🩺 Diabetes + Hypertension" link
3. Verify it navigates to `/conditions/diabetes-hypertension`

**Expected:** Footer link works correctly

### 10. Test Local Keywords

**Verify the page contains:**
- "Gachibowli" (multiple times)
- "Hyderabad" (multiple times)
- "Banjara Hills"
- "ISB"
- "IIIT"
- "09963721999" (phone number)

### 11. Test Page Content

**Verify merged content includes:**
- Combined H1 title mentioning both diabetes and hypertension
- Intro paragraph mentioning both conditions
- Patient stats (500,000+ patients, 85% success rate)
- Doctor bio (Dr. Muddu Surendra Nehru, MD - 32+ years)
- Educational sections explaining why both conditions go together
- 90-day journey visual
- Success story
- Benefits section

## Common Issues & Solutions

### Issue: Share buttons not appearing

**Solution:**
- Check browser console for errors
- Verify `ShareButtons.tsx` component exists in `web/components/`
- Verify import path: `import ShareButtons from '@/components/ShareButtons';`

### Issue: Copy link not working

**Solution:**
- Check if browser supports Clipboard API
- Try in Chrome/Firefox/Edge (modern browsers)
- Check browser console for errors

### Issue: WhatsApp button not opening

**Solution:**
- Verify WhatsApp is installed on device
- Check if URL format is correct: `https://wa.me/?text=...`
- Test on mobile device for native app opening

### Issue: Navigation link broken

**Solution:**
- Verify file exists: `web/app/conditions/diabetes-hypertension/page.tsx`
- Check Next.js server is running
- Clear Next.js cache: `rm -rf .next` and restart server

## Browser Compatibility

**Tested on:**
- Chrome/Edge (Chromium)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

**Share functionality:**
- WhatsApp: Works on mobile (native app) and desktop (web)
- Facebook: Works on all browsers
- Twitter: Works on all browsers
- LinkedIn: Works on all browsers
- Copy Link: Works on modern browsers (requires Clipboard API)

## Production Testing

Before deploying to production:

1. **Test share URLs in production:**
   - Verify `window.location.origin` works correctly
   - Share URLs should use production domain, not localhost

2. **Test on mobile devices:**
   - WhatsApp share should open native app
   - All buttons should be easily tappable

3. **Test SEO:**
   - Verify page title and meta description include keywords
   - Check local keywords are present in content

## Files Changed

1. `web/components/ShareButtons.tsx` (NEW - created)
2. `web/app/conditions/diabetes-hypertension/page.tsx` (NEW - created)
3. `web/app/conditions/page.tsx` (UPDATED - navigation link)
4. `web/app/layout.tsx` (UPDATED - footer navigation link)

## Notes

- Share buttons are client-side components (`'use client'`)
- Copy link uses modern Clipboard API (may not work in older browsers)
- WhatsApp sharing works best on mobile devices (native app)
- All share buttons open in new tabs/windows (target="_blank")
- Page is statically generated (`export const dynamic = 'force-static'`) for SEO
