export class Player {
  constructor(id, name, attack, defense, move) {
    this.id = id;
    this.name = name;
    this.attack = attack;
    this.defense = defense;
    this.moveStat = move;
    this.stamina = 100;
    this.position = { x: 0, y: 0 };
  }

  moveTo(x, y, gameMap) {
    if (!gameMap.isInside(x, y)) {
      console.log(`${this.name}가 맵 밖으로 이동하려고 했습니다!`);
      return false;
    }
    const distance = Math.abs(this.position.x - x) + Math.abs(this.position.y - y);
    if (distance > this.moveStat) {
      console.log(`${this.name}는 이동 범위를 초과했습니다!`);
      return false;
    }
    if (this.stamina < distance * 5) {
      console.log(`${this.name}의 스태미너가 부족합니다!`);
      return false;
    }
    this.position = { x, y };
    this.stamina -= distance * 5;
    console.log(`${this.name}가 (${x}, ${y})로 이동했습니다.`);
    return true;
  }

  passTo(targetPlayer, ball) {
    const distance =
      Math.abs(this.position.x - targetPlayer.position.x) +
      Math.abs(this.position.y - targetPlayer.position.y);
    const successRate = Math.max(100 - distance * 10, 20);
    const roll = Math.random() * 100;
    if (roll <= successRate) {
      ball.owner = targetPlayer;
      console.log(`${this.name}가 ${targetPlayer.name}에게 패스 성공!`);
      return true;
    } else {
      ball.owner = null;
      console.log(`${this.name}의 패스가 실패했습니다!`);
      return false;
    }
  }

  shoot(goal, opponent) {
    if (!goal.isInside(this.position.x + 1, this.position.y)) {
      console.log(`${this.name}는 골대 범위 밖에서 슛할 수 없습니다!`);
      return false;
    }
    const successRate = (this.attack / (this.attack + opponent.defense)) * 100;
    const roll = Math.random() * 100;
    if (roll <= successRate) {
      console.log(`${this.name}의 슛이 골인!`);
      return true;
    } else {
      console.log(`${this.name}의 슛이 막혔습니다.`);
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
}