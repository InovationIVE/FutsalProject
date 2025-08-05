import express from 'express';
import { gamePrisma } from '../utils/prisma';
const router = express.Router();

router.get('/admin/gacha', async (req, res) => {
  try {
    const gachaData = req.body;
    if (!gachaData) {
      return res.status(400).json({ error: '가챠 데이터가 없습니다' });
    }
  } catch (error) {
    console.error('Error fetching gacha data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
