import { GraphQLFloat, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';

import { SourceSystemType } from '#src/graphql/common/types';
import { ResourceType } from '#src/graphql/resource/types';
import { TableType } from '#src/graphql/table/types';

export const VariableType = new GraphQLObjectType({
  name: 'VariableType',
  fields: () => ({
    var_id: { type: GraphQLFloat },
    var_last_update: { type: GraphQLFloat },
    var_created_at: { type: GraphQLFloat },
    var_name: { type: GraphQLString },
    var_path: { type: GraphQLString },
    var_value_type: { type: GraphQLString },
    resource: { type: ResourceType },
    table: { type: TableType },
    var_from_source_systems: { type: new GraphQLList(SourceSystemType) },
    var_label_fr: { type: GraphQLString },
    var_label_en: { type: GraphQLString },
    var_derivation_algorithm: { type: GraphQLString },
    var_notes: { type: GraphQLString },
    value_set: { type: ValueSetType },
  }),
});

export const VariablesType = new GraphQLObjectType({
  name: 'VariablesType',
  fields: () => ({
    hits: { type: new GraphQLList(VariableType) },
    total: { type: GraphQLFloat },
    search_after: { type: new GraphQLList(GraphQLString) },
  }),
});

export const ValueSetType = new GraphQLObjectType({
  name: 'ValueSetType',
  fields: () => ({
    values: { type: new GraphQLList(VariableSetValuesType) },
    vs_description_en: { type: GraphQLString },
    vs_description_fr: { type: GraphQLString },
    vs_name: { type: GraphQLString },
  }),
});

export const VariableSetValuesType = new GraphQLObjectType({
  name: 'VariableSetValuesType',
  fields: () => ({
    vsval_code: { type: GraphQLString },
    vsval_label_en: { type: GraphQLString },
    vsval_label_fr: { type: GraphQLString },
  }),
});
