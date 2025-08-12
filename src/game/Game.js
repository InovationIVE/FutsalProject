export class Game {
  constructor(teamA, teamB, ball, gameMap, goalA, goalB) {
    this.teamA = teamA;
    this.teamB = teamB;
    this.teams = [teamA, teamB];
    this.ball = ball;
    this.gameMap = gameMap;
    this.goalA = goalA;
    this.goalB = goalB;
    this.currentTurnIndex = 0;
    this.turnCount = 0;
    this.maxTurns = 20;
    this.isGameOver = false;
    this.initialPlayerPositions = {}; // Use a plain object to store initial positions
    this.selectedTeam = this.currentTeam;
    this.log = [];
  }

  get currentTeam() {
    return this.teams[this.currentTurnIndex];
  }

  get opponentTeam() {
    return this.teams[(this.currentTurnIndex + 1) % 2];
  }

  nextTurn() {
    this.turnCount++;
    if (this.turnCount >= this.maxTurns) {
      this.endGame();
      return;
    }
    this.currentTurnIndex = (this.currentTurnIndex + 1) % 2;
    this.selectedTeam = this.currentTeam;
  }

  start() {
    const startingTeam = Math.random() < 0.5 ? this.teams[0] : this.teams[1];
    const randomPlayer =
      startingTeam.players[Math.floor(Math.random() * startingTeam.players.length)];
    this.ball.owner = randomPlayer;
    this.currentTurnIndex = this.teams.indexOf(startingTeam);
    this.selectedTeam = this.currentTeam;
  }

  endGame() {
    this.log.length = 0;
    this.isGameOver = true;

    totalPassTackleScore(this.teamA);
    totalPassTackleScore(this.teamB);

    this.log.push('게임 종료!');
    this.log.push(
      `최종 점수: ${this.teams[0].name} ${this.teams[0].score} : ${this.teams[1].score} ${this.teams[1].name}`,
    );
    this.log.push(`${this.teamA.name}: 골점수:${this.teamA.score}, 패스점수:${this.teamA.totalPass}, 방어점수: ${this.teamA.totalTackle}`);
    this.log.push(`${this.teamB.name}: 골점수:${this.teamB.score}, 패스점수:${this.teamB.totalPass}, 방어점수: ${this.teamB.totalTackle}`);
  }

  resetPositions() {
    for (const player of [...this.teams[0].players, ...this.teams[1].players]) {
      if (this.initialPlayerPositions[player.id]) {
        player.position = { ...this.initialPlayerPositions[player.id] };
      }
    }
    this.ball.position = { x: 3, y: 2 }; // Reset ball to center
    this.log.push('선수 위치가 초기화되었습니다.');
  }

  handleAction(action, selectedPlayer, params) {
    if (this.isGameOver) return;

    switch (action) {
      case 'shoot':
        this.log.length = 0;
        const isTeamA = this.currentTeam === this.teams[0];
        const playerX = selectedPlayer.position.x;

        // Check if the player is in the opponent's half
        if ((isTeamA && playerX <= 3) || (!isTeamA && playerX >= 3)) {
          this.log.push('상대 진영에서만 슛을 할 수 있습니다.');
          return; // Do not proceed with the shot, and don't end the turn.
        }

        const opponentGoal = isTeamA ? this.goalB : this.goalA;
        if (selectedPlayer.shoot(opponentGoal, this.ball)) {
          this.currentTeam.score++;
          this.log.push(`${this.currentTeam.name}이(가) 득점했습니다!`);
          this.resetPositions(); // Reset positions after a goal
          // Give ball to the other team
          const randomOpponent =
            this.opponentTeam.players[Math.floor(Math.random() * this.opponentTeam.players.length)];
          this.ball.owner = randomOpponent;
          this.log.push(`${randomOpponent.name}가 공을 가지고 경기를 재개합니다.`);
        } else {
          // On miss, ball goes to a random position
          this.ball.owner = null;
          this.ball.position.x = Math.floor(Math.random() * this.gameMap.width);
          this.ball.position.y = Math.floor(Math.random() * this.gameMap.height);
          this.log.push(`공이 (${this.ball.position.x}, ${this.ball.position.y})에 떨어졌습니다.`);
        }
        this.nextTurn();
        break;

      case 'move':
        this.log.length = 0;

        if (!this.selectedTeam.players.find((p) => p.id === selectedPlayer.id)) {
          this.log.push('상대방 기물입니다.');
          return;
        }

        const { x, y } = params;
        const distance =
          Math.abs(selectedPlayer.position.x - x) + Math.abs(selectedPlayer.position.y - y);
        if (distance <= selectedPlayer.moveStat) {
          selectedPlayer.move(x, y);
        } else {
          this.log.push('이동할 수 없는 거리입니다.');
          return; // 턴을 넘기지 않음
        }
        this.nextTurn();
        break;

      case 'pass':
        this.log.length = 0;
        const receiver = this.currentTeam.players.find((p) => p.id === params.receiverId);
        if (receiver && selectedPlayer.id !== receiver.id) {
          selectedPlayer.pass(receiver, this.ball, this.log);
        } else {
          this.log.push('잘못된 선택입니다.');
          return; // 턴을 넘기지 않음
        }
        this.nextTurn();
        break;

      case 'tackle':
        this.log.length = 0;
        const opponentWithBall = this.opponentTeam.players.find((p) => this.ball.owner === p);
        if (opponentWithBall) {
          const tackleDistance =
            Math.abs(selectedPlayer.position.x - opponentWithBall.position.x) +
            Math.abs(selectedPlayer.position.y - opponentWithBall.position.y);
          if (tackleDistance <= 1) {
            selectedPlayer.stealBall(opponentWithBall, this.ball, this.log);
          } else {
            this.log.push('태클하기에는 너무 멉니다.');
            return; // 턴을 넘기지 않음
          }
        } else {
          this.log.push('상대방이 공을 가지고 있지 않습니다.');
          return; // 턴을 넘기지 않음
        }
        this.nextTurn();
        break;

      case 'getBall':
        if (!this.ball.owner) {
          const dist =
            Math.abs(selectedPlayer.position.x - this.ball.position.x) +
            Math.abs(selectedPlayer.position.y - this.ball.position.y);
          if (dist <= 1) {
            this.ball.owner = selectedPlayer;
            this.log.push(`${selectedPlayer.name}가 공을 잡았습니다.`);
            this.nextTurn();
          } else {
            this.log.push('공을 잡기에는 너무 멉니다.');
            return; // 턴을 넘기지 않음
          }
        } else {
          this.log.push('이미 다른 선수가 공을 소유하고 있습니다.');
          return; // 턴을 넘기지 않음
        }
        break;
    }
  }

  getStateForClient() {
    return {
      teams: [this.teamA.toPlainObject(), this.teamB.toPlainObject()],
      ball: this.ball.toPlainObject(),
      gameMap: this.gameMap,
      goalA: this.goalA,
      goalB: this.goalB,
      turnCount: this.turnCount,
      maxTurns: this.maxTurns,
      selectedTeam: this.selectedTeam.toPlainObject(),
      isGameOver: this.isGameOver,
      initialPlayerPositions: this.initialPlayerPositions,
      log: this.log
    };
  }
}

function totalPassTackleScore(team){
  for(let i = 0;  i < team.players.length; i++){
    team.totalPass += team.players[i].passNum;
    team.totalTackle += team.players[i].tackleNum;
    team.totalShoot += team.players[i].shootNum;
  }
}
