import compression from 'compression';
import cors from 'cors';
import express, { Express } from 'express';
import { Keycloak } from 'keycloak-connect';
import NodeCache from 'node-cache';

import packageJson from '../package.json' with { type: 'json' };
import { cacheTTL, esHost, keycloakURL } from './config/env.js';
import statsRouter from './routes/stats/index.js';
const { dependencies, version } = packageJson;

const buildApp = (keycloak: Keycloak): Express => {
  const app = express();
  const cache = new NodeCache({ stdTTL: cacheTTL });

  app.use(cors());
  app.use(compression());
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  /** Update the validateGrant to Provides more logging/information
   * on the reason the token is rejected by keycloak **/
  // const k: any = keycloak;
  // const originalValidateGrant = k.grantManager.validateGrant;
  // k.grantManager.validateGrant = grant =>
  //   originalValidateGrant.call(k.grantManager, grant).catch(err => {
  //     console.error('Grant Validation Error', err);
  //     throw err;
  //   });

  app.use(
    keycloak.middleware({
      logout: '/logout',
      admin: '/',
    })
  );

  app.get('/status', (_req, res) =>
    res.send({
      dependencies,
      version,
      keycloak: keycloakURL,
      elasticsearch: esHost,
    })
  );

  app.post('/cache-clear', keycloak.protect('realm:ADMIN'), async (_req, res) => {
    cache.flushAll();
    return res.send('OK');
  });

  app.use('/stats', statsRouter);

  return app;
};

export default buildApp;
