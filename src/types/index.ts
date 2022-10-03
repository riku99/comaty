export type StorySource = {
  uri: string;
  type: 'photo' | 'video';
  mime: string;
  backgroundColors: string[];
  thumbnailUri?: string;
};
