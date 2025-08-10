export class Team {
  constructor(name, players, socketId) {
    this.name = name;
    this.players = players;
    this.score = 0;
    this.socketId = socketId; // Add socketId property
  }
}
