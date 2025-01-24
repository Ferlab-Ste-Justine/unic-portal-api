import { ArgsType } from '#src/graphql/common/types';

import { tableResolver } from './resolvers';
import { TablesType } from './types';

export const getTables = {
  type: TablesType,
  args: ArgsType,
  description: 'get tables',
  resolve: tableResolver,
};
