import { esVariableIndex } from '#src/config/env';
import { commonResolver } from '#src/graphql/common/resolvers';

export const variablesResolver = async (parent, args) => {
  try {
    const { hits, total } = await commonResolver(args, esVariableIndex);
    return { hits, total };
  } catch (error) {
    console.error('variablesResolver error', error);
    return null;
  }
};
