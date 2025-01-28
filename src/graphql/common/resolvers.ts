import * as console from 'node:console';

import { esResourceIndex, esTableIndex, esVariableIndex } from '#src/config/env';
import { FieldInput, FreeTextInput } from '#src/graphql/common/types';
import { esClient } from '#src/services/elasticsearch';
import { getFieldQuery, getTextQuery } from '#src/services/elasticsearch/utils';

export const getIndex = (index: string): string => {
  switch (index) {
    case 'resource':
      return esResourceIndex;
    case 'table':
      return esTableIndex;
    case 'variable':
      return esVariableIndex;
  }
};

export const queryResolver = async (parent, args) => {
  const index = getIndex(args.index);
  const rawFields: FieldInput[] = args.fields ? args.fields : [];
  const rawText: FreeTextInput = args.text;

  const termQueryList = rawFields.map((rawField) => getFieldQuery(rawField));
  const must = rawText ? [...termQueryList, getTextQuery(rawText)] : [...termQueryList];

  try {
    const resSearch = await esClient.search({
      index,
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

export const aggsResolver = async (parent, args) => {
  const index = getIndex(args.index);

  try {
    const resSearch = await esClient.search({
      index,
      body: {
        size: 0,
        aggs: {
          agg: {
            terms: {
              field: args.field,
              size: 10000,
            },
          },
        },
      },
      // size: 10000,
    });

    return resSearch?.body?.aggregations?.agg?.buckets;
  } catch (error) {
    console.error('variablesResolver error', error);
    return null;
  }
};
