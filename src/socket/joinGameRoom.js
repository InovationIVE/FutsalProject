import GameService from '../services/game.service.js';

/* 이제 게임 준비 화면에서 매칭이 완료되면 여기서 게임 플레이 화면에서 다시 플레이할 게임 방을 만들고
  클라이언트에게 게임 시작을 요청함   
*/
export default function regiserJoinGameRoom(io, socket, gameRooms, battleQueue) {
  socket.on('join_game_room', async () => {
    if (battleQueue.find((p) => p.id === socket.id)) {
      return;
    }
    const battleUser = {
      socket: socket,
      accountId: socket.request.user.accountId,
    };

    battleQueue.push(battleUser);

    if (battleQueue.length >= 2) {
      const player1 = battleQueue.shift();
      const player2 = battleQueue.shift();

      if(player1.accountId === player2.accountId){
        player2.socket.emit('matchmaking_error',{ message: '잘못된 접속입니다.'});    
        return;
      }

      const roomId = `room-${player1.socket.id}-${player2.socket.id}`;
      player1.socket.join(roomId);
      player2.socket.join(roomId);

      const accountId1 = player1.accountId;
      const accountId2 = player2.accountId;

      // 게임 설정을 초기화
      const game = await GameService.initGame(
        player1.socket.id,
        player2.socket.id,
        accountId1,
        accountId2,
      );
      gameRooms.set(roomId, game);

      io.to(roomId).emit('game_start', { gameState: game.getStateForClient() });
    }
  });
}
