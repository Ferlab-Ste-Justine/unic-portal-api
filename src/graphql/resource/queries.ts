import { GraphQLList } from 'graphql';

import { resourceResolver } from './resolvers';
import { ResourceType } from './types';

export const getResources = {
  type: new GraphQLList(ResourceType),
  description: 'get resources',
  resolve: resourceResolver,
};
