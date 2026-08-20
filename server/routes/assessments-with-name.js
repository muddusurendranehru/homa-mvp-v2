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
    // Insert assessment
    const result = await pool.query(
      `INSERT INTO patient_assessments (
        user_id, age, gender, height_cm, weight_kg, waist_cm,
        fbs, fasting_insulin, post_lunch_bs, hba1c,
        total_cholesterol, hdl, ldl, triglycerides, vldl,
        current_meds, procedures, post_menopausal, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, NOW())
      RETURNING *`,
      [
        userId, age, gender, height_cm, weight_kg, waist_cm,
        fbs, fasting_insulin, post_lunch_bs, hba1c,
        total_cholesterol, hdl, ldl, triglycerides, vldl,
        current_meds, procedures, post_menopausal
      ]
    );

    const assessment = result.rows[0];

    // Get patient name from users table
    const userResult = await pool.query(
      'SELECT name, email FROM users WHERE id = $1',
      [userId]
    );

    // Calculate metabolic metrics
    const metrics = calculateMetrics(assessment);

    res.status(201).json({
      message: 'Assessment created successfully',
      assessment: {
        ...assessment,
        patient_name: userResult.rows[0].name,
        patient_email: userResult.rows[0].email,
        calculated_metrics: metrics
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
 * Get the most recent assessment for the current user WITH patient name
 */
router.get('/latest', async (req, res) => {
  const userId = req.user.userId;

  try {
    // Join with users table to get patient name
    const result = await pool.query(
      `SELECT 
        a.*,
        u.name as patient_name,
        u.email as patient_email,
        u.phone as patient_phone
       FROM patient_assessments a
       JOIN users u ON a.user_id = u.id
       WHERE a.user_id = $1 
       ORDER BY a.created_at DESC 
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

    res.json({
      assessment: {
        ...assessment,
        calculated_metrics: metrics
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
 * Get all assessments for the current user WITH patient name
 */
router.get('/history', async (req, res) => {
  const userId = req.user.userId;

  try {
    // Join with users table to get patient name
    const result = await pool.query(
      `SELECT 
        a.*,
        u.name as patient_name,
        u.email as patient_email,
        u.phone as patient_phone
       FROM patient_assessments a
       JOIN users u ON a.user_id = u.id
       WHERE a.user_id = $1 
       ORDER BY a.created_at DESC`,
      [userId]
    );

    // Calculate metrics for each assessment
    const assessmentsWithMetrics = result.rows.map(assessment => ({
      ...assessment,
      calculated_metrics: calculateMetrics(assessment)
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

