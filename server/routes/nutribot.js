const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

// GET /api/nutribot/tokens - Get user's remaining tokens
router.get('/tokens', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT nutri_tokens_remaining, nutri_tokens_purchased FROM users WHERE id = $1',
      [req.user.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { nutri_tokens_remaining, nutri_tokens_purchased } = result.rows[0];
    
    res.json({
      tokens_remaining: nutri_tokens_remaining || 10,
      tokens_purchased: nutri_tokens_purchased || 0,
      is_free_tier: (nutri_tokens_purchased || 0) === 0
    });
  } catch (error) {
    console.error('Error fetching tokens:', error);
    res.status(500).json({ error: 'Failed to fetch tokens' });
  }
});

// POST /api/nutribot/use-token - Use one token for a query
router.post('/use-token', authenticateToken, async (req, res) => {
  try {
    // Check current tokens
    const checkResult = await pool.query(
      'SELECT nutri_tokens_remaining FROM users WHERE id = $1',
      [req.user.userId]
    );

    if (checkResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const currentTokens = checkResult.rows[0].nutri_tokens_remaining || 10;

    if (currentTokens <= 0) {
      return res.status(403).json({ 
        error: 'No tokens remaining',
        tokens_remaining: 0,
        needs_recharge: true
      });
    }

    // Deduct one token
    const updateResult = await pool.query(
      `UPDATE users 
       SET nutri_tokens_remaining = nutri_tokens_remaining - 1 
       WHERE id = $1 
       RETURNING nutri_tokens_remaining`,
      [req.user.userId]
    );

    res.json({
      success: true,
      tokens_remaining: updateResult.rows[0].nutri_tokens_remaining,
      message: 'Token used successfully'
    });
  } catch (error) {
    console.error('Error using token:', error);
    res.status(500).json({ error: 'Failed to use token' });
  }
});

// POST /api/nutribot/recharge - Add tokens after payment
router.post('/recharge', authenticateToken, async (req, res) => {
  try {
    const { tokens_to_add = 100, payment_id } = req.body;

    // In production, verify payment_id with Stripe/Razorpay here
    // For now, we trust the request (admin will manually verify)

    const result = await pool.query(
      `UPDATE users 
       SET nutri_tokens_remaining = COALESCE(nutri_tokens_remaining, 0) + $1,
           nutri_tokens_purchased = COALESCE(nutri_tokens_purchased, 0) + $1
       WHERE id = $2 
       RETURNING nutri_tokens_remaining, nutri_tokens_purchased`,
      [tokens_to_add, req.user.id]
    );

    res.json({
      success: true,
      tokens_remaining: result.rows[0].nutri_tokens_remaining,
      tokens_purchased: result.rows[0].nutri_tokens_purchased,
      message: `${tokens_to_add} tokens added successfully`
    });
  } catch (error) {
    console.error('Error recharging tokens:', error);
    res.status(500).json({ error: 'Failed to recharge tokens' });
  }
});

module.exports = router;

