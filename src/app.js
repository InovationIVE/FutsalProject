import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import PlayerRouter from './route/player.router.js';

dotenv.config();

const app = express();
const PORT = 3018;

app.use(express.json());
app.use(cookieParser());

app.use('/api', [PlayerRouter]);


app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});
