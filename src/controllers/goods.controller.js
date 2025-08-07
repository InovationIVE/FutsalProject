import { gamePrisma } from '../utils/prisma/index.js';
import { Prisma as GamePrisma } from '../../prisma/Game/generated/prisma/index.js';

/**상품 등록 API controller
 * { name, cashAmount }
 * 출력 : 201(성공)/400(입력오류)/409(중복))/500(서버오류)
 * **/
export const registGoods = async (req, res, next) => {
  const { name, cashAmount } = req.body;

  //1.1 오류 표기 : name과 cashAmount입력되지 않을 경우 400반환
  if (!name || !cashAmount) {
    return res.status(400).json({ message: 'name과 cashAmount는 필수입니다.' });
  }
  try {
    //1.2 상품 등록
    const result = await gamePrisma.$transaction(
      async (tx) => {
        const newGoods = await gamePrisma.goods.create({
          data: {
            name,
            cashAmount,
          },
        });

        //1.3 성공응답
        return {
          id: newGoods.goodsId,
          name: newGoods.name,
          cashAmount: newGoods.cashAmount.toString(), //문자열로 cashAmount반환
        };
      },
      {
        isolationLevel: GamePrisma.TransactionIsolationLevel.ReadCommitted,
      },
    );
    return res.status(201).json(result);
  } catch (error) {
    //1.4 고유 제약 조건 위반시 오류 메세지
    if (error.code === 'P2002') {
      return res.status(409).json({ message: '상품명이 존재합니다.' });
    }
    //1.5그 외 서버 오류
    next(error);
  }
};

/**상품 삭제 API controller
 * 출력 : 200(성공)/400(입력오류)/404(데이터 없음)/500(서버오류)
 * **/
export const deleteGoods = async (req, res, next) => {
  const goodsId = parseInt(req.params.goodsId, 10);

  //2.1 오류 표기 : goodsId가 숫자가 아닌 경우 400반환
  if (isNaN(goodsId)) {
    return res.status(400).json({ message: '상품ID가 유효하지 않습니다.' });
  }
  try {
    const result = await gamePrisma.$transaction(
      async (tx) => {
        //2.2 상품 존재여부 확인
        const isExistGoods = await gamePrisma.goods.findUnique({ where: { goodsId } });

        //2.3 존재하지 않을 경우 404반환
        if (!isExistGoods) {
          return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
        }

        //2.4 상품 삭제
        const deleted = await gamePrisma.goods.delete({
          where: { goodsId: parseInt(goodsId) },
        });

        //2.5 성공응답
        return {
          message: '상품이 삭제되었습니다.',
          deleted: {
            id: deleted.goodsId,
            name: deleted.name,
            cashAmount: deleted.cashAmount.toString(),
          },
        };
      },
      { isolationLevel: GamePrisma.TransactionIsolationLevel.ReadCommitted },
    );
    res.status(200).json(result);
  } catch (error) {
    //2.6 그 외 서버 오류
    next(error);
  }
};

/**상품 수정 API controller
 * { name, cashAmount }
 * 출력 : 200(성공)/400(입력오류)/404(데이터 없음))/500(서버오류)
 * **/
export const updateGoods = async (req, res, next) => {
  const goodsId = parseInt(req.params.goodsId, 10);
  const { name, cashAmount } = req.body;

  //3.1 오류 표기 : goodsId가 유효하지 않을 경우 400반환
  if (isNaN(goodsId)) {
    return res.status(400).json({ message: '상품ID가 유효하지 않습니다.' });
  }

  //3.2 오류 표기 : 수정할 값이 입력되지 않을 경우 400반환
  if (!name && !cashAmount) {
    return res.status(400).json({ message: '수정할 name 또는 cashAmount 값을 입력해 주세요.' });
  }
  try {
    const result = await gamePrisma.$transaction(
      async (tx) => {
        //3.3 상품 존재 여부 확인
        const isExistGoods = await tx.goods.findUnique({
          where: { goodsId },
        });
        if (!isExistGoods) {
          return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
        }

        //3.4 상품 정보 업데이트(입력된 필드만 변경)
        const updated = await tx.goods.update({
          where: { goodsId: parseInt(goodsId) },
          data: {
            ...(name && { name }), //name이 있을 경우 업데이트
            ...(cashAmount && { cashAmount }), //cashAmount가 있을 경우 업데이트
          },
        });

        //3.5 성공 응답
        return {
          message: '상품 수정이 완료되었습니다.',
          updateGoods: {
            id: updated.goodsId,
            name: updated.name,
            cashAmount: updated.cashAmount.toString(),
          },
        };
      },
      { isolationLevel: GamePrisma.TransactionIsolationLevel.ReadCommitted },
    );
    res.status(200).json(result);
  } catch (error) {
    //3.6 고유 제약 조건 위반 시 409 반환
    if (error.code === 'P2002') {
      return res.status(409).json({ message: '상품명이 존재합니다.' });
    }

    //3.7 그 외 서버 오류
    next(error);
  }
};

/**상품 목록 조회 API
 * * 출력 : 200(성공)/404(데이터 없음)/500(서버오류)
 * **/
export const getGoods = async (req, res, next) => {
  try {
    //4.1 상품 목록 조회
    const goodsList = await gamePrisma.goods.findMany();

    //4.2 조회 결과가 없을 경우 404반환
    if (goodsList.length === 0) {
      return res.status(404).json({ message: '등록된 상품이 없습니다.' });
    }

    //4.3 성공 응답
    const formattedGoodsList = goodsList.map((goods) => ({
      id: goods.goodsId,
      name: goods.name,
      cashAmount: goods.cashAmount.toString(),
    }));
    return res.status(200).json(formattedGoodsList);
  } catch (error) {
    next(error);
  }
};
