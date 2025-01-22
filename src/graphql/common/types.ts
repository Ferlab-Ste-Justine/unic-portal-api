import { GraphQLBoolean, GraphQLFloat, GraphQLObjectType, GraphQLString } from 'graphql';

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
