// src/pages/api/reply/write.js
import pool from '../../../app/lib/db';

export default async function handler(req, res) {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'content required' });
    }

    const [result] = await pool.execute(
      'INSERT INTO reply (regDate, updateDate, content) VALUES (NOW(), NOW(), ?)',
      [content],
    );

    res.status(200).json({ id: result.insertId });
  } catch (error) {
    console.error('Error inserting reply:', error);
    res.status(500).json({ error: 'Error inserting reply' });
  }
}
