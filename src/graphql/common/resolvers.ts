import { esClient } from '#src/services/elasticsearch';
import buildQuery, { QueryOptions } from '#src/services/elasticsearch/buildQuery';

export const commonResolver = async (args, esIndex) => {
  try {
    const queryOptions: QueryOptions = {
      match: args.match,
      term: args.term,
      or: args.or,
      range: args.range,
      size: args.size,
      from: args.from,
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

export const uniqueFieldOnIndexResolver = async ({
  field,
  index,
  args,
  isArray,
}: {
  field: string;
  index: string;
  args?: QueryOptions;
  isArray?: boolean;
}) => {
  try {
    const or = args?.or;
    const match = args?.match;

    // Convert `or` conditions into a valid ES `should` filter
    const orFilters = or
      ? or?.map(({ field, value }) => ({
          match: { [field]: value },
        }))
      : [];

    // Convert `match` conditions into a valid ES `should` filter
    const matchFilters = match
      ? match?.map(({ field, value }) => ({
          match: { [field]: value },
        }))
      : [];

    // Build an aggregation query to get all unique (ex: 'resource.rs_type') values
    const body = {
      size: 0, // Don't return actual documents, just aggregations
      query: {
        bool: {
          filter: orFilters.length > 0 ? [{ bool: { should: orFilters, minimum_should_match: 1 } }] : [],
          must: matchFilters.length > 0 ? [{ bool: { should: matchFilters, minimum_should_match: 1 } }] : [],
        },
      },
      aggs: isArray
        ? {
            nested_rs_fields: {
              nested: { path: field.split('.')[0] }, // Extracts the parent path, e.g., 'var_from_source_systems'
              aggs: {
                unique_rs_fields: {
                  terms: { field, size: 10000 }, // Get all unique values of nested field
                },
              },
            },
          }
        : {
            unique_rs_fields: {
              terms: { field, size: 10000 }, // Regular terms aggregation for non-nested fields
            },
          },
    };

    const resSearch = await esClient.search({
      index,
      body,
    });

    // Extract the unique `field` values from the aggregation
    const buckets = isArray
      ? resSearch?.body?.aggregations?.nested_rs_fields?.unique_rs_fields?.buckets
      : resSearch?.body?.aggregations?.unique_rs_fields?.buckets;
    const uniqueRsTypes = buckets?.map((bucket) => bucket.key) || [];

    // Sort alphabetically ascending
    const uniqueRsTypesSorted = uniqueRsTypes?.sort((a, b) => a.localeCompare(b));

    return uniqueRsTypesSorted || [];
  } catch (error) {
    console.error('tableResourceUniqueFieldResolver error', error);
    return null;
  }
};
