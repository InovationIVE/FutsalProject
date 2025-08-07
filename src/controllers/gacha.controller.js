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

      // 가챠 카드 생성 시 유효성 검사
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

      // 가챠 카드 존재 여부 확인
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
      // 가챠 뽑기 요청에서 필요한 데이터 추출
      const { gachaId } = req.body;
      const { accountId } = req.user;

      //가챠 카드 유효성 검사 및 존재 여부 확인
      const gachaCard = await IsGachaCard(gachaId);
      const user = await userPrisma.account.findUnique({ where: { accountId: accountId } });

      if (user.cash < gachaCard.price * 10) {
        throw new HttpError(400, '재화가 부족합니다.');
      }

      // 가챠 뽑기 시 필요한 플레이어 데이터 조회
      const players = await gamePrisma.player.findMany({
        select: { playerId: true, name: true, rarity: true },
      });

      // 이미 보유한 플레이어 데이터 조회
      const ownedPlayers = await userPrisma.ownedPlayers.findMany({
        where: { accountId: accountId },
        select: { playerId: true, ownedPlayerId: true },
      });

      // 보유한 플레이어 ID를 Map으로 변환하여 빠른 조회를 위해 사용
      const ownedPlayerMap = new Map(ownedPlayers.map((p) => [p.playerId, p.ownedPlayerId]));

      
      const drawnCards = []; // 뽑힌 플레이어 카드들을 저장할 배열
      const updates = new Map(); // 보유 플레이어 업데이트를 위한 Map
      const creates = new Map(); // 새로 획득한 플레이어 생성을 위한 Map

      for (let i = 0; i < 10; i++) {
        const random = Math.random() * 100;
        let rarity;
        if (random < gachaCard.diamond) rarity = 'SSR';
        else if (random < gachaCard.platinum) rarity = 'SR';
        else if (random < gachaCard.gold) rarity = 'UR';
        else if (random < gachaCard.silver) rarity = 'R';
        else rarity = 'R';

        // 해당 희귀도에 맞는 플레이어들 중에서 랜덤으로 선택
        const potentialPlayers = players.filter((p) => p.rarity === rarity);
        if (potentialPlayers.length === 0) continue;

        // 랜덤으로 플레이어 선택
        const drawnPlayer = potentialPlayers[Math.floor(Math.random() * potentialPlayers.length)];
        drawnCards.push(drawnPlayer);

        // 이미 보유한 플레이어인지 확인
        if (ownedPlayerMap.has(drawnPlayer.playerId)) {
          const ownedPlayerId = ownedPlayerMap.get(drawnPlayer.playerId); // 보유 플레이어 ID
          updates.set(ownedPlayerId, (updates.get(ownedPlayerId) || 0) + 1); // 업데이트할 플레이어의 개수 증가
        } else {
          creates.set(drawnPlayer.playerId, (creates.get(drawnPlayer.playerId) || 0) + 1); // 새로 획득한 플레이어의 개수 증가
        }
      }

      // 트랜잭션을 사용하여 데이터베이스 업데이트
      await userPrisma.$transaction(async (tx) => {
        for (const [ownedPlayerId, count] of updates) {
          // 보유 플레이어의 개수를 증가시키는 업데이트
          await tx.ownedPlayers.update({
            where: { ownedPlayerId },
            data: { count: { increment: count } },
          });
        }

        // 새로 획득한 플레이어를 생성
        for (const [playerId, count] of creates) {
          await tx.ownedPlayers.create({
            data: { accountId: accountId, playerId, count },
          });
        }
        
        // 계정의 재화 업데이트
        await tx.account.update({
          where: { accountId: accountId },
          data: { cash: { decrement: gachaCard.price * 10 } },
        });
      });

      return res.status(200).json({ drawnCards });
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      console.error('Error drawing gacha:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
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
