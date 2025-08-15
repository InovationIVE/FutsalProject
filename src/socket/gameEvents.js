import GameService from '../services/game.service.js';


// 클라이언트에서 game_action을 호출하면 아래 코드가 실행됨
export default function registerGameEvents(io, socket, gameRooms) {
  socket.on('game_action', ({ action, payload }) => {

    // 소켓에서 room-으로 시작하는 소캣 방이 있는지 확인
    const roomId = Array.from(socket.rooms).find((r) => r.startsWith('room-'));
    if (!roomId) return;

    // 있다면 해당 룸에 게임이 있는지 확인
    const game = gameRooms.get(roomId);
    if (!game || game.isGameOver) return;

    // 나의 턴이 아니면 클라이언트에게 알려줌
    if (socket.request.user.accountId !== game.currentTeam.accountId) {
      return socket.emit('action_error', { message: '나의 턴이 아닙니다.' });
    }

    const player = [...game.teams[0].players, ...game.teams[1].players].find(
      (p) => p.id === payload.playerId,
    );
    if (!player) return;

    // 클라이언트에 입력 받은 로직을 처리
    game.handleAction(action, player, payload);

    // 게임 종료되면 실행
    if (game.isGameOver) {
      registerGameEndEvents(game); // 게임 종료 이벤트 함수
      gameRooms.delete(roomId); // 종료되면 gaemRooms에서 삭제
    }

    io.to(roomId).emit('game_state_update', { gameState: game.getStateForClient() });
  });
}

// 게임 종료 이벤트에서 승패 여부 확인
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

  if (winner && loser) {
    game.log.push(`승리팀: ${winner.name}, 패배팀: ${loser.name}`);
    await GameService.updateRank(winner.accountId, loser.accountId);
  }

  await GameService.createMatchHistory(teamA, teamB, game, resultA, reulstB);
}
