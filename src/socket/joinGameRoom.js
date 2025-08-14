import GameService from '../services/game.service.js';

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

      const roomId = `room-${player1.socket.id}-${player2.socket.id}`;
      player1.socket.join(roomId);
      player2.socket.join(roomId);

      const accountId1 = player1.accountId;
      const accountId2 = player2.accountId;

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
