import GameManager from '../../Manager/GameManager.js';

document.addEventListener('DOMContentLoaded', () => {
  const gamePlayBtn = document.querySelector('.gamePlayBtn');

  GameManager.setupNavigation();

  gamePlayBtn.addEventListener('click', async () => {
    window.location.href = '../GameReadyScene/GameReadyScene.html';
    await createRank();
  });

  async function createRank() {
    try {
      const response = await fetch('/api/rank', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // 인증 쿠키를 보내기 위해 필요
      });
    } catch (error) {
      console.error('Error drawing cards:', error);
      cardDisplayArea.innerHTML = '<p>서버와 통신 중 오류가 발생했습니다.</p>';
    }
  };
});

  // 페이지 로드 시 초기화 함수 호출
  document.addEventListener('DOMContentLoaded', initialize);  
