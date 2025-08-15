// DOMContentLoaded 이벤트는 HTML 문서가 완전히 로드되고 파싱되었을 때 발생합니다.
// 즉, 이 이벤트 리스너 안의 코드는 HTML 요소들이 모두 준비된 후에 실행됩니다.
// --- HTML 요소 가져오기 (전역 스코프) ---
const navRight = document.querySelector('.nav-right');
const changePasswordModal = document.getElementById('change-password-modal');
const changePasswordForm = document.getElementById('change-password-form');
const messageElement = document.getElementById('change-password-message');
const closeModalButton = changePasswordModal ? changePasswordModal.querySelector('.close-button') : null;
const deleteAccountModal = document.getElementById('delete-account-modal');
const closeDeleteAccountBtn = document.getElementById('close-delete-account');
const cancelDeleteBtn = document.getElementById('cancel-delete-account');
const confirmDeleteBtn = document.getElementById('confirm-delete-account');

/**
 * 로그인한 사용자를 위해 화면 우측 상단 UI를 동적으로 구성하는 함수입니다.
 * @param {object} account - 서버로부터 받은 사용자 계정 정보
 */
const updateUIForLoggedInUser = (account) => {
  navRight.innerHTML = `
    <div class="user-info">
      <span class="user-id">${account.userId}</span>님 환영합니다!
      <!-- 마우스를 올리면 나타날 드롭다운 메뉴 -->
      <div class="dropdown-menu">
          <a href="#" id="change-password-btn">비밀번호 변경</a>
          <a href="#" id="delete-account-btn" class="danger-link">회원 탈퇴</a>
      </div>
    </div>
    <div class="cash">보유 캐시 <strong id = 'user-cash-display' >${account.cash.toLocaleString()}</strong></div>
    <a href="#" id="logoutBtn" class="logout">로그아웃</a>
    <button class="gamePlayBtn">게임시작</button>
  `;
  setupEventListeners(account.accountId);
};

/**
 * 로그인하지 않은 사용자(손님)를 위해 화면 우측 상단 UI를 구성하는 함수입니다.
 */
const updateUIForGuest = () => {
  navRight.innerHTML = `
    <div class="cash">로그인이 필요합니다.</div>
    <a href="/Scene/LoginScene/LoginScene.html" class="login">로그인</a>
    <a href="/Scene/LoginScene/LoginScene.html#signup" class="login" id="signupNavLink">회원가입</a>
    <button id="gamePlayBtn">게임시작</button>
  `;
  const gamePlayBtn = document.querySelector('.gamePlayBtn');
  if(gamePlayBtn){
      gamePlayBtn.addEventListener('click', () => {
        alert('로그인이 필요한 서비스입니다.');
        window.location.href = '/Scene/LoginScene/LoginScene.html';
      });
  }
};

/**
 * 버튼의 로딩 상태를 제어하는 공용 함수입니다. (loginScript.js의 것과 동일)
 * @param {HTMLButtonElement} button - 로딩 상태를 적용할 버튼 요소
 * @param {boolean} isLoading - 로딩 상태 여부 (true: 로딩 시작, false: 로딩 종료)
 */
const setLoading = (button, isLoading) => {
  if (isLoading) {
      button.classList.add('loading');
      button.disabled = true;
  } else {
      button.classList.remove('loading');
      button.disabled = false;
  }
};

/**
 * 로그인한 사용자 UI에 포함된 버튼들(로그아웃, 게임시작, 비밀번호 변경 등)에
 * 클릭 이벤트를 연결해주는 함수입니다.
 * @param {number} accountId - 비밀번호 변경 API 호출 시 필요한 현재 사용자의 accountId
 */
const setupEventListeners = (accountId) => {
  // '로그아웃' 버튼 클릭 이벤트
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

  // '게임 시작' 버튼 클릭 이벤트
  const gamePlayBtn = document.querySelector('.gamePlayBtn');
  if (gamePlayBtn) {
      gamePlayBtn.addEventListener('click', () => {
        if (window.location.pathname.includes('LobbyScene')) {
          window.location.href = '../GameReadyScene/GameReadyScene.html';
        } else {
          window.location.href = '../LobbyScene/LobbyScene.html';
        }
      });
  }

  // '비밀번호 변경' 버튼 클릭 이벤트 (모달 열기)
  if (document.getElementById('change-password-btn')) { // 요소가 존재하는지 확인
    document.getElementById('change-password-btn').addEventListener('click', (e) => {
        e.preventDefault();
        changePasswordForm.reset();
        messageElement.textContent = '';
        changePasswordModal.classList.add('visible');
    });
  }

  // 모달의 'X' 버튼 클릭 이벤트 (모달 닫기)
  if (closeModalButton) { // 요소가 존재하는지 확인
    closeModalButton.addEventListener('click', () => {
        changePasswordModal.classList.remove('visible');
    });
  }

  // 모달 외부의 어두운 배경 클릭 시 닫기
  if (changePasswordModal) { // 요소가 존재하는지 확인
    window.addEventListener('click', (event) => {
        if (event.target === changePasswordModal) {
            changePasswordModal.classList.remove('visible');
        }
    });
  }

  // -- 회원 가입 관련 이벤트 리스너 ---
  if (document.getElementById('signupNavLink')) { // 요소가 존재하는지 확인
    document.getElementById('signupNavLink').addEventListener('click', () => {
      window.location.href = '/Scene/LoginScene/LoginScene.html#signup';
    });
  }

  // --- 회원 탈퇴 관련 이벤트 리스너 ---
  if (document.getElementById('delete-account-btn')) { // 요소가 존재하는지 확인
    document.getElementById('delete-account-btn').addEventListener('click', (e) => {
        e.preventDefault();
        deleteAccountModal.classList.add('visible');
    });
  }

  if (closeDeleteAccountBtn) { // 요소가 존재하는지 확인
    closeDeleteAccountBtn.addEventListener('click', () => {
        deleteAccountModal.classList.remove('visible');
    });
  }

  if (cancelDeleteBtn) { // 요소가 존재하는지 확인
    cancelDeleteBtn.addEventListener('click', () => {
        deleteAccountModal.classList.remove('visible');
    });
  }

  if (deleteAccountModal) { // 요소가 존재하는지 확인
    window.addEventListener('click', (event) => {
        if (event.target === deleteAccountModal) {
            deleteAccountModal.classList.remove('visible');
        }
    });
  }

  if (confirmDeleteBtn) { // 요소가 존재하는지 확인
    confirmDeleteBtn.addEventListener('click', async () => {
      try {
        const response = await fetch(`/auth/delete/${accountId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert('회원 탈퇴가 완료되었습니다. 이용해주셔서 감사합니다.');
          sessionStorage.removeItem('accountId');
          window.location.href = '/Scene/LoginScene/LoginScene.html';
        } else {
          const data = await response.json();
          alert(`오류: ${data.message}`);
          deleteAccountModal.classList.remove('visible');
        }
      } catch (error) {
        console.error('Delete account error:', error);
        alert('회원 탈퇴 처리 중 오류가 발생했습니다.');
      }
    });
  }

  // '비밀번호 변경' 모달의 폼 제출 이벤트
  if (changePasswordForm) { // 요소가 존재하는지 확인
    changePasswordForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const currentPassword = document.getElementById('current-password').value;
      const newPassword = document.getElementById('new-password').value;
      const confirmPassword = document.getElementById('confirm-password').value;
      const submitButton = changePasswordForm.querySelector('button[type="submit"]');
      
      const accountId = sessionStorage.getItem('accountId');
      
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
                  window.location.href = '/Scene/LoginScene/LoginScene.html';
              }, 3000);
          } else {
              messageElement.textContent = data.message || '오류가 발생했습니다.';
              messageElement.style.color = 'red';
          }
      } catch (error) {
          messageElement.textContent = '요청 중 오류가 발생했습니다.';
          messageElement.style.color = 'red';
      } finally {
          setLoading(submitButton, false);
      }
    });
  }
};

/**
 * 로비 페이지가 처음 로드될 때 실행되는 초기화 함수입니다.
 * 서버에 현재 로그인 상태를 확인하여, 그 결과에 따라 화면을 다르게 보여줍니다.
 */
const initializeLobby = async () => {
  try {
    const response = await fetch('/api/users/me', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      const { account } = await response.json();
      updateUIForLoggedInUser(account);
    } else {
      updateUIForGuest();
    }
  } catch (error) {
    console.error('Lobby initialization error:', error);
    updateUIForGuest();
  }
};

// --- 스크립트 실행 시작점 ---
window.addEventListener('pageshow', (event) => {
  // 페이지가 BFCache에서 복원될 때도 UI를 업데이트합니다.
  if (event.persisted) {
    initializeLobby();
  } else {
    // 페이지가 새로 로드될 때도 UI를 업데이트합니다.
    initializeLobby();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // DOMContentLoaded 시점에서는 pageshow에서 이미 처리했으므로 추가 로직이 필요 없습니다.
  // 단, pageshow 이벤트가 지원되지 않는 구형 브라우저를 위해 initializeLobby()를 한 번 더 호출할 수 있습니다.
  // 또는 nav.js의 이벤트 리스너가 중복 등록되지 않도록 다른 로직을 사용할 수도 있습니다.
  // 여기서는 중복 호출을 피하고 pageshow를 우선시합니다.
});