import { esTableIndex } from '#src/config/env';
import { commonResolver } from '#src/graphql/common/resolvers';

export const tableResolver = async (parent, args) => {
  try {
    return commonResolver(args, esTableIndex);
  } catch (error) {
    console.error('tableResolver error', error);
    return null;
  }
};
