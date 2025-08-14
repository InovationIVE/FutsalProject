document.addEventListener('DOMContentLoaded', async () => {
  // 페이지 로드 시 가장 먼저 로그인 상태를 확인합니다.
  try {
    const response = await fetch('/api/users/me', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    
    // API 호출이 성공하면 (유효한 세션이 있으면) 로비로 리디렉션합니다.
    if (response.ok) {
      window.location.href = '/Scene/LobbyScene/LobbyScene.html';
      return; // 리디렉션 후 나머지 스크립트 실행을 중단합니다.
    }
  } catch (error) {
    // 네트워크 에러 등 API 호출 자체에 실패하면 그냥 로그인 페이지를 보여줍니다.
    console.error('Login status check failed:', error);
  }

  // --- 아래 코드는 비로그인 상태일 때만 실행됩니다. ---
  const loginForm = document.getElementById('login-form');
  const errorMessage = document.getElementById('error-message');

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // 폼의 기본 제출 동작을 막습니다.

    const submitButton = loginForm.querySelector('button[type="submit"]');
    const userId = loginForm.userId.value;
    const password = loginForm.password.value;
    errorMessage.textContent = ''; // 이전 에러 메시지 초기화

    setLoading(submitButton, true);

    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // 로그인 성공 시 accountId를 sessionStorage에 저장
        sessionStorage.setItem('accountId', data.user.accountId);

        // 로그인 성공 시 로비 씬으로 이동
        window.location.href = '/Scene/LobbyScene/LobbyScene.html';
      } else {
        // 로그인 실패 시 에러 메시지 표시
        errorMessage.textContent = data.message || '로그인에 실패했습니다.';
      }
    } catch (error) {
      console.error('로그인 요청 중 오류 발생:', error);
      errorMessage.textContent = '로그인 중 오류가 발생했습니다. 서버 상태를 확인해주세요.';
    } finally {
      setLoading(submitButton, false);
    }
  });

  // --- 추가된 스크립트 ---

  // Modal 요소 가져오기
  const findIdModal = document.getElementById('find-id-modal');
  const findPasswordModal = document.getElementById('find-password-modal');

  // Modal 열기 버튼
  const findIdLink = document.getElementById('find-id-link');
  const findPasswordLink = document.getElementById('find-password-link');

  // Modal 닫기 버튼
  const closeFindId = document.getElementById('close-find-id');
  const closeFindPassword = document.getElementById('close-find-password');

  // Form 요소
  const findIdForm = document.getElementById('find-id-form');
  const findPasswordForm = document.getElementById('find-password-form');

  // 메시지 표시 요소
  const findIdMessage = document.getElementById('find-id-message');
  const findPasswordMessage = document.getElementById('find-password-message');

  // 회원가입 관련 요소
  const signupModal = document.getElementById('signup-modal');
  const signupLink = document.getElementById('signup-link');
  const closeSignup = document.getElementById('close-signup');
  const signupForm = document.getElementById('signup-form');
  const verifyCodeForm = document.getElementById('verify-code-form');
  const signupMessage = document.getElementById('signup-message');
  const verifyMessage = document.getElementById('verify-message');
  const signupStep1 = document.getElementById('signup-step-1');
  const signupStep2 = document.getElementById('signup-step-2');
  const sentEmailAddress = document.getElementById('sent-email-address');


  // 로딩 상태 제어 함수
  const setLoading = (button, isLoading) => {
      if (isLoading) {
          button.classList.add('loading');
          button.disabled = true;
      } else {
          button.classList.remove('loading');
          button.disabled = false;
      }
  };

  // Modal 열기
  findIdLink.addEventListener('click', (e) => {
    e.preventDefault();
    findIdForm.reset();
    findIdMessage.textContent = '';
    findIdModal.classList.add('visible');
  });

  findPasswordLink.addEventListener('click', (e) => {
    e.preventDefault();
    findPasswordForm.reset();
    findPasswordMessage.textContent = '';
    findPasswordModal.classList.add('visible');
  });

  signupLink.addEventListener('click', (e) => {
    e.preventDefault();
    signupForm.reset();
    verifyCodeForm.reset();
    signupMessage.textContent = '';
    verifyMessage.textContent = '';
    signupStep1.style.display = 'block';
    signupStep2.style.display = 'none';
    signupModal.classList.add('visible');
  });

  // Modal 닫기 함수
  const closeModal = (modal) => {
    modal.classList.remove('visible');
  };

  // 각 닫기 버튼에 이벤트 리스너 추가
  closeFindId.addEventListener('click', () => closeModal(findIdModal));
  closeFindPassword.addEventListener('click', () => closeModal(findPasswordModal));
  closeSignup.addEventListener('click', () => closeModal(signupModal));

  // Modal 외부 영역 클릭 시 닫기
  window.addEventListener('click', (event) => {
    // 현재 화면에 보이는 modal인지 확인하고, 그 modal의 배경을 클릭했을 때만 닫습니다.
    if (event.target.classList.contains('modal') && event.target.classList.contains('visible')) {
        // 단, 회원가입 모달은 이메일 확인 등 다른 창으로 이동하는 경우가 많으므로,
        // 실수로 닫히는 것을 방지하기 위해 외부 클릭으로 닫기 기능을 적용하지 않습니다.
        if (event.target.id !== 'signup-modal') {
             closeModal(event.target);
        }
    }
  });

  // 아이디 찾기 폼 제출
  findIdForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('find-id-email').value;
    findIdMessage.textContent = '';
    const submitButton = findIdForm.querySelector('button[type="submit"]');

    setLoading(submitButton, true);

    try {
      const response = await fetch('/auth/find-id', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      findIdMessage.textContent = data.message;
      if (response.ok) {
        findIdMessage.style.color = 'green';
      } else {
        findIdMessage.style.color = 'red';
      }
    } catch (error) {
      console.error('아이디 찾기 요청 오류:', error);
      findIdMessage.textContent = '요청 중 오류가 발생했습니다.';
      findIdMessage.style.color = 'red';
    } finally {
      setLoading(submitButton, false);
    }
  });

  // 비밀번호 찾기 폼 제출
  findPasswordForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const userId = document.getElementById('find-password-userid').value;
    const email = document.getElementById('find-password-email').value;
    findPasswordMessage.textContent = '';
    const submitButton = findPasswordForm.querySelector('button[type="submit"]');

    setLoading(submitButton, true);

    try {
      const response = await fetch('/auth/reset-password/link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, email }),
      });
      const data = await response.json();
      findPasswordMessage.textContent = data.message;
       if (response.ok) {
        findPasswordMessage.style.color = 'green';
      } else {
        findPasswordMessage.style.color = 'red';
      }
    } catch (error) {
      console.error('비밀번호 찾기 요청 오류:', error);
      findPasswordMessage.textContent = '요청 중 오류가 발생했습니다.';
      findPasswordMessage.style.color = 'red';
    } finally {
      setLoading(submitButton, false);
    }
  });

  // --- 회원가입 로직 ---

  // Step 1: 정보 입력 및 인증코드 요청
  signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const userId = document.getElementById('signup-userid').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;
    const submitButton = signupForm.querySelector('button[type="submit"]');
    signupMessage.textContent = '';

    if (password !== confirmPassword) {
      signupMessage.textContent = '비밀번호가 일치하지 않습니다.';
      signupMessage.style.color = 'red';
      return;
    }

    setLoading(submitButton, true);

    try {
      const response = await fetch('/auth/signup/code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        // 성공 시, 2단계로 UI 전환
        signupStep1.style.display = 'none';
        signupStep2.style.display = 'block';
        sentEmailAddress.textContent = email;
      } else {
        signupMessage.textContent = data.message || '요청에 실패했습니다.';
        signupMessage.style.color = 'red';
      }
    } catch (error) {
      signupMessage.textContent = '요청 중 오류가 발생했습니다.';
      signupMessage.style.color = 'red';
    } finally {
      setLoading(submitButton, false);
    }
  });

  // Step 2: 인증코드 확인 및 최종 가입
  verifyCodeForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const code = document.getElementById('verification-code').value;
    const submitButton = verifyCodeForm.querySelector('button[type="submit"]');
    verifyMessage.textContent = '';

    setLoading(submitButton, true);

    try {
      const response = await fetch('/auth/signup/code/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      const data = await response.json();

      if (response.ok) {
        // 최종 성공 시, 로비로 리디렉션
        verifyMessage.textContent = '회원가입에 성공했습니다! 로비로 이동합니다.';
        verifyMessage.style.color = 'green';
        setTimeout(() => {
          window.location.href = '/Scene/LobbyScene/LobbyScene.html';
        }, 1500);
      } else {
        verifyMessage.textContent = data.message || '인증에 실패했습니다.';
        verifyMessage.style.color = 'red';
      }
    } catch (error) {
      verifyMessage.textContent = '요청 중 오류가 발생했습니다.';
      verifyMessage.style.color = 'red';
    } finally {
      setLoading(submitButton, false);
    }
  });
});