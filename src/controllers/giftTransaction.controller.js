import { gamePrisma } from '../utils/prisma/index.js';
import { userPrisma } from '../utils/prisma/index.js';
import { Prisma as UserPrisma } from '../../prisma/User/generated/user/index.js';
import { Prisma as GamePrisma } from '../../prisma/Game/generated/prisma/index.js';

export class GiftController {
  /**상품 선물하기 API controller
   * { receiverId, cash }
   * 출력 : 201(성공)/400(선물불가)/404(유저 미존재)/500(서버오류)
   * **/
  async sendGift(req, res, next) {
    try {
      const { receiverId, cash } = req.body;
      const senderId = req.user.accountId;

      //1.1 자신에게 선물하기 차단
      if (senderId === receiverId) {
        return res.status(400).json({ message: '자신에게는 선물 할 수 없습니다.' });
      }

      //1.2 보내는 사람 존재 확인 및 잔액 조회
      const sender = await userPrisma.account.findUnique({ where: { accountId: senderId } });
      if (!sender) return res.status(404).json({ message: '보내는 유저가 존재하지 않습니다.' });
      if (sender.cash < cash) return res.status(400).json({ message: '잔액이 부족합니다.' });

      //1.3 받는 사람 존재 확인
      const receiver = await userPrisma.account.findUnique({ where: { accountId: receiverId } });
      if (!receiver) return res.status(404).json({ message: '받는 유저가 존재하지 않습니다.' });

      //1.4 보내는 사람 잔액 차감
      const gift = await userPrisma.$transaction(async (tx) => {
        await tx.account.update({
          where: { accountId: senderId },
          data: { cash: { decrement: cash } },
        });

        //1.5 선물하기 기록 생성(senderId, receiverId, cash, status)
        return await tx.giftTransaction.create({
          data: {
            senderId,
            receiverId,
            cash,
            status: 'pending',
          },
        });
      });
      return res.status(201).json({ message: '선물하기를 성공하였습니다.', gift });
    } catch (error) {
      next(error);
    }
  }

  /**내가 받은 선물 조회하기 API controller
   * 출력 : 200(성공)/500(서버오류)
   * **/
  async getReceivedGifts(req, res, next) {
    try {
      //2.1 받는 사람 확인
      const receiverId = Number(req.params.receiverId);
      //2.2 받은 선물 조회(받는사람 accountId, 보내는 사람 accountId, userId, email)
      const gifts = await userPrisma.giftTransaction.findMany({
        where: { receiverId },
        include: {
          sender: {
            select: {
              accountId: true,
              userId: true,
              email: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      });
      res.status(200).json({ gifts });
    } catch (error) {
      next(error);
    }
  }

  /**전체 선물내역 조회하기(관리자) API controller
   * 출력 : 200(성공)/500(서버오류)
   * **/
  async getAllGiftTransactions(req, res, next) {
    try {
      const gifts = await userPrisma.giftTransaction.findMany({
        include: {
          //3.1 보낸 사람 정보(accountId, userId, email, cash)
          sender: {
            select: {
              accountId: true,
              userId: true,
              email: true,
              cash: true,
            },
          },
          //3.2 받는 사람 정보(accountId, userId, email, cash)
          receiver: {
            select: {
              accountId: true,
              userId: true,
              email: true,
              cash: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      });
      res.status(200).json({ gifts });
    } catch (error) {
      next(error);
    }
  }

  /**선물받기 API controller
   * {giftId}
   * 출력 : 201(성공)/400(이미 받은 선물)/404(선물 미존재)/500(서버오류)
   */
  async acceptGift(req, res, next) {
    try {
      //4.1 params에 giftId가 있을 경우 giftId 사용, 없으면 body에서 사용
      const giftId = Number(req.params.giftId ?? req.body.giftId);
      const loginUserId = req.user.accountId;

      if (!giftId || isNaN(giftId)) {
        return res.status(400).json({ message: '유효한 giftId가 필요합니다.' });
      }
      const gift = await userPrisma.giftTransaction.findUnique({
        where: { id: giftId },
      });
      if (!gift) return res.status(404).json({ message: '받은 선물이 존재하지 않습니다.' });
      if (gift.receiverId !== loginUserId) {
        return res.status(403).json({ message: '선물을 받을 수 없습니다.' });
      }
      if (gift.status === 'success')
        return res.status(400).json({ message: '이미 받은 선물입니다.' });
      //4.2 선물 받기
      await userPrisma.$transaction(async (tx) => {
        await tx.account.update({
          where: { accountId: gift.receiverId },
          data: { cash: { increment: gift.cash } },
        });
        await tx.giftTransaction.update({
          where: { id: giftId },
          data: { status: 'success' },
        });
      });
      res.status(200).json({ message: '선물 받기를 완료했습니다.' });
    } catch (error) {
      next(error);
    }
  }
}

export default new GiftController();
