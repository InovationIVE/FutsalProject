import express from 'express';
import { gamePrisma } from '../utils/prisma/index.js';
const router = express.Router();

router.post('/admin/gacha', async (req, res) => {
  try {
    const gachaData = req.body;
    if (!gachaData) {
      return res.status(400).json({ error: '가챠 데이터가 없습니다' });
    }

    // TODO: gachaData를 이용한 로직 처리 구현

  } catch (error) {
    console.error('Error fetching gacha data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
