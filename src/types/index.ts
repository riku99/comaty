import { User } from 'src/generated/graphql';

export type StorySource = {
  uri: string;
  type: 'photo' | 'video';
  mime: string;
  backgroundColors: string[];
  thumbnailUri?: string;
};

export type UserPreviewData = {
  nickname: User['nickname'];
  bio: User['bio'];
  height: User['height'];
};

export type GroupQRCodeValue = {
  ownerId: string;
  groupId: number;
};
