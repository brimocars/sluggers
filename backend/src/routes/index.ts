import express from 'express';

const router = express.Router();

router.use(express.static('dist'));


router.use('/hi', (_, res) => {
  res.status(200).send({ hi: 'hi' });
});
router.use('/', (_, res) => {
  res.status(404).send({ error: 'not found' });
});

export default router;
