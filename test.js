import { userPrisma } from './src/utils/prisma/index.js';
import { Player } from './src/game/Player.js';

const squadInfo = await userPrisma.squad.findUnique({
  where: { accountId: 2 },
  include: {
    squadMembers: {
      include: {
        ownedPlayer: true,
      },
    },
  },
});

let players = [];

for (let i = 0; i < squadInfo.squadMembers.length; i++) {
  //const playerA1 = new Player(1, 'A1', 8, 6, 3, 'teamA');
  // playerA1.position = { x: 2, y: 2 };
  const info = squadInfo.squadMembers[i];
  const stat = info.ownedPlayer;
  const player = new Player(stat.playerId, stat.name, stat.attack, stat.defence, stat.speed, 'A');
  console.log(player.name);
  players.push(player);
}

console.log(players[0]);
