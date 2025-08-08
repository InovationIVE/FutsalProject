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
    window.location.href = '../GamePlayScene/GamePlayScene.html';
  });
});
