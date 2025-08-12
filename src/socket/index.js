import registerMatchmakingEvents from './matchmaking.js';
import registerGameEvents from './gameEvents.js';
import GameService from '../services/game.service.js';

export default function initSocketEvents(io) {
  const waitingQueue = []; // 매칭 대기열
  const gameRooms = new Map(); // 활성화된 게임방 목록
  const socketIdToUserIdMap = new Map();

  // --- Matchmaking Loop ---
  setInterval(() => {
    // Keep trying to match players as long as there are enough in the queue
    while (waitingQueue.length >= 2) {
      const matchedPlayers = GameService.tryMatch(waitingQueue); // This function is now synchronous and modifies the queue directly

      if (matchedPlayers.length >= 2) {
        const player1 = matchedPlayers[0];
        const player2 = matchedPlayers[1];

        console.log(`Match found between ${player1.socket.id} and ${player2.socket.id}`);

        const roomId = `room-${player1.socket.id}-${player2.socket.id}`;
        player1.socket.join(roomId);
        player2.socket.join(roomId);

        // Notify players that a match is found
        io.to(roomId).emit('match_found', { 
          message: '매치가 성사되었습니다!', 
          roomId, 
          opponents: { 
            [player1.socket.id]: player2.accountId, 
            [player2.socket.id]: player1.accountId 
          }
        });

        socketIdToUserIdMap.set(player1.socket.id, player1.accountId);
        socketIdToUserIdMap.set(player2.socket.id, player2.accountId);

        // Initialize and start the game
        GameService.initGame(
          player1.socket.id,
          player2.socket.id,
          player1.accountId,
          player2.accountId,
        ).then(gameState => {
          gameRooms.set(roomId, gameState);
          io.to(roomId).emit('game_start', { gameState: gameState.getStateForClient() });
        }).catch(error => {
          console.error(`Failed to initialize game for room ${roomId}:`, error);
          io.to(roomId).emit('game_init_failed', { message: '게임 초기화에 실패했습니다.' });
        });

      } else {
        // No more matches could be made in this cycle
        break;
      }
    }
  }, 3000); // Run the matchmaking loop every 3 seconds

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Register event handlers for the connected socket
    registerMatchmakingEvents(socket, waitingQueue);
    registerGameEvents(io, socket, gameRooms, socketIdToUserIdMap);

    socket.on('disconnect', () => {
      console.log('User disconnected', socket.id);
      // Remove the user from the waiting queue if they are in it
      const index = waitingQueue.findIndex((p) => p.socket.id === socket.id);
      if (index !== -1) {
        waitingQueue.splice(index, 1);
        console.log(`User ${socket.id} removed from the queue`);
      }
      // TODO: Handle disconnection during an active match
    });
  });
}