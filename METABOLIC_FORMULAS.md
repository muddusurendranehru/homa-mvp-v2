# 🧮 Metabolic Health Formulas

## 1. HOMA-IR (Homeostatic Model Assessment for Insulin Resistance)

### Formula:
```
HOMA-IR = (FBS × Fasting Insulin) / 405
```

### Parameters:
- **FBS** = Fasting Blood Sugar (mg/dL)
- **Fasting Insulin** = Fasting Insulin (μU/mL)

### Example:
```
FBS = 120 mg/dL
Fasting Insulin = 15 μU/mL

HOMA-IR = (120 × 15) / 405
        = 1800 / 405
        = 4.44
```

### Interpretation:
| HOMA-IR Value | Interpretation |
|---------------|----------------|
| < 1.0 | Optimal Insulin Sensitivity |
| 1.0 - 1.9 | Normal Insulin Sensitivity |
| 2.0 - 2.4 | Early Insulin Resistance |
| ≥ 2.5 | Significant Insulin Resistance |

---

## 2. TyG Index (Triglyceride-Glucose Index)

### Formula:
```
TyG Index = ln[(Triglycerides × FBS) / 2]
```

### Parameters:
- **Triglycerides** = Triglycerides (mg/dL)
- **FBS** = Fasting Blood Sugar (mg/dL)
- **ln** = Natural logarithm (base e)

### Example:
```
Triglycerides = 180 mg/dL
FBS = 120 mg/dL

TyG Index = ln[(180 × 120) / 2]
          = ln[21600 / 2]
          = ln[10800]
          = 9.29
```

### Interpretation:
| TyG Index | Interpretation |
|-----------|----------------|
| < 8.0 | Normal |
| 8.0 - 8.8 | Borderline Insulin Resistance |
| > 8.8 | Insulin Resistance |

### Clinical Significance:
- TyG Index is a **surrogate marker** for insulin resistance
- Useful when fasting insulin is **not available**
- Strong predictor of cardiovascular risk

---

## 3. BMI (Body Mass Index)

### Formula:
```
BMI = Weight (kg) / [Height (m)]²
```

### Parameters:
- **Weight** = Body weight in kilograms (kg)
- **Height** = Height in meters (m)

### Example:
```
Weight = 75 kg
Height = 165 cm = 1.65 m

BMI = 75 / (1.65)²
    = 75 / 2.7225
    = 27.5 kg/m²
```

### Interpretation (WHO Classification):
| BMI Range | Category |
|-----------|----------|
| < 18.5 | Underweight |
| 18.5 - 24.9 | Normal weight |
| 25.0 - 29.9 | Overweight |
| 30.0 - 34.9 | Obese Class I |
| 35.0 - 39.9 | Obese Class II |
| ≥ 40.0 | Obese Class III (Morbid) |

---

## 📊 Implementation in Backend

### File: `server/utils/calculations.js`

```javascript
// HOMA-IR
if (fbs && fasting_insulin) {
  metrics.homa_ir = parseFloat(((fbs * fasting_insulin) / 405).toFixed(2));
}

// TyG Index
if (triglycerides && fbs) {
  metrics.tyg_index = parseFloat((Math.log(triglycerides * fbs / 2)).toFixed(2));
}

// BMI
if (height_cm && weight_kg) {
  const height_m = height_cm / 100;
  metrics.bmi = parseFloat((weight_kg / (height_m * height_m)).toFixed(2));
}
```

---

## 🎯 Clinical Application

### HOMA Clinic Protocol:
1. **Baseline Assessment (Day 0)**
   - Measure all biomarkers
   - Calculate HOMA-IR, TyG, BMI
   - Set target goals

2. **90-Day Program**
   - Track daily habits (Nutrition, Sleep, Steps, Medicines)
   - Monitor waist circumference weekly
   - Repeat labs at Day 45 and Day 90

3. **Success Criteria (Day 90)**
   - HOMA-IR reduction by 30%+
   - TyG Index < 8.8
   - BMI reduction by 5-10%
   - Waist < 80 cm (women) or < 90 cm (men)

---

## 📚 References

1. **HOMA-IR:**
   - Matthews DR, et al. (1985). Diabetologia. 28(7):412-9.
   - Reference: Homeostasis model assessment

2. **TyG Index:**
   - Simental-Mendía LE, et al. (2008). Clin Biochem. 41(7-8):575-8.
   - Reference: Triglyceride glucose index as insulin resistance marker

3. **BMI:**
   - WHO (World Health Organization)
   - Reference: BMI classification standards

---

## 💡 Additional Formulas Used

### 4. WHtR (Waist-to-Height Ratio)
```
WHtR = Waist Circumference (cm) / Height (cm)
```

**Interpretation:**
- WHtR < 0.5: Healthy
- WHtR ≥ 0.5: At Risk (central obesity)

### Example:
```
Waist = 95 cm
Height = 165 cm

WHtR = 95 / 165 = 0.576 → At Risk
```

---

**Dr. Muddu Surendra Nehru**  
Professor of Medicine  
📱 09963721999

---

**All formulas are automatically calculated by the backend API when you submit an assessment!** 🚀

