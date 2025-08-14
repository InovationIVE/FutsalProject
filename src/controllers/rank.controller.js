import { userPrisma } from '../utils/prisma/index.js';

class HttpError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class RankController {
  static async createRank(req, res) {
    try {
      const { accountId } = req.user;
      const { rankScore = 1000 } = req.body;

      const isRank = await userPrisma.rank.findUnique({
        where: { accountId },
      });

      if (isRank) {
        return;
      }

      let tier = '';

      if (rankScore < 1000) tier = 'Bronze';
      else if (rankScore < 1500) tier = 'Silver';
      else if (rankScore < 2000) tier = 'Gold';
      else if (rankScore < 2700) tier = 'Platinum';
      else if (rankScore < 3500) tier = 'Dia';
      else if (rankScore < 4200) tier = 'Master';
      else if (rankScore >= 4200) tier = 'GrandMaster';

      const rank = await userPrisma.rank.create({
        data: {
          accountId: +accountId,
          rankScore: rankScore,
          tier: tier,
        },
      });

      return res.status(201).json(rank);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      console.error('Error creating rank Table:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getRank(req, res) {
    try {
      const rankInfo = await userPrisma.rank.findMany({
        select: {
          account: {
            select: {
              userId: true,
            },
          },
          rankScore: true,
          tier: true,
          win: true,
          draw: true,
          lose: true,
        },
        orderBy: {
          rankScore: 'desc',
        },
      });

      res.status(201).json(rankInfo);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      console.error('Error creating rank Table:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getMatchHistory(req, res) {
    try {
      const { userId } = req.params;
      
      if(!userId){
        throw new HttpError(400, 'userId가 없습니다.');
      }

      const account = await userPrisma.account.findUnique({
        where:{userId}
      });

      const matchHistory = await userPrisma.matchHistory.findMany({
        where: { accountId : account.accountId },
      });

      res.status(201).json(matchHistory);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      console.error('Error creating rank Table:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
