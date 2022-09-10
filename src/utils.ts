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
