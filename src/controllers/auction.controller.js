import { gamePrisma, userPrisma } from '../utils/prisma/index.js';

//경매 등록 API
export class AuctionController {
    static  async createAuction(req, res, next) {
        try {
            const { accountId } = req.user;
            const { ownedPlayerId, startingPrice } = req.body;

            // 유효성 검사
            if (!ownedPlayerId || !startingPrice) {
                return res.status(400).json({ error: '경매에 올릴 선수와 시작가를 입력해주세요.' });
            }

            // 1) account 존재 확인
            const account = await userPrisma.account.findUnique({
                where: { accountId: +accountId },
            });
            if (!account) {
                return res.status(404).json({ error: '해당 계정이 존재하지 않습니다.' });
            }

            // 2) OwnedPlayer가 account 소유인지 확인
            const ownedPlayer = await userPrisma.ownedPlayers.findUnique({
                where: {
                    ownedPlayerId: +ownedPlayerId,
                    accountId: +accountId,
                },
            });
            if (!ownedPlayer) {
                return res.status(400).json({ error: '내 소유의 선수만 경매에 등록할 수 있습니다.' });
            }

            // 3) 경매 등록
            const auction = await userPrisma.auction.create({
                data: {
                    ownedPlayerId: +ownedPlayerId,
                    startingPrice: +startingPrice,
                    accountId: +accountId,
                    currentPrice: +startingPrice, // 초기 가격은 시작가로 설정
                    status: 'open', // 경매 상태 초기화
                    endsAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24시간 후 종료
                },
            });

            return res.status(201).json({ data: auction });
        } catch (err) {
            next(err);
        }
    }

    //경매 조회 API
    static async getAuctions(req, res, next) {
        try {
            const auctions = await userPrisma.auction.findMany({
                where: { status: 'open' },
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

            if (!auctionId) {
                return res.status(400).json({ error: '경매 ID가 필요합니다.' });
            }

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
                return res.status(404).json({ error: '해당 경매를 찾을 수 없습니다.' });
            }

            return res.status(200).json({ data: auction });
        } catch (err) {
            next(err);
        }
    }
}

