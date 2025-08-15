document.addEventListener('DOMContentLoaded', () => {
  // DOM 요소 가져오기
  const playerList = document.getElementById('onwedPlayer-list');
  const card = document.querySelector('.card');
  const cashElement = document.querySelector('.nav-right .cash strong');

  /** 강화 페이지 이동 버튼 */
  const toReinforceBtn = document.querySelector('.toReinforceBtn');

  // 초기 상태에서 카드 숨기기
  card.style.display = 'none';

  // 보유 선수 목록을 가져와 화면에 렌더링하는 함수
  async function fetchOwnedPlayers() {
    try {
      const response = await fetch('/api/ownedPlayers', {
        headers: {
          Authorization: `Bearer ${getCookie('Authorization')}`,
        },
      }); // API 엔드포인트
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('인증 정보가 없습니다. 로그인이 필요합니다.');
        }
        throw new Error('보유 선수 목록을 가져오는 데 실패했습니다.');
      }
      const result = await response.json();
      const ownedPlayers = result.data;

      playerList.innerHTML = ''; // 기존 목록 초기화
      if (ownedPlayers.length === 0) {
        playerList.innerHTML = '<li>보유한 선수가 없습니다.</li>';
        card.style.display = 'none';
        return;
      }

      ownedPlayers.forEach((player) => {
        const listItem = document.createElement('li');
        const levelText = player.level ? `+${player.level}강` : '';
        listItem.textContent = `${player.name} (${player.rarity}) ${levelText}`;
        listItem.dataset.ownedPlayerId = player.ownedPlayerId;
        //클릭된 요소의 data 속성에서 ID를 가져오는 방식으로 변경
        listItem.addEventListener('click', (event) => {
          const id = event.currentTarget.dataset.ownedPlayerId;
          if (id) {
            showPlayerDetails(id);
          } else {
            console.error('ownedPlayerId가 누락되었습니다.');
          }
        });
        playerList.appendChild(listItem);
      });
    } catch (error) {
      console.error('Error fetching owned players:', error);
      console.log('Error Message:', error.message);
    }
  }

  // 선수 상세 정보를 가져와 카드에 표시하는 함수
  async function showPlayerDetails(ownedPlayerId) {
    try {
      const response = await fetch(`/api/ownedPlayers/${ownedPlayerId}`, {
        headers: {
          Authorization: `Bearer ${getCookie('Authorization')}`,
        },
      }); // API 엔드포인트
      if (!response.ok) {
        throw new Error('선수 상세 정보를 가져오는 데 실패했습니다.');
      }
      const result = await response.json();
      const playerDetails = result; // API 응답 구조에 맞게 수정

      // 카드 정보 업데이트
      card.style.display = 'flex'; // 카드 보이기
      card.querySelector('.profileImage').style.backgroundImage =
        `url('${playerDetails.profileImage || 'https://placehold.co/150x200/808080/FFFFFF?text=No+Image'}')`;

      // id를 사용하여 요소를 선택
      document.getElementById('name').textContent = `${playerDetails.name}`;
      document.getElementById('rarity').textContent = `${playerDetails.rarity}`;
      document.getElementById('attack').textContent = `ATK: ${playerDetails.attack}`;
      document.getElementById('defense').textContent = `DEF: ${playerDetails.defence}`;
      document.getElementById('speed').textContent = `SPD: ${playerDetails.speed}`;

      // 강화 버튼과 판매 버튼에 현재 선택된 선수의 ID를 data 속성으로 저장
      toReinforceBtn.dataset.ownedPlayerId = playerDetails.ownedPlayerId;
      document.querySelector('.saleBtn').dataset.ownedPlayerId = playerDetails.ownedPlayerId;
    } catch (error) {
      console.error('Error fetching player details:', error);
      console.log('Error Message:', error.message);
    }
  }

  // 선수 판매 버튼 클릭 이벤트 핸들러
  document.querySelector('.saleBtn').addEventListener('click', async (event) => {
    const ownedPlayerId = event.currentTarget.dataset.ownedPlayerId;
    if (!ownedPlayerId) {
      alert('판매할 선수를 선택해주세요.');
      return;
    }

    if (!confirm('정말로 이 선수를 판매하시겠습니까?')) {
      return;
    }

    try {
      const response = await fetch(`/api/ownedPlayers/sales`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${getCookie('Authorization')}`,
        },
        body: JSON.stringify({ ownedPlayerId: parseInt(ownedPlayerId, 10) }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '선수 판매에 실패했습니다.');
      }

      const result = await response.json();
      alert(`선수 판매 완료! ${result.sales.toLocaleString('ko-KR')} 캐시를 얻었습니다.`);

      // 선수 목록과 캐시 업데이트
      await fetchOwnedPlayers();
      await updateCash();
    } catch (error) {
      console.error('Error selling player:', error);
      alert(`선수 판매 중 오류가 발생했습니다: ${error.message}`);
    }
  });

  /** 강화 페이지 이동 버튼 */
  toReinforceBtn.addEventListener('click', () => {
    // 버튼에 저장된 ownedPlayerId를 가져옵니다.
    const ownedPlayerId = toReinforceBtn.dataset.ownedPlayerId;
    if (!ownedPlayerId) {
      alert('강화할 선수를 선택해주세요.');
      return;
    }
    /** 강화 페이지로 이동 **/
    window.location.href = `../ReinforceScene/ReinforceScene.html?ownedPlayerId=${ownedPlayerId}`;
  });

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  // 보유 캐시 정보를 업데이트하는 함수
  async function updateCash() {
    try {
      const response = await fetch('/api/users/me', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        throw new Error('캐시 정보를 가져오는 데 실패했습니다.');
      }
      const result = await response.json();
      const userCash = result.data.account.cash;
      cashElement.textContent = `${userCash.toLocaleString('ko-KR')}`;
    } catch (error) {
      console.error('Error updating cash:', error);
    }
  }

  // 페이지 로드 시 함수 호출
  fetchOwnedPlayers();
  updateCash();
});
