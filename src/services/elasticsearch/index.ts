import { Client } from '@opensearch-project/opensearch';

import { esVariableIndex } from '#src/config/env';

import client from './client';

export const fetchFileStats = async (): Promise<number> => {
  try {
    const { body } = await client.search({
      index: esVariableIndex,
      body: { aggs: { types_count: { value_count: { field: 'replace_me' } } } },
      size: 0,
    });
    return body?.aggregations?.types_count.value;
  } catch (error) {
    console.log('[fetchFileStats] error: ', error);
    return null;
  }
};

export const countNOfDocs = async (esClient: Client, indexName: string): Promise<number> => {
  const respCounts = await esClient.count({
    index: indexName,
  });
  return respCounts?.body?.count;
};

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
