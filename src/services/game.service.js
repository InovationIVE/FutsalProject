// --- Game Classes ---
import { MapData } from '../game/MapData.js';
import { GoalPost } from '../game/GoalPost.js';
import { Ball } from '../game/ball.js';
import { Player } from '../game/Player.js';
import { Team } from '../game/Team.js';
import { Game } from '../game/Game.js';
import { userPrisma } from '../utils/prisma/index.js';

export default class GameService {
  static async initGame(player1SocketId, player2SocketId, accountId1, accountId2) {
    const gameMap = new MapData(7, 5);
    const goalA = new GoalPost({ x: 0, y: 2 });
    const goalB = new GoalPost({ x: 6, y: 2 });
    const ball = new Ball();

    const teamAPlayers = await createTeamPlayer(accountId1, 'teamA');
    const teamBPlayers = await createTeamPlayer(accountId2, 'teamB');

    if (!teamAPlayers || !teamBPlayers) {
      throw new Error('스쿼드 정보를 불러오는데 실패했다.');
    }

    // TODO: Replace with actual player data from DB
    teamAPlayers[0].position = { x: 2, y: 2 };
    teamAPlayers[1].position = { x: 1, y: 1 };
    teamAPlayers[2].position = { x: 1, y: 3 };

    teamBPlayers[0].position = { x: 4, y: 2 };
    teamBPlayers[1].position = { x: 5, y: 1 };
    teamBPlayers[2].position = { x: 5, y: 3 };

    const teamA = new Team('Team A', teamAPlayers, player1SocketId);
    const teamB = new Team('Team B', teamBPlayers, player2SocketId);

    const game = new Game(teamA, teamB, ball, gameMap, goalA, goalB);

    const allPlayers = [...teamA.players, ...teamB.players];
    allPlayers.forEach((p) => {
      game.initialPlayerPositions[p.id] = { ...p.position };
    });

    game.start(); // Initialize ball owner and first turn

    return game;
  }

  static async updateRank(winnerId, loserId, socketIdToUserIdMap) {
    try {
      const winnerAccountId = socketIdToUserIdMap.get(winnerId);
      const loserAccountId = socketIdToUserIdMap.get(loserId);

      const winnerRankInfo = await userPrisma.rank.findUnique({
        where: { accountId: winnerAccountId },
      });

      const loserRankInfo = await userPrisma.rank.findUnique({
        where: { accountId: loserAccountId },
      });

      const basicScore = 10;
      const basicCash = 1000;
      let acquireScore = 0;
      let acquiredCash = 0;
      const addScore = Math.abs(winnerRankInfo.rankScore - loserRankInfo.rankScore);
      const minusScore = addScore / 2;
      if (winnerRankInfo.rankScore > loserRankInfo.rankScore) {
        acquireScore = basicScore + Math.floor(addScore / 2);
        acquiredCash = basicCash + Math.floor((addScore / 2) * 1000);
      } else {
        acquireScore = basicScore + addScore;
        acquiredCash = basicCash + addScore * 1000;
      }

      const winnerTier = updateTier(winnerRankInfo.rankScore + acquireScore);
      const loserTier = updateTier(loserRankInfo.rankScore - minusScore);

      const winnerUpdatePromise = userPrisma.rank.update({
        where: { accountId: winnerAccountId },
        data: {
          rankScore: { increment: acquireScore },
          tier: winnerTier,
          win: {
            increment: 1,
          },
        },
      });

      const winnerUpdateCash = userPrisma.account.update({
        where: { accountId: winnerAccountId },
        data: {
          cash: { increment: acquiredCash },
        },
      });

      const loserUpdatePromise = userPrisma.rank.update({
        where: { accountId: loserAccountId },
        data: {
          rankScore: { decrement: minusScore },
          tier: loserTier,
          lose: {
            increment: 1,
          },
        },
      });

      await userPrisma.$transaction([winnerUpdatePromise, winnerUpdateCash, loserUpdatePromise]);
    } catch (error) {
      console.error('Error updating ranks:', error);
    }
  }

  static async updateDraw(drawId1, drawId2, socketIdToUserIdMap) {
    try {
      const drawId1AccountId = socketIdToUserIdMap.get(drawId1);
      const drawId2AccountId = socketIdToUserIdMap.get(drawId2);

      const drawId1UpdatePromise = userPrisma.rank.update({
        where: { accountId: drawId1AccountId },
        data: {
          draw: {
            increment: 1,
          },
        },
      });

      const drawId2UpdatePromise = userPrisma.rank.update({
        where: { accountId: drawId2AccountId },
        data: {
          draw: {
            increment: 1,
          },
        },
      });

      await userPrisma.$transaction([drawId1UpdatePromise, drawId2UpdatePromise]);
    } catch (error) {
      console.error('Error updating ranks:', error);
    }
  }

  static async createMatchHistory(teamAsocketId, teamBsocketId, game, socketIdToUserIdMap) {
    try {
      const teamAAccountId = socketIdToUserIdMap.get(teamAsocketId);
      const teamBAccountId = socketIdToUserIdMap.get(teamBsocketId);

      const teamAUpdateHistoryPrisma = userPrisma.matchHistory.create({
        data: {
          accountId: teamAAccountId,
          opponentId: teamBAccountId,
          goalScore: game.teamA.score,
          passScore: game.teamA.totalPass,
          shootScore: game.teamA.totalShoot,
          defenceScore: game.teamA.totalTackle,
        },
      });

      const teamBUpdateHistoryPrisma = userPrisma.matchHistory.create({
        data: {
          accountId: teamBAccountId,
          opponentId: teamAAccountId,
          goalScore: game.teamB.score,
          passScore: game.teamB.totalPass,
          shootScore: game.teamB.totalShoot,
          defenceScore: game.teamB.totalTackle,
        },
      });

      await userPrisma.$transaction([teamAUpdateHistoryPrisma, teamBUpdateHistoryPrisma]);
    } catch (error) {
      console.error('Error updating ranks:', error);
    }
  }

  static async getMatchInfo(socket) {
    const accountInfo = await userPrisma.account.findUnique({
      where: { accountId: socket.request.user.accountId },
      select: {
        accountId: true,
        rank: {
          select: {
            rankScore: true,
          },
        },
      },
    });

    const waitingQueue = {
      socket: socket,
      accountId: accountInfo.accountId,
      rankScore: accountInfo.rank.rankScore,
      joinedAt: Date.now(),
    };

    return waitingQueue;
  }

  static tryMatch(waitingQueue) {
    if (waitingQueue.length < 2) return [];

    waitingQueue.sort((a, b) => a.joinedAt - b.joinedAt);

    for (let i = 0; i < waitingQueue.length; i++) {
      const player = waitingQueue[i];

      const waitTime = Date.now() - player.joinedAt;
      const scoreRange = 50 + Math.floor(waitTime / 5000) * 50;

      // Find an opponent for the current player
      const opponentIndex = waitingQueue.findIndex(
        (p, idx) => idx !== i && Math.abs(p.rankScore - player.rankScore) <= scoreRange,
      );

      if (opponentIndex !== -1) {
        const opponent = waitingQueue[opponentIndex];
        const matchedPair = [player, opponent];

        // IMPORTANT: Remove players from the original waitingQueue array.
        // Remove the opponent first. If it has a higher index, it won't affect the player's index.
        // If it has a lower index, the player's index will shift, so we find it again.
        const playerIndex = waitingQueue.findIndex((p) => p.accountId === player.accountId);
        
        // Remove by index, making sure to remove the one with the larger index first
        // to avoid messing up the index of the other one.
        const index1 = playerIndex;
        const index2 = opponentIndex;

        if (index1 > index2) {
          waitingQueue.splice(index1, 1);
          waitingQueue.splice(index2, 1);
        } else {
          waitingQueue.splice(index2, 1);
          waitingQueue.splice(index1, 1);
        }
        
        return matchedPair;
      }
    }

    return []; // No match found
  }
}

async function createTeamPlayer(accountId, temaName) {
  const squadInfo = await userPrisma.squad.findUnique({
    where: { accountId },
    include: {
      squadMembers: {
        include: {
          ownedPlayer: true,
        },
      },
    },
  });

  let squadPlayers = [];

  for (let i = 0; i < squadInfo.squadMembers.length; i++) {
    const info = squadInfo.squadMembers[i];
    const stat = info.ownedPlayer;
    const player = new Player(
      stat.ownedPlayerId,
      stat.name,
      stat.attack,
      stat.defence,
      stat.speed,
      temaName,
    );
    squadPlayers.push(player);
  }

  return squadPlayers;
}

function updateTier(score) {
  let tier = '';

  if (score < 1000) tier = 'Bronze';
  else if (score < 1500) tier = 'Silver';
  else if (score < 2000) tier = 'Gold';
  else if (score < 2700) tier = 'Platinum';
  else if (score < 3500) tier = 'Dia';
  else if (score < 4200) tier = 'Master';
  else if (score >= 4200) tier = 'GrandMaster';

  return tier;
}

function removeFromQueue(waitingQueue ,accountId) {
  const index = waitingQueue.findIndex(p => p.accountId === accountId);
  if (index !== -1) waitingQueue.splice(index, 1);
}
