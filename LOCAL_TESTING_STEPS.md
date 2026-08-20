# 🧪 Local Testing Steps for Condition Pages

## ✅ Step-by-Step Testing Guide

### Prerequisites
- ✅ Frontend server running on port 3002
- ✅ Backend server running on port 5000
- ✅ Images added to `web/public/images/`

---

## 📋 Step 1: Test Page Accessibility

Open each condition page in your browser:

### Test URLs:
1. **Diabetes**: http://localhost:3002/conditions/diabetes
2. **PCOS**: http://localhost:3002/conditions/pcos
3. **Obesity**: http://localhost:3002/conditions/obesity
4. **Hypertension**: http://localhost:3002/conditions/hypertension
5. **Prediabetes**: http://localhost:3002/conditions/prediabetes
6. **Kidney Disease**: http://localhost:3002/conditions/kidney-disease

**Check for each page:**
- [ ] Page loads without errors
- [ ] No console errors (F12 → Console tab)
- [ ] Layout looks correct
- [ ] Footer links work

---

## 🖼️ Step 2: Verify Images Load

### For Each Condition Page:

1. **Check Image is Visible**
   - [ ] Image appears on the page
   - [ ] Image is properly sized
   - [ ] Image is not broken (no placeholder or error icon)

2. **Check Image in DevTools**
   - Open DevTools (F12)
   - Go to Network tab
   - Refresh page
   - Look for image requests:
     - [ ] Image file loads (Status 200)
     - [ ] No 404 errors
     - [ ] Image loads quickly

3. **Check Image Path**
   - Right-click image → "Inspect"
   - Verify `src` attribute matches:
     - Diabetes: `/images/90dayhealthtracker1.jpg`
     - PCOS: `/images/pcos-metabolic-reversal.jpg`
     - Obesity: `/images/obesity-reversal-hyderabad.jpg`
     - Hypertension: `/images/hypertension-remission-gachibowli.jpg`
     - Prediabetes: `/images/prediabetes-reversal-hyderabad.jpg`
     - Kidney Disease: `/images/ckd-insulin-resistance-hyderabad.jpg`

---

## 📤 Step 3: Test Share Buttons

### For Each Page, Test:

1. **Gmail Button (📧 Gmail)**
   - [ ] Click button
   - [ ] Gmail compose window opens
   - [ ] Subject is pre-filled
   - [ ] Body contains description + URL

2. **Email Button (📨 Email)**
   - [ ] Click button
   - [ ] Default email client opens
   - [ ] Subject and body are pre-filled

3. **WhatsApp Button (📱 WhatsApp)**
   - [ ] Click button
   - [ ] WhatsApp opens (web or app)
   - [ ] Message is pre-filled

4. **Copy Link Button (🔗 Copy Link)**
   - [ ] Click button
   - [ ] Shows "✅ Copied!" message
   - [ ] Paste in notepad - URL is correct

---

## 🔍 Step 4: Verify Schema.org (JSON-LD)

### For Each Page:

1. **View Page Source**
   - Right-click page → "View Page Source"
   - Search for: `"@type": "MedicalCondition"`
   - [ ] Schema is present
   - [ ] JSON is valid
   - [ ] All fields present

2. **Check Schema Content**
   - [ ] `name`: Condition name
   - [ ] `description`: Medical description
   - [ ] `url`: Correct page URL
   - [ ] `image`: Image URL matches
   - [ ] `provider`: Dr. Muddu's info

---

## 🎨 Step 5: Visual Check

### For Each Page:

1. **Layout**
   - [ ] Hero section looks good
   - [ ] Image is properly positioned
   - [ ] Text is readable
   - [ ] Share buttons are visible

2. **Responsive Design**
   - [ ] Resize browser window
   - [ ] Page looks good on mobile size
   - [ ] Images scale properly
   - [ ] Share buttons are accessible

---

## 🐛 Troubleshooting

### Image Not Loading?

**Check:**
1. Image file exists in `web/public/images/`
2. Filename matches exactly (case-sensitive)
3. File extension is correct (.jpg or .png)
4. Browser cache - try hard refresh (Ctrl+F5)

**Fix:**
- Verify image path in page code
- Check browser console for 404 errors
- Ensure image is in `web/public/images/` folder

### Share Buttons Not Working?

**Check:**
1. Browser console for errors
2. ShareButtons component is imported
3. Props are passed correctly

**Fix:**
- Check console for JavaScript errors
- Verify ShareButtons component exists
- Check prop names match

### Schema Not Showing?

**Check:**
1. View page source
2. Schema is before `</body>` tag
3. JSON is valid

**Fix:**
- Use JSON validator online
- Check for syntax errors
- Ensure all quotes are properly escaped

---

## ✅ Quick Test Checklist

| Page | Loads | Image | Gmail | Schema |
|------|-------|-------|-------|--------|
| Diabetes | ⬜ | ⬜ | ⬜ | ⬜ |
| PCOS | ⬜ | ⬜ | ⬜ | ⬜ |
| Obesity | ⬜ | ⬜ | ⬜ | ⬜ |
| Hypertension | ⬜ | ⬜ | ⬜ | ⬜ |
| Prediabetes | ⬜ | ⬜ | ⬜ | ⬜ |
| Kidney Disease | ⬜ | ⬜ | ⬜ | ⬜ |

---

## 🚀 After Testing

Once all tests pass:

1. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: uncomment image components for all condition pages"
   git push
   ```

2. **Deploy to Production**
   - Changes will auto-deploy on Render
   - Wait for deployment to complete

3. **Test Production URLs**
   - Visit production URLs
   - Verify images load
   - Test share buttons
   - Verify Open Graph previews

---

## 📊 Expected Results

### ✅ All Pages Should:
- Load without errors
- Display images correctly
- Have working share buttons
- Include valid Schema.org markup
- Be responsive on mobile

### ✅ Images Should:
- Load from `/images/[filename].jpg`
- Display at correct size
- Have proper alt text
- Load quickly (< 2 seconds)

### ✅ Share Buttons Should:
- Open correct apps/clients
- Pre-fill content correctly
- Copy URLs accurately

---

**Result**: All condition pages tested and ready! 🎉
