import { userPrisma, gamePrisma } from '../utils/prisma/index.js';

export class ReinforceController{
    static async reinforce(req, res, next) {
        try{
            // const { accountId } = req.user;
            const { ownedplayerId } = req.params;

            const toReinforce = await userPrisma.ownedPlayers.findUnique({
                where : {ownedPlayerId : +ownedplayerId }
            });
            const ReinforceLv = await gamePrisma.reinforce.findUnique({
                where: { level : toReinforce.level }
            });

            const your_prob = Math.random() * 100;
            if( your_prob <= ReinforceLv.probability){
                toReinforce.attack += ReinforceLv.attackIncrement;
                toReinforce.defence += ReinforceLv.defenceIncrement;
                toReinforce.speed += ReinforceLv.speedIncrement;

                res.status(200).json({ 
                    message: "강화 성공!",
                    stat : { toReinforce }
                });
            }
            else{
                // await userPrisma.ownedPlayers.delete({
                //     where: { ownedPlayerId }
                // });

                res.status(200).json({
                    message: "강화 실패!" //로 캐릭터가 파괴되었습니다."
                });
            }

            
        } catch (error){
            console.error('Error creating Player data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    //** admin 계정 용 api**//
    /** 모든 강화 단계 조회 **/
    static async getAllReinforcements(req, res, next) {
        try{
            const AllReinforcements = await gamePrisma.reinforce.findMany({
                select: {
                    reinforceId : true,
                    level : true,
                    probability: true,

                    coast : true,

                }
            });
            res.status(200).json({data : AllReinforcements})

        } catch (error){
            console.error('Error creating Player data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    /** 강화단계 상세 조회 **/
    static async getTheReinforcement(req, res, next) {
        try{
            const { reinforceId } = req.params;
            if(!reinforceId){ /** 해당하는 아이디의 강화방식이 존재하지 않을 경우 **/
                return res.status(404).json({error : "없는 강화 단계입니다"});
            }

            const TheReinforcement = await gamePrisma.reinforce.findUnique({
                where: { reinforceId : +reinforceId },
                select: {
                    reinforceId : true,
                    level : true,
                    probability: true,
                    attackIncrement: true,
                    defenceIncrement: true,
                    speedIncrement: true,
                    coast: true,
                    createdAt : true,
                    updatedAt: true
 
                }
            });

            res.status(200).json({data : TheReinforcement})
        } catch (error){
            console.error('Error creating Player data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    /** 강화단계 추가 **/
    static async createReinforcement(req, res, next) {
        try{
            const {level, probability, attackIncrement, defenceIncrement, speedIncrement, coast} = req.body;

            /** 중복 검사 보류 **/

            const createdReinforcement = await gamePrisma.reinforce.create({
                data: {
                    level,
                    probability,
                    attackIncrement,
                    defenceIncrement,
                    speedIncrement,
                    coast
                }
            });

            res.status(201).json({ 
                message : "강화 단계 생성 완료",
                data : createdReinforcement
            });

        } catch (error){
            console.error('Error creating Player data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    /** 강화 단계 수정 **/
    static async updateReinforcement(req, res, next) {
        try{
            const { reinforceId } = req.params;
            const {level, probability, attackIncrement, defenceIncrement, speedIncrement, coast} = req.body;

            if(!reinforceId){ /** 수정하려는 강화방식이 존재하지 않을 경우 **/
                return res.status(404).json({error : "없는 강화 단계입니다"});
            }

            const updatedReinforcement = await gamePrisma.reinforce.update({
                where: { reinforceId : +reinforceId },
                data: {
                    level, 
                    probability, 
                    attackIncrement, 
                    defenceIncrement, 
                    speedIncrement, 
                    coast
                }
            });

            res.status(200).json({
                message : '강화 단계의 수정이 완료되었습니다',
                data : updatedReinforcement
            });

        } catch (error){
            console.error('Error creating Player data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    /** 강화 단계 삭제 **/
    static async deleteReinforcement(req, res, next) {
        try{
            const { reinforceId  } = req.params; 
            if ( !reinforceId ){ /** 강화단계가 존재하지 않을 경우 */
                return res.status(404).json({error : "없는 강화 단계입니다"});
            }

            await gamePrisma.reinforce.delete({
                where: { reinforceId : +reinforceId  }
            });

            res.status(200).json({message : "요청하신 강화 단계의 삭제가 완료되었습니다"});
        } catch (error){
            console.error('Error creating Player data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};
