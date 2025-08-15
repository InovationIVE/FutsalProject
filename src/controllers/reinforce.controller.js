import { userPrisma, gamePrisma } from '../utils/prisma/index.js';

export class ReinforceController{
    static async reinforce(req, res, next) {
        try{
            // const { accountId } = req.user;
            const { ownedPlayerId } = req.params;

            /** 강화할 선수 ; 보유선수에서 선택 **/
            const toReinforce = await userPrisma.ownedPlayers.findUnique({
                where : {ownedPlayerId : Number(ownedPlayerId) }
            });

            /** 강화할 선수의 레벨에 맞는 강화 단계 **/
            const ReinforceLv = await gamePrisma.reinforce.findUnique({
                where: { level : toReinforce.level }
            });

            /** 강화비용 청구를 위한 계정 참조 **/
            const toReinforceOwner = await userPrisma.account.findUnique({
                where : { accountId : toReinforce.accountId}
            });

            /** 결제 후 캐시 잔액 **/
            const cashAfterPayment = toReinforceOwner.cash - ReinforceLv.cost;
            if (cashAfterPayment < 0) { /** 돈이 부족할 경우 */
                return res.status(500).json({error: "잔액이 부족합니다"});
            }
            await userPrisma.account.update({
                where : { accountId : toReinforce.accountId },
                data : {cash : cashAfterPayment}
            });

            const stay_cutline = ReinforceLv.prob_success + ReinforceLv.prob_stay; /** 유지 확률 커트라인 **/
            const regl_cutline = stay_cutline + ReinforceLv.prob_reglation; /** 강등 확률 커트라인 **/

            /** 강화 실행시 결정되는 확률 **/
            const your_prob = Math.random() * 100;
            /** 강화 성공 시 **/
            if( your_prob < ReinforceLv.prob_success){
                const level = toReinforce.level + 1;
                const attack = toReinforce.attack + ReinforceLv.attackIncrement;
                const defence = toReinforce.defence + ReinforceLv.defenceIncrement;
                const speed = toReinforce.speed + ReinforceLv.speedIncrement;

                //const ReinforceSuccess = 
                await userPrisma.ownedPlayers.update({
                    where: {ownedPlayerId : Number(ownedPlayerId) },
                    data: {
                    level: level, 
                    attack: attack,
                    defence: defence,
                    speed: speed
                    }
                });

                res.status(200).json({ 
                    message: "강화 성공!",
                    남은금액: { cashAfterPayment },
                    강화결과 : { 
                        level,
                        attack,
                        defence,
                        speed 
                    }
                });
            }
            //** 강화 실패 시 **//
            //** 강화 단계 유지 **//
            else if(your_prob < stay_cutline){
                res.status(200).json({
                    message: "강화 실패.",
                    남은금액: { cashAfterPayment }
                });
            }
            //** 강화 단계 강등 **/
            else if(your_prob < regl_cutline){
                const reglation = await gamePrisma.reinforce.findUnique({
                where: { level : (toReinforce.level -1) }
                });
                const level = toReinforce.level - 1;
                const attack = toReinforce.attack - reglation.attackIncrement;
                const defence = toReinforce.defence - reglation.defenceIncrement;
                const speed = toReinforce.speed - reglation.speedIncrement;

                //const ReinforceReglation = 
                await userPrisma.ownedPlayers.update({
                    where: {ownedPlayerId : Number(ownedPlayerId) },
                    data: {
                    level: level, 
                    attack: attack,
                    defence: defence,
                    speed: speed
                    }
                });

                res.status(200).json({
                    message: "강화 실패로 인하여 선수의 레벨이 내려갑니다.",
                    남은금액: { cashAfterPayment },
                    강등결과 : { 
                        level,
                        attack,
                        defence,
                        speed
                    }
                });
            }
            /** 선수 카드 파괴 **/
            else{
                await userPrisma.ownedPlayers.delete({
                    where: { ownedPlayerId: +ownedplayerId }
                });

                res.status(200).json({
                    message: "강화 실패로 캐릭터가 파괴되었습니다.",
                    남은금액: { cashAfterPayment },
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
                    prob_success: true,

                    cost : true,

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
                    prob_success: true,
                    prob_stay: true,
                    prob_reglation: true,
                    attackIncrement: true,
                    defenceIncrement: true,
                    speedIncrement: true,
                    cost: true,
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
            const {level, prob_success, prob_stay, prob_reglation, attackIncrement, defenceIncrement, speedIncrement, cost} = req.body;

            /** 중복 검사 보류 **/

            const createdReinforcement = await gamePrisma.reinforce.create({
                data: {
                    level,
                    prob_success,
                    prob_stay,
                    prob_reglation,
                    attackIncrement,
                    defenceIncrement,
                    speedIncrement,
                    cost
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
            const {level, prob_success, prob_stay, prob_reglation, attackIncrement, defenceIncrement, speedIncrement, cost} = req.body;

            if(!reinforceId){ /** 수정하려는 강화방식이 존재하지 않을 경우 **/
                return res.status(404).json({error : "없는 강화 단계입니다"});
            }

            const updatedReinforcement = await gamePrisma.reinforce.update({
                where: { reinforceId : +reinforceId },
                data: {
                    level, 
                    prob_success,
                    prob_stay,
                    prob_reglation, 
                    attackIncrement, 
                    defenceIncrement, 
                    speedIncrement, 
                    cost
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
