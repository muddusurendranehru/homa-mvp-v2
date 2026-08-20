const express = require('express');
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');
const { calculateMetrics } = require('../utils/calculations');

const router = express.Router();

// All assessment routes require authentication
router.use(authenticateToken);

/**
 * POST /api/assessments
 * Create a new assessment for the current user
 */
router.post('/', async (req, res) => {
  const userId = req.user.userId;
  const {
    age,
    gender,
    height_cm,
    weight_kg,
    waist_cm,
    bp_systolic,
    bp_diastolic,
    fbs,
    fasting_insulin,
    post_lunch_bs,
    hba1c,
    total_cholesterol,
    hdl,
    ldl,
    triglycerides,
    vldl,
    current_meds,
    procedures,
    post_menopausal
  } = req.body;

  try {
    // Insert assessment and get patient name
    const result = await pool.query(
      `INSERT INTO patient_assessments (
        user_id, age, gender, height_cm, weight_kg, waist_cm,
        bp_systolic, bp_diastolic,
        fbs, fasting_insulin, post_lunch_bs, hba1c,
        total_cholesterol, hdl, ldl, triglycerides, vldl,
        current_meds, procedures, post_menopausal, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, NOW())
      RETURNING *`,
      [
        userId, age, gender, height_cm, weight_kg, waist_cm,
        bp_systolic, bp_diastolic,
        fbs, fasting_insulin, post_lunch_bs, hba1c,
        total_cholesterol, hdl, ldl, triglycerides, vldl,
        current_meds, procedures, post_menopausal
      ]
    );

    const assessment = result.rows[0];

    // Get patient name
    const userResult = await pool.query(
      'SELECT name FROM users WHERE id = $1',
      [userId]
    );
    const patient_name = userResult.rows[0]?.name || 'Unknown';

    // Calculate metabolic metrics
    const metrics = calculateMetrics(assessment);

    res.status(201).json({
      message: 'Assessment created successfully',
      assessment: {
        ...assessment,
        patient_name,
        ...metrics  // Flatten metrics
      }
    });

  } catch (error) {
    console.error('Create assessment error:', error);
    res.status(500).json({ 
      error: 'Internal server error while creating assessment' 
    });
  }
});

/**
 * GET /api/assessments/latest
 * Get the most recent assessment for the current user
 */
router.get('/latest', async (req, res) => {
  const userId = req.user.userId;

  try {
    // JOIN with users table to get patient name
    const result = await pool.query(
      `SELECT 
        pa.*,
        u.name as patient_name
       FROM patient_assessments pa
       JOIN users u ON pa.user_id = u.id
       WHERE pa.user_id = $1 
       ORDER BY pa.created_at DESC 
       LIMIT 1`,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ 
        message: 'No assessments found for this user' 
      });
    }

    const assessment = result.rows[0];
    const metrics = calculateMetrics(assessment);

    // Flatten the response for easier frontend consumption
    res.json({
      assessment: {
        ...assessment,
        ...metrics  // Merge calculated metrics directly
      }
    });

  } catch (error) {
    console.error('Get latest assessment error:', error);
    res.status(500).json({ 
      error: 'Internal server error while fetching assessment' 
    });
  }
});

/**
 * GET /api/assessments/history
 * Get all assessments for the current user (chronological order)
 */
router.get('/history', async (req, res) => {
  const userId = req.user.userId;

  try {
    // JOIN with users table to get patient name
    const result = await pool.query(
      `SELECT 
        pa.*,
        u.name as patient_name
       FROM patient_assessments pa
       JOIN users u ON pa.user_id = u.id
       WHERE pa.user_id = $1 
       ORDER BY pa.created_at DESC`,
      [userId]
    );

    // Calculate metrics for each assessment and flatten
    const assessmentsWithMetrics = result.rows.map(assessment => ({
      ...assessment,
      ...calculateMetrics(assessment)  // Merge metrics directly
    }));

    res.json({
      count: assessmentsWithMetrics.length,
      assessments: assessmentsWithMetrics
    });

  } catch (error) {
    console.error('Get assessment history error:', error);
    res.status(500).json({ 
      error: 'Internal server error while fetching assessment history' 
    });
  }
});

module.exports = router;

