export class Team {
  constructor(name, players, socketId, accountId) {
    this.name = name;
    this.players = players;
    this.score = 0;
    this.totalPass = 0;
    this.totalTackle = 0;
    this.totalShoot = 0;
    this.socketId = socketId; // Add socketId property
    this.accountId = accountId;
  }

  toPlainObject(){
    return{
      name: this.name,
      players: this.players.map(p => p.toPlainObject()),
      score: this.score,
      socketId: this.socketId,
      accountId: this.accountId
    }
  }
}
