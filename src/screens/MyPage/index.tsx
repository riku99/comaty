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
          icon={<MaterialIcons name="settings" size={24} color="#666666" />}
          title="設定"
          onPress={() => {
            navigation.navigate('EditProfileStack');
          }}
          buttonSize={60}
        />

        <View style={styles.editButton}>
          <ActionButton
            icon={<MaterialIcons name="edit" size={28} color="#666666" />}
            title="プロフィール編集"
            onPress={() => {
              navigation.navigate('EditProfileStack');
            }}
            buttonSize={66}
          />
        </View>

        <ActionButton
          icon={
            <MaterialIcons name="notifications" size={24} color="#666666" />
          }
          title="通知"
          onPress={() => {
            navigation.navigate('EditProfileStack');
          }}
          buttonSize={60}
        />

        <ActionButton
          icon={
            <MaterialCommunityIcons
              name="card-text"
              size={24}
              color={'#666666'}
            />
          }
          title="マイ投稿"
          onPress={() => {
            navigation.navigate('MyPosts');
          }}
          buttonSize={60}
        />
      </View>
    </View>
  );
};

const PROFILE_IMAGE_SIZE = 110;
const ACTION_BUTTON_SIZE = 66;

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
    fontSize: 22,
    fontWeight: 'bold',
  },
  age: {
    fontSize: 18,
  },
  actionButtons1: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 22,
  },
  editButton: {
    transform: [{ translateY: 18 }],
  },
});
