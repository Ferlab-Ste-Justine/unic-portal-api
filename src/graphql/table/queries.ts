import { GraphQLList, GraphQLString } from 'graphql';

import { esTableIndex } from '#src/config/env';
import { uniqueFieldOnIndexResolver } from '#src/graphql/common/resolvers';
import { ArgsType } from '#src/graphql/common/types';

import { tableResolver } from './resolvers';
import { TablesType } from './types';

export const getTables = {
  type: TablesType,
  args: ArgsType,
  description: 'get tables',
  resolve: tableResolver,
};

export const getTablesResourceTypes = {
  type: new GraphQLList(GraphQLString),
  args: ArgsType,
  description: 'get tables resource types options',
  resolve: (_, args) => uniqueFieldOnIndexResolver({ field: 'resource.rs_type', index: esTableIndex, args }),
};

export const getTablesResourceNames = {
  type: new GraphQLList(GraphQLString),
  args: ArgsType,
  description: 'get tables resource names options',
  resolve: (_, args) => uniqueFieldOnIndexResolver({ field: 'resource.rs_name', index: esTableIndex, args }),
};
