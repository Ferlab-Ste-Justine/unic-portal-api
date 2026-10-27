import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@as-integrations/express4';
import cors from 'cors';
import express from 'express';
import http from 'http';
import Keycloak from 'keycloak-connect';

import buildApp from './app.js';
import { isDev, port } from './config/env.js';
import keycloakConfig from './config/keycloak.js';
import schema from './graphql/schema.js';
import esClient from './services/elasticsearch/client.js';

const startApp = async () => {
  try {
    const keycloak = new Keycloak({}, keycloakConfig);
    const app = buildApp(keycloak);
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
      schema,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
      formatError: (error) => {
        console.error('[ApolloServer] error', error);
        return error;
      },
    });
    const resolveContext = async (req) => ({
      auth: req.kauth?.grant?.access_token || {},
      schema,
      esClient,
    });
    await server.start();
    /** disable protect to enable graphql playground */
    if (!isDev) app.use(keycloak.protect());
    app.use(
      '/graphql',
      cors(),
      express.json({ limit: '50mb' }),
      expressMiddleware(server, { context: ({ req }) => resolveContext(req) })
    );
    httpServer.listen({ port });
    console.info(`[startApp] 🚀 Server ready on ${port}`);
  } catch (err) {
    console.error('[startApp] err', err);
  }
};

startApp();
