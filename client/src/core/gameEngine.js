let players = [];
let ball = { x: 400, y: 300, vx: 0, vy: 0 };
let selectedPlayer = null;
const FIELD_WIDTH = 1024;
const FIELD_HEIGHT = 768;

export function initGame() {
  players = [
    { id: 1, x: 100, y: 100, team: 'red', speed: 4, attack: 5, defense: 3 , targetX: 100, targetY: 100 },
    { id: 2, x: 100, y: 300, team: 'red', speed: 5, attack: 4, defense: 2 , targetX: 100, targetY: 300 },
    { id: 3, x: 100, y: 500, team: 'red', speed: 3, attack: 6, defense: 4 , targetX: 100, targetY: 500 },
    { id: 4, x: 700, y: 100, team: 'blue', speed: 4, attack: 5, defense: 3 , targetX: 700, targetY: 100 },
    { id: 5, x: 700, y: 300, team: 'blue', speed: 5, attack: 4, defense: 2 , targetX: 700, targetY: 300 },
    { id: 6, x: 700, y: 500, team: 'blue', speed: 3, attack: 6, defense: 4 , targetX: 700, targetY: 500 },
  ];
  ball = { x: 400, y: 300, vx: 0, vy: 0 };
}

export function updateGame() {
  // 공 움직임 업데이트
  ball.x += ball.vx;
  ball.y += ball.vy;

  // 벽 반사
  if (ball.x < 0 || ball.x > FIELD_WIDTH) ball.vx *= -1;
  if (ball.y < 0 || ball.y > FIELD_HEIGHT) ball.vy *= -1;

  // 공 감속 (마찰)
  ball.vx *= 0.95;
  ball.vy *= 0.95;

  // 슛 충돌 체크
  handlePlayerBallCollision();
}

function handlePlayerBallCollision() {
  players.forEach((p) => {
  const dx = p.targetX - p.x;
  const dy = p.targetY - p.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist > 1) {
    const speed = p.speed; // 한 프레임당 이동 속도
    p.x += (dx / dist) * speed;
    p.y += (dy / dist) * speed;
  }
});
}

const fieldImg = new Image();
fieldImg.src = '/public/assets/football-pitch.png'; // 경기를 위한 필드 이미지
fieldImg.onload = () => {
  ctx.drawImage(fieldImg, 0, 0, FIELD_WIDTH, FIELD_HEIGHT);
};

export function renderGame(ctx) {
  // 이미지가 로드된 경우에만 그리기
  if (fieldImg.complete) {
    ctx.drawImage(fieldImg, 0, 0, FIELD_WIDTH, FIELD_HEIGHT);
  }

  // 공
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, 10, 0, Math.PI * 2);
  ctx.fillStyle = 'black';
  ctx.fill();

  // 선수
  players.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 15, 0, Math.PI * 2);
    ctx.fillStyle = p.team === 'red' ? 'red' : 'blue';
    ctx.fill();
  });
}

export function handleClick(event, canvas) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  if (selectedPlayer) {
    // 공 소유 중이면 슈팅
    shootBall(selectedPlayer, { x, y });
  } else {
    // 선수 선택
    const clicked = players.find((p) => Math.hypot(p.x - x, p.y - y) < 15);
    if (clicked) {
      selectedPlayer = clicked;
    } else if (selectedPlayer) {
      // 목적지 설정 (선수 이동)
      selectedPlayer.targetX = x;
      selectedPlayer.targetY = y;
    }
  }
}


function shootBall(player, target) {
  const dx = target.x - player.x;
  const dy = target.y - player.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const power = Math.min(player.attack * 1.5, 10);

  ball.vx = (dx / dist) * power;
  ball.vy = (dy / dist) * power;

  selectedPlayer = null;
}

export function getGameState() {
  return { players, ball, selectedPlayer };
}
