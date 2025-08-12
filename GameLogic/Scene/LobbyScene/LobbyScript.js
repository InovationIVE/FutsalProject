document.addEventListener('DOMContentLoaded', () => {
  const cashShopBtn = document.getElementById('cashShop');
  const gachaBtn = document.getElementById('gacha');
  const mtTeamBtn = document.getElementById('mtTeam');
  const squadBtn = document.getElementById('squad');
  const gamePlayBtn = document.getElementById('gamePlay');

  cashShopBtn.addEventListener('click', () => {
    window.location.href = '../CashShopScene/CashSHopScene.html';
  });

  gachaBtn.addEventListener('click', () => {
    window.location.href = '../GachaScene/GachaScene.html';
  });

  mtTeamBtn.addEventListener('click', () => {
    window.location.href = '../OwnedScene/OwnedScene.html';
  });

  squadBtn.addEventListener('click', () => {
    window.location.href = '../SquadScene/SquadScene.html';
  });

  gamePlayBtn.addEventListener('click', () => {
    window.location.href = '../GameReadyScene/GameReadyScene.html';
    createRank();
  });

  async function createRank() {
    try {
      const response = await fetch('/api/rank', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // 인증 쿠키를 보내기 위해 필요
      });

    } catch (error) {
      console.error('Error drawing cards:', error);
      cardDisplayArea.innerHTML = '<p>서버와 통신 중 오류가 발생했습니다.</p>';
    }
  }
});
