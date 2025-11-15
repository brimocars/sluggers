import express from 'express';
import data from './data'

const router = express.Router();

router.use(express.static('dist'));
router.use('/data/players');

router.use('/', (_, res) => {
  res.status(404).send({ error: 'not found' });
});

export default router;
