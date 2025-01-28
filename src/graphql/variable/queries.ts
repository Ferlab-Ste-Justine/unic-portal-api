import { GraphQLList } from 'graphql';
import { GraphQLNonNull, GraphQLString } from 'graphql/index';

import { queryResolver } from '#src/graphql/common/resolvers';
import { FieldInputType, FreeTextInputType } from '#src/graphql/common/types';

import { VariableType } from './types';

export const getVariables = {
  type: new GraphQLList(VariableType),
  description: 'get variables',
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
