import { gamePrisma, userPrisma } from '../utils/prisma/index.js';
import { Prisma as UserPrisma } from '../../prisma/User/generated/user/index.js';



export class AuctionController {
   static async createAuction(req, res, next) {
    try {
        const { accountId } = req.user;
        const { ownedPlayerId, startingPrice } = req.body;

        if (!ownedPlayerId || !startingPrice) {
            return res.status(400).json({ message: '경매에 올릴 선수와 시작가를 입력해주세요.' });
        }

        // 트랜잭션 시작
        const result = await userPrisma.$transaction(async (tx) => {
            // 1) OwnedPlayer가 account 소유인지 확인
            const ownedPlayer = await tx.ownedPlayers.findUnique({
                where: {
                    ownedPlayerId: +ownedPlayerId,
                    accountId: +accountId,
                },
            });

            // 해당 선수가 없거나 이미 경매에 등록된 경우 (accountId가 null인 경우)
            if (!ownedPlayer) {
                // 이 경우, 경매를 올릴 권한이 없거나 이미 경매에 올라간 선수입니다.
                // ownedPlayerId를 가진 선수가 존재하지 않거나,
                // ownedPlayerId를 가졌지만 accountId가 현재 사용자가 아닌 경우입니다.
                throw new Error('내 소유의 선수만 경매에 등록할 수 있습니다.');
            }

            // 2) 경매 등록
            const auction = await tx.auction.create({
                data: {
                    ownedPlayerId: +ownedPlayerId,
                    startingPrice: +startingPrice,
                    accountId: +accountId,
                    currentPrice: +startingPrice,
                    status: 'open',
                    endsAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
                },
            });

            // 3) OwnedPlayers에서 해당 선수의 accountId를 null로 업데이트
            await tx.ownedPlayers.update({
                where: { ownedPlayerId: +ownedPlayerId },
                data: { accountId: null },
            });
            
            return auction;
        });

        return res.status(201).json({ data: result });
    } catch (err) {
        // 커스텀 에러 메시지 처리
        if (err.message === '내 소유의 선수만 경매에 등록할 수 있습니다.') {
            return res.status(400).json({ message: err.message });
        }
        next(err);
    }
}

    //경매 조회 API
    static async getAuctions(req, res, next) {
        try {
            const auctions = await userPrisma.auction.findMany({
                // where: { status: 'open' },
                orderBy: { createdAt: 'desc' },
                select: {
                    auctionId: true,
                    startingPrice: true,
                    currentPrice: true,
                    endsAt: true,
                    status: true,
                    ownedPlayer: {
                        select: {
                            name: true,
                            rarity: true,
                            level: true,
                        },
                    },
                },
            });

            return res.status(200).json({ message:"경매장 목록을 조회했습니다.",data: auctions });
        } catch (err) {
            next(err);
        }
    }

    // 경매 상세 조회 API (추가 기능)
    static async getAuctionDetails(req, res, next) {
        try {
            const { auctionId } = req.params;

            const auction = await userPrisma.auction.findUnique({
                where: { auctionId: +auctionId },
                include: {
                    ownedPlayer: {
                        select: {
                            name: true,
                            rarity: true,
                            level: true,
                            speed: true,
                            attack: true,
                            defence: true,
                        },
                    },
                    account: {
                        select: {
                            userId: true,
                        },
                    },
                },
            });

            if (!auction) {
                return res.status(404).json({ message: '해당 경매를 찾을 수 없습니다.' });
            }

            return res.status(200).json({ data: auction });
        } catch (err) {
            next(err);
        }
    };

    //내가 등록한 경매 조회 API (추가 기능)
    static async getMyAuctions(req, res, next) {   
        try {
            const { accountId } = req.user;

            const myAuctions = await userPrisma.auction.findMany({
                where: { accountId: +accountId },
                orderBy: { createdAt: 'desc' },
                select: {
                    auctionId: true,
                    startingPrice: true,
                    currentPrice: true,
                    endsAt: true,
                    status: true,
                    ownedPlayer: {
                        select: {
                            name: true,
                            rarity: true,
                            level: true,
                        },
                    },
                },
            });

            return res.status(200).json({ message:"내가 등록한 경매 목록을 조회했습니다.", data: myAuctions });
        } catch (err) {
            next(err);
        }
    }


    //경매 입찰 API 
    static async placeBid(req, res, next) {
        try {
            const { accountId } = req.user;
            const { auctionId } = req.params;
            const { bidAmount } = req.body;

            // 유효성 검사
            if (!auctionId || !bidAmount) {
                return res.status(400).json({ message: '경매 ID와 입찰 금액이 필요합니다.' });
            }
            

            // 1) 경매 존재 확인
            const auction = await userPrisma.auction.findUnique({
                where: { auctionId: +auctionId },
            });
            if (!auction) {
                return res.status(404).json({ message: '해당 경매를 찾을 수 없습니다.' });
            }

            // 2) 경매 상태 확인
            if (auction.status !== 'open') {
                return res.status(400).json({ message: '현재 경매는 진행 중이 아닙니다.' });
            }

             // 3) 판매자 본인 입찰 방지
            if (auction.accountId === +accountId) {
                return res.status(403).json({ message: '자신이 등록한 경매에는 입찰할 수 없습니다.' });
            }

            // 4) 입찰 금액 유효성 검사
            if (bidAmount <= auction.currentPrice) {
                return res.status(400).json({ message: '입찰 금액은 현재 가격보다 높아야 합니다.' });
            }

            // 5) 입찰자 계정 존재 확인
            const account = await userPrisma.account.findUnique({
                where: { accountId: +accountId },
            });
            if (!account) {
                return res.status(404).json({ message: '해당 계정이 존재하지 않습니다.' });
            }

            if( bidAmount > account.cash) {
                return res.status(400).json({ message: '잔액이 부족합니다.' });
            }

            // 6) 입찰 등록
            const placeBid = await userPrisma.bid.create({
                data: {
                    auctionId: +auctionId,
                    accountId: +accountId,
                    bidAmount: +bidAmount,
                },
            });

            // 7) 경매 현재 가격 업데이트
            await userPrisma.auction.update({
                where: { auctionId: +auctionId },
                data: { currentPrice: +bidAmount },
            });

            return res.status(201).json({ message: '입찰이 성공적으로 등록되었습니다.', data: placeBid });
        } catch (err) {
            next(err);
        }
    }

    // 경매 종료 및 낙찰 처리 (추가 기능)
    static async endAuction(req, res, next) {
        try {
            const { auctionId } = req.params;
            const { accountId } = req.user;

            // 1) 경매 존재 확인
            const auction = await userPrisma.auction.findUnique({
                where: { auctionId: +auctionId, accountId: +accountId },
                include: {
                    ownedPlayer: {
                        select:{
                            playerId: true,
                        }
                    }
                },
            });
            if (!auction) {
                return res.status(404).json({ message: '해당 경매를 찾을 수 없습니다.' });
            }

            // 2) 경매 상태 확인
            if (auction.status !== 'open') {
                return res.status(400).json({ message: '현재 경매는 진행 중이 아닙니다.' });
            }

            if (accountId !== auction.accountId) {
                return res.status(403).json({ message: '경매를 종료할 권한이 없습니다.' });
            }

            // 3) 경매 종료 처리
            await userPrisma.auction.update({
                where: { auctionId: +auctionId },
                data: { status: 'closed' },
            });

            // 4) 낙찰자 정보 조회
            const highestBid = await userPrisma.bid.findFirst({
                where: { auctionId: +auctionId },
                orderBy: { bidAmount: 'desc' },
                include: {
                    account: {
                        select: {
                            userId: true,
                        },
                    },
                },
            });

            if (highestBid) {
                // 5) 낙찰자에게 선수 지급 및 잔액 차감
                await userPrisma.$transaction(async (tx) => {
                    await tx.ownedPlayers.create({
                        data: {
                            ownedPlayerId: +auction.ownedPlayerId,
                            accountId: +highestBid.accountId,
                            playerId: +auction.ownedPlayer.playerId,
                        },
                    });

                    await tx.account.update({
                        where: { accountId: highestBid.accountId },
                        data: { cash: { decrement: highestBid.bidAmount } },
                    });
                });

                return res.status(200).json({ message: '경매가 종료되었습니다.', 낙찰자: highestBid.account.userId });
            } else {
                return res.status(200).json({ message: '경매가 종료되었지만 입찰자가 없습니다.' });
            }
        } catch (err) {
            next(err);
        }
    }
}

