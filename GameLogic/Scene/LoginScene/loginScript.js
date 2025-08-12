document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const errorMessage = document.getElementById('error-message');

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // 폼의 기본 제출 동작을 막습니다.

    const userId = loginForm.userId.value;
    const password = loginForm.password.value;
    errorMessage.textContent = ''; // 이전 에러 메시지 초기화

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
        // 로그인 성공 시 로비 씬으로 이동
        window.location.href = '/Scene/LobbyScene/LobbyScene.html';
      } else {
        // 로그인 실패 시 에러 메시지 표시
        errorMessage.textContent = data.message || '로그인에 실패했습니다.';
      }
    } catch (error) {
      console.error('로그인 요청 중 오류 발생:', error);
      errorMessage.textContent = '로그인 중 오류가 발생했습니다. 서버 상태를 확인해주세요.';
    }
  });
});
