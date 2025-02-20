import { GraphQLObjectType, GraphQLSchema } from 'graphql';

import { getResources, getResourcesCount, getResourcesStats, getResourcesType } from '#src/graphql/resource/queries';
import { getTables, getTablesResourceTypes } from '#src/graphql/table/queries';
import { getVariables } from '#src/graphql/variable/queries';

// FYI GraphQL also support mutations
// const mutation = new GraphQLObjectType({
//   name: 'Mutation',
//   fields: {
//     createVariables,
//     updateVariables,
//     deleteVariables,
//   },
// });

const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    getVariables,
    getResources,
    getTables,
    getTablesResourceTypes,
    getResourcesCount,
    getResourcesStats,
    getResourcesType,
  },
});

const schema = new GraphQLSchema({
  query,
});

export default schema;
