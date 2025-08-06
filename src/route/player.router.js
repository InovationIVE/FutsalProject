import express from 'express';

import {getAllPlayers, getThePlayer, createPlayer, updatePlayer, deletePlayer} from '../controller/player.controller.js'

const router = express.Router();

/** 전체 선수 목록 조회 **/
router.get('/admin/players', getAllPlayers);

/** 특정 선수 정보 조회 **/
router.get('/admin/players/:playerId', getThePlayer);

/** 선수 등록 **/
router.post('/admin/players', createPlayer);

/** 선수 수정 **/
router.patch('/admin/players/:playerId', updatePlayer);

/** 선수 삭제 **/
router.delete('/admin/players/:playerId', deletePlayer);

export default router;