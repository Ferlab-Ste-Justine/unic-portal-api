// If you want exact matching → Use match.
// If you want to allow typos → Use fuzzy: true.
// If you want wildcard searches → Use useWildcard: true.
type MatchOption = {
  field: string;
  value: string | number;
  useWildcard?: boolean; // Enable wildcard search
  useFuzzy?: boolean; // Enable fuzzy search
};

type TermOption = {
  field: string;
  value: string | number | boolean;
};

type OrOption = {
  field: string;
  value: string | number;
};

type RangeOption = {
  field: string;
  gte?: number;
  lte?: number;
  gt?: number;
  lt?: number;
};

type SortOption = {
  field: string;
  order: 'asc' | 'desc';
};

type AggregationOption = {
  name: string;
  field: string;
  type: 'terms' | 'avg' | 'max' | 'min' | 'sum';
};

export type QueryOptions = {
  match?: MatchOption[];
  term?: TermOption[];
  range?: RangeOption[];
  sort?: SortOption[];
  or?: OrOption[];
  from?: number; // Only used if `search_after` is not set
  size?: number;
  search_after?: any[]; // Add `search_after` support
  aggregations?: AggregationOption[];
  fields?: string[]; // Specify fields to include in the response
};

const fuzziness = 'AUTO'; // AUTO allows small typos

const buildQuery = (options: QueryOptions) => {
  const query: any = {
    query: {
      bool: {
        must: [],
        filter: [],
        should: [],
        must_not: [],
      },
    },
  };

  // Add match queries
  if (options.match) {
    options.match.forEach(({ field, value, useWildcard, useFuzzy }) => {
      if (typeof value === 'string') {
        if (useWildcard && value.includes('*')) {
          // 🔹 Wildcard query for values with `*`
          query.query.bool.should.push({
            wildcard: { [field]: value.toLowerCase() },
          });
        }
        if (useFuzzy) {
          // 🔹 Fuzzy match query (allows typos)
          query.query.bool.should.push({
            match: {
              [field]: {
                query: value,
                fuzziness,
              },
            },
          });
        }
        if (!useWildcard && !useFuzzy) {
          // 🔹 Default match query (for numbers, etc.)
          query.query.bool.must.push({
            match: { [field]: value },
          });
        }
      } else {
        // 🔹 Default match query (for numbers, etc.)
        query.query.bool.must.push({
          match: { [field]: value },
        });
      }
    });

    // 🔹 Ensure at least one condition matches (Wildcard OR Fuzzy)
    if (query.query.bool.should.length > 0) {
      query.query.bool.minimum_should_match = 1;
    }
  }

  // Add term queries
  if (options.term) {
    options.term.forEach(({ field, value }) => {
      query.query.bool.filter.push({
        term: { [field]: value },
      });
    });
  }

  // Add OR conditions (using `should` for OR logic)
  if (options.or) {
    options.or.forEach(({ field, value }) => {
      query.query.bool.should.push({
        match: { [field]: value }, // You can change this to `term` if you want exact matching
      });
    });
  }

  // Add range queries
  if (options.range) {
    options.range.forEach(({ field, ...range }) => {
      query.query.bool.filter.push({
        range: { [field]: range },
      });
    });
  }

  // Add sort options
  if (options.sort) {
    query.sort = options.sort.map(({ field, order }) => ({
      [field]: { order },
    }));
  }

  // Add pagination or search_after (default sort is required)
  if (options.search_after?.length && options.sort?.length) {
    query.search_after = options.search_after;
    query.size = options.size ?? 50; // Ensure size is still set
  } else {
    query.from = options.from ?? 0;
    query.size = options.size ?? 50;
  }

  // Add fields to include in the response
  if (options.fields) {
    query._source = options.fields; // `_source` specifies the fields to retrieve
  }

  // Add aggregations
  if (options.aggregations) {
    query.aggs = {};
    options.aggregations.forEach(({ name, field, type }) => {
      query.aggs[name] = {
        [type]: { field },
      };
    });
  }

  return query;
};

export default buildQuery;
