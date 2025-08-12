

document.addEventListener('DOMContentLoaded', () => {
  const socket = io();

  // --- DOM Elements ---
  const board = document.getElementById('game-board');
  const teamAScoreEl = document.getElementById('teamA-score');
  const teamBScoreEl = document.getElementById('teamB-score');
  const turnCounterEl = document.getElementById('turn-counter');
  const maxTurnsEl = document.getElementById('max-turns');
  const currentTeamEl = document.getElementById('current-team');
  const ballOwnerEl = document.getElementById('ball-owner');
  const selectedPlayerNameEl = document.getElementById('selected-player-name');
  const shootBtn = document.getElementById('shoot-btn');
  const moveBtn = document.getElementById('move-btn');
  const passBtn = document.getElementById('pass-btn');
  const tackleBtn = document.getElementById('tackle-btn');
  const getBallBtn = document.getElementById('get-ball-btn');
  const logList = document.getElementById('log-list');
  const ReadyBtn = document.getElementById('find-match-btn'); // Assuming you add this button to your HTML


  const urlParams = new URLSearchParams(window.location.search);
  const roomId = urlParams.get('roomId');

  socket.emit('join_game_room');

  // --- Game State ---
  let selectedPlayer = null;
  let game = null; // Game state will be received from the server
  let matchmakingTimer = null;

  // --- Socket Event Handlers ---
  ReadyBtn.addEventListener('click', () => {
    log('상대방을 기다리는 중...');
    socket.emit('find_match');
    ReadyBtn.disabled = true;
  });

  socket.on('waiting_for_match', (data) => {
    // Start a timer and display it.
    if (matchmakingTimer) clearInterval(matchmakingTimer);

    let startTime = Date.now();
    const timerLogElement = log(`경과 시간: 00:00`);

    matchmakingTimer = setInterval(() => {
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
      const minutes = String(Math.floor(elapsedTime / 60)).padStart(2, '0');
      const seconds = String(elapsedTime % 60).padStart(2, '0');
      timerLogElement.textContent = `경과 시간: ${minutes}:${seconds}`;
    }, 1000);
  });

  socket.on('already_in_queue', (data) => {
    log(data.message);
    ReadyBtn.disabled = false; // Re-enable button if they are already in queue somehow
  });

  socket.on('matchmaking_error', (data) => {
    log(`매칭 오류: ${data.message}`);
    if (matchmakingTimer) clearInterval(matchmakingTimer);
    ReadyBtn.disabled = false;
  });


  socket.on('game_start', (data) => {
    log('게임 시작!');
    game = data.gameState;
    const allPlayers = [...game.teams[0].players, ...game.teams[1].players];
    const ballOwner = allPlayers.find((p) => p.id === game.ball.ownerId);
    log(`${ballOwner.name}가 공을 가지고 시작합니다.`);
    log(`---${game.selectedTeam.name}의 턴 시작---`);
    render();
    updateUI();
  });

  // --- Rendering and UI ---
  function render() {
    if (!game) return;
    board.innerHTML = '';
    for (let y = 0; y < game.gameMap.height; y++) {
      for (let x = 0; x < game.gameMap.width; x++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        cell.dataset.x = x;
        cell.dataset.y = y;
        board.appendChild(cell);
      }
    }

    // Render goals
    const goalACell = getCell(game.goalA.position.x, game.goalA.position.y);
    const goalBCell = getCell(game.goalB.position.x, game.goalB.position.y);
    goalACell.style.backgroundColor = 'lightblue';
    goalBCell.style.backgroundColor = 'lightcoral';

    // Render players
    const allPlayers = [...game.teams[0].players, ...game.teams[1].players];
    allPlayers.forEach((p) => {
      const playerEl = document.createElement('div');
      playerEl.classList.add('player', p.teamName);
      playerEl.textContent = p.name;
      playerEl.dataset.playerId = p.id;
      if (game.ball.ownerId && game.ball.ownerId === p.id) {
        playerEl.style.fontWeight = 'bold';
        playerEl.textContent += '*';
      }
      if (selectedPlayer && selectedPlayer.id === p.id) {
        playerEl.classList.add('selected');
      }
      const cell = getCell(p.position.x, p.position.y);
      cell.appendChild(playerEl);
    });

    // Render ball
    if (!game.ball.ownerId) {
      const ballEl = document.createElement('div');
      ballEl.classList.add('ball');
      const cell = getCell(game.ball.position.x, game.ball.position.y);
      cell.appendChild(ballEl);
    }
  }

  function updateUI() {
    if (!game) return;

    // Update scores, turn counters etc.
    teamAScoreEl.textContent = game.teams[0].score;
    teamBScoreEl.textContent = game.teams[1].score;
    turnCounterEl.textContent = game.turnCount;
    maxTurnsEl.textContent = game.maxTurns;
    currentTeamEl.textContent = game.selectedTeam.name;

    const allPlayers = [...game.teams[0].players, ...game.teams[1].players];
    const ballOwner = allPlayers.find((p) => p.id === game.ball.ownerId);

    ballOwnerEl.textContent = ballOwner ? ballOwner.name : 'None';

    // Determine if it is this client's turn
    const isMyTurn = game.selectedTeam.socketId === socket.id;

    // Update selected player display
    selectedPlayerNameEl.textContent = selectedPlayer ? selectedPlayer.name : 'None';

    // Enable/disable buttons based on turn and selected player
    const canPerformAction =
      isMyTurn &&
      selectedPlayer &&
      game.selectedTeam.players.some((p) => p.id === selectedPlayer.id);

    shootBtn.disabled =
      !canPerformAction || !game.ball.ownerId || game.ball.ownerId !== selectedPlayer.id;
    moveBtn.disabled = !canPerformAction;
    passBtn.disabled =
      !canPerformAction || !game.ball.ownerId || game.ball.ownerId !== selectedPlayer.id;
    tackleBtn.disabled =
      !canPerformAction ||
      (game.ball.ownerId && game.selectedTeam.players.some((p) => p.id === game.ball.ownerId));
    getBallBtn.disabled = !canPerformAction || game.ball.ownerId;

    // Visually indicate whose turn it is
    if (isMyTurn) {
      document.body.classList.add('my-turn');
    } else {
      document.body.classList.remove('my-turn');
    }
  }

  function log(message) {
    const li = document.createElement('li');
    li.textContent = message;
    logList.appendChild(li);
    logList.scrollTop = logList.scrollHeight; // Auto-scroll
    return li; // Return the created element
  }

  function getCell(x, y) {
    return document.querySelector(`.grid-cell[data-x='${x}'][data-y='${y}']`);
  }

  // --- Event Handlers ---
  board.addEventListener('click', (e) => {
    if (!game || game.isGameOver) return;

    const target = e.target;
    // Player Selection
    if (target.classList.contains('player')) {
      const playerId = parseInt(target.dataset.playerId);
      const player = [...game.teams[0].players, ...game.teams[1].players].find(
        (p) => p.id === playerId,
      );
      // TODO: Check if it's the client's turn to select
      selectedPlayer = player;
      updateUI();
      render();
    }
    // Move Action
    else if (target.classList.contains('grid-cell') && selectedPlayer) {
      const x = parseInt(target.dataset.x);
      const y = parseInt(target.dataset.y);
      const isCheckPosition = [...game.teams[0].players, ...game.teams[1].players].find(
        (p) => p.position.x === x && p.position.y === y,
      );
      if (isCheckPosition) {
        log('기물이 있습니다.');
        updateUI();
        render();
        return;
      } else {
        socket.emit('game_action', {
          action: 'move',
          payload: { x, y, playerId: selectedPlayer.id },
        });
      }
    }
  });

  socket.on('move', (data) => {
    log(data.message);
    render();
    updateUI();
  });

  socket.on('nextTurn', (data) => {
    log(data.message);
  });

  shootBtn.addEventListener('click', () => {
    if (selectedPlayer) {
      socket.emit('game_action', { action: 'shoot', payload: { playerId: selectedPlayer.id } });
    }
  });

  passBtn.addEventListener('click', () => {
    if (selectedPlayer) {
      const teammates = game.selectedTeam.players.filter((p) => p.id !== selectedPlayer.id);
      // For simplicity, prompt for target. A better UI would be to click another player.
      const receiverName = prompt(
        `누구에게 패스하시겠습니까?\n` + teammates.map((p, i) => `${i + 1}. ${p.name}`).join('\n'),
      );
      if (receiverName) {
        const receiver = teammates[parseInt(receiverName) - 1];
        socket.emit('game_action', {
          action: 'pass',
          payload: { receiverId: receiver.id, playerId: selectedPlayer.id },
        });
      }
    }
  });

  tackleBtn.addEventListener('click', () => {
    if (selectedPlayer) {
      socket.emit('game_action', {
        action: 'tackle',
        payload: { playerId: selectedPlayer.id },
      });
    }
  });

  getBallBtn.addEventListener('click', () => {
    if (selectedPlayer) {
      socket.emit('game_action', {
        action: 'getBall',
        payload: { playerId: selectedPlayer.id },
      });
    }
  });

  // Listen for state updates from the server
  socket.on('game_state_update', (data) => {
    game = data.gameState;
    const logs = game.log;
    for (let i = 0; i < logs.length; i++) {
      log(logs[i]);
    }

    render();
    updateUI();
  });

  socket.on('process_game_end', (data) =>{
    socket.emit('process_game_end', { roomId: data.roomId})
  });

  socket.on('game_ended', (data) =>{
    log(data.result);
  });

  socket.on('action_error', (data) => {
    log(`Error: ${data.message}`);
  });

});
