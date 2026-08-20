# 🌐 Browser Testing Steps - Complete Guide

## ✅ Pre-Check: Both Servers Running

### Terminal 1: Backend
```powershell
cd C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server
npm run dev
```
**Output should show:** ✅ Server running on port 5000

### Terminal 2: Frontend
```powershell
cd C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web
npm run dev
```
**Output should show:** ✓ Ready in X.Xs

---

## 📊 Step-by-Step Browser Testing

### Step 1: Open Browser
1. Open **Chrome** or **Edge**
2. Go to: **http://localhost:3000**
3. Should see: "Reverse Metabolic Disease in 90 Days"

---

### Step 2: Create Account
1. Click **"Start Your Assessment"** button
2. Click **"Create Account"** tab
3. Fill form:
   ```
   Name:     Dr Test Patient
   Email:    drtest@homa.com
   Phone:    9876543210
   Password: test123
   Confirm:  test123
   ```
4. Click **"Create Account"**
5. Should redirect to → `/assessment` page

---

### Step 3: Fill Assessment Form (IMPORTANT!)

**⚠️ For HOMA-IR and TyG to calculate, you MUST fill these fields:**

#### Section 1: Basic Information
- Age: **45**
- Gender: **Female**

#### Section 2: Body Metrics
- Height: **165** cm
- Weight: **75** kg
- Waist: **95** cm *(required)*

#### Section 3: Blood Sugar & Insulin ⭐ IMPORTANT
- **FBS:** **120** mg/dL ← Required for both formulas
- **Fasting Insulin:** **15** μU/mL ← Required for HOMA-IR
- HbA1c: **6.5** %

#### Section 4: Lipid Panel ⭐ IMPORTANT
- **Triglycerides:** **180** mg/dL ← Required for TyG Index
- HDL: **45** mg/dL
- LDL: **140** mg/dL

#### Section 5: Medical History (optional)
- Current Medications: (leave blank or add text)
- Past Procedures: (leave blank or add text)

---

### Step 4: Submit and View Dashboard
1. Click **"Save & Go to Dashboard"**
2. Wait for redirect to `/dashboard`

---

## 📊 What You Should See on Dashboard

### If You Filled All Fields Correctly:

#### HOMA-IR Card:
```
HOMA-IR
4.44
Significant Insulin Resistance
```

**Calculation:** (120 × 15) / 405 = 4.44 ✅

#### TyG Index Card:
```
TyG Index
9.29
Insulin Resistance
```

**Calculation:** ln[(180 × 120) / 2] = ln[10800] = 9.29 ✅

#### BMI Card:
```
BMI
27.5
Overweight
```

**Calculation:** 75 / (1.65)² = 27.5 ✅

#### Waist Card:
```
Waist Circumference
95 cm (RED background)
⚠ High Risk
```

Color: RED (because >90 cm) ✅

---

## ❌ If You See "N/A" Instead

### HOMA-IR shows "N/A"?
**Missing:** FBS or Fasting Insulin
- ✅ Go back to `/assessment`
- ✅ Fill **FBS** and **Fasting Insulin**
- ✅ Submit again

### TyG Index shows "N/A"?
**Missing:** FBS or Triglycerides
- ✅ Go back to `/assessment`
- ✅ Fill **FBS** and **Triglycerides**
- ✅ Submit again

### BMI shows "N/A"?
**Missing:** Height or Weight
- ✅ Go back to `/assessment`
- ✅ Fill **Height** and **Weight**
- ✅ Submit again

---

## 🔍 Debugging in Browser

### Open Browser Console (F12)

#### 1. Check for Errors
```
Press F12 → Console tab
Look for red errors
```

#### 2. Check Network Requests
```
Press F12 → Network tab
Click "XHR" filter
Look for:
  - POST /api/assessments (when submitting)
  - GET /api/assessments/latest (when loading dashboard)
```

#### 3. Check Response Data
```
In Network tab:
  1. Click on "latest" request
  2. Click "Response" tab
  3. Should see JSON with:
     - homa_ir: 4.44
     - tyg_index: 9.29
     - bmi: 27.5
```

#### 4. Check localStorage
```
In Console tab, type:
localStorage.getItem('token')

Should show a JWT token string
```

---

## 🧪 Test Backend Directly

### Test Backend Health
Open in browser: **http://localhost:5000/api/health**

**Should show:**
```json
{
  "status": "ok",
  "timestamp": "...",
  "database": "connected"
}
```

---

## 📋 Complete Test Checklist

### Before Testing:
- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] No errors in either terminal

### Account Creation:
- [ ] Landing page loads
- [ ] Can click "Start Your Assessment"
- [ ] Can create account
- [ ] Redirects to `/assessment`

### Assessment Form:
- [ ] Fill Age: 45
- [ ] Fill Gender: Female
- [ ] Fill Height: 165 cm
- [ ] Fill Weight: 75 kg
- [ ] Fill Waist: 95 cm ⭐
- [ ] Fill FBS: 120 ⭐
- [ ] Fill Fasting Insulin: 15 ⭐
- [ ] Fill Triglycerides: 180 ⭐
- [ ] Fill HbA1c: 6.5
- [ ] Click "Save & Go to Dashboard"

### Dashboard Display:
- [ ] HOMA-IR shows 4.44 (not N/A)
- [ ] TyG Index shows 9.29 (not N/A)
- [ ] BMI shows 27.5 (not N/A)
- [ ] Waist shows 95 cm with RED background
- [ ] Daily habits checkboxes work
- [ ] Logout button works

---

## 🎯 Expected Formulas

### With Test Data:
```
FBS = 120 mg/dL
Fasting Insulin = 15 μU/mL
Triglycerides = 180 mg/dL
Height = 165 cm
Weight = 75 kg
Waist = 95 cm
```

### Results:
```
HOMA-IR = (120 × 15) / 405 = 4.44 ✅
TyG Index = ln[(180 × 120) / 2] = 9.29 ✅
BMI = 75 / (1.65)² = 27.5 ✅
WHtR = 95 / 165 = 0.576 ✅
```

---

## 💡 Quick Test (Copy-Paste)

### 1. Open Browser
```
http://localhost:3000
```

### 2. Create Account
```
Name: Dr Test
Email: test@homa.com
Phone: 9876543210
Password: test123
```

### 3. Fill Assessment (Key Fields Only)
```
Waist: 95
Height: 165
Weight: 75
FBS: 120
Fasting Insulin: 15
Triglycerides: 180
HbA1c: 6.5
Age: 45
Gender: Female
```

### 4. Check Dashboard
```
HOMA-IR: Should show 4.44
TyG: Should show 9.29
BMI: Should show 27.5
Waist: Should show 95 (RED)
```

---

## 📞 Still Not Working?

### Check Backend Logs
Look in Terminal 1 (backend) for errors when submitting assessment.

### Check Frontend Logs
Look in Terminal 2 (frontend) for compilation errors.

### Check Browser Console (F12)
Look for JavaScript errors or failed network requests.

---

**Dr. Muddu Surendra Nehru**  
📱 09963721999

**Follow these steps exactly and the formulas should calculate!** 🚀

