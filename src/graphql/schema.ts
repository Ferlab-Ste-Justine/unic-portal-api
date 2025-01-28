import { GraphQLObjectType, GraphQLSchema } from 'graphql';

import { getResources } from '#src/graphql/resource/queries';
import { getVariables } from '#src/graphql/variable/queries';
import { getTables } from '#src/graphql/table/queries';

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
  },
});

const schema = new GraphQLSchema({
  query,
});

export default schema;
