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

    const teamAPlayers = await createTeamPlayer(accountId1,'teamA');
    const teamBPlayers = await createTeamPlayer(accountId2,'teamB');

    if(!teamAPlayers || !teamBPlayers){
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
}

async function createTeamPlayer(accountId, temaName) {
  const squadInfo  = await userPrisma.squad.findUnique({
    where: { accountId },
    include:{
      squadMembers:{
        include:{
          ownedPlayer: true,
        }
      }
    }
  });
  
  let squadPlayers = [];

  for(let i =0; i < squadInfo.squadMembers.length; i++){
    //const playerA1 = new Player(1, 'A1', 8, 6, 3, 'teamA');
    // playerA1.position = { x: 2, y: 2 };
      const info = squadInfo.squadMembers[i];
      const stat = info.ownedPlayer;
      const player = new Player(stat.ownedPlayerId, stat.name, stat.attack, stat.defence, stat.speed, temaName);
      squadPlayers.push(player);
  }
  
  return squadPlayers;
}
