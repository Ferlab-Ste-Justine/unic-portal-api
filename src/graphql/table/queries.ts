import { GraphQLList } from 'graphql';
import { GraphQLNonNull, GraphQLString } from 'graphql/type';

import { queryResolver } from '#src/graphql/common/resolvers';
import { FieldInputType, FreeTextInputType } from '#src/graphql/common/types';

import { TableType } from './types';

export const getTables = {
  type: new GraphQLList(TableType),
  description: 'get tables',
  resolve: queryResolver,
  args: {
    fields: {
      type: new GraphQLList(FieldInputType),
    },
    text: {
      type: FreeTextInputType,
    },
    index: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
};
