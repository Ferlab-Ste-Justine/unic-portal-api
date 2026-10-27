import { esVariableIndex } from '#src/config/env.js';

import client from './client.js';

export const fetchProjectsCount = async (indexName: string): Promise<number> => {
  try {
    const response = await client.count({
      index: indexName,
      body: {
        query: {
          term: {
            rs_is_project: true,
          },
        },
      },
    });
    return response.body.count;
  } catch (error) {
    console.log('[fetchProjectsCount] error: ', error);
    return null;
  }
};

export const fetchSourceSystemCount = async (indexName: string): Promise<number> => {
  try {
    const response = await client.count({
      index: indexName,
      body: {
        query: {
          term: {
            rs_type: 'source_system', // Match the term "source_system" in the "rs_type" field
          },
        },
      },
    });
    return response.body.count;
  } catch (error) {
    console.log('[fetchProjectsCount] error: ', error);
    return null;
  }
};

export const fetchCount = async (indexName: string): Promise<number> => {
  try {
    const respCounts = await client.count({
      index: indexName,
    });
    return respCounts?.body?.count;
  } catch (error) {
    console.log('[fetchCount] error: ', error);
    return null;
  }
};

// keep this one for example
export const fetchFileFormatStats = async (experimental_strategy = 'WGS'): Promise<number> => {
  try {
    const { body } = await client.search({
      index: esVariableIndex,
      body: {
        size: 0,
        query: {
          bool: {
            must: [
              { match: { file_format: 'CRAM' } },
              { match: { 'sequencing_experiment.experimental_strategy': experimental_strategy } },
            ],
          },
        },
        aggs: { types_count: { value_count: { field: 'file_format' } } },
      },
    });

    return body?.aggregations?.types_count.value;
  } catch (error) {
    console.log('[fetchFileFormatStats] error: ', error);
    return null;
  }
};

export { client as esClient };
