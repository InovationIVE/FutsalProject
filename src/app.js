import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path'; // ES 모듈에서 경로를 처리하기 위한 path 모듈 가져오기
import { fileURLToPath } from 'url'; // ES 모듈에서 현재 파일의 URL을 파일 경로로 변환하기 위한 함수 가져오기
import http from 'http';
import { Server } from 'socket.io';
import gachaRouter from './routes/gacha.router.js';
import ErrorHandlingMiddleware from './middleWares/error-handling.middleware.js';
import logMiddleware from './middleWares/log.middleware.js';
import ownedPlayersRouter from './routes/ownedPlayers.router.js';
import authRouter from './routes/auth.router.js';
import goodsRouter from './routes/goods.router.js';
import PlayerRouter from './routes/player.router.js';
import squadRouter from './routes/squad.router.js';
import userRouter from './routes/user.router.js';
import gameRouter from './routes/game.router.js';
//import reinforceRouter from './routes/reinforce.router.js';
import { authMiddleware } from './middleWares/auth.middleware.js';
import { platform } from 'os';



// --- Game Classes ---
import initSocketEvents from './socket/index.js';

const __filename = fileURLToPath(import.meta.url); //현재 파일의 경로를 가져오기 위해 fileURLToPath 사용
const __dirname = path.dirname(__filename); // 현재 디렉토리 경로를 가져오기 위해 dirname 사용

dotenv.config();


const app = express();


const PORT = 3018;

// http 서버 생성 및 socket.io 서버 초기화
const server = http.createServer(app);
const io = new Server(server);

// GameLogic 폴더를 정적 파일 경로로 설정
app.use(express.static(path.join(__dirname, '..', 'GameLogic')));

app.use(express.json());
app.use(cookieParser());
app.use(logMiddleware);
app.use(authMiddleware);

app.use('/api', [
  gachaRouter,
  goodsRouter,
  PlayerRouter,
  squadRouter,
  ownedPlayersRouter,
  userRouter,
  gameRouter,
  //reinforceRouter,
]);
app.use('/auth', [authRouter]);

// Express 미들웨어를 Socket.IO 미들웨어로 변환하여 사용
const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);

io.use(wrap(cookieParser()));
io.use(wrap(authMiddleware));
initSocketEvents(io);


app.use(ErrorHandlingMiddleware);

server.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});
