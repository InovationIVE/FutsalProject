document.addEventListener('DOMContentLoaded', () => {
  const cashShopBtn = document.getElementById('cashShop');
  const gachaBtn = document.getElementById('gacha');
  const mtTeamBtn = document.getElementById('mtTeam');
  const squadBtn = document.getElementById('squad');
  const gamePlayBtn = document.getElementById('gamePlay');
  const userIdDisplay = document.getElementById('user-id-display');
  const userCashDisplay = document.getElementById('user-cash-display');
  const cashGoodsList = document.getElementById('cash-item-list');
  const purchaseForm = document.getElementById('purchase-item-form');
  const cashShopResult = document.getElementById('cash-shop-result');

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

  /**유저 정보 및 캐시 상품 불러오기**/
  async function LoadUserAndGoods() {
    try {
      //유저 정보 가져오기
      const userRes = await fetch('/auth/accountId', {
        method: 'GET',
        credentials: 'include',
      });
      if (!userRes.ok) throw new Error('유저 정보를 불러오는데 실패했습니다.');
      const userData = await userRes.json();

      //상품 목록 가져오기
      const goodsRes = await fetch('/api/goods', {
        method: 'GET',
        credentials: 'include',
        headers: { 'Cache-Control': 'no-cache' },
      });
      if (!goodsRes.ok) throw new Error('아이템 목록을 불러오는데 실패했습니다.');
      const goodsData = await goodsRes.json();

      //유저 정보 표시
      userIdDisplay.textContent = userData.id;
      userCashDisplay.textContent = userData.cash.toLocaleString();

      //상품 목록 표시
      RenderCashGoods(goodsData);
    } catch (error) {
      cashShopResult.textContent = `오류 : ${error.message}`;
      cashShopResult.style.color = 'red';
      console.error(error);
    }
  }

  /**상품 목록 화면 렌더링**/
  function RenderCashGoods(goods) {
    cashGoodsList.innerHTML = '';
    if (!goods || goods.length === 0) {
      cashGoodsList.innerHTML = '<p>판매중인 상품이 없습니다.</p>';
      return;
    }
    goods.forEach((goods) => {
      const div = document.createElement('div');
      div.className = 'cash-goods';
      const price = Number(goods.cashAmount);
      div.textContent = `${goods.name} (ID : ${goods.id}) - 가격 : ${price.toLocaleString()} 캐시`;
      cashGoodsList.appendChild(div);
    });
  }

  /**상품 구매**/
  purchaseForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const inputId = document.getElementById('goods-id').ariaValueMax.trim();
    if (!inputId) {
      cashShopResult.textContent = '상품 ID를 입력하세요.';
      cashShopResult.style.color = 'red';
      return;
    }

    //숫자 변환 실패 시 예외처리
    const goodsId = parseInt(inputId, 10);
    if (isNaN(goodsId)) {
      cashShopResult.textContent = '상품ID는 숫자로 입력하세요.';
      cashShopResult.style.color = 'red';
      return;
    }
    try {
      const res = await fetch('/auth/account/accountId', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goodsId }),
      });
      const result = await res.json();

      //구매 성공 시 유저 캐시 충전 및 메시지 출력
      if (res.ok) {
        userCashDisplay.textContent = result.newCash.toLocaleString();
        cashShopResult.textContent = result.message;
        cashShopResult.style.color = 'green';
      } else {
        //실패 시 실패 매시지 출력
        cashShopResult.textContent = result.message || '구매에 실패했습니다.';
        cashShopResult.style.color = 'red';
      }
    } catch (error) {
      cashShopResult.textContent = '서버와 통신 중 오류가 발생했습니다.';
      cashShopResult.style.color = 'red';
      console.error(error);
    }
    purchaseForm.reset();
  });
  //페이지 로드 시 초기화
  LoadUserAndGoods();
});
