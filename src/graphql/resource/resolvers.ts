import * as console from 'node:console';

import { esResourceIndex } from '#src/config/env';
import { FieldInput, FreeTextInput } from '#src/graphql/common/types';
import { esClient } from '#src/services/elasticsearch';
import { getFieldQuery, getTextQuery } from '#src/services/elasticsearch/utils';

export const resourceResolver = async (parent, args) => {
  const rawFields: FieldInput[] = args.fields ? args.fields : [];
  const rawText: FreeTextInput = args.text;

  const termQueryList = rawFields.map((rawField) => getFieldQuery(rawField));
  const must = rawText ? [...termQueryList, getTextQuery(rawText)] : [...termQueryList];

  try {
    const resSearch = await esClient.search({
      index: esResourceIndex,
      body: {
        query: {
          bool: {
            must,
          },
        },
      },
      // size: 10000,
    });

    const sources = resSearch?.body?.hits?.hits?.map((hit) => hit._source);

    return sources;
  } catch (error) {
    console.error('variablesResolver error', error);
    return null;
  }
};
