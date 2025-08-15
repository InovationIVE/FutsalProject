document.addEventListener('DOMContentLoaded', () => {
  const reinforceBtn = document.getElementById('reinforceBtn');
  const displayOwnedPlayerId = document.getElementById('displayOwnedPlayerId');
  const messageDisplay = document.getElementById('message');
  const remainingCashDisplay = document.getElementById('remainingCash');
  const reinforceDetailsDisplay = document.getElementById('reinforceDetails');
  
  // reinforceBox 요소 추가
  const reinforceBox = document.querySelector('.reinforceBox');

  const urlParams = new URLSearchParams(window.location.search);
  const ownedPlayerId = urlParams.get('ownedPlayerId');

  if (!ownedPlayerId) {
    displayOwnedPlayerId.textContent = 'Error: Player ID not found.';
    messageDisplay.textContent = 'Please select a player to reinforce from the previous page.';
    reinforceBtn.disabled = true;
    return;
  }

  displayOwnedPlayerId.textContent = ownedPlayerId;

  reinforceBtn.addEventListener('click', async () => {
    messageDisplay.textContent = '';
    remainingCashDisplay.textContent = '';
    reinforceDetailsDisplay.innerHTML = '';
    messageDisplay.className = '';
    
    // 기존에 적용된 효과 클래스 제거
    reinforceBox.classList.remove('success-effect', 'failure-effect', 'destruction-effect');
    
    try {
      const response = await fetch(`/api/reinforce/${ownedPlayerId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' }
      });

      const result = await response.json();

      if (response.ok) {
        messageDisplay.textContent = result.message;
        const cash = result.남은금액.cashAfterPayment;
        remainingCashDisplay.textContent = `남은 금액: ${cash}`;

        if (result.강화결과) {
          alert('강화 성공!');
          messageDisplay.classList.add('success');
          reinforceBox.classList.add('success-effect'); // 성공 효과 클래스 추가
          const details = result.강화결과;
          reinforceDetailsDisplay.innerHTML = ` 
            <p><strong>Level:</strong> ${details.level}</p> 
            <p><strong>Attack:</strong> ${details.attack}</p> 
            <p><strong>Defence:</strong> ${details.defence}</p> 
            <p><strong>Speed:</strong> ${details.speed}</p> 
          `; 
        } else if (result.강등결과) {
          alert('강등..');
          messageDisplay.classList.add('failure');
          reinforceBox.classList.add('failure-effect'); // 실패 효과 클래스 추가
          const details = result.강등결과;
          reinforceDetailsDisplay.innerHTML = ` 
            <p><strong>Level:</strong> ${details.level}</p> 
            <p><strong>Attack:</strong> ${details.attack}</p> 
            <p><strong>Defence:</strong> ${details.defence}</p> 
            <p><strong>Speed:</strong> ${details.speed}</p> 
          `; 
        } else if (result.message.includes('파괴')) {
          alert('파괴...');
          messageDisplay.classList.add('destruction');
          reinforceBox.classList.add('destruction-effect'); // 파괴 효과 클래스 추가
        } else {
          alert('강화 실패.');
          messageDisplay.classList.add('failure');
          reinforceBox.classList.add('failure-effect'); // 실패 효과 클래스 추가
        }
      } else {
        throw new Error(result.error || 'Something went wrong on the server.');
      }
    } catch (error) {
      console.error('Error:', error);
      messageDisplay.textContent = `Error: ${error.message}`;
      messageDisplay.classList.add('error');
    }
  });
});