import { GraphQLList, GraphQLString } from 'graphql';

import { aggsResolver } from '#src/graphql/common/resolvers';
import { FieldAggregationType } from '#src/graphql/common/types';

export const aggs = {
  type: new GraphQLList(FieldAggregationType),
  description: 'Aggregate resources',
  resolve: aggsResolver,
  args: {
    field: {
      type: GraphQLString!,
    },
    index: {
      type: GraphQLString!,
    },
  },
};
