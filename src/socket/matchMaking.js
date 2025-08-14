import GameService from '../services/game.service.js';

export default function registerMatchmakingEvents(socket, waitingQueue) {
  socket.on('find_match', async () => {
    // Check if the user is already in the queue
    if (waitingQueue.find((p) => p.accountId === socket.request.user.accountId)) {
      return;
    }

    // Get player info and add them to the queue
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