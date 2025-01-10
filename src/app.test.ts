import { jest } from '@jest/globals';
import { Express } from 'express';
import Keycloak from 'keycloak-connect';
import request from 'supertest';

import buildApp from './app';
import { keycloakClient, keycloakRealm, keycloakURL } from './config/env';
import { getToken, publicKey } from './utils/authTestUtils';

jest.mock('./endpoints/statistics');

describe('Express app', () => {
  let app: Express;
  let keycloakFakeConfig;

  beforeEach(() => {
    const publicKeyToVerify = publicKey;
    keycloakFakeConfig = {
      realm: keycloakRealm,
      'confidential-port': 0,
      'bearer-only': true,
      'auth-server-url': keycloakURL,
      'ssl-required': 'external',
      resource: keycloakClient,
      'realm-public-key': publicKeyToVerify, // For test purpose, we use public key to validate token.
    };
    const keycloak = new Keycloak({}, keycloakFakeConfig);
    app = buildApp(keycloak); // Re-create app between each test to ensure isolation between tests.
  });

  it('GET /status (public) should responds with json', async () => {
    const token = getToken();

    await request(app)
      .get('/status')
      .set({ Authorization: `Bearer ${token}` })
      .expect('Content-Type', /json/);
  });

  describe('POST /cache-clear', () => {
    it('should return 403 if no Authorization header', async () => await request(app).post('/cache-clear').expect(403));

    it('should return 403 if not an ADMIN', async () => {
      const token = getToken();

      await request(app)
        .post('/cache-clear')
        .set({ Authorization: `Bearer ${token}` })
        .expect(403);
    });

    it('should return 200 if no error occurs', async () => {
      const token = getToken(1000, '12345-678-90abcdef', ['ADMIN']);

      await request(app)
        .post('/cache-clear')
        .set({ Authorization: `Bearer ${token}` })
        .expect(200, 'OK');
    });
  });
});
