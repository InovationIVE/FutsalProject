import { Ball } from "./ball.js";

export class Game {
  constructor(roomId, teamA, teamB) {
    this.roomId = roomId;
    this.teamA = teamA;
    this.teamB = teamB;
    this.currentTeam = teamA;
    this.turnCount = 1;
    this.maxTurns = 10;
    this.ball = new Ball();
    this.ball.owner = teamA.players[0];
  }

  nextTurn() {
    this.currentTeam = this.currentTeam === this.teamA ? this.teamB : this.teamA;
    this.turnCount++;
  }

  handleAction(action, payload) {
    const player = this.ball.owner;
    const opponentTeam = this.currentTeam === this.teamA ? this.teamB : this.teamA;
    switch (action) {
      case "MOVE":
        return player.moveTo(payload.x, payload.y);
      case "PASS":
        const target = this.currentTeam.players.find(p => p.id === payload.toId);
        return player.passTo(target, this.ball);
      case "SHOOT":
        const defender = opponentTeam.players[Math.floor(Math.random() * opponentTeam.players.length)];
        const goalPos = this.currentTeam === this.teamA ? { x: 6, y: 3 } : { x: 0, y: 3 };
        const goal = player.shoot(goalPos, defender);
        if (goal) this.currentTeam.score++;
        return goal;
      default:
        return false;
    }
  }

  isGameOver() {
    return this.turnCount > this.maxTurns;
  }

  getState() {
    return {
      roomId: this.roomId,
      turn: this.turnCount,
      currentTeam: this.currentTeam.name,
      score: {
        [this.teamA.name]: this.teamA.score,
        [this.teamB.name]: this.teamB.score
      },
      ballOwner: this.ball.owner?.name || null
    };
  }
}
