import { esClient } from '#src/services/elasticsearch';
import buildQuery, { QueryOptions } from '#src/services/elasticsearch/buildQuery';
import { isNestedField } from '#src/services/elasticsearch/utils';

export const commonResolver = async (args, esIndex) => {
  try {
    const queryOptions: QueryOptions = {
      match: args.match,
      term: args.term,
      or: args.or,
      orGroups: args.orGroups,
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
      track_total_hits: true,
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
}: {
  field: string;
  index: string;
  args?: QueryOptions;
}) => {
  try {
    const isNested = isNestedField(field);
    const { orGroups, ...otherFields } = args;

    /** filter orGroups to remove field to not filtering itself (for Dropdown multiple select support) */
    const orGroupsFiltered = orGroups?.filter((group) => group.every((element) => element.field !== field));

    const query = buildQuery({ ...otherFields, orGroups: orGroupsFiltered });

    const body = {
      ...query,
      aggs: isNested
        ? {
            nested_fields: {
              nested: { path: field.split('.')[0] },
              aggs: {
                unique_fields: {
                  terms: { field, size: 10000 },
                },
              },
            },
          }
        : {
            unique_fields: {
              terms: { field, size: 10000 },
            },
          },
    };

    const resSearch = await esClient.search({
      index,
      body,
      track_total_hits: true,
    });

    const buckets = isNested
      ? resSearch?.body?.aggregations?.nested_fields?.unique_fields?.buckets
      : resSearch?.body?.aggregations?.unique_fields?.buckets;
    const uniqueValues = buckets?.map((bucket) => bucket.key) || [];

    // Sort alphabetically ascending
    const uniqueRsTypesSorted = uniqueValues?.sort((a, b) => a.localeCompare(b));

    return uniqueRsTypesSorted || [];
  } catch (error) {
    console.error('uniqueFieldOnIndexResolver error:', error);
    return null;
  }
};
