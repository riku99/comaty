import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Text } from '@rneui/themed';
import { filter } from 'graphql-anywhere';
import React, { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { StoryUserCircle } from 'src/components/domain/user/StoryUserCircle';
import { Loading } from 'src/components/ui/Loading';
import {
  StoryUserCircleFragment,
  StoryUserCircleFragmentDoc,
  useMyPageScreenDataQuery,
} from 'src/generated/graphql';
import { ActionButton } from './ActionButton';

type Props = RootNavigationScreenProp<'MyPageMain'>;

export const MyPageScreen = ({ navigation }: Props) => {
  const { data } = useMyPageScreenDataQuery();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'マイページ',
      headerShadowVisible: false,
    });
  }, [navigation]);

  if (!data) {
    return <Loading />;
  }

  const { me } = data;

  return (
    <View style={styles.container}>
      <StoryUserCircle
        imageSize={PROFILE_IMAGE_SIZE}
        storyUserData={filter<StoryUserCircleFragment>(
          StoryUserCircleFragmentDoc,
          data.me
        )}
        onPress={() => {
          if (!me?.id) {
            return;
          }

          navigation.navigate('Stories', {
            startingIndex: 0,
            storyUsers: [
              {
                userId: me.id,
              },
            ],
          });
        }}
      />

      <View style={styles.nameContainer}>
        <Text style={styles.name}>
          {me.nickname}, <Text style={styles.age}>{me.age}</Text>
        </Text>
      </View>

      <View style={styles.actionButtons1}>
        <ActionButton
          icon={
            <MaterialIcons
              name="settings"
              size={ACTION_BUTTON_ICON_SIZE}
              color={ACTION_BUTTON_COLOR}
            />
          }
          title="設定"
          onPress={() => {
            navigation.navigate('EditProfileStack');
          }}
          buttonSize={ACTION_BUTTON_SIZE}
        />

        <ActionButton
          icon={
            <MaterialIcons
              name="edit"
              size={ACTION_BUTTON_ICON_SIZE}
              color={ACTION_BUTTON_COLOR}
            />
          }
          title="プロフィール編集"
          onPress={() => {
            navigation.navigate('EditProfileStack');
          }}
          buttonSize={ACTION_BUTTON_SIZE}
        />
      </View>

      <View
        style={[
          styles.actionButtons1,
          {
            marginTop: 32,
          },
        ]}
      >
        <View
          style={{
            transform: [{ translateX: 2 }],
          }}
        >
          <ActionButton
            icon={
              <MaterialCommunityIcons
                name="card-text"
                size={ACTION_BUTTON_ICON_SIZE}
                color={ACTION_BUTTON_COLOR}
              />
            }
            title="マイ投稿"
            onPress={() => {
              navigation.navigate('MyPosts');
            }}
            buttonSize={ACTION_BUTTON_SIZE}
          />
        </View>

        <View
          style={{
            transform: [{ translateX: -18 }],
          }}
        >
          <ActionButton
            icon={
              <MaterialIcons
                name="group"
                size={ACTION_BUTTON_ICON_SIZE}
                color={ACTION_BUTTON_COLOR}
              />
            }
            buttonSize={ACTION_BUTTON_SIZE}
            onPress={() => {
              navigation.navigate('MyGroup');
            }}
            title="グループ"
          />
        </View>
      </View>
    </View>
  );
};

const PROFILE_IMAGE_SIZE = 80;
const ACTION_BUTTON_SIZE = 60;
const ACTION_BUTTON_COLOR = '#666666';
const ACTION_BUTTON_ICON_SIZE = 24;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
  },
  profileImage: {
    width: PROFILE_IMAGE_SIZE,
    height: PROFILE_IMAGE_SIZE,
    borderRadius: PROFILE_IMAGE_SIZE,
  },
  nameContainer: {
    marginTop: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  age: {
    fontSize: 18,
  },
  actionButtons1: {
    width: '60%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 22,
  },
  editButton: {
    // transform: [{ translateY: 18 }],
  },
});
