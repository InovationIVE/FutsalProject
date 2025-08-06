import { gamePrisma } from '../utils/prisma/index.js';

/**상품 등록 API controller**/
export const registGoods = async (req, res) => {
  const { name, cashAmount } = req.body;

  /**오류 표기 : name과 cashAmount입력되지 않을 경우 400반환**/
  if (!name || !cashAmount) {
    return res.status(400).json({ message: 'name과 cashAmount는 필수입니다.' });
  }
  try {
    /**상품 등록**/
    const newGoods = await gamePrisma.goods.create({
      data: {
        name,
        cashAmount,
      },
    });

    /**클라이언트 응답 형식**/
    const response = {
      id: newGoods.goodsId,
      name: newGoods.name,
      cashAmount: newGoods.cashAmount.toString() /**문자열로 cashAmount반환**/,
    };
    /**성공응답**/
    return res.status(201).json(response);
  } catch (error) {
    console.error('상품 등록 오류:', error);

    /**고유 제약 조건 위반**/
    if (error.code === 'P2002') {
      return res.status(409).json({ message: '상품명이 존재합니다.' });
    }
    /**그 외 서버 오류**/
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

/**상품 삭제 API controller**/
export const deleteGoods = async (req, res) => {
  const goodsId = parseInt(req.params.goodsId, 10);

  /**오류 표기 : goodsId가 숫자가 아닌 경우 400반환 */
  if (isNaN(goodsId)) {
    return res.status(400).json({ message: '상품ID가 유효하지 않습니다.' });
  }
  try {
    /**상품 존재여부 확인**/
    const isExistGoods = await gamePrisma.goods.findUnique({
      where: { goodsId },
    });

    /**존재하지 않을 경우 404반환**/
    if (!isExistGoods) {
      return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
    }

    /**상품 삭제**/
    await gamePrisma.goods.delete({
      where: { goodsId },
    });

    /**성공응답**/
    res.status(200).json({ message: '상품이 삭제되었습니다.' });
  } catch (error) {
    /**그 외 서버 오류**/
    console.error('상품 삭제 오류:', error);
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

/**상품 수정 API controller**/
export const updateGoods = async (req, res) => {
  const goodsId = parseInt(req.params.goodsId, 10);
  const { name, cashAmount } = req.body;

  /**오류 표기 : goodsId가 유효하지 않을 경우 400반환**/
  if (isNaN(goodsId)) {
    return res.status(400).json({ message: '상품ID가 유효하지 않습니다.' });
  }

  /**오류 표기 : 수정할 값이 입력되지 않을 경우 400반환**/
  if (!name && !cashAmount) {
    return res.status(400).json({ message: '수정할 name 또는 cashAmount 값을 입력해 주세요.' });
  }
  try {
    /**상품 존재 여부 확인**/
    const isExistGoods = await gamePrisma.goods.findUnique({
      where: { goodsId },
    });
    if (!isExistGoods) {
      return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
    }

    /**상품 정보 업데이트(입력된 필드만 변경)**/
    const updateGoods = await gamePrisma.goods.update({
      where: { goodsId },
      data: {
        ...(name && { name }) /**name이 있을 경우 업데이트**/,
        ...(cashAmount && { cashAmount }) /**cashAmount가 있을 경우 업데이트**/,
      },
    });

    /**성공 응답**/
    return res.status(200).json({
      message: '상품 수정이 완료되었습니다.',
      name: updateGoods.name,
      cashAmount: updateGoods.cashAmount,
    });
  } catch (error) {
    console.error('상품 수정 오류:', error);

    /**고유 제약 조건 위반**/
    if (error.code === 'P2002') {
      return res.status(409).json({ message: '상품명이 존재합니다.' });
    }

    /**그 외 서버 오류**/
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

/**상품 목록 조회 API**/
export const getGoods = async (req, res) => {
  try {
    /**상품 목록 조회**/
    const goodsList = await gamePrisma.goods.findMany({
      select: {
        goodsId: true,
        name: true,
        cashAmount: true,
      },
    });

    /**조회 결과가 없을 경우 404반환**/
    if (goodsList.length === 0) {
      return res.status(404).json({ message: '등록된 상품이 없습니다.' });
    }

    /**클라이언트 응답 형식**/
    const response = goodsList.map((goodsItem) => ({
      id: goodsItem.goodsId,
      name: goodsItem.name,
      cashAmount: goodsItem.cashAmount.toString() /**문자열로 반환**/,
    }));

    /**성공 응답**/
    return res.status(200).json(response);
  } catch (error) {
    /**그 외 서버 오류**/
    console.error('상품 목록 조회 오류', error);
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};
