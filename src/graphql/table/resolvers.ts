import { esTableIndex } from '#src/config/env.js';
import { commonResolver } from '#src/graphql/common/resolvers.js';

export const tableResolver = async (_, args) => {
  try {
    return commonResolver(args, esTableIndex);
  } catch (error) {
    console.error('tableResolver error', error);
    return null;
  }
};
