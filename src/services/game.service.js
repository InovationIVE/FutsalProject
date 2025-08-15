// --- Game Classes ---
import { MapData } from '../game/MapData.js';
import { GoalPost } from '../game/GoalPost.js';
import { Ball } from '../game/ball.js';
import { Player } from '../game/Player.js';
import { Team } from '../game/Team.js';
import { Game } from '../game/Game.js';
import { userPrisma } from '../utils/prisma/index.js';

export default class GameService {
  static async initGame(player1SocketId, player2SocketId ,accountId1, accountId2) {
    const gameMap = new MapData(15, 11);
    const goalA = new GoalPost({ x: 0, y: 5 });
    const goalB = new GoalPost({ x: 14, y: 5 });
    const ball = new Ball();

    const teamAPlayers = await createTeamPlayer(accountId1, 'teamA');
    const teamBPlayers = await createTeamPlayer(accountId2, 'teamB');

    if (!teamAPlayers || teamAPlayers.length === 0 || !teamBPlayers || teamBPlayers.length === 0) {
      throw new Error('스쿼드 정보를 불러오는데 실패했거나 스쿼드에 선수가 없습니다.');
    }

    // TODO: Replace with actual player data from DB
    teamAPlayers[0].position = { x: 6, y: 5 };
    teamAPlayers[1].position = { x: 3, y: 3 };
    teamAPlayers[2].position = { x: 3, y: 7  };

    teamBPlayers[0].position = { x: 8, y: 5 };
    teamBPlayers[1].position = { x: 11, y: 3 };
    teamBPlayers[2].position = { x: 11, y: 7 };

    const teamA = new Team('Team A', teamAPlayers, player1SocketId ,accountId1);
    const teamB = new Team('Team B', teamBPlayers, player2SocketId ,accountId2);

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
      const winnerRankInfo = await userPrisma.rank.findUnique({
        where: { accountId: winnerId },
      });

      const loserRankInfo = await userPrisma.rank.findUnique({
        where: { accountId: loserId },
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
        where: { accountId: winnerId },
        data: {
          rankScore: { increment: acquireScore },
          tier: winnerTier,
          win: {
            increment: 1,
          },
        },
      });

      const winnerUpdateCash = userPrisma.account.update({
        where: { accountId: winnerId },
        data: {
          cash: { increment: acquiredCash },
        },
      });

      const loserUpdatePromise = userPrisma.rank.update({
        where: { accountId: loserId },
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

  static async updateDraw(drawId1, drawId2) {
    try {
      const drawId1UpdatePromise = userPrisma.rank.update({
        where: { accountId: drawId1 },
        data: {
          draw: {
            increment: 1,
          },
        },
      });

      const drawId2UpdatePromise = userPrisma.rank.update({
        where: { accountId: drawId2 },
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

  static async createMatchHistory(teamA, teamB, game, resultA, resultB) {
    try {

      const teamAUpdateHistoryPrisma = userPrisma.matchHistory.create({
        data: {
          accountId: teamA.accountId,
          opponentId: teamB.accountId,
          goalScore: game.teamA.score,
          passScore: game.teamA.totalPass,
          shootScore: game.teamA.totalShoot,
          defenceScore: game.teamA.totalTackle,
          result: resultA,
        },
      });

      const teamBUpdateHistoryPrisma = userPrisma.matchHistory.create({
        data: {
          accountId: teamB.accountId,
          opponentId: teamA.accountId,
          goalScore: game.teamB.score,
          passScore: game.teamB.totalPass,
          shootScore: game.teamB.totalShoot,
          defenceScore: game.teamB.totalTackle,
          result: resultB,
        },
      });

      await userPrisma.$transaction([teamAUpdateHistoryPrisma, teamBUpdateHistoryPrisma]);
    } catch (error) {
      console.error('Error updating ranks:', error);
    }
  }

  // waitigQueue 객체를 만드는 함수
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

    // 이렇게 만듬으로써 클라이언트와 서버가 서로 데이터를 주고 받음
    const waitingQueue = {
      socket: socket,
      accountId: accountInfo.accountId,
      rankScore: accountInfo.rank.rankScore,
      joinedAt: Date.now(),
    };

    return waitingQueue;
  }

  static tryMatch(waitingQueue) {
    // 웨잍팅이 2보다 작으면 빈배별 반환
    if (waitingQueue.length < 2) return [];

    // 매칭 들어온 시간 순서대로 정렬
    waitingQueue.sort((a, b) => a.joinedAt - b.joinedAt);


    // waitingQueue 배열을 돌면서 비슷한 점수의 선수를 찾아서 매칭 시킴
    for (let i = 0; i < waitingQueue.length; i++) {
      const player = waitingQueue[i];

      const waitTime = Date.now() - player.joinedAt; // 기다린 시간
      const scoreRange = 50 + Math.floor(waitTime / 5000) * 50; // 매칭 할 플레이어가 없으면 5초 단위로 점수를 50씩 증가해서 찾음

      // 비슷한 점수 차이에 선수가 있는지 찾음
      const opponentIndex = waitingQueue.findIndex(
        (p, idx) => idx !== i && Math.abs(p.rankScore - player.rankScore) <= scoreRange,
      );

      // 있다면 matchePair에 2명의 플레이어를 배열에 등록 시킴
      if (opponentIndex !== -1) {
        const opponent = waitingQueue[opponentIndex];
        const matchedPair = [player, opponent];

        // waitingQueue에서 빼기 위해 해당 waitingQueue에 해당 인덱스를 찾음
        const playerIndex = waitingQueue.findIndex((p) => p.accountId === player.accountId);

        
        const index1 = playerIndex;
        const index2 = opponentIndex;

        //배열에서 여러 요소를 제거할 때 발생하는 '인덱스 시프트' 문제를 방지하기 위해 큰 순서로 waitingQueue에서 제거
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

    return []; // 매치 할 선수가 없음
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

function removeFromQueue(waitingQueue, accountId) {
  const index = waitingQueue.findIndex((p) => p.accountId === accountId);
  if (index !== -1) waitingQueue.splice(index, 1);
}
