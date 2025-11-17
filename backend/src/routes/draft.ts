import express from 'express';
import { draft, start } from '../controllers/draft.js';

const router = express.Router();

router.post('/', draft);
router.post('/start', start);

export default router;
