import { GraphQLList, GraphQLString } from 'graphql';

import { FieldInputType, FreeTextInputType } from '#src/graphql/common/types';

import { resourceResolver } from './resolvers';
import { ResourceType } from './types';

export const getResources = {
  type: new GraphQLList(ResourceType),
  description: 'get resources',
  resolve: resourceResolver,
  args: {
    fields: {
      type: new GraphQLList(FieldInputType),
    },
    text: {
      type: FreeTextInputType,
    },
  },
};
