import {
  ApolloClient,
  ApolloProvider as ApolloProviderBase,
  InMemoryCache,
} from '@apollo/client';
import React from 'react';

type Props = {
  children: JSX.Element;
};

export const ApolloProvider = ({ children }: Props) => {
  const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
  });

  return <ApolloProviderBase client={client}>{children}</ApolloProviderBase>;
};
