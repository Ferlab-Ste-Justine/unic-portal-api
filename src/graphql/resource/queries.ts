import { GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql';

import { queryResolver } from '#src/graphql/common/resolvers';
import { FieldInputType, FreeTextInputType } from '#src/graphql/common/types';

import { ResourceType } from './types';

export const getResources = {
  type: new GraphQLList(ResourceType),
  description: 'get resources',
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
