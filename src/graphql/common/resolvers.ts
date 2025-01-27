import { esClient } from '#src/services/elasticsearch';
import buildQuery, { QueryOptions } from '#src/services/elasticsearch/buildQuery';

export const commonResolver = async (args, esIndex) => {
  try {
    const queryOptions: QueryOptions = {
      match: args.match,
      term: args.term,
      range: args.range,
      sort: args.sort,
      pagination: args.pagination,
      fields: args.fields,
      aggregations: args.aggregations,
      search_after: args.search_after,
    };
    const body = buildQuery(queryOptions);

    const response = await esClient.search({
      index: esIndex,
      body,
    });

    const hits = response?.body?.hits?.hits?.map((hit) => hit._source);
    const total = response?.body?.hits?.total?.value;

    return { hits, total };
  } catch (error) {
    console.error('commonResolver error', error);
    return null;
  }
};
