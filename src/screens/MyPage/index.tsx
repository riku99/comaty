import { Text } from '@rneui/themed';
import { filter } from 'graphql-anywhere';
import React, { useLayoutEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { StoryUserCircle } from 'src/components/domain/user/StoryUserCircle';
import { Loading } from 'src/components/ui/Loading';
import {
  StoryUserCircleFragment,
  StoryUserCircleFragmentDoc,
  useMyPageScreenDataQuery,
} from 'src/generated/graphql';
import { ActionButtons } from './ActionButtnos';

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
      <ScrollView contentContainerStyle={styles.contentContainer}>
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

        <ActionButtons />

        <View></View>
      </ScrollView>
    </View>
  );
};

const PROFILE_IMAGE_SIZE = 80;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
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
});
