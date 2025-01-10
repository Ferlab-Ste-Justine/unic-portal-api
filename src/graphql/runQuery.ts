import { graphql } from 'graphql';
import { ExecutionResult } from 'graphql/execution/execute';

import esClient from '../services/elasticsearch/client';
import schema from './schema';

interface IrunQuery {
  query: string;
  variables: {
    first?: number;
  };
}

const runQuery = ({ query, variables }: IrunQuery): Promise<ExecutionResult> =>
  graphql({
    schema,
    contextValue: {
      esClient,
      schema,
    },
    source: query,
    variableValues: variables,
  });

export default runQuery;
