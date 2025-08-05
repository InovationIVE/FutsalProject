import { prisma } from '../utils/prisma/index.js';


// 내 선수 조회
export const myPlayersList = async(req, res) => {
   const { accountId } = req.params;
   if(!accountId){
        return res.status(401).json({message: "내 계정만 조회 할 수 있습니다."});
    }

    const myPlayers = await prisma.ownedPalyers.findMany({
        selcet: {
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

export const myPlayer = async(req, res)=>{
    const accountId = req.user;
    const { ownedPlayersId } = req.params;

    const myPlayer = await prisma.ownedPalyers.findFirst({
        where: { ownedPlayersId : +ownedPlayersId},
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

   
   


