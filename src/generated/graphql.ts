import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export enum CreateUserError {
  AlreadyUserExisting = 'ALREADY_USER_EXISTING'
}

export type CreateUserInput = {
  email: Scalars['String'];
  idToken: Scalars['String'];
};

export type Me = UserEntity & {
  __typename?: 'Me';
  bio?: Maybe<Scalars['String']>;
  birthDay?: Maybe<Scalars['Int']>;
  birthMonth?: Maybe<Scalars['Int']>;
  birthYear?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  initialStatusCompletion: Scalars['Boolean'];
  nickname?: Maybe<Scalars['String']>;
  sex?: Maybe<Sex>;
  statusMessage?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: Me;
  updateInitialStatus: Me;
  updateUserProfile: Me;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationUpdateInitialStatusArgs = {
  input: UpdateInitialStatusInput;
};


export type MutationUpdateUserProfileArgs = {
  input?: InputMaybe<UpdateUserProfileInput>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type Post = {
  __typename?: 'Post';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  text: Scalars['String'];
  user?: Maybe<User>;
};

export type PostConnection = {
  __typename?: 'PostConnection';
  edges: Array<Maybe<PostEdge>>;
  pageInfo: PageInfo;
};

export type PostEdge = {
  __typename?: 'PostEdge';
  cursor: Scalars['String'];
  node: Post;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<Me>;
  nearbyUsers: UserConnection;
  posts: PostConnection;
  stories: StoryConnection;
  user: User;
};


export type QueryNearbyUsersArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
};


export type QueryPostsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
};


export type QueryStoriesArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export enum Sex {
  Female = 'FEMALE',
  Male = 'MALE',
  NotSelected = 'NOT_SELECTED'
}

export type Story = {
  __typename?: 'Story';
  contentUrl: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  user?: Maybe<User>;
};

export type StoryConnection = {
  __typename?: 'StoryConnection';
  edges: Array<Maybe<StoryEdge>>;
  pageInfo: PageInfo;
};

export type StoryEdge = {
  __typename?: 'StoryEdge';
  cursor: Scalars['String'];
  node: Story;
};

export type UpdateInitialStatusInput = {
  birthDay: Scalars['Int'];
  birthMonth: Scalars['Int'];
  birthYear: Scalars['Int'];
  nickname: Scalars['String'];
  sex: Sex;
};

export type UpdateUserProfileInput = {
  bio?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['Int']>;
};

export type User = UserEntity & {
  __typename?: 'User';
  age?: Maybe<Scalars['Int']>;
  bio?: Maybe<Scalars['String']>;
  firstProfileImage?: Maybe<UserProfileImage>;
  id: Scalars['ID'];
  nickname?: Maybe<Scalars['String']>;
  profileImages: Array<Maybe<UserProfileImage>>;
  sex?: Maybe<Sex>;
  statusMessage?: Maybe<Scalars['String']>;
};

export type UserConnection = {
  __typename?: 'UserConnection';
  edges: Array<Maybe<UserEdge>>;
  pageInfo: PageInfo;
};

export type UserEdge = {
  __typename?: 'UserEdge';
  cursor: Scalars['String'];
  node: User;
};

export type UserEntity = {
  bio?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  nickname?: Maybe<Scalars['String']>;
  sex?: Maybe<Sex>;
  statusMessage?: Maybe<Scalars['String']>;
};

export enum UserGetError {
  NotFound = 'NOT_FOUND'
}

export type UserProfileImage = {
  __typename?: 'UserProfileImage';
  height?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  url: Scalars['String'];
  width?: Maybe<Scalars['Int']>;
};

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'Me', id: string, nickname?: string | null, sex?: Sex | null, initialStatusCompletion: boolean } };

export type UpdateInitialStatusMutationVariables = Exact<{
  input: UpdateInitialStatusInput;
}>;


export type UpdateInitialStatusMutation = { __typename?: 'Mutation', updateInitialStatus: { __typename?: 'Me', id: string, nickname?: string | null, sex?: Sex | null, initialStatusCompletion: boolean, birthYear?: number | null, birthMonth?: number | null, birthDay?: number | null } };

export type GetInitialDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetInitialDataQuery = { __typename?: 'Query', me?: { __typename?: 'Me', id: string, nickname?: string | null, sex?: Sex | null, initialStatusCompletion: boolean, birthYear?: number | null, birthMonth?: number | null, birthDay?: number | null } | null };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', me?: { __typename?: 'Me', id: string, nickname?: string | null, sex?: Sex | null, initialStatusCompletion: boolean, birthYear?: number | null, birthMonth?: number | null, birthDay?: number | null } | null };

export type GetInitialStatusCompletionQueryVariables = Exact<{ [key: string]: never; }>;


export type GetInitialStatusCompletionQuery = { __typename?: 'Query', me?: { __typename?: 'Me', initialStatusCompletion: boolean } | null };

export type PageInfoFragment = { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null };

export type PostCardFragment = { __typename?: 'Post', id: number, text: string, user?: { __typename?: 'User', id: string, nickname?: string | null, firstProfileImage?: { __typename?: 'UserProfileImage', id: string, url: string } | null } | null };

export type ProfileImageFragment = { __typename?: 'UserProfileImage', id: string, url: string };

export type UserCardFragment = { __typename?: 'User', id: string, nickname?: string | null, statusMessage?: string | null, profileImages: Array<{ __typename?: 'UserProfileImage', id: string, url: string } | null> };

export type UserCardListFragment = { __typename?: 'UserConnection', edges: Array<{ __typename?: 'UserEdge', node: { __typename?: 'User', id: string, nickname?: string | null, statusMessage?: string | null, profileImages: Array<{ __typename?: 'UserProfileImage', id: string, url: string } | null> } } | null> };

export type ActivityScreenDataQueryVariables = Exact<{
  postsFirst?: InputMaybe<Scalars['Int']>;
  postsAfter?: InputMaybe<Scalars['String']>;
  storiesFirst?: InputMaybe<Scalars['Int']>;
  storiesAfter?: InputMaybe<Scalars['String']>;
}>;


export type ActivityScreenDataQuery = { __typename?: 'Query', posts: { __typename?: 'PostConnection', edges: Array<{ __typename?: 'PostEdge', node: { __typename?: 'Post', id: number, text: string, user?: { __typename?: 'User', id: string, nickname?: string | null, firstProfileImage?: { __typename?: 'UserProfileImage', id: string, url: string } | null } | null } } | null>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null } }, stories: { __typename?: 'StoryConnection', edges: Array<{ __typename?: 'StoryEdge', node: { __typename?: 'Story', id: number, contentUrl: string, user?: { __typename?: 'User', id: string, firstProfileImage?: { __typename?: 'UserProfileImage', id: string, url: string } | null } | null } } | null>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null } } };

export type ActivityPostsQueryVariables = Exact<{
  postsFirst?: InputMaybe<Scalars['Int']>;
  postsAfter?: InputMaybe<Scalars['String']>;
}>;


export type ActivityPostsQuery = { __typename?: 'Query', posts: { __typename?: 'PostConnection', edges: Array<{ __typename?: 'PostEdge', node: { __typename?: 'Post', id: number, text: string, user?: { __typename?: 'User', id: string, nickname?: string | null, firstProfileImage?: { __typename?: 'UserProfileImage', id: string, url: string } | null } | null } } | null>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null } } };

export type ActivityStoriesQueryVariables = Exact<{
  storiesFirst?: InputMaybe<Scalars['Int']>;
  storiesAfter?: InputMaybe<Scalars['String']>;
}>;


export type ActivityStoriesQuery = { __typename?: 'Query', stories: { __typename?: 'StoryConnection', edges: Array<{ __typename?: 'StoryEdge', node: { __typename?: 'Story', id: number, contentUrl: string, user?: { __typename?: 'User', id: string, firstProfileImage?: { __typename?: 'UserProfileImage', id: string, url: string } | null } | null } } | null>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null } } };

export type ActivityPostsFragment = { __typename?: 'Query', posts: { __typename?: 'PostConnection', edges: Array<{ __typename?: 'PostEdge', node: { __typename?: 'Post', id: number, text: string, user?: { __typename?: 'User', id: string, nickname?: string | null, firstProfileImage?: { __typename?: 'UserProfileImage', id: string, url: string } | null } | null } } | null>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null } } };

export type ActivityStoriesFragment = { __typename?: 'Query', stories: { __typename?: 'StoryConnection', edges: Array<{ __typename?: 'StoryEdge', node: { __typename?: 'Story', id: number, contentUrl: string, user?: { __typename?: 'User', id: string, firstProfileImage?: { __typename?: 'UserProfileImage', id: string, url: string } | null } | null } } | null>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null } } };

export type NearbyUsersScreenDataQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
}>;


export type NearbyUsersScreenDataQuery = { __typename?: 'Query', nearbyUsers: { __typename?: 'UserConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null }, edges: Array<{ __typename?: 'UserEdge', node: { __typename?: 'User', id: string, nickname?: string | null, statusMessage?: string | null, profileImages: Array<{ __typename?: 'UserProfileImage', id: string, url: string } | null> } } | null> } };

export type ProfileImagesInUserProfileFragment = { __typename?: 'User', profileImages: Array<{ __typename?: 'UserProfileImage', id: string, url: string } | null> };

export type BottomSheetContentInUserProfileFragment = { __typename?: 'User', id: string, nickname?: string | null, bio?: string | null, age?: number | null };

export type UserProfileScreenDataQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UserProfileScreenDataQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, nickname?: string | null, bio?: string | null, age?: number | null, profileImages: Array<{ __typename?: 'UserProfileImage', id: string, url: string } | null> } };

export const ProfileImageFragmentDoc = gql`
    fragment ProfileImage on UserProfileImage {
  id
  url
}
    `;
export const UserCardFragmentDoc = gql`
    fragment UserCard on User {
  id
  nickname
  statusMessage
  profileImages {
    ...ProfileImage
  }
}
    ${ProfileImageFragmentDoc}`;
export const UserCardListFragmentDoc = gql`
    fragment UserCardList on UserConnection {
  edges {
    node {
      id
      ...UserCard
    }
  }
}
    ${UserCardFragmentDoc}`;
export const PostCardFragmentDoc = gql`
    fragment PostCard on Post {
  id
  text
  user {
    id
    nickname
    firstProfileImage {
      ...ProfileImage
    }
  }
}
    ${ProfileImageFragmentDoc}`;
export const PageInfoFragmentDoc = gql`
    fragment PageInfo on PageInfo {
  hasNextPage
  hasPreviousPage
  startCursor
  endCursor
}
    `;
export const ActivityPostsFragmentDoc = gql`
    fragment ActivityPosts on Query {
  posts(first: $postsFirst, after: $postsAfter) {
    edges {
      node {
        id
        ...PostCard
      }
    }
    pageInfo {
      ...PageInfo
    }
  }
}
    ${PostCardFragmentDoc}
${PageInfoFragmentDoc}`;
export const ActivityStoriesFragmentDoc = gql`
    fragment ActivityStories on Query {
  stories(first: $storiesFirst, after: $storiesAfter) {
    edges {
      node {
        id
        contentUrl
        user {
          id
          firstProfileImage {
            ...ProfileImage
          }
        }
      }
    }
    pageInfo {
      ...PageInfo
    }
  }
}
    ${ProfileImageFragmentDoc}
${PageInfoFragmentDoc}`;
export const ProfileImagesInUserProfileFragmentDoc = gql`
    fragment ProfileImagesInUserProfile on User {
  profileImages {
    ...ProfileImage
  }
}
    ${ProfileImageFragmentDoc}`;
export const BottomSheetContentInUserProfileFragmentDoc = gql`
    fragment BottomSheetContentInUserProfile on User {
  id
  nickname
  bio
  age
}
    `;
export const CreateUserDocument = gql`
    mutation createUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    nickname
    sex
    initialStatusCompletion
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const UpdateInitialStatusDocument = gql`
    mutation UpdateInitialStatus($input: UpdateInitialStatusInput!) {
  updateInitialStatus(input: $input) {
    id
    nickname
    sex
    initialStatusCompletion
    birthYear
    birthMonth
    birthDay
  }
}
    `;
export type UpdateInitialStatusMutationFn = Apollo.MutationFunction<UpdateInitialStatusMutation, UpdateInitialStatusMutationVariables>;

/**
 * __useUpdateInitialStatusMutation__
 *
 * To run a mutation, you first call `useUpdateInitialStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateInitialStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateInitialStatusMutation, { data, loading, error }] = useUpdateInitialStatusMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateInitialStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateInitialStatusMutation, UpdateInitialStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateInitialStatusMutation, UpdateInitialStatusMutationVariables>(UpdateInitialStatusDocument, options);
      }
export type UpdateInitialStatusMutationHookResult = ReturnType<typeof useUpdateInitialStatusMutation>;
export type UpdateInitialStatusMutationResult = Apollo.MutationResult<UpdateInitialStatusMutation>;
export type UpdateInitialStatusMutationOptions = Apollo.BaseMutationOptions<UpdateInitialStatusMutation, UpdateInitialStatusMutationVariables>;
export const GetInitialDataDocument = gql`
    query GetInitialData {
  me {
    id
    nickname
    sex
    initialStatusCompletion
    birthYear
    birthMonth
    birthDay
  }
}
    `;

/**
 * __useGetInitialDataQuery__
 *
 * To run a query within a React component, call `useGetInitialDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInitialDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInitialDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetInitialDataQuery(baseOptions?: Apollo.QueryHookOptions<GetInitialDataQuery, GetInitialDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetInitialDataQuery, GetInitialDataQueryVariables>(GetInitialDataDocument, options);
      }
export function useGetInitialDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInitialDataQuery, GetInitialDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetInitialDataQuery, GetInitialDataQueryVariables>(GetInitialDataDocument, options);
        }
export type GetInitialDataQueryHookResult = ReturnType<typeof useGetInitialDataQuery>;
export type GetInitialDataLazyQueryHookResult = ReturnType<typeof useGetInitialDataLazyQuery>;
export type GetInitialDataQueryResult = Apollo.QueryResult<GetInitialDataQuery, GetInitialDataQueryVariables>;
export const GetMeDocument = gql`
    query getMe {
  me {
    id
    nickname
    sex
    initialStatusCompletion
    birthYear
    birthMonth
    birthDay
  }
}
    `;

/**
 * __useGetMeQuery__
 *
 * To run a query within a React component, call `useGetMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeQuery(baseOptions?: Apollo.QueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
      }
export function useGetMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
        }
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>;
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>;
export type GetMeQueryResult = Apollo.QueryResult<GetMeQuery, GetMeQueryVariables>;
export const GetInitialStatusCompletionDocument = gql`
    query getInitialStatusCompletion {
  me {
    initialStatusCompletion
  }
}
    `;

/**
 * __useGetInitialStatusCompletionQuery__
 *
 * To run a query within a React component, call `useGetInitialStatusCompletionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInitialStatusCompletionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInitialStatusCompletionQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetInitialStatusCompletionQuery(baseOptions?: Apollo.QueryHookOptions<GetInitialStatusCompletionQuery, GetInitialStatusCompletionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetInitialStatusCompletionQuery, GetInitialStatusCompletionQueryVariables>(GetInitialStatusCompletionDocument, options);
      }
export function useGetInitialStatusCompletionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInitialStatusCompletionQuery, GetInitialStatusCompletionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetInitialStatusCompletionQuery, GetInitialStatusCompletionQueryVariables>(GetInitialStatusCompletionDocument, options);
        }
export type GetInitialStatusCompletionQueryHookResult = ReturnType<typeof useGetInitialStatusCompletionQuery>;
export type GetInitialStatusCompletionLazyQueryHookResult = ReturnType<typeof useGetInitialStatusCompletionLazyQuery>;
export type GetInitialStatusCompletionQueryResult = Apollo.QueryResult<GetInitialStatusCompletionQuery, GetInitialStatusCompletionQueryVariables>;
export const ActivityScreenDataDocument = gql`
    query ActivityScreenData($postsFirst: Int, $postsAfter: String, $storiesFirst: Int, $storiesAfter: String) {
  ...ActivityPosts
  ...ActivityStories
}
    ${ActivityPostsFragmentDoc}
${ActivityStoriesFragmentDoc}`;

/**
 * __useActivityScreenDataQuery__
 *
 * To run a query within a React component, call `useActivityScreenDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useActivityScreenDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useActivityScreenDataQuery({
 *   variables: {
 *      postsFirst: // value for 'postsFirst'
 *      postsAfter: // value for 'postsAfter'
 *      storiesFirst: // value for 'storiesFirst'
 *      storiesAfter: // value for 'storiesAfter'
 *   },
 * });
 */
export function useActivityScreenDataQuery(baseOptions?: Apollo.QueryHookOptions<ActivityScreenDataQuery, ActivityScreenDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ActivityScreenDataQuery, ActivityScreenDataQueryVariables>(ActivityScreenDataDocument, options);
      }
export function useActivityScreenDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ActivityScreenDataQuery, ActivityScreenDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ActivityScreenDataQuery, ActivityScreenDataQueryVariables>(ActivityScreenDataDocument, options);
        }
export type ActivityScreenDataQueryHookResult = ReturnType<typeof useActivityScreenDataQuery>;
export type ActivityScreenDataLazyQueryHookResult = ReturnType<typeof useActivityScreenDataLazyQuery>;
export type ActivityScreenDataQueryResult = Apollo.QueryResult<ActivityScreenDataQuery, ActivityScreenDataQueryVariables>;
export const ActivityPostsDocument = gql`
    query ActivityPosts($postsFirst: Int, $postsAfter: String) {
  ...ActivityPosts
}
    ${ActivityPostsFragmentDoc}`;

/**
 * __useActivityPostsQuery__
 *
 * To run a query within a React component, call `useActivityPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useActivityPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useActivityPostsQuery({
 *   variables: {
 *      postsFirst: // value for 'postsFirst'
 *      postsAfter: // value for 'postsAfter'
 *   },
 * });
 */
export function useActivityPostsQuery(baseOptions?: Apollo.QueryHookOptions<ActivityPostsQuery, ActivityPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ActivityPostsQuery, ActivityPostsQueryVariables>(ActivityPostsDocument, options);
      }
export function useActivityPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ActivityPostsQuery, ActivityPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ActivityPostsQuery, ActivityPostsQueryVariables>(ActivityPostsDocument, options);
        }
export type ActivityPostsQueryHookResult = ReturnType<typeof useActivityPostsQuery>;
export type ActivityPostsLazyQueryHookResult = ReturnType<typeof useActivityPostsLazyQuery>;
export type ActivityPostsQueryResult = Apollo.QueryResult<ActivityPostsQuery, ActivityPostsQueryVariables>;
export const ActivityStoriesDocument = gql`
    query ActivityStories($storiesFirst: Int, $storiesAfter: String) {
  ...ActivityStories
}
    ${ActivityStoriesFragmentDoc}`;

/**
 * __useActivityStoriesQuery__
 *
 * To run a query within a React component, call `useActivityStoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useActivityStoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useActivityStoriesQuery({
 *   variables: {
 *      storiesFirst: // value for 'storiesFirst'
 *      storiesAfter: // value for 'storiesAfter'
 *   },
 * });
 */
export function useActivityStoriesQuery(baseOptions?: Apollo.QueryHookOptions<ActivityStoriesQuery, ActivityStoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ActivityStoriesQuery, ActivityStoriesQueryVariables>(ActivityStoriesDocument, options);
      }
export function useActivityStoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ActivityStoriesQuery, ActivityStoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ActivityStoriesQuery, ActivityStoriesQueryVariables>(ActivityStoriesDocument, options);
        }
export type ActivityStoriesQueryHookResult = ReturnType<typeof useActivityStoriesQuery>;
export type ActivityStoriesLazyQueryHookResult = ReturnType<typeof useActivityStoriesLazyQuery>;
export type ActivityStoriesQueryResult = Apollo.QueryResult<ActivityStoriesQuery, ActivityStoriesQueryVariables>;
export const NearbyUsersScreenDataDocument = gql`
    query NearbyUsersScreenData($after: String, $first: Int) {
  nearbyUsers(after: $after, first: $first) {
    ...UserCardList
    pageInfo {
      ...PageInfo
    }
  }
}
    ${UserCardListFragmentDoc}
${PageInfoFragmentDoc}`;

/**
 * __useNearbyUsersScreenDataQuery__
 *
 * To run a query within a React component, call `useNearbyUsersScreenDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useNearbyUsersScreenDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNearbyUsersScreenDataQuery({
 *   variables: {
 *      after: // value for 'after'
 *      first: // value for 'first'
 *   },
 * });
 */
export function useNearbyUsersScreenDataQuery(baseOptions?: Apollo.QueryHookOptions<NearbyUsersScreenDataQuery, NearbyUsersScreenDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NearbyUsersScreenDataQuery, NearbyUsersScreenDataQueryVariables>(NearbyUsersScreenDataDocument, options);
      }
export function useNearbyUsersScreenDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NearbyUsersScreenDataQuery, NearbyUsersScreenDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NearbyUsersScreenDataQuery, NearbyUsersScreenDataQueryVariables>(NearbyUsersScreenDataDocument, options);
        }
export type NearbyUsersScreenDataQueryHookResult = ReturnType<typeof useNearbyUsersScreenDataQuery>;
export type NearbyUsersScreenDataLazyQueryHookResult = ReturnType<typeof useNearbyUsersScreenDataLazyQuery>;
export type NearbyUsersScreenDataQueryResult = Apollo.QueryResult<NearbyUsersScreenDataQuery, NearbyUsersScreenDataQueryVariables>;
export const UserProfileScreenDataDocument = gql`
    query UserProfileScreenData($id: ID!) {
  user(id: $id) {
    id
    ...BottomSheetContentInUserProfile
    ...ProfileImagesInUserProfile
  }
}
    ${BottomSheetContentInUserProfileFragmentDoc}
${ProfileImagesInUserProfileFragmentDoc}`;

/**
 * __useUserProfileScreenDataQuery__
 *
 * To run a query within a React component, call `useUserProfileScreenDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserProfileScreenDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserProfileScreenDataQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserProfileScreenDataQuery(baseOptions: Apollo.QueryHookOptions<UserProfileScreenDataQuery, UserProfileScreenDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserProfileScreenDataQuery, UserProfileScreenDataQueryVariables>(UserProfileScreenDataDocument, options);
      }
export function useUserProfileScreenDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserProfileScreenDataQuery, UserProfileScreenDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserProfileScreenDataQuery, UserProfileScreenDataQueryVariables>(UserProfileScreenDataDocument, options);
        }
export type UserProfileScreenDataQueryHookResult = ReturnType<typeof useUserProfileScreenDataQuery>;
export type UserProfileScreenDataLazyQueryHookResult = ReturnType<typeof useUserProfileScreenDataLazyQuery>;
export type UserProfileScreenDataQueryResult = Apollo.QueryResult<UserProfileScreenDataQuery, UserProfileScreenDataQueryVariables>;