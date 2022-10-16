import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Text } from '@rneui/themed';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Tag } from 'src/components/ui/Tag';
import { BottomSheetContentInUserProfileFragment } from 'src/generated/graphql';
import { theme } from 'src/styles';
import { UserPreviewData } from 'src/types';

type Props = {
  data: BottomSheetContentInUserProfileFragment;
  previewData?: UserPreviewData;
};

export const BottomSheetContent = React.memo(({ data, previewData }: Props) => {
  const { age, blocking, blocked, myTags, numberOfPeopleTogether } = data;
  const blockingOrBlocked = blocking || blocked;
  const nickname = previewData ? previewData.nickname : data.nickname;
  const bio = previewData ? previewData.bio : data.bio;
  const height = previewData ? previewData.height : data.height;

  const numberOfPeopleTogetherTag =
    numberOfPeopleTogether > 9
      ? '10人以上でいます!'
      : `${numberOfPeopleTogether}人でいます!`;

  return (
    <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
      <View>
        <Text style={styles.name}>
          {nickname}, <Text style={styles.age}>{age}</Text>
        </Text>

        {!blockingOrBlocked && (
          <>
            <View style={styles.tagsContainer}>
              {!!numberOfPeopleTogether && (
                <View>
                  <View style={[styles.tag]}>
                    <Tag text={numberOfPeopleTogetherTag} />
                  </View>
                </View>
              )}
              {height && (
                <View style={[styles.tag]}>
                  <Tag text={`${height}㌢`} />
                </View>
              )}
              {myTags?.map((tag) => {
                return (
                  <View style={[styles.tag]} key={tag.id}>
                    <Tag text={tag.text} />
                  </View>
                );
              })}
            </View>

            <View style={styles.bioContainer}>
              <Text style={styles.bio}>{bio}</Text>
            </View>
          </>
        )}
      </View>
    </BottomSheetScrollView>
  );
});

const TAG_MARGIN_LEFT = 8;
const TAG_MARGIN_TOP = 6;

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 140,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 28,
  },
  age: {
    color: theme.black,
    fontWeight: 'bold',
    fontSize: 20,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8 - TAG_MARGIN_TOP,
    transform: [{ translateX: -TAG_MARGIN_LEFT }],
  },
  tag: {
    marginLeft: TAG_MARGIN_LEFT,
    marginTop: TAG_MARGIN_TOP,
  },
  tagText: {
    fontWeight: 'bold',
  },
  bioContainer: {
    marginTop: 24,
  },
  bio: {
    lineHeight: 18,
    fontSize: 16,
  },
});
