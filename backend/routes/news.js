const express = require('express');
const router = express.Router();
const db = require('../db');

// Basic CRUD for news
router.get('/', async (req, res) => {
  const result = await db.query('SELECT * FROM news ORDER BY published_at DESC');
  res.json(result.rows);
});

router.post('/', async (req, res) => {
  const { title, body, tags, published_at } = req.body;
  const result = await db.query(
    `INSERT INTO news(title, body, tags, published_at) VALUES($1,$2,$3,$4) RETURNING *`,
    [title, body, tags || [], published_at || new Date()]
  );
  res.status(201).json(result.rows[0]);
});

module.exports = router;
