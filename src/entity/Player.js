import { gamePrisma } from '../utils/prisma/index.js';

export class PlayerModel {
  constructor(data) {
    this.playerId = data.playerId;
    this.soccerPlayerId = data.soccerPlayerId;
    this.name = data.name;
    this.speed = data.speed;
    this.attack = data.attack;
    this.defence = data.defence;
    this.profileImage = data.profileImage;
    this.rarity = data.rarity;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  static async getAll() {
    const players = await gamePrisma.player.findMany({
      select: {
        soccerPlayerId: true,
        name: true,
        profileImage: true,
        rarity: true
      }
    });
    return players.map(p => new PlayerModel(p));
  }

  static async getSome(playerId) {
    const data = await gamePrisma.player.findUnique({
      where: { playerId: Number(playerId) },
      select: {
        soccerPlayerId: true,
        name: true,
        speed: true,
        attack: true,
        defence: true,
        profileImage: true,
        rarity: true,
        price: true,
        createdAt: true,
        updatedAt: true
      }
    });
    return data ? new PlayerModel(data) : null;
  }

  static async existsByPlayerId(playerId) {
    return await gamePrisma.player.findUnique({
      where: { playerId: Number(playerId) }
    });
  }

  static async existsBySoccerId(soccerPlayerId) {
    return await gamePrisma.player.findUnique({
      where: { soccerPlayerId }
    });
  }

  /** 레어도 유효성 검증 **/
  static async isCorrectRarity(rarity) {
    const rarity_list = new Set(["N", "R", "SR", "SSR", "UR"]);
    if( !rarity_list.has(rarity) ){
    return false;
    }
    return true;
  }

  static async create(data) {
    const created = await gamePrisma.player.create({ data });
    return new PlayerModel(created);
  }

  static async update(playerId, data) {
    const updated = await gamePrisma.player.update({
      where: { playerId: Number(playerId) },
      data
    });
    return new PlayerModel(updated);
  }

  static async delete(playerId) {
    return await gamePrisma.player.delete({
      where: { playerId: Number(playerId) }
    });
  }
}
