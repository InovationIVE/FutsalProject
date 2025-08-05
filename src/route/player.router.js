import express from 'express';
import { gamePrisma } from '../utils/prisma';
const router = express.Router();

router.get('/admin/players', async (req, res) => {
  try {
    const playerData = req.body;
    if (!playerData) {
      return res.status(400).json({ error: '선수 데이터가 없습니다' });
    }

    res.status(200).json({ data: {playerData} })

  } catch (error) {
    console.error('Error fetching Player data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});