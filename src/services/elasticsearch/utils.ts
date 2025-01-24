/**
 * Builds the Elasticsearch query body
 * @param from
 * @param limit
 * @param sortBy
 * @param orderBy
 * @param filterBy
 * @returns {{query: any, sort: {}[]}}
 */
export const buildBody = ({
  from,
  limit,
  sortBy,
  orderBy,
  filterBy,
}: {
  from?: number;
  limit?: number;
  sortBy?: string;
  orderBy?: string;
  filterBy?: { field: string; value: string }[];
}) => {
  // Build the query object
  const query: any = {
    bool: {
      must: [], // Array of filters
    },
  };

  // Add filters from `filterBy`
  if (filterBy && Array.isArray(filterBy)) {
    filterBy.forEach((filter: { field: string; value: string }) => {
      query.bool.must.push({
        term: { [filter.field]: filter.value },
      });
    });
  }

  const body = {
    query: filterBy && filterBy.length > 0 ? query : { match_all: {} },
    sort: sortBy
      ? [
          {
            [sortBy]: {
              order: orderBy || 'asc', // Default to ascending order
            },
          },
        ]
      : undefined, // Omit sort if no sortBy is provided
  };

  return body;
};
