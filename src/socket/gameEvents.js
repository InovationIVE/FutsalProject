import GameService from '../services/game.service.js';

export default function registerGameEvents(io, socket, gameRooms, socketIdToUserIdMap) {
  socket.on('game_action', ({ action, payload }) => {
    const roomId = Array.from(socket.rooms).find((r) => r.startsWith('room-'));
    if (!roomId) return;

    const game = gameRooms.get(roomId);
    if (!game || game.isGameOver) return;

    if (socket.id !== game.currentTeam.socketId) {
      return socket.emit('action_error', { message: "It's not your turn!" });
    }

    const player = [...game.teams[0].players, ...game.teams[1].players].find(
      (p) => p.id === payload.playerId,
    );
    if (!player) return;

    game.handleAction(action, player, payload);

    if (game.isGameOver) {
      registerGameEndEvents(game, socketIdToUserIdMap);
      gameRooms.delete(roomId);
      console.log(`Room ${roomId} closed.`);
    }

    io.to(roomId).emit('game_state_update', { gameState: game.getStateForClient() });
  });
}

async function registerGameEndEvents(game, socketIdToUserIdMap) {
  if (!game) {
    return;
  }

  const teamA = game.teams[0];
  const teamB = game.teams[1];
  let winner, loser;

  if (teamA.score > teamB.score) {
    winner = teamA;
    loser = teamB;
  } else if (teamB.score > teamA.score) {
    winner = teamB;
    loser = teamA;
  } else {
    game.log.push('무승부 입니다.');
    return;
  }

  game.log.push(`승리팀: ${winner.name}, 패배팀: ${loser.name}`);
  await GameService.updateRank(winner.socketId, loser.socketId, socketIdToUserIdMap);
}
