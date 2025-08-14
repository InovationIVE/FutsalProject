document.addEventListener('DOMContentLoaded', () => {
  const socket = io('http://localhost:3018'); // 서버 포트에 맞춰 수정했습니다.
  const auctionList = document.getElementById('auction-list');

  /**
   * 경매 아이템 Element를 생성합니다.
   * @param {object} auction - 경매 데이터
   * @returns {HTMLLIElement}
   */
  function createAuctionItem(auction) {
    const item = document.createElement('li');
    item.className = 'auction-item';
    item.id = `auction-${auction.auctionId}`;

    const endsAt = new Date(auction.endsAt).toLocaleString('ko-KR');

    //상태에 따라 다른 클래스를 추가합니다.
    let statusClass = '';
    if (auction.status === 'open') {
        statusClass = 'status-open';
    } else if (auction.status === 'closed') {
        statusClass = 'status-closed';
    } else if (auction.status === 'cancelled') {
        statusClass = 'status-cancelled';
    }

    item.innerHTML = `
      <div class="item-header">
        <div class="itemInfo">${auction.ownedPlayer?.name || '이름 없음'} +${auction.ownedPlayer?.level || ''} (${auction.ownedPlayer?.rarity || '등급 없음'})</div>
        <div class="itemStatus ${statusClass}">${auction.status === 'open' ? '진행중' : auction.status === 'closed' ? '종료' : '취소됨'}</div>
      </div>
      <div class="item-body">
        <p>현재가: <span class="price">${auction.currentPrice.toLocaleString('ko-KR')} Cash</span></p>
        <p class="ends-at">마감: ${endsAt}</p>
        <div class="status"></div>
      </div>
    `;
    return item;
  }

  /**
   * 페이지 로드 시, 현재 진행중인 모든 경매 목록을 가져와 표시합니다.
   */
  async function fetchInitialAuctions() {
    try {
      const response = await fetch('/api/auctions');
      if (!response.ok) throw new Error('Failed to fetch auctions');
      const result = await response.json();
      
      auctionList.innerHTML = '';
      if (result.data) {
        result.data.forEach(auction => {
          const item = createAuctionItem(auction);
          auctionList.appendChild(item);
        });
      }
    } catch (error) {
      console.error('Error fetching initial auctions:', error);
      auctionList.innerHTML = '<li>경매 목록을 불러오는 데 실패했습니다.</li>';
    }
  }

  // --- Socket 이벤트 리스너 ---

  // 새로운 경매 등록 이벤트 수신
  socket.on('auctionCreated', (newAuction) => {
    console.log('New auction received:', newAuction);
    if (newAuction) {
      const item = createAuctionItem(newAuction);
      auctionList.prepend(item);
    }
  });

  // 경매 가격 업데이트 이벤트 수신
  socket.on('auctionUpdate', (updateData) => {
    console.log('Auction price updated:', updateData);
    const item = document.getElementById(`auction-${updateData.auctionId}`);
    if (item) {
      const priceSpan = item.querySelector('.price');
      priceSpan.textContent = `${updateData.newPrice.toLocaleString('ko-KR')} Cash`;
    }
  });

  // 경매 종료 이벤트 수신 (낙찰 또는 유찰)
  socket.on('auctionClosed', (data) => {
    console.log('Auction closed:', data);
    const item = document.getElementById(`auction-${data.auctionId}`);
    if (item) {
      const statusDiv = item.querySelector('.status');
      if (data.winnerId) {
        statusDiv.textContent = `종료됨 - 낙찰 (낙찰자: ${data.winnerId}, 금액: ${data.bidAmount.toLocaleString('ko-KR')} Cash)`;
      } else {
        statusDiv.textContent = `종료됨 - 유찰`;
      }
      item.classList.add('closed');
    }
  });

  // 경매 취소 이벤트 수신
  socket.on('auctionCancelled', (data) => {
    console.log('Auction cancelled:', data);
    const item = document.getElementById(`auction-${data.auctionId}`);
    if (item) {
      const statusDiv = item.querySelector('.status');
      statusDiv.textContent = `취소됨`;
      item.classList.add('cancelled');
    }
  });
  
  // 연결이 끊어졌을 때
  socket.on('disconnect', () => {
      console.log('서버와의 연결이 끊어졌습니다.');
  });

  // 에러 발생 시
  socket.on('error', (err) => {
      console.error('소켓 에러 발생:', err);
  });

  // 페이지가 처음 로드될 때 경매 목록을 가져옵니다.
  fetchInitialAuctions();
});
