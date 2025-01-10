import { GraphQLList } from 'graphql';

import { variablesResolver } from './resolvers';
import { VariableType } from './types';

export const getVariables = {
  type: new GraphQLList(VariableType),
  description: 'get variables',
  resolve: variablesResolver,
};
