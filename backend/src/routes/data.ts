import express from 'express';
import { getAllPlayers } from '../controllers/data.js';

const router = express.Router();

router.get('/players', getAllPlayers);

export default router;
