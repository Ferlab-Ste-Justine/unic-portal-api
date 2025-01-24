import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

export const FilterByType = new GraphQLInputObjectType({
  name: 'FilterByType',
  fields: () => ({
    field: { type: GraphQLString },
    value: { type: GraphQLString },
  }),
});

export const ArgsType = {
  from: { type: GraphQLInt },
  limit: { type: GraphQLInt },
  sortBy: { type: GraphQLString },
  orderBy: { type: GraphQLString },
  filterBy: { type: new GraphQLList(FilterByType) },
};

export const SourceSystemType = new GraphQLObjectType({
  name: 'SourceSystemType',
  fields: () => ({
    rs_id: { type: GraphQLFloat },
    rs_code: { type: GraphQLString },
    rs_name: { type: GraphQLString },
    published: { type: GraphQLBoolean },
  }),
});

export const StatETLType = new GraphQLObjectType({
  name: 'StatETLType',
  fields: () => ({
    project_count: { type: GraphQLFloat },
    domain_count: { type: GraphQLFloat },
    source_system_count: { type: GraphQLFloat },
    variable_count: { type: GraphQLFloat },
    table_count: { type: GraphQLFloat },
  }),
});
