# 🧪 Quick Testing Guide

## ✅ Step 4: Test & Deploy

### 1. Start Frontend Server

```powershell
cd web
npm run dev
```

Server will start on: **http://localhost:3002**

---

### 2. Test Pages in Browser

Visit each page and verify:

#### ✅ Diabetes Page
- **URL**: http://localhost:3002/conditions/diabetes
- [ ] Page loads without errors
- [ ] Image loads (`90dayhealthtracker1.jpg`)
- [ ] Share buttons visible
- [ ] Footer links work

#### ✅ PCOS Page
- **URL**: http://localhost:3002/conditions/pcos
- [ ] Page loads without errors
- [ ] Image loads (`pcos-reversal-anita-hyderabad.jpg.png`)
- [ ] Share buttons visible
- [ ] Footer links work

#### ✅ Obesity Page
- **URL**: http://localhost:3002/conditions/obesity
- [ ] Page loads without errors
- [ ] Image placeholder visible (or actual image)
- [ ] Share buttons visible
- [ ] Footer links work

#### ✅ Hypertension Page
- **URL**: http://localhost:3002/conditions/hypertension
- [ ] Page loads without errors
- [ ] Image placeholder visible (or actual image)
- [ ] Share buttons visible
- [ ] Footer links work

---

### 3. Test Share Buttons

For each page, test:

#### 📧 Gmail Button
1. Click "📧 Gmail" button
2. Verify Gmail compose opens
3. Check:
   - [ ] Subject is pre-filled
   - [ ] Body contains description + URL
   - [ ] URL is correct

#### 📨 Email Button
1. Click "📨 Email" button
2. Verify default email client opens
3. Check:
   - [ ] Subject and body are pre-filled

#### 📱 WhatsApp Button
1. Click "📱 WhatsApp" button
2. Verify WhatsApp opens
3. Check:
   - [ ] Message is pre-filled

#### 🔗 Copy Link Button
1. Click "🔗 Copy Link" button
2. Verify shows "✅ Copied!"
3. Paste in notepad
4. Check:
   - [ ] URL is correct

---

### 4. Verify Schema.org (JSON-LD)

#### Method 1: View Page Source
1. Right-click page → "View Page Source"
2. Search for: `"@type": "MedicalCondition"`
3. Verify:
   - [ ] Schema is present
   - [ ] JSON is valid
   - [ ] All fields present

#### Method 2: Google Rich Results Test
1. Visit: https://search.google.com/test/rich-results
2. Enter production URL (after deploy):
   - `https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com/conditions/diabetes`
3. Click "Test URL"
4. Verify:
   - [ ] No errors
   - [ ] MedicalCondition schema detected

---

### 5. Test Open Graph (Social Sharing)

#### LinkedIn Post Inspector
1. Visit: https://www.linkedin.com/post-inspector/
2. Enter production URL (after deploy)
3. Click "Inspect"
4. Verify:
   - [ ] Image preview appears
   - [ ] Title is correct
   - [ ] Description is correct

#### Facebook Sharing Debugger
1. Visit: https://developers.facebook.com/tools/debug/
2. Enter production URL
3. Click "Debug"
4. Verify:
   - [ ] og:title appears
   - [ ] og:description appears
   - [ ] og:image appears

#### Meta Tags Preview
1. Visit: https://metatags.io/
2. Enter production URL
3. Verify preview card shows:
   - [ ] Correct image
   - [ ] Correct title
   - [ ] Correct description

---

## 🚀 After Testing

Once all tests pass:

1. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: add condition pages with sharing and schema"
   git push
   ```

2. **Deploy to Render**
   - Changes will auto-deploy
   - Wait for deployment to complete

3. **Test Production URLs**
   - Visit: https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com/conditions/diabetes
   - Test all share buttons
   - Verify Open Graph on production

---

## 📋 Testing Checklist

| Test | Diabetes | PCOS | Obesity | Hypertension |
|------|----------|------|---------|--------------|
| Page Loads | ⬜ | ⬜ | ⬜ | ⬜ |
| Image Loads | ⬜ | ⬜ | ⬜ | ⬜ |
| Gmail Share | ⬜ | ⬜ | ⬜ | ⬜ |
| Email Share | ⬜ | ⬜ | ⬜ | ⬜ |
| WhatsApp Share | ⬜ | ⬜ | ⬜ | ⬜ |
| Copy Link | ⬜ | ⬜ | ⬜ | ⬜ |
| Schema Valid | ⬜ | ⬜ | ⬜ | ⬜ |
| Open Graph | ⬜ | ⬜ | ⬜ | ⬜ |

---

## 🐛 Troubleshooting

### Pages Not Loading?
- Check if server is running: `npm run dev` in `web/` folder
- Check port: Should be 3002
- Check browser console for errors

### Share Buttons Not Working?
- Check browser console for errors
- Verify ShareButtons component is imported
- Check prop names match

### Schema Not Detected?
- Verify schema is in `<script>` tag
- Check JSON is valid
- Use JSON validator online

### Open Graph Not Showing?
- Verify metadata is exported
- Check image URL is absolute (full URL)
- Clear Facebook/LinkedIn cache

---

**Result**: All condition pages ready for testing! 🎉
