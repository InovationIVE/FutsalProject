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

  /** 전체 조회 **/
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

  /** 상세 조회 **/
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
        createdAt: true,
        updatedAt: true
      }
    });
    return data ? new PlayerModel(data) : null;
  }

  /** playerId로 탐색 **/
  static async existsByPlayerId(playerId) {
    return await gamePrisma.player.findUnique({
      where: { playerId: Number(playerId) }
    });
  }

  /** soccerId로 탐색 **/
  static async existsBySoccerId(soccerPlayerId) {
    return await gamePrisma.player.findUnique({
      where: { soccerPlayerId }
    });
  }

  /** 생성 **/
  static async create(data) {
    const created = await gamePrisma.player.create({ data });
    return new PlayerModel(created);
  }

  /** 수정 **/
  static async update(playerId, data) {
    const updated = await gamePrisma.player.update({
      where: { playerId: Number(playerId) },
      data
    });
    return new PlayerModel(updated);
  }

  /** 삭제 **/
  static async delete(playerId) {
    return await gamePrisma.player.delete({
      where: { playerId: Number(playerId) }
    });
  }
}
