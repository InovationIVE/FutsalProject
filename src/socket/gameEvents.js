export default function registerGameEvents(io, socket, gameRooms) {
  socket.on('game_action', ({ action, payload }) => {
    const roomId = Array.from(socket.rooms).find((r) => r.startsWith('room-'));
    if (!roomId) return;

    const game = gameRooms.get(roomId);
    if (!game || game.isGameOver) return;

    if (socket.id !== game.currentTeam.socketId) {
      return socket.emit('action_error', { message: "It's not your turn!" });
    }

    const player = [...game.teams[0].players, ...game.teams[1].players].find(
      (p) => p.id === payload.playerId,
    );
    if (!player) return;

    switch (action) {
      case 'move':
        game.handleAction('move', player, { x: payload.x, y: payload.y });
        socket.emit('move_result', { message: game.log });
        break;
      case 'shoot':
        game.handleAction('shoot', player);
        socket.emit('shoot_result', { message: game.log });
        break;
      case 'pass':
        const receiverInstance = [...game.teams[0].players, ...game.teams[1].players].find(
          (p) => p.id === payload.receiverId,
        );
        if (receiverInstance) {
          game.handleAction('pass', player, receiverInstance);
        } else {
          return socket.emit('action_error', { message: 'Pass receiver not found!' });
        }
        socket.emit('pass_result', { message: game.log });
        break;
      case 'tackle':
        game.handleAction('tackle', player);
        socket.emit('tackle_result', { message: game.log });
        break;
      case 'getBall':
        game.handleAction('getBall', player);
        socket.emit('getBall_result', { message: game.log });
        break;
    }

    io.to(roomId).emit('game_state_update', { gameState: game.getStateForClient() });
  });
}
