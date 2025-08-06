import { gamePrisma } from '../utils/prisma/index.js';
import { userPrisma } from '../utils/prisma/index.js';
import { Prisma as UserPrisma } from '../../prisma/User/generated/user/index.js';
import { Prisma as GamePrisma } from '../../prisma/Game/generated/prisma/index.js';

class HttpError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class GachaController {
  /* 가챠카드 생성 */
  static async CreateGachaCard(req, res) {
    try {
      const { cardName, price, bronze, silver, gold, platinum, diamond } = req.body;

      await CreategachaCheck(cardName, price, bronze, silver, gold, platinum, diamond);

      await gamePrisma.gacha.create({
        data: {
          cardName,
          price,
          bronze,
          silver,
          gold,
          platinum,
          diamond,
        },
      });

      return res.status(201).json({ message: '가챠카드가 성공적으로 생성되었습니다' });
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      console.error('Error creating gacha card:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  /* 가챠 카드 조회 */
  static async GetGachaCards(req, res) {
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
  }

  /* 가챠카드 상세 조회*/
  static async GetGachaCardDetail(req, res) {
    try {
      const { gachaId } = req.params;

      const selectedCard = await IsGachaCard(gachaId);

      return res.status(200).json(selectedCard);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      console.error('Error fetching gacha card detail:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  /* 가챠 카드 수정 */
  static async UpdateGachaCard(req, res) {
    try {
      const { gachaId } = req.params;
      const { cardName, price, bronze, silver, gold, platinum, diamond } = req.body;

      const selectedCard = await IsGachaCard(gachaId);

      await gamePrisma.$transaction(
        async (tx) => {
          const cardPack = await tx.gacha.update({
            where: { gachaId: selectedCard.gachaId },
            data: {
              cardName,
              price,
              bronze,
              silver,
              gold,
              platinum,
              diamond,
            },
          });

          CheackColumn(
            cardPack.cardName,
            cardPack.price,
            cardPack.bronze,
            cardPack.silver,
            cardPack.gold,
            cardPack.platinum,
            cardPack.diamond,
          );
        },
        {
          isolationLevel: GamePrisma.TransactionIsolationLevel.ReadCommitted,
        },
      );

      return res.status(200).json({ message: '가챠카드가 성공적으로 수정되었습니다' });
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      console.error('Error updating gacha data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  /* 가챠 카드 삭제 */
  static async RemonveGachaCard(req, res) {
    try {
      const { gachaId } = req.params;

      const selectedCard = await IsGachaCard(gachaId);

      await gamePrisma.gacha.delete({
        where: { gachaId: selectedCard.gachaId },
      });

      return res.status(200).json({ message: '가챠카드가 성공적으로 삭제되었습니다' });
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      console.error('Error deleting gacha data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  /* 가챠 뽑기 */
  static async DrawGachaCard(req, res) {
    try {
      const { gachaId } = req.body;
      const { accountId } = req.params;

      const gachaCard = await IsGachaCard(gachaId);

      /* 가챠 뽑기 로직 */
      const drawnCard = [];

      await userPrisma.$transaction(
        async (tx) => {
          for (let i = 0; i < 10; i++) {
            /* 가챠 뽑기 로직 */
            const randomIndex = Math.floor(Math.random() * 100);

            let result = await SelectedCard(randomIndex, gachaCard);

            const isOwned = await tx.ownedPlayer.findFirst({
              where: { accountId: +accountId, playerId: result.playerId },
            });

            if (isOwned) {
              await tx.ownedPlayer.update({
                where: { ownedId: isOwned.ownedId },
                data: { count: { increment: 1 } },
              });
            } else {
              await tx.ownedPlayer.create({
                data: {
                  accountId: +accountId,
                  playerId: result.playerId,
                  count: 1,
                },
              });
            }

            await tx.account.update({
              where: { accountId: +accountId },
              data: { cash: { decrement: gachaCard.price } },
            });

            drawnCard.push(result);
          }
        },
        {
          isolationLevel: UserPrisma.TransactionIsolationLevel.ReadCommitted,
        },
      );

      return res.status(200).json({ drawnCards: drawnCard });
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      console.error('Error drawing gacha:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

/* 카드팩 선택 로직 */
async function SelectedCard(randomIndex, gachaCard) {
  const result = await gamePrisma.$transaction(
    async (tx) => {
      if (randomIndex <= gachaCard.bronze) {
        return await SelectPlayer('Bronze', tx);
      } else if (randomIndex <= gachaCard.silver) {
        return await SelectPlayer('Silver', tx);
      } else if (randomIndex <= gachaCard.gold) {
        return await SelectPlayer('Gold', tx);
      } else if (randomIndex <= gachaCard.platinum) {
        return await SelectPlayer('Platinum', tx);
      } else {
        return await SelectPlayer('Diamond', tx);
      }
    },
    {
      isolationLevel: GamePrisma.TransactionIsolationLevel.ReadCommitted,
    },
  );

  return result;
}

/* 선수 선택 로직 */
async function SelectPlayer(type, tx) {
  const prismaClient = tx || gamePrisma;

  const players = await prismaClient.player.findMany({
    where: { rarity: type },
    select: {
      playerId: true,
      name: true,
      rarity: true,
    },
  });
  if (players.length === 0) {
    throw new HttpError(500, `${type} 등급의 선수가 존재하지 않습니다.`);
  }
  const randomIndex = Math.floor(Math.random() * players.length);
  const card = players[randomIndex];
  return card;
}

/* 가챠 카드 생성 시 유효성 검사 */
async function CreategachaCheck(cardName, price, bronze, silver, gold, platinum, diamond) {
  CheackColumn(cardName, price, bronze, silver, gold, platinum, diamond);

  const existingGacha = await gamePrisma.gacha.findFirst({
    where: { cardName },
  });

  if (existingGacha) {
    throw new HttpError(400, '이미 존재하는 가챠 카드입니다.');
  }
}

/* 가챠 카드 수정 시 유효성 검사 */
function CheackColumn(cardName, price, bronze, silver, gold, platinum, diamond) {
  if (!cardName || !price || !bronze || !silver || !gold || !platinum || !diamond) {
    throw new HttpError(400, '가챠 입력 데이터가 부족합니다.');
  }

  if (price < 0 || bronze < 0 || silver < 0 || gold < 0 || platinum < 0 || diamond < 0) {
    throw new HttpError(400, '가챠 가격 또는 확률이 잘못되었습니다.');
  } else if (bronze + silver + gold + platinum + diamond !== 100) {
    throw new HttpError(400, '가챠 확률의 합이 100이 아닙니다.');
  }
}

/* 가챠 카드 존재 여부 확인 */
async function IsGachaCard(gachaId) {
  if (isNaN(parseInt(gachaId))) {
    throw new HttpError(400, '유효하지 않은 가챠 ID입니다.');
  }

  const existingGacha = await gamePrisma.gacha.findUnique({
    where: { gachaId: +gachaId },
  });

  if (!existingGacha) {
    throw new HttpError(404, '존재하지 않는 가챠입니다');
  }
  return existingGacha;
}
