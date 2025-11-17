import express from 'express';
import { connectManager, clearManagers } from '../controllers/connect.js';

const router = express.Router();

router.post('/connect', connectManager);
router.delete('/all', clearManagers);

export default router;
