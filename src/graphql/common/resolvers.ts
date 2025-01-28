import { esClient } from '#src/services/elasticsearch';
import buildQuery, { QueryOptions } from '#src/services/elasticsearch/buildQuery';

export const commonResolver = async (args, esIndex) => {
  try {
    const queryOptions: QueryOptions = {
      match: args.match,
      term: args.term,
      or: args.or,
      range: args.range,
      pagination: args.pagination,
      fields: args.fields,
      aggregations: args.aggregations,
      sort: args.sort,
      search_after: args.search_after?.filter(Boolean),
    };
    const body = buildQuery(queryOptions);

    const response = await esClient.search({
      index: esIndex,
      body,
    });

    const hits = response?.body?.hits?.hits?.map((hit) => hit._source);
    const total = response?.body?.hits?.total?.value;
    const hitsLength = response?.body?.hits?.hits?.length;
    const search_after = hitsLength ? response?.body?.hits?.hits[hitsLength - 1]?.sort : null;

    return { hits, total, search_after };
  } catch (error) {
    console.error('commonResolver error', error);
    return null;
  }
};
