import { userPrisma } from '../utils/prisma/index.js';


// 내 선수 조회
export const myPlayersList = async(req, res) => {
   const { accountId } = req.user;
   
   if(!accountId){
        return res.status(401).json({message: "내 계정 정보가 필요합니다."});
    }

    const myPlayers = await userPrisma.ownedPlayers.findMany({
        where: { accountId: +accountId }, 
        select: { 
            soccerPlayerId: true,
            profileImage: true,
            rarity: true,
        },
          orderBy: {
      createdAt: 'desc', //최신순으로 정렬합니다.
    },
    });
    
    return res.status(200).json({data:myPlayers});
};

//보유선수 상세 조회

export const myPlayer = async(req, res)=> {
    const { accountId } = req.user;
    const { ownedPlayersId } = req.params;

     if (!myPlayer) {
        return res.status(404).json({ message: "선수를 찾을 수 없습니다." });
    }

    const myPlayer = await userPrisma.ownedPlayers.findFirst({ 
        where: { 
            ownedPlayersId : +ownedPlayersId,
            accountId: +accountId 
        },
        select:{
             soccerPlayerId: true,
            profileImage: true,
            rarity: true,
             name: true,
            speed: true,
            attack: true,
            defence: true,
        },
    });

   

    return res.status(200).json({data: myPlayer });
};