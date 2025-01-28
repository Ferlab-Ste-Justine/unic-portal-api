import { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';

import { StatETLType } from '#src/graphql/common/types';
import { ResourceType } from '#src/graphql/resource/types';
import { VariableType } from '#src/graphql/variable/types';

export const TableType = new GraphQLObjectType({
  name: 'TableType',
  fields: () => ({
    tab_id: { type: GraphQLInt },
    tab_created_at: { type: GraphQLInt },
    tab_last_update: { type: GraphQLInt },
    tab_name: { type: GraphQLString },
    tab_label_en: { type: GraphQLString },
    tab_label_fr: { type: GraphQLString },
    resource: { type: ResourceType },
    stat_etl: { type: StatETLType },
    variables: { type: new GraphQLList(VariableType) },
  }),
});
