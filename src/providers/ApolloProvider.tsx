import {
  ApolloClient,
  ApolloProvider as ApolloProviderBase,
  createHttpLink,
  from,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { relayStylePagination } from '@apollo/client/utilities';
import auth from '@react-native-firebase/auth';
import React from 'react';
import { useToast } from 'react-native-toast-notifications';

type Props = {
  children: JSX.Element;
};

const link = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const authLink = setContext(async (_, { headers }) => {
  const currentUser = auth().currentUser;
  if (currentUser) {
    const idToken = await currentUser.getIdToken();
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${idToken}`,
      },
    };
  } else {
    return {
      headers: {
        ...headers,
      },
    };
  }
});

export const ApolloProvider = ({ children }: Props) => {
  const toast = useToast();

  const errorLink = onError((error) => {
    console.log('Apollo error');
    console.log(error);
    if (error.networkError) {
      toast.show('ネットワークに接続されていません');
    }
  });

  const client = new ApolloClient({
    link: from([errorLink, authLink, link]),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            nearbyUsers: relayStylePagination(),
            posts: relayStylePagination(),
            stories: relayStylePagination(),
          },
        },
      },
    }),
  });

  return <ApolloProviderBase client={client}>{children}</ApolloProviderBase>;
};
