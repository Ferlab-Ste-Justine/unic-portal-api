import { esResourceIndex } from '#src/config/env';
import { commonResolver } from '#src/graphql/common/resolvers';
import { esClient } from '#src/services/elasticsearch';

export const resourceResolver = async (parent, args) => {
  try {
    const { hits, total } = await commonResolver(args, esResourceIndex);
    return { hits, total };
  } catch (error) {
    console.error('resourceResolver error', error);
    return null;
  }
};

export const resourceCountResolver = async (parent, args) => {
  try {
    const resSearch = await esClient.count({
      index: esResourceIndex,
    });

    const count = resSearch?.body?.count;
    return count;
  } catch (error) {
    console.error('resourceCountResolver error', error);
    return null;
  }
};
