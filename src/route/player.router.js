import express from 'express';
import { gamePrisma } from '../utils/prisma';
const router = express.Router();


/** 전체 선수 목록 조회 **/
router.get('/admin/players', async (req, res) => {
  try {
    const players = await gamePrisma.players.findMany({
      select: {
        playerId: false,
        soccerPlayerId : true,
        name : true,
        speed : false,
        attack : false,
        defense : false,
        profileImage : true,
        rarity : true,
        probability : false,
        createdAt : false,
        updatedAt : false
      }
    });

    res.status(200).json({ data: players })

  } catch (error) {
    console.error('Error fetching Player data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


/** 특정 선수 정보 조회 **/
router.get('admin/players/:playerId', async (req, res) => {
  try {
    const { playerId } = req.params;

    const playerData = await gamePrisma.player.findUnique({
      where:{
        playerId :Number(playerId)
      },
      select: {
        playerId: false,
        soccerPlayerId : true,
        name : true,
        speed : true,
        attack : true,
        defense : true,
        profileImage : true,
        rarity : true,
        probability : true,
        createdAt : true,
        updatedAt : true
      }
    });

    res.status(200).json({ data: {playerData} })

  } catch (error) {
    console.error('Error fetching Player data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/** 선수 등록 **/
router.post('admin/players', async (req, res) => {
  try {
    const {SoccerPlayerId, name, speed, attack, defense, profileImage, rarity, probabilty} = req.body;
    const isPlayerExist = await gamePrisma.player.findUnique({
      where: { playerId : Number(playerId) }
    });
    if (isPlayerExist) {
      res.status(409).json({ error: '해당 선수 데이터가 이미 존재합니다' });
    }

    const playerData = await gamePrisma.player.create({
      data: {
        SoccerPlayerId,
        name,
        speed,
        attack,
        defense,
        profileImage,
        rarity,
        probabilty
      }
    });

    res.status(201).json({ data: {newPlayer} })

  } catch (error) {
    console.error('Error fetching Player data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/** 선수 수정 **/
router.patch('admin/players/:playersId', async (req, res) => {
  try {
    const { playerId } = req.params;
    const {soccerPlayerId, name, speed, attack, defense, rarity, probability } = req.body;
    
    /** 보류 **/
    const isPlayerExist = await gamePrisma.player.findUnique({
      where: { playerId : Number(playerId) }
    });
    if (!isPlayerExist) {
      res.status(404).json({ error: '해당 선수 데이터가 존재하지 않습니다' });
    } 

    const playerData = await gamePrisma.player.update({
      where:{ playerId : Number(playerId) },
      data: {
        soccerPlayerId,
        name,
        speed,
        attack,
        defense,
        profileImage,
        rarity,
        probability
      }
    });

    res.status(200).json({ 
    //  data: {playerData} ,
     message : "선수 정보가 갱신되었습니다."
    });

  } catch (error) {
    console.error('Error fetching Player data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/** 선수 삭제 **/
router.delete('admin/players/:playersId', async (req, res) => {
  try {
    const { playerId } = req.params;

    const isPlayerExist = await gamePrisma.player.findUnique({
      where: { playerId : Number(playerId) }
    });
    if (!isPlayerExist) {
      res.status(404).json({ error: '해당 선수 데이터가 존재하지 않습니다' });
    } 

    res.status(200).json({ 
      // data: {playerData} ,
      message: "선수 정보가 삭제되었습니다."
    });

  } catch (error) {
    console.error('Error fetching Player data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});