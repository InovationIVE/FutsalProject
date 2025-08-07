import { PlayerModel } from '../entity/Player.js';

export class PlayerController{
  static async getAllPlayers(req, res, next) {
    try {
      const players = await PlayerModel.getAll();
      res.status(200).json({ data: players });
    } catch (error) {
      console.error('Error fetching Player data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

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

  static async createPlayer (req, res, next) {
    try {
      const { soccerPlayerId, name, speed, attack, defence, profileImage, rarity } = req.body;

      const exists = await PlayerModel.existsBySoccerId(soccerPlayerId);
      if (exists) {
        return res.status(409).json({ error: '해당 선수 데이터가 이미 존재합니다' });
      }

      await PlayerModel.isCorrectRarity(rarity);

      const player = await PlayerModel.create({ soccerPlayerId, name, speed, attack, defence, profileImage, rarity });
      res.status(201).json({ message: '선수가 성공적으로 생성되었습니다.', data: player });
    } catch (error) {
      console.error('Error creating Player data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  static async updatePlayer (req, res, next) {
    try {
      const { playerId } = req.params;
      const { soccerPlayerId, name, speed, attack, defence, profileImage, rarity } = req.body;

      const exists = await PlayerModel.existsByPlayerId(playerId);
      if (!exists) {
        return res.status(404).json({ error: '해당 선수 데이터가 존재하지 않습니다' });
      }
      
      await PlayerModel.isCorrectRarity(rarity);

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