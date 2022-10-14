import { filter } from 'graphql-anywhere';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import { ProfileImage } from 'src/components/domain/user/ProfileImage';
import { ProfileStoryOuter } from 'src/components/ui/ProfileStoryOuter';
import {
  ProfileImageFragment,
  ProfileImageFragmentDoc,
  StoryUserCircleFragment,
} from 'src/generated/graphql';
import { useMyId } from 'src/hooks/me/useMyId';

type Props = {
  storyUserData: StoryUserCircleFragment;
  imageSize: number;
  creatingStory?: boolean;
  onPress?: () => void;
};

export const StoryUserCircle = ({
  storyUserData,
  imageSize,
  onPress,
  creatingStory = false,
}: Props) => {
  const allSeen = storyUserData.stories.every((s) => s.seen);
  const myId = useMyId();

  return (
    <Pressable
      onPress={() => {
        if (!storyUserData.stories?.length) {
          return;
        }

        onPress();
      }}
    >
      <ProfileStoryOuter
        imageSize={imageSize}
        type={
          !storyUserData.stories?.length
            ? 'none'
            : myId !== storyUserData.id && allSeen
            ? 'silver'
            : 'gradient'
        }
      >
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

        {creatingStory && (
          <View
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
          </View>
        )}
      </ProfileStoryOuter>
    </Pressable>
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
