import { esResourceIndex } from '#src/config/env';
import { esClient } from '#src/services/elasticsearch';

export const resourceResolver = async (parent, args) => {
  try {
    //todo: get all filters from args to build the query

    const resSearch = await esClient.search({
      index: esResourceIndex,
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

export const resourceCountResolver = async (parent, args) => {
  try {
    const resSearch = await esClient.search({
      index: esResourceIndex,
      size: 0,
      body: {
        aggs: {
          index_counts: {
            terms: {
              field: '_index',
              size: 100, // Adjust if you have more indices
            },
          },
        },
      },
    });
    const buckets: { key: string; doc_count: number } = resSearch.body.aggregations.index_counts.buckets[0];
    return buckets.doc_count;
  } catch (error) {
    console.error('variablesResolver error', error);
    return null;
  }
};
