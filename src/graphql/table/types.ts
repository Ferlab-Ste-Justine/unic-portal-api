import { GraphQLFloat, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';

import { StatETLType } from '#src/graphql/common/types/index.js';
import { ResourceType } from '#src/graphql/resource/types.js';
import { VariableType } from '#src/graphql/variable/types.js';

export const TableType = new GraphQLObjectType({
  name: 'TableType',
  fields: () => ({
    tab_id: { type: GraphQLFloat },
    tab_created_at: { type: GraphQLFloat },
    tab_last_update: { type: GraphQLFloat },
    tab_name: { type: GraphQLString },
    tab_row_filter: { type: GraphQLString },
    resource: { type: ResourceType },
    stat_etl: { type: StatETLType },
    variables: { type: new GraphQLList(VariableType) },
    tab_label_en: { type: GraphQLString },
    tab_label_fr: { type: GraphQLString },
    tab_entity_type: { type: GraphQLString },
    tab_domain: { type: GraphQLString },
    search_after: { type: new GraphQLList(GraphQLString) },
  }),
});

export const TablesType = new GraphQLObjectType({
  name: 'TablesType',
  fields: () => ({
    hits: { type: new GraphQLList(TableType) },
    total: { type: GraphQLFloat },
    search_after: { type: new GraphQLList(GraphQLString) },
  }),
});
