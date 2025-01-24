import { GraphQLFloat } from 'graphql';

import { ArgsType } from '#src/graphql/common/types';

import { resourceCountResolver, resourceResolver } from './resolvers';
import { ResourcesType } from './types';

export const getResources = {
  type: ResourcesType,
  args: ArgsType,
  description: 'get resources',
  resolve: resourceResolver,
};

export const getResourcesCount = {
  type: GraphQLFloat,
  description: 'get resources count',
  resolve: resourceCountResolver,
};
