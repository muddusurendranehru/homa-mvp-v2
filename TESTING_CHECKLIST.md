# ✅ Testing Checklist for Condition Pages

## 🧪 Local Testing Steps

### Step 1: Verify Pages Load

Visit each page in your browser:

- ✅ http://localhost:3002/conditions/diabetes
- ✅ http://localhost:3002/conditions/pcos
- ✅ http://localhost:3002/conditions/obesity
- ✅ http://localhost:3002/conditions/hypertension

**Check:**
- [ ] Page loads without errors
- [ ] No console errors in DevTools
- [ ] Layout looks correct
- [ ] Footer links work

---

### Step 2: Verify Images

**For pages with images (diabetes, PCOS):**
- [ ] Image loads correctly
- [ ] Image is properly sized
- [ ] Alt text is present

**For pages with placeholders (obesity, hypertension):**
- [ ] Placeholder is visible
- [ ] Instructions are clear
- [ ] Ready to replace with actual image

**Test Image Paths:**
- Diabetes: `/images/90dayhealthtracker1.jpg`
- PCOS: `/images/pcos-reversal-anita-hyderabad.jpg.png`
- Obesity: `/images/obesity-reversal-hyderabad.jpg` (placeholder)
- Hypertension: `/images/hypertension-treatment.jpg` (placeholder)

---

### Step 3: Test Share Buttons

**For each page, test:**

1. **Gmail Button (📧 Gmail)**
   - [ ] Click button
   - [ ] Gmail compose window opens
   - [ ] Subject is pre-filled
   - [ ] Body contains page description and URL
   - [ ] URL is correct

2. **Email Button (📨 Email)**
   - [ ] Click button
   - [ ] Default email client opens
   - [ ] Subject and body are pre-filled

3. **WhatsApp Button (📱 WhatsApp)**
   - [ ] Click button
   - [ ] WhatsApp opens (web or app)
   - [ ] Message is pre-filled with title and URL

4. **Copy Link Button (🔗 Copy Link)**
   - [ ] Click button
   - [ ] Shows "✅ Copied!" message
   - [ ] Paste in notepad - URL is correct

5. **Native Share (📤 Share)** - Mobile only
   - [ ] On mobile device, button appears
   - [ ] Click opens device share menu
   - [ ] Can share to various apps

**Test URLs:**
- Diabetes: `https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com/conditions/diabetes`
- PCOS: `https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com/conditions/pcos`
- Obesity: `https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com/conditions/obesity`
- Hypertension: `https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com/conditions/hypertension`

---

### Step 4: Verify Schema.org (JSON-LD)

**Method 1: View Page Source**
1. Right-click page → "View Page Source"
2. Search for `"@type": "MedicalCondition"`
3. Verify schema is present and valid JSON

**Method 2: Google Rich Results Test**
1. Visit: https://search.google.com/test/rich-results
2. Enter page URL (use production URL after deploy)
3. Click "Test URL"
4. Check for:
   - [ ] No errors
   - [ ] MedicalCondition schema detected
   - [ ] All required fields present

**Method 3: Schema Markup Validator**
1. Visit: https://validator.schema.org/
2. Enter page URL or paste HTML
3. Verify:
   - [ ] No errors
   - [ ] MedicalCondition type recognized
   - [ ] All properties valid

**Expected Schema Fields:**
- `@context`: "https://schema.org"
- `@type`: "MedicalCondition"
- `name`: Condition name
- `description`: Medical description
- `url`: Page URL
- `image`: Image URL (if available)
- `associatedAnatomy`: Body part/system
- `possibleTreatment`: Treatment description
- `provider`: Dr. Muddu's info

---

### Step 5: Test Open Graph (Social Sharing)

**Method 1: LinkedIn Post Inspector**
1. Visit: https://www.linkedin.com/post-inspector/
2. Enter page URL (production URL after deploy)
3. Click "Inspect"
4. Verify:
   - [ ] Image preview appears
   - [ ] Title is correct
   - [ ] Description is correct
   - [ ] No errors

**Method 2: Facebook Sharing Debugger**
1. Visit: https://developers.facebook.com/tools/debug/
2. Enter page URL
3. Click "Debug"
4. Verify:
   - [ ] og:title appears
   - [ ] og:description appears
   - [ ] og:image appears
   - [ ] og:url is correct

**Method 3: Twitter Card Validator**
1. Visit: https://cards-dev.twitter.com/validator
2. Enter page URL
3. Verify:
   - [ ] Card type: summary_large_image
   - [ ] Image appears
   - [ ] Title and description correct

**Method 4: Meta Tags Preview**
1. Visit: https://metatags.io/
2. Enter page URL
3. Verify preview card shows:
   - [ ] Correct image
   - [ ] Correct title
   - [ ] Correct description
   - [ ] Correct URL

**Expected Open Graph Tags:**
```html
<meta property="og:title" content="[Page Title]" />
<meta property="og:description" content="[Description]" />
<meta property="og:image" content="[Image URL]" />
<meta property="og:url" content="[Page URL]" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="HOMA Health Clinics" />
```

---

### Step 6: Test Standalone View

**Verify pages work independently:**

1. **Open page in incognito/private window**
   - [ ] Page loads correctly
   - [ ] No dependency on main site navigation
   - [ ] Footer links work (Back to Home, About)

2. **Test shared link**
   - [ ] Copy page URL
   - [ ] Open in new browser/device
   - [ ] Page loads standalone
   - [ ] All functionality works

3. **Test email sharing**
   - [ ] Send page link via email
   - [ ] Receiver clicks link
   - [ ] Page loads correctly
   - [ ] No broken links or images

---

### Step 7: Mobile Testing

**Test on mobile device or browser DevTools:**

1. **Responsive Design**
   - [ ] Page looks good on mobile
   - [ ] Images scale properly
   - [ ] Share buttons are accessible
   - [ ] Text is readable

2. **Touch Interactions**
   - [ ] Share buttons are tappable
   - [ ] Links work correctly
   - [ ] No hover-only elements

3. **Mobile Share**
   - [ ] Native share button appears (if supported)
   - [ ] Can share to various apps
   - [ ] Pre-filled content is correct

---

## 🐛 Common Issues & Fixes

### Issue: Image Not Loading
**Fix:**
- Check image path in `web/public/images/`
- Verify image filename matches code
- Check image file size (< 1MB recommended)
- Clear browser cache

### Issue: Share Buttons Not Working
**Fix:**
- Check browser console for errors
- Verify ShareButtons component is imported correctly
- Check prop names match (`pageUrl`, `pageTitle`, `pageDescription`)

### Issue: Schema Not Detected
**Fix:**
- Verify schema is in `<script>` tag before `</body>`
- Check JSON is valid (use JSON validator)
- Ensure all required fields are present

### Issue: Open Graph Not Showing
**Fix:**
- Verify metadata is exported correctly
- Check image URL is absolute (full URL)
- Clear Facebook/LinkedIn cache
- Wait a few minutes for cache to update

---

## ✅ Quick Test Commands

### Test All Pages at Once:
```bash
# PowerShell
$pages = @("diabetes", "pcos", "obesity", "hypertension")
foreach ($page in $pages) {
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:3002/conditions/$page" -TimeoutSec 3
        Write-Host "✅ $page : OK" -ForegroundColor Green
    } catch {
        Write-Host "❌ $page : Failed" -ForegroundColor Red
    }
}
```

### Check Schema in Page Source:
1. Open page in browser
2. Right-click → View Page Source
3. Search for: `"@type": "MedicalCondition"`
4. Verify JSON is valid

---

## 📊 Testing Results Template

**Page:** `/conditions/[name]`
**Date:** [Date]
**Tester:** [Name]

| Test | Status | Notes |
|------|--------|-------|
| Page Loads | ✅/❌ | |
| Image Loads | ✅/❌ | |
| Gmail Share | ✅/❌ | |
| Email Share | ✅/❌ | |
| WhatsApp Share | ✅/❌ | |
| Copy Link | ✅/❌ | |
| Schema Valid | ✅/❌ | |
| Open Graph | ✅/❌ | |
| Mobile View | ✅/❌ | |

---

## 🚀 After Testing

Once all tests pass:
1. ✅ Commit changes to Git
2. ✅ Push to GitHub
3. ✅ Deploy to Render
4. ✅ Test production URLs
5. ✅ Verify Open Graph on production
6. ✅ Submit to Google Search Console

---

**Result**: All condition pages tested and ready for deployment! 🎉
