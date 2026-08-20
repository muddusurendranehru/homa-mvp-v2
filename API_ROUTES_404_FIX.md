# 🔧 API Routes 404 Error - Fix Plan

## Current Status
- ✅ Frontend: Working (Live Site)
- ✅ Backend Server: Running (Health Check)
- ❌ **API Routes: 404 ERROR** ← **NEEDS FIX**
- ✅ Database: Connected (Neon PostgreSQL)
- ✅ GitHub Repo: Full Code Present

---

## Problem Identified

### Issue 1: LeadScoringForm Not Saving to Database
**File:** `web/components/LeadScoringForm.tsx` (Line 143-144)

```typescript
// TODO: Save to Supabase/API
// await api.saveLead(leadData);
```

**Current Behavior:**
- Form calculates scores ✅
- Opens WhatsApp ✅
- **Does NOT save to Neon DB** ❌
- Just logs to console

### Issue 2: Missing Next.js API Route
**Missing File:** `web/app/api/submit-lead/route.ts`

The form needs an API route to:
1. Receive form data from frontend
2. Save to Neon DB `leads` table
3. Return success response
4. Then frontend redirects to WhatsApp

### Issue 3: API URL Configuration
**File:** `web/lib/api.ts` (Line 6)

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
```

**Problem:**
- If `NEXT_PUBLIC_API_URL` not set in Render → defaults to `localhost:5000`
- This will fail in production (404 error)

---

## Solution: Step-by-Step Fix

### Step 1: Verify Neon Database Table Schema

**In Neon Console → Your Branch → Tables:**

Check if `leads` table exists. If not, create it:

```sql
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name VARCHAR(255) NOT NULL,
  whatsapp_number VARCHAR(20),
  email VARCHAR(255),
  age INTEGER,
  gender VARCHAR(50),
  height_cm DECIMAL(5,2),
  weight_kg DECIMAL(5,2),
  waist_circumference DECIMAL(5,2),
  fasting_blood_sugar DECIMAL(5,2),
  total_cholesterol DECIMAL(5,2),
  triglycerides DECIMAL(5,2),
  weight_loss_attempts INTEGER,
  biggest_frustration TEXT[],
  investment_timeline VARCHAR(100),
  commitment_level INTEGER,
  bmi_score DECIMAL(5,2),
  tyg_index DECIMAL(5,2),
  metabolic_risk_score DECIMAL(5,2),
  lead_quality_score DECIMAL(5,2),
  submitted_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Alternative:** Use existing `patient_assessments` table if it has similar fields.

---

### Step 2: Create Next.js API Route

**New File:** `web/app/api/submit-lead/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Extract form data
    const {
      fullName,
      whatsappNumber,
      email,
      age,
      gender,
      height,
      weight,
      waistCircumference,
      fastingBloodSugar,
      totalCholesterol,
      triglycerides,
      weightLossAttempts,
      biggestFrustration,
      investmentTimeline,
      commitmentLevel,
      bmiScore,
      tygIndex,
      metabolicRiskScore,
      leadQualityScore,
    } = body;

    // Insert into leads table
    const result = await sql`
      INSERT INTO leads (
        full_name, whatsapp_number, email, age, gender,
        height_cm, weight_kg, waist_circumference,
        fasting_blood_sugar, total_cholesterol, triglycerides,
        weight_loss_attempts, biggest_frustration,
        investment_timeline, commitment_level,
        bmi_score, tyg_index, metabolic_risk_score, lead_quality_score
      ) VALUES (
        ${fullName}, ${whatsappNumber}, ${email}, ${age}, ${gender},
        ${height}, ${weight}, ${waistCircumference},
        ${fastingBloodSugar}, ${totalCholesterol}, ${triglycerides},
        ${weightLossAttempts}, ${JSON.stringify(biggestFrustration)},
        ${investmentTimeline}, ${commitmentLevel},
        ${bmiScore}, ${tygIndex}, ${metabolicRiskScore}, ${leadQualityScore}
      ) RETURNING id
    `;

    return NextResponse.json({
      success: true,
      message: 'Lead saved successfully',
      leadId: result[0].id,
    });
  } catch (error: any) {
    console.error('Error saving lead:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
```

---

### Step 3: Update LeadScoringForm to Call API

**File:** `web/components/LeadScoringForm.tsx` (Line 131-154)

**Replace:**
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const calculatedScores = calculateScores();
  setScores(calculatedScores);
  
  // Prepare data for API
  const leadData = {
    ...formData,
    ...calculatedScores,
    submittedAt: new Date().toISOString(),
  };

  // TODO: Save to Supabase/API
  // await api.saveLead(leadData);
  
  // For now, log to console and show success
  console.log('Lead Data:', leadData);
  
  // Open WhatsApp with pre-filled message
  const message = `Hi! I completed the Metabolic Evaluation.\n\nName: ${formData.fullName}\nMetabolic Risk: ${calculatedScores.metabolicRiskScore}%\nLead Quality: ${calculatedScores.leadQualityScore}%\n\nI'm ready to learn more!`;
  window.open(`https://wa.me/919963721999?text=${encodeURIComponent(message)}`, '_blank');
  
  setSubmitted(true);
};
```

**With:**
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const calculatedScores = calculateScores();
  setScores(calculatedScores);
  
  // Prepare data for API
  const leadData = {
    ...formData,
    ...calculatedScores,
    submittedAt: new Date().toISOString(),
  };

  try {
    // Save to Neon DB via Next.js API route
    const response = await fetch('/api/submit-lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadData),
    });

    const result = await response.json();
    
    if (result.success) {
      console.log('Lead saved successfully:', result.leadId);
      
      // Open WhatsApp with pre-filled message
      const message = `Hi Dr. Muddu! I completed the Metabolic Evaluation.

Name: ${formData.fullName}
Age: ${formData.age}
Metabolic Risk: ${calculatedScores.metabolicRiskScore}%
Lead Quality: ${calculatedScores.leadQualityScore}%
BMI: ${calculatedScores.bmiScore}
TyG Index: ${calculatedScores.tygIndex}

I'm interested in the 90-Day Metabolic Remission Program in Gachibowli.`;

      window.open(`https://wa.me/919963721999?text=${encodeURIComponent(message)}`, '_blank');
      setSubmitted(true);
    } else {
      console.error('Failed to save lead:', result.error);
      alert('Failed to save your information. Please try again.');
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    alert('An error occurred. Please try again.');
  }
};
```

---

### Step 4: Install Required Dependencies

**Run in `web/` directory:**
```bash
npm install @neondatabase/serverless
```

---

### Step 5: Set Environment Variables in Render

**In Render Dashboard → Your Web Service → Environment:**

Add:
```
DATABASE_URL=postgresql://[your-neon-connection-string]
```

**Important:**
- Use the exact branch connection string: `br-blue-wildflower-ahnf9ofw`
- Do NOT commit this to GitHub
- Render environment variables are secure

---

### Step 6: Update Backend API URL (If Using Separate Backend)

**If you're using the Express backend server separately:**

**In Render Dashboard → Your Web Service → Environment:**

Add:
```
NEXT_PUBLIC_API_URL=https://your-backend-render-url.onrender.com/api
```

**If backend is on same Render service, use:**
```
NEXT_PUBLIC_API_URL=/api
```

---

## Testing Checklist

After implementing fixes:

- [ ] `leads` table exists in Neon Console
- [ ] `/api/submit-lead` route created
- [ ] `@neondatabase/serverless` installed
- [ ] `DATABASE_URL` set in Render environment
- [ ] Form submission saves to Neon DB
- [ ] WhatsApp opens with pre-filled message
- [ ] No 404 errors in browser console
- [ ] Lead appears in Neon `leads` table

---

## Expected Flow After Fix

```
1. User fills LeadScoringForm
   ↓
2. Form calculates scores (BMI, TyG, Metabolic Risk, Lead Quality)
   ↓
3. Frontend calls POST /api/submit-lead
   ↓
4. Next.js API route saves to Neon DB (leads table)
   ↓
5. API returns success response
   ↓
6. Frontend opens WhatsApp with pre-filled message
   ↓
7. User sees success screen with scores
```

---

## Quick Fix Summary

**Files to Create:**
- `web/app/api/submit-lead/route.ts` (new)

**Files to Modify:**
- `web/components/LeadScoringForm.tsx` (update handleSubmit)

**Dependencies to Install:**
- `@neondatabase/serverless`

**Environment Variables to Set in Render:**
- `DATABASE_URL` (Neon connection string)

**Database:**
- Create `leads` table in Neon (if doesn't exist)

---

## Why This Fixes the 404 Error

1. **Before:** Form tried to call non-existent API → 404
2. **After:** Form calls `/api/submit-lead` → Next.js API route handles it → Saves to Neon → Returns success → WhatsApp opens

**Total Time:** ~15 minutes to implement

