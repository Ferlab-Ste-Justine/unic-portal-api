type MatchOption = {
  field: string;
  value: string | number;
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
  pagination?: {
    from?: number; // Only used if `search_after` is not set
    size?: number;
  };
  search_after?: any[]; // Add `search_after` support
  aggregations?: AggregationOption[];
  fields?: string[]; // Specify fields to include in the response
};

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
    options.match.forEach(({ field, value }) => {
      query.query.bool.must.push({
        match: { [field]: value },
      });
    });
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

  // Add pagination or search_after
  if (options.search_after) {
    query.search_after = options.search_after;
    query.size = options.pagination?.size ?? 50; // Ensure size is still set
  } else {
    query.from = options.pagination?.from ?? 0;
    query.size = options.pagination?.size ?? 50;
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
