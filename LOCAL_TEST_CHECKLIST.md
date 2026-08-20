# ✅ Local Testing Checklist

## 🚀 Server Status

- ✅ **Frontend:** Running on http://localhost:3002
- ✅ **Backend:** Check http://localhost:5000/api/health

---

## 📋 Visual Checks to Verify

### 1. **Homepage - Survey Banner** (http://localhost:3002)
   - [ ] Survey banner has **purple-to-pink gradient** background (not blue)
   - [ ] Banner shows **"🎉 Get 15% Off on Your First Consultation!"** message
   - [ ] Button text says **"📊 Take the Survey - Get 15% Off"**
   - [ ] Button has purple-to-pink gradient (not solid blue)
   - [ ] Banner has purple border

### 2. **Footer - App Ecosystem Section** (scroll to bottom of homepage)
   - [ ] Section title shows **"🛠️ Use the Tools - 70% Discount"** (not "Dr Muddu's App Ecosystem")
   - [ ] Title is in teal color

### 3. **Tools Page** (http://localhost:3002/tools)
   - [ ] Page loads without errors
   - [ ] Three calculator sections visible (BMI, HOMA-IR, TyG Index)

### 4. **New Year/Pongal Banner** (top of homepage)
   - [ ] Red-to-orange gradient banner visible at very top
   - [ ] "Book Your Free Assessment" button works

---

## 🎨 Expected Colors

**Survey Banner:**
- Background: `from-purple-100 to-pink-100` (light purple to light pink)
- Border: `border-purple-300` (purple border)
- Button: `from-purple-600 to-pink-600` (darker purple to pink gradient)
- Text: Purple tones (`text-purple-900`, `text-purple-700`)

**App Ecosystem Title:**
- Text: Teal (`text-teal-400`)
- Icon: 🛠️ (tools emoji)

---

## 🔍 Quick Test URLs

1. **Homepage:** http://localhost:3002
2. **Tools Page:** http://localhost:3002/tools
3. **Backend Health:** http://localhost:5000/api/health

---

## ✅ Test Results (Automated)

- ✅ Frontend server is running
- ✅ "Use the Tools - 70% Discount" text found
- ✅ "15% Off" message found
- ✅ Purple/Pink colors detected in HTML

---

## 🐛 If Changes Not Visible

1. **Hard refresh the browser:**
   - Windows: `Ctrl + F5`
   - Or: `Ctrl + Shift + R`

2. **Check browser console:**
   - Press `F12` → Console tab
   - Look for any errors

3. **Verify files are saved:**
   - Check `web/app/page.tsx` (survey banner)
   - Check `web/app/layout.tsx` (app ecosystem title)

4. **Restart frontend server:**
   ```powershell
   # In the frontend terminal, press Ctrl+C, then:
   cd C:\Users\pc\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web
   npm run dev
   ```

