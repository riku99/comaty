import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { useCreatingPost, useCreatingPostReply } from 'src/hooks/post';
import { theme } from 'src/styles';

type Props = {
  containerStyle?: ViewStyle;
};

export const CreatingPost = () => {
  const { creatingPost } = useCreatingPost();
  const { creatingPostReply } = useCreatingPostReply();

  return (
    <>
      {(!creatingPost || creatingPostReply) && (
        <>
          <View style={styles.body}>
            <View style={styles.top}>
              <ActivityIndicator />
              <Text style={styles.creatingText}>
                {creatingPost ? '投稿中...' : '返信中...'}
              </Text>
            </View>
            <View style={styles.bar}>
              <View style={styles.barOverlay} />
            </View>
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  top: {
    marginLeft: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  creatingText: {
    fontWeight: '500',
    color: '#9e9e9e',
    marginLeft: 4,
  },
  bar: {
    backgroundColor: '#cfccff',
    width: '100%',
    height: 2.5,
    marginTop: 8,
  },
  barOverlay: {
    position: 'absolute',
    height: 2.5,
    backgroundColor: theme.primary,
    width: '92%',
  },
});
