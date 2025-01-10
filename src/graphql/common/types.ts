import { GraphQLBoolean, GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql/index';

export const SourceSystemType = new GraphQLObjectType({
  name: 'SourceSystemType',
  fields: () => ({
    rs_id: { type: GraphQLInt },
    rs_code: { type: GraphQLString },
    rs_name: { type: GraphQLString },
    published: { type: GraphQLBoolean },
  }),
});

export const StatETLType = new GraphQLObjectType({
  name: 'StatETLType',
  fields: () => ({
    project_count: { type: GraphQLInt },
    domain_count: { type: GraphQLInt },
    source_system_count: { type: GraphQLInt },
    variable_count: { type: GraphQLInt },
    table_count: { type: GraphQLInt },
  }),
});
