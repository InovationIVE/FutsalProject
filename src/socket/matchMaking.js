import GameService from '../services/game.service.js';

export default function registerMatchmakingEvents(socket, waitingQueue) {
  socket.on('find_match', async () => {
    // 해당 계정이 이미 waitingQueue에 있느닞 확인
    if (waitingQueue.find((p) => p.accountId === socket.request.user.accountId)) {
      return;
    }

    // 없다면 waitingQueue를 만들어서 등록 시킴
    try {
      const matchingInfo = await GameService.getMatchInfo(socket);
      if (matchingInfo) {
        waitingQueue.push(matchingInfo);
        socket.emit('waiting_for_match');
      }
    } catch (error) {
      console.error(`Failed to get match info for socket ${socket.id}:`, error);
      socket.emit('matchmaking_error', { message: '매칭 정보를 가져오는데 실패했습니다.' });
    }
  });
}