import registerMatchmakingEvents from './matchmaking.js';
import registerGameEvents from './gameEvents.js';

export default function initSocketEvents(io) {
  const waitingQueue = []; // 매칭 대기열
  const matchedPlayers = []; // 1:1 매칭
  const gameRooms = new Map(); // 활성화된 게임방 목록
  const socketIdToUserIdMap = new Map();

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    registerMatchmakingEvents(io, socket, waitingQueue, matchedPlayers, gameRooms, socketIdToUserIdMap);
    registerGameEvents(io, socket, gameRooms, socketIdToUserIdMap);

    socket.on('disconnect', () => {
      console.log('User disconnected', socket.id);
      const index = waitingQueue.findIndex((s) => s.id === socket.id);
      if (index !== -1) {
        waitingQueue.splice(index, 1);
        console.log(`User ${socket.id} removed from the queue`);
      }
      // TODO: Handle disconnection during a match
    });
  });
}
