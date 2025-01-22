import { GraphQLFloat, GraphQLList } from 'graphql';

import { resourceCountResolver, resourceResolver } from './resolvers';
import { ResourceType } from './types';

export const getResources = {
  type: new GraphQLList(ResourceType),
  description: 'get resources',
  resolve: resourceResolver,
};

export const getResourcesCount = {
  type: GraphQLFloat,
  description: 'get resources count',
  resolve: resourceCountResolver,
};
