const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
require('dotenv').config();

const eventsRouter = require('./routes/events');
const newsRouter = require('./routes/news');

const app = express();
app.use(helmet());
app.use(cors());
app.use(bodyParser.json({limit: '1mb'}));

app.use('/api/events', eventsRouter);
app.use('/api/news', newsRouter);

// Simple webhook endpoint for WhatsApp bot to POST updates
app.post('/api/webhook/events', (req, res) => {
  // If you want to secure: compare req.headers['x-webhook-secret'] to process.env.WEBHOOK_SECRET
  // For demo, we just forward payload to events creation (or do updates)
  // Expect payload {action: 'create'|'update', data: {...}}
  const { action, data } = req.body;
  if(!action || !data) return res.status(400).json({error:'bad payload'});
  // naive handling: create or update
  (async () => {
    const db = require('./db');
    if(action === 'create'){
      const r = await db.query(
        `INSERT INTO events(title, description, start_time, end_time, metadata) VALUES($1,$2,$3,$4,$5) RETURNING *`,
        [data.title, data.description, data.start_time, data.end_time, data.metadata || {}]
      );
      res.json(r.rows[0]);
    } else if(action === 'update'){
      const r = await db.query(
        `UPDATE events SET title=$1, description=$2, start_time=$3, end_time=$4, metadata=$5, updated_at=now() WHERE id=$6 RETURNING *`,
        [data.title, data.description, data.start_time, data.end_time, data.metadata || {}, data.id]
      );
      res.json(r.rows[0]);
    } else {
      res.status(400).json({error:'unknown action'});
    }
  })();
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> console.log('Backend running on', PORT));
