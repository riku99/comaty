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

const images = [];
for (let i = 0; i < 20; i++) {
  images.push({
    uri: 'https://scontent-nrt1-1.cdninstagram.com/v/t51.2885-15/305687728_760502371906368_1682952372619693792_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08&_nc_ht=scontent-nrt1-1.cdninstagram.com&_nc_cat=1&_nc_ohc=5nBFTYHL398AX8ylFqE&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=MjkyNDA3ODA3MTM3ODU0NzA5Mg%3D%3D.2-ccb7-5&oh=00_AT-Y5-0ptQM45lXm0H-4-_sFQBTNugrQ7sP7w45dBSLvQA&oe=63237D30&_nc_sid=30a2ef',
  });
}
