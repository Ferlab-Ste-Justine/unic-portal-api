import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import express from 'express';
import http from 'http';
import Keycloak from 'keycloak-connect';

import buildApp from './app';
import { isDev, port } from './config/env';
import keycloakConfig from './config/keycloak';
import schema from './graphql/schema';
import esClient from './services/elasticsearch/client';

const startApp = async () => {
  try {
    const keycloak = new Keycloak({}, keycloakConfig);
    const app = buildApp(keycloak);
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
      schema,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
      status400ForVariableCoercionErrors: true,
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
