document.addEventListener('DOMContentLoaded', () => {
    const resetPasswordForm = document.getElementById('reset-password-form');
    const messageElement = document.getElementById('message');
    const submitButton = resetPasswordForm.querySelector('button[type="submit"]');

    // 1. URL에서 토큰 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (!token) {
        messageElement.textContent = '유효하지 않은 접근입니다. 이메일을 통해 다시 시도해주세요.';
        messageElement.style.color = 'red';
        submitButton.disabled = true;
        return;
    }

    // 로딩 상태 제어 함수
    const setLoading = (isLoading) => {
        if (isLoading) {
            submitButton.classList.add('loading');
            submitButton.disabled = true;
        } else {
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
        }
    };

    // 2. 폼 제출 이벤트 리스너
    resetPasswordForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        messageElement.textContent = '';

        if (newPassword !== confirmPassword) {
            messageElement.textContent = '비밀번호가 일치하지 않습니다.';
            messageElement.style.color = 'red';
            return;
        }

        // 비밀번호 유효성 검사 (필요 시 정규식 추가)
        if (newPassword.length < 8) {
            messageElement.textContent = '비밀번호는 8자 이상이어야 합니다.';
            messageElement.style.color = 'red';
            return;
        }

        setLoading(true);

        try {
            // 3. 백엔드 API로 요청 전송
            const response = await fetch(`/auth/reset-password-with-token?token=${token}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                messageElement.textContent = data.message + ' 잠시 후 로그인 페이지로 이동합니다.';
                messageElement.style.color = 'green';
                submitButton.disabled = true;
                setTimeout(() => {
                    window.location.href = '../LoginScene/LoginScene.html';
                }, 3000);
            } else {
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
