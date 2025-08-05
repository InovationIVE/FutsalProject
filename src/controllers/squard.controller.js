import { prisma } from '../utils/prisma/index.js';


// 내 선수 조회
export const myPlayersCorrection = async(req, res) => {
   const { accountId } = req.params;
   if(!accountId){
        return res.status(401).json({message: "내 계정만 조회 할 수 있습니다."});
    }

    const myPlayers = await prisma.ownedPalyers.findMany({
        selcet: {
            soccerPlayerId: true,
            profileImage: true,
            name: true,
            speed: true,
            attack: true,
            defence: true,
            rarity: true,
        },
          orderBy: {
      createdAt: 'desc', //최신순으로 정렬합니다.
    },
    });
    
    return res.status(200).json({data:myPlayers});
   
};

   
   


