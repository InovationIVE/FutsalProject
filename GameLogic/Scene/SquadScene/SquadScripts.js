/**
 * Squad Scene 스크립트
 * 기능: 보유 선수 목록 및 현재 스쿼드 조회, 드래그앤드롭으로 스쿼드 구성, 팀 저장/해제
 */

document.addEventListener('DOMContentLoaded', () => {
  // 전역 상태 및 변수 초기화
  const state = {
    allPlayers: [], // 사용자가 보유한 모든 선수 목록
    squadSlots: [null, null, null], // 3개의 스쿼드 슬롯, player 객체 또는 null을 저장
  };

  // DOM 요소 캐싱
  const elements = {
    playerListContainer: document.querySelector('.player-list'),
    cardSlots: document.querySelectorAll('.cards .card'),
    saveButton: document.getElementById('save-team-btn'),
    clearButton: document.getElementById('clear-team-btn'),
  };

  /**
   * 페이지 초기화 함수
   */
  async function initialize() {
    setupNavigation();
    setupEventListeners();
    await loadAllPlayers();
    await loadCurrentSquad();
  }

  /**
   * 네비게이션 버튼 이벤트 리스너 설정
   */
  function setupNavigation() {
    const navLinks = {
        '../CashShopScene/CashShopScene.html': document.querySelector('.cashShopBtn'),
        '../GachaScene/GachaScene.html': document.querySelector('.gachaBtn'),
        '../OwnedScene/OwnedScene.html': document.querySelector('.MyPlayerBtn'),
        '../SquadScene/SquadScene.html': document.querySelector('.MysquadBtn'),
        '../GamePlayScene/GamePlayScene.html': document.querySelector('.gamePlayBtn'),
    };
    for (const url in navLinks) {
        if (navLinks[url]) {
            navLinks[url].addEventListener('click', () => window.location.href = url);
        }
    }
  }

  /**
   * 주요 DOM 요소들의 이벤트 리스너 설정
   */
  function setupEventListeners() {
    elements.saveButton.addEventListener('click', handleSaveSquad);
    elements.clearButton.addEventListener('click', handleClearSquad);

    // 드래그앤드롭을 위한 카드 슬롯 이벤트 설정
    elements.cardSlots.forEach((slot, index) => {
      slot.addEventListener('dragover', handleDragOver);
      slot.addEventListener('dragleave', handleDragLeave);
      slot.addEventListener('drop', (event) => handleDrop(event, index));
    });
  }

  /**
   * API로부터 모든 보유 선수를 불러와 state에 저장하고 목록을 렌더링
   */
  async function loadAllPlayers() {
    try {
      const response = await fetch('/ownedplayers');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const result = await response.json();
      state.allPlayers = result.data || [];
      renderPlayerList();
    } catch (error) {
      console.error('보유 선수 목록 로딩 실패:', error);
      elements.playerListContainer.innerHTML = '<p>선수 목록을 불러올 수 없습니다.</p>';
    }
  }

  /**
   * API로부터 현재 스쿼드 정보를 불러와 state에 반영하고 렌더링
   */
  async function loadCurrentSquad() {
    try {
      const response = await fetch('/squad'); // GET /squad API 필요
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const result = await response.json();
      if (result.data && result.data.squadMembers) {
        result.data.squadMembers.forEach((member, index) => {
          if (index < state.squadSlots.length) {
            const playerInSquad = state.allPlayers.find(p => p.ownedPlayerId === member.ownedPlayerId);
            if(playerInSquad) state.squadSlots[index] = playerInSquad;
          }
        });
      }
      renderSquadCards();
    } catch (error) {
      console.error('현재 스쿼드 정보 로딩 실패:', error);
    }
  }

  /**
   * state.allPlayers를 기반으로 좌측 선수 목록 UI를 렌더링
   */
  function renderPlayerList() {
    elements.playerListContainer.innerHTML = '<h3>선수 목록</h3>'; // 목록 초기화
    if (state.allPlayers.length === 0) {
      elements.playerListContainer.innerHTML += '<p>보유한 선수가 없습니다.</p>';
      return;
    }
    state.allPlayers.forEach(player => {
      const item = document.createElement('div');
      item.className = 'player-item';
      item.textContent = player.name || 'Unknown';
      item.draggable = true;
      item.dataset.ownedPlayerId = player.ownedPlayerId;
      item.addEventListener('dragstart', handleDragStart);
      elements.playerListContainer.appendChild(item);
    });
  }

  /**
   * state.squadSlots를 기반으로 스쿼드 카드 UI를 렌더링
   */
  function renderSquadCards() {
    elements.cardSlots.forEach((slot, index) => {
      const player = state.squadSlots[index];
      const profileImageDiv = slot.querySelector('.profileImage');
      const statsDiv = slot.querySelector('.stats');
      if (player) {
        statsDiv.innerHTML = `
          <div>이름: ${player.name || 'N/A'}</div>
          <div>등급: ${player.rarity || 'N/A'}</div>
          <div>ATK: ${player.attack || 'N/A'}</div>
          <div>DEF: ${player.defence || 'N/A'}</div>
          <div>SPD: ${player.speed || 'N/A'}</div>
        `;
        // profileImageDiv.style.backgroundImage = `url(${player.profileImage || 'default.png'})`;
      } else {
        statsDiv.innerHTML = '<div>선수를</div><div>드래그하여</div><div>배치하세요</div>';
        // profileImageDiv.style.backgroundImage = 'none';
      }
    });
  }

  // --- 이벤트 핸들러 함수들 ---

  function handleDragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.dataset.ownedPlayerId);
  }

  function handleDragOver(event) {
    event.preventDefault();
    event.currentTarget.classList.add('drag-over');
  }

  function handleDragLeave(event) {
    event.currentTarget.classList.remove('drag-over');
  }

  function handleDrop(event, slotIndex) {
    event.preventDefault();
    event.currentTarget.classList.remove('drag-over');
    const ownedPlayerId = parseInt(event.dataTransfer.getData('text/plain'), 10);
    const droppedPlayer = state.allPlayers.find(p => p.ownedPlayerId === ownedPlayerId);

    if (droppedPlayer) {
      // 이미 스쿼드에 있는 선수인지 확인
      const alreadyInSquadIndex = state.squadSlots.findIndex(p => p && p.ownedPlayerId === ownedPlayerId);
      if (alreadyInSquadIndex !== -1) {
        // 이미 다른 슬롯에 있다면 해당 슬롯과 교체(swap)
        state.squadSlots[alreadyInSquadIndex] = state.squadSlots[slotIndex];
      } else {
         // 비어있는 슬롯에 추가
      }
      state.squadSlots[slotIndex] = droppedPlayer;
      renderSquadCards();
    }
  }

  function handleClearSquad() {
    state.squadSlots.fill(null);
    renderSquadCards();
  }

  async function handleSaveSquad() {
    const squadMemberIds = state.squadSlots.map(p => p ? p.ownedPlayerId : null).filter(id => id !== null);
    
    try {
      const response = await fetch('/squad', { // POST /squad API 필요
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ squadMemberIds }),
      });
      if (!response.ok) throw new Error('팀 저장에 실패했습니다.');
      const result = await response.json();
      alert(result.message || '팀이 성공적으로 저장되었습니다.');
    } catch (error) {
      console.error('팀 저장 오류:', error);
      alert(error.message);
    }
  }

  // 페이지 초기화 실행
  initialize();
});