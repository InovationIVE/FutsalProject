import { gamePrisma } from '../utils/prisma/index.js';

import { PlayerModel } from '../entity/Player.js';

export class PlayerController{
  /** 모든 선수 조회 **/
  static async getAllPlayers(req, res, next) {
    try {
      const players = await PlayerModel.getAll();
      res.status(200).json({ data: players });
    } catch (error) {
      console.error('Error fetching Player data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  /** 특정 선수 조회 **/
  static async getThePlayer(req, res, next) {
    try {
      const { playerId } = req.params;
      const player = await PlayerModel.getSome(playerId);
      if (!player) {
        return res.status(404).json({ error: '선수를 찾을 수 없습니다.' });
      }
      res.status(200).json({ data: player });
    } catch (error) {
      console.error('Error fetching Player data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  /** 선수 등록 **/
  static async createPlayer (req, res, next) {
    try {
      const { soccerPlayerId, name, profileImage, rarity } = req.body;

      const exists = await PlayerModel.existsBySoccerId(soccerPlayerId);
      if (exists) {
        return res.status(409).json({ error: '해당 선수 데이터가 이미 존재합니다' });
      }

      /** 레어도 유효성 검사 **/
      const rarity_check = await gamePrisma.statForRarity.findUnique({
       where: {rarity: rarity}
      });
      if(!rarity_check){
        return res.status(500).json( {error: "잘못된 레어도 입력입니다"}); /**  return을 통해 출력을 반환하고 이후 기능은 처리하지 않음 **/
      }

      const range = rarity_check.maxstat - rarity_check.minstat; /** 추가강화 범위 **/
      const speed = rarity_check.minstat + Math.floor(range * Math.random()); /** 난수값과 범위값을 곱한 후에 최솟값을 더하여 강화수치 결정**/
      const attack = rarity_check.minstat + Math.floor(range * Math.random()); 
      const defence = rarity_check.minstat + Math.floor(range * Math.random()); 

      const player = await PlayerModel.create({ soccerPlayerId, name, speed, attack, defence, profileImage, rarity });
      res.status(201).json({ message: '선수가 성공적으로 생성되었습니다.', data: player });
    } catch (error) {
      console.error('Error creating Player data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  /** 선수 갱신 **/
  static async updatePlayer (req, res, next) {
    try {
      const { playerId } = req.params;
      const { soccerPlayerId, name, speed, attack, defence, profileImage, rarity } = req.body;

      const exists = await PlayerModel.existsByPlayerId(playerId);
      if (!exists) {
        return res.status(404).json({ error: '해당 선수 데이터가 존재하지 않습니다' });
      }
      
      /** 레어도 유효성 검사 **/
      const rarity_check = await gamePrisma.statForRarity.findUnique({
       where: {rarity: rarity}
      });
      if(!rarity_check){
        return res.status(500).json( {error: "잘못된 레어도 입력입니다"});
      }

      const updatedPlayer = await PlayerModel.update(playerId, {
        soccerPlayerId,
        name,
        speed,
        attack,
        defence,
        profileImage,
        rarity
      });

      res.status(200).json({ message: '선수 정보가 갱신되었습니다.', data: updatedPlayer });
    } catch (error) {
      console.error('Error updating Player data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  /** 선수 삭제 **/
  static async deletePlayer (req, res, next) {
    try {
      const { playerId } = req.params;

      const exists = await PlayerModel.existsByPlayerId(playerId);
      if (!exists) {
        return res.status(404).json({ error: '해당 선수 데이터가 존재하지 않습니다' });
      }

      await PlayerModel.delete(playerId);
      res.status(200).json({ message: '선수 정보가 삭제되었습니다.' });
    } catch (error) {
      console.error('Error deleting Player data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
}