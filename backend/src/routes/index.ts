import express from 'express';
import path from 'path'
import data from './data.js';
import manager from './manager.js';
import draft from './draft.js';

const __dirname = import.meta.dirname;

const router = express.Router();

router.use(express.static(path.join(__dirname, '..', 'dist')));
router.use('/manager', manager);
router.use('/data', data);
router.use('/draft', draft);

router.use('/', (_, res) => {
  res.status(404).send({ error: 'not found' });
});

export default router;
