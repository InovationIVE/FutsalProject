document.addEventListener('DOMContentLoaded', () => {
  const auctionTableBody = document.querySelector('#auction-table tbody');
  const searchInput = document.getElementById('search-input');
  const statusFilter = document.getElementById('status-filter');
  const prevPageButton = document.getElementById('prev-page');
  const nextPageButton = document.getElementById('next-page');
  const pageNumberSpan = document.getElementById('page-number');
  const registrationModal = document.getElementById('registration-modal');
  const registrationForm = document.getElementById('registration-form');
  const ownedPlayersSelect = document.getElementById('owned-players');
  const registerButton = document.getElementById('register-button');
  const closeButton = document.querySelector('.close-button');
  const myAuctionsButton = document.getElementById('my-auctions-button');

  let currentPage = 1;
  const rowsPerPage = 10;
  let currentView = 'all'; // 'all' or 'my'

  const socket = io();

  async function fetchAuctions(page = 1, searchQuery = '', status = 'open') {
    try {
      let url;
      if (currentView === 'my') {
        url = `/api/auctions/myAuction?page=${page}&limit=${rowsPerPage}&search=${searchQuery}&status=${status}`;
      } else {
        url = `/api/auctions?page=${page}&limit=${rowsPerPage}&search=${searchQuery}&status=${status}`;
      }

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${getCookie('Authorization')}`,
        },
        cache: 'no-cache',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch auctions');
      }
      const result = await response.json();
      renderAuctionTable(result.data);
      const totalPages = Math.ceil(result.total / result.limit);
      updatePagination(totalPages);
    } catch (error) {
      console.error('Error fetching auctions:', error);
    }
  }

  function renderAuctionTable(auctions) {
    auctionTableBody.innerHTML = '';
    if (!auctions) {
      return;
    }
    auctions.forEach((auction) => {
      const row = document.createElement('tr');
      row.setAttribute('data-auction-id', auction.auctionId);
      const playerImage = auction.ownedPlayer.profileImage ? `<img src="${auction.ownedPlayer.profileImage}" alt="${auction.ownedPlayer.name}" width="50">` : 'No Image';
      row.innerHTML = `
        <td>${playerImage}</td>
        <td>${auction.ownedPlayer.name}</td>
        <td>${auction.ownedPlayer.rarity}</td>
        <td>${auction.ownedPlayer.level}</td>
        <td>${auction.startingPrice}</td>
        <td class="current-price">${auction.currentPrice}</td>
        <td>${new Date(auction.endsAt).toLocaleString()}</td>
        <td>${auction.status}</td>
        <td>
          <input type="number" class="bid-input" placeholder="입찰가">
          <button class="bid-button" data-id="${auction.auctionId}" ${auction.status !== 'open' ? 'disabled' : ''}>입찰</button>
          ${currentView === 'my' && auction.status === 'open' ? `<button class="cancel-button" data-id="${auction.auctionId}">취소</button>` : ''}
        </td>
      `;
      auctionTableBody.appendChild(row);
    });
  }

  function updatePagination(totalPages) {
    pageNumberSpan.textContent = currentPage;
    prevPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = currentPage >= totalPages;
  }

  async function handleBid(event) {
    const auctionId = event.target.dataset.id;
    const bidInput = event.target.previousElementSibling;
    const bidAmount = parseInt(bidInput.value, 10);

    if (isNaN(bidAmount) || bidAmount <= 0) {
      alert('유효한 입찰가를 입력하세요.');
      return;
    }

    try {
      const response = await fetch(`/api/auctions/${auctionId}/bid`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('Authorization')}`,
        },
        body: JSON.stringify({ bidAmount }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '입찰에 실패했습니다.');
      }

      alert('입찰에 성공했습니다.');
      bidInput.value = '';
    } catch (error) {
      console.error('Error placing bid:', error);
      alert(error.message);
    }
  }

  async function handleCancel(event) {
    const auctionId = event.target.dataset.id;
    if (!confirm('정말로 경매를 취소하시겠습니까?')) {
      return;
    }

    try {
      const response = await fetch(`/api/auctions/${auctionId}/cancel`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${getCookie('Authorization')}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '경매 취소에 실패했습니다.');
      }

      alert('경매를 취소했습니다.');
    } catch (error) {
      console.error('Error cancelling auction:', error);
      alert(error.message);
    }
  }

  async function fetchOwnedPlayers() {
    try {
      const response = await fetch('/api/ownedPlayers', {
        headers: {
          Authorization: `Bearer ${getCookie('Authorization')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch owned players');
      }
      const result = await response.json();
      renderOwnedPlayersSelect(result.data);
    } catch (error) {
      console.error('Error fetching owned players:', error);
    }
  }

  function renderOwnedPlayersSelect(players) {
    ownedPlayersSelect.innerHTML = '<option value="">선수 선택</option>';
    if (!players) return;
    players.forEach((player) => {
      const option = document.createElement('option');
      option.value = player.ownedPlayerId;
      option.textContent = `${player.name} (레벨: ${player.level}, 등급: ${player.rarity})`;
      ownedPlayersSelect.appendChild(option);
    });
  }

  async function handleRegistration(event) {
    event.preventDefault();
    const ownedPlayerId = ownedPlayersSelect.value;
    const startingPrice = document.getElementById('starting-price').value;

    if (!ownedPlayerId || !startingPrice) {
      alert('선수와 시작가를 모두 입력하세요.');
      return;
    }

    try {
      const response = await fetch('/api/auction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('Authorization')}`,
        },
        body: JSON.stringify({
          ownedPlayerId: parseInt(ownedPlayerId, 10),
          startingPrice: parseInt(startingPrice, 10),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '경매 등록에 실패했습니다.');
      }

      alert('경매에 선수를 등록했습니다.');
      registrationModal.style.display = 'none';
      registrationForm.reset();
    } catch (error) {
      console.error('Error registering player for auction:', error);
      alert(error.message);
    }
  }

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  // Socket event listeners
  socket.on('auctionCreated', (newAuction) => {
    console.log('New auction created:', newAuction);
    fetchAuctions(currentPage, searchInput.value, statusFilter.value);
  });

  socket.on('auctionUpdate', ({ auctionId, newPrice }) => {
    console.log(`Auction ${auctionId} updated with new price: ${newPrice}`);
    const priceElement = document.querySelector(`tr[data-auction-id="${auctionId}"] .current-price`);
    if (priceElement) {
      priceElement.textContent = newPrice;
    }
  });

  socket.on('auctionClosed', ({ auctionId, status }) => {
    console.log(`Auction ${auctionId} closed with status: ${status}`);
    fetchAuctions(currentPage, searchInput.value, statusFilter.value);
  });

  socket.on('auctionCancelled', ({ auctionId }) => {
    console.log(`Auction ${auctionId} cancelled`);
    fetchAuctions(currentPage, searchInput.value, statusFilter.value);
  });


  // Event Listeners
  searchInput.addEventListener('input', () => {
    currentPage = 1;
    fetchAuctions(currentPage, searchInput.value, statusFilter.value);
  });

  statusFilter.addEventListener('change', () => {
    currentPage = 1;
    fetchAuctions(currentPage, searchInput.value, statusFilter.value);
  });

  prevPageButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      fetchAuctions(currentPage, searchInput.value, statusFilter.value);
    }
  });

  nextPageButton.addEventListener('click', () => {
    currentPage++;
    fetchAuctions(currentPage, searchInput.value, statusFilter.value);
  });

  auctionTableBody.addEventListener('click', (event) => {
    if (event.target.classList.contains('bid-button')) {
      handleBid(event);
    }
    if (event.target.classList.contains('cancel-button')) {
      handleCancel(event);
    }
  });

  registerButton.addEventListener('click', () => {
    fetchOwnedPlayers();
    registrationModal.style.display = 'block';
  });

  myAuctionsButton.addEventListener('click', () => {
    currentView = currentView === 'all' ? 'my' : 'all';
    myAuctionsButton.textContent = currentView === 'all' ? '내 경매 보기' : '전체 경매 보기';
    statusFilter.disabled = currentView === 'false';
    currentPage = 1;
    fetchAuctions(currentPage, searchInput.value, statusFilter.value);
  });

  closeButton.addEventListener('click', () => {
    registrationModal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === registrationModal) {
      registrationModal.style.display = 'none';
    }
  });

  registrationForm.addEventListener('submit', handleRegistration);

  // Initial fetch
  fetchAuctions(currentPage, searchInput.value, statusFilter.value);
});
