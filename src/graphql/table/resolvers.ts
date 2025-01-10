import { esTableIndex } from '#src/config/env';
import { esClient } from '#src/services/elasticsearch';

export const tableResolver = async (parent, args) => {
  try {
    //todo: get all filters from args to build the query

    const resSearch = await esClient.search({
      index: esTableIndex,
      body: {
        query: {
          match_all: {},
        },
      },
      // size: 10000,
    });

    const sources = resSearch?.body?.hits?.hits?.map((hit) => hit._source);

    return sources;
  } catch (error) {
    console.error('variablesResolver error', error);
    return null;
  }
};
