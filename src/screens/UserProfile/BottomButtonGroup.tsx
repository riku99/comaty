import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { SkypeIndicator } from 'react-native-indicators';
import { useToast } from 'react-native-toast-notifications';
import { StoryUserCircle } from 'src/components/domain/user/StoryUserCircle';
import { HStack } from 'src/components/ui/HStack';
import {
  AgeVerificationStatus,
  BottomButtonGroupInUserProfileFragment,
  CreateMessageRoomError,
  useCreateMessageRoomMutation
} from 'src/generated/graphql';
import { useMyId } from 'src/hooks/me/useMyId';
import { theme } from 'src/styles';
import { getGraphQLError } from 'src/utils';

type Props = {
  data: BottomButtonGroupInUserProfileFragment;
};

export const BottomButtonGroup = ({ data }: Props) => {
  const navigation = useNavigation<RootNavigationProp<'UserProfile'>>();
  const [createMessageRoomMutation] = useCreateMessageRoomMutation();
  const [creatingMessageRoom, setCreatingMessageRoom] = useState(false);
  const myId = useMyId();
  const toast = useToast();

  const onStoryUserPress = () => {
    navigation.push('Stories', {
      startingIndex: 0,
      storyUsers: [{ userId: data.user.id }],
    });
  };

  const onSendPress = async () => {
    if (myId === data.user.id) {
      return;
    }

    if (data.me.ageVerificationStatus === AgeVerificationStatus.UnderReview) {
      navigation.navigate("AgeVerificationUnderReview")
      return 
    }

    if (data.me.ageVerificationStatus !== AgeVerificationStatus.Completed) {
      navigation.navigate('AgeVerificationRequest');
      return;
    }

    try {
      setCreatingMessageRoom(true);
      await createMessageRoomMutation({
        variables: {
          recipientId: data.user.id,
        },
        onCompleted: (response) => {
          navigation.navigate('MessageRoom', {
            userId: data.user.id,
            roomId: response.createMessageRoom.id,
          });
        },
      });
    } catch (e) {
      console.log(e);
      const gqlError = getGraphQLError(e, 0);
      if (gqlError) {
        if (gqlError.code === CreateMessageRoomError.Blocked) {
          toast.show('トークルームを作成できませんでした');
          return;
        }
      }
    } finally {
      setCreatingMessageRoom(false);
    }
  };

  const onGroupMembersPress = () => {
    if (!data.user.group) {
      return;
    }

    navigation.push('GroupMembers', {
      groupId: data.user.group.id,
      userId: data.user.id,
    });
  };

  return (
    <HStack style={styles.content} space={50}>
      {!!data.user.group && (
        <Pressable style={styles.showGroupButton} onPress={onGroupMembersPress}>
          <MaterialIcons
            name="group"
            size={ICON_SIZE}
            color={theme.secondary}
          />
        </Pressable>
      )}

      <Pressable
        style={styles.sendMessageButton}
        onPress={onSendPress}
        disabled={creatingMessageRoom}
      >
        {creatingMessageRoom ? (
          <SkypeIndicator color="#fff" size={24} />
        ) : (
          <Feather name="send" size={ICON_SIZE} color="white" />
        )}
      </Pressable>

      {!!data.user.stories.length && (
        <StoryUserCircle
          storyUserData={data.user}
          imageSize={BUTTON_SIZE - 10}
          onPress={onStoryUserPress}
        />
      )}
    </HStack>
  );
};

const ICON_SIZE = 26;
const BUTTON_SIZE = 58;

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  showGroupButton: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1eaf2',
  },
  sendMessageButton: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE,
    backgroundColor: theme.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
