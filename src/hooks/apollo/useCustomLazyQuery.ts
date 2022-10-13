import {
  DocumentNode,
  OperationVariables,
  useApolloClient,
} from '@apollo/client';
import { useCallback } from 'react';

export function useCustomLazyQuery<
  TData = any,
  TVariables = OperationVariables
>(_query: DocumentNode) {
  const client = useApolloClient();
  return useCallback(
    (variables?: TVariables) =>
      client.query<TData, TVariables>({
        query: _query,
        variables: variables,
        fetchPolicy: 'network-only',
      }),
    [client, _query]
  );
}
