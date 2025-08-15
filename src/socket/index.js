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
   //매칭 큐가 2이상이면 tryMatch 함수로 비슷한 점수 끼리 매칭 후 반환
    while (waitingQueue.length >= 2) {
      const matchedPlayers = GameService.tryMatch(waitingQueue); // 비슷한 점수 끼리 플레이어 매칭

      // 2명 매칭되면 실제 플레이할 게임방으로 보냄
      if (matchedPlayers.length >= 2) {
        const player1 = matchedPlayers[0];
        const player2 = matchedPlayers[1];

        const matchingRoomId = `room-${player1.socket.id} : ${player2.socket.id}`;

        // 같은 이름의 roomId로 socket을 각각의 플레이어 2명에 소캣에 추가
        player1.socket.join(matchingRoomId);
        player2.socket.join(matchingRoomId);

        // 매치한 내용을 클라이언트로 보내서 match_found를 실행 시킴
        io.to(matchingRoomId).emit('match_found');
      } else {
        break;
      }
    }
  }, 3000); // 3초 간격으로 루프를 돌면서 매칭 선수를 찾음

  io.on('connection', (socket) => {
    registerMatchmakingEvents(socket, waitingQueue); // 게임 시작을 누르면 waitigQueue에 등록해주는 함수
    registerGameEvents(io, socket, gameRooms); // 게임 플레이 시 클라이언트에서 보내는 game_action 실행해주는 함수
    regiserJoinGameRoom(io, socket, gameRooms, battleQueue); // 게임플레이씬으로 2명의 선수를 보내는 함수(클라이언트 match_found에서 실행 시킴)

    socket.on('disconnect', () => {
      // 연결 해제 되면 waitingQueue에서 삭제
      const index = waitingQueue.findIndex((p) => p.socket.id === socket.id);
      if (index !== -1) {
        waitingQueue.splice(index, 1);
      }
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
