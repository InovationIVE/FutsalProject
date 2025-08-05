import express from 'express';
import { gamePrisma } from '../utils/prisma/index.js';
import { userPrisma } from '../utils/prisma/index.js';

const router = express.Router();

/* 가챠 카드 등록 */
router.post('/admin/gacha', async (req, res) => {
  try {
    const { cardName, price } = req.body;

    if (!cardName || !price) {
      return res.status(400).json({ error: '가챠 입력 데이터가 부족합니다.' });
    }

    const existingGacha = await gamePrisma.gacha.findFirst({
      where: { cardName },
    });

    if (existingGacha) {
      return res.status(400).json({ error: '이미 존재하는 가챠입니다' });
    }

    await gamePrisma.gacha.create({
      data: {
        cardName,
        price,
      },
    });

    return res.status(201).json({ message: '가챠카드가 성공적으로 생성되었습니다' });
  } catch (error) {
    console.error('Error fetching gacha data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/* 가챠 카드 조회 */
router.get('/gacha', async (req, res) => {
  try {
    const gachaCards = await gamePrisma.gacha.findMany({
      select: {
        gachaId: true,
        cardName: true,
        price: true,
      },
    });
    return res.status(200).json(gachaCards);
  } catch (error) {
    console.error('Error fetching gacha data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/* 가챠 카드 수정 */
router.patch('/admin/gacha/:gachaId', async (req, res) => {
  try {
    const { gachaId } = req.params;
    const { cardName, price } = req.body;
    if (!cardName && !price) {
      return res.status(400).json({ error: '가챠 입력 데이터가 부족합니다.' });
    }

    const existingGacha = await gamePrisma.gacha.findUnique({
      where: { gachaId: parseInt(gachaId) },
    });

    if (!existingGacha) {
      return res.status(404).json({ error: '존재하지 않는 가챠입니다' });
    }

    await gamePrisma.gacha.update({
      where: { gachaId: parseInt(gachaId) },
      data: {
        cardName,
        price,
      },
    });

    return res.status(200).json({ message: '가챠카드가 성공적으로 수정되었습니다' });
  } catch (error) {
    console.error('Error updating gacha data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


/* 가챠 카드 삭제 */
router.delete('/admin/gacha/:gachaId', async (req, res) => {
    try {
        const { gachaId } = req.params;
    
        const existingGacha = await gamePrisma.gacha.findUnique({
        where: { gachaId: parseInt(gachaId) },
        });
    
        if (!existingGacha) {
        return res.status(404).json({ error: '존재하지 않는 가챠입니다' });
        }
    
        await gamePrisma.gacha.delete({
        where: { gachaId: parseInt(gachaId) },
        });
    
        return res.status(200).json({ message: '가챠카드가 성공적으로 삭제되었습니다' });
    } catch (error) {
        console.error('Error deleting gacha data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/* 가챠 뽑기 */
router.post('/gacha/draw', async (req, res) => {
    try {
        const { userId } = req.body;
    
        if (!userId) {
        return res.status(400).json({ error: '사용자 ID가 필요합니다.' });
        }
    
        const gachaCards = await gamePrisma.gacha.findMany();
        if (gachaCards.length === 0) {
        return res.status(404).json({ error: '가챠 카드가 없습니다.' });
        }
    
        const randomIndex = Math.floor(Math.random() * gachaCards.length);
        const drawnCard = gachaCards[randomIndex];
    
        // 여기서 사용자에게 가챠 카드를 지급하는 로직을 추가할 수 있습니다.
        // 예: await gamePrisma.userGacha.create({ data: { userId, gachaId: drawnCard.gachaId } });
    
        return res.status(200).json({ message: '가챠 뽑기가 성공했습니다', card: drawnCard });
    } catch (error) {
        console.error('Error drawing gacha:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
