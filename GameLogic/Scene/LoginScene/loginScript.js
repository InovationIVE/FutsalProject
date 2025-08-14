// DOMContentLoaded 이벤트는 HTML 문서가 완전히 로드되고 파싱되었을 때 발생합니다.
// 즉, 이 이벤트 리스너 안의 코드는 HTML 요소들이 모두 준비된 후에 실행됩니다.
document.addEventListener('DOMContentLoaded', async () => {
  // --- 로그인 상태 확인 ---
  // 페이지가 로드되자마자, 사용자가 이미 유효한 로그인 쿠키를 가지고 있는지 확인합니다.
  try {
    // '/api/users/me'는 현재 로그인된 사용자의 정보를 반환하는 API입니다.
    // fetch 함수는 서버에 HTTP 요청을 보내는 역할을 합니다.
    const response = await fetch('/api/users/me', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    
    // response.ok는 HTTP 상태 코드가 200-299 범위에 있는지 (즉, 요청이 성공했는지) 확인합니다.
    if (response.ok) {
      // 이미 로그인된 상태이므로, 로그인 페이지를 보여줄 필요 없이 바로 로비로 이동시킵니다.
      window.location.href = '/Scene/LobbyScene/LobbyScene.html';
      return; // 리디렉션 후, 더 이상 이 스크립트를 실행할 필요가 없으므로 여기서 종료합니다.
    }
  } catch (error) {
    // 서버가 꺼져있거나 네트워크 문제로 API 호출 자체가 실패한 경우, 콘솔에 에러를 기록하고
    // 그냥 로그인 페이지를 정상적으로 보여주도록 합니다.
    console.error('Login status check failed:', error);
  }

  // --- HTML 요소 가져오기 ---
  // 이 스크립트에서 제어해야 할 HTML 요소들을 id를 통해 미리 찾아 변수에 저장해둡니다.
  // 이렇게 하면 필요할 때마다 문서를 다시 검색할 필요가 없어 코드가 더 효율적이고 깔끔해집니다.

  // 기본 로그인 폼 관련 요소
  const loginForm = document.getElementById('login-form');
  const errorMessage = document.getElementById('error-message');

  // 아이디 찾기 모달 관련 요소
  const findIdModal = document.getElementById('find-id-modal');
  const findIdLink = document.getElementById('find-id-link');
  const closeFindId = document.getElementById('close-find-id');
  const findIdForm = document.getElementById('find-id-form');
  const findIdMessage = document.getElementById('find-id-message');

  // 비밀번호 찾기 모달 관련 요소
  const findPasswordModal = document.getElementById('find-password-modal');
  const findPasswordLink = document.getElementById('find-password-link');
  const closeFindPassword = document.getElementById('close-find-password');
  const findPasswordForm = document.getElementById('find-password-form');
  const findPasswordMessage = document.getElementById('find-password-message');

  // 회원가입 모달 관련 요소
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

  // --- 공용 함수 ---

  /**
   * 버튼의 로딩 상태를 제어하는 함수입니다.
   * API 요청과 같이 시간이 걸리는 작업을 사용자에게 시각적으로 보여주고, 중복 클릭을 방지합니다.
   * @param {HTMLButtonElement} button - 로딩 상태를 적용할 버튼 요소
   * @param {boolean} isLoading - 로딩 상태 여부 (true: 로딩 시작, false: 로딩 종료)
   */
  const setLoading = (button, isLoading) => {
      if (isLoading) {
          button.classList.add('loading'); // CSS 클래스를 추가하여 스피너를 보여줍니다.
          button.disabled = true;           // 버튼을 비활성화하여 중복 클릭을 막습니다.
      } else {
          button.classList.remove('loading'); // CSS 클래스를 제거하여 스피너를 숨깁니다.
          button.disabled = false;            // 버튼을 다시 활성화합니다.
      }
  };

  /**
   * 모달 창을 닫는 함수입니다.
   * @param {HTMLElement} modal - 닫으려는 모달 요소
   */
  const closeModal = (modal) => {
    modal.classList.remove('visible'); // CSS 클래스를 제거하여 모달을 화면에서 숨깁니다.
  };

  // --- 이벤트 리스너 설정 ---
  // 사용자의 클릭이나 폼 제출과 같은 행동에 반응하여 특정 함수를 실행하도록 설정합니다.

  // '로그인' 폼 제출 이벤트
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // 폼 제출 시 페이지가 새로고침되는 기본 동작을 막습니다.

    const submitButton = loginForm.querySelector('button[type="submit"]');
    const userId = loginForm.userId.value;
    const password = loginForm.password.value;
    errorMessage.textContent = ''; // 이전 에러 메시지를 지웁니다.
    
    setLoading(submitButton, true); // 로딩 시작

    try {
      // '/auth/login' API에 POST 요청을 보냅니다.
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, password }), // 입력된 아이디/비밀번호를 JSON 형태로 변환하여 전송합니다.
      });

      const data = await response.json(); // 서버의 응답을 JSON 형태로 파싱합니다.

      if (response.ok) {
        // 로그인 성공 시, accountId를 sessionStorage에 저장합니다. (Lobby 등 다른 페이지에서 사용 가능)
        sessionStorage.setItem('accountId', data.user.accountId);
        // 로비 씬으로 페이지를 이동시킵니다.
        window.location.href = '/Scene/LobbyScene/LobbyScene.html';
      } else {
        // 로그인 실패 시, 서버가 보내준 에러 메시지를 화면에 표시합니다.
        errorMessage.textContent = data.message || '로그인에 실패했습니다.';
      }
    } catch (error) {
      console.error('로그인 요청 중 오류 발생:', error);
      errorMessage.textContent = '로그인 중 오류가 발생했습니다. 서버 상태를 확인해주세요.';
    } finally {
      // 요청이 성공하든 실패하든, 마지막에는 항상 로딩 상태를 해제합니다.
      setLoading(submitButton, false);
    }
  });

  // '아이디 찾기' 링크 클릭 이벤트 (모달 열기)
  findIdLink.addEventListener('click', (e) => {
    e.preventDefault();
    findIdForm.reset(); // 폼의 입력 내용을 초기화합니다.
    findIdMessage.textContent = ''; // 메시지를 지웁니다.
    findIdModal.classList.add('visible'); // 모달을 화면에 보여줍니다.
  });

  // '비밀번호 찾기' 링크 클릭 이벤트 (모달 열기)
  findPasswordLink.addEventListener('click', (e) => {
    e.preventDefault();
    findPasswordForm.reset();
    findPasswordMessage.textContent = '';
    findPasswordModal.classList.add('visible');
  });

  // '회원가입' 링크 클릭 이벤트 (모달 열기)
  signupLink.addEventListener('click', (e) => {
    e.preventDefault();
    signupForm.reset();
    verifyCodeForm.reset();
    signupMessage.textContent = '';
    verifyMessage.textContent = '';
    signupStep1.style.display = 'block'; // 1단계 화면(아이디, 이메일, 비밀번호 입력)을 보여줍니다.
    signupStep2.style.display = 'none';  // 2단계 화면(인증코드 입력)은 숨깁니다.
    signupModal.classList.add('visible');
  });

  // 각 모달의 'X' 버튼 클릭 이벤트 (모달 닫기)
  closeFindId.addEventListener('click', () => closeModal(findIdModal));
  closeFindPassword.addEventListener('click', () => closeModal(findPasswordModal));
  closeSignup.addEventListener('click', () => closeModal(signupModal));

  // 모달 외부의 어두운 배경 클릭 시 닫기 이벤트
  window.addEventListener('click', (event) => {
    // 클릭된 대상이 'modal' 클래스와 'visible' 클래스를 모두 가지고 있는지 확인합니다.
    if (event.target.classList.contains('modal') && event.target.classList.contains('visible')) {
        // 단, 회원가입 모달(signup-modal)은 이메일 확인을 위해 다른 창으로 이동하는 경우가 많으므로,
        // 실수로 닫히는 것을 방지하기 위해 이 로직에서 제외합니다.
        if (event.target.id !== 'signup-modal') {
             closeModal(event.target);
        }
    }
  });

  // '아이디 찾기' 폼 제출 이벤트
  findIdForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('find-id-email').value;
    const submitButton = findIdForm.querySelector('button[type="submit"]');
    findIdMessage.textContent = '';

    setLoading(submitButton, true);

    try {
      const response = await fetch('/auth/find-id', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      findIdMessage.textContent = data.message; // 서버의 응답 메시지를 표시합니다.
      findIdMessage.style.color = response.ok ? 'green' : 'red'; // 성공/실패에 따라 글자색을 바꿉니다.
    } catch (error) {
      console.error('아이디 찾기 요청 오류:', error);
      findIdMessage.textContent = '요청 중 오류가 발생했습니다.';
      findIdMessage.style.color = 'red';
    } finally {
      setLoading(submitButton, false);
    }
  });

  // '비밀번호 찾기' 폼 제출 이벤트
  findPasswordForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const userId = document.getElementById('find-password-userid').value;
    const email = document.getElementById('find-password-email').value;
    const submitButton = findPasswordForm.querySelector('button[type="submit"]');
    findPasswordMessage.textContent = '';

    setLoading(submitButton, true);

    try {
      const response = await fetch('/auth/reset-password/link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, email }),
      });
      const data = await response.json();
      findPasswordMessage.textContent = data.message;
      findPasswordMessage.style.color = response.ok ? 'green' : 'red';
    } catch (error) {
      console.error('비밀번호 찾기 요청 오류:', error);
      findPasswordMessage.textContent = '요청 중 오류가 발생했습니다.';
      findPasswordMessage.style.color = 'red';
    } finally {
      setLoading(submitButton, false);
    }
  });

  // --- 회원가입 로직 ---

  // 1단계: 정보 입력 및 인증코드 요청
  signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const userId = document.getElementById('signup-userid').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;
    const submitButton = signupForm.querySelector('button[type="submit"]');
    signupMessage.textContent = '';

    // 비밀번호와 비밀번호 확인 값이 일치하는지 검사합니다.
    if (password !== confirmPassword) {
      signupMessage.textContent = '비밀번호가 일치하지 않습니다.';
      signupMessage.style.color = 'red';
      return; // 일치하지 않으면 여기서 함수를 종료합니다.
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
        // 요청이 성공하면, 모달의 내용을 2단계(인증코드 입력) 화면으로 전환합니다.
        signupStep1.style.display = 'none';
        signupStep2.style.display = 'block';
        sentEmailAddress.textContent = email; // 어느 이메일로 코드를 보냈는지 알려줍니다.
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

  // 2단계: 인증코드 확인 및 최종 가입
  verifyCodeForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const code = document.getElementById('verification-code').value;
    const submitButton = verifyCodeForm.querySelector('button[type="submit"]');
    verifyMessage.textContent = '';

    setLoading(submitButton, true);

    try {
      // 이 API는 요청 헤더에 자동으로 포함된 'signupToken' 쿠키를 함께 사용하여 서버에서 검증합니다.
      const response = await fetch('/auth/signup/code/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      const data = await response.json();

      if (response.ok) {
        // 최종 성공 시, 성공 메시지를 보여주고 1.5초 후에 로비로 이동합니다.
        verifyMessage.textContent = '회원가입에 성공했습니다! 로비로 이동합니다.';
        verifyMessage.style.color = 'green';
        setTimeout(() => {
          window.location.href = '/Scene/LobbyScene/LobbyScene.html';
        }, 1500);
      } else {
        // 실패 종류(시간 초과, 코드 불일치 등)에 따라 서버가 보내준 메시지를 표시합니다.
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