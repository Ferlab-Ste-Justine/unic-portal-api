import { ArgsType } from '#src/graphql/common/types';

import { variablesResolver } from './resolvers';
import { VariablesType } from './types';

export const getVariables = {
  type: VariablesType,
  args: ArgsType,
  description: 'get variables',
  resolve: variablesResolver,
};
