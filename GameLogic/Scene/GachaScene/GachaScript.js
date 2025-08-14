import GameManager from '../../Manager/GameManager.js';

document.addEventListener('DOMContentLoaded', () => {
  GameManager.setupNavigation();

  const gachaPackList = document.getElementById('gacha-pack-list');
  const cardDisplayArea = document.getElementById('card-display-area');
  const backToLobbyBtn = document.getElementById('back-to-lobby-btn');
  const optionBtnList = document.getElementById('gacha-option-list');
  const gamePlayBtn = document.querySelector('.gamePlayBtn');
  const modal = document.getElementById('edit-gacha-modal');
  const closeBtn = document.querySelector('.close-btn');
  const editForm = document.getElementById('edit-gacha-form');

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  });

  editForm.addEventListener('submit', async (event) => {
    const clickedBtn = event.target;
    const btnId = clickedBtn.id;

    event.preventDefault(); //페이지 새로고침 없이 비동기적으로 폼 데이터를 처리

    const gachaId = document.getElementById('edit-gacha-id').value;
    const cardName = document.getElementById('edit-cardName').value;
    const price = parseInt(document.getElementById('edit-price').value, 10);
    const bronze = parseInt(document.getElementById('edit-bronze').value, 10);
    const silver = parseInt(document.getElementById('edit-silver').value, 10);
    const gold = parseInt(document.getElementById('edit-gold').value, 10);
    const platinum = parseInt(document.getElementById('edit-platinum').value, 10);
    const diamond = parseInt(document.getElementById('edit-diamond').value, 10);

    switch (btnId) {
      case 'edit-card':
        await UpdateGachaCard(gachaId, cardName, price, bronze, silver, gold, platinum, diamond);
        break;
      case 'create-card':
        break;
    }

    modal.style.display = 'none';
  });

  gamePlayBtn.addEventListener('click', async () => {
    window.location.href = '../GameReadyScene/GameReadyScene.html';
    await createRank();
  });

  const allowedPackNames = ['BronzePack', 'SilverPack', 'GoldPack', 'PlatinumPack', 'DiamondPack'];
  initializePage();

  async function initializePage() {
    const userRole = await getAdminCheck();
    if (userRole !== 'ADMIN') {
      optionBtnList.style.display = 'none';
    }
    loadGachaPacks();
  }

  backToLobbyBtn.addEventListener('click', () => {
    window.location.href = '../LobbyScene/LobbyScene.html';
  });

  optionBtnList.addEventListener('click', async (event) => {
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
          await modifyGacha();
          break;

        case 'gacha-create-btn':
          console.log('생성 버튼 클릭');
          await createGacha();
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

    try {
      const response = await fetch(`/api/admin/gacha/${gachaId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // 인증 쿠키를 보내기 위해 필요
      });
      if (!response.ok) {
        throw new Error('Gacha pack not found');
      }
      const pack = await response.json();

      document.getElementById('edit-gacha-id').value = pack.gachaId;
      document.getElementById('edit-cardName').value = pack.cardName;
      document.getElementById('edit-price').value = pack.price;
      document.getElementById('edit-bronze').value = pack.bronze;
      document.getElementById('edit-silver').value = pack.silver;
      document.getElementById('edit-gold').value = pack.gold;
      document.getElementById('edit-platinum').value = pack.platinum;
      document.getElementById('edit-diamond').value = pack.diamond;

      modal.style.display = 'block';
    } catch (error) {
      alert(error.error);
    }
  }

  /*가챠 카드 생성 */
  async function createGacha() {
    modal.style.display = 'block';
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
        throw new Error(errorData.error || '카드팩 목록을 불러오는데 실패했습니다.');
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
      const response = await fetch(`/api/admin/gacha/${gachaId}`, {
        method: 'PATCH',
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
        throw new Error(errorData.error || '카드팩 수정에 실패했습니다.');
      }
      const updatedCard = await response.json();
      console.log('카드팩 수정 성공:', updatedCard);
      alert('카드팩이 성공적으로 수정되었습니다.');
      loadGachaPacks(); // 수정 후 카드팩 목록을 다시 불러옵니다
    } catch (error) {
      console.error('Error updating gacha card:', error);
      alert(`카드팩 수정 실패: ${error}`);
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
        <h3 style="color: #ffffffff;">${pack.cardName}</h3>
        <p style="color: #ffffffff;">가격: ${pack.price} 캐시</p>
        <button class="draw-btn btn" data-gachaid="${pack.gachaId}" data-count="1">1회 뽑기</button>
        <button class="draw-btn btn" data-gachaid="${pack.gachaId}" data-count="10">10회 뽑기</button>
      `;
      packElement.style.backgroundImage = `url('../../Image/${pack.cardName}.png')`;
      console.log(packElement.style.backgroundImage);
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
        cardDisplayArea.innerHTML = `<p>오류: ${errorData.error || '선수 뽑기에 실패했습니다.'}</p>`;
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
      cardElement.className = 'card';

      const cardInner = document.createElement('div');
      cardInner.className = 'card-inner';

      const cardFront = document.createElement('div');
      cardFront.className = 'card-front';

      const cardBack = document.createElement('div');
      cardBack.className = `card-back rarity-${card.rarity.toLowerCase()}`;
      cardBack.innerHTML = `
        <h3>${card.name}</h3>
        <p>희귀도: ${card.rarity}</p>
        <p>공격: ${card.attack}</p>
        <p>수비: ${card.defence}</p>
        <p>속도: ${card.speed}</p>
      `;

      cardInner.appendChild(cardFront);
      cardInner.appendChild(cardBack);
      cardElement.appendChild(cardInner);

      cardElement.addEventListener('click', () => {
        cardElement.classList.toggle('is-flipped');
      });

      cardDisplayArea.appendChild(cardElement);
    });
  }

  // 계정이 admin인지 확인
  async function getAdminCheck() {
    try {
      const response = await fetch('/auth/role', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const isRole = await response.json();
      return isRole.role;
    } catch (error) {
      console.error('Error drawing cards:', error);
      cardDisplayArea.innerHTML = '<p>서버와 통신 중 오류가 발생했습니다.</p>';
    }
  }
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
