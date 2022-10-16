import { Text } from '@rneui/themed';
import { filter } from 'graphql-anywhere';
import React, { useLayoutEffect } from 'react';
import { ScrollView, StyleSheet, Switch, View } from 'react-native';
import { StoryUserCircle } from 'src/components/domain/user/StoryUserCircle';
import { Loading } from 'src/components/ui/Loading';
import {
  StoryUserCircleFragment,
  StoryUserCircleFragmentDoc,
  useMyPageScreenDataQuery,
} from 'src/generated/graphql';
import { theme } from 'src/styles';
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

        <View
          style={[
            styles.sectionItem,
            {
              marginTop: 48,
            },
          ]}
        >
          <Text style={styles.sectionItemTitle}>アクティブ</Text>
          <Switch
            trackColor={{
              true: theme.primary,
            }}
            value={true}
          />
        </View>

        <Text style={styles.sectionItemBottomText}>
          {
            '今日この後会えるかも...という場合にONにしてください！\nOFFの場合他のユーザーに表示されません。'
          }
        </Text>

        <View
          style={[
            styles.sectionItem,
            {
              marginTop: 24,
            },
          ]}
        >
          <Text style={styles.sectionItemTitle}>今何人でいる？</Text>
          <Text>未選択</Text>
        </View>
        <Text style={styles.sectionItemBottomText}>
          今一緒にいる人の人数を選択しましょう！
        </Text>
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
  sectionItem: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    width: '92%',
    paddingHorizontal: 16,
    borderRadius: 24,
    shadowColor: 'rgba(100, 100, 111, 0.6)',
    shadowOffset: {
      width: 2,
      height: 7,
    },
    shadowOpacity: 0.6,
    shadowRadius: 24,
  },
  sectionItemTitle: {
    fontWeight: 'bold',
  },
  sectionItemBottomText: {
    alignSelf: 'flex-start',
    marginLeft: 18,
    fontSize: 13,
    marginTop: 6,
  },
});
