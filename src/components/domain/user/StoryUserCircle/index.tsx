import { filter } from 'graphql-anywhere';
import { ProfileImage } from 'src/components/domain/user/ProfileImage';
import { ProfileStoryOuter } from 'src/components/ui/ProfileStoryOuter';
import {
  ProfileImageFragment,
  ProfileImageFragmentDoc,
  StoryUserCircleFragment,
} from 'src/generated/graphql';

type Props = {
  storyUserData: StoryUserCircleFragment;
  imageSize: number;
};

export const StoryUserCircle = ({ storyUserData, imageSize }: Props) => {
  return (
    <ProfileStoryOuter imageSize={imageSize}>
      <ProfileImage
        imageData={filter<ProfileImageFragment>(
          ProfileImageFragmentDoc,
          storyUserData.firstProfileImage
        )}
        style={{
          width: imageSize,
          height: imageSize,
          borderRadius: imageSize,
        }}
      />
    </ProfileStoryOuter>
  );
};
