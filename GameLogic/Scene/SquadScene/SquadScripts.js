document.addEventListener('DOMContentLoaded', () => {
  const cashShopBtn = document.getElementById('cashShop');
  const gachaBtn = document.getElementById('gacha');
  const MyPlayerBtn = document.getElementById('myTeam');
  const MysquadBtn = document.getElementById('squad');
  const gamePlayBtn = document.getElementById('gamePlay');

  cashShopBtn.addEventListener('click', () => {
    window.location.href = '../CashShopScene/CashSHopScene.html';
  });

  gachaBtn.addEventListener('click', () => {
    window.location.href = '../GachaScene/GachaScene.html';
  });

  MyPlayerBtn.addEventListener('click', () => {
    window.location.href = '../OwnedScene/OwnedScene.html';
  });

  MysquadBtn.addEventListener('click', () => {
    window.location.href = '../SquadScene/SquadScene.html';
  });

  gamePlayBtn.addEventListener('click', () => {
    window.location.href = '../GamePlayScene/GamePlayScene.html';
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const userIdDisplay = document.getElementById('user-id-display');
  const userCashDisplay = document.getElementById('user-cash-display');

  // Assuming you have a function to get user data
  const userData = getUserData(); // Replace with actual function to fetch user data

  if (userData) {
    userIdDisplay.textContent = userData.id;
    userCashDisplay.textContent = userData.cash;
  } else {
    console.error('User data not found');
  }
}); 


const players = [];

const playerListElem = document.querySelector(".player-list");
const playerItems = playerListElem.querySelectorAll(".player-item");
const cards = document.querySelectorAll(".card");

// 현재 선택된 선수 인덱스 (playerItems와 players 배열 인덱스는 동일하다고 가정)
let selectedPlayerIndex = 1; // 초기 활성화 상태인 선수2

// 선수 목록 클릭 이벤트 - active 상태 변경 및 카드에 선수 정보 업데이트
playerItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    // active 클래스 토글
    playerItems.forEach(i => i.classList.remove("active"));
    item.classList.add("active");

    selectedPlayerIndex = index;
    updateCardsWithSelectedPlayer();
  });
});


async function loadPlayers() {
  try {
    const response = await fetch('/api/ownedplayers');
    if (!response.ok) throw new Error('네트워크 오류');
    const players = await response.json();

    const playerListElem = document.querySelector('.player-list');
    
    // 기존 선수 목록 초기화 (헤딩 제외)
    playerListElem.querySelectorAll('.player-item').forEach(e => e.remove());

    // 받아온 선수 배열 순회하며 HTML 생성
    players.forEach((player, index) => {
      const div = document.createElement('div');
      div.classList.add('player-item');
      if(index === 0) div.classList.add('active');  // 첫번째 선수 active 처리 (예시)
      div.textContent = player.name;
      playerListElem.appendChild(div);

      // 클릭 이벤트 등 추가 가능
      div.addEventListener('click', () => {
        // 활성화 토글 등 기존 코드와 연동 가능
      });
    });
  } catch (error) {
    console.error('선수 목록 로드 실패:', error);
  }
}

loadPlayers();

function renderPlayerList() {
  const playerListElem = document.querySelector('.player-list');

  // 기존 선수 목록 삭제 (h3 제외)
  playerListElem.querySelectorAll('.player-item').forEach(el => el.remove());

  players.forEach((player, index) => {
    const div = document.createElement('div');
    div.classList.add('player-item');
    if (index === 0) div.classList.add('active'); // 첫 선수 활성화 표시
    div.textContent = player.name;

    div.addEventListener('click', () => {
      document.querySelectorAll('.player-item').forEach(i => i.classList.remove('active'));
      div.classList.add('active');
      updateCardsWithSelectedPlayer(index);
    });

    playerListElem.appendChild(div);
  });
}

function updateCardsWithSelectedPlayer(index) {
  const player = players[index];
  if (!player) return;

  const cards = document.querySelectorAll('.card');
  const card = cards[0];  // 예: 첫 카드만 업데이트
  const statsDivs = card.querySelectorAll('.stats > div');

  statsDivs[0].textContent = player.name;
  statsDivs[1].textContent = `등급: ${player.rarity}`;
  statsDivs[2].textContent = `ATK: ${player.attack}`;
  statsDivs[3].textContent = `DEF: ${player.defense}`;
  statsDivs[4].textContent = `SPD: ${player.speed}`;

  const imgDiv = card.querySelector('.img');
  imgDiv.textContent = player.name; // 임시 이미지 대신 이름 표시
}




// 페이지 로드 시 초기 데이터 세팅
updateCardsWithSelectedPlayer();

//페이지 로드 시 API 호출
window.onload = () => {
  loadPlayers();
}



