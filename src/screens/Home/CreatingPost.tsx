import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { useCreatingPost } from 'src/hooks/post';

type Props = {
  containerStyle?: ViewStyle;
};

export const CreatingPost = () => {
  const { creatingPost } = useCreatingPost();

  return (
    <>
      {creatingPost && (
        <>
          <View style={styles.body}>
            <View style={styles.top}>
              <ActivityIndicator />
              <Text style={styles.creatingText}>投稿中...</Text>
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
    backgroundColor: '#a1c0ff',
    width: '100%',
    height: 2.5,
    marginTop: 8,
  },
  barOverlay: {
    position: 'absolute',
    height: 2.5,
    backgroundColor: '#1f69ff',
    width: '92%',
  },
});
