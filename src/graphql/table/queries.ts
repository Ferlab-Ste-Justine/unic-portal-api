import { GraphQLList } from 'graphql';

import { FieldInputType, FreeTextInputType } from '#src/graphql/common/types';

import { tableResolver } from './resolvers';
import { TableType } from './types';

export const getTables = {
  type: new GraphQLList(TableType),
  description: 'get tables',
  resolve: tableResolver,
  args: {
    fields: {
      type: new GraphQLList(FieldInputType),
    },
    text: {
      type: FreeTextInputType,
    },
  },
};
