import { GraphQLList } from 'graphql';

import { tableResolver } from './resolvers';
import { TableType } from './types';

export const getTables = {
  type: new GraphQLList(TableType),
  description: 'get tables',
  resolve: tableResolver,
};
