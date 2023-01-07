import { useCallback } from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import { UserProfileItem } from './UserProfileItem';

type Props = RootNavigationScreenProp<'MessageUserProfileList'>;

export const MessageUserProfileListScreen = ({ route }: Props) => {
  const { ids } = route.params;

  const renderUserProfile = useCallback(({ item }: { item: string }) => {
    return <UserProfileItem id={item} />;
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={ids}
        renderItem={renderUserProfile}
        keyExtractor={(item) => item}
        getItemLayout={(_, index) => {
          return {
            length: screenHeight,
            offset: index * screenHeight,
            index,
          };
        }}
        snapToInterval={screenHeight}
        showsVerticalScrollIndicator={false}
        decelerationRate="fast"
      />
    </View>
  );
};

const { height: screenHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
