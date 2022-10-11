import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { StoryUserCircle } from 'src/components/domain/user/StoryUserCircle';
import { HStack } from 'src/components/ui/HStack';
import { BottomButtonGroupInUserProfileFragment } from 'src/generated/graphql';
import { theme } from 'src/styles';

type Props = {
  data: BottomButtonGroupInUserProfileFragment;
};

export const BottomButtonGroup = ({ data }: Props) => {
  const navigation = useNavigation<RootNavigationProp<'UserProfile'>>();
  const onStoryUserPress = () => {
    navigation.push('Stories', {
      startingIndex: 0,
      storyUsers: [{ userId: data.id }],
    });
  };

  const onSendPress = async () => {
    navigation.navigate('MessageRoom');
  };

  return (
    <HStack style={styles.content} space={50}>
      <Pressable style={styles.showGroupButton}>
        <MaterialIcons name="group" size={ICON_SIZE} color={theme.secondary} />
      </Pressable>
      <Pressable style={styles.sendMessageButton} onPress={onSendPress}>
        <Feather name="send" size={ICON_SIZE} color="white" />
      </Pressable>
      {!!data.stories.length && (
        <StoryUserCircle
          storyUserData={data}
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
