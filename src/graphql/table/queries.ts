import { GraphQLList, GraphQLString } from 'graphql';

import { ArgsType } from '#src/graphql/common/types';

import { tableResolver, tableResourceTypesResolver } from './resolvers';
import { TablesType } from './types';

export const getTables = {
  type: TablesType,
  args: ArgsType,
  description: 'get tables',
  resolve: tableResolver,
};

export const getTablesResourceTypes = {
  type: new GraphQLList(GraphQLString),
  description: 'get tables resource types options',
  resolve: tableResourceTypesResolver,
};
