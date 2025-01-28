import { FieldInput, FreeTextInput } from '#src/graphql/common/types';

export const getBody = ({ field, value, path, nested = false }) => {
  let must: any = [{ match: { [field]: value } }];

  if (Array.isArray(value)) {
    must = [
      {
        terms: {
          [field]: value,
        },
      },
    ];
  }

  if (nested) {
    return {
      query: {
        bool: {
          must: [
            {
              nested: {
                path,
                query: { bool: { must } },
              },
            },
          ],
        },
      },
    };
  }

  return {
    query: { bool: { must } },
  };
};

export const getFieldQuery = (input: FieldInput) => {
  // todo implement nested in necessary, for now juste return "term" query
  const termsList = input.values.map((value) => ({
    term: {
      [input.field]: {
        value,
      },
    },
  }));

  return {
    bool: {
      should: termsList,
    },
  };
};

export const getTextQuery = (input: FreeTextInput) => {
  const termsList = input.fields.map((field) => ({
    wildcard: {
      [field]: {
        value: `*${input.value}*`,
      },
    },
  }));

  return {
    bool: {
      should: termsList,
    },
  };
};
