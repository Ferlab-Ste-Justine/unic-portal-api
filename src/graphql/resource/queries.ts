import { GraphQLFloat, GraphQLList, GraphQLString } from 'graphql';

import { esResourceIndex } from '#src/config/env.js';
import { uniqueFieldOnIndexResolver } from '#src/graphql/common/resolvers.js';
import { ArgsType, StatsType } from '#src/graphql/common/types/index.js';

import { resourceCountResolver, resourceResolver, resourceStatsResolver } from './resolvers.js';
import { ResourcesType } from './types.js';

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

export const getResourcesType = {
  type: new GraphQLList(GraphQLString),
  description: 'get all resources rs_type values',
  args: ArgsType,
  resolve: (_, args) => uniqueFieldOnIndexResolver({ field: 'rs_type', index: esResourceIndex, args }),
};
