import { Entypo } from '@expo/vector-icons';
import { MenuAction, MenuView } from '@react-native-menu/menu';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import FastImage, { FastImageProps } from 'react-native-fast-image';
import { ProfileImage } from 'src/components/domain/user/ProfileImage';
import { QuestionCardFragment, useMyIdQuery } from 'src/generated/graphql';
import { theme } from 'src/styles';
import { getTimeDiff } from 'src/utils';

type Props = {
  questionData: QuestionCardFragment;
  isReply?: boolean;
};

export const QuestionCard = ({ questionData, isReply = false }: Props) => {
  const { user, images, isAnonymity } = questionData;
  const { data: idData } = useMyIdQuery({
    fetchPolicy: 'cache-only',
  });
  const [dotsMenuActions, setDotsMenuActions] = useState<MenuAction[]>([
    {
      id: reportMenuId,
      title: '報告',
    },
  ]);
  const navigation = useNavigation<RootNavigationProp<any>>();

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
          height: 180,
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

  useEffect(() => {
    if (user.id === idData.me.id) {
      setDotsMenuActions((c) => {
        return [
          ...c,
          {
            id: deleteMenuId,
            title: '削除',
            attributes: {
              destructive: true,
            },
            image: 'trash',
            imageColor: 'red',
          },
        ];
      });
    }
  }, [idData, user.id]);

  const onBodyPress = () => {
    navigation.navigate('QuestionAndReplys', {
      id: questionData.id,
    });
  };

  const onAnswerPress = () => {
    navigation.navigate('QuestionReplyCreation', {
      replyTo: 'question',
      id: questionData.id,
      name: isAnonymity ? '匿名' : user.nickname,
    });
  };

  return (
    <Pressable style={styles.body} onPress={onBodyPress}>
      <View style={styles.top}>
        <View style={styles.imageAndName}>
          {!isAnonymity ? (
            <>
              <ProfileImage
                imageData={user.firstProfileImage}
                style={{
                  width: IMAGE_SIZE,
                  height: IMAGE_SIZE,
                  borderRadius: IMAGE_SIZE,
                }}
              />
              <Text style={styles.name}>{user.nickname}</Text>
            </>
          ) : (
            <Text style={styles.anonymity}>匿名質問</Text>
          )}
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

      <View style={styles.bottomContents}>
        <Pressable style={styles.answerButton} onPress={onAnswerPress}>
          <Text style={styles.answer}>答える</Text>
        </Pressable>

        <MenuView actions={dotsMenuActions} onPressAction={(e) => {}}>
          <Pressable>
            <Entypo name="dots-three-horizontal" size={22} color={'#c7c7c7'} />
          </Pressable>
        </MenuView>
      </View>
    </Pressable>
  );
};

const deleteMenuId = 'delete';
const reportMenuId = 'report';

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
    width: '100%',
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
  bottomContents: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  anonymity: {
    fontWeight: 'bold',
    color: '#a3a3a3',
  },
});
