import { MaterialIcons } from '@expo/vector-icons';
import { Text } from '@rneui/themed';
import { filter } from 'graphql-anywhere';
import React, { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { ProfileImage } from 'src/components/domain/user/ProfileImage';
import { Loading } from 'src/components/ui/Loading';
import { ProfileStoryOuter } from 'src/components/ui/ProfileStoryOuter';
import {
  ProfileImageFragment,
  ProfileImageFragmentDoc,
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
      <ProfileStoryOuter imageSize={PROFILE_IMAGE_SIZE}>
        <ProfileImage
          imageData={filter<ProfileImageFragment>(
            ProfileImageFragmentDoc,
            data.me.firstProfileImage
          )}
          style={styles.profileImage}
        />
      </ProfileStoryOuter>

      <View style={styles.nameContainer}>
        <Text style={styles.name}>
          {me.nickname}, <Text style={styles.age}>{me.age}</Text>
        </Text>
      </View>

      <View style={styles.actionButtons1}>
        <ActionButton
          icon={<MaterialIcons name="edit" size={28} color="#666666" />}
          title="プロフィール編集"
        />
      </View>
    </View>
  );
};

const PROFILE_IMAGE_SIZE = 110;

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
    width: '88%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 22,
  },
});
