import { gamePrisma } from '../utils/prisma/index.js';
import { userPrisma } from '../utils/prisma/index.js';
import { Prisma as UserPrisma } from '../../prisma/User/generated/user/index.js';
import { Prisma as GamePrisma } from '../../prisma/Game/generated/prisma/index.js';

export class GameController {
  static async GetSquadTeam(req, res) {
    try {
      const { accountId } = req.user;

      const squad = await userPrisma.squad.findFirst({
        where:{accountId: +accountId}
      });

      const squadMembers = await userPrisma.squadMembers.findMany({
        where: { squadId: squad.squadId },
      });

      let ownedPlayers = [];

      for(let i = 0; i < squadMembers.length; i++){
        const player = await userPrisma.ownedPlayers.findUnique({
            where: {ownedPlayerId: squadMembers[i].ownedPlayerId},
            select:{
              playerId: true,
            }
        });
        ownedPlayers.push(player);
      }

      let resultSquadList = [];

      for(let i = 0; i < ownedPlayers.length; i++){
        const reulstPlayer = await gamePrisma.player.findUnique({
          where:{ playerId: ownedPlayers[i].playerId}
        });
        
        resultSquadList.push(reulstPlayer);
      };


      return res.status(200).json(resultSquadList);
    } catch (error) {
      console.error('Error fetching gacha data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
