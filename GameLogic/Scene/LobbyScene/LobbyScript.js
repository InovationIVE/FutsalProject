import GameManager from '../../Manager/GameManager.js';

document.addEventListener('DOMContentLoaded', () => {
  const navRight = document.querySelector('.nav-right');

  // --- Modal 관련 요소들 ---
  const changePasswordModal = document.getElementById('change-password-modal');
  const changePasswordForm = document.getElementById('change-password-form');
  const messageElement = document.getElementById('change-password-message');
  const closeModalButton = changePasswordModal.querySelector('.close-button');

  const initializeLobby = async () => {
    try {
      // 1. 서버에 내 정보를 요청하여 로그인 상태 확인
      const response = await fetch('/api/users/me', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        // 2. 로그인 성공 시 UI 업데이트
        const { account } = await response.json();
        updateUIForLoggedInUser(account);
      } else {
        // 3. 로그인 실패 시 UI 업데이트
        updateUIForGuest();
      }
    } catch (error) {
      console.error('Lobby initialization error:', error);
      updateUIForGuest();
    }
  };

  const updateUIForLoggedInUser = (account) => {
    navRight.innerHTML = `
      <div class="user-info">
        <span class="user-id">${account.userId}</span>님 환영합니다!
        <div class="dropdown-menu">
            <a href="#" id="change-password-btn">비밀번호 변경</a>
        </div>
      </div>
      <div class="cash">보유 캐시 <strong>${account.cash.toLocaleString()}</strong></div>
      <a href="#" id="logoutBtn" class="logout">로그아웃</a>
      <button class="gamePlayBtn">게임시작</button>
    `;

    // --- 이벤트 리스너 설정 ---
    setupEventListeners(account.accountId);
  };
  
  const setupEventListeners = (accountId) => {
    // 로그아웃 버튼
    document.getElementById('logoutBtn').addEventListener('click', async (e) => {
      e.preventDefault();
      try {
        const logoutResponse = await fetch('/auth/logout', { method: 'POST' });
        if (logoutResponse.ok) {
          sessionStorage.removeItem('accountId');
          window.location.reload();
        }
      } catch (error) {
        console.error('Logout failed:', error);
      }
    });

    // 게임 시작 버튼
    document.querySelector('.gamePlayBtn').addEventListener('click', () => {
      window.location.href = '../GameReadyScene/GameReadyScene.html';
    });

    // 비밀번호 변경 버튼 (모달 열기)
    document.getElementById('change-password-btn').addEventListener('click', (e) => {
        e.preventDefault();
        changePasswordForm.reset();
        messageElement.textContent = '';
        changePasswordModal.classList.add('visible');
    });

    // 모달 닫기 (X 버튼)
    closeModalButton.addEventListener('click', () => {
        changePasswordModal.classList.remove('visible');
    });

    // 모달 외부 클릭 시 닫기
    window.addEventListener('click', (event) => {
        if (event.target === changePasswordModal) {
            changePasswordModal.classList.remove('visible');
        }
    });
  };

  const updateUIForGuest = () => {
    navRight.innerHTML = `
      <div class="cash">로그인이 필요합니다.</div>
      <a href="../LoginScene/LoginScene.html" class="login">로그인</a>
      <button class="gamePlayBtn">게임시작</button>
    `;
     // 게임 시작 버튼 클릭 시 로그인 페이지로 이동
    document.querySelector('.gamePlayBtn').addEventListener('click', () => {
      alert('로그인이 필요한 서비스입니다.');
      window.location.href = '../LoginScene/LoginScene.html';
    });
  };
  
  // 로딩 상태 제어 함수
  const setLoading = (button, isLoading) => {
    const btnText = button.querySelector('.btn-text');
    if (isLoading) {
        button.classList.add('loading');
        button.disabled = true;
    } else {
        button.classList.remove('loading');
        button.disabled = false;
    }
  };
  
  // 비밀번호 변경 폼 제출 이벤트
  changePasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const submitButton = changePasswordForm.querySelector('button[type="submit"]');
    const accountId = sessionStorage.getItem('accountId'); // 로그인 시 저장된 accountId 사용
    
    messageElement.textContent = '';

    if (newPassword !== confirmPassword) {
        messageElement.textContent = '새 비밀번호가 일치하지 않습니다.';
        messageElement.style.color = 'red';
        return;
    }
    
    setLoading(submitButton, true);

    try {
        const response = await fetch(`/auth/${accountId}/password`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ currentPassword, newPassword }),
        });
        const data = await response.json();
        
        if (response.ok) {
            messageElement.textContent = data.message + ' 3초 후 로그인 페이지로 이동합니다.';
            messageElement.style.color = 'green';
            setTimeout(() => {
                sessionStorage.removeItem('accountId');
                window.location.href = '../LoginScene/LoginScene.html';
            }, 3000);
        } else {
            messageElement.textContent = data.message || '오류가 발생했습니다.';
            messageElement.style.color = 'red';
        }
    } catch (error) {
        messageElement.textContent = '요청 중 오류가 발생했습니다.';
    } finally {
        setLoading(submitButton, false);
    }
  });

  initializeLobby();
});

  // 페이지 로드 시 초기화 함수 호출
  document.addEventListener('DOMContentLoaded', initialize);  
