import { userPrisma } from '../utils/prisma/index.js';


/**
 * 회원 목록 조회 컨트롤러, 페이지 네이션 관련 주석 상세히 작성
 */
const getUserList = async (req, res) => {
    try {
      // client에서 url로 요청하는 방식 : /auth/accounts?offset=0&limit=10
      // 만약 offset이 없으면 0으로 설정, limit이 없으면 10으로 설정
      // 가장 나중에 가입한 유저부터 조회
      const { offset, limit } = req.query;
      const accounts = await userPrisma.account.findMany({
        skip: offset || 0,
        take: limit || 10,
        orderBy: {
          createdAt: 'desc'
        },
        select: {
          userId: true,
          createdAt: true,
          lastLoginAt: true
        }
      });
  
      res.status(200).json({
        accounts: accounts
      });
    } catch (error) {
      console.error('회원 목록 조회 에러:', error);
      res.status(500).json({
        message: '회원 목록 조회 중 서버 내부 오류가 발생했습니다.'
      });
    }
  };
  
  /**
   * 유저 상세 조회 컨트롤러, 유저 상세 정보 조회
   */
  const getUserDetail = async (req, res) => {
    try {
      const accountId = parseInt(req.params.accountId);
        const account = await userPrisma.account.findUnique({
        where: { accountId: accountId },
        select: {
          accountId: true,
          userId: true,
          email: true,
          role: true,
          createdAt: true,
          lastLoginAt: true
        }
      });

      res.status(200).json({
        account
      });
    } catch (error) {
      console.error('유저 상세 조회 에러:', error);
      res.status(500).json({
        message: '유저 상세 조회 중 서버 내부 오류가 발생했습니다.'
      });
    }
  }

export { getUserList, getUserDetail };