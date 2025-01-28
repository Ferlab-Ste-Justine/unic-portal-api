import { GraphQLObjectType, GraphQLSchema } from 'graphql';

import { aggs } from '#src/graphql/common/queries';
import { getResources } from '#src/graphql/resource/queries';
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
    aggs,
  },
});

const schema = new GraphQLSchema({
  query,
});

export default schema;
