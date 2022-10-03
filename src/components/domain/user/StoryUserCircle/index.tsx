import { filter } from 'graphql-anywhere';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
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
  isLoading?: boolean;
};

export const StoryUserCircle = ({
  storyUserData,
  imageSize,
  isLoading = false,
}: Props) => {
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

      {isLoading && <View
        style={[
          styles.blur,
          {
            width: imageSize,
            height: imageSize,
            borderRadius: imageSize,
          },
        ]}
      >
        <ActivityIndicator color="#fff" />
      </View>}
    </ProfileStoryOuter>
  );
};

const styles = StyleSheet.create({
  blur: {
    position: 'absolute',
    backgroundColor: 'rgba(60, 60, 60, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
