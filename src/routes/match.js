import express from 'express'
import { matchEngine } from '../controllers/match.controller.js'
const router = express.Router()

// POST /api/match/save
router.post('/save', matchEngine)


export default router
