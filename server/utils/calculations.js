/**
 * Medical calculation helpers for metabolic assessments
 */

/**
 * Calculate BMI (Body Mass Index)
 * Formula: weight (kg) / (height (m))^2
 */
const calculateBMI = (weightKg, heightCm) => {
  if (!weightKg || !heightCm || heightCm <= 0) return null;
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  return parseFloat(bmi.toFixed(2));
};

/**
 * Calculate HOMA-IR (Homeostatic Model Assessment of Insulin Resistance)
 * Formula: (Fasting Glucose (mg/dL) × Fasting Insulin (μU/mL)) / 405
 * Normal: < 2.0
 * Insulin Resistance: > 2.5
 */
const calculateHOMAIR = (fastingGlucose, fastingInsulin) => {
  if (!fastingGlucose || !fastingInsulin) return null;
  const homaIR = (fastingGlucose * fastingInsulin) / 405;
  return parseFloat(homaIR.toFixed(2));
};

/**
 * Calculate TyG Index (Triglyceride-Glucose Index)
 * Formula: Ln[Triglycerides (mg/dL) × Fasting Glucose (mg/dL) / 2]
 * Normal: < 8.5
 * Insulin Resistance: > 8.8
 */
const calculateTyG = (triglycerides, fastingGlucose) => {
  if (!triglycerides || !fastingGlucose) return null;
  const tyg = Math.log((triglycerides * fastingGlucose) / 2);
  return parseFloat(tyg.toFixed(2));
};

/**
 * Calculate Waist-to-Height Ratio (WHtR)
 * Formula: Waist (cm) / Height (cm)
 * Healthy: < 0.5
 */
const calculateWHtR = (waistCm, heightCm) => {
  if (!waistCm || !heightCm || heightCm <= 0) return null;
  const whtr = waistCm / heightCm;
  return parseFloat(whtr.toFixed(3));
};

/**
 * Interpret HOMA-IR value
 */
const interpretHOMAIR = (homaIR) => {
  if (!homaIR) return 'Unknown';
  if (homaIR < 1.0) return 'Optimal';
  if (homaIR < 2.0) return 'Normal';
  if (homaIR < 2.9) return 'Early Insulin Resistance';
  return 'Significant Insulin Resistance';
};

/**
 * Interpret TyG Index
 */
const interpretTyG = (tyg) => {
  if (!tyg) return 'Unknown';
  if (tyg < 8.5) return 'Normal';
  if (tyg < 8.8) return 'Borderline';
  return 'Insulin Resistance';
};

/**
 * Calculate all metrics for an assessment
 */
const calculateMetrics = (assessment) => {
  const bmi = calculateBMI(assessment.weight_kg, assessment.height_cm);
  const homaIR = calculateHOMAIR(assessment.fbs, assessment.fasting_insulin);
  const tyg = calculateTyG(assessment.triglycerides, assessment.fbs);
  const whtr = calculateWHtR(assessment.waist_cm, assessment.height_cm);

  return {
    bmi,
    bmi_category: getBMICategory(bmi),
    homa_ir: homaIR,
    homa_ir_interpretation: interpretHOMAIR(homaIR),
    tyg_index: tyg,
    tyg_interpretation: interpretTyG(tyg),
    whtr,
    whtr_status: whtr && whtr < 0.5 ? 'Healthy' : 'At Risk'
  };
};

/**
 * Get BMI category
 */
const getBMICategory = (bmi) => {
  if (!bmi) return 'Unknown';
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
};

module.exports = {
  calculateBMI,
  calculateHOMAIR,
  calculateTyG,
  calculateWHtR,
  calculateMetrics,
  interpretHOMAIR,
  interpretTyG,
  getBMICategory
};

