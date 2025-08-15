/**
 * 경매장 목록을 불러오고 필터링하는 프론트엔드 스크립트
 */
document.addEventListener('DOMContentLoaded', () => {
    // 소켓 연결 주소를 확인해주세요. (서버 주소에 맞게 수정 필요)
    const socket = io('http://localhost:3018');
    const auctionListContainer = document.getElementById('auction-list');
    const filterSelect = document.getElementById('auction-filter-select');

    // 이 부분은 인증 미들웨어를 통해 얻은 사용자 ID를 적용해야 합니다.
    // 서버 사이드 렌더링을 통해 이 값을 동적으로 주입하거나,
    // 별도의 API 호출로 사용자 정보를 가져와야 합니다.
    const currentUserId = 'user123'; // 임시로 'user123'을 사용합니다.
    
    // 현재 필터 상태를 저장하는 변수
    let currentFilterStatus = 'open';

    // 드롭다운 메뉴의 'change' 이벤트를 감지합니다.
    filterSelect.addEventListener('change', (e) => {
        const status = e.target.value;
        currentFilterStatus = status; // 현재 필터 상태를 업데이트합니다.
        loadAuctionList(status); // 선택된 값으로 목록을 다시 불러옵니다.
    });

    /**
     * 경매 아이템 Element를 생성합니다.
     * @param {object} auction - 경매 데이터
     * @returns {HTMLLIElement}
     */
    function createAuctionItem(auction) {
        const item = document.createElement('li');
        item.className = 'auction-item';
        item.id = `auction-${auction.auctionId}`;

        // 마감 시간 포맷팅
        const endsAt = new Date(auction.endsAt).toLocaleString('ko-KR');
        
        // 상태 텍스트 매핑
        const statusText = {
            'open': '진행중',
            'closed': '종료',
            'cancelled': '취소됨'
        };

        // ownedPlayer가 없을 경우를 대비한 안전한 접근
        const ownedPlayer = auction.ownedPlayer || {};
        const playerName = ownedPlayer.name || '이름 없음';
        const playerLevel = ownedPlayer.level || 0;
        const playerRarity = ownedPlayer.rarity || '등급 없음';
        const profileImage = ownedPlayer.profileImage || 'https://placehold.co/50x50/cccccc/333333?text=N/A';

        // 내 경매인지 확인하여 표시 추가
        const isMyAuction = auction.ownerId === currentUserId;
        const myAuctionBadge = isMyAuction ? '<span class="my-auction-badge">내 경매</span>' : '';

        item.innerHTML = `
            <div class="item-header">
                <img src="${profileImage}" alt="${playerName}" class="player-profile-image">
                <div class="itemInfo">${playerName} +${playerLevel} (${playerRarity}) ${myAuctionBadge}</div>
                <div class="itemStatus status-${auction.status}">${statusText[auction.status]}</div>
            </div>
            <div class="item-body">
                <p>현재가: <span class="price">${auction.currentPrice.toLocaleString('ko-KR')} Cash</span></p>
                <p class="ends-at">마감: ${endsAt}</p>
            </div>
        `;
        return item;
    }
    
    /**
     * 경매 목록을 불러와서 렌더링하는 함수
     * @param {string} status - 필터링할 경매 상태 ('open', 'closed', 'all', 'my')
     */
    async function loadAuctionList(status) {
        try {
            auctionListContainer.innerHTML = '<p>경매 목록을 불러오는 중...</p>';
            
            let apiUrl = '';
            // 필터 상태에 따라 다른 API 엔드포인트를 사용합니다.
            // '내 경매' 필터 선택 시, 전용 API 엔드포인트를 호출합니다.
            if (status === 'my') {
                 apiUrl = `/api/auctions/myAuction`; // 백엔드 라우트에 맞춰 수정
            } else {
                 // 그 외 상태 필터링
                 apiUrl = `/api/auctions?status=${status}`;
            }

            const response = await fetch(apiUrl);

            // HTTP 응답 상태를 확인하여 오류를 더 명확하게 처리합니다.
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP 오류: ${response.status} - ${errorText}`);
            }
            
            const result = await response.json();
            const auctions = result.data;

            renderAuctionList(auctions);

        } catch (error) {
            console.error('경매 목록 로딩 오류:', error);
            // 사용자에게 더 구체적인 오류 메시지를 표시합니다.
            auctionListContainer.innerHTML = `<p>경매 목록을 불러오는 데 실패했습니다: ${error.message}</p>`;
        }
    }

    /**
     * 경매 목록 데이터를 UI로 렌더링하는 함수
     * @param {Array} auctions - 경매 데이터 배열
     */
    function renderAuctionList(auctions) {
        auctionListContainer.innerHTML = ''; // 기존 목록을 초기화합니다.

        if (auctions.length === 0) {
            auctionListContainer.innerHTML = '<p>해당하는 경매가 없습니다.</p>';
            return;
        }

        auctions.forEach(auction => {
            const item = createAuctionItem(auction);
            auctionListContainer.appendChild(item);
        });
    }

    // --- Socket 이벤트 리스너 ---

    // 새로운 경매 등록 이벤트 수신
    socket.on('auctionCreated', (newAuction) => {
        console.log('New auction received:', newAuction);
        // 현재 필터가 'open', 'all', 'my'인 경우에만 목록에 추가합니다.
        // 내 경매 필터에서는 내 경매만 추가합니다.
        if (currentFilterStatus === 'open' || currentFilterStatus === 'all' || 
            (currentFilterStatus === 'my' && newAuction.ownerId === currentUserId)) {
            const item = createAuctionItem(newAuction);
            auctionListContainer.prepend(item);
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

    // 경매 종료 이벤트 수신
    socket.on('auctionClosed', (data) => {
        console.log('Auction closed:', data);
        const item = document.getElementById(`auction-${data.auctionId}`);
        if (item) {
            // 아이템의 상태를 '종료'로 업데이트합니다.
            const statusDiv = item.querySelector('.itemStatus');
            statusDiv.textContent = '종료';
            statusDiv.className = `itemStatus status-closed`;
            
            // 현재 필터가 'open'인 경우 해당 아이템을 제거합니다.
            if (currentFilterStatus === 'open') {
                item.remove();
            }
        }
    });

    // 경매 취소 이벤트 수신
    socket.on('auctionCancelled', (data) => {
        console.log('Auction cancelled:', data);
        const item = document.getElementById(`auction-${data.auctionId}`);
        if (item) {
             // 아이템의 상태를 '취소됨'으로 업데이트합니다.
            const statusDiv = item.querySelector('.itemStatus');
            statusDiv.textContent = '취소됨';
            statusDiv.className = `itemStatus status-cancelled`;

            // 현재 필터가 'open'인 경우 해당 아이템을 제거합니다.
            if (currentFilterStatus === 'open') {
                item.remove();
            }
        }
    });
    
    // 페이지가 처음 로드될 때 경매 목록을 가져옵니다.
    loadAuctionList(currentFilterStatus);
});
