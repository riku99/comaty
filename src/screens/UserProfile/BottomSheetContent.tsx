import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Text } from '@rneui/themed';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Tag } from 'src/components/ui/Tag';
import { theme } from 'src/styles';

const tags = [
  '3人でいます✌️',
  '184㌢',
  'ビール好き🍺',
  '奢ります🆗',
  'よく喋る😏',
  '新宿Love💜',
];

export const BottomSheetContent = React.memo(() => {
  return (
    <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
      <View>
        <Text style={styles.name}>
          ジゼル <Text style={styles.age}>24</Text>
        </Text>

        <View style={styles.tagsContainer}>
          {tags.map((tag, index) => {
            return (
              <View style={[styles.tag]} key={index}>
                <Tag text={tag} />
              </View>
            );
          })}
        </View>

        <View style={styles.bioContainer}>
          <Text style={styles.bio}>
            {
              'はじめまして！\n98年生まれの24歳です！\n\n休学と留年したのでまだ大学生やってます笑\nエンジニアとしても働いてて、今はアプリ作ってます😉\n\nそれとComatyの製作者です！\nぜひ一緒に飲みましょ〜〜🍺'
            }
          </Text>
        </View>
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
