import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import FastImage, { FastImageProps } from 'react-native-fast-image';
import { theme } from 'src/styles';

const image =
  'https://scontent-nrt1-1.cdninstagram.com/v/t51.2885-15/302700128_776325980258650_5219257444505277210_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08&_nc_ht=scontent-nrt1-1.cdninstagram.com&_nc_cat=110&_nc_ohc=wMXA13UYsY0AX9QY8os&tn=IvOg5e0MTmVxXJmw&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=MjkxOTU3OTY1MTIxMzI0ODMyOQ%3D%3D.2-ccb7-5&oh=00_AT97coUfyK--g4dW99-KTi6UBcOhOmm7HWnCjIM30cPZ-Q&oe=632E9483&_nc_sid=30a2ef';

const images = [image, image, image, image];

export const HelpCard = () => {
  const getImageStyle = (
    index: number
  ): {
    imageStyle: FastImageProps['style'];
    imageContainerStyle: ViewStyle;
  } => {
    if (images.length === 1) {
      return {
        imageStyle: {
          borderRadius: IMAGE_BORDER_RADIUS,
        },
        imageContainerStyle: {
          width: '100%',
          height: 160,
        },
      };
    } else if (images.length === 2) {
      return {
        imageStyle: {
          borderTopLeftRadius: index === 0 ? IMAGE_BORDER_RADIUS : 0,
          borderTopRightRadius: index === 1 ? IMAGE_BORDER_RADIUS : 0,
          borderBottomLeftRadius: index === 0 ? IMAGE_BORDER_RADIUS : 0,
          borderBottomRightRadius: index === 1 ? IMAGE_BORDER_RADIUS : 0,
        },
        imageContainerStyle: {
          width: '49.5%',
          height: 160,
        },
      };
    } else {
      return {
        imageStyle: {
          borderTopLeftRadius: index === 0 ? IMAGE_BORDER_RADIUS : 0,
          borderTopRightRadius: index === 1 ? IMAGE_BORDER_RADIUS : 0,
          borderBottomLeftRadius: index === 2 ? IMAGE_BORDER_RADIUS : 0,
          borderBottomRightRadius: index === 3 ? IMAGE_BORDER_RADIUS : 0,
        },
        imageContainerStyle: {
          width: '49.5%',
          height: 70,
        },
      };
    }
  };

  return (
    <View style={styles.body}>
      <View style={styles.top}>
        <View style={styles.imageAndName}>
          <FastImage
            source={{ uri: image }}
            style={{
              width: IMAGE_SIZE,
              height: IMAGE_SIZE,
              borderRadius: IMAGE_SIZE,
            }}
          />
          <Text style={styles.name}>Riku</Text>
        </View>
        <Text style={styles.diff}>3分前</Text>
      </View>
      <Text style={styles.text}>
        すいません誰か渋谷駅の半蔵門線周辺でこの財布拾った方いませんか😭
      </Text>

      {images.length && (
        <View style={styles.images}>
          {images.map((img, index) => {
            return (
              <Pressable
                key={index}
                style={[
                  getImageStyle(index).imageContainerStyle,
                  { marginTop: index > 1 ? 3 : 0 },
                ]}
              >
                <FastImage
                  source={{ uri: img }}
                  style={[styles.image, getImageStyle(index).imageStyle]}
                />
              </Pressable>
            );
          })}
        </View>
      )}

      <Pressable style={styles.answerButton}>
        <Text style={styles.answer}>答える</Text>
      </Pressable>
    </View>
  );
};

const IMAGE_SIZE = 38;
const IMAGE_BORDER_RADIUS = 16;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    paddingHorizontal: 20,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontWeight: 'bold',
    marginLeft: 6,
  },
  imageAndName: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  diff: {
    fontWeight: '500',
    color: '#a3a3a3',
    fontSize: 12,
  },
  images: {
    width: '75%',
    marginTop: 14,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  text: {
    marginTop: 8,
    fontSize: 16,
    lineHeight: 22,
  },
  answerButton: {
    marginTop: 14,
    borderWidth: 1.5,
    borderColor: theme.primary,
    width: 90,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 24,
  },
  answer: {
    color: theme.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
