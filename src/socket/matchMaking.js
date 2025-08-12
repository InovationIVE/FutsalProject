import GameService from '../services/game.service.js';

export default function registerMatchmakingEvents(socket, waitingQueue) {
  socket.on('find_match', async () => {
    // Check if the user is already in the queue
    if (waitingQueue.find((p) => p.accountId === socket.request.user.accountId)) {
      console.log(`User ${socket.id} is already in the queue.`);
      socket.emit('already_in_queue', { message: '이미 대기열에 등록되어 있습니다.' });
      return;
    }

    // Get player info and add them to the queue
    try {
      const matchingInfo = await GameService.getMatchInfo(socket);
      if (matchingInfo) {
        waitingQueue.push(matchingInfo);
        console.log(
          `User ${socket.id} joined the matchmaking queue. Queue length: ${waitingQueue.length}`,
        );
        socket.emit('waiting_for_match', { message: '상대를 찾고 있습니다...' });
      }
    } catch (error) {
      console.error(`Failed to get match info for socket ${socket.id}:`, error);
      socket.emit('matchmaking_error', { message: '매칭 정보를 가져오는데 실패했습니다.' });
    }
  });
}