const express = require('express');
const router = express.Router();
const db = require('../db');

// Basic CRUD for events
router.get('/', async (req, res) => {
  const result = await db.query('SELECT * FROM events ORDER BY start_time DESC');
  res.json(result.rows);
});

router.get('/:id', async (req, res) => {
  const result = await db.query('SELECT * FROM events WHERE id=$1', [req.params.id]);
  if (result.rowCount === 0) return res.status(404).json({error:'Not found'});
  res.json(result.rows[0]);
});

router.post('/', async (req, res) => {
  // create event
  const { title, description, start_time, end_time, metadata } = req.body;
  const result = await db.query(
    `INSERT INTO events(title, description, start_time, end_time, metadata) VALUES($1,$2,$3,$4,$5) RETURNING *`,
    [title, description, start_time, end_time, metadata || {}]
  );
  res.status(201).json(result.rows[0]);
});

router.put('/:id', async (req, res) => {
  const { title, description, start_time, end_time, metadata } = req.body;
  const result = await db.query(
    `UPDATE events SET title=$1, description=$2, start_time=$3, end_time=$4, metadata=$5, updated_at=now() WHERE id=$6 RETURNING *`,
    [title, description, start_time, end_time, metadata || {}, req.params.id]
  );
  res.json(result.rows[0]);
});

router.delete('/:id', async (req, res) => {
  await db.query('DELETE FROM events WHERE id=$1', [req.params.id]);
  res.json({deleted: true});
});

module.exports = router;
