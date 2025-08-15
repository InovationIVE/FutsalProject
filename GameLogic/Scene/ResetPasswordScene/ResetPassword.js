// DOMContentLoaded 이벤트는 HTML 문서가 완전히 로드되고 파싱되었을 때 발생합니다.
// 즉, 이 이벤트 리스너 안의 코드는 HTML 요소들이 모두 준비된 후에 실행됩니다.
document.addEventListener('DOMContentLoaded', () => {
    // --- HTML 요소 가져오기 ---
    const resetPasswordForm = document.getElementById('reset-password-form');
    const messageElement = document.getElementById('message');
    const submitButton = resetPasswordForm.querySelector('button[type="submit"]');

    // --- 페이지 로드 시 실행 로직 ---

    // 1. URL의 쿼리 파라미터에서 'token' 값을 추출합니다.
    // e.g., .../ResetPassword.html?token=ABCDEFG -> 'ABCDEFG'
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    // 만약 URL에 토큰이 없다면, 비정상적인 접근으로 간주하고 사용자에게 안내 후 폼을 비활성화합니다.
    if (!token) {
        messageElement.textContent = '유효하지 않은 접근입니다. 이메일을 통해 다시 시도해주세요.';
        messageElement.style.color = 'red';
        submitButton.disabled = true;
        return; // 스크립트 실행을 여기서 중단합니다.
    }

    /**
     * 버튼의 로딩 상태를 제어하는 공용 함수입니다.
     * @param {boolean} isLoading - 로딩 상태 여부 (true: 로딩 시작, false: 로딩 종료)
     */
    const setLoading = (isLoading) => {
        if (isLoading) {
            submitButton.classList.add('loading');
            submitButton.disabled = true;
        } else {
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
        }
    };

    // 2. '비밀번호 변경' 폼 제출 이벤트 리스너
    resetPasswordForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        messageElement.textContent = '';

        // 새 비밀번호와 확인 비밀번호가 일치하는지 먼저 확인합니다.
        if (newPassword !== confirmPassword) {
            messageElement.textContent = '비밀번호가 일치하지 않습니다.';
            messageElement.style.color = 'red';
            return;
        }

        // 비밀번호 유효성 검사 (서버와 동일한 규칙을 적용하는 것이 좋습니다)
        if (newPassword.length < 8) {
            messageElement.textContent = '비밀번호는 8자 이상이어야 합니다.';
            messageElement.style.color = 'red';
            return;
        }

        setLoading(true);

        try {
            // 3. 백엔드의 비밀번호 최종 변경 API(/auth/reset-password-with-token)로 요청을 보냅니다.
            //    URL에서 추출한 토큰을 쿼리 파라미터로 함께 전달합니다.
            const response = await fetch(`/auth/reset-password-with-token?token=${token}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                // 성공 시, 사용자에게 안내 메시지를 보여주고 3초 후에 로그인 페이지로 이동시킵니다.
                messageElement.textContent = data.message + ' 잠시 후 로그인 페이지로 이동합니다.';
                messageElement.style.color = 'green';
                submitButton.disabled = true; // 성공 후에는 버튼을 영구적으로 비활성화합니다.
                setTimeout(() => {
                    window.location.href = '../LoginScene/LoginScene.html';
                }, 3000);
            } else {
                // 실패 시 (만료된 토큰 등), 서버가 보내준 에러 메시지를 표시합니다.
                messageElement.textContent = data.message || '오류가 발생했습니다.';
                messageElement.style.color = 'red';
            }
        } catch (error) {
            console.error('Password reset error:', error);
            messageElement.textContent = '요청 중 오류가 발생했습니다.';
            messageElement.style.color = 'red';
        } finally {
            setLoading(false);
        }
    });
});
