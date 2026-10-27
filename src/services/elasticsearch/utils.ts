import { GraphQLList, GraphQLObjectType } from 'graphql';

import schema from '#src/graphql/schema.js';

export const isNestedField = (field: string) => {
  const firstPathField = field.split('.')[0];
  const typeMap = schema.getTypeMap();
  for (const typeName in typeMap) {
    const type = typeMap[typeName];
    if (type instanceof GraphQLObjectType) {
      const fields = type.getFields();
      if (fields[firstPathField] && fields[firstPathField].type instanceof GraphQLList) {
        return true;
      }
    }
  }
  return false;
};
