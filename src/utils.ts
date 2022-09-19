import { ApolloError } from '@apollo/client';
import { ErrorResponse } from '@apollo/client/link/error';

export const getGraphQLError = (
  error: ErrorResponse | ApolloError,
  index: number
) => {
  if (error?.graphQLErrors?.length) {
    const gqlError = error.graphQLErrors[index];
    if (!gqlError) {
      return null;
    }
    return {
      code: gqlError.extensions.code as string,
      message: gqlError.message as string,
    };
  } else {
    return null;
  }
};

export function* range(start: number, end: number) {
  for (let i = start; i < end; i++) {
    yield i;
  }
}

export const getExtention = (uri?: string) => {
  if (!uri) {
    return;
  }

  const length = uri.lastIndexOf('.'); // 拡張子の有無。なければ-1が返される
  const ext = length !== -1 ? uri.slice(length + 1) : null; // あれば拡張子('.'以降)を取得

  return ext;
};
