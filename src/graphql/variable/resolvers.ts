import { esVariableIndex } from '#src/config/env';
import { esClient } from '#src/services/elasticsearch';

export const variablesResolver = async (parent, args) => {
  try {
    //todo: get all filters from args to build the query
    console.log('variablesResolver here', parent, args);

    const resSearch = await esClient.search({
      index: esVariableIndex,
      body: {
        query: {
          match_all: {},
        },
      },
      // size: 10000,
    });

    console.log('variablesResolver here 2', resSearch);

    const sources = resSearch?.body?.hits?.hits?.map((hit) => hit._source);

    console.log('variablesResolver sources', sources);

    return sources;
  } catch (error) {
    console.error('variablesResolver error', error);
    return null;
  }
};
