export default class GameManager {
  static setupNavigation() {
    const navLinks = {
      '../CashShopScene/CashShopScene.html': document.querySelector('.cashShopBtn'),
      '../GachaScene/GachaScene.html': document.querySelector('.gachaBtn'),
      '../OwnedScene/OwnedScene.html': document.querySelector('.MyPlayerBtn'),
      '../SquadScene/SquadScene.html': document.querySelector('.MysquadBtn'),
      '../GameReadyScene/GameReadyScene.html': document.querySelector('.gamePlayBtn'),
    };

    for (const url in navLinks) {
      if (navLinks[url]) {
        navLinks[url].addEventListener('click', () => {
          window.location.href = url;
        });
      }
    }
  }
}
