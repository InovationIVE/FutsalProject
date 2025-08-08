export class GoalPost {
  constructor(position, size = { width: 1, height: 2 }) {
    this.position = position; // {x, y}
    this.size = size;
  }

  // 좌표가 골대 범위 안에 있는지 확인
  isInside(x, y) {
    return (
      x >= this.position.x &&
      x < this.position.x + this.size.width &&
      y >= this.position.y &&
      y < this.position.y + this.size.height
    );
  }
}