import { Text } from '@rneui/themed';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';

export const Post = () => {
  return (
    <View style={styles.body}>
      <FastImage source={{ uri }} style={styles.profileImage} />

      <View style={styles.rightContent}>
        <Text style={styles.name}>Rose</Text>

        <Text style={styles.text}>
          ほぼすべてのプロダクトが GraphQL を介してリソースを取得
          しています。一昔前はすべてのリクエストを REST
        </Text>
      </View>
    </View>
  );
};

const IMAGE_SIZE = 50;

const uri =
  'https://scontent-nrt1-1.cdninstagram.com/v/t51.2885-15/305687728_760502371906368_1682952372619693792_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08&_nc_ht=scontent-nrt1-1.cdninstagram.com&_nc_cat=1&_nc_ohc=5nBFTYHL398AX8ylFqE&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=MjkyNDA3ODA3MTM3ODU0NzA5Mg%3D%3D.2-ccb7-5&oh=00_AT-Y5-0ptQM45lXm0H-4-_sFQBTNugrQ7sP7w45dBSLvQA&oe=63237D30&_nc_sid=30a2ef';

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
  profileImage: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 90,
  },
  rightContent: {
    marginLeft: 10,
    marginTop: 2,
    flexShrink: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  text: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
});
