import { GraphQLFloat } from 'graphql';

import { ArgsType, StatsType } from '#src/graphql/common/types';

import { resourceCountResolver, resourceResolver, resourceStatsResolver } from './resolvers';
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

export const getResourcesStats = {
  type: StatsType,
  description: 'get resources stats',
  resolve: resourceStatsResolver,
};
