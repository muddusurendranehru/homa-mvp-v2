const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

// GET /api/gallery - Get all gallery images (public)
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM gallery_images ORDER BY "order" ASC'
    );
    res.json({ images: result.rows });
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    res.status(500).json({ error: 'Failed to fetch gallery images' });
  }
});

// POST /api/gallery - Create new gallery image (protected)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { filename, alt, caption, order, is_cover } = req.body;

    if (!filename || !alt || !caption) {
      return res.status(400).json({ error: 'filename, alt, and caption are required' });
    }

    // Get max order if not provided
    let imageOrder = order;
    if (imageOrder === undefined || imageOrder === null) {
      const maxOrderResult = await pool.query(
        'SELECT COALESCE(MAX("order"), 0) as max_order FROM gallery_images'
      );
      imageOrder = maxOrderResult.rows[0].max_order + 1;
    }

    const result = await pool.query(
      `INSERT INTO gallery_images (filename, alt, caption, "order", is_cover)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [filename, alt, caption, imageOrder, is_cover || false]
    );

    res.status(201).json({ image: result.rows[0] });
  } catch (error) {
    console.error('Error creating gallery image:', error);
    res.status(500).json({ error: 'Failed to create gallery image' });
  }
});

// PUT /api/gallery/:id - Update gallery image (protected)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { filename, alt, caption, order, is_cover } = req.body;

    const updates = [];
    const values = [];
    let paramCount = 1;

    if (filename !== undefined) {
      updates.push(`filename = $${paramCount++}`);
      values.push(filename);
    }
    if (alt !== undefined) {
      updates.push(`alt = $${paramCount++}`);
      values.push(alt);
    }
    if (caption !== undefined) {
      updates.push(`caption = $${paramCount++}`);
      values.push(caption);
    }
    if (order !== undefined) {
      updates.push(`"order" = $${paramCount++}`);
      values.push(order);
    }
    if (is_cover !== undefined) {
      updates.push(`is_cover = $${paramCount++}`);
      values.push(is_cover);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    values.push(id);
    const result = await pool.query(
      `UPDATE gallery_images 
       SET ${updates.join(', ')}
       WHERE id = $${paramCount}
       RETURNING *`,
      values
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Gallery image not found' });
    }

    res.json({ image: result.rows[0] });
  } catch (error) {
    console.error('Error updating gallery image:', error);
    res.status(500).json({ error: 'Failed to update gallery image' });
  }
});

// DELETE /api/gallery/:id - Delete gallery image (protected)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM gallery_images WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Gallery image not found' });
    }

    res.json({ message: 'Gallery image deleted', image: result.rows[0] });
  } catch (error) {
    console.error('Error deleting gallery image:', error);
    res.status(500).json({ error: 'Failed to delete gallery image' });
  }
});

// POST /api/gallery/reorder - Reorder images (protected)
router.post('/reorder', authenticateToken, async (req, res) => {
  try {
    const { updates } = req.body; // Array of { id, order }

    if (!Array.isArray(updates) || updates.length === 0) {
      return res.status(400).json({ error: 'updates array is required' });
    }

    // Update each image's order
    const promises = updates.map(({ id, order }) =>
      pool.query('UPDATE gallery_images SET "order" = $1 WHERE id = $2', [order, id])
    );

    await Promise.all(promises);

    res.json({ message: 'Images reordered successfully' });
  } catch (error) {
    console.error('Error reordering gallery images:', error);
    res.status(500).json({ error: 'Failed to reorder gallery images' });
  }
});

// POST /api/gallery/:id/set-cover - Set cover image (protected)
router.post('/:id/set-cover', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // First, unset all covers
    await pool.query('UPDATE gallery_images SET is_cover = false');

    // Then set the new cover
    const result = await pool.query(
      'UPDATE gallery_images SET is_cover = true WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Gallery image not found' });
    }

    res.json({ image: result.rows[0] });
  } catch (error) {
    console.error('Error setting cover image:', error);
    res.status(500).json({ error: 'Failed to set cover image' });
  }
});

module.exports = router;

