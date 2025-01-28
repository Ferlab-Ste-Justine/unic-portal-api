import { GraphQLBoolean, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';

import { StatETLType } from '#src/graphql/common/types';
import { TableType } from '#src/graphql/table/types';
import { VariableType } from '#src/graphql/variable/types';

export const ResourceType = new GraphQLObjectType({
  name: 'ResourceType',
  fields: () => ({
    rs_id: { type: GraphQLInt },
    rs_system_collection_starting_year: { type: GraphQLInt },
    rs_type: { type: GraphQLString },
    rs_title: { type: GraphQLString },
    rs_dict_current_version: { type: GraphQLString },
    rs_last_update: { type: GraphQLInt },
    rs_description_en: { type: GraphQLString },
    rs_description_fr: { type: GraphQLString },
    rs_name: { type: GraphQLString },
    rs_code: { type: GraphQLString },
    rs_is_project: { type: GraphQLBoolean },
    rs_project_pi: { type: GraphQLString },
    rs_project_erb_id: { type: GraphQLString },
    stat_etl: { type: StatETLType },
    variables: { type: new GraphQLList(VariableType) },
    tables: { type: new GraphQLList(TableType) },
  }),
});
