import { esTableIndex } from '#src/config/env';
import { commonResolver } from '#src/graphql/common/resolvers';

export const tableResolver = async (_, args) => {
  try {
    return commonResolver(args, esTableIndex);
  } catch (error) {
    console.error('tableResolver error', error);
    return null;
  }
};
