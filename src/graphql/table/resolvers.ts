import { esTableIndex } from '#src/config/env';
import { commonResolver } from '#src/graphql/common/resolvers';
import { esClient } from '#src/services/elasticsearch';

export const tableResolver = async (parent, args) => {
  try {
    return commonResolver(args, esTableIndex);
  } catch (error) {
    console.error('tableResolver error', error);
    return null;
  }
};

export const tableResourceTypesResolver = async () => {
  try {
    // Build an aggregation query to get all unique 'resource.rs_type' values
    const body = {
      size: 0, // Don't return actual documents, just aggregations
      aggs: {
        unique_rs_types: {
          terms: { field: 'resource.rs_type', size: 10000 }, // Get all unique values
        },
      },
    };

    const resSearch = await esClient.search({
      index: esTableIndex,
      body,
    });

    // Extract the unique `rs_type` values from the aggregation
    const uniqueRsTypes = resSearch?.body?.aggregations?.unique_rs_types?.buckets.map((bucket) => bucket.key);

    return uniqueRsTypes || [];
  } catch (error) {
    console.error('tableResourceTypesResolver error', error);
    return null;
  }
};
