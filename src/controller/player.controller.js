//import { PrismaClient as GamePrismaClient } from '../../../prisma/Game/generated/prisma/index.js';import prisma from '../'
import { gamePrisma } from '../utils/prisma';

export const getAllPlayers = async (req, res) => {
  try {
    const players = await gamePrisma.player.findMany({
      select: {

        soccerPlayerId : true,
        name : true,
 
        profileImage : true,
        rarity : true,

      }
    });

    res.status(200).json({ data: players })

  } catch (error) {
    console.error('Error fetching Player data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getThePlayer = async (req, res) => {
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

        createdAt : true,
        updatedAt : true
      }
    });

    res.status(200).json({ data: {playerData} })

  } catch (error) {
    console.error('Error fetching Player data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createPlayer = async (req, res) => {
    try {
    const {soccerPlayerId, name, speed, attack, defense, profileImage, rarity} = req.body;
    const isPlayerExist = await gamePrisma.player.findUnique({
      where: { playerId : Number(playerId) }
    });
    if (isPlayerExist) {
      res.status(409).json({ error: '해당 선수 데이터가 이미 존재합니다' });
    }

    const playerData = await gamePrisma.player.create({
      data: {
        soccerPlayerId,
        name,
        speed,
        attack,
        defense,
        profileImage,
        rarity
      }
    });

    res.status(201).json({ data: {newPlayer} })

  } catch (error) {
    console.error('Error fetching Player data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updatePlayer = async (req, res) => {
  try {
    const { playerId } = req.params;
    const {soccerPlayerId, name, speed, attack, defense, rarity} = req.body;
    
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
        rarity
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
};

export const deletePlayer = async (req, res) => {
    try {
    const { playerId } = req.params;

    const isPlayerExist = await gamePrisma.player.findUnique({
      where: { playerId : Number(playerId) }
    });
    if (!isPlayerExist) {
      res.status(404).json({ error: '해당 선수 데이터가 존재하지 않습니다' });
    } 

    await gamePrisma.player.delete({
      where: { playerId : Number(playerId) }
    });

    res.status(200).json({ 
      // data: {playerData} ,
      message: "선수 정보가 삭제되었습니다."
    });

  } catch (error) {
    console.error('Error fetching Player data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};