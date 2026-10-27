import { esVariableIndex } from '#src/config/env.js';
import { commonResolver } from '#src/graphql/common/resolvers.js';

export const variablesResolver = async (parent, args) => {
  try {
    return commonResolver(args, esVariableIndex);
  } catch (error) {
    console.error('variablesResolver error', error);
    return null;
  }
};
