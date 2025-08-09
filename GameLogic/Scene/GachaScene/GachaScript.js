document.addEventListener('DOMContentLoaded', () => {
  const cashShopBtn = document.getElementById('cashShop');
  const gachaBtn = document.getElementById('gacha');
  const mtTeamBtn = document.getElementById('mtTeam');
  const squadBtn = document.getElementById('squad');
  const gamePlayBtn = document.getElementById('gamePlay');
  const gachaPackList = document.getElementById('gacha-pack-list');
  const cardDisplayArea = document.getElementById('card-display-area');
  const backToLobbyBtn = document.getElementById('back-to-lobby-btn');
  const optionBtnList = document.getElementById('gacha-option-list');

  const allowedPackNames = ['BronzePack', 'SilverPack', 'GoldPack', 'PlatinumPack', 'DiamondPack'];

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

  // 페이지 로드 시 가챠 팩 목록을 불러옵니다.
  loadGachaPacks();

  backToLobbyBtn.addEventListener('click', () => {
    window.location.href = '../LobbyScene/LobbyScene.html';
  });

  optionBtnList.addEventListener('click', (event) => {
    const clickedBtn = event.target;

    // 클릭된 요소가 button일 때만 처리
    if (clickedBtn.tagName === 'BUTTON') {
      const btnId = clickedBtn.id;

      switch (btnId) {
        case 'gacha-delete-btn':
          console.log('삭제 버튼 클릭');
          // deleteGacha();
          break;

        case 'gacha-modify-btn':
          console.log('수정 버튼 클릭');
          modifyGacha();
          break;

        case 'gacha-create-btn':
          console.log('생성 버튼 클릭');
          // createGacha();
          break;

        case 'gacha-view-btn':
          console.log('조회 버튼 클릭');
          // viewGacha();
          break;

        default:
          console.warn('알 수 없는 버튼:', btnId);
      }
    }
  });

  async function modifyGacha() {
    const gachaId = prompt('수정할 가챠 카드의 ID를 입력하세요:');
    if (!gachaId) {
      alert('가챠 카드 ID를 입력하지 않았습니다.');
      return;
    }

    const cardName = prompt('새로운 카드 이름을 입력하세요:');
    const price = parseInt(prompt('새로운 가격을 입력하세요:'), 10);
    const bronze = parseInt(prompt('새로운 브론즈 확률을 입력하세요:'), 10);
    const silver = parseInt(prompt('새로운 실버 확률을 입력하세요:'), 10);
    const gold = parseInt(prompt('새로운 골드 확률을 입력하세요:'), 10);
    const platinum = parseInt(prompt('새로운 플래티넘 확률을 입력하세요:'), 10);
    const diamond = parseInt(prompt('새로운 다이아몬드 확률을 입력하세요:'), 10);

    if (
      !cardName ||
      isNaN(price) ||
      isNaN(bronze) ||
      isNaN(silver) ||
      isNaN(gold) ||
      isNaN(platinum) ||
      isNaN(diamond)
    ) {
      alert('모든 필드를 올바르게 입력해야 합니다.');
      return;
    }

    await UpdateGachaCard(gachaId, cardName, price, bronze, silver, gold, platinum, diamond);
  }

  /**
   * 서버에서 판매중인 카드팩 목록을 가져와 화면에 표시합니다.
   */
  async function loadGachaPacks() {
    gachaPackList.innerHTML = '<p>카드팩 목록을 불러오는 중...</p>';
    try {
      const response = await fetch('/api/gacha', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // 인증 쿠키를 보내기 위해 필요
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '카드팩 목록을 불러오는데 실패했습니다.');
      }
      const packs = await response.json();
      displayGachaPacks(packs);
    } catch (error) {
      gachaPackList.innerHTML = `<p>오류: ${error.message}</p>`;
      console.error('Error loading gacha packs:', error);
    }
  }

  /* 카드팩 수정 */
  async function UpdateGachaCard(
    gachaId,
    cardName,
    price,
    bronze,
    silver,
    gold,
    platinum,
    diamond,
  ) {
    try {
      const response = await fetch(`/api/gacha/${gachaId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // 인증 쿠키를 보내기 위해 필요
        body: JSON.stringify({
          cardName,
          price,
          bronze,
          silver,
          gold,
          platinum,
          diamond,
        }),
      }); // 서버에 카드팩 수정 요청
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '카드팩 수정에 실패했습니다.');
      }
      const updatedCard = await response.json();
      console.log('카드팩 수정 성공:', updatedCard);
      alert('카드팩이 성공적으로 수정되었습니다.');
      loadGachaPacks(); // 수정 후 카드팩 목록을 다시 불러옵니다
    } catch (error) {
      console.error('Error updating gacha card:', error);
      alert(`카드팩 수정 실패: ${error.message}`);
    }
  }

  /**
   * 가져온 카드팩 목록을 HTML로 만들어 화면에 표시합니다.
   * @param {Array} packs - 서버에서 받은 카드팩 객체 배열
   */
  function displayGachaPacks(packs) {
    gachaPackList.innerHTML = ''; // 목록 초기화

    const filteredPacks = packs.filter((pack) => allowedPackNames.includes(pack.cardName));

    if (!filteredPacks || filteredPacks.length === 0) {
      gachaPackList.innerHTML = '<p>판매중인 카드팩이 없습니다.</p>';
      return;
    }

    filteredPacks.forEach((pack) => {
      const packElement = document.createElement('div');
      packElement.className = 'gacha-pack';
      packElement.innerHTML = `
        <h3>${pack.cardName}</h3>
        <p>가격: ${pack.price} 캐시</p>
        <button class="draw-btn" data-gachaid="${pack.gachaId}" data-count="1">1회 뽑기</button>
        <button class="draw-btn" data-gachaid="${pack.gachaId}" data-count="10">10회 뽑기</button>
      `;
      gachaPackList.appendChild(packElement);
    });

    // 동적으로 생성된 모든 뽑기 버튼에 이벤트 리스너를 추가합니다.
    document.querySelectorAll('.draw-btn').forEach((button) => {
      button.addEventListener('click', (event) => {
        const gachaId = event.target.dataset.gachaid;
        const drawCount = parseInt(event.target.dataset.count, 10);
        drawCards(gachaId, drawCount);
      });
    });
  }

  /**
   * 특정 카드팩에서 카드를 뽑는 API를 호출합니다.
   * @param {number} gachaId - 뽑을 카드의 gacha ID
   * @param {number} drawCount - 뽑을 횟수 (1 또는 10)
   */
  async function drawCards(gachaId, drawCount) {
    cardDisplayArea.innerHTML = '<h2>뽑는 중...</h2>';

    try {
      const response = await fetch('/api/gacha/draw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // 인증 쿠키를 보내기 위해 필요
        body: JSON.stringify({
          gachaId: parseInt(gachaId, 10),
          drawCount: drawCount,
        }),
      });

      if (response.ok) {
        const drawnCards = await response.json();
        displayDrawnCards(drawnCards);
      } else {
        const errorData = await response.json();
        cardDisplayArea.innerHTML = `<p>오류: ${errorData.message || '선수 뽑기에 실패했습니다.'}</p>`;
      }
    } catch (error) {
      console.error('Error drawing cards:', error);
      cardDisplayArea.innerHTML = '<p>서버와 통신 중 오류가 발생했습니다.</p>';
    }
  }

  /**
   * 뽑힌 선수 카드 목록을 화면에 표시합니다.
   * @param {Array} cards - 서버에서 받은 뽑힌 선수 객체 배열
   */
  function displayDrawnCards(cards) {
    cardDisplayArea.innerHTML = ''; // 이전 결과 초기화
    if (!cards || cards.length === 0) {
      cardDisplayArea.innerHTML =
        '<p>뽑힌 카드가 없습니다. (해당 등급의 선수가 부족할 수 있습니다)</p>';
      return;
    }

    cards.forEach((card) => {
      const cardElement = document.createElement('div');
      cardElement.className = `card rarity-${card.rarity.toLowerCase()}`;
      cardElement.innerHTML = `
        <h3>${card.name}</h3>
        <p>희귀도: ${card.rarity}</p>
        <p>공격: ${card.attack}</p>
        <p>수비: ${card.defence}</p>
        <p>속도: ${card.speed}</p>
      `;
      cardDisplayArea.appendChild(cardElement);
    });
  }
});
