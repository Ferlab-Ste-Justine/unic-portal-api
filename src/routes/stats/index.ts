import express from 'express';

import { esResourceIndex, esVariableIndex } from '#src/config/env';
import { fetchCount, fetchProjectsCount, fetchSourceSystemCount } from '#src/services/elasticsearch';

const router = express.Router();

router.get('/', async (req, res) => {
  const [projects_count, source_system_count, variables_count] = await Promise.all([
    fetchProjectsCount(esResourceIndex),
    fetchSourceSystemCount(esResourceIndex),
    fetchCount(esVariableIndex),
  ]);
  const stats = { projects_count, source_system_count, variables_count };
  return res.send(stats);
});

export default router;
