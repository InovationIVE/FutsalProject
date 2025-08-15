import GameService from '../services/game.service.js';

export default function registerGameEvents(io, socket, gameRooms) {
  socket.on('game_action', ({ action, payload }) => {
    const roomId = Array.from(socket.rooms).find((r) => r.startsWith('room-'));
    if (!roomId) return;

    const game = gameRooms.get(roomId);
    if (!game || game.isGameOver) return;

    if (socket.request.user.accountId !== game.currentTeam.accountId) {
      return socket.emit('action_error', { message: '나의 턴이 아닙니다.' });
    }

    const player = [...game.teams[0].players, ...game.teams[1].players].find(
      (p) => p.id === payload.playerId,
    );
    if (!player) return;

    game.handleAction(action, player, payload);

    if (game.isGameOver) {
      registerGameEndEvents(game);
      gameRooms.delete(roomId);
    }

    io.to(roomId).emit('game_state_update', { gameState: game.getStateForClient() });
  });
}

async function registerGameEndEvents(game) {
  if (!game) {
    return;
  }

  const teamA = game.teams[0];
  const teamB = game.teams[1];
  let winner, loser;
  let resultA, reulstB;

  if (teamA.score > teamB.score) {
    winner = teamA;
    loser = teamB;
    resultA = '승리';
    reulstB = '패배';
  } else if (teamB.score > teamA.score) {
    winner = teamB;
    loser = teamA;
    resultA = '패배';
    reulstB = '승리';
  } else {
    game.log.push('무승부 입니다.');
    resultA = '무승부';
    reulstB = '무승부';
    await GameService.updateDraw(teamA.accountId, teamB.accountId);
  }

  if (!winner && !loser) {
    game.log.push(`승리팀: ${winner.name}, 패배팀: ${loser.name}`);
    await GameService.updateRank(winner.accountId, loser.accountId);
  }

  await GameService.createMatchHistory(teamA, teamB, game, resultA, reulstB);
}
