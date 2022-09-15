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
import React, { useRef } from 'react';
import { Alert } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import { ERROR_TOAST_DURATION } from 'src/constants';
import { ForbiddenError } from 'src/generated/graphql';

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
  const errorToastDisplayRef = useRef(false);

  const errorLink = onError((error) => {
    if (error.networkError) {
      toast.show('ネットワークに接続されていません');
      return;
    }

    const firstError = error.graphQLErrors[0];
    const code = firstError.extensions.code;

    if (code === 'INTERNAL_SERVER_ERROR') {
      if (!errorToastDisplayRef.current) {
        toast.show('何らかのエラーが発生しました', { type: 'danger' });
        errorToastDisplayRef.current = true;
      } else {
        setTimeout(() => {
          errorToastDisplayRef.current = false;
        }, ERROR_TOAST_DURATION);
      }
      return;
    }

    if (code === ForbiddenError.AuthFailure || code === 'FORBIDDEN') {
      Alert.alert('エラーが発生しました', 'ログインし直してください', [
        {
          onPress: async () => {
            // TODO: ログアウト処理
          },
        },
      ]);
      return;
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
