import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

// 라우터 import
import authRouter from './route/auth.router.js';
import goodsRouter from './route/goods.router.js';

dotenv.config();

const app = express();
const PORT = 3018;

app.use(express.json());
app.use(cookieParser());

// API 라우터 연결
app.use('/auth', authRouter);
app.use('/goods', goodsRouter);

app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});
