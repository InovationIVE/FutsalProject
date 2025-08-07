import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import gachaRouter from './routes/gacha.router.js';
import ErrorHandlingMiddleware from './middleWares/error-handling.middleware.js';
import logMiddleware from './middleWares/log.middleware.js';
import ownedPlayersRouter from './routes/ownedPlayers.router.js';
import authRouter from './routes/auth.router.js';
import goodsRouter from './routes/goods.router.js';
import { authMiddleware } from './routes/auth.router.js';
import squadRouter from './routes/squad.router.js';

dotenv.config();

const app = express();
const PORT = 3018;

app.use(express.json());
app.use(cookieParser());
app.use(logMiddleware);
app.use(authMiddleware);

<<<<<<< HEAD
app.use('/api', [squadRouter]);
app.use('/api', [ownedPlayersRouter]);
app.use('/auth', [authRouter]);
=======
app.use('/api', [gachaRouter, goodsRouter]);
app.use('/auth', [authRouter, ownedPlayersRouter, goodsRouter]);
>>>>>>> ccd9932c4dfd742faf0612bc9e6078a728e0291a

app.use(ErrorHandlingMiddleware);

app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});
