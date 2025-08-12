export class Player {
  constructor(id, name, attack, defense, move, teamName) {
    this.id = id;
    this.name = name;
    this.attack = attack;
    this.defense = defense;
    this.moveStat = move;
    this.teamName = teamName;
    this.position = { x: 0, y: 0 };
  }

  move(x, y) {
    this.position = { x, y };
  }

  pass(targetPlayer, ball, log) {
    if (ball.owner !== this) {
      log.push(`${this.name}가 공을 가지고 있지 않습니다.`);
      return false;
    }
    const distance =
      Math.abs(this.position.x - targetPlayer.position.x) +
      Math.abs(this.position.y - targetPlayer.position.y);
    const successRate = Math.max(100 - distance * 10, 10);
    const roll = Math.random() * 100;

    if (roll <= successRate) {
      ball.owner = targetPlayer;
      log.push(`${this.name}가 ${targetPlayer.name}에게 패스 성공!`);
      return true;
    } else {
      ball.owner = null;
      log.push(`${this.name}의 패스 실패!`);
      return false;
    }
  }

  stealBall(opponent, ball, log) {
    if (ball.owner !== opponent) {
      log.push(`${opponent.name}가 공을 가지고 있지 않습니다.`);
      return false;
    }
    const successRate = (this.defense / (this.defense + opponent.attack)) * 100;
    const roll = Math.random() * 100;

    if (roll <= successRate) {
      ball.owner = this;
      log.push(`${this.name}가 ${opponent.name}의 공을 가로챘습니다!`);
      return true;
    } else {
      log.push(`${this.name}의 공 탈취 실패!`);
      return false;
    }
  }

  shoot(goal, ball) {
    if (ball.owner !== this) {
      log(`${this.name}가 공을 가지고 있지 않습니다.`);
      return false;
    }
    const distance =
      Math.abs(this.position.x - goal.position.x) + Math.abs(this.position.y - goal.position.y);

    const successRate = Math.max(10, 80 - distance * 10 + this.attack * 2);
    const roll = Math.random() * 100;

    if (roll <= successRate) {
      return true;
    } else {
      return false;
    }
  }
  toPlainObject() {
    return {
      id: this.id,
      name: this.name,
      speed: this.speed,
      attack: this.attack,
      defence: this.defence,
      teamName: this.teamName,
      position: this.position,
      hasBall: this.hasBall,
    };
  }
}
