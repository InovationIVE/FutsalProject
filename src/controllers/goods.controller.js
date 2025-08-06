import { gamePrisma } from '../utils/prisma/index.js';

//상품 등록 API controller
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
      cashAmount: newGoods.cashAmount.toString(),
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

//상품 삭제 API controller
export const deleteGoods = async (req, res) => {
  const goodsId = parseInt(req.params.goodsId, 10);

  if (isNaN(goodsId)) {
    return res.status(400).json({ message: '상품ID가 유효하지 않습니다.' });
  }
  try {
    const isExistGoods = await gamePrisma.goods.findUnique({
      where: { goodsId },
    });
    if (!isExistGoods) {
      return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
    }

    await gamePrisma.goods.delete({
      where: { goodsId },
    });

    res.status(200).json({ message: '상품이 삭제되었습니다.' });
  } catch (error) {
    console.error('상품 삭제 오류:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

//상품 수정 API controller
export const updateGoods = async (req, res) => {
  const goodsId = parseInt(req.params.id, 10);
  const { name, cashAmount } = req.body;

  if (isNaN(goodsId)) {
    return res.status(400).json({ message: '상품ID가 유효하지 않습니다.' });
  }
  if (!name && !cashAmount) {
    return res.status(400).json({ message: '수정할 name 또는 cashAmount 값을 입력해 주세요.' });
  }
  try {
    const isExistGoods = await gamePrisma.goods.findUnique({
      where: { goodsId },
    });
    if (!isExistGoods) {
      return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
    }
    const updateGoods = await gamePrisma.goods.update({
      where: { goodsId },
      data: {
        ...(name && { name }),
        ...(cashAmount && { cashAmount }),
      },
    });
    return res.status(200).json({
      message: '상품 수정이 완료되었습니다.',
      name: updateGoods.name,
      cashAmount: updateGoods.cashAmount,
    });
  } catch (error) {
    console.error('상품 수정 오류:', error);

    if (error.code === 'P2002') {
      return res.status(409).json({ message: '상품명이 존재합니다.' });
    }
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

//상품 목록 조회 API
export const getGoods = async (req, res) => {
  try {
    const goods = await gamePrisma.goods.findMany({
      select: {
        goodsId: true,
        name: true,
        cashAmount: true,
      },
    });

    if (goods.length === 0) {
      return res.status(404).json({ message: '등록된 상품이 없습니다.' });
    }

    const response = goods.map((goodsItem) => ({
      id: goodsItem.goodsId,
      name: goodsItem.name,
      cashAmount: goodsItem.cashAmount.toString(),
    }));

    return res.status(200).json(response);
  } catch (error) {
    console.error('상품 목록 조회 오류', error);
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};
