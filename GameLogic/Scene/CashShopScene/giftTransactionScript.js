document.addEventListener('DOMContentLoaded', () => {
  const giftForm = document.getElementById('gift-form');
  const giftResult = document.getElementById('gift-result');
  const receivedGiftsDiv = document.getElementById('received-gifts');
  const userCashDisplay = document.getElementById('user-cash-display');

  /** 로그인 시 sessionStorage에 저장된 accountId 불러오기 **/
  const accountId = sessionStorage.getItem('accountId');

  if (!accountId) {
    giftResult.textContent = '로그인 정보가 없습니다. 다시 로그인 해주세요.';
    giftResult.style.color = 'red';
    return;
  }

  // 1. 선물하기 API 호출
  async function sendGift(receiverId, cash) {
    try {
      const res = await fetch('/api/gift/send', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ receiverId, cash }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || '선물하기 실패');
      return { success: true, message: data.message };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // 2. 선물받기 API 호출
  async function acceptGift(giftId) {
    try {
      const res = await fetch(`/api/gift/accept/${giftId}`, {
        method: 'POST',
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || '선물받기 실패');
      return { success: true, message: data.message };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // 3. 내가 받은 선물 조회 API 호출
  async function fetchReceivedGifts() {
    try {
      const res = await fetch(`/api/gift/received/${accountId}`, {
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || '선물 조회 실패');
      return data.gifts || [];
    } catch (error) {
      giftResult.textContent = '받은 선물을 불러오는 중 오류가 발생했습니다.';
      giftResult.style.color = 'red';
      return [];
    }
  }

  // 4. 받은 선물 목록 화면 렌더링 (선물받기 버튼 포함)
  function renderReceivedGifts(gifts) {
    receivedGiftsDiv.innerHTML = '';
    if (gifts.length === 0) {
      receivedGiftsDiv.textContent = '받은 선물이 없습니다.';
      return;
    }

    gifts.forEach((gift) => {
      const dateStr = new Date(gift.createdAt).toLocaleString();
      const senderName = gift.sender?.userId || gift.sender?.accountId || '알 수 없음';
      const cashAmount = gift.cash.toLocaleString();
      const statusText = gift.status === 'success' ? '수령 완료' : '미수령';

      const giftDiv = document.createElement('div');
      giftDiv.style.marginBottom = '8px';

      giftDiv.textContent = `[${dateStr}] ${senderName} 님이 ${cashAmount}캐시를 선물함 (${statusText}) `;

      // 아직 수령 안한 선물에만 버튼 추가
      if (gift.status !== 'success') {
        const acceptBtn = document.createElement('button');
        acceptBtn.textContent = '선물받기';
        acceptBtn.style.marginLeft = '10px';
        acceptBtn.style.cursor = 'pointer';
        acceptBtn.onclick = async () => {
          acceptBtn.disabled = true;
          giftResult.textContent = '선물 받는 중...';
          giftResult.style.color = 'black';

          const { success, message } = await acceptGift(gift.id);

          giftResult.textContent = message;
          giftResult.style.color = success ? 'green' : 'red';

          if (success) {
            loadReceivedGifts();
            loadUserCash();
          } else {
            acceptBtn.disabled = false;
          }
        };
        giftDiv.appendChild(acceptBtn);
      }

      receivedGiftsDiv.appendChild(giftDiv);
    });
  }

  // 5. 유저 보유 캐시 갱신 함수
  async function loadUserCash() {
    try {
      const res = await fetch(`/api/users/${accountId}`, { credentials: 'include' });
      const data = await res.json();
      if (!res.ok) throw new Error('유저 정보 불러오기 실패');
      userCashDisplay.textContent = data.cash?.toLocaleString() ?? '-';
    } catch {
      userCashDisplay.textContent = '-';
    }
  }

  // 6. 선물하기 폼 제출 이벤트
  giftForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const receiverIdVal = document.getElementById('receiver-id').value.trim();
    const giftCashVal = document.getElementById('gift-cash').value.trim();

    const receiverId = Number(receiverIdVal);
    const cash = Number(giftCashVal);

    if (!receiverIdVal || isNaN(receiverId) || receiverId <= 0) {
      giftResult.textContent = '유효한 받는 사람 ID를 입력하세요.';
      giftResult.style.color = 'red';
      return;
    }
    if (!giftCashVal || isNaN(cash) || cash <= 0) {
      giftResult.textContent = '선물 금액을 올바르게 입력하세요.';
      giftResult.style.color = 'red';
      return;
    }

    giftResult.textContent = '선물 보내는 중...';
    giftResult.style.color = 'black';

    const { success, message } = await sendGift(receiverId, cash);
    giftResult.textContent = message;
    giftResult.style.color = success ? 'green' : 'red';

    if (success) {
      giftForm.reset();
      loadReceivedGifts();
      loadUserCash();
    }
  });

  // 7. 받은 선물 불러오기
  async function loadReceivedGifts() {
    const gifts = await fetchReceivedGifts();
    renderReceivedGifts(gifts);
  }

  // 초기 로드
  loadUserCash();
  loadReceivedGifts();
});
