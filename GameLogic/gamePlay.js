import readlineSync from 'readline-sync';

// 맵 클래스
class Map {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.grid = Array.from({ length: height }, () => Array(width).fill(null));
  }

  setTile(x, y, value) {
    if (y >= 0 && y < this.height && x >= 0 && x < this.width) {
      this.grid[y][x] = value;
    }
  }

  getTile(x, y) {
    if (y >= 0 && y < this.height && x >= 0 && x < this.width) {
      return this.grid[y][x];
    }
    return null;
  }
}

// 골대 클래스
class GoalPost {
  constructor(position) {
    this.position = position; // {x, y}
    this.size = { width: 1, height: 2 };
  }
}

// 공 클래스
class Ball {
  constructor() {
    this.position = { x: 0, y: 0 };
    this.owner = null; // Player 객체
  }
}

// 선수 클래스
class Player {
  constructor(id, name, attack, defense, move) {
    this.id = id;
    this.name = name;
    this.attack = attack;
    this.defense = defense;
    this.moveStat = move;
    this.position = { x: 0, y: 0 };
  }

  move(x, y) {
    this.position = { x, y };
    console.log(`${this.name}가 (${x},${y})로 이동`);
  }

  pass(targetPlayer, ball) {
    if (ball.owner !== this) {
      console.log(`${this.name}가 공을 가지고 있지 않습니다.`);
      return false;
    }
    const distance =
      Math.abs(this.position.x - targetPlayer.position.x) +
      Math.abs(this.position.y - targetPlayer.position.y);
    const successRate = Math.max(100 - distance * 10, 10);
    const roll = Math.random() * 100;

    if (roll <= successRate) {
      ball.owner = targetPlayer;
      console.log(`${this.name}가 ${targetPlayer.name}에게 패스 성공!`);
      return true;
    } else {
      ball.owner = null;
      console.log(`${this.name}의 패스 실패!`);
      return false;
    }
  }

  stealBall(opponent, ball) {
    if (ball.owner !== opponent) {
      console.log(`${opponent.name}가 공을 가지고 있지 않습니다.`);
      return false;
    }
    const successRate = (this.defense / (this.defense + opponent.attack)) * 100;
    const roll = Math.random() * 100;

    if (roll <= successRate) {
      ball.owner = this;
      console.log(`${this.name}가 ${opponent.name}의 공을 가로챘습니다!`);
      return true;
    } else {
      console.log(`${this.name}의 공 탈취 실패!`);
      return false;
    }
  }

  shoot(goal, ball) {
    if (ball.owner !== this) {
      console.log(`${this.name}가 공을 가지고 있지 않습니다.`);
      return false;
    }
    const distance =
      Math.abs(this.position.x - goal.position.x) + Math.abs(this.position.y - goal.position.y);

    // 거리가 멀수록 성공률 감소, 공격력이 높을수록 성공률 증가
    const successRate = Math.max(10, 80 - distance * 10 + this.attack * 2);
    const roll = Math.random() * 100;

    if (roll <= successRate) {
      console.log(`${this.name}의 슛 성공!`);
      return true;
    } else {
      console.log(`${this.name}의 슛 실패!`);
      return false;
    }
  }
}

// 팀 클래스
class Team {
  constructor(name, players) {
    this.name = name;
    this.players = players;
    this.score = 0;
  }
}

// 게임 매니저 (턴 관리)
class Game {
  constructor(teamA, teamB, ball) {
    this.teams = [teamA, teamB];
    this.ball = ball;
    this.currentTurnIndex = 1; // 0 = 팀A, 1 = 팀B
  }

  get currentTeam() {
    return this.teams[this.currentTurnIndex];
  }

  get opponentTeam() {
    return this.teams[(this.currentTurnIndex + 1) % 2];
  }

  nextTurn() {
    this.currentTurnIndex = (this.currentTurnIndex + 1) % 2;
    console.log(`\n=== ${this.currentTeam.name}의 턴 시작 ===`);
  }

  attemptPass(passer, receiver) {
    if (this.currentTeam.players.includes(passer)) {
      if (!passer.pass(receiver, this.ball)) {
        // 패스 실패 → 근처 상대 선수가 있으면 공 탈취 시도
        const nearestOpponent = this.opponentTeam.players.find((p) => {
          const dist =
            Math.abs(p.position.x - passer.position.x) + Math.abs(p.position.y - passer.position.y);
          return dist <= 1;
        });
        if (nearestOpponent) {
          nearestOpponent.stealBall(passer, this.ball);
        }
      }
      this.nextTurn();
    } else {
      console.log(`${passer.name}는 현재 턴이 아닙니다.`);
    }
  }
}

// ======== 게임 설정 ======== //
const gameMap = new Map(7, 5);
const goalA = new GoalPost({ x: 0, y: 2 });
const goalB = new GoalPost({ x: 6, y: 2 });
gameMap.setTile(goalA.position.x, goalA.position.y, 'GA');
gameMap.setTile(goalB.position.x, goalB.position.y, 'GB');

const ball = new Ball();

ball.position = { x: 3, y: 2 };

gameMap.setTile(ball.position.y, ball.position.x, 'Ball');

const playerA1 = new Player(1, 'A1', 8, 5, 3);
playerA1.position = { x: 2, y: 2 };
const playerA2 = new Player(2, 'A2', 8, 5, 3);
playerA2.position = { x: 1, y: 1 };
const playerA3 = new Player(3, 'A3', 8, 5, 3);
playerA3.position = { x: 1, y: 3 };
const playerB1 = new Player(4, 'B1', 7, 6, 3);
playerB1.position = { x: 4, y: 2 };
const playerB2 = new Player(5, 'B2', 7, 6, 3);
playerB2.position = { x: 5, y: 1 };
const playerB3 = new Player(6, 'B3', 7, 6, 3);
playerB3.position = { x: 5, y: 3 };

const teamA = new Team('Team A', [playerA1, playerA2, playerA3]);
const teamB = new Team('Team B', [playerB1, playerB2, playerB3]);

startGame(gameMap, goalA, goalB, ball, teamA, teamB);

function startGame(gameMap, goalA, goalB, ball, teamA, teamB) {
  const game = new Game(teamA, teamB, ball);
  const maxTurn = 20;
  let currentTurn = 0;

  // 시작 시 랜덤한 팀의 선수에게 공을 줍니다.
  const startingTeam = Math.random() < 0.5 ? teamA : teamB;
  const randomPlayer =
    startingTeam.players[Math.floor(Math.random() * startingTeam.players.length)];
  ball.owner = randomPlayer;
  console.log(`${ball.owner.name}가 공을 가지고 시작합니다.`);

  while (currentTurn < maxTurn) {
    console.clear();
    mapView(gameMap, game, goalA, goalB);
    currentTurn++;
    console.log(`현재 턴/최대 턴수: ${currentTurn}/${maxTurn}`);
    console.log(`점수: ${teamA.name} ${teamA.score} : ${teamB.score} ${teamB.name}`);
    if (ball.owner) {
      console.log(`공 소유자: ${ball.owner.name}`);
    } else {
      console.log('공 소유자: 없음');
    }
    game.nextTurn();
    console.log('플레이할 선수 선택');
    console.log(`1.${game.currentTeam.players[0].name}`);
    console.log(`2.${game.currentTeam.players[1].name}`);
    console.log(`3.${game.currentTeam.players[2].name}`);
    const choice = readlineSync.question('>> ');

    playCharater(game.currentTeam.players[choice - 1], game, gameMap, goalA, goalB);
    readlineSync.question('계속하려면 Enter를 누르세요...');
  }

  console.log('게임이 종료되었습니다.');
  console.log(`최종 점수: ${teamA.name} ${teamA.score} : ${teamB.score} ${teamB.name}`);
}

function playCharater(player, game, gameMap, goalA, goalB) {
  console.clear();
  mapView(gameMap, game, goalA, goalB);
  console.log(`선택한 플레이어 이름: ${player.name}`);
  console.log(`행동을 선택하세요.`);
  console.log(`1.슛`);
  console.log(`2.이동`);
  console.log(`3.패스`);
  console.log(`4.태클`);
  const choice = readlineSync.question('>> ');

  switch (choice) {
    case '1': // 슛
      const opponentGoal = game.currentTeam === game.teams[0] ? goalB : goalA;
      if (player.shoot(opponentGoal, game.ball)) {
        // 골인!
        game.currentTeam.score++;
        console.log(`${game.currentTeam.name}이(가) 득점했습니다!`);
        game.ball.owner = null;
        game.ball.position = { x: 3, y: 2 }; // 공 중앙으로
        // 상대팀 선수 중 한명이 공을 가짐
        const randomOpponent =
          game.opponentTeam.players[Math.floor(Math.random() * game.opponentTeam.players.length)];
        game.ball.owner = randomOpponent;
        console.log(`${randomOpponent.name}가 공을 가지고 경기를 재개합니다.`);
      } else {
        // 슛 실패
        game.ball.owner = null;
        // 골대 주변 랜덤 위치에 공 떨어짐
        const randomX =
          opponentGoal.position.x +
          (Math.random() < 0.5 ? -1 : 1) * Math.floor(Math.random() * 2 + 1);
        const randomY =
          opponentGoal.position.y +
          (Math.random() < 0.5 ? -1 : 1) * Math.floor(Math.random() * 2 + 1);
        game.ball.position.x = Math.max(0, Math.min(gameMap.width - 1, randomX));
        game.ball.position.y = Math.max(0, Math.min(gameMap.height - 1, randomY));
        console.log(`공이 (${game.ball.position.x}, ${game.ball.position.y})에 떨어졌습니다.`);

        // 가장 가까운 선수가 공을 잡음
        const allPlayers = [...game.teams[0].players, ...game.teams[1].players];
        let nearestPlayer = null;
        let minDistance = Infinity;

        for (const p of allPlayers) {
          const dist =
            Math.abs(p.position.x - game.ball.position.x) +
            Math.abs(p.position.y - game.ball.position.y);
          if (dist < minDistance) {
            minDistance = dist;
            nearestPlayer = p;
          }
        }
        game.ball.owner = nearestPlayer;
        console.log(`${nearestPlayer.name}가 공을 잡았습니다.`);
      }
      break;
    case '2': // 이동
      const x = parseInt(readlineSync.question('move x : '), 10);
      const y = parseInt(readlineSync.question('move y : '), 10);
      const distance = Math.abs(player.position.x - x) + Math.abs(player.position.y - y);

      if (distance <= player.moveStat) {
        player.move(x, y);
        gameMap.setTile(player.position.x, player.position.y, null); // 이전 위치 지우기
        gameMap.setTile(x, y, player.name);
      } else {
        console.log('이동할 수 없는 거리입니다.');
      }
      break;
    case '3': // 패스
      if (game.ball.owner !== player) {
        console.log('공을 가지고 있지 않습니다.');
        break;
      }
      console.log('누구에게 패스하시겠습니까?');
      const teammates = game.currentTeam.players.filter((p) => p !== player);
      teammates.forEach((p, index) => {
        console.log(`${index + 1}. ${p.name}`);
      });
      const passChoice = parseInt(readlineSync.question('>> '), 10);
      const receiver = teammates[passChoice - 1];
      if (receiver) {
        player.pass(receiver, game.ball);
      } else {
        console.log('잘못된 선택입니다.');
      }
      break;
    case '4': // 태클
      const opponentWithBall = game.opponentTeam.players.find((p) => game.ball.owner === p);
      if (opponentWithBall) {
        const tackleDistance =
          Math.abs(player.position.x - opponentWithBall.position.x) +
          Math.abs(player.position.y - opponentWithBall.position.y);
        if (tackleDistance <= 1) {
          player.stealBall(opponentWithBall, game.ball);
        } else {
          console.log('태클하기에는 너무 멉니다.');
        }
      } else {
        console.log('상대방이 공을 가지고 있지 않습니다.');
      }
      break;
    default:
      console.log('잘못된 입력입니다.');
      break;
  }
}

function mapView(gameMap, game, goalA, goalB) {
  const displayGrid = Array.from({ length: gameMap.height }, () => Array(gameMap.width).fill(' '));

  // Place goals
  displayGrid[goalA.position.y][goalA.position.x] = 'GA';
  displayGrid[goalB.position.y][goalB.position.x] = 'GB';

  // Place players
  const allPlayers = [...game.teams[0].players, ...game.teams[1].players];
  for (const player of allPlayers) {
    if (
      player.position.y < 0 ||
      player.position.y >= gameMap.height ||
      player.position.x < 0 ||
      player.position.x >= gameMap.width
    )
      continue;
    let display = player.name;
    if (game.ball.owner === player) {
      display = `${player.name}*`; // Indicate ball owner
    }
    displayGrid[player.position.y][player.position.x] = display;
  }

  // Place ball if it has no owner
  if (!game.ball.owner) {
    displayGrid[game.ball.position.y][game.ball.position.x] = 'o';
  }

  // Print the map
  console.log('+' + '----'.repeat(gameMap.width) + '+');
  for (let y = 0; y < gameMap.height; y++) {
    let row = '|';
    for (let x = 0; x < gameMap.width; x++) {
      row += ` ${displayGrid[y][x].padEnd(3)}|`;
    }
    console.log(row);
    if (y < gameMap.height - 1) {
      console.log('+' + '----'.repeat(gameMap.width) + '+');
    }
  }
  console.log('+' + '----'.repeat(gameMap.width) + '+');
}
