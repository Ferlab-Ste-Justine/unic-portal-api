import { isNestedField } from './utils.js';

// If you want exact matching → Use match.
// If you want to allow typos → Use fuzzy: true.
// If you want wildcard searches → Use useWildcard: true.
// fuzzy and wildcard can't work together in Elasticsearch since they rely on different matching mechanisms
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
  useWildcard?: boolean;
  useFuzzy?: boolean;
};

type OrGroup = OrOption[];

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
  missing?: '_first' | '_last';
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
  orGroups?: OrGroup[];
  from?: number; // Only used if `search_after` is not set
  size?: number;
  search_after?: any[];
  aggregations?: AggregationOption[];
  fields?: string[]; // Specify fields to include in the response
};

const fuzziness = 'AUTO'; // AUTO allows small typos
const formatValueForWildcard = (value: string) => value.toLowerCase().replace(/ /g, '*');

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

  if (options.match) {
    options.match.forEach(({ field, value, useWildcard, useFuzzy }) => {
      if (isNestedField(field)) {
        query.query.bool.must.push({
          nested: {
            path: field.split('.')[0],
            query: {
              match: { [field]: value },
            },
          },
        });
      } else {
        if (typeof value === 'string') {
          // 🔹 Wildcard query for values with `*`
          if (useWildcard && value.includes('*')) {
            query.query.bool.must.push({
              wildcard: { [field]: formatValueForWildcard(value) },
            });
            // 🔹 Fuzzy match query (allows typos)
          } else if (useFuzzy) {
            query.query.bool.must.push({
              match: { [field]: { query: value, fuzziness } },
            });
          } else {
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
      }
    });
  }

  if (options.or) {
    const orConditions = options.or.map(({ field, value, useWildcard, useFuzzy }) => {
      if (isNestedField(field)) {
        return {
          nested: {
            path: field.split('.')[0],
            query:
              useWildcard && typeof value === 'string' && value.includes('*')
                ? { wildcard: { [field]: formatValueForWildcard(value) } }
                : useFuzzy
                  ? { match: { [field]: { query: value, fuzziness } } }
                  : { match: { [field]: value } },
          },
        };
      } else {
        if (typeof value === 'string') {
          if (useWildcard && value.includes('*')) {
            return { wildcard: { [field]: formatValueForWildcard(value) } };
          } else if (useFuzzy) {
            return { match: { [field]: { query: value, fuzziness } } };
          }
        }
        return { match: { [field]: value } };
      }
    });

    if (orConditions.length > 0) {
      query.query.bool.filter.push({
        bool: {
          should: orConditions,
          minimum_should_match: 1,
        },
      });
    }
  }

  if (options.orGroups) {
    options.orGroups.forEach((group) => {
      const groupConditions = group.map(({ field, value }) =>
        isNestedField(field)
          ? { nested: { path: field.split('.')[0], query: { match: { [field]: value } } } }
          : { match: { [field]: value } }
      );
      query.query.bool.filter.push({
        bool: {
          should: groupConditions,
          minimum_should_match: 1,
        },
      });
    });
  }

  if (options.term) {
    options.term.forEach(({ field, value }) => {
      query.query.bool.filter.push({
        term: { [field]: value },
      });
    });
  }

  if (options.range) {
    options.range.forEach(({ field, ...range }) => {
      query.query.bool.filter.push({
        range: { [field]: range },
      });
    });
  }

  if (options.sort) {
    query.sort = options.sort.map(({ field, order, missing }) => {
      // set default missing to 0 to allow sorting on null values (ES default is _last) and fix null dates error
      const _missing = missing || 0;
      return {
        [field]: { order, missing: _missing },
      };
    });
  }

  if (options.search_after?.length && options.sort?.length) {
    query.search_after = options.search_after;
    query.size = options.size ?? 50;
  } else {
    query.from = options.from ?? 0;
    query.size = options.size ?? 50;
  }

  if (options.fields) {
    query._source = options.fields;
  }

  if (options.aggregations) {
    query.aggs = {};
    options.aggregations.forEach(({ name, field, type }) => {
      query.aggs[name] = { [type]: { field } };
    });
  }

  return query;
};

export default buildQuery;
