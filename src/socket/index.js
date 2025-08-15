import registerMatchmakingEvents from './matchmaking.js';
import registerGameEvents from './gameEvents.js';
import regiserJoinGameRoom from './joinGameRoom.js';
import GameService from '../services/game.service.js';

export default function initSocketEvents(io) {
  const waitingQueue = []; // 매칭 대기열
  const battleQueue = []; // 매칭 후 1:1 경기 큐
  const gameRooms = new Map(); // 활성화된 게임방 목록

  //매칭 루프
  setInterval(() => {
    // Keep trying to match players as long as there are enough in the queue
    while (waitingQueue.length >= 2) {
      const matchedPlayers = GameService.tryMatch(waitingQueue); // This function is now synchronous and modifies the queue directly

      if (matchedPlayers.length >= 2) {
        const player1 = matchedPlayers[0];
        const player2 = matchedPlayers[1];

        const matchingRoomId = `room-${player1.socket.id} : ${player2.socket.id}`;
        player1.socket.join(matchingRoomId);
        player2.socket.join(matchingRoomId);

        // Notify players that a match is found
        io.to(matchingRoomId).emit('match_found');
      } else {
        break;
      }
    }
  }, 3000); // Run the matchmaking loop every 3 seconds

  io.on('connection', (socket) => {
    registerMatchmakingEvents(socket, waitingQueue);
    registerGameEvents(io, socket, gameRooms);
    regiserJoinGameRoom(io, socket, gameRooms, battleQueue);

    socket.on('disconnect', () => {
      // Remove the user from the waiting queue if they are in it
      const index = waitingQueue.findIndex((p) => p.socket.id === socket.id);
      if (index !== -1) {
        waitingQueue.splice(index, 1);
      }
      // TODO: Handle disconnection during an active match
      // 활성 게임에서 유저가 나갔을 경우 처리
      let roomToClean = null;
      let opponentSocket = null;
      for (const [roomId, game] of gameRooms.entries()) {
        if (game.teamA.socketId === socket.id) {
          opponentSocket = io.sockets.sockets.get(game.teamB.socketId);
          roomToClean = roomId;
          break;
        }

        if (game.teamB.socketId === socket.id) {
          opponentSocket = io.sockets.sockets.get(game.teamA.socketId);
          roomToClean = roomId;
          break;
        }
      }

      if (roomToClean && opponentSocket) {
        // 남아있는 플레이어에게 상대방이 나갔음을 알림
        opponentSocket.emit('opponent_left', {
          message: '상대방의 연결이 끊겼습니다. 게임이 종료됩니다.',
        });
        // 게임 룸 정리
        gameRooms.delete(roomToClean);
        console.log(`Game room ${roomToClean} closed due to disconnection.`);
      }
    });
  });
}
