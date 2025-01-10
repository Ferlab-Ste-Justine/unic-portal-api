import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
  const accessToken = req.headers.authorization;
  const userSets = [];
  return res.send(userSets);
});

router.post('/', async (req, res) => {
  const accessToken = req.headers.authorization;
  const userId = req['kauth']?.grant?.access_token?.content?.sub;
  const createdSet = {};
  return res.send(createdSet);
});

export default router;
