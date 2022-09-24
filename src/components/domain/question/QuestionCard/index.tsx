import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import FastImage, { FastImageProps } from 'react-native-fast-image';
import { ProfileImage } from 'src/components/domain/user/ProfileImage';
import { QuestionCardFragment } from 'src/generated/graphql';
import { theme } from 'src/styles';
import { getTimeDiff } from 'src/utils';

type Props = {
  questionData: QuestionCardFragment;
};

export const QuestionCard = ({ questionData }: Props) => {
  const { user, images } = questionData;
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
          <ProfileImage
            imageData={user.firstProfileImage}
            style={{
              width: IMAGE_SIZE,
              height: IMAGE_SIZE,
              borderRadius: IMAGE_SIZE,
            }}
          />
          <Text style={styles.name}>{user.nickname}</Text>
        </View>
        <Text style={styles.diff}>{getTimeDiff(questionData.createdAt)}</Text>
      </View>
      <Text style={styles.text}>{questionData.text}</Text>

      {!!images.length && (
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
                  source={{ uri: img.url }}
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
    borderBottomColor: theme.boarderGray,
    borderBottomWidth: 0.5,
    paddingVertical: 18,
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
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    borderRadius: 24,
  },
  answer: {
    color: theme.primary,
    fontWeight: 'bold',
    fontSize: 15,
  },
});
