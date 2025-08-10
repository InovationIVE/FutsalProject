// --- Game Classes ---
import { MapData } from '../game/MapData.js';
import { GoalPost } from '../game/GoalPost.js';
import { Ball } from '../game/ball.js';
import { Player } from '../game/Player.js';
import { Team } from '../game/Team.js';
import { Game } from '../game/Game.js';



export default class GameService {
  static initGame(player1SocketId, player2SocketId) {
    const gameMap = new MapData(7, 5);
    const goalA = new GoalPost({ x: 0, y: 2 });
    const goalB = new GoalPost({ x: 6, y: 2 });
    const ball = new Ball();

    // TODO: Replace with actual player data from DB
    const playerA1 = new Player(1, 'A1', 8, 6, 3, 'teamA');
    playerA1.position = { x: 2, y: 2 };
    const playerA2 = new Player(2, 'A2', 8, 6, 3, 'teamA');
    playerA2.position = { x: 1, y: 1 };
    const playerA3 = new Player(3, 'A3', 8, 6, 3, 'teamA');
    playerA3.position = { x: 1, y: 3 };

    const playerB1 = new Player(4, 'B1', 7, 6, 3, 'teamB');
    playerB1.position = { x: 4, y: 2 };
    const playerB2 = new Player(5, 'B2', 7, 6, 3, 'teamB');
    playerB2.position = { x: 5, y: 1 };
    const playerB3 = new Player(6, 'B3', 7, 6, 3, 'teamB');
    playerB3.position = { x: 5, y: 3 };

    const teamA = new Team('Team A', [playerA1, playerA2, playerA3], player1SocketId);
    const teamB = new Team('Team B', [playerB1, playerB2, playerB3], player2SocketId);

    const game = new Game(teamA, teamB, ball, gameMap, goalA, goalB);

    const allPlayers = [...teamA.players, ...teamB.players];
    allPlayers.forEach((p) => {
      game.initialPlayerPositions[p.id] = { ...p.position };
    });

    game.start(); // Initialize ball owner and first turn

    return game;
  }
}
