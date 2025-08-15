import GameManager from '../../Manager/GameManager.js';

document.addEventListener('DOMContentLoaded', () => {
  GameManager.setupNavigation();

  const gachaPackList = document.getElementById('gacha-pack-list');
  const cardDisplayArea = document.getElementById('card-display-area');
  const optionBtnList = document.getElementById('gacha-option-list');
  const tableContainer = document.getElementById('gacha-table-container');
  const tableBody = document.querySelector('#gacha-table tbody');

  const gamePlayBtn = document.querySelector('.gamePlayBtn');
  const modal = document.getElementById('edit-gacha-modal');
  const closeBtn = document.querySelector('.close-btn');
  const editForm = document.getElementById('edit-gacha-form');
  const editButton = editForm.querySelector('#edit-card');
  const createButton = editForm.querySelector('#create-card');

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  });

  editForm.addEventListener('submit', async (event) => {
    event.preventDefault(); //페이지 새로고침 없이 비동기적으로 폼 데이터를 처리
    const clickedBtn = event.submitter; // 실제 클릭한 버튼
    const btnId = clickedBtn.id;

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
        await CreateGachaCard(cardName, price, bronze, silver, gold, platinum, diamond);
        break;
      default:
        console.warn('알 수 없는 버튼:', btnId);
    }

    modal.style.display = 'none';
  });

  // gamePlayBtn.addEventListener('click', async () => {
  //   window.location.href = '../GameReadyScene/GameReadyScene.html';
  //   await createRank();
  // });

  initializePage();

  async function initializePage() {
    const userRole = await getAdminCheck();
    if (userRole !== 'ADMIN') {
      optionBtnList.style.display = 'none';
    }
    loadGachaPacks();
  }

  optionBtnList.addEventListener('click', async (event) => {
    const clickedBtn = event.target;
    // 클릭된 요소가 button일 때만 처리
    if (clickedBtn.tagName === 'BUTTON') {
      const btnId = clickedBtn.id;

      switch (btnId) {
        case 'gacha-create-btn':
          console.log('생성 버튼 클릭');
          await createGacha();
          break;

        case 'gacha-view-btn':
          console.log('조회 버튼 클릭');
          viewGacha();
          break;

        default:
          console.warn('알 수 없는 버튼:', btnId);
      }
    }
  });

  function modifyGacha(pack) {
    document.getElementById('edit-gacha-id').value = pack.gachaId;
    document.getElementById('edit-cardName').value = pack.cardName;
    document.getElementById('edit-price').value = pack.price;
    document.getElementById('edit-bronze').value = pack.bronze;
    document.getElementById('edit-silver').value = pack.silver;
    document.getElementById('edit-gold').value = pack.gold;
    document.getElementById('edit-platinum').value = pack.platinum;
    document.getElementById('edit-diamond').value = pack.diamond;

    modal.style.display = 'block';
    editButton.style.display = 'block';
    createButton.style.display = 'none';
  }

  /*모듈 불러오기 */
  async function createGacha() {
    document.getElementById('edit-gacha-id').value = '';
    document.getElementById('edit-cardName').value = '';
    document.getElementById('edit-price').value = 0;
    document.getElementById('edit-bronze').value = 0;
    document.getElementById('edit-silver').value = 0;
    document.getElementById('edit-gold').value = 0;
    document.getElementById('edit-platinum').value = 0;
    document.getElementById('edit-diamond').value = 0;

    modal.style.display = 'block';
    editButton.style.display = 'none';
    createButton.style.display = 'block';
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
      await loadGachaPacks(); // 수정 후 카드팩 목록을 다시 불러옵니다
      await viewGacha(); // 수정 후 테이블 다시 로드
    } catch (error) {
      console.error('Error updating gacha card:', error);
      alert(`카드팩 수정 실패: ${error}`);
    }
  }

  /* 서버에 카드 생성 */
  async function CreateGachaCard(cardName, price, bronze, silver, gold, platinum, diamond) {
    try {
      const response = await fetch(`/api/admin/gacha`, {
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
      }); // 서버에 카드 생성

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '카드팩 생성에 실패했습니다.');
      }
      const createdCard = await response.json();
      console.log(createdCard.message);
      alert('카드팩이 성공적으로 수정되었습니다.');
      await loadGachaPacks(); // 수정 후 카드팩 목록을 다시 불러옵니다
      await viewGacha();
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

    packs.forEach((pack) => {
      const packElement = document.createElement('div');
      packElement.className = 'gacha-pack';
      const pack1 = formatPrice(pack.price);
      const pack10 = formatPrice(pack.price * 10);
      packElement.innerHTML = `
        <h3>${pack.cardName}</h3>
        <div class="pack-actions">
        <button class="draw-btn btn" data-gachaid="${pack.gachaId}" data-count="1">1회 뽑기 <br> (${pack1} 캐시)</button>
        <button class="draw-btn btn" data-gachaid="${pack.gachaId}" data-count="10">10회 뽑기 <br> (${pack10} 캐시)</button>
        </div>
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

      cardBack.style.backgroundImage = `url('${card.profileImage}')`;
      const infoBox = document.createElement('div');
      infoBox.className = 'card-info-box';

      const nameEl = document.createElement('h3');
      nameEl.textContent = card.name;

      const rankText = document.createElement('h1');
      rankText.textContent = card.rarity;

      // 스탯 가로 정렬 영역
      const statsContainer = document.createElement('div');
      statsContainer.className = 'card-stats';
      statsContainer.innerHTML = `
      <p>공격: ${card.attack}</p>
      <p>수비: ${card.defence}</p>
      <p>속도: ${card.speed}</p>
      `;

      cardInner.appendChild(cardFront);
      cardInner.appendChild(cardBack);
      infoBox.appendChild(nameEl);
      infoBox.appendChild(rankText);
      infoBox.appendChild(statsContainer);
      cardBack.appendChild(infoBox);
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

  async function viewGacha() {
    tableBody.innerHTML = '<p>카드팩 정보를 불러오는 중...</p>';
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
        throw new Error(errorData.error || '카드팩 정보를 불러오는데 실패했습니다.');
      }
      const packs = await response.json();
      displayGachPackInfo(packs);
    } catch (error) {
      gachaPackList.innerHTML = `<p>오류: ${error.message}</p>`;
      console.error('Error loading gacha packs:', error);
    }
  }

  function displayGachPackInfo(packs) {
    tableBody.innerHTML = ''; // 기존 데이터 초기화
    packs.forEach((pack) => {
      const row = `
      <tr>
        <td>${pack.gachaId}</td>
        <td>${pack.cardName}</td>
        <td>${pack.price}</td>
        <td>${pack.bronze}%</td>
        <td>${pack.silver}%</td>
        <td>${pack.gold}%</td>
        <td>${pack.platinum}%</td>
        <td>${pack.diamond}%</td>
        <td>
          <button class="action-btn edit-btn" data-id="${pack.gachaId}">수정</button>
          <button class="action-btn delete-btn" data-id="${pack.gachaId}">삭제</button>
        </td>
      </tr>
    `;
      tableBody.innerHTML += row;
    });
    tableContainer.style.display = 'block';

    // 수정 버튼 이벤트
    document.querySelectorAll('.edit-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        console.log(`수정 버튼 클릭: Card ID = ${id}`);
        const pack = packs.find((p) => p.gachaId === +id);
        modifyGacha(pack);
      });
    });

    // 삭제 버튼 이벤트
    document.querySelectorAll('.delete-btn').forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        const id = e.target.dataset.id;
        console.log(`삭제 버튼 클릭: Card ID = ${id}`);
        const pack = packs.find((p) => p.gachaId === +id);
        await deleteGachaPack(pack);
      });
    });
  }

  async function deleteGachaPack(pack) {
    try {
      const response = await fetch(`/api/admin/gacha/${pack.gachaId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // 인증 쿠키를 보내기 위해 필요
      }); // 서버에 카드팩 삭제 요청

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '카드팩 삭제에 실패했습니다.');
      }
      const updatedCard = await response.json();
      console.log('카드팩 삭제 성공:', updatedCard);
      alert('카드팩이 성공적으로 삭제되었습니다.');
      await loadGachaPacks(); // 수정 후 카드팩 목록을 다시 불러옵니다
      await viewGacha();
    } catch (error) {
      console.error('Error updating gacha card:', error);
      alert(`카드팩 수정 실패: ${error}`);
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

function formatPrice(price) {
  // 입력된 price가 숫자인지 확인
  if (typeof price !== 'number') {
    return '유효하지 않은 값';
  }

  if (price >= 10000000) {
    const tenMillion = Math.floor(price / 10000000);
    return `${tenMillion}천만`;
  } else if (price >= 10000) {
    const manwon = Math.floor(price / 10000);
    return `${manwon}만`;
  } else if (price > 0) {
    return `${price}`;
  } else {
    return '0 캐시';
  }
}
