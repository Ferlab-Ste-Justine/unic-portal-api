import { GraphQLList, GraphQLString } from 'graphql';

import { esVariableIndex } from '#src/config/env';
import { uniqueFieldOnIndexResolver } from '#src/graphql/common/resolvers';
import { ArgsType } from '#src/graphql/common/types';

import { variablesResolver } from './resolvers';
import { VariablesType } from './types';

export const getVariables = {
  type: VariablesType,
  args: ArgsType,
  description: 'get variables',
  resolve: variablesResolver,
};

export const getVariablesResourceTypes = {
  type: new GraphQLList(GraphQLString),
  args: ArgsType,
  description: 'get variables resource types options',
  resolve: (_, args) => uniqueFieldOnIndexResolver({ field: 'resource.rs_type', index: esVariableIndex, args }),
};

export const getVariablesResourceCodes = {
  type: new GraphQLList(GraphQLString),
  args: ArgsType,
  description: 'get variables resource codes options',
  resolve: async (_, args) =>
    uniqueFieldOnIndexResolver({
      field: 'var_from_source_systems.rs_code',
      index: esVariableIndex,
      args,
      isArray: true,
    }),
};

export const getVariablesResourceNames = {
  type: new GraphQLList(GraphQLString),
  args: ArgsType,
  description: 'get variables resource names options',
  resolve: (_, args) => uniqueFieldOnIndexResolver({ field: 'resource.rs_name', index: esVariableIndex, args }),
};

export const getVariablesTableNames = {
  type: new GraphQLList(GraphQLString),
  args: ArgsType,
  description: 'get variables resource names options',
  resolve: (_, args) => uniqueFieldOnIndexResolver({ field: 'table.tab_name', index: esVariableIndex, args }),
};
