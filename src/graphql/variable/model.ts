import { esVariableIndex } from '#src/config/env';
import { getBody } from '#src/services/elasticsearch/utils';

const get = async (file_id, context) => {
  const { body } = await context.esClient.get({ index: esVariableIndex, file_id });
  return body._source;
};

const getBy = async ({ field, value, path, args, context }) => {
  // const isNested = Array.isArray(FileType.extensions?.nestedFields)
  //   ? FileType.extensions.nestedFields.includes(path)
  //   : false;
  const isNested = false;
  const body = getBody({ field, value, path, nested: isNested });

  const res = await context.esClient.search({
    index: esVariableIndex,
    size: args.first,
    sort: args.sort,
    body,
  });

  const hits = res?.body?.hits?.hits || [];
  const sources = hits.map((hit) => hit._source);
  return sources;
};

const FileModel = {
  get,
  getBy,
};

export default FileModel;
