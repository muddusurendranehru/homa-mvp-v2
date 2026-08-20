# 🩺 PRD: HOMA Health – Metabolic Remission MVP

**DR. MUDDU SURENDRA NEHRU**  
**Professor of Medicine**  
📞 **09963721999**

**"Achieve metabolic disease remission in 90 days — not just manage it."**

🎓 **ATTEND OUR CLASSES • BECOME A METABOLISM SPECIALIST**

---

## 🎯 Vision

Build a mobile-friendly, 24/7 web app that helps patients achieve remission of insulin resistance, central obesity, and cardiovascular risk using:

- **4 core biomarkers:** HOMA-IR, TYG Index, Waist, HbA1c
- **4 daily habits:** Nutrition (1800–2000 kcal), Sleep (7–8h), Steps (10K), Medicines
- **5-patient pilot → scale to 10,000**

---

## 👥 Team & Roles

- **You:** Developer, owner, investor → build app, manage Neon DB
- **Health Manager:** Interprets data, adjusts protocols
- **Reception/Phlebotomist:** Collects blood, logs labs
- **Nurse:** Measures waist/BP, patient education
- **Chemist:** Dispenses supplements

✅ **No personal trainers or full-time nutritionists** (use curated videos + template protocols)

---

## 📱 App Structure (5 Pages)

| Page | Purpose | URL |
|------|---------|-----|
| **1. Landing Page** | Explain OKR: "Achieve metabolic disease remission in 90 days" | `/` |
| **2. Auth (Sign Up / Login)** | Email + password only (no phone) → redirect to `/assessment` after signup, `/dashboard` after login if assessment exists | `/auth` |
| **3. Health Assessment Form** | Collect full clinical profile (labs, meds, waist, etc.) | `/assessment` |
| **4. Dashboard** | Show 4 speedometer gauges + daily habit tracker | `/dashboard` |
| **5. Follow-Up & Testimonials** | Progress over time + patient stories | `/follow-up` |

✅ **Mobile-first** (Tailwind CSS)  
✅ **After login → redirect to `/assessment` (if new) or `/dashboard` (if exists)**

---

## 🔐 Authentication Flow

- **Sign Up:** Full Name, Email, Password, Confirm Password
- **Login:** Email + Password
- **Data Storage:** User credentials and profile data are stored securely in Neon PostgreSQL database
- **On success:**
  - If `patient_assessments` exists → go to `/dashboard`
  - Else → go to `/assessment`

✅ **No redirect bugs** — use Next.js App Router server actions

