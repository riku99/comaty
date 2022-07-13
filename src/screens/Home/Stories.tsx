import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';

export const Stories = React.memo(() => {
  const renderItem = useCallback(({ item }: { item: { uri: string } }) => {
    return (
      <View>
        <LinearGradient
          colors={['#9089fa', '#b289fa', '#e389fa']}
          style={style.gradientContainer}
        >
          <View style={style.blankContainer}>
            <FastImage source={{ uri: item.uri }} style={style.userImage} />
          </View>
        </LinearGradient>
      </View>
    );
  }, []);

  const renderItemSeparator = useCallback(() => {
    return (
      <View
        style={{
          width: 10,
        }}
      />
    );
  }, []);

  return (
    <View>
      <FlatList
        renderItem={renderItem}
        data={images}
        keyExtractor={(d, i) => i.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={renderItemSeparator}
        contentContainerStyle={style.storiesContent}
      />
    </View>
  );
});

const style = StyleSheet.create({
  storiesContent: {
    paddingHorizontal: 16,
  },
  gradientContainer: {
    width: 69,
    height: 69,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blankContainer: {
    width: 64,
    height: 64,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
});

const images = [
  {
    uri: 'https://scontent-nrt1-1.cdninstagram.com/v/t51.2885-15/292855547_574289770964082_5203657297756221413_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent-nrt1-1.cdninstagram.com&_nc_cat=1&_nc_ohc=W6KvodfhE9MAX8uPltd&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=Mjg3OTkyMjM3NTIyOTE4MDI5OQ%3D%3D.2-ccb7-5&oh=00_AT89r11qyd5u-_edJlxwr2yHSacjBS2JEG3WkeR5Dmhopw&oe=62D4B037&_nc_sid=30a2ef',
  },
  {
    uri: 'https://scontent-nrt1-1.cdninstagram.com/v/t51.2885-15/292855547_574289770964082_5203657297756221413_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent-nrt1-1.cdninstagram.com&_nc_cat=1&_nc_ohc=W6KvodfhE9MAX8uPltd&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=Mjg3OTkyMjM3NTIyOTE4MDI5OQ%3D%3D.2-ccb7-5&oh=00_AT89r11qyd5u-_edJlxwr2yHSacjBS2JEG3WkeR5Dmhopw&oe=62D4B037&_nc_sid=30a2ef',
  },
  {
    uri: 'https://scontent-nrt1-1.cdninstagram.com/v/t51.2885-15/292855547_574289770964082_5203657297756221413_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent-nrt1-1.cdninstagram.com&_nc_cat=1&_nc_ohc=W6KvodfhE9MAX8uPltd&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=Mjg3OTkyMjM3NTIyOTE4MDI5OQ%3D%3D.2-ccb7-5&oh=00_AT89r11qyd5u-_edJlxwr2yHSacjBS2JEG3WkeR5Dmhopw&oe=62D4B037&_nc_sid=30a2ef',
  },
  {
    uri: 'https://scontent-nrt1-1.cdninstagram.com/v/t51.2885-15/292855547_574289770964082_5203657297756221413_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent-nrt1-1.cdninstagram.com&_nc_cat=1&_nc_ohc=W6KvodfhE9MAX8uPltd&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=Mjg3OTkyMjM3NTIyOTE4MDI5OQ%3D%3D.2-ccb7-5&oh=00_AT89r11qyd5u-_edJlxwr2yHSacjBS2JEG3WkeR5Dmhopw&oe=62D4B037&_nc_sid=30a2ef',
  },
  {
    uri: 'https://scontent-nrt1-1.cdninstagram.com/v/t51.2885-15/292855547_574289770964082_5203657297756221413_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent-nrt1-1.cdninstagram.com&_nc_cat=1&_nc_ohc=W6KvodfhE9MAX8uPltd&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=Mjg3OTkyMjM3NTIyOTE4MDI5OQ%3D%3D.2-ccb7-5&oh=00_AT89r11qyd5u-_edJlxwr2yHSacjBS2JEG3WkeR5Dmhopw&oe=62D4B037&_nc_sid=30a2ef',
  },
  {
    uri: 'https://scontent-nrt1-1.cdninstagram.com/v/t51.2885-15/292855547_574289770964082_5203657297756221413_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent-nrt1-1.cdninstagram.com&_nc_cat=1&_nc_ohc=W6KvodfhE9MAX8uPltd&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=Mjg3OTkyMjM3NTIyOTE4MDI5OQ%3D%3D.2-ccb7-5&oh=00_AT89r11qyd5u-_edJlxwr2yHSacjBS2JEG3WkeR5Dmhopw&oe=62D4B037&_nc_sid=30a2ef',
  },
  {
    uri: 'https://scontent-nrt1-1.cdninstagram.com/v/t51.2885-15/292855547_574289770964082_5203657297756221413_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent-nrt1-1.cdninstagram.com&_nc_cat=1&_nc_ohc=W6KvodfhE9MAX8uPltd&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=Mjg3OTkyMjM3NTIyOTE4MDI5OQ%3D%3D.2-ccb7-5&oh=00_AT89r11qyd5u-_edJlxwr2yHSacjBS2JEG3WkeR5Dmhopw&oe=62D4B037&_nc_sid=30a2ef',
  },
  {
    uri: 'https://scontent-nrt1-1.cdninstagram.com/v/t51.2885-15/292855547_574289770964082_5203657297756221413_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent-nrt1-1.cdninstagram.com&_nc_cat=1&_nc_ohc=W6KvodfhE9MAX8uPltd&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=Mjg3OTkyMjM3NTIyOTE4MDI5OQ%3D%3D.2-ccb7-5&oh=00_AT89r11qyd5u-_edJlxwr2yHSacjBS2JEG3WkeR5Dmhopw&oe=62D4B037&_nc_sid=30a2ef',
  },
  {
    uri: 'https://scontent-nrt1-1.cdninstagram.com/v/t51.2885-15/292855547_574289770964082_5203657297756221413_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent-nrt1-1.cdninstagram.com&_nc_cat=1&_nc_ohc=W6KvodfhE9MAX8uPltd&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=Mjg3OTkyMjM3NTIyOTE4MDI5OQ%3D%3D.2-ccb7-5&oh=00_AT89r11qyd5u-_edJlxwr2yHSacjBS2JEG3WkeR5Dmhopw&oe=62D4B037&_nc_sid=30a2ef',
  },
  {
    uri: 'https://scontent-nrt1-1.cdninstagram.com/v/t51.2885-15/292855547_574289770964082_5203657297756221413_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent-nrt1-1.cdninstagram.com&_nc_cat=1&_nc_ohc=W6KvodfhE9MAX8uPltd&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=Mjg3OTkyMjM3NTIyOTE4MDI5OQ%3D%3D.2-ccb7-5&oh=00_AT89r11qyd5u-_edJlxwr2yHSacjBS2JEG3WkeR5Dmhopw&oe=62D4B037&_nc_sid=30a2ef',
  },
  {
    uri: 'https://scontent-nrt1-1.cdninstagram.com/v/t51.2885-15/292855547_574289770964082_5203657297756221413_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent-nrt1-1.cdninstagram.com&_nc_cat=1&_nc_ohc=W6KvodfhE9MAX8uPltd&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=Mjg3OTkyMjM3NTIyOTE4MDI5OQ%3D%3D.2-ccb7-5&oh=00_AT89r11qyd5u-_edJlxwr2yHSacjBS2JEG3WkeR5Dmhopw&oe=62D4B037&_nc_sid=30a2ef',
  },
  {
    uri: 'https://scontent-nrt1-1.cdninstagram.com/v/t51.2885-15/292855547_574289770964082_5203657297756221413_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent-nrt1-1.cdninstagram.com&_nc_cat=1&_nc_ohc=W6KvodfhE9MAX8uPltd&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=Mjg3OTkyMjM3NTIyOTE4MDI5OQ%3D%3D.2-ccb7-5&oh=00_AT89r11qyd5u-_edJlxwr2yHSacjBS2JEG3WkeR5Dmhopw&oe=62D4B037&_nc_sid=30a2ef',
  },
  {
    uri: 'https://scontent-nrt1-1.cdninstagram.com/v/t51.2885-15/292855547_574289770964082_5203657297756221413_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent-nrt1-1.cdninstagram.com&_nc_cat=1&_nc_ohc=W6KvodfhE9MAX8uPltd&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=Mjg3OTkyMjM3NTIyOTE4MDI5OQ%3D%3D.2-ccb7-5&oh=00_AT89r11qyd5u-_edJlxwr2yHSacjBS2JEG3WkeR5Dmhopw&oe=62D4B037&_nc_sid=30a2ef',
  },
  {
    uri: 'https://scontent-nrt1-1.cdninstagram.com/v/t51.2885-15/292855547_574289770964082_5203657297756221413_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent-nrt1-1.cdninstagram.com&_nc_cat=1&_nc_ohc=W6KvodfhE9MAX8uPltd&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=Mjg3OTkyMjM3NTIyOTE4MDI5OQ%3D%3D.2-ccb7-5&oh=00_AT89r11qyd5u-_edJlxwr2yHSacjBS2JEG3WkeR5Dmhopw&oe=62D4B037&_nc_sid=30a2ef',
  },
  {
    uri: 'https://scontent-nrt1-1.cdninstagram.com/v/t51.2885-15/292855547_574289770964082_5203657297756221413_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent-nrt1-1.cdninstagram.com&_nc_cat=1&_nc_ohc=W6KvodfhE9MAX8uPltd&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=Mjg3OTkyMjM3NTIyOTE4MDI5OQ%3D%3D.2-ccb7-5&oh=00_AT89r11qyd5u-_edJlxwr2yHSacjBS2JEG3WkeR5Dmhopw&oe=62D4B037&_nc_sid=30a2ef',
  },
  {
    uri: 'https://scontent-nrt1-1.cdninstagram.com/v/t51.2885-15/292855547_574289770964082_5203657297756221413_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent-nrt1-1.cdninstagram.com&_nc_cat=1&_nc_ohc=W6KvodfhE9MAX8uPltd&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=Mjg3OTkyMjM3NTIyOTE4MDI5OQ%3D%3D.2-ccb7-5&oh=00_AT89r11qyd5u-_edJlxwr2yHSacjBS2JEG3WkeR5Dmhopw&oe=62D4B037&_nc_sid=30a2ef',
  },
];
