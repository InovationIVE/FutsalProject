import { gamePrisma, userPrisma } from '../utils/prisma/index.js';
import { Prisma as UserPrisma } from '../../prisma/User/generated/user/index.js';
import { PlayerModel } from '../entity/Player.js';
// 내 선수 조회
export class OwnedPlayersController {
  static async myPlayersList(req, res, next) {
    try {
      // const { accountId } = req.user;
      const accountId = Number(req.user.accountId);

      if (!accountId) {
        return res.status(401).json({ message: '내 계정 정보가 필요합니다.' });
      }

      // 1. User DB에서 OwnedPlayers 조회
      const myPlayers = await userPrisma.ownedPlayers.findMany({
        where: { accountId: +accountId },
        select: {
          ownedPlayerId: true,
          playerId: true,
          name: true,
          level: true,
          rarity: true,
          attack: true,
          defence: true,
          speed: true,
          level: true,
        },
      });

      // // 2. playerId 목록 추출
      // const playerIds = myPlayers.map((p) => p.playerId);

      // if (playerIds.length === 0) {
      //   return res.status(200).json({ response: [] });
      // }

      // // 3. Game DB에서 해당 playerId에 해당하는 Player 조회
      // const players = await gamePrisma.player.findMany({
      //   where: { playerId: { in: playerIds } },
      //   select: {
      //     profileImage: true,
      //     name: true,
      //     rarity: true,
      //     playerId: true,
      //     soccerPlayerId: true,
      //   },
      // });

      // 4. playerId 기준으로 매핑해서 ownedPlayers에 Player 정보 붙이기
      // const playerMap = Object.fromEntries(players.map((p) => [p.playerId, p]));

      // const response = myPlayers.map((ownedPlayers) => ({
      //   ...ownedPlayers,
      //   player: playerMap[ownedPlayers.playerId] || null,
      // }));

      return res.status(200).json({ data: myPlayers });
    } catch (err) {
      next(err);
    }
  }

  //보유선수 상세 조회

  static async myPlayer(req, res, next) {
    try {
      const { accountId } = req.user;
      const { ownedPlayerId } = req.params;

      if (!ownedPlayerId) {
        return res.status(400).json({ message: 'ownedPlayerId가 필요합니다.' });
      }

      // 1. User DB에서 ownedPlayer 조회
      const ownedPlayer = await userPrisma.ownedPlayers.findUnique({
        where: {
          accountId: +accountId,
          ownedPlayerId: +ownedPlayerId,
        },
        select: {
          playerId: true,
          ownedPlayerId: true,
          name: true,
          level: true,
          rarity: true,
          attack: true,
          defence: true,
          speed: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!ownedPlayer) {
        return res.status(404).json({ message: '해당 선수를 보유하고 있지 않습니다.' });
      }

      // 2. Game DB에서 Player 상세정보 조회
      const player = await gamePrisma.player.findUnique({
        where: {
          playerId: ownedPlayer.playerId,
        },
        select: {
          profileImage: true,
        },
      });

      // 3. 응답 조합
      return res.status(200).json({
        message: `${ownedPlayer.name}의 세부정보입니다.`,
        ...ownedPlayer,
        profileImage: player?.profileImage || 'null',
      });
    } catch (err) {
      next(err);
    }
  }

  // 보유 선수 판매
  static async playerSale(req, res, next) {
    try {
      const { ownedPlayerId } = req.body;
      const { accountId } = req.user;
      if (!ownedPlayerId) {
        return res.status(400).json({ message: '유효한 ownedPlayerId를 입력해주세요.' });
      }
      const ownedPlayer = await userPrisma.ownedPlayers.findFirst({
        where: {
          ownedPlayerId: +ownedPlayerId,
          accountId: +accountId,
        },
      });
      if (!ownedPlayer) {
        return res.status(404).json({ message: '해당 선수를 찾을 수 없습니다.' });
      }
      /** 레어도에 따른 가격 책정 **/
      const ownedPlayerInfo = await PlayerModel.getSome(ownedPlayer.playerId);
      const own_rarity_price = await gamePrisma.rarityPrice.findUnique({
        where: { rarity: ownedPlayerInfo.rarity },
      });
      /** 레어도 비용 에 (보유선수레벨*10)% 만큼 가산 후, 100의 자리수에서 버림**/
      const gain =
        Math.floor((own_rarity_price.priceForRarity * (ownedPlayer.level / 10 + 1)) / 100) * 100;

      await userPrisma.$transaction(
      async (tx) => {
        // 2. SquadMembers 테이블에서 해당 선수를 제거합니다. (onDelete: Cascade 설정에 따라)
        await tx.squadMembers.deleteMany({
          where: { ownedPlayerId: ownedPlayer.ownedPlayerId },
        });

        // 3. 계정의 캐시를 업데이트합니다.
        await tx.account.update({
          where: { accountId: +accountId },
          data: { cash: { increment: gain } },
        });

        // 4. ownedPlayers 레코드를 삭제합니다.
        //    Auction의 ownedPlayerId는 onDelete: SetNull에 의해 자동으로 null이 됩니다.
        await tx.ownedPlayers.delete({
          where: { ownedPlayerId: ownedPlayer.ownedPlayerId },
        });
      },
      {
        isolationLevel: UserPrisma.TransactionIsolationLevel.ReadCommitted,
      },
    );

      const updated = await userPrisma.account.findUnique({
        where: { accountId: +accountId },
        select: { cash: true },
      });

      return res.status(200).json({
        message: '선수판매 완료',
        sales: gain,
        remain: updated.cash,
      });
    } catch (err) {
      next(err);
    }
  }
}
