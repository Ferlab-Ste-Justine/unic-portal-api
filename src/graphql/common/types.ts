import {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql/index';

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

export const FieldInputType = new GraphQLInputObjectType({
  name: 'FieldInputType',
  fields: {
    field: { type: GraphQLString },
    values: { type: new GraphQLList(GraphQLString) },
    nested: { type: GraphQLBoolean },
  },
});

export const FreeTextInputType = new GraphQLInputObjectType({
  name: 'FreeTextInputType',
  fields: {
    fields: { type: new GraphQLList(GraphQLString) },
    value: { type: GraphQLString },
  },
});

export interface FieldInput {
  field: string;
  values: string[];
  nested?: boolean;
}

export interface FreeTextInput {
  fields: string[];
  value: string;
}
