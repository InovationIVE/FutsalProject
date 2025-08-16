# ⚽ Futsal Online - 실시간 온라인 풋살 게임

**Futsal Online**은 사용자가 자신만의 팀을 구성하여 다른 플레이어와 실시간으로 풋살 경기를 즐길 수 있는 웹 기반 멀티플레이어 게임입니다. 선수 카드를 수집하고 강화하며, 경매장을 통해 다른 유저와 선수를 거래하고, 나만의 스쿼드를 관리하여 최고의 팀을 만들어 보세요!



## ✨ 주요 기능

- **🏟️ 실시간 멀티플레이 매치**: Socket.IO를 활용하여 다른 유저와 실시간으로 풋살 경기를 즐길 수 있습니다.
- **🃏 선수 카드 시스템**: 다양한 등급의 선수 카드를 뽑기(Gacha)를 통해 획득할 수 있습니다.
- **💪 선수 강화**: 보유한 선수를 강화하여 능력치를 향상시킬 수 있습니다.
- **📋 스쿼드 관리**: 획득한 선수들로 나만의 풋살팀 스쿼드를 구성하고 관리할 수 있습니다.
- **⚖️ 선수 경매장**: 다른 유저들과 선수를 자유롭게 거래할 수 있는 경매장 시스템이 구현되어 있습니다.
- **🏆 랭킹 시스템**: 경기 결과에 따라 랭킹 포인트가 변동되며, 자신의 순위를 확인할 수 있습니다.
- **🔐 유저 인증**: JWT (JSON Web Token)을 사용한 안전한 유저 로그인 및 인증 시스템을 제공합니다.
- **🎁 재화 상점 및 선물하기**: 게임 내 재화를 구매하거나 다른 유저에게 선물할 수 있습니다.

## 🖼️ 와이어프레임

![Futsal Online Wireframe](./GameLogic/Image/wireframe_resize.png)


## 🔀 ERD

![Futsal Online ERD](./GameLogic//Image//ERD.png)

## 🚀 기술 스택

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **ORM**: Prisma
- **Real-time Communication**: Socket.IO
- **Authentication**: JWT (jsonwebtoken), bcrypt
- **Logging**: Winston
- **Others**: dotenv, cookie-parser, nodemailer

### Frontend
- **Core**: HTML, CSS, JavaScript (Vanilla JS)
- **Real-time Communication**: Socket.io-client

### Development
- **Package Manager**: Yarn / npm
- **Code Formatting**: Prettier
- **Live Reload**: Nodemon

## ⚙️ 설치 및 실행 방법

1.  **프로젝트 클론**
    ```bash
    git clone https://github.com/InovationIVE/FutsalProject.git
    cd FutsalProject
    ```

2.  **패키지 설치**
    ```bash
    npm install
    # 또는
    yarn install
    ```

3.  **환경 변수 설정**
    - 프로젝트 루트 디렉토리에 `.env` 파일을 생성합니다.
    - `prisma/` 폴더의 `schema.prisma` 파일들을 참고하여 아래와 같이 데이터베이스 연결 정보를 입력합니다.
    ```env
    # User DB
    DATABASE_URL_USER="mysql://USER:PASSWORD@HOST:PORT/DATABASE_NAME"

    # Game DB
    DATABASE_URL_GAME="mysql://USER:PASSWORD@HOST:PORT/DATABASE_NAME"

    # JWT
    JWT_SECRET_KEY=your-secret-key

    # Nodemailer (Optional)
    EMAIL_USER=your-email
    EMAIL_PASS=your-password
    ```

4.  **데이터베이스 마이그레이션**
    - Prisma를 사용하여 데이터베이스 스키마를 적용합니다.
    ```bash
    npx prisma migrate dev --schema=./prisma/User/schema.prisma
    npx prisma migrate dev --schema=./prisma/Game/schema.prisma
    ```

5.  **서버 실행**
    - **개발 모드 (Live Reload)**
      ```bash
      npm run dev
      ```
    - **프로덕션 모드**
      ```bash
      npm run start
      ```

6.  **게임 접속**
    - 웹 브라우저를 열고 `http://localhost:3018` (또는 설정된 포트)으로 접속합니다.
    - 첫 화면은 `GameLogic/Scene/LoginScene/LoginScene.html` 입니다.

## 📁 프로젝트 구조

```
FutsalProject/
├── GameLogic/           # 프론트엔드 (HTML, CSS, JS, 이미지)
│   └── Scene/           # 각 게임 화면 (로비, 게임플레이, 스쿼드 등)
├── prisma/              # Prisma 스키마 및 마이그레이션
│   ├── Game/            # 게임 관련 DB 스키마 (선수, 재화 등)
│   └── User/            # 유저 관련 DB 스키마 (계정, 스쿼드, 랭킹 등)
├── src/                 # 백엔드 소스 코드
│   ├── controllers/     # 요청/응답 처리 로직
│   ├── routes/          # API 라우팅
│   ├── services/        # 비즈니스 로직
│   ├── middleWares/     # 인증, 에러 핸들링 등 미들웨어
│   ├── socket/          # Socket.IO 실시간 통신 로직
│   ├── utils/           # 유틸리티 함수 (토큰, 쿠키 등)
│   └── app.js           # Express 서버 메인 파일
├── package.json         # 프로젝트 의존성 및 스크립트
└── README.md            # 프로젝트 소개
```

## 🗄️ 데이터베이스 스키마

이 프로젝트는 **2개의 데이터베이스**를 사용합니다.

1.  **User Database**: 유저 계정, 소유 선수, 스쿼드, 랭킹, 재화 등 유저와 직접적으로 관련된 데이터를 관리합니다.
    - 주요 모델: `Account`, `OwnedPlayers`, `Squad`, `Rank`, `Auction`, `MatchHistory` 등
    - 스키마 파일: `prisma/User/schema.prisma`

2.  **Game Database**: 전체 게임의 기준이 되는 정적 데이터를 관리합니다.
    - 주요 모델: `Player` (원본 선수 정보), `Goods`, `Gacha`, `Reinforce` (강화 확률/비용) 등
    - 스키마 파일: `prisma/Game/schema.prisma`

---
