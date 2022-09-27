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
  Upload: any;
};

export enum ApproximateRange {
  Near = 'NEAR',
  Normal = 'NORMAL',
  Wide = 'WIDE'
}

export type CreatePostInput = {
  images?: InputMaybe<Array<Scalars['Upload']>>;
  replyTo?: InputMaybe<Scalars['Int']>;
  text: Scalars['String'];
};

export type CreateQuestionInput = {
  anonymity: Scalars['Boolean'];
  displayRange: ApproximateRange;
  images?: InputMaybe<Array<Scalars['Upload']>>;
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  text: Scalars['String'];
};

export type CreateQuestionReplyInput = {
  images?: InputMaybe<Array<Scalars['Upload']>>;
  isAnonymity: Scalars['Boolean'];
  questionId?: InputMaybe<Scalars['Int']>;
  questionReplyId?: InputMaybe<Scalars['Int']>;
  text: Scalars['String'];
};

export enum CreateUserError {
  AlreadyUserExisting = 'ALREADY_USER_EXISTING'
}

export type CreateUserInput = {
  email: Scalars['String'];
  idToken: Scalars['String'];
};

export enum ForbiddenError {
  AuthFailure = 'AUTH_FAILURE'
}

export enum GetPostError {
  NotFound = 'NOT_FOUND'
}

export enum GetQuestionError {
  NotFound = 'NOT_FOUND'
}

export enum GetQuestionReplyError {
  NotFound = 'NOT_FOUND'
}

export type Image = {
  __typename?: 'Image';
  height?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  url: Scalars['String'];
  width?: Maybe<Scalars['Int']>;
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
  createPost: Post;
  createQuestion: Question;
  createQuestionReply: QuestionReply;
  createUser: Me;
  deletePost?: Maybe<Post>;
  deleteQuestion?: Maybe<Question>;
  deleteQuestionReply?: Maybe<QuestionReply>;
  likePost: Post;
  unlikePost?: Maybe<Post>;
  updateInitialStatus: Me;
  updateUserProfile: Me;
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


export type MutationCreateQuestionArgs = {
  input: CreateQuestionInput;
};


export type MutationCreateQuestionReplyArgs = {
  input: CreateQuestionReplyInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeletePostArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteQuestionArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteQuestionReplyArgs = {
  id: Scalars['Int'];
};


export type MutationLikePostArgs = {
  id: Scalars['Int'];
};


export type MutationUnlikePostArgs = {
  id: Scalars['Int'];
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
  images?: Maybe<Array<Maybe<Image>>>;
  likeCount?: Maybe<Scalars['Int']>;
  liked?: Maybe<Scalars['Boolean']>;
  replyToPost?: Maybe<Post>;
  replys?: Maybe<Array<Maybe<Post>>>;
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
  post: Post;
  posts: PostConnection;
  question: Question;
  questionReply: QuestionReply;
  questions: QuestionConnection;
  stories: StoryConnection;
  user: User;
};


export type QueryNearbyUsersArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};


export type QueryPostsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
};


export type QueryQuestionArgs = {
  id: Scalars['Int'];
};


export type QueryQuestionReplyArgs = {
  id: Scalars['Int'];
};


export type QueryQuestionsArgs = {
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

export type Question = QuestionEntity & {
  __typename?: 'Question';
  createdAt: Scalars['String'];
  displayRange: ApproximateRange;
  id: Scalars['Int'];
  images?: Maybe<Array<Maybe<Image>>>;
  isAnonymity: Scalars['Boolean'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  replys?: Maybe<Array<Maybe<QuestionReply>>>;
  text: Scalars['String'];
  user?: Maybe<User>;
};

export type QuestionConnection = {
  __typename?: 'QuestionConnection';
  edges: Array<Maybe<QuestionEdge>>;
  pageInfo: PageInfo;
};

export type QuestionEdge = {
  __typename?: 'QuestionEdge';
  cursor: Scalars['String'];
  node: Question;
};

export type QuestionEntity = {
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  images?: Maybe<Array<Maybe<Image>>>;
  isAnonymity: Scalars['Boolean'];
  replys?: Maybe<Array<Maybe<QuestionReply>>>;
  text: Scalars['String'];
  user?: Maybe<User>;
};

export type QuestionImage = {
  __typename?: 'QuestionImage';
  height?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  url: Scalars['String'];
  width?: Maybe<Scalars['Int']>;
};

export type QuestionReply = QuestionEntity & {
  __typename?: 'QuestionReply';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  images?: Maybe<Array<Maybe<Image>>>;
  isAnonymity: Scalars['Boolean'];
  question?: Maybe<Question>;
  questionReply?: Maybe<QuestionReply>;
  replys?: Maybe<Array<Maybe<QuestionReply>>>;
  text: Scalars['String'];
  user?: Maybe<User>;
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

export type CreatePostMutationVariables = Exact<{
  input: CreatePostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: number, text: string, createdAt: string, liked?: boolean | null, likeCount?: number | null, user?: { __typename?: 'User', id: string, nickname?: string | null, firstProfileImage?: { __typename?: 'UserProfileImage', id: string, url: string } | null } | null, replys?: Array<{ __typename?: 'Post', id: number } | null> | null, images?: Array<{ __typename?: 'Image', url: string, width?: number | null, height?: number | null } | null> | null } };

export type CreateQuestionMutationVariables = Exact<{
  input: CreateQuestionInput;
}>;


export type CreateQuestionMutation = { __typename?: 'Mutation', createQuestion: { __typename?: 'Question', id: number, text: string, createdAt: string, isAnonymity: boolean, latitude: number, longitude: number, displayRange: ApproximateRange } };

export type CreateQuestionReplyMutationVariables = Exact<{
  input: CreateQuestionReplyInput;
}>;


export type CreateQuestionReplyMutation = { __typename?: 'Mutation', createQuestionReply: { __typename?: 'QuestionReply', id: number, text: string, createdAt: string, isAnonymity: boolean, user?: { __typename?: 'User', id: string, nickname?: string | null, firstProfileImage?: { __typename?: 'UserProfileImage', id: string, url: string } | null } | null, images?: Array<{ __typename?: 'Image', url: string } | null> | null, replys?: Array<{ __typename?: 'QuestionReply', id: number } | null> | null } };

export type DeletePostMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost?: { __typename?: 'Post', id: number } | null };

export type DeleteQuestionMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteQuestionMutation = { __typename?: 'Mutation', deleteQuestion?: { __typename?: 'Question', id: number } | null };

export type LikePostMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type LikePostMutation = { __typename?: 'Mutation', likePost: { __typename?: 'Post', id: number, liked?: boolean | null, likeCount?: number | null } };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'Me', id: string, nickname?: string | null, sex?: Sex | null, initialStatusCompletion: boolean } };

export type UnlikePostMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type UnlikePostMutation = { __typename?: 'Mutation', unlikePost?: { __typename?: 'Post', id: number, liked?: boolean | null, likeCount?: number | null } | null };

export type UpdateInitialStatusMutationVariables = Exact<{
  input: UpdateInitialStatusInput;
}>;


export type UpdateInitialStatusMutation = { __typename?: 'Mutation', updateInitialStatus: { __typename?: 'Me', id: string, nickname?: string | null, sex?: Sex | null, initialStatusCompletion: boolean, birthYear?: number | null, birthMonth?: number | null, birthDay?: number | null } };

export type MyBasicInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type MyBasicInfoQuery = { __typename?: 'Query', me?: { __typename?: 'Me', id: string, nickname?: string | null, sex?: Sex | null, birthYear?: number | null, birthMonth?: number | null, birthDay?: number | null, statusMessage?: string | null, bio?: string | null } | null };

export type MyIdQueryVariables = Exact<{ [key: string]: never; }>;


export type MyIdQuery = { __typename?: 'Query', me?: { __typename?: 'Me', id: string } | null };

export type GetInitialDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetInitialDataQuery = { __typename?: 'Query', me?: { __typename?: 'Me', id: string, nickname?: string | null, sex?: Sex | null, initialStatusCompletion: boolean, birthYear?: number | null, birthMonth?: number | null, birthDay?: number | null } | null };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', me?: { __typename?: 'Me', id: string, nickname?: string | null, sex?: Sex | null, initialStatusCompletion: boolean, birthYear?: number | null, birthMonth?: number | null, birthDay?: number | null } | null };

export type GetInitialStatusCompletionQueryVariables = Exact<{ [key: string]: never; }>;


export type GetInitialStatusCompletionQuery = { __typename?: 'Query', me?: { __typename?: 'Me', initialStatusCompletion: boolean } | null };

export type PageInfoFragment = { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null };

export type PostCardFragment = { __typename?: 'Post', id: number, text: string, createdAt: string, liked?: boolean | null, likeCount?: number | null, user?: { __typename?: 'User', id: string, nickname?: string | null, firstProfileImage?: { __typename?: 'UserProfileImage', id: string, url: string } | null } | null, replys?: Array<{ __typename?: 'Post', id: number } | null> | null, images?: Array<{ __typename?: 'Image', url: string, width?: number | null, height?: number | null } | null> | null };

type QuestionCard_Question_Fragment = { __typename?: 'Question', id: number, text: string, createdAt: string, isAnonymity: boolean, user?: { __typename?: 'User', id: string, nickname?: string | null, firstProfileImage?: { __typename?: 'UserProfileImage', id: string, url: string } | null } | null, images?: Array<{ __typename?: 'Image', url: string } | null> | null, replys?: Array<{ __typename?: 'QuestionReply', id: number } | null> | null };

type QuestionCard_QuestionReply_Fragment = { __typename?: 'QuestionReply', id: number, text: string, createdAt: string, isAnonymity: boolean, user?: { __typename?: 'User', id: string, nickname?: string | null, firstProfileImage?: { __typename?: 'UserProfileImage', id: string, url: string } | null } | null, images?: Array<{ __typename?: 'Image', url: string } | null> | null, replys?: Array<{ __typename?: 'QuestionReply', id: number } | null> | null };

export type QuestionCardFragment = QuestionCard_Question_Fragment | QuestionCard_QuestionReply_Fragment;

export type ProfileImageFragment = { __typename?: 'UserProfileImage', id: string, url: string };

export type UserCardFragment = { __typename?: 'User', id: string, nickname?: string | null, age?: number | null, statusMessage?: string | null, profileImages: Array<{ __typename?: 'UserProfileImage', id: string, url: string } | null> };

export type UserCardListFragment = { __typename?: 'UserConnection', edges: Array<{ __typename?: 'UserEdge', node: { __typename?: 'User', id: string, nickname?: string | null, age?: number | null, statusMessage?: string | null, profileImages: Array<{ __typename?: 'UserProfileImage', id: string, url: string } | null> } } | null> };

export type QuestionsScreenDataQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
}>;


export type QuestionsScreenDataQuery = { __typename?: 'Query', questions: { __typename?: 'QuestionConnection', edges: Array<{ __typename?: 'QuestionEdge', cursor: string, node: { __typename?: 'Question', id: number, text: string, createdAt: string, isAnonymity: boolean, user?: { __typename?: 'User', id: string, nickname?: string | null, firstProfileImage?: { __typename?: 'UserProfileImage', id: string, url: string } | null } | null, images?: Array<{ __typename?: 'Image', url: string } | null> | null, replys?: Array<{ __typename?: 'QuestionReply', id: number } | null> | null } } | null>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null } } };

export type ActivityScreenDataQueryVariables = Exact<{
  postsFirst?: InputMaybe<Scalars['Int']>;
  postsAfter?: InputMaybe<Scalars['String']>;
  storiesFirst?: InputMaybe<Scalars['Int']>;
  storiesAfter?: InputMaybe<Scalars['String']>;
}>;


export type ActivityScreenDataQuery = { __typename?: 'Query', posts: { __typename?: 'PostConnection', edges: Array<{ __typename?: 'PostEdge', node: { __typename?: 'Post', id: number, text: string, createdAt: string, liked?: boolean | null, likeCount?: number | null, user?: { __typename?: 'User', id: string, nickname?: string | null, firstProfileImage?: { __typename?: 'UserProfileImage', id: string, url: string } | null } | null, replys?: Array<{ __typename?: 'Post', id: number } | null> | null, images?: Array<{ __typename?: 'Image', url: string, width?: number | null, height?: number | null } | null> | null } } | null>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null } }, stories: { __typename?: 'StoryConnection', edges: Array<{ __typename?: 'StoryEdge', node: { __typename?: 'Story', id: number, contentUrl: string, user?: { __typename?: 'User', id: string, firstProfileImage?: { __typename?: 'UserProfileImage', id: string, url: string } | null } | null } } | null>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null } } };

export type ActivityPostsQueryVariables = Exact<{
  postsFirst?: InputMaybe<Scalars['Int']>;
  postsAfter?: InputMaybe<Scalars['String']>;
}>;


export type ActivityPostsQuery = { __typename?: 'Query', posts: { __typename?: 'PostConnection', edges: Array<{ __typename?: 'PostEdge', node: { __typename?: 'Post', id: number, text: string, createdAt: string, liked?: boolean | null, likeCount?: number | null, user?: { __typename?: 'User', id: string, nickname?: string | null, firstProfileImage?: { __typename?: 'UserProfileImage', id: string, url: string } | null } | null, replys?: Array<{ __typename?: 'Post', id: number } | null> | null, images?: Array<{ __typename?: 'Image', url: string, width?: number | null, height?: number | null } | null> | null } } | null>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null } } };

export type ActivityStoriesQueryVariables = Exact<{
  storiesFirst?: InputMaybe<Scalars['Int']>;
  storiesAfter?: InputMaybe<Scalars['String']>;
}>;


export type ActivityStoriesQuery = { __typename?: 'Query', stories: { __typename?: 'StoryConnection', edges: Array<{ __typename?: 'StoryEdge', node: { __typename?: 'Story', id: number, contentUrl: string, user?: { __typename?: 'User', id: string, firstProfileImage?: { __typename?: 'UserProfileImage', id: string, url: string } | null } | null } } | null>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null } } };

export type ActivityPostsFragment = { __typename?: 'Query', posts: { __typename?: 'PostConnection', edges: Array<{ __typename?: 'PostEdge', node: { __typename?: 'Post', id: number, text: string, createdAt: string, liked?: boolean | null, likeCount?: number | null, user?: { __typename?: 'User', id: string, nickname?: string | null, firstProfileImage?: { __typename?: 'UserProfileImage', id: string, url: string } | null } | null, replys?: Array<{ __typename?: 'Post', id: number } | null> | null, images?: Array<{ __typename?: 'Image', url: string, width?: number | null, height?: number | null } | null> | null } } | null>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null } } };

export type ActivityStoriesFragment = { __typename?: 'Query', stories: { __typename?: 'StoryConnection', edges: Array<{ __typename?: 'StoryEdge', node: { __typename?: 'Story', id: number, contentUrl: string, user?: { __typename?: 'User', id: string, firstProfileImage?: { __typename?: 'UserProfileImage', id: string, url: string } | null } | null } } | null>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null } } };

export type NearbyUsersScreenDataQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
}>;


export type NearbyUsersScreenDataQuery = { __typename?: 'Query', nearbyUsers: { __typename?: 'UserConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null }, edges: Array<{ __typename?: 'UserEdge', node: { __typename?: 'User', id: string, nickname?: string | null, age?: number | null, statusMessage?: string | null, profileImages: Array<{ __typename?: 'UserProfileImage', id: string, url: string } | null> } } | null> } };

export type PostDetailScreenDataQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PostDetailScreenDataQuery = { __typename?: 'Query', post: { __typename?: 'Post', id: number, text: string, createdAt: string, liked?: boolean | null, likeCount?: number | null, replyToPost?: { __typename?: 'Post', id: number, text: string, createdAt: string, liked?: boolean | null, likeCount?: number | null, user?: { __typename?: 'User', id: string, nickname?: string | null, firstProfileImage?: { __typename?: 'UserProfileImage', id: string, url: string } | null } | null, replys?: Array<{ __typename?: 'Post', id: number } | null> | null, images?: Array<{ __typename?: 'Image', url: string, width?: number | null, height?: number | null } | null> | null } | null, replys?: Array<{ __typename?: 'Post', id: number, text: string, createdAt: string, liked?: boolean | null, likeCount?: number | null, replyToPost?: { __typename?: 'Post', id: number, text: string, createdAt: string, liked?: boolean | null, likeCount?: number | null, user?: { __typename?: 'User', id: string, nickname?: string | null, firstProfileImage?: { __typename?: 'UserProfileImage', id: string, url: string } | null } | null, replys?: Array<{ __typename?: 'Post', id: number } | null> | null, images?: Array<{ __typename?: 'Image', url: string, width?: number | null, height?: number | null } | null> | null } | null, user?: { __typename?: 'User', id: string, nickname?: string | null, firstProfileImage?: { __typename?: 'UserProfileImage', id: string, url: string } | null } | null, replys?: Array<{ __typename?: 'Post', id: number } | null> | null, images?: Array<{ __typename?: 'Image', url: string, width?: number | null, height?: number | null } | null> | null } | null> | null, user?: { __typename?: 'User', id: string, nickname?: string | null, firstProfileImage?: { __typename?: 'UserProfileImage', id: string, url: string } | null } | null, images?: Array<{ __typename?: 'Image', url: string, width?: number | null, height?: number | null } | null> | null } };

export type QuestionAndReplysScreenDataQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type QuestionAndReplysScreenDataQuery = { __typename?: 'Query', question: { __typename?: 'Question', id: number, text: string, createdAt: string, isAnonymity: boolean, replys?: Array<{ __typename?: 'QuestionReply', id: number, text: string, createdAt: string, isAnonymity: boolean, user?: { __typename?: 'User', id: string, nickname?: string | null, firstProfileImage?: { __typename?: 'UserProfileImage', id: string, url: string } | null } | null, images?: Array<{ __typename?: 'Image', url: string } | null> | null, replys?: Array<{ __typename?: 'QuestionReply', id: number } | null> | null } | null> | null, user?: { __typename?: 'User', id: string, nickname?: string | null, firstProfileImage?: { __typename?: 'UserProfileImage', id: string, url: string } | null } | null, images?: Array<{ __typename?: 'Image', url: string } | null> | null } };

export type QuestionReplysScreenDataQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type QuestionReplysScreenDataQuery = { __typename?: 'Query', questionReply: { __typename?: 'QuestionReply', id: number, text: string, createdAt: string, isAnonymity: boolean, replys?: Array<{ __typename?: 'QuestionReply', id: number, text: string, createdAt: string, isAnonymity: boolean, user?: { __typename?: 'User', id: string, nickname?: string | null, firstProfileImage?: { __typename?: 'UserProfileImage', id: string, url: string } | null } | null, images?: Array<{ __typename?: 'Image', url: string } | null> | null, replys?: Array<{ __typename?: 'QuestionReply', id: number } | null> | null } | null> | null, questionReply?: { __typename?: 'QuestionReply', id: number, text: string } | null, question?: { __typename?: 'Question', id: number, text: string } | null, user?: { __typename?: 'User', id: string, nickname?: string | null, firstProfileImage?: { __typename?: 'UserProfileImage', id: string, url: string } | null } | null, images?: Array<{ __typename?: 'Image', url: string } | null> | null } };

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
export const QuestionCardFragmentDoc = gql`
    fragment QuestionCard on QuestionEntity {
  ... on QuestionEntity {
    id
    text
    createdAt
    isAnonymity
    user {
      id
      nickname
      firstProfileImage {
        ...ProfileImage
      }
    }
    images {
      url
    }
    replys {
      id
    }
  }
}
    ${ProfileImageFragmentDoc}`;
export const UserCardFragmentDoc = gql`
    fragment UserCard on User {
  id
  nickname
  age
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
  createdAt
  liked
  likeCount
  user {
    id
    nickname
    firstProfileImage {
      ...ProfileImage
    }
  }
  replys {
    id
  }
  images {
    url
    width
    height
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
export const CreatePostDocument = gql`
    mutation CreatePost($input: CreatePostInput!) {
  createPost(input: $input) {
    id
    ...PostCard
  }
}
    ${PostCardFragmentDoc}`;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const CreateQuestionDocument = gql`
    mutation CreateQuestion($input: CreateQuestionInput!) {
  createQuestion(input: $input) {
    id
    text
    createdAt
    isAnonymity
    latitude
    longitude
    displayRange
  }
}
    `;
export type CreateQuestionMutationFn = Apollo.MutationFunction<CreateQuestionMutation, CreateQuestionMutationVariables>;

/**
 * __useCreateQuestionMutation__
 *
 * To run a mutation, you first call `useCreateQuestionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateQuestionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createQuestionMutation, { data, loading, error }] = useCreateQuestionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateQuestionMutation(baseOptions?: Apollo.MutationHookOptions<CreateQuestionMutation, CreateQuestionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateQuestionMutation, CreateQuestionMutationVariables>(CreateQuestionDocument, options);
      }
export type CreateQuestionMutationHookResult = ReturnType<typeof useCreateQuestionMutation>;
export type CreateQuestionMutationResult = Apollo.MutationResult<CreateQuestionMutation>;
export type CreateQuestionMutationOptions = Apollo.BaseMutationOptions<CreateQuestionMutation, CreateQuestionMutationVariables>;
export const CreateQuestionReplyDocument = gql`
    mutation CreateQuestionReply($input: CreateQuestionReplyInput!) {
  createQuestionReply(input: $input) {
    ...QuestionCard
  }
}
    ${QuestionCardFragmentDoc}`;
export type CreateQuestionReplyMutationFn = Apollo.MutationFunction<CreateQuestionReplyMutation, CreateQuestionReplyMutationVariables>;

/**
 * __useCreateQuestionReplyMutation__
 *
 * To run a mutation, you first call `useCreateQuestionReplyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateQuestionReplyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createQuestionReplyMutation, { data, loading, error }] = useCreateQuestionReplyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateQuestionReplyMutation(baseOptions?: Apollo.MutationHookOptions<CreateQuestionReplyMutation, CreateQuestionReplyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateQuestionReplyMutation, CreateQuestionReplyMutationVariables>(CreateQuestionReplyDocument, options);
      }
export type CreateQuestionReplyMutationHookResult = ReturnType<typeof useCreateQuestionReplyMutation>;
export type CreateQuestionReplyMutationResult = Apollo.MutationResult<CreateQuestionReplyMutation>;
export type CreateQuestionReplyMutationOptions = Apollo.BaseMutationOptions<CreateQuestionReplyMutation, CreateQuestionReplyMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($id: Int!) {
  deletePost(id: $id) {
    id
  }
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const DeleteQuestionDocument = gql`
    mutation DeleteQuestion($id: Int!) {
  deleteQuestion(id: $id) {
    id
  }
}
    `;
export type DeleteQuestionMutationFn = Apollo.MutationFunction<DeleteQuestionMutation, DeleteQuestionMutationVariables>;

/**
 * __useDeleteQuestionMutation__
 *
 * To run a mutation, you first call `useDeleteQuestionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteQuestionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteQuestionMutation, { data, loading, error }] = useDeleteQuestionMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteQuestionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteQuestionMutation, DeleteQuestionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteQuestionMutation, DeleteQuestionMutationVariables>(DeleteQuestionDocument, options);
      }
export type DeleteQuestionMutationHookResult = ReturnType<typeof useDeleteQuestionMutation>;
export type DeleteQuestionMutationResult = Apollo.MutationResult<DeleteQuestionMutation>;
export type DeleteQuestionMutationOptions = Apollo.BaseMutationOptions<DeleteQuestionMutation, DeleteQuestionMutationVariables>;
export const LikePostDocument = gql`
    mutation LikePost($id: Int!) {
  likePost(id: $id) {
    id
    liked
    likeCount
  }
}
    `;
export type LikePostMutationFn = Apollo.MutationFunction<LikePostMutation, LikePostMutationVariables>;

/**
 * __useLikePostMutation__
 *
 * To run a mutation, you first call `useLikePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likePostMutation, { data, loading, error }] = useLikePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLikePostMutation(baseOptions?: Apollo.MutationHookOptions<LikePostMutation, LikePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikePostMutation, LikePostMutationVariables>(LikePostDocument, options);
      }
export type LikePostMutationHookResult = ReturnType<typeof useLikePostMutation>;
export type LikePostMutationResult = Apollo.MutationResult<LikePostMutation>;
export type LikePostMutationOptions = Apollo.BaseMutationOptions<LikePostMutation, LikePostMutationVariables>;
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
export const UnlikePostDocument = gql`
    mutation UnlikePost($id: Int!) {
  unlikePost(id: $id) {
    id
    liked
    likeCount
  }
}
    `;
export type UnlikePostMutationFn = Apollo.MutationFunction<UnlikePostMutation, UnlikePostMutationVariables>;

/**
 * __useUnlikePostMutation__
 *
 * To run a mutation, you first call `useUnlikePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnlikePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unlikePostMutation, { data, loading, error }] = useUnlikePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUnlikePostMutation(baseOptions?: Apollo.MutationHookOptions<UnlikePostMutation, UnlikePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnlikePostMutation, UnlikePostMutationVariables>(UnlikePostDocument, options);
      }
export type UnlikePostMutationHookResult = ReturnType<typeof useUnlikePostMutation>;
export type UnlikePostMutationResult = Apollo.MutationResult<UnlikePostMutation>;
export type UnlikePostMutationOptions = Apollo.BaseMutationOptions<UnlikePostMutation, UnlikePostMutationVariables>;
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
export const MyBasicInfoDocument = gql`
    query MyBasicInfo {
  me {
    id
    nickname
    sex
    birthYear
    birthMonth
    birthDay
    statusMessage
    bio
  }
}
    `;

/**
 * __useMyBasicInfoQuery__
 *
 * To run a query within a React component, call `useMyBasicInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyBasicInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyBasicInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyBasicInfoQuery(baseOptions?: Apollo.QueryHookOptions<MyBasicInfoQuery, MyBasicInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyBasicInfoQuery, MyBasicInfoQueryVariables>(MyBasicInfoDocument, options);
      }
export function useMyBasicInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyBasicInfoQuery, MyBasicInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyBasicInfoQuery, MyBasicInfoQueryVariables>(MyBasicInfoDocument, options);
        }
export type MyBasicInfoQueryHookResult = ReturnType<typeof useMyBasicInfoQuery>;
export type MyBasicInfoLazyQueryHookResult = ReturnType<typeof useMyBasicInfoLazyQuery>;
export type MyBasicInfoQueryResult = Apollo.QueryResult<MyBasicInfoQuery, MyBasicInfoQueryVariables>;
export const MyIdDocument = gql`
    query MyId {
  me {
    id
  }
}
    `;

/**
 * __useMyIdQuery__
 *
 * To run a query within a React component, call `useMyIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyIdQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyIdQuery(baseOptions?: Apollo.QueryHookOptions<MyIdQuery, MyIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyIdQuery, MyIdQueryVariables>(MyIdDocument, options);
      }
export function useMyIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyIdQuery, MyIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyIdQuery, MyIdQueryVariables>(MyIdDocument, options);
        }
export type MyIdQueryHookResult = ReturnType<typeof useMyIdQuery>;
export type MyIdLazyQueryHookResult = ReturnType<typeof useMyIdLazyQuery>;
export type MyIdQueryResult = Apollo.QueryResult<MyIdQuery, MyIdQueryVariables>;
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
export const QuestionsScreenDataDocument = gql`
    query QuestionsScreenData($first: Int, $after: String) {
  questions(first: $first, after: $after) {
    edges {
      node {
        ...QuestionCard
      }
      cursor
    }
    pageInfo {
      ...PageInfo
    }
  }
}
    ${QuestionCardFragmentDoc}
${PageInfoFragmentDoc}`;

/**
 * __useQuestionsScreenDataQuery__
 *
 * To run a query within a React component, call `useQuestionsScreenDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuestionsScreenDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuestionsScreenDataQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useQuestionsScreenDataQuery(baseOptions?: Apollo.QueryHookOptions<QuestionsScreenDataQuery, QuestionsScreenDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QuestionsScreenDataQuery, QuestionsScreenDataQueryVariables>(QuestionsScreenDataDocument, options);
      }
export function useQuestionsScreenDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QuestionsScreenDataQuery, QuestionsScreenDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QuestionsScreenDataQuery, QuestionsScreenDataQueryVariables>(QuestionsScreenDataDocument, options);
        }
export type QuestionsScreenDataQueryHookResult = ReturnType<typeof useQuestionsScreenDataQuery>;
export type QuestionsScreenDataLazyQueryHookResult = ReturnType<typeof useQuestionsScreenDataLazyQuery>;
export type QuestionsScreenDataQueryResult = Apollo.QueryResult<QuestionsScreenDataQuery, QuestionsScreenDataQueryVariables>;
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
export const PostDetailScreenDataDocument = gql`
    query PostDetailScreenData($id: Int!) {
  post(id: $id) {
    replyToPost {
      ...PostCard
    }
    ...PostCard
    replys {
      replyToPost {
        ...PostCard
      }
      ...PostCard
    }
  }
}
    ${PostCardFragmentDoc}`;

/**
 * __usePostDetailScreenDataQuery__
 *
 * To run a query within a React component, call `usePostDetailScreenDataQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostDetailScreenDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostDetailScreenDataQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePostDetailScreenDataQuery(baseOptions: Apollo.QueryHookOptions<PostDetailScreenDataQuery, PostDetailScreenDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostDetailScreenDataQuery, PostDetailScreenDataQueryVariables>(PostDetailScreenDataDocument, options);
      }
export function usePostDetailScreenDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostDetailScreenDataQuery, PostDetailScreenDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostDetailScreenDataQuery, PostDetailScreenDataQueryVariables>(PostDetailScreenDataDocument, options);
        }
export type PostDetailScreenDataQueryHookResult = ReturnType<typeof usePostDetailScreenDataQuery>;
export type PostDetailScreenDataLazyQueryHookResult = ReturnType<typeof usePostDetailScreenDataLazyQuery>;
export type PostDetailScreenDataQueryResult = Apollo.QueryResult<PostDetailScreenDataQuery, PostDetailScreenDataQueryVariables>;
export const QuestionAndReplysScreenDataDocument = gql`
    query QuestionAndReplysScreenData($id: Int!) {
  question(id: $id) {
    ...QuestionCard
    replys {
      ...QuestionCard
    }
  }
}
    ${QuestionCardFragmentDoc}`;

/**
 * __useQuestionAndReplysScreenDataQuery__
 *
 * To run a query within a React component, call `useQuestionAndReplysScreenDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuestionAndReplysScreenDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuestionAndReplysScreenDataQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useQuestionAndReplysScreenDataQuery(baseOptions: Apollo.QueryHookOptions<QuestionAndReplysScreenDataQuery, QuestionAndReplysScreenDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QuestionAndReplysScreenDataQuery, QuestionAndReplysScreenDataQueryVariables>(QuestionAndReplysScreenDataDocument, options);
      }
export function useQuestionAndReplysScreenDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QuestionAndReplysScreenDataQuery, QuestionAndReplysScreenDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QuestionAndReplysScreenDataQuery, QuestionAndReplysScreenDataQueryVariables>(QuestionAndReplysScreenDataDocument, options);
        }
export type QuestionAndReplysScreenDataQueryHookResult = ReturnType<typeof useQuestionAndReplysScreenDataQuery>;
export type QuestionAndReplysScreenDataLazyQueryHookResult = ReturnType<typeof useQuestionAndReplysScreenDataLazyQuery>;
export type QuestionAndReplysScreenDataQueryResult = Apollo.QueryResult<QuestionAndReplysScreenDataQuery, QuestionAndReplysScreenDataQueryVariables>;
export const QuestionReplysScreenDataDocument = gql`
    query QuestionReplysScreenData($id: Int!) {
  questionReply(id: $id) {
    ...QuestionCard
    replys {
      ...QuestionCard
    }
    questionReply {
      id
      text
    }
    question {
      id
      text
    }
  }
}
    ${QuestionCardFragmentDoc}`;

/**
 * __useQuestionReplysScreenDataQuery__
 *
 * To run a query within a React component, call `useQuestionReplysScreenDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuestionReplysScreenDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuestionReplysScreenDataQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useQuestionReplysScreenDataQuery(baseOptions: Apollo.QueryHookOptions<QuestionReplysScreenDataQuery, QuestionReplysScreenDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QuestionReplysScreenDataQuery, QuestionReplysScreenDataQueryVariables>(QuestionReplysScreenDataDocument, options);
      }
export function useQuestionReplysScreenDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QuestionReplysScreenDataQuery, QuestionReplysScreenDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QuestionReplysScreenDataQuery, QuestionReplysScreenDataQueryVariables>(QuestionReplysScreenDataDocument, options);
        }
export type QuestionReplysScreenDataQueryHookResult = ReturnType<typeof useQuestionReplysScreenDataQuery>;
export type QuestionReplysScreenDataLazyQueryHookResult = ReturnType<typeof useQuestionReplysScreenDataLazyQuery>;
export type QuestionReplysScreenDataQueryResult = Apollo.QueryResult<QuestionReplysScreenDataQuery, QuestionReplysScreenDataQueryVariables>;
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