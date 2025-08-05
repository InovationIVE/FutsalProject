import { gamePrisma, userPrisma } from '../utils/prisma/index.js';


// 내 선수 조회
export const myPlayersList = async(req, res, next) => {
  try {
    const { accountId } = req.user;
   
   if(!accountId){
        return res.status(401).json({message: "내 계정 정보가 필요합니다."});
    }

       
    // 1. User DB에서 OwnedPlayers 조회
    const myPlayers = await userPrisma.ownedPlayer.findMany({
        where: { accountId: +accountId }, 
        select: {  
            ownedPlayerId: true,
            playerId: true,
            count: true,
            createdAt: true,
            updatedAt: true,
        }    
    });
   
    // 2. playerId 목록 추출
   const playerIds  = myPlayers.map(p => p.playerId)

   if (playerIds.length === 0) {
      return res.status(200).json({ response: [] })
    }

   // 3. Game DB에서 해당 playerId에 해당하는 Player 조회
   const players = await gamePrisma.player.findMany({
    where:{ playerId : {in : playerIds  }},
    select: {
        playerId: true,
        soccerPlayerId: true,
        name: true,
        profileImage: true
    },
   });

   // 4. playerId 기준으로 매핑해서 ownedPlayers에 Player 정보 붙이기
   const playerMap = Object.fromEntries(players.map(p => [p.playerId ,p]))

   const response = myPlayers.map(ownedPlayer => ({
      ...ownedPlayer,
      player: playerMap[ownedPlayer.playerId] || null
    }))
 
    return res.status(200).json({response});

  }catch (err) {
    next(err);
  }
};

//보유선수 상세 조회

export const myPlayer = async(req, res)=> {
    try{
    const { accountId } = req.user;
    const { ownedPlayerId } = req.params;

    if (!ownedPlayerId) {
      return res.status(400).json({ message: 'ownedPlayerId가 필요합니다.' })
    }

     // 1. User DB에서 ownedPlayer 조회
    const ownedPlayer = await userPrisma.ownedPlayer.findUnique({
      where: {
        ownedPlayerId: +ownedPlayerId,
      },
      select: {
        ownedPlayerId: true,
        accountId: true,
        playerId: true,
        count: true,
        createdAt: true,
        updatedAt: true,
      }
    });

     if (!ownedPlayer) {
      return res.status(404).json({ message: '소유한 선수가 없습니다.' })
    }

    // 2. Game DB에서 Player 상세정보 조회
    const player = await gamePrisma.player.findUnique({
      where: {
        playerId: ownedPlayer.playerId,
      },
      select: {
        playerId: true,
        soccerPlayerId: true,
        name: true,
        speed: true,
        attack: true,
        defence: true,
        rarity: true,
        profileImage: true,
      }
    });

    // 3. 응답 조합
    return res.json({
      ...ownedPlayer,
      player: player || null,
    })

  } catch (err) {
    next(err);
  }
};


   
