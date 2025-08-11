export class Ball {
  constructor() {
    this.position = { x: 0, y: 0 };
    this.owner = null; // Player object
  }

  toPlainObject() {
    return {
      position: this.position,
      // owner 객체 전체 대신, owner의 ID만 보냅니다.
      ownerId: this.owner ? this.owner.id : null,
    };
  }
}
