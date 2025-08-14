document.addEventListener('DOMContentLoaded', () => {
    const reinforceBtn = document.getElementById('reinforceBtn');
    const displayOwnedPlayerId = document.getElementById('displayOwnedPlayerId');
    const messageDisplay = document.getElementById('message');
    const remainingCashDisplay = document.getElementById('remainingCash');
    const reinforceDetailsDisplay = document.getElementById('reinforceDetails');

    /* params 로부터, 이전(보유선수)에서 받아온 보유선수아이디 가져오기 */ 
    const urlParams = new URLSearchParams(window.location.search);
    const ownedPlayerId = urlParams.get('ownedPlayerId');

    /* 보유선수아이디 유효성 체크 */
    if (!ownedPlayerId) {
        displayOwnedPlayerId.textContent = 'Error: Player ID not found.';
        messageDisplay.textContent = 'Please select a player to reinforce from the previous page.';
        reinforceBtn.disabled = true;
        return; // Stop execution
    }

    /* 페이지에 받아온 보유선수아이디 출력 */
    displayOwnedPlayerId.textContent = ownedPlayerId;

    reinforceBtn.addEventListener('click', async () => {
        /* 이전값 초기화 */ 
        messageDisplay.textContent = '';
        remainingCashDisplay.textContent = '';
        reinforceDetailsDisplay.innerHTML = '';
        messageDisplay.className = '';

        try {
            /* 강화 엔드 포인트로 부터 PATCH 메소드 받아오기 */
            const response = await fetch(`/api/reinforce/${ownedPlayerId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    // Add authentication headers if necessary
                }
            });

            const result = await response.json();

            // 정상 응답 여부 체크
            if (response.ok) {
                // api에서 상태메시지와 잔액 호출?
                messageDisplay.textContent = result.message;
                const cash = result.남은금액.cashAfterPayment;
                remainingCashDisplay.textContent = `Remaining Cash: ${cash}`;

                // 결과값 시각화
                if (result.강화결과) {
                    
                    messageDisplay.classList.add('success');
                    const details = result.강화결과;
                    reinforceDetailsDisplay.innerHTML = `
                        <p><strong>Level:</strong> ${details.level}</p>
                        <p><strong>Attack:</strong> ${details.attack}</p>
                        <p><strong>Defence:</strong> ${details.defence}</p>
                        <p><strong>Speed:</strong> ${details.speed}</p>
                    `;
                } else if (result.강등결과) {
                    
                    messageDisplay.classList.add('failure');
                    const details = result.강등결과;
                    reinforceDetailsDisplay.innerHTML = `
                        <p><strong>Level:</strong> ${details.level}</p>
                        <p><strong>Attack:</strong> ${details.attack}</p>
                        <p><strong>Defence:</strong> ${details.defence}</p>
                        <p><strong>Speed:</strong> ${details.speed}</p>
                    `;
                } else if (result.message.includes('파괴')) {
                    
                    messageDisplay.classList.add('destruction');
                } else {
                    
                    messageDisplay.classList.add('failure');
                }
            } else {
                // Handle server-side errors
                throw new Error(result.error || 'Something went wrong on the server.');
            }
        } catch (error) {
            console.error('Error:', error);
            messageDisplay.textContent = `Error: ${error.message}`;
            messageDisplay.classList.add('error');
        }
    });
});