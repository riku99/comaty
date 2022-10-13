import {
  ApolloClient,
  ApolloLink,
  ApolloProvider as ApolloProviderBase,
  from,
  InMemoryCache
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { relayStylePagination } from '@apollo/client/utilities';
import auth from '@react-native-firebase/auth';
import { createUploadLink } from 'apollo-upload-client';
import React, { useRef } from 'react';
import { Alert } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import { ERROR_TOAST_DURATION } from 'src/constants';
import { ForbiddenError, Post } from 'src/generated/graphql';

type Props = {
  children: JSX.Element;
};

const uploadLink = createUploadLink({
  uri: 'http://localhost:4000/graphql',
});

const customLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    ...operation.getContext(),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    headers: {
      ...operation.getContext().headers,
      'x-apollo-operation-name': operation.operationName,
    },
  });
  return forward(operation);
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
    link: from([errorLink, customLink, authLink, uploadLink]),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            nearbyUsers: relayStylePagination(),
            posts: relayStylePagination(),
            stories: relayStylePagination(),
            storyUsers: relayStylePagination(),
            post: {
              read: (_: Post, { args, toReference }) => {
                if (args) {
                  return toReference({
                    __typename: 'Post',
                    id: args.id as number,
                  });
                }
              },
            },
            user: {
              read: (_, { args, toReference }) => {
                if (args)
                  return toReference({
                    __typename: 'User',
                    id: args.id as string,
                  });
              },
            },
          },
        },
        Me: {
          fields: {
            profileImages: {
              merge: (_, incoming) => incoming,
            },
            myTags: {
              merge: (_, incoming) => incoming,
            },
            messageRoomsFromOtherParty: {
              merge: (_, incoming) => incoming,
            },
            messageRoomsFromMySelf: {
              merge: (_, incoming) => incoming
            }
          },
        },
        User: {
          fields: {
            profileImages: {
              merge: (_, incoming) => incoming,
            },
          },
        },
        Story: {
          fields: {
            seenList: relayStylePagination(),
          },
        },
        MessageRoom: {
          fields: {
            messages: relayStylePagination(),
          },
        },
      },
      possibleTypes: {
        UserEntity: ['Me', 'User'],
        QuestionEntity: ['Question', 'QuestionReply'],
      },
    }),
  });

  return <ApolloProviderBase client={client}>{children}</ApolloProviderBase>;
};
