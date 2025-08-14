import GameManager from "../../Manager/GameManager.js";

document.addEventListener('DOMContentLoaded', () => {
  GameManager.setupNavigation();

  const socket = io();

  // --- DOM Elements ---
  const squadList = document.getElementById('squad-list');
  const rankingTableBody = document.querySelector('#ranking-table tbody');
  const gameStartBtn = document.getElementById('game-start-btn');
  const loadingOverlay = document.getElementById('loading-overlay');
  const matchTimerEl = document.getElementById('match-timer');

  let matchmakingTimer = null;

  // --- API Functions ---

  /**
   * Fetches the user's current squad from the server.
   * Assumes the server has an endpoint like GET /api/squad
   */
  async function fetchMySquad() {
    try {
      // NOTE: You might need to adjust the fetch URL and add authentication headers.
      const response = await fetch('/api/game', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const squad = await response.json();
      renderSquad(squad);
    } catch (error) {
      console.error('Error fetching squad:', error);
      squadList.innerHTML = '<p>스쿼드 정보를 불러오는 데 실패했습니다.</p>';
    }
  }

  /**
   * Fetches the top rankings from the server.
   * Assumes the server has an endpoint like GET /api/rank
   */
  async function fetchRankings() {
    try {
      // NOTE: You might need to adjust the fetch URL.
      const response = await fetch('/api/rank', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const rankings = await response.json();
      renderRankings(rankings);
    } catch (error) {
      console.error('Error fetching rankings:', error);
      rankingTableBody.innerHTML =
        '<tr><td colspan="3">랭킹 정보를 불러오는 데 실패했습니다.</td></tr>';
    }
  }

  // --- Rendering Functions ---

  /**
   * Renders the player cards for the squad.
   * @param {Array} squadMembers - Array of player objects.
   */
  function renderSquad(squadMembers) {
    squadList.innerHTML = ''; // Clear existing content
    if (!squadMembers || squadMembers.length === 0) {
      squadList.innerHTML = '<p>스쿼드에 선수가 없습니다. 선수를 추가해주세요.</p>';
      gameStartBtn.disabled = true;
      return;
    }

    squadMembers.forEach((member) => {
      const player = member.ownedPlayer;
      const card = document.createElement('div');
      card.className = 'player-card';
      card.innerHTML = `
                <img src="/path/to/player/images/${player.name}.png" alt="${player.name}" onerror="this.style.display='none'" />
                <h3>${player.name}</h3>
                <div class="stats">
                    <p>Lv: ${player.level} </p>
                    <p>등급: ${player.rarity} </p>
                    <p>공격: ${player.attack}</p>
                    <p>수비: ${player.defence}</p>
                    <p>속도: ${player.speed}</p>
                </div>
            `;
      squadList.appendChild(card);
    });
  }

  /**
   * Renders the ranking data into the table.
   * @param {Array} rankings - Array of ranking objects.
   */
  function renderRankings(rankings) {
    rankingTableBody.innerHTML = ''; // Clear existing content
    if (!rankings || rankings.length === 0) {
      rankingTableBody.innerHTML = '<tr><td colspan="7">랭킹 정보가 없습니다.</td></tr>';
      return;
    }

    rankings.forEach((rank, index) => {
      const row = document.createElement('tr');
      // Add data-user-id attribute to the row to identify the user
      row.dataset.userId = rank.account.userId;
      row.style.cursor = 'pointer'; // Make it look clickable

      row.innerHTML = `
                <td>${index + 1}</td>
                <td>${rank.account.userId}</td>
                <td>${rank.tier}</td>
                <td>${rank.rankScore}</td>
                <td>${rank.win}</td>
                <td>${rank.draw}</td>
                <td>${rank.lose}</td>
            `;
      rankingTableBody.appendChild(row);
    });
  }

  // --- Event Listeners ---

  gameStartBtn.addEventListener('click', () => {
    loadingOverlay.classList.remove('hidden');
    gameStartBtn.disabled = true;
    socket.emit('find_match');
  });

  // --- Socket Handlers ---

  socket.on('waiting_for_match', () => {
    if (matchmakingTimer) clearInterval(matchmakingTimer);
    let startTime = Date.now();
    matchmakingTimer = setInterval(() => {
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
      const minutes = String(Math.floor(elapsedTime / 60)).padStart(2, '0');
      const seconds = String(elapsedTime % 60).padStart(2, '0');
      matchTimerEl.textContent = `${minutes}:${seconds}`;
    }, 1000);
  });

  socket.on('match_found', () => {
    if (matchmakingTimer) clearInterval(matchmakingTimer);
    // Redirect to the game play scene
    // The server will emit 'game_start' which should be handled by the gameplay script.
    window.location.href = `../GamePlayScene/GamePlayScene.html`; // Adjust this URL if needed
  });

  socket.on('matchmaking_error', (data) => {
    if (matchmakingTimer) clearInterval(matchmakingTimer);
    alert(`매칭 오류: ${data.message}`);
    loadingOverlay.classList.add('hidden');
    gameStartBtn.disabled = false;
  });

  
  // --- Modal Logic ---
  const recordModal = document.getElementById('record-modal');
  const closeModalBtn = recordModal.querySelector('.close-button');
  const recordDetailsContainer = document.getElementById('record-details');
  const recordModalTitle = document.getElementById('record-modal-title');

  function openModal() {
    recordModal.style.display = 'flex';
  }

  function closeModal() {
    recordModal.style.display = 'none';
  }

  closeModalBtn.addEventListener('click', closeModal);
  recordModal.addEventListener('click', (e) => {
    // Close modal if overlay is clicked
    if (e.target === recordModal) {
      closeModal();
    }
  });

  rankingTableBody.addEventListener('click', (e) => {
    const row = e.target.closest('tr');
    if (row && row.dataset.userId) {
      const userId = row.dataset.userId;
      fetchAndShowMatchHistory(userId);
    }
  });

  async function fetchAndShowMatchHistory(userId) {
    recordModalTitle.textContent = `${userId}님의 경기 기록`;
    recordDetailsContainer.innerHTML = '<p>기록을 불러오는 중입니다...</p>';
    openModal();

    try {
      // IMPORTANT: This endpoint must exist on your server.
      // Example: GET /api/match/history/:userId
      const response = await fetch(`/api/match/history/${userId}`);
      if (!response.ok) {
        throw new Error(`서버 응답 오류: ${response.statusText}`);
      }
      const history = await response.json();
      renderMatchHistory(history);
    } catch (error) {
      console.error('Error fetching match history:', error);
      recordDetailsContainer.innerHTML = `<p>경기 기록을 불러오는 데 실패했습니다: ${error.message}</p>`;
    }
  }

  function renderMatchHistory(history) {
    if (!history || history.length === 0) {
      recordDetailsContainer.innerHTML = '<p>이 유저의 경기 기록이 없습니다.</p>';
      return;
    }

    // Renders the fetched match history into a table
    const table = `
          <table>
            <thead>
              <tr>
                <th>상대</th>
                <th>결과</th>
                <th>골 점수</th>
                <th>슛 점수</th>
                <th>패스 점수</th>
                <th>방어 점수</th>
                <th>날짜</th>
              </tr>
            </thead>
            <tbody>
              ${history
                .map(
                  (match) => `
                <tr>
                  <td>${match.opponentId || 'N/A'}</td>
                  <td>${match.result || 'N/A'}</td>
                  <td>${match.goalScore}</td>
                  <td>${match.shootScore}</td>
                  <td>${match.passScore}</td>
                  <td>${match.defenceScore}</td>
                  <td>${new Date(match.createdAt).toLocaleString()}</td>
                </tr>
              `,
                )
                .join('')}
            </tbody>
          </table>
        `;
    recordDetailsContainer.innerHTML = table;
  }

  // --- Initial Load ---
  function initialize() {
    fetchMySquad();
    fetchRankings();
  }

  initialize();
});

