import { GraphQLObjectType, GraphQLSchema } from 'graphql';

import { getResources, getResourcesCount } from '#src/graphql/resource/queries';
import { getTables } from '#src/graphql/table/queries';
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
    getResourcesCount,
  },
});

const schema = new GraphQLSchema({
  query,
});

export default schema;
