import  GameService  from "../services/game.service.js";

export default function registerMatchmakingEvents(io, socket, waitingQueue, gameRooms) {
  socket.on('find_match', () => {
    if (waitingQueue.find((p) => p.id === socket.id) || Array.from(socket.rooms).length > 1) {
      return;
    }

    console.log(`User ${socket.id} is looking for a match`);
    waitingQueue.push(socket);

    if (waitingQueue.length >= 2) {
      const player1Socket = waitingQueue.shift();
      const player2Socket = waitingQueue.shift();

      console.log(`Match found between ${player1Socket.id} and ${player2Socket.id}`);

      const roomId = `room-${player1Socket.id}-${player2Socket.id}`;
      player1Socket.join(roomId);
      player2Socket.join(roomId);

      player1Socket.emit('match_found', { opponentId: player2Socket.id, roomId });
      player2Socket.emit('match_found', { opponentId: player1Socket.id, roomId });

      const gameState = GameService.initGame(player1Socket.id, player2Socket.id);
      gameRooms.set(roomId, gameState);

      io.to(roomId).emit('game_start', { gameState });
    } else {
      socket.emit('waiting_for_match', { message: '상대를 기다리는 중입니다...' });
    }
  });
}
