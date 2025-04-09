import { GraphQLBoolean, GraphQLFloat, GraphQLObjectType, GraphQLString } from 'graphql';

import { ResourceType } from '#src/graphql/resource/types';
import { TableType } from '#src/graphql/table/types';

export {
  FieldValueType,
  RangeOptionType,
  SortOptionType,
  AggregationTypeOptionType,
  AggregationOptionType,
  ArgsType,
} from './args';

export const SourceSystemType = new GraphQLObjectType({
  name: 'SourceSystemType',
  fields: () => ({
    rs_id: { type: GraphQLFloat },
    rs_code: { type: GraphQLString },
    rs_name: { type: GraphQLString },
    published: { type: GraphQLBoolean },
    stat_etl: { type: StatETLType },
  }),
});

export const FromVariableType = new GraphQLObjectType({
  name: 'FromVariableType',
  fields: () => ({
    var_id: { type: GraphQLFloat },
    var_name: { type: GraphQLString },
    published: { type: GraphQLBoolean },
    resource: { type: ResourceType },
    table: { type: TableType },
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

export const StatsType = new GraphQLObjectType({
  name: 'StatsType',
  fields: () => ({
    warehouse: { type: StatETLType },
    research_project: { type: StatETLType },
    eqp: { type: StatETLType },
    source_system: { type: StatETLType },
  }),
});
