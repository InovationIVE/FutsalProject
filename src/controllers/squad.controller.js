import { gamePrisma, userPrisma } from '../utils/prisma/index.js';

//스쿼드 등록, 수정 API
export class SquadController {
  static async createOrUpdateSquad(req, res, next) {
    try {
      const { accountId } = req.user;
      const { ownedPlayerIds } = req.body;

      // 유효성 검사
      if (!Array.isArray(ownedPlayerIds)) {
        return res.status(400).json({ error: 'ownedPlayerIds 배열이 필요합니다.' });
      }
      if (!ownedPlayerIds.length) {
        return res.status(400).json({ error: '3명의 선수를 선택해야 합니다.' });
      }
      if (ownedPlayerIds.length > 3) {
        return res.status(400).json({ error: '최대 3명까지 OwnedPlayer를 등록할 수 있습니다.' });
      }
      if (new Set(ownedPlayerIds).size !== ownedPlayerIds.length) {
        return res.status(400).json({ error: '중복된 선수가 포함되어 있습니다.' });
      }

      // 1) account 존재 확인
      const account = await userPrisma.account.findUnique({
        where: { accountId: +accountId },
      });
      if (!account) {
        return res.status(404).json({ error: '해당 계정이 존재하지 않습니다.' });
      }

      // 2) OwnedPlayer가 account 소유인지 확인
      const ownedPlayers = await userPrisma.ownedPlayers.findMany({
        where: {
          ownedPlayerId: { in: ownedPlayerIds },
          accountId: +accountId,
        },
      });
      if (ownedPlayers.length !== ownedPlayerIds.length) {
        return res.status(400).json({ error: '내 소유의 선수만 등록 할 수 있습니다.' });
      }

      // 3) 기존 Squad 조회
      let squad = await userPrisma.squad.findUnique({
        where: { accountId: +accountId },
        include: { squadMembers: true },
      });

      if (!squad) {
        // 신규 Squad 생성
        squad = await userPrisma.squad.create({
          data: {
            accountId: +accountId,
          },
        });
      }

      // 4) 기존 squadMembers 전부 삭제 (초기화)
      await userPrisma.squadMembers.deleteMany({
        where: { squadId: squad.squadId },
      });

      // 5) 새 SquadMember (OwnedPlayer) 등록
      const squadMembersData = ownedPlayerIds.map((ownedPlayerId) => ({
        squadId: squad.squadId,
        ownedPlayerId,
      }));

      await userPrisma.squadMembers.createMany({
        data: squadMembersData,
      });

      // 6) 결과 재조회 후 응답
      const updatedSquad = await userPrisma.squad.findUnique({
        where: { squadId: +squad.squadId },
        include: {
          squadMembers: {
            include: {
              ownedPlayer: true,
            },
          },
        },
      });

      return res.status(200).json({
        message: '스쿼드 등록/수정 완료',
        squad: updatedSquad,
      });
    } catch (error) {
      next(error);
    }
  }

  //스쿼드 조회 API
  static async getSquad(req, res, next) {
    try {
      const { accountId } = req.user;

      // 1. Account 존재 확인
      const account = await userPrisma.account.findUnique({
        where: { accountId: +accountId },
      });
      if (!account) {
        return res.status(404).json({ error: '계정을 찾을 수 없습니다.' });
      }

      // 2. Squad + OwnedPlayer 조회
      const squad = await userPrisma.squad.findUnique({
        where: { accountId: +accountId },
        include: {
          squadMembers: {
            include: {
              ownedPlayer: true,
            },
          },
        },
      });

      if (!squad) {
        return res.status(404).json({ error: '등록된 스쿼드가 없습니다.' });
      }

      // 3. OwnedPlayer로부터 playerId 목록 추출
      const playerIds = squad.squadMembers.map((member) => member.ownedPlayer.playerId);

      // 4. GameDB에서 선수 정보 조회
      const players = await gamePrisma.player.findMany({
        where: {
          playerId: { in: playerIds },
        },
      });

      // 5. 선수 정보를 매핑하여 응답 구성
      const squadDetail = squad.squadMembers.map((member) => {
        const player = players.find((p) => p.playerId === member.ownedPlayer.playerId);

        return {
          squadMemberId: member.squadMemberId,
          ownedPlayerId: member.ownedPlayer.ownedPlayerId,
          playerId: player.playerId,
          playerName: player.name,
          playerRarity: player.rarity,
          playerPrifileImage: player.profileImage,
        };
      });

      return res.status(200).json({
        message: '스쿼드 조회 성공',
        squad: {
          squadId: squad.squadId,
          accountId: squad.accountId,
          members: squadDetail,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
