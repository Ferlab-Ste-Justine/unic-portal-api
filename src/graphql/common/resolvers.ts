import { esClient } from '#src/services/elasticsearch';
import { buildBody } from '#src/services/elasticsearch/utils';

export const commonResolver = async (args, esIndex) => {
  try {
    const { from, limit, sortBy, orderBy, filterBy } = args;
    const body = buildBody({ from, limit, sortBy, orderBy, filterBy });

    const response = await esClient.search({
      index: esIndex,
      body,
      size: limit || 10, // Default limit to 10
      from: from || 0, // Default start from 0
    });

    const hits = response?.body?.hits?.hits?.map((hit) => hit._source);
    const total = response?.body?.hits?.total?.value;

    return { hits, total };
  } catch (error) {
    console.error('commonResolver error', error);
    return null;
  }
};
