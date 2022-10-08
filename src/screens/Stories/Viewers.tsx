import { Text } from '@rneui/themed';
import { StyleSheet, View } from 'react-native';
import { ProfileImage } from 'src/components/domain/user/ProfileImage';
import { ViewersInStoriesFragment } from 'src/generated/graphql';

type Props = {
  viewersData: ViewersInStoriesFragment;
};

export const Viewers = ({ viewersData }: Props) => {
  if (!viewersData.seenList.edges.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.images}>
        {viewersData.seenList.edges.map((s, index) => {
          return (
            <View
              key={s.node.id}
              style={[
                styles.imageOuter,
                {
                  transform: [{ translateX: -(index * 14) }],
                },
              ]}
            >
              <ProfileImage
                imageData={s.node.user.firstProfileImage}
                style={{
                  width: IMAGE_SIZE,
                  height: IMAGE_SIZE,
                  borderRadius: IMAGE_SIZE,
                }}
              />
            </View>
          );
        })}
      </View>

      <Text
        style={[
          styles.viewersText,
          {
            transform: [
              {
                translateX:
                  viewersData.seenList.edges.length > 1
                    ? -(viewersData.seenList.edges.length - 1 * 7)
                    : 0,
              },
            ],
          },
        ]}
      >
        アクティビティ
      </Text>
    </View>
  );
};

const IMAGE_SIZE = 34;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  images: {
    flexDirection: 'row',
  },
  viewersText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 2,
  },
  imageOuter: {
    width: IMAGE_SIZE + 6,
    height: IMAGE_SIZE + 6,
    borderRadius: IMAGE_SIZE + 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
