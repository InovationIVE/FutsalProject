import { gamePrisma } from '../utils/prisma/index.js';

export const registGoods = async (req, res) => {
  const { name, cashAmount } = req.body;

  if (!name || !cashAmount) {
    return res.status(400).json({ message: 'name과 cashAmount는 필수입니다.' });
  }
  try {
    const newGoods = await gamePrisma.goods.create({
      data: {
        name,
        cashAmount,
      },
    });
    const response = {
      id: newGoods.goodsId,
      name: newGoods.name,
      cash_amount: newGoods.cashAmount.toString(),
    };
    res.status(201).json(response);
  } catch (error) {
    console.error('상품 등록 오류:', error);

    if (error.code === 'P2002') {
      return res.status(409).json({ message: '상품명이 존재합니다.' });
    }
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};
