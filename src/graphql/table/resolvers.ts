import { esTableIndex } from '#src/config/env';
import { commonResolver } from '#src/graphql/common/resolvers';

export const tableResolver = async (parent, args) => {
  try {
    const { hits, total } = await commonResolver(args, esTableIndex);
    return { hits, total };
  } catch (error) {
    console.error('tableResolver error', error);
    return null;
  }
};
