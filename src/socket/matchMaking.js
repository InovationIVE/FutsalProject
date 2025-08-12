import GameService from '../services/game.service.js';

export default function registerMatchmakingEvents(
  io,
  socket,
  waitingQueue,
  matchedPlayers,
  gameRooms,
  socketIdToUserIdMap,
) {
  socket.on('find_match', async () => {
    const matchingInfo = await GameService.getMatchInfo(socket);

    if (waitingQueue.find((p) => p.accountId === socket.request.user.accountId)) return;

    console.log(`User ${matchingInfo.socket.id} is looking for a match`);
    waitingQueue.push(matchingInfo);

    matchedPlayers = await GameService.tryMatch(waitingQueue);

    if (matchedPlayers && matchedPlayers.length >= 2) {
      const player1Socket = matchedPlayers.shift();
      const player2Socket = matchedPlayers.shift();
      const accountId1 = player1Socket.accountId;
      const accountId2 = player2Socket.accountId;

      console.log(`Match found between ${player1Socket.socket.id} and ${player2Socket.socket.id}`);

      const roomId = `room-${player1Socket.socket.id}-${player2Socket.socket.id}`;
      player1Socket.socket.join(roomId);
      player2Socket.socket.join(roomId);

      player1Socket.socket.emit('match_found', { opponentId: player2Socket.socket.id, roomId });
      player2Socket.socket.emit('match_found', { opponentId: player1Socket.socket.id, roomId });

      socketIdToUserIdMap.set(player1Socket.socket.id, accountId1);
      socketIdToUserIdMap.set(player2Socket.socket.id, accountId2);

      const gameState = await GameService.initGame(
        player1Socket.socket.id,
        player2Socket.socket.id,
        accountId1,
        accountId2,
      );
      gameRooms.set(roomId, gameState);
      io.to(roomId).emit('game_start', { gameState: gameState.getStateForClient() });
    } else {
      socket.emit('waiting_for_match', { message: '상대를 기다리는 중입니다...' });
    }
  });
}
