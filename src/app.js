import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import ErrorHandlingMiddleware from './middleWares/error-handling.middleware.js';
import logMiddleware from './middleWares/log.middleware.js';
import ownedPlayersRouter from './routes/ownedPlayers.router.js';



// 라우터 import
import authRouter from './route/auth.router.js';

dotenv.config();

const app = express();
const PORT = 3018;

app.use(express.json());
app.use(cookieParser());
app.use(logMiddleware);


app.use('/', [ownedPlayersRouter]);

app.use(ErrorHandlingMiddleware);

// API 라우터 연결
app.use('/auth', authRouter);


app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});
