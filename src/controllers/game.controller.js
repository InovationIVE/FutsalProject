import { gamePrisma, userPrisma } from '../utils/prisma/index.js';

export class GameController {
  static async GetSquadTeam(req, res) {
    try {
      const { accountId } = req.user;

      //squadId 가져오기
      const squad = await userPrisma.squad.findFirst({
        where: { accountId: +accountId },
      });

      //스쿼드 맴버 리스트 가져오기
      const squadMembers = await userPrisma.squadMembers.findMany({
        where: { squadId: squad.squadId },
        select: {
          ownedPlayer: {
            select: {
              name: true,
              rarity: true,
              level: true,
              attack: true,
              defence: true,
              speed: true,
              playerId: true,
            },
          },
        },
      });

      const playerIds = squadMembers.map((member) => member.ownedPlayer.playerId);

      const plyerProfileImages = await gamePrisma.player.findMany({
        where: {
          playerId: {
            in: playerIds,
          },
        },
        select: {
          playerId: true,
          profileImage: true,
        },
      });

      return res.status(200).json({ squadMembers, plyerProfileImages });
    } catch (error) {
      console.error('Error fetching gacha data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
