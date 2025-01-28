import { GraphQLEnumType, GraphQLFloat, GraphQLInputObjectType, GraphQLInt, GraphQLList, GraphQLString } from 'graphql';

export const FieldValueType = new GraphQLInputObjectType({
  name: 'FieldValueType',
  fields: () => ({
    field: { type: GraphQLString },
    value: { type: GraphQLString },
  }),
});

export const RangeOptionType = new GraphQLInputObjectType({
  name: 'RangeOptionType',
  fields: () => ({
    field: { type: GraphQLString },
    gte: { type: GraphQLFloat },
    lte: { type: GraphQLFloat },
    gt: { type: GraphQLFloat },
    lt: { type: GraphQLFloat },
  }),
});

const SortOrderType = new GraphQLEnumType({
  name: 'SortOrderType',
  values: {
    asc: { value: 'asc' },
    desc: { value: 'desc' },
  },
});

export const SortOptionType = new GraphQLInputObjectType({
  name: 'SortOptionType',
  fields: () => ({
    field: { type: GraphQLString },
    order: { type: SortOrderType },
  }),
});

const PaginationOptionType = new GraphQLInputObjectType({
  name: 'PaginationOptionType',
  fields: () => ({
    from: { type: GraphQLInt },
    size: { type: GraphQLInt },
  }),
});

export const AggregationTypeOptionType = new GraphQLEnumType({
  name: 'AggregationTypeOptionType',
  values: {
    terms: { value: 'terms' },
    avg: { value: 'avg' },
    max: { value: 'max' },
    min: { value: 'min' },
    sum: { value: 'sum' },
  },
});

export const AggregationOptionType = new GraphQLInputObjectType({
  name: 'AggregationOptionType',
  fields: () => ({
    name: { type: GraphQLString },
    field: { type: GraphQLString },
    type: { type: AggregationTypeOptionType },
  }),
});

export const ArgsType = {
  match: { type: new GraphQLList(FieldValueType) },
  term: { type: new GraphQLList(FieldValueType) },
  or: { type: new GraphQLList(FieldValueType) },
  range: { type: new GraphQLList(RangeOptionType) },
  sort: { type: new GraphQLList(SortOptionType) },
  pagination: { type: PaginationOptionType },
  search_after: { type: new GraphQLList(GraphQLString) },
  aggregations: { type: new GraphQLList(AggregationOptionType) },
};
