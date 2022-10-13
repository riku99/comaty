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

export enum BlockUserError {
  AlreadyBlockedUser = 'ALREADY_BLOCKED_USER'
}

export enum CreateMessageError {
  NotFoundMessageRoom = 'NOT_FOUND_MESSAGE_ROOM'
}

export type CreateMessageInput = {
  text: Scalars['String'];
};

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

export type CreateStoryInput = {
  backgroundColors?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  file: Scalars['Upload'];
  thumbnailFile?: InputMaybe<Scalars['Upload']>;
  type: StoryType;
};

export enum CreateUserError {
  AlreadyUserExisting = 'ALREADY_USER_EXISTING'
}

export type CreateUserInput = {
  email: Scalars['String'];
  idToken: Scalars['String'];
};

export type CreateUserTagInput = {
  text: Scalars['String'];
};

export enum DeleteMessageRoomError {
  NotFound = 'NOT_FOUND'
}

export enum DeleteProfileImageError {
  UnexpectedError = 'UNEXPECTED_ERROR'
}

export enum DeleteStoryError {
  InvalidId = 'INVALID_ID'
}

export enum ForbiddenError {
  AuthFailure = 'AUTH_FAILURE'
}

export enum GetMessageRoomError {
  NotFound = 'NOT_FOUND'
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

export enum GetStoryError {
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
  age?: Maybe<Scalars['Int']>;
  bio?: Maybe<Scalars['String']>;
  birthDay?: Maybe<Scalars['Int']>;
  birthMonth?: Maybe<Scalars['Int']>;
  birthYear?: Maybe<Scalars['Int']>;
  firstProfileImage?: Maybe<UserProfileImage>;
  height?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  initialStatusCompletion: Scalars['Boolean'];
  messageRoomsFromMySelf?: Maybe<Array<Maybe<MessageRoom>>>;
  messageRoomsFromOtherParty?: Maybe<Array<Maybe<MessageRoom>>>;
  myTags?: Maybe<Array<Maybe<UserTag>>>;
  nickname?: Maybe<Scalars['String']>;
  profileImages?: Maybe<Array<Maybe<UserProfileImage>>>;
  sex?: Maybe<Sex>;
  statusMessage?: Maybe<Scalars['String']>;
  stories?: Maybe<Array<Maybe<Story>>>;
};

export type Message = {
  __typename?: 'Message';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  room?: Maybe<MessageRoom>;
  sender?: Maybe<User>;
  text: Scalars['String'];
};

export type MessageConnection = {
  __typename?: 'MessageConnection';
  edges: Array<Maybe<MessageEdge>>;
  pageInfo: PageInfo;
};

export type MessageEdge = {
  __typename?: 'MessageEdge';
  cursor: Scalars['String'];
  node: Message;
};

export type MessageRoom = {
  __typename?: 'MessageRoom';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  messages?: Maybe<MessageConnection>;
  partner?: Maybe<User>;
  recipient?: Maybe<User>;
  sender?: Maybe<User>;
  updatedAt: Scalars['String'];
};


export type MessageRoomMessagesArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  blockUser?: Maybe<User>;
  createMessage: Message;
  createMessageRoom: MessageRoom;
  createPost: Post;
  createQuestion: Question;
  createQuestionReply: QuestionReply;
  createStory: Story;
  createStorySeen?: Maybe<StorySeen>;
  createUser: Me;
  createUserTag: UserTag;
  deleteMessageRoom?: Maybe<MessageRoom>;
  deletePost?: Maybe<Post>;
  deleteProfileImage?: Maybe<UserProfileImage>;
  deleteQuestion?: Maybe<Question>;
  deleteQuestionReply?: Maybe<QuestionReply>;
  deleteStory?: Maybe<Story>;
  deleteUserTag?: Maybe<UserTag>;
  likePost: Post;
  reportPost?: Maybe<Post>;
  reportStory?: Maybe<Story>;
  unblockUser?: Maybe<User>;
  unlikePost?: Maybe<Post>;
  updateInitialStatus: Me;
  updateMe: Me;
  updateUserProfile: Me;
  uploadProfileImage: UserProfileImage;
};


export type MutationBlockUserArgs = {
  id: Scalars['ID'];
};


export type MutationCreateMessageArgs = {
  input: CreateMessageInput;
  roomId: Scalars['Int'];
};


export type MutationCreateMessageRoomArgs = {
  recipientId: Scalars['ID'];
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


export type MutationCreateStoryArgs = {
  input: CreateStoryInput;
};


export type MutationCreateStorySeenArgs = {
  storyId: Scalars['Int'];
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationCreateUserTagArgs = {
  input: CreateUserTagInput;
};


export type MutationDeleteMessageRoomArgs = {
  id: Scalars['Int'];
};


export type MutationDeletePostArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteProfileImageArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteQuestionArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteQuestionReplyArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteStoryArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteUserTagArgs = {
  id: Scalars['Int'];
};


export type MutationLikePostArgs = {
  id: Scalars['Int'];
};


export type MutationReportPostArgs = {
  id: Scalars['Int'];
};


export type MutationReportStoryArgs = {
  id: Scalars['Int'];
};


export type MutationUnblockUserArgs = {
  id: Scalars['ID'];
};


export type MutationUnlikePostArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateInitialStatusArgs = {
  input: UpdateInitialStatusInput;
};


export type MutationUpdateMeArgs = {
  input: UpdateMeInput;
};


export type MutationUpdateUserProfileArgs = {
  input?: InputMaybe<UpdateUserProfileInput>;
};


export type MutationUploadProfileImageArgs = {
  input: UploadProfileImageInput;
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
  messageRoom: MessageRoom;
  nearbyUsers: UserConnection;
  post: Post;
  posts: PostConnection;
  question: Question;
  questionReply: QuestionReply;
  questions: QuestionConnection;
  stories: StoryConnection;
  story: Story;
  storyUsers: UserConnection;
  user: User;
};


export type QueryMessageRoomArgs = {
  id: Scalars['Int'];
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


export type QueryStoryArgs = {
  id: Scalars['Int'];
};


export type QueryStoryUsersArgs = {
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
  backgroundColors?: Maybe<Array<Maybe<Scalars['String']>>>;
  createdAt: Scalars['String'];
  height?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  seen?: Maybe<Scalars['Boolean']>;
  seenList?: Maybe<StorySeenConnection>;
  thumbnailUrl?: Maybe<Scalars['String']>;
  type: StoryType;
  url: Scalars['String'];
  user?: Maybe<User>;
  width?: Maybe<Scalars['Int']>;
};


export type StorySeenListArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
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

export type StorySeen = {
  __typename?: 'StorySeen';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  story?: Maybe<Story>;
  user?: Maybe<User>;
};

export type StorySeenConnection = {
  __typename?: 'StorySeenConnection';
  edges: Array<Maybe<StorySeenEdge>>;
  pageInfo: PageInfo;
};

export type StorySeenEdge = {
  __typename?: 'StorySeenEdge';
  cursor: Scalars['String'];
  node: StorySeen;
};

export enum StoryType {
  Photo = 'PHOTO',
  Video = 'VIDEO'
}

export type UpdateInitialStatusInput = {
  birthDay: Scalars['Int'];
  birthMonth: Scalars['Int'];
  birthYear: Scalars['Int'];
  nickname: Scalars['String'];
  sex: Sex;
};

export type UpdateMeInput = {
  bio: Scalars['String'];
  height?: InputMaybe<Scalars['Int']>;
  nickname: Scalars['String'];
  statusMessage: Scalars['String'];
};

export type UpdateUserProfileInput = {
  bio?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['Int']>;
};

export type UploadProfileImageInput = {
  file: Scalars['Upload'];
};

export type User = UserEntity & {
  __typename?: 'User';
  age?: Maybe<Scalars['Int']>;
  bio?: Maybe<Scalars['String']>;
  blocked?: Maybe<Scalars['Boolean']>;
  blocking?: Maybe<Scalars['Boolean']>;
  firstProfileImage?: Maybe<UserProfileImage>;
  height?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  myTags?: Maybe<Array<Maybe<UserTag>>>;
  nickname?: Maybe<Scalars['String']>;
  profileImages: Array<Maybe<UserProfileImage>>;
  sex?: Maybe<Sex>;
  statusMessage?: Maybe<Scalars['String']>;
  stories?: Maybe<Array<Maybe<Story>>>;
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
  age?: Maybe<Scalars['Int']>;
  bio?: Maybe<Scalars['String']>;
  firstProfileImage?: Maybe<UserProfileImage>;
  height?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  myTags?: Maybe<Array<Maybe<UserTag>>>;
  nickname?: Maybe<Scalars['String']>;
  profileImages?: Maybe<Array<Maybe<UserProfileImage>>>;
  sex?: Maybe<Sex>;
  statusMessage?: Maybe<Scalars['String']>;
  stories?: Maybe<Array<Maybe<Story>>>;
};

export enum UserGetError {
  NotFound = 'NOT_FOUND'
}

export type UserProfileImage = {
  __typename?: 'UserProfileImage';
  height?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  url: Scalars['String'];
  width?: Maybe<Scalars['Int']>;
};

export type UserTag = {
  __typename?: 'UserTag';
  id: Scalars['Int'];
  text: Scalars['String'];
  user?: Maybe<User>;
};

export type DeleteMessageRoomMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteMessageRoomMutation = { __typename?: 'Mutation', deleteMessageRoom?: { __typename?: 'MessageRoom', id: number } | null };

export type BlockUserMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type BlockUserMutation = { __typename?: 'Mutation', blockUser?: { __typename?: 'User', id: string, blocking?: boolean | null, blocked?: boolean | null } | null };

export type CreateMessageRoomMutationVariables = Exact<{
  recipientId: Scalars['ID'];
}>;


export type CreateMessageRoomMutation = { __typename?: 'Mutation', createMessageRoom: { __typename?: 'MessageRoom', id: number } };

export type CreateMyTagMutationVariables = Exact<{
  input: CreateUserTagInput;
}>;


export type CreateMyTagMutation = { __typename?: 'Mutation', createUserTag: { __typename?: 'UserTag', id: number, text: string } };

export type CreatePostMutationVariables = Exact<{
  input: CreatePostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: number, text: string, createdAt: string, liked?: boolean | null, likeCount?: number | null, user?: { __typename?: 'User', id: string, nickname?: string | null, firstProfileImage?: { __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } | null } | null, images?: Array<{ __typename?: 'Image', url: string, width?: number | null, height?: number | null } | null> | null } };

export type CreateQuestionMutationVariables = Exact<{
  input: CreateQuestionInput;
}>;


export type CreateQuestionMutation = { __typename?: 'Mutation', createQuestion: { __typename?: 'Question', id: number, text: string, createdAt: string, isAnonymity: boolean, latitude: number, longitude: number, displayRange: ApproximateRange } };

export type CreateQuestionReplyMutationVariables = Exact<{
  input: CreateQuestionReplyInput;
}>;


export type CreateQuestionReplyMutation = { __typename?: 'Mutation', createQuestionReply: { __typename?: 'QuestionReply', id: number, text: string, createdAt: string, isAnonymity: boolean, user?: { __typename?: 'User', id: string, nickname?: string | null, firstProfileImage?: { __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } | null } | null, images?: Array<{ __typename?: 'Image', url: string } | null> | null, replys?: Array<{ __typename?: 'QuestionReply', id: number } | null> | null } };

export type CreateStoryMutationVariables = Exact<{
  input: CreateStoryInput;
}>;


export type CreateStoryMutation = { __typename?: 'Mutation', createStory: { __typename?: 'Story', id: number, user?: { __typename?: 'User', id: string, nickname?: string | null, firstProfileImage?: { __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } | null, stories?: Array<{ __typename?: 'Story', id: number, url: string, backgroundColors?: Array<string | null> | null, type: StoryType, createdAt: string, thumbnailUrl?: string | null, seen?: boolean | null } | null> | null } | null } };

export type CreateStorySeenMutationVariables = Exact<{
  storyId: Scalars['Int'];
}>;


export type CreateStorySeenMutation = { __typename?: 'Mutation', createStorySeen?: { __typename?: 'StorySeen', id: number, story?: { __typename?: 'Story', id: number, seen?: boolean | null } | null } | null };

export type DeleteMyTagMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteMyTagMutation = { __typename?: 'Mutation', deleteUserTag?: { __typename?: 'UserTag', id: number } | null };

export type DeletePostMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost?: { __typename?: 'Post', id: number } | null };

export type DeleteProfileImageMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteProfileImageMutation = { __typename?: 'Mutation', deleteProfileImage?: { __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } | null };

export type DeleteQuestionMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteQuestionMutation = { __typename?: 'Mutation', deleteQuestion?: { __typename?: 'Question', id: number } | null };

export type DeleteStoryMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteStoryMutation = { __typename?: 'Mutation', deleteStory?: { __typename?: 'Story', id: number } | null };

export type LikePostMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type LikePostMutation = { __typename?: 'Mutation', likePost: { __typename?: 'Post', id: number, liked?: boolean | null, likeCount?: number | null } };

export type ReportPostMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ReportPostMutation = { __typename?: 'Mutation', reportPost?: { __typename?: 'Post', id: number } | null };

export type ReportStoryMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ReportStoryMutation = { __typename?: 'Mutation', reportStory?: { __typename?: 'Story', id: number } | null };

export type SendMessageMutationVariables = Exact<{
  roomId: Scalars['Int'];
  input: CreateMessageInput;
}>;


export type SendMessageMutation = { __typename?: 'Mutation', createMessage: { __typename?: 'Message', id: number, text: string, createdAt: string, sender?: { __typename?: 'User', id: string, firstProfileImage?: { __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } | null } | null } };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'Me', id: string, nickname?: string | null, sex?: Sex | null, initialStatusCompletion: boolean } };

export type UnblockUserMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UnblockUserMutation = { __typename?: 'Mutation', unblockUser?: { __typename?: 'User', id: string, nickname?: string | null, blocked?: boolean | null } | null };

export type UnlikePostMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type UnlikePostMutation = { __typename?: 'Mutation', unlikePost?: { __typename?: 'Post', id: number, liked?: boolean | null, likeCount?: number | null } | null };

export type UpdateInitialStatusMutationVariables = Exact<{
  input: UpdateInitialStatusInput;
}>;


export type UpdateInitialStatusMutation = { __typename?: 'Mutation', updateInitialStatus: { __typename?: 'Me', id: string, nickname?: string | null, sex?: Sex | null, initialStatusCompletion: boolean, birthYear?: number | null, birthMonth?: number | null, birthDay?: number | null } };

export type UpdateMeMutationVariables = Exact<{
  input: UpdateMeInput;
}>;


export type UpdateMeMutation = { __typename?: 'Mutation', updateMe: { __typename?: 'Me', id: string, nickname?: string | null, bio?: string | null, statusMessage?: string | null, height?: number | null, profileImages?: Array<{ __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } | null> | null, firstProfileImage?: { __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } | null } };

export type UploadProfileImageMutationVariables = Exact<{
  input: UploadProfileImageInput;
}>;


export type UploadProfileImageMutation = { __typename?: 'Mutation', uploadProfileImage: { __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } };

export type MyProfileImagesQueryVariables = Exact<{ [key: string]: never; }>;


export type MyProfileImagesQuery = { __typename?: 'Query', me?: { __typename?: 'Me', profileImages?: Array<{ __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } | null> | null, firstProfileImage?: { __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } | null } | null };

export type MyBasicInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type MyBasicInfoQuery = { __typename?: 'Query', me?: { __typename?: 'Me', id: string, nickname?: string | null, sex?: Sex | null, birthYear?: number | null, birthMonth?: number | null, birthDay?: number | null, statusMessage?: string | null, bio?: string | null } | null };

export type MyIdQueryVariables = Exact<{ [key: string]: never; }>;


export type MyIdQuery = { __typename?: 'Query', me?: { __typename?: 'Me', id: string } | null };

export type GetInitialDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetInitialDataQuery = { __typename?: 'Query', me?: { __typename?: 'Me', id: string, nickname?: string | null, sex?: Sex | null, initialStatusCompletion: boolean, age?: number | null, birthYear?: number | null, birthMonth?: number | null, birthDay?: number | null, height?: number | null, statusMessage?: string | null, bio?: string | null, profileImages?: Array<{ __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } | null> | null, myTags?: Array<{ __typename?: 'UserTag', id: number, text: string } | null> | null } | null };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', me?: { __typename?: 'Me', id: string, nickname?: string | null, sex?: Sex | null, initialStatusCompletion: boolean, birthYear?: number | null, birthMonth?: number | null, birthDay?: number | null } | null };

export type GetInitialStatusCompletionQueryVariables = Exact<{ [key: string]: never; }>;


export type GetInitialStatusCompletionQuery = { __typename?: 'Query', me?: { __typename?: 'Me', initialStatusCompletion: boolean } | null };

export type MyProfileFragment = { __typename?: 'Me', id: string, nickname?: string | null, sex?: Sex | null, initialStatusCompletion: boolean, age?: number | null, birthYear?: number | null, birthMonth?: number | null, birthDay?: number | null, height?: number | null, statusMessage?: string | null, bio?: string | null, profileImages?: Array<{ __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } | null> | null, myTags?: Array<{ __typename?: 'UserTag', id: number, text: string } | null> | null };

export type PageInfoFragment = { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null };

export type PostCardFragment = { __typename?: 'Post', id: number, text: string, createdAt: string, liked?: boolean | null, likeCount?: number | null, user?: { __typename?: 'User', id: string, nickname?: string | null, firstProfileImage?: { __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } | null } | null, images?: Array<{ __typename?: 'Image', url: string, width?: number | null, height?: number | null } | null> | null };

type QuestionCard_Question_Fragment = { __typename?: 'Question', id: number, text: string, createdAt: string, isAnonymity: boolean, user?: { __typename?: 'User', id: string, nickname?: string | null, firstProfileImage?: { __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } | null } | null, images?: Array<{ __typename?: 'Image', url: string } | null> | null, replys?: Array<{ __typename?: 'QuestionReply', id: number } | null> | null };

type QuestionCard_QuestionReply_Fragment = { __typename?: 'QuestionReply', id: number, text: string, createdAt: string, isAnonymity: boolean, user?: { __typename?: 'User', id: string, nickname?: string | null, firstProfileImage?: { __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } | null } | null, images?: Array<{ __typename?: 'Image', url: string } | null> | null, replys?: Array<{ __typename?: 'QuestionReply', id: number } | null> | null };

export type QuestionCardFragment = QuestionCard_Question_Fragment | QuestionCard_QuestionReply_Fragment;

export type ProfileImageFragment = { __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null };

type StoryUserCircle_Me_Fragment = { __typename?: 'Me', id: string, nickname?: string | null, firstProfileImage?: { __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } | null, stories?: Array<{ __typename?: 'Story', id: number, url: string, backgroundColors?: Array<string | null> | null, type: StoryType, createdAt: string, thumbnailUrl?: string | null, seen?: boolean | null } | null> | null };

type StoryUserCircle_User_Fragment = { __typename?: 'User', id: string, nickname?: string | null, firstProfileImage?: { __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } | null, stories?: Array<{ __typename?: 'Story', id: number, url: string, backgroundColors?: Array<string | null> | null, type: StoryType, createdAt: string, thumbnailUrl?: string | null, seen?: boolean | null } | null> | null };

export type StoryUserCircleFragment = StoryUserCircle_Me_Fragment | StoryUserCircle_User_Fragment;

export type UserCardFragment = { __typename?: 'User', id: string, nickname?: string | null, age?: number | null, statusMessage?: string | null, profileImages: Array<{ __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } | null> };

export type UserCardListFragment = { __typename?: 'UserConnection', edges: Array<{ __typename?: 'UserEdge', node: { __typename?: 'User', id: string, nickname?: string | null, age?: number | null, statusMessage?: string | null, profileImages: Array<{ __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } | null> } } | null> };

export type EditProfileScreenDataQueryVariables = Exact<{ [key: string]: never; }>;


export type EditProfileScreenDataQuery = { __typename?: 'Query', me?: { __typename?: 'Me', id: string, nickname?: string | null, bio?: string | null, statusMessage?: string | null, height?: number | null, profileImages?: Array<{ __typename?: 'UserProfileImage', id: number, url: string } | null> | null, myTags?: Array<{ __typename?: 'UserTag', id: number, text: string } | null> | null } | null };

export type HomeScreenDataQueryVariables = Exact<{
  nearbyUsersFirst?: InputMaybe<Scalars['Int']>;
  nearbyUsersAfter?: InputMaybe<Scalars['String']>;
  storiesFirst?: InputMaybe<Scalars['Int']>;
  storiesAfter?: InputMaybe<Scalars['String']>;
}>;


export type HomeScreenDataQuery = { __typename?: 'Query', nearbyUsers: { __typename?: 'UserConnection', edges: Array<{ __typename?: 'UserEdge', cursor: string, node: { __typename?: 'User', id: string, nickname?: string | null, age?: number | null, statusMessage?: string | null, profileImages: Array<{ __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } | null> } } | null>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null } }, me?: { __typename?: 'Me', id: string, nickname?: string | null, firstProfileImage?: { __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } | null, stories?: Array<{ __typename?: 'Story', id: number, url: string, backgroundColors?: Array<string | null> | null, type: StoryType, createdAt: string, thumbnailUrl?: string | null, seen?: boolean | null } | null> | null } | null, storyUsers: { __typename?: 'UserConnection', edges: Array<{ __typename?: 'UserEdge', node: { __typename?: 'User', id: string, nickname?: string | null, firstProfileImage?: { __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } | null, stories?: Array<{ __typename?: 'Story', id: number, url: string, backgroundColors?: Array<string | null> | null, type: StoryType, createdAt: string, thumbnailUrl?: string | null, seen?: boolean | null } | null> | null } } | null>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null } } };

export type HomeNearByUsersQueryVariables = Exact<{
  nearbyUsersFirst?: InputMaybe<Scalars['Int']>;
  nearbyUsersAfter?: InputMaybe<Scalars['String']>;
}>;


export type HomeNearByUsersQuery = { __typename?: 'Query', nearbyUsers: { __typename?: 'UserConnection', edges: Array<{ __typename?: 'UserEdge', cursor: string, node: { __typename?: 'User', id: string, nickname?: string | null, age?: number | null, statusMessage?: string | null, profileImages: Array<{ __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } | null> } } | null>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null } } };

export type HomeStoriesQueryVariables = Exact<{
  storiesFirst?: InputMaybe<Scalars['Int']>;
  storiesAfter?: InputMaybe<Scalars['String']>;
}>;


export type HomeStoriesQuery = { __typename?: 'Query', me?: { __typename?: 'Me', id: string, nickname?: string | null, firstProfileImage?: { __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } | null, stories?: Array<{ __typename?: 'Story', id: number, url: string, backgroundColors?: Array<string | null> | null, type: StoryType, createdAt: string, thumbnailUrl?: string | null, seen?: boolean | null } | null> | null } | null, storyUsers: { __typename?: 'UserConnection', edges: Array<{ __typename?: 'UserEdge', node: { __typename?: 'User', id: string, nickname?: string | null, firstProfileImage?: { __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } | null, stories?: Array<{ __typename?: 'Story', id: number, url: string, backgroundColors?: Array<string | null> | null, type: StoryType, createdAt: string, thumbnailUrl?: string | null, seen?: boolean | null } | null> | null } } | null>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null } } };

export type HomeNearByUsersFragment = { __typename?: 'Query', nearbyUsers: { __typename?: 'UserConnection', edges: Array<{ __typename?: 'UserEdge', cursor: string, node: { __typename?: 'User', id: string, nickname?: string | null, age?: number | null, statusMessage?: string | null, profileImages: Array<{ __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } | null> } } | null>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null } } };

export type HomeStoriesFragment = { __typename?: 'Query', me?: { __typename?: 'Me', id: string, nickname?: string | null, firstProfileImage?: { __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } | null, stories?: Array<{ __typename?: 'Story', id: number, url: string, backgroundColors?: Array<string | null> | null, type: StoryType, createdAt: string, thumbnailUrl?: string | null, seen?: boolean | null } | null> | null } | null, storyUsers: { __typename?: 'UserConnection', edges: Array<{ __typename?: 'UserEdge', node: { __typename?: 'User', id: string, nickname?: string | null, firstProfileImage?: { __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } | null, stories?: Array<{ __typename?: 'Story', id: number, url: string, backgroundColors?: Array<string | null> | null, type: StoryType, createdAt: string, thumbnailUrl?: string | null, seen?: boolean | null } | null> | null } } | null>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null } } };

export type MessageRoomScreenDataQueryVariables = Exact<{
  id: Scalars['Int'];
  messagesAfter?: InputMaybe<Scalars['String']>;
  messagesFirst?: InputMaybe<Scalars['Int']>;
}>;


export type MessageRoomScreenDataQuery = { __typename?: 'Query', messageRoom: { __typename?: 'MessageRoom', id: number, messages?: { __typename?: 'MessageConnection', edges: Array<{ __typename?: 'MessageEdge', cursor: string, node: { __typename?: 'Message', id: number, text: string, createdAt: string, sender?: { __typename?: 'User', id: string, firstProfileImage?: { __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } | null } | null } } | null>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null } } | null } };

export type RoomMessagesInMessageRoomScreenQueryVariables = Exact<{
  id: Scalars['Int'];
  messagesAfter?: InputMaybe<Scalars['String']>;
  messagesFirst?: InputMaybe<Scalars['Int']>;
}>;


export type RoomMessagesInMessageRoomScreenQuery = { __typename?: 'Query', messageRoom: { __typename?: 'MessageRoom', id: number, messages?: { __typename?: 'MessageConnection', edges: Array<{ __typename?: 'MessageEdge', cursor: string, node: { __typename?: 'Message', id: number, text: string, createdAt: string, sender?: { __typename?: 'User', id: string, firstProfileImage?: { __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } | null } | null } } | null>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null } } | null } };

export type NicknameAndProfileImageInMessageRoomScreenQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type NicknameAndProfileImageInMessageRoomScreenQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, nickname?: string | null, firstProfileImage?: { __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } | null } };

export type MessageBubbleDataInMessageRoomFragment = { __typename?: 'Message', id: number, text: string, createdAt: string, sender?: { __typename?: 'User', id: string, firstProfileImage?: { __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } | null } | null };

export type MessageRoomListScreenDataQueryVariables = Exact<{ [key: string]: never; }>;


export type MessageRoomListScreenDataQuery = { __typename?: 'Query', me?: { __typename?: 'Me', id: string, messageRoomsFromMySelf?: Array<{ __typename?: 'MessageRoom', id: number, partner?: { __typename?: 'User', id: string, nickname?: string | null, firstProfileImage?: { __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } | null } | null, messages?: { __typename?: 'MessageConnection', edges: Array<{ __typename?: 'MessageEdge', node: { __typename?: 'Message', id: number, text: string } } | null> } | null } | null> | null, messageRoomsFromOtherParty?: Array<{ __typename?: 'MessageRoom', id: number, partner?: { __typename?: 'User', id: string, nickname?: string | null, firstProfileImage?: { __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } | null } | null, messages?: { __typename?: 'MessageConnection', edges: Array<{ __typename?: 'MessageEdge', node: { __typename?: 'Message', id: number, text: string } } | null> } | null } | null> | null } | null };

export type MessageRoomListFromMySelfScreenDataQueryVariables = Exact<{ [key: string]: never; }>;


export type MessageRoomListFromMySelfScreenDataQuery = { __typename?: 'Query', me?: { __typename?: 'Me', id: string, messageRoomsFromMySelf?: Array<{ __typename?: 'MessageRoom', id: number, partner?: { __typename?: 'User', id: string, nickname?: string | null, firstProfileImage?: { __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } | null } | null, messages?: { __typename?: 'MessageConnection', edges: Array<{ __typename?: 'MessageEdge', node: { __typename?: 'Message', id: number, text: string } } | null> } | null } | null> | null } | null };

export type MessageRoomListFromOtherPartyScreenDataQueryVariables = Exact<{ [key: string]: never; }>;


export type MessageRoomListFromOtherPartyScreenDataQuery = { __typename?: 'Query', me?: { __typename?: 'Me', id: string, messageRoomsFromOtherParty?: Array<{ __typename?: 'MessageRoom', id: number, partner?: { __typename?: 'User', id: string, nickname?: string | null, firstProfileImage?: { __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } | null } | null, messages?: { __typename?: 'MessageConnection', edges: Array<{ __typename?: 'MessageEdge', node: { __typename?: 'Message', id: number, text: string } } | null> } | null } | null> | null } | null };

export type RoomListItemInMessageRoomListScreenFragment = { __typename?: 'MessageRoom', id: number, partner?: { __typename?: 'User', id: string, nickname?: string | null, firstProfileImage?: { __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } | null } | null, messages?: { __typename?: 'MessageConnection', edges: Array<{ __typename?: 'MessageEdge', node: { __typename?: 'Message', id: number, text: string } } | null> } | null };

export type MessageRoomListFromMySelfFragment = { __typename?: 'Query', me?: { __typename?: 'Me', id: string, messageRoomsFromMySelf?: Array<{ __typename?: 'MessageRoom', id: number, partner?: { __typename?: 'User', id: string, nickname?: string | null, firstProfileImage?: { __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } | null } | null, messages?: { __typename?: 'MessageConnection', edges: Array<{ __typename?: 'MessageEdge', node: { __typename?: 'Message', id: number, text: string } } | null> } | null } | null> | null } | null };

export type MessageRoomListFromOtherPartyFragment = { __typename?: 'Query', me?: { __typename?: 'Me', id: string, messageRoomsFromOtherParty?: Array<{ __typename?: 'MessageRoom', id: number, partner?: { __typename?: 'User', id: string, nickname?: string | null, firstProfileImage?: { __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } | null } | null, messages?: { __typename?: 'MessageConnection', edges: Array<{ __typename?: 'MessageEdge', node: { __typename?: 'Message', id: number, text: string } } | null> } | null } | null> | null } | null };

export type MyPageScreenDataQueryVariables = Exact<{ [key: string]: never; }>;


export type MyPageScreenDataQuery = { __typename?: 'Query', me?: { __typename?: 'Me', id: string, nickname?: string | null, age?: number | null, statusMessage?: string | null, bio?: string | null, profileImages?: Array<{ __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } | null> | null, firstProfileImage?: { __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } | null } | null };

export type MyTagSelectionScreenDataQueryVariables = Exact<{ [key: string]: never; }>;


export type MyTagSelectionScreenDataQuery = { __typename?: 'Query', me?: { __typename?: 'Me', id: string, myTags?: Array<{ __typename?: 'UserTag', id: number, text: string } | null> | null } | null };

export type NearbyUsersScreenDataQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
}>;


export type NearbyUsersScreenDataQuery = { __typename?: 'Query', nearbyUsers: { __typename?: 'UserConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null }, edges: Array<{ __typename?: 'UserEdge', node: { __typename?: 'User', id: string, nickname?: string | null, age?: number | null, statusMessage?: string | null, profileImages: Array<{ __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } | null> } } | null> } };

export type PostDetailScreenDataQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PostDetailScreenDataQuery = { __typename?: 'Query', post: { __typename?: 'Post', id: number, text: string, createdAt: string, liked?: boolean | null, likeCount?: number | null, replyToPost?: { __typename?: 'Post', id: number, text: string, createdAt: string, liked?: boolean | null, likeCount?: number | null, user?: { __typename?: 'User', id: string, nickname?: string | null, firstProfileImage?: { __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } | null } | null, images?: Array<{ __typename?: 'Image', url: string, width?: number | null, height?: number | null } | null> | null } | null, replys?: Array<{ __typename?: 'Post', id: number, text: string, createdAt: string, liked?: boolean | null, likeCount?: number | null, replyToPost?: { __typename?: 'Post', id: number, text: string, createdAt: string, liked?: boolean | null, likeCount?: number | null, user?: { __typename?: 'User', id: string, nickname?: string | null, firstProfileImage?: { __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } | null } | null, images?: Array<{ __typename?: 'Image', url: string, width?: number | null, height?: number | null } | null> | null } | null, user?: { __typename?: 'User', id: string, nickname?: string | null, firstProfileImage?: { __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } | null } | null, images?: Array<{ __typename?: 'Image', url: string, width?: number | null, height?: number | null } | null> | null } | null> | null, user?: { __typename?: 'User', id: string, nickname?: string | null, firstProfileImage?: { __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } | null } | null, images?: Array<{ __typename?: 'Image', url: string, width?: number | null, height?: number | null } | null> | null } };

export type QuestionAndReplysScreenDataQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type QuestionAndReplysScreenDataQuery = { __typename?: 'Query', question: { __typename?: 'Question', id: number, text: string, createdAt: string, isAnonymity: boolean, replys?: Array<{ __typename?: 'QuestionReply', id: number, text: string, createdAt: string, isAnonymity: boolean, user?: { __typename?: 'User', id: string, nickname?: string | null, firstProfileImage?: { __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } | null } | null, images?: Array<{ __typename?: 'Image', url: string } | null> | null, replys?: Array<{ __typename?: 'QuestionReply', id: number } | null> | null } | null> | null, user?: { __typename?: 'User', id: string, nickname?: string | null, firstProfileImage?: { __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } | null } | null, images?: Array<{ __typename?: 'Image', url: string } | null> | null } };

export type QuestionReplysScreenDataQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type QuestionReplysScreenDataQuery = { __typename?: 'Query', questionReply: { __typename?: 'QuestionReply', id: number, text: string, createdAt: string, isAnonymity: boolean, replys?: Array<{ __typename?: 'QuestionReply', id: number, text: string, createdAt: string, isAnonymity: boolean, user?: { __typename?: 'User', id: string, nickname?: string | null, firstProfileImage?: { __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } | null } | null, images?: Array<{ __typename?: 'Image', url: string } | null> | null, replys?: Array<{ __typename?: 'QuestionReply', id: number } | null> | null } | null> | null, questionReply?: { __typename?: 'QuestionReply', id: number, text: string } | null, question?: { __typename?: 'Question', id: number, text: string } | null, user?: { __typename?: 'User', id: string, nickname?: string | null, firstProfileImage?: { __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } | null } | null, images?: Array<{ __typename?: 'Image', url: string } | null> | null } };

export type OneUserStoriesQueryVariables = Exact<{
  id: Scalars['ID'];
  viewersFirst?: InputMaybe<Scalars['Int']>;
}>;


export type OneUserStoriesQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, nickname?: string | null, stories?: Array<{ __typename?: 'Story', id: number, url: string, type: StoryType, backgroundColors?: Array<string | null> | null, thumbnailUrl?: string | null, createdAt: string, seenList?: { __typename?: 'StorySeenConnection', edges: Array<{ __typename?: 'StorySeenEdge', node: { __typename?: 'StorySeen', id: number, user?: { __typename?: 'User', id: string, firstProfileImage?: { __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } | null } | null } } | null> } | null } | null> | null, firstProfileImage?: { __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } | null } };

export type AfterDeletingStoryQueryVariables = Exact<{ [key: string]: never; }>;


export type AfterDeletingStoryQuery = { __typename?: 'Query', me?: { __typename?: 'Me', id: string, nickname?: string | null, firstProfileImage?: { __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } | null, stories?: Array<{ __typename?: 'Story', id: number, url: string, backgroundColors?: Array<string | null> | null, type: StoryType, createdAt: string, thumbnailUrl?: string | null, seen?: boolean | null } | null> | null } | null };

export type StoryUserMetaDataFragment = { __typename?: 'User', id: string, nickname?: string | null, firstProfileImage?: { __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } | null };

export type ViewersInStoriesFragment = { __typename?: 'Story', seenList?: { __typename?: 'StorySeenConnection', edges: Array<{ __typename?: 'StorySeenEdge', node: { __typename?: 'StorySeen', id: number, user?: { __typename?: 'User', id: string, firstProfileImage?: { __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } | null } | null } } | null> } | null };

export type StoryViewersScreenDataQueryVariables = Exact<{
  storyId: Scalars['Int'];
  seenListFirst?: InputMaybe<Scalars['Int']>;
  seenListAfter?: InputMaybe<Scalars['String']>;
}>;


export type StoryViewersScreenDataQuery = { __typename?: 'Query', story: { __typename?: 'Story', id: number, seenList?: { __typename?: 'StorySeenConnection', edges: Array<{ __typename?: 'StorySeenEdge', node: { __typename?: 'StorySeen', id: number, user?: { __typename?: 'User', id: string, nickname?: string | null, firstProfileImage?: { __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } | null } | null } } | null>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null } } | null } };

export type AfterCreateingStoryQueryVariables = Exact<{ [key: string]: never; }>;


export type AfterCreateingStoryQuery = { __typename?: 'Query', me?: { __typename?: 'Me', id: string, nickname?: string | null, firstProfileImage?: { __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } | null, stories?: Array<{ __typename?: 'Story', id: number, url: string, backgroundColors?: Array<string | null> | null, type: StoryType, createdAt: string, thumbnailUrl?: string | null, seen?: boolean | null } | null> | null } | null };

export type TimelineScreenDataQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
}>;


export type TimelineScreenDataQuery = { __typename?: 'Query', posts: { __typename?: 'PostConnection', edges: Array<{ __typename?: 'PostEdge', cursor: string, node: { __typename?: 'Post', id: number, text: string, createdAt: string, liked?: boolean | null, likeCount?: number | null, user?: { __typename?: 'User', id: string, nickname?: string | null, firstProfileImage?: { __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } | null } | null, images?: Array<{ __typename?: 'Image', url: string, width?: number | null, height?: number | null } | null> | null } } | null>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null } } };

export type ProfileImagesInUserProfileFragment = { __typename?: 'User', profileImages: Array<{ __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } | null> };

export type BottomSheetContentInUserProfileFragment = { __typename?: 'User', id: string, nickname?: string | null, bio?: string | null, age?: number | null, blocking?: boolean | null, blocked?: boolean | null, height?: number | null, myTags?: Array<{ __typename?: 'UserTag', id: number, text: string } | null> | null };

export type BottomButtonGroupInUserProfileFragment = { __typename?: 'User', id: string, nickname?: string | null, firstProfileImage?: { __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } | null, stories?: Array<{ __typename?: 'Story', id: number, url: string, backgroundColors?: Array<string | null> | null, type: StoryType, createdAt: string, thumbnailUrl?: string | null, seen?: boolean | null } | null> | null };

export type UserProfileScreenDataQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UserProfileScreenDataQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, blocking?: boolean | null, blocked?: boolean | null, nickname?: string | null, bio?: string | null, age?: number | null, height?: number | null, myTags?: Array<{ __typename?: 'UserTag', id: number, text: string } | null> | null, profileImages: Array<{ __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } | null>, firstProfileImage?: { __typename?: 'UserProfileImage', id: number, url: string, width?: number | null, height?: number | null } | null, stories?: Array<{ __typename?: 'Story', id: number, url: string, backgroundColors?: Array<string | null> | null, type: StoryType, createdAt: string, thumbnailUrl?: string | null, seen?: boolean | null } | null> | null } };

export const ProfileImageFragmentDoc = gql`
    fragment ProfileImage on UserProfileImage {
  id
  url
  width
  height
}
    `;
export const MyProfileFragmentDoc = gql`
    fragment MyProfile on Me {
  id
  nickname
  sex
  initialStatusCompletion
  age
  birthYear
  birthMonth
  birthDay
  height
  statusMessage
  bio
  profileImages {
    id
    ...ProfileImage
  }
  myTags {
    id
    text
  }
}
    ${ProfileImageFragmentDoc}`;
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
  images {
    url
    width
    height
  }
}
    ${ProfileImageFragmentDoc}`;
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
export const PageInfoFragmentDoc = gql`
    fragment PageInfo on PageInfo {
  hasNextPage
  hasPreviousPage
  startCursor
  endCursor
}
    `;
export const HomeNearByUsersFragmentDoc = gql`
    fragment HomeNearByUsers on Query {
  nearbyUsers(first: $nearbyUsersFirst, after: $nearbyUsersAfter) {
    edges {
      node {
        ...UserCard
      }
      cursor
    }
    pageInfo {
      ...PageInfo
    }
  }
}
    ${UserCardFragmentDoc}
${PageInfoFragmentDoc}`;
export const StoryUserCircleFragmentDoc = gql`
    fragment StoryUserCircle on UserEntity {
  id
  nickname
  firstProfileImage {
    ...ProfileImage
  }
  stories {
    id
    url
    backgroundColors
    type
    createdAt
    thumbnailUrl
    seen
  }
}
    ${ProfileImageFragmentDoc}`;
export const HomeStoriesFragmentDoc = gql`
    fragment HomeStories on Query {
  me {
    ...StoryUserCircle
  }
  storyUsers(first: $storiesFirst, after: $storiesAfter) {
    edges {
      node {
        ...StoryUserCircle
      }
    }
    pageInfo {
      ...PageInfo
    }
  }
}
    ${StoryUserCircleFragmentDoc}
${PageInfoFragmentDoc}`;
export const MessageBubbleDataInMessageRoomFragmentDoc = gql`
    fragment MessageBubbleDataInMessageRoom on Message {
  id
  text
  createdAt
  sender {
    id
    firstProfileImage {
      ...ProfileImage
    }
  }
}
    ${ProfileImageFragmentDoc}`;
export const RoomListItemInMessageRoomListScreenFragmentDoc = gql`
    fragment RoomListItemInMessageRoomListScreen on MessageRoom {
  id
  partner {
    id
    nickname
    firstProfileImage {
      ...ProfileImage
    }
  }
  messages(first: 1) {
    edges {
      node {
        id
        text
      }
    }
  }
}
    ${ProfileImageFragmentDoc}`;
export const MessageRoomListFromMySelfFragmentDoc = gql`
    fragment MessageRoomListFromMySelf on Query {
  me {
    id
    messageRoomsFromMySelf {
      ...RoomListItemInMessageRoomListScreen
    }
  }
}
    ${RoomListItemInMessageRoomListScreenFragmentDoc}`;
export const MessageRoomListFromOtherPartyFragmentDoc = gql`
    fragment MessageRoomListFromOtherParty on Query {
  me {
    id
    messageRoomsFromOtherParty {
      ...RoomListItemInMessageRoomListScreen
    }
  }
}
    ${RoomListItemInMessageRoomListScreenFragmentDoc}`;
export const StoryUserMetaDataFragmentDoc = gql`
    fragment StoryUserMetaData on User {
  id
  nickname
  firstProfileImage {
    ...ProfileImage
  }
}
    ${ProfileImageFragmentDoc}`;
export const ViewersInStoriesFragmentDoc = gql`
    fragment ViewersInStories on Story {
  seenList(first: $viewersFirst) {
    edges {
      node {
        id
        user {
          id
          firstProfileImage {
            ...ProfileImage
          }
        }
      }
    }
  }
}
    ${ProfileImageFragmentDoc}`;
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
  blocking
  blocked
  height
  myTags {
    id
    text
  }
}
    `;
export const BottomButtonGroupInUserProfileFragmentDoc = gql`
    fragment BottomButtonGroupInUserProfile on User {
  id
  ...StoryUserCircle
}
    ${StoryUserCircleFragmentDoc}`;
export const DeleteMessageRoomDocument = gql`
    mutation DeleteMessageRoom($id: Int!) {
  deleteMessageRoom(id: $id) {
    id
  }
}
    `;
export type DeleteMessageRoomMutationFn = Apollo.MutationFunction<DeleteMessageRoomMutation, DeleteMessageRoomMutationVariables>;

/**
 * __useDeleteMessageRoomMutation__
 *
 * To run a mutation, you first call `useDeleteMessageRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMessageRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMessageRoomMutation, { data, loading, error }] = useDeleteMessageRoomMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteMessageRoomMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMessageRoomMutation, DeleteMessageRoomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMessageRoomMutation, DeleteMessageRoomMutationVariables>(DeleteMessageRoomDocument, options);
      }
export type DeleteMessageRoomMutationHookResult = ReturnType<typeof useDeleteMessageRoomMutation>;
export type DeleteMessageRoomMutationResult = Apollo.MutationResult<DeleteMessageRoomMutation>;
export type DeleteMessageRoomMutationOptions = Apollo.BaseMutationOptions<DeleteMessageRoomMutation, DeleteMessageRoomMutationVariables>;
export const BlockUserDocument = gql`
    mutation BlockUser($id: ID!) {
  blockUser(id: $id) {
    id
    blocking
    blocked
  }
}
    `;
export type BlockUserMutationFn = Apollo.MutationFunction<BlockUserMutation, BlockUserMutationVariables>;

/**
 * __useBlockUserMutation__
 *
 * To run a mutation, you first call `useBlockUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBlockUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [blockUserMutation, { data, loading, error }] = useBlockUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useBlockUserMutation(baseOptions?: Apollo.MutationHookOptions<BlockUserMutation, BlockUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BlockUserMutation, BlockUserMutationVariables>(BlockUserDocument, options);
      }
export type BlockUserMutationHookResult = ReturnType<typeof useBlockUserMutation>;
export type BlockUserMutationResult = Apollo.MutationResult<BlockUserMutation>;
export type BlockUserMutationOptions = Apollo.BaseMutationOptions<BlockUserMutation, BlockUserMutationVariables>;
export const CreateMessageRoomDocument = gql`
    mutation CreateMessageRoom($recipientId: ID!) {
  createMessageRoom(recipientId: $recipientId) {
    id
  }
}
    `;
export type CreateMessageRoomMutationFn = Apollo.MutationFunction<CreateMessageRoomMutation, CreateMessageRoomMutationVariables>;

/**
 * __useCreateMessageRoomMutation__
 *
 * To run a mutation, you first call `useCreateMessageRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMessageRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMessageRoomMutation, { data, loading, error }] = useCreateMessageRoomMutation({
 *   variables: {
 *      recipientId: // value for 'recipientId'
 *   },
 * });
 */
export function useCreateMessageRoomMutation(baseOptions?: Apollo.MutationHookOptions<CreateMessageRoomMutation, CreateMessageRoomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMessageRoomMutation, CreateMessageRoomMutationVariables>(CreateMessageRoomDocument, options);
      }
export type CreateMessageRoomMutationHookResult = ReturnType<typeof useCreateMessageRoomMutation>;
export type CreateMessageRoomMutationResult = Apollo.MutationResult<CreateMessageRoomMutation>;
export type CreateMessageRoomMutationOptions = Apollo.BaseMutationOptions<CreateMessageRoomMutation, CreateMessageRoomMutationVariables>;
export const CreateMyTagDocument = gql`
    mutation CreateMyTag($input: CreateUserTagInput!) {
  createUserTag(input: $input) {
    id
    text
  }
}
    `;
export type CreateMyTagMutationFn = Apollo.MutationFunction<CreateMyTagMutation, CreateMyTagMutationVariables>;

/**
 * __useCreateMyTagMutation__
 *
 * To run a mutation, you first call `useCreateMyTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMyTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMyTagMutation, { data, loading, error }] = useCreateMyTagMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateMyTagMutation(baseOptions?: Apollo.MutationHookOptions<CreateMyTagMutation, CreateMyTagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMyTagMutation, CreateMyTagMutationVariables>(CreateMyTagDocument, options);
      }
export type CreateMyTagMutationHookResult = ReturnType<typeof useCreateMyTagMutation>;
export type CreateMyTagMutationResult = Apollo.MutationResult<CreateMyTagMutation>;
export type CreateMyTagMutationOptions = Apollo.BaseMutationOptions<CreateMyTagMutation, CreateMyTagMutationVariables>;
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
export const CreateStoryDocument = gql`
    mutation CreateStory($input: CreateStoryInput!) {
  createStory(input: $input) {
    id
    user {
      ...StoryUserCircle
    }
  }
}
    ${StoryUserCircleFragmentDoc}`;
export type CreateStoryMutationFn = Apollo.MutationFunction<CreateStoryMutation, CreateStoryMutationVariables>;

/**
 * __useCreateStoryMutation__
 *
 * To run a mutation, you first call `useCreateStoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStoryMutation, { data, loading, error }] = useCreateStoryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateStoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateStoryMutation, CreateStoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateStoryMutation, CreateStoryMutationVariables>(CreateStoryDocument, options);
      }
export type CreateStoryMutationHookResult = ReturnType<typeof useCreateStoryMutation>;
export type CreateStoryMutationResult = Apollo.MutationResult<CreateStoryMutation>;
export type CreateStoryMutationOptions = Apollo.BaseMutationOptions<CreateStoryMutation, CreateStoryMutationVariables>;
export const CreateStorySeenDocument = gql`
    mutation CreateStorySeen($storyId: Int!) {
  createStorySeen(storyId: $storyId) {
    id
    story {
      id
      seen
    }
  }
}
    `;
export type CreateStorySeenMutationFn = Apollo.MutationFunction<CreateStorySeenMutation, CreateStorySeenMutationVariables>;

/**
 * __useCreateStorySeenMutation__
 *
 * To run a mutation, you first call `useCreateStorySeenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStorySeenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStorySeenMutation, { data, loading, error }] = useCreateStorySeenMutation({
 *   variables: {
 *      storyId: // value for 'storyId'
 *   },
 * });
 */
export function useCreateStorySeenMutation(baseOptions?: Apollo.MutationHookOptions<CreateStorySeenMutation, CreateStorySeenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateStorySeenMutation, CreateStorySeenMutationVariables>(CreateStorySeenDocument, options);
      }
export type CreateStorySeenMutationHookResult = ReturnType<typeof useCreateStorySeenMutation>;
export type CreateStorySeenMutationResult = Apollo.MutationResult<CreateStorySeenMutation>;
export type CreateStorySeenMutationOptions = Apollo.BaseMutationOptions<CreateStorySeenMutation, CreateStorySeenMutationVariables>;
export const DeleteMyTagDocument = gql`
    mutation DeleteMyTag($id: Int!) {
  deleteUserTag(id: $id) {
    id
  }
}
    `;
export type DeleteMyTagMutationFn = Apollo.MutationFunction<DeleteMyTagMutation, DeleteMyTagMutationVariables>;

/**
 * __useDeleteMyTagMutation__
 *
 * To run a mutation, you first call `useDeleteMyTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMyTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMyTagMutation, { data, loading, error }] = useDeleteMyTagMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteMyTagMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMyTagMutation, DeleteMyTagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMyTagMutation, DeleteMyTagMutationVariables>(DeleteMyTagDocument, options);
      }
export type DeleteMyTagMutationHookResult = ReturnType<typeof useDeleteMyTagMutation>;
export type DeleteMyTagMutationResult = Apollo.MutationResult<DeleteMyTagMutation>;
export type DeleteMyTagMutationOptions = Apollo.BaseMutationOptions<DeleteMyTagMutation, DeleteMyTagMutationVariables>;
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
export const DeleteProfileImageDocument = gql`
    mutation DeleteProfileImage($id: Int!) {
  deleteProfileImage(id: $id) {
    id
    url
    width
    height
  }
}
    `;
export type DeleteProfileImageMutationFn = Apollo.MutationFunction<DeleteProfileImageMutation, DeleteProfileImageMutationVariables>;

/**
 * __useDeleteProfileImageMutation__
 *
 * To run a mutation, you first call `useDeleteProfileImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProfileImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProfileImageMutation, { data, loading, error }] = useDeleteProfileImageMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteProfileImageMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProfileImageMutation, DeleteProfileImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProfileImageMutation, DeleteProfileImageMutationVariables>(DeleteProfileImageDocument, options);
      }
export type DeleteProfileImageMutationHookResult = ReturnType<typeof useDeleteProfileImageMutation>;
export type DeleteProfileImageMutationResult = Apollo.MutationResult<DeleteProfileImageMutation>;
export type DeleteProfileImageMutationOptions = Apollo.BaseMutationOptions<DeleteProfileImageMutation, DeleteProfileImageMutationVariables>;
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
export const DeleteStoryDocument = gql`
    mutation DeleteStory($id: Int!) {
  deleteStory(id: $id) {
    id
  }
}
    `;
export type DeleteStoryMutationFn = Apollo.MutationFunction<DeleteStoryMutation, DeleteStoryMutationVariables>;

/**
 * __useDeleteStoryMutation__
 *
 * To run a mutation, you first call `useDeleteStoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteStoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteStoryMutation, { data, loading, error }] = useDeleteStoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteStoryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteStoryMutation, DeleteStoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteStoryMutation, DeleteStoryMutationVariables>(DeleteStoryDocument, options);
      }
export type DeleteStoryMutationHookResult = ReturnType<typeof useDeleteStoryMutation>;
export type DeleteStoryMutationResult = Apollo.MutationResult<DeleteStoryMutation>;
export type DeleteStoryMutationOptions = Apollo.BaseMutationOptions<DeleteStoryMutation, DeleteStoryMutationVariables>;
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
export const ReportPostDocument = gql`
    mutation ReportPost($id: Int!) {
  reportPost(id: $id) {
    id
  }
}
    `;
export type ReportPostMutationFn = Apollo.MutationFunction<ReportPostMutation, ReportPostMutationVariables>;

/**
 * __useReportPostMutation__
 *
 * To run a mutation, you first call `useReportPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReportPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reportPostMutation, { data, loading, error }] = useReportPostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useReportPostMutation(baseOptions?: Apollo.MutationHookOptions<ReportPostMutation, ReportPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReportPostMutation, ReportPostMutationVariables>(ReportPostDocument, options);
      }
export type ReportPostMutationHookResult = ReturnType<typeof useReportPostMutation>;
export type ReportPostMutationResult = Apollo.MutationResult<ReportPostMutation>;
export type ReportPostMutationOptions = Apollo.BaseMutationOptions<ReportPostMutation, ReportPostMutationVariables>;
export const ReportStoryDocument = gql`
    mutation ReportStory($id: Int!) {
  reportStory(id: $id) {
    id
  }
}
    `;
export type ReportStoryMutationFn = Apollo.MutationFunction<ReportStoryMutation, ReportStoryMutationVariables>;

/**
 * __useReportStoryMutation__
 *
 * To run a mutation, you first call `useReportStoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReportStoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reportStoryMutation, { data, loading, error }] = useReportStoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useReportStoryMutation(baseOptions?: Apollo.MutationHookOptions<ReportStoryMutation, ReportStoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReportStoryMutation, ReportStoryMutationVariables>(ReportStoryDocument, options);
      }
export type ReportStoryMutationHookResult = ReturnType<typeof useReportStoryMutation>;
export type ReportStoryMutationResult = Apollo.MutationResult<ReportStoryMutation>;
export type ReportStoryMutationOptions = Apollo.BaseMutationOptions<ReportStoryMutation, ReportStoryMutationVariables>;
export const SendMessageDocument = gql`
    mutation SendMessage($roomId: Int!, $input: CreateMessageInput!) {
  createMessage(roomId: $roomId, input: $input) {
    id
    ...MessageBubbleDataInMessageRoom
  }
}
    ${MessageBubbleDataInMessageRoomFragmentDoc}`;
export type SendMessageMutationFn = Apollo.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      roomId: // value for 'roomId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSendMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendMessageMutation, SendMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, options);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;
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
export const UnblockUserDocument = gql`
    mutation UnblockUser($id: ID!) {
  unblockUser(id: $id) {
    id
    nickname
    blocked
  }
}
    `;
export type UnblockUserMutationFn = Apollo.MutationFunction<UnblockUserMutation, UnblockUserMutationVariables>;

/**
 * __useUnblockUserMutation__
 *
 * To run a mutation, you first call `useUnblockUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnblockUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unblockUserMutation, { data, loading, error }] = useUnblockUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUnblockUserMutation(baseOptions?: Apollo.MutationHookOptions<UnblockUserMutation, UnblockUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnblockUserMutation, UnblockUserMutationVariables>(UnblockUserDocument, options);
      }
export type UnblockUserMutationHookResult = ReturnType<typeof useUnblockUserMutation>;
export type UnblockUserMutationResult = Apollo.MutationResult<UnblockUserMutation>;
export type UnblockUserMutationOptions = Apollo.BaseMutationOptions<UnblockUserMutation, UnblockUserMutationVariables>;
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
export const UpdateMeDocument = gql`
    mutation UpdateMe($input: UpdateMeInput!) {
  updateMe(input: $input) {
    id
    nickname
    bio
    statusMessage
    bio
    height
    profileImages {
      ...ProfileImage
    }
    firstProfileImage {
      ...ProfileImage
    }
  }
}
    ${ProfileImageFragmentDoc}`;
export type UpdateMeMutationFn = Apollo.MutationFunction<UpdateMeMutation, UpdateMeMutationVariables>;

/**
 * __useUpdateMeMutation__
 *
 * To run a mutation, you first call `useUpdateMeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMeMutation, { data, loading, error }] = useUpdateMeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateMeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMeMutation, UpdateMeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMeMutation, UpdateMeMutationVariables>(UpdateMeDocument, options);
      }
export type UpdateMeMutationHookResult = ReturnType<typeof useUpdateMeMutation>;
export type UpdateMeMutationResult = Apollo.MutationResult<UpdateMeMutation>;
export type UpdateMeMutationOptions = Apollo.BaseMutationOptions<UpdateMeMutation, UpdateMeMutationVariables>;
export const UploadProfileImageDocument = gql`
    mutation UploadProfileImage($input: UploadProfileImageInput!) {
  uploadProfileImage(input: $input) {
    id
    url
    width
    height
  }
}
    `;
export type UploadProfileImageMutationFn = Apollo.MutationFunction<UploadProfileImageMutation, UploadProfileImageMutationVariables>;

/**
 * __useUploadProfileImageMutation__
 *
 * To run a mutation, you first call `useUploadProfileImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadProfileImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadProfileImageMutation, { data, loading, error }] = useUploadProfileImageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUploadProfileImageMutation(baseOptions?: Apollo.MutationHookOptions<UploadProfileImageMutation, UploadProfileImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadProfileImageMutation, UploadProfileImageMutationVariables>(UploadProfileImageDocument, options);
      }
export type UploadProfileImageMutationHookResult = ReturnType<typeof useUploadProfileImageMutation>;
export type UploadProfileImageMutationResult = Apollo.MutationResult<UploadProfileImageMutation>;
export type UploadProfileImageMutationOptions = Apollo.BaseMutationOptions<UploadProfileImageMutation, UploadProfileImageMutationVariables>;
export const MyProfileImagesDocument = gql`
    query MyProfileImages {
  me {
    profileImages {
      ...ProfileImage
    }
    firstProfileImage {
      ...ProfileImage
    }
  }
}
    ${ProfileImageFragmentDoc}`;

/**
 * __useMyProfileImagesQuery__
 *
 * To run a query within a React component, call `useMyProfileImagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyProfileImagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyProfileImagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyProfileImagesQuery(baseOptions?: Apollo.QueryHookOptions<MyProfileImagesQuery, MyProfileImagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyProfileImagesQuery, MyProfileImagesQueryVariables>(MyProfileImagesDocument, options);
      }
export function useMyProfileImagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyProfileImagesQuery, MyProfileImagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyProfileImagesQuery, MyProfileImagesQueryVariables>(MyProfileImagesDocument, options);
        }
export type MyProfileImagesQueryHookResult = ReturnType<typeof useMyProfileImagesQuery>;
export type MyProfileImagesLazyQueryHookResult = ReturnType<typeof useMyProfileImagesLazyQuery>;
export type MyProfileImagesQueryResult = Apollo.QueryResult<MyProfileImagesQuery, MyProfileImagesQueryVariables>;
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
    ...MyProfile
  }
}
    ${MyProfileFragmentDoc}`;

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
export const EditProfileScreenDataDocument = gql`
    query EditProfileScreenData {
  me {
    id
    nickname
    bio
    statusMessage
    height
    profileImages {
      id
      url
    }
    myTags {
      id
      text
    }
  }
}
    `;

/**
 * __useEditProfileScreenDataQuery__
 *
 * To run a query within a React component, call `useEditProfileScreenDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useEditProfileScreenDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEditProfileScreenDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useEditProfileScreenDataQuery(baseOptions?: Apollo.QueryHookOptions<EditProfileScreenDataQuery, EditProfileScreenDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EditProfileScreenDataQuery, EditProfileScreenDataQueryVariables>(EditProfileScreenDataDocument, options);
      }
export function useEditProfileScreenDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EditProfileScreenDataQuery, EditProfileScreenDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EditProfileScreenDataQuery, EditProfileScreenDataQueryVariables>(EditProfileScreenDataDocument, options);
        }
export type EditProfileScreenDataQueryHookResult = ReturnType<typeof useEditProfileScreenDataQuery>;
export type EditProfileScreenDataLazyQueryHookResult = ReturnType<typeof useEditProfileScreenDataLazyQuery>;
export type EditProfileScreenDataQueryResult = Apollo.QueryResult<EditProfileScreenDataQuery, EditProfileScreenDataQueryVariables>;
export const HomeScreenDataDocument = gql`
    query HomeScreenData($nearbyUsersFirst: Int, $nearbyUsersAfter: String, $storiesFirst: Int, $storiesAfter: String) {
  ...HomeNearByUsers
  ...HomeStories
}
    ${HomeNearByUsersFragmentDoc}
${HomeStoriesFragmentDoc}`;

/**
 * __useHomeScreenDataQuery__
 *
 * To run a query within a React component, call `useHomeScreenDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useHomeScreenDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHomeScreenDataQuery({
 *   variables: {
 *      nearbyUsersFirst: // value for 'nearbyUsersFirst'
 *      nearbyUsersAfter: // value for 'nearbyUsersAfter'
 *      storiesFirst: // value for 'storiesFirst'
 *      storiesAfter: // value for 'storiesAfter'
 *   },
 * });
 */
export function useHomeScreenDataQuery(baseOptions?: Apollo.QueryHookOptions<HomeScreenDataQuery, HomeScreenDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HomeScreenDataQuery, HomeScreenDataQueryVariables>(HomeScreenDataDocument, options);
      }
export function useHomeScreenDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HomeScreenDataQuery, HomeScreenDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HomeScreenDataQuery, HomeScreenDataQueryVariables>(HomeScreenDataDocument, options);
        }
export type HomeScreenDataQueryHookResult = ReturnType<typeof useHomeScreenDataQuery>;
export type HomeScreenDataLazyQueryHookResult = ReturnType<typeof useHomeScreenDataLazyQuery>;
export type HomeScreenDataQueryResult = Apollo.QueryResult<HomeScreenDataQuery, HomeScreenDataQueryVariables>;
export const HomeNearByUsersDocument = gql`
    query HomeNearByUsers($nearbyUsersFirst: Int, $nearbyUsersAfter: String) {
  ...HomeNearByUsers
}
    ${HomeNearByUsersFragmentDoc}`;

/**
 * __useHomeNearByUsersQuery__
 *
 * To run a query within a React component, call `useHomeNearByUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useHomeNearByUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHomeNearByUsersQuery({
 *   variables: {
 *      nearbyUsersFirst: // value for 'nearbyUsersFirst'
 *      nearbyUsersAfter: // value for 'nearbyUsersAfter'
 *   },
 * });
 */
export function useHomeNearByUsersQuery(baseOptions?: Apollo.QueryHookOptions<HomeNearByUsersQuery, HomeNearByUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HomeNearByUsersQuery, HomeNearByUsersQueryVariables>(HomeNearByUsersDocument, options);
      }
export function useHomeNearByUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HomeNearByUsersQuery, HomeNearByUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HomeNearByUsersQuery, HomeNearByUsersQueryVariables>(HomeNearByUsersDocument, options);
        }
export type HomeNearByUsersQueryHookResult = ReturnType<typeof useHomeNearByUsersQuery>;
export type HomeNearByUsersLazyQueryHookResult = ReturnType<typeof useHomeNearByUsersLazyQuery>;
export type HomeNearByUsersQueryResult = Apollo.QueryResult<HomeNearByUsersQuery, HomeNearByUsersQueryVariables>;
export const HomeStoriesDocument = gql`
    query HomeStories($storiesFirst: Int, $storiesAfter: String) {
  ...HomeStories
}
    ${HomeStoriesFragmentDoc}`;

/**
 * __useHomeStoriesQuery__
 *
 * To run a query within a React component, call `useHomeStoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useHomeStoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHomeStoriesQuery({
 *   variables: {
 *      storiesFirst: // value for 'storiesFirst'
 *      storiesAfter: // value for 'storiesAfter'
 *   },
 * });
 */
export function useHomeStoriesQuery(baseOptions?: Apollo.QueryHookOptions<HomeStoriesQuery, HomeStoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HomeStoriesQuery, HomeStoriesQueryVariables>(HomeStoriesDocument, options);
      }
export function useHomeStoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HomeStoriesQuery, HomeStoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HomeStoriesQuery, HomeStoriesQueryVariables>(HomeStoriesDocument, options);
        }
export type HomeStoriesQueryHookResult = ReturnType<typeof useHomeStoriesQuery>;
export type HomeStoriesLazyQueryHookResult = ReturnType<typeof useHomeStoriesLazyQuery>;
export type HomeStoriesQueryResult = Apollo.QueryResult<HomeStoriesQuery, HomeStoriesQueryVariables>;
export const MessageRoomScreenDataDocument = gql`
    query MessageRoomScreenData($id: Int!, $messagesAfter: String, $messagesFirst: Int) {
  messageRoom(id: $id) {
    id
    messages(after: $messagesAfter, first: $messagesFirst) {
      edges {
        node {
          id
          ...MessageBubbleDataInMessageRoom
        }
        cursor
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
}
    ${MessageBubbleDataInMessageRoomFragmentDoc}
${PageInfoFragmentDoc}`;

/**
 * __useMessageRoomScreenDataQuery__
 *
 * To run a query within a React component, call `useMessageRoomScreenDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useMessageRoomScreenDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessageRoomScreenDataQuery({
 *   variables: {
 *      id: // value for 'id'
 *      messagesAfter: // value for 'messagesAfter'
 *      messagesFirst: // value for 'messagesFirst'
 *   },
 * });
 */
export function useMessageRoomScreenDataQuery(baseOptions: Apollo.QueryHookOptions<MessageRoomScreenDataQuery, MessageRoomScreenDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MessageRoomScreenDataQuery, MessageRoomScreenDataQueryVariables>(MessageRoomScreenDataDocument, options);
      }
export function useMessageRoomScreenDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MessageRoomScreenDataQuery, MessageRoomScreenDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MessageRoomScreenDataQuery, MessageRoomScreenDataQueryVariables>(MessageRoomScreenDataDocument, options);
        }
export type MessageRoomScreenDataQueryHookResult = ReturnType<typeof useMessageRoomScreenDataQuery>;
export type MessageRoomScreenDataLazyQueryHookResult = ReturnType<typeof useMessageRoomScreenDataLazyQuery>;
export type MessageRoomScreenDataQueryResult = Apollo.QueryResult<MessageRoomScreenDataQuery, MessageRoomScreenDataQueryVariables>;
export const RoomMessagesInMessageRoomScreenDocument = gql`
    query RoomMessagesInMessageRoomScreen($id: Int!, $messagesAfter: String, $messagesFirst: Int) {
  messageRoom(id: $id) {
    id
    messages(after: $messagesAfter, first: $messagesFirst) {
      edges {
        node {
          id
          ...MessageBubbleDataInMessageRoom
        }
        cursor
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
}
    ${MessageBubbleDataInMessageRoomFragmentDoc}
${PageInfoFragmentDoc}`;

/**
 * __useRoomMessagesInMessageRoomScreenQuery__
 *
 * To run a query within a React component, call `useRoomMessagesInMessageRoomScreenQuery` and pass it any options that fit your needs.
 * When your component renders, `useRoomMessagesInMessageRoomScreenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRoomMessagesInMessageRoomScreenQuery({
 *   variables: {
 *      id: // value for 'id'
 *      messagesAfter: // value for 'messagesAfter'
 *      messagesFirst: // value for 'messagesFirst'
 *   },
 * });
 */
export function useRoomMessagesInMessageRoomScreenQuery(baseOptions: Apollo.QueryHookOptions<RoomMessagesInMessageRoomScreenQuery, RoomMessagesInMessageRoomScreenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RoomMessagesInMessageRoomScreenQuery, RoomMessagesInMessageRoomScreenQueryVariables>(RoomMessagesInMessageRoomScreenDocument, options);
      }
export function useRoomMessagesInMessageRoomScreenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RoomMessagesInMessageRoomScreenQuery, RoomMessagesInMessageRoomScreenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RoomMessagesInMessageRoomScreenQuery, RoomMessagesInMessageRoomScreenQueryVariables>(RoomMessagesInMessageRoomScreenDocument, options);
        }
export type RoomMessagesInMessageRoomScreenQueryHookResult = ReturnType<typeof useRoomMessagesInMessageRoomScreenQuery>;
export type RoomMessagesInMessageRoomScreenLazyQueryHookResult = ReturnType<typeof useRoomMessagesInMessageRoomScreenLazyQuery>;
export type RoomMessagesInMessageRoomScreenQueryResult = Apollo.QueryResult<RoomMessagesInMessageRoomScreenQuery, RoomMessagesInMessageRoomScreenQueryVariables>;
export const NicknameAndProfileImageInMessageRoomScreenDocument = gql`
    query NicknameAndProfileImageInMessageRoomScreen($id: ID!) {
  user(id: $id) {
    id
    nickname
    firstProfileImage {
      ...ProfileImage
    }
  }
}
    ${ProfileImageFragmentDoc}`;

/**
 * __useNicknameAndProfileImageInMessageRoomScreenQuery__
 *
 * To run a query within a React component, call `useNicknameAndProfileImageInMessageRoomScreenQuery` and pass it any options that fit your needs.
 * When your component renders, `useNicknameAndProfileImageInMessageRoomScreenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNicknameAndProfileImageInMessageRoomScreenQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useNicknameAndProfileImageInMessageRoomScreenQuery(baseOptions: Apollo.QueryHookOptions<NicknameAndProfileImageInMessageRoomScreenQuery, NicknameAndProfileImageInMessageRoomScreenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NicknameAndProfileImageInMessageRoomScreenQuery, NicknameAndProfileImageInMessageRoomScreenQueryVariables>(NicknameAndProfileImageInMessageRoomScreenDocument, options);
      }
export function useNicknameAndProfileImageInMessageRoomScreenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NicknameAndProfileImageInMessageRoomScreenQuery, NicknameAndProfileImageInMessageRoomScreenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NicknameAndProfileImageInMessageRoomScreenQuery, NicknameAndProfileImageInMessageRoomScreenQueryVariables>(NicknameAndProfileImageInMessageRoomScreenDocument, options);
        }
export type NicknameAndProfileImageInMessageRoomScreenQueryHookResult = ReturnType<typeof useNicknameAndProfileImageInMessageRoomScreenQuery>;
export type NicknameAndProfileImageInMessageRoomScreenLazyQueryHookResult = ReturnType<typeof useNicknameAndProfileImageInMessageRoomScreenLazyQuery>;
export type NicknameAndProfileImageInMessageRoomScreenQueryResult = Apollo.QueryResult<NicknameAndProfileImageInMessageRoomScreenQuery, NicknameAndProfileImageInMessageRoomScreenQueryVariables>;
export const MessageRoomListScreenDataDocument = gql`
    query MessageRoomListScreenData {
  ...MessageRoomListFromMySelf
  ...MessageRoomListFromOtherParty
}
    ${MessageRoomListFromMySelfFragmentDoc}
${MessageRoomListFromOtherPartyFragmentDoc}`;

/**
 * __useMessageRoomListScreenDataQuery__
 *
 * To run a query within a React component, call `useMessageRoomListScreenDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useMessageRoomListScreenDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessageRoomListScreenDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useMessageRoomListScreenDataQuery(baseOptions?: Apollo.QueryHookOptions<MessageRoomListScreenDataQuery, MessageRoomListScreenDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MessageRoomListScreenDataQuery, MessageRoomListScreenDataQueryVariables>(MessageRoomListScreenDataDocument, options);
      }
export function useMessageRoomListScreenDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MessageRoomListScreenDataQuery, MessageRoomListScreenDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MessageRoomListScreenDataQuery, MessageRoomListScreenDataQueryVariables>(MessageRoomListScreenDataDocument, options);
        }
export type MessageRoomListScreenDataQueryHookResult = ReturnType<typeof useMessageRoomListScreenDataQuery>;
export type MessageRoomListScreenDataLazyQueryHookResult = ReturnType<typeof useMessageRoomListScreenDataLazyQuery>;
export type MessageRoomListScreenDataQueryResult = Apollo.QueryResult<MessageRoomListScreenDataQuery, MessageRoomListScreenDataQueryVariables>;
export const MessageRoomListFromMySelfScreenDataDocument = gql`
    query MessageRoomListFromMySelfScreenData {
  ...MessageRoomListFromMySelf
}
    ${MessageRoomListFromMySelfFragmentDoc}`;

/**
 * __useMessageRoomListFromMySelfScreenDataQuery__
 *
 * To run a query within a React component, call `useMessageRoomListFromMySelfScreenDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useMessageRoomListFromMySelfScreenDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessageRoomListFromMySelfScreenDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useMessageRoomListFromMySelfScreenDataQuery(baseOptions?: Apollo.QueryHookOptions<MessageRoomListFromMySelfScreenDataQuery, MessageRoomListFromMySelfScreenDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MessageRoomListFromMySelfScreenDataQuery, MessageRoomListFromMySelfScreenDataQueryVariables>(MessageRoomListFromMySelfScreenDataDocument, options);
      }
export function useMessageRoomListFromMySelfScreenDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MessageRoomListFromMySelfScreenDataQuery, MessageRoomListFromMySelfScreenDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MessageRoomListFromMySelfScreenDataQuery, MessageRoomListFromMySelfScreenDataQueryVariables>(MessageRoomListFromMySelfScreenDataDocument, options);
        }
export type MessageRoomListFromMySelfScreenDataQueryHookResult = ReturnType<typeof useMessageRoomListFromMySelfScreenDataQuery>;
export type MessageRoomListFromMySelfScreenDataLazyQueryHookResult = ReturnType<typeof useMessageRoomListFromMySelfScreenDataLazyQuery>;
export type MessageRoomListFromMySelfScreenDataQueryResult = Apollo.QueryResult<MessageRoomListFromMySelfScreenDataQuery, MessageRoomListFromMySelfScreenDataQueryVariables>;
export const MessageRoomListFromOtherPartyScreenDataDocument = gql`
    query MessageRoomListFromOtherPartyScreenData {
  ...MessageRoomListFromOtherParty
}
    ${MessageRoomListFromOtherPartyFragmentDoc}`;

/**
 * __useMessageRoomListFromOtherPartyScreenDataQuery__
 *
 * To run a query within a React component, call `useMessageRoomListFromOtherPartyScreenDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useMessageRoomListFromOtherPartyScreenDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessageRoomListFromOtherPartyScreenDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useMessageRoomListFromOtherPartyScreenDataQuery(baseOptions?: Apollo.QueryHookOptions<MessageRoomListFromOtherPartyScreenDataQuery, MessageRoomListFromOtherPartyScreenDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MessageRoomListFromOtherPartyScreenDataQuery, MessageRoomListFromOtherPartyScreenDataQueryVariables>(MessageRoomListFromOtherPartyScreenDataDocument, options);
      }
export function useMessageRoomListFromOtherPartyScreenDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MessageRoomListFromOtherPartyScreenDataQuery, MessageRoomListFromOtherPartyScreenDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MessageRoomListFromOtherPartyScreenDataQuery, MessageRoomListFromOtherPartyScreenDataQueryVariables>(MessageRoomListFromOtherPartyScreenDataDocument, options);
        }
export type MessageRoomListFromOtherPartyScreenDataQueryHookResult = ReturnType<typeof useMessageRoomListFromOtherPartyScreenDataQuery>;
export type MessageRoomListFromOtherPartyScreenDataLazyQueryHookResult = ReturnType<typeof useMessageRoomListFromOtherPartyScreenDataLazyQuery>;
export type MessageRoomListFromOtherPartyScreenDataQueryResult = Apollo.QueryResult<MessageRoomListFromOtherPartyScreenDataQuery, MessageRoomListFromOtherPartyScreenDataQueryVariables>;
export const MyPageScreenDataDocument = gql`
    query MyPageScreenData {
  me {
    id
    nickname
    age
    statusMessage
    bio
    profileImages {
      ...ProfileImage
    }
    firstProfileImage {
      ...ProfileImage
    }
  }
}
    ${ProfileImageFragmentDoc}`;

/**
 * __useMyPageScreenDataQuery__
 *
 * To run a query within a React component, call `useMyPageScreenDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyPageScreenDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyPageScreenDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyPageScreenDataQuery(baseOptions?: Apollo.QueryHookOptions<MyPageScreenDataQuery, MyPageScreenDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyPageScreenDataQuery, MyPageScreenDataQueryVariables>(MyPageScreenDataDocument, options);
      }
export function useMyPageScreenDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyPageScreenDataQuery, MyPageScreenDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyPageScreenDataQuery, MyPageScreenDataQueryVariables>(MyPageScreenDataDocument, options);
        }
export type MyPageScreenDataQueryHookResult = ReturnType<typeof useMyPageScreenDataQuery>;
export type MyPageScreenDataLazyQueryHookResult = ReturnType<typeof useMyPageScreenDataLazyQuery>;
export type MyPageScreenDataQueryResult = Apollo.QueryResult<MyPageScreenDataQuery, MyPageScreenDataQueryVariables>;
export const MyTagSelectionScreenDataDocument = gql`
    query MyTagSelectionScreenData {
  me {
    id
    myTags {
      id
      text
    }
  }
}
    `;

/**
 * __useMyTagSelectionScreenDataQuery__
 *
 * To run a query within a React component, call `useMyTagSelectionScreenDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyTagSelectionScreenDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyTagSelectionScreenDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyTagSelectionScreenDataQuery(baseOptions?: Apollo.QueryHookOptions<MyTagSelectionScreenDataQuery, MyTagSelectionScreenDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyTagSelectionScreenDataQuery, MyTagSelectionScreenDataQueryVariables>(MyTagSelectionScreenDataDocument, options);
      }
export function useMyTagSelectionScreenDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyTagSelectionScreenDataQuery, MyTagSelectionScreenDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyTagSelectionScreenDataQuery, MyTagSelectionScreenDataQueryVariables>(MyTagSelectionScreenDataDocument, options);
        }
export type MyTagSelectionScreenDataQueryHookResult = ReturnType<typeof useMyTagSelectionScreenDataQuery>;
export type MyTagSelectionScreenDataLazyQueryHookResult = ReturnType<typeof useMyTagSelectionScreenDataLazyQuery>;
export type MyTagSelectionScreenDataQueryResult = Apollo.QueryResult<MyTagSelectionScreenDataQuery, MyTagSelectionScreenDataQueryVariables>;
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
export const OneUserStoriesDocument = gql`
    query OneUserStories($id: ID!, $viewersFirst: Int) {
  user(id: $id) {
    id
    ...StoryUserMetaData
    stories {
      id
      url
      type
      backgroundColors
      thumbnailUrl
      createdAt
      ...ViewersInStories
    }
  }
}
    ${StoryUserMetaDataFragmentDoc}
${ViewersInStoriesFragmentDoc}`;

/**
 * __useOneUserStoriesQuery__
 *
 * To run a query within a React component, call `useOneUserStoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useOneUserStoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOneUserStoriesQuery({
 *   variables: {
 *      id: // value for 'id'
 *      viewersFirst: // value for 'viewersFirst'
 *   },
 * });
 */
export function useOneUserStoriesQuery(baseOptions: Apollo.QueryHookOptions<OneUserStoriesQuery, OneUserStoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OneUserStoriesQuery, OneUserStoriesQueryVariables>(OneUserStoriesDocument, options);
      }
export function useOneUserStoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OneUserStoriesQuery, OneUserStoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OneUserStoriesQuery, OneUserStoriesQueryVariables>(OneUserStoriesDocument, options);
        }
export type OneUserStoriesQueryHookResult = ReturnType<typeof useOneUserStoriesQuery>;
export type OneUserStoriesLazyQueryHookResult = ReturnType<typeof useOneUserStoriesLazyQuery>;
export type OneUserStoriesQueryResult = Apollo.QueryResult<OneUserStoriesQuery, OneUserStoriesQueryVariables>;
export const AfterDeletingStoryDocument = gql`
    query AfterDeletingStory {
  me {
    ...StoryUserCircle
  }
}
    ${StoryUserCircleFragmentDoc}`;

/**
 * __useAfterDeletingStoryQuery__
 *
 * To run a query within a React component, call `useAfterDeletingStoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useAfterDeletingStoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAfterDeletingStoryQuery({
 *   variables: {
 *   },
 * });
 */
export function useAfterDeletingStoryQuery(baseOptions?: Apollo.QueryHookOptions<AfterDeletingStoryQuery, AfterDeletingStoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AfterDeletingStoryQuery, AfterDeletingStoryQueryVariables>(AfterDeletingStoryDocument, options);
      }
export function useAfterDeletingStoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AfterDeletingStoryQuery, AfterDeletingStoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AfterDeletingStoryQuery, AfterDeletingStoryQueryVariables>(AfterDeletingStoryDocument, options);
        }
export type AfterDeletingStoryQueryHookResult = ReturnType<typeof useAfterDeletingStoryQuery>;
export type AfterDeletingStoryLazyQueryHookResult = ReturnType<typeof useAfterDeletingStoryLazyQuery>;
export type AfterDeletingStoryQueryResult = Apollo.QueryResult<AfterDeletingStoryQuery, AfterDeletingStoryQueryVariables>;
export const StoryViewersScreenDataDocument = gql`
    query StoryViewersScreenData($storyId: Int!, $seenListFirst: Int, $seenListAfter: String) {
  story(id: $storyId) {
    id
    seenList(first: $seenListFirst, after: $seenListAfter) {
      edges {
        node {
          id
          user {
            id
            nickname
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
}
    ${ProfileImageFragmentDoc}
${PageInfoFragmentDoc}`;

/**
 * __useStoryViewersScreenDataQuery__
 *
 * To run a query within a React component, call `useStoryViewersScreenDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useStoryViewersScreenDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStoryViewersScreenDataQuery({
 *   variables: {
 *      storyId: // value for 'storyId'
 *      seenListFirst: // value for 'seenListFirst'
 *      seenListAfter: // value for 'seenListAfter'
 *   },
 * });
 */
export function useStoryViewersScreenDataQuery(baseOptions: Apollo.QueryHookOptions<StoryViewersScreenDataQuery, StoryViewersScreenDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StoryViewersScreenDataQuery, StoryViewersScreenDataQueryVariables>(StoryViewersScreenDataDocument, options);
      }
export function useStoryViewersScreenDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StoryViewersScreenDataQuery, StoryViewersScreenDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StoryViewersScreenDataQuery, StoryViewersScreenDataQueryVariables>(StoryViewersScreenDataDocument, options);
        }
export type StoryViewersScreenDataQueryHookResult = ReturnType<typeof useStoryViewersScreenDataQuery>;
export type StoryViewersScreenDataLazyQueryHookResult = ReturnType<typeof useStoryViewersScreenDataLazyQuery>;
export type StoryViewersScreenDataQueryResult = Apollo.QueryResult<StoryViewersScreenDataQuery, StoryViewersScreenDataQueryVariables>;
export const AfterCreateingStoryDocument = gql`
    query AfterCreateingStory {
  me {
    ...StoryUserCircle
  }
}
    ${StoryUserCircleFragmentDoc}`;

/**
 * __useAfterCreateingStoryQuery__
 *
 * To run a query within a React component, call `useAfterCreateingStoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useAfterCreateingStoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAfterCreateingStoryQuery({
 *   variables: {
 *   },
 * });
 */
export function useAfterCreateingStoryQuery(baseOptions?: Apollo.QueryHookOptions<AfterCreateingStoryQuery, AfterCreateingStoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AfterCreateingStoryQuery, AfterCreateingStoryQueryVariables>(AfterCreateingStoryDocument, options);
      }
export function useAfterCreateingStoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AfterCreateingStoryQuery, AfterCreateingStoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AfterCreateingStoryQuery, AfterCreateingStoryQueryVariables>(AfterCreateingStoryDocument, options);
        }
export type AfterCreateingStoryQueryHookResult = ReturnType<typeof useAfterCreateingStoryQuery>;
export type AfterCreateingStoryLazyQueryHookResult = ReturnType<typeof useAfterCreateingStoryLazyQuery>;
export type AfterCreateingStoryQueryResult = Apollo.QueryResult<AfterCreateingStoryQuery, AfterCreateingStoryQueryVariables>;
export const TimelineScreenDataDocument = gql`
    query TimelineScreenData($first: Int, $after: String) {
  posts(first: $first, after: $after) {
    edges {
      node {
        ...PostCard
      }
      cursor
    }
    pageInfo {
      ...PageInfo
    }
  }
}
    ${PostCardFragmentDoc}
${PageInfoFragmentDoc}`;

/**
 * __useTimelineScreenDataQuery__
 *
 * To run a query within a React component, call `useTimelineScreenDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useTimelineScreenDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTimelineScreenDataQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useTimelineScreenDataQuery(baseOptions?: Apollo.QueryHookOptions<TimelineScreenDataQuery, TimelineScreenDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TimelineScreenDataQuery, TimelineScreenDataQueryVariables>(TimelineScreenDataDocument, options);
      }
export function useTimelineScreenDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TimelineScreenDataQuery, TimelineScreenDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TimelineScreenDataQuery, TimelineScreenDataQueryVariables>(TimelineScreenDataDocument, options);
        }
export type TimelineScreenDataQueryHookResult = ReturnType<typeof useTimelineScreenDataQuery>;
export type TimelineScreenDataLazyQueryHookResult = ReturnType<typeof useTimelineScreenDataLazyQuery>;
export type TimelineScreenDataQueryResult = Apollo.QueryResult<TimelineScreenDataQuery, TimelineScreenDataQueryVariables>;
export const UserProfileScreenDataDocument = gql`
    query UserProfileScreenData($id: ID!) {
  user(id: $id) {
    id
    blocking
    blocked
    ...BottomSheetContentInUserProfile
    ...ProfileImagesInUserProfile
    ...BottomButtonGroupInUserProfile
  }
}
    ${BottomSheetContentInUserProfileFragmentDoc}
${ProfileImagesInUserProfileFragmentDoc}
${BottomButtonGroupInUserProfileFragmentDoc}`;

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