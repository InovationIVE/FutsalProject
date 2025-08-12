document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  loadAndRenderPlayers();
});

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
      navLinks[url].addEventListener('click', () => {
        window.location.href = url;
      });
    }
  }
}

async function loadAndRenderPlayers() {
  try {
    const response = await fetch('/ownedplayers');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const players = await response.json();

    const playerListContainer = document.querySelector('.player-list');
    if (!playerListContainer) {
      console.error('".player-list" container not found.');
      return;
    }

    const existingItems = playerListContainer.querySelectorAll('.player-item');
    existingItems.forEach(item => item.remove());

    if (players.data && players.data.length > 0) {
      players.data.forEach((player, index) => {
        const playerItem = document.createElement('div');
        playerItem.classList.add('player-item');
        playerItem.textContent = player.name || 'Unknown Player';
        playerItem.dataset.ownedPlayerId = player.ownedPlayerId;

        if (index === 0) {
          playerItem.classList.add('active');
          updateCardDisplay(player);
        }

        playerItem.addEventListener('click', () => {
          playerListContainer.querySelectorAll('.player-item').forEach(item => item.classList.remove('active'));
          playerItem.classList.add('active');
          updateCardDisplay(player);
        });

        playerListContainer.appendChild(playerItem);
      });
    } else {
      playerListContainer.innerHTML += '<p>보유한 선수가 없습니다.</p>';
    }
  } catch (error) {
    console.error('선수 목록을 불러오는 데 실패했습니다:', error);
    const playerListContainer = document.querySelector('.player-list');
    if (playerListContainer) {
      playerListContainer.innerHTML += '<p>선수 목록을 불러올 수 없습니다.</p>';
    }
  }
}

function updateCardDisplay(player) {
  const card = document.querySelector('.card');
  if (!card || !player) return;

  const stats = {
    '선수이름': player.name || 'N/A',
    '등급': player.rarity || 'N/A',
    'ATK': player.attack || 'N/A',
    'DEF': player.defence || 'N/A', // 스키마에 defence로 되어있음
    'SPD': player.speed || 'N/A',
  };

  const statElements = card.querySelectorAll('.stats > div');
  statElements.forEach((div, index) => {
    const key = Object.keys(stats)[index];
    div.textContent = `${key}: ${stats[key]}`;
  });
}




