import { GraphQLList } from 'graphql';

import { FieldInputType, FreeTextInputType } from '#src/graphql/common/types';

import { variablesResolver } from './resolvers';
import { VariableType } from './types';

export const getVariables = {
  type: new GraphQLList(VariableType),
  description: 'get variables',
  resolve: variablesResolver,
  args: {
    fields: {
      type: new GraphQLList(FieldInputType),
    },
    text: {
      type: FreeTextInputType,
    },
  },
};
