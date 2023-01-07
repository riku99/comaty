import { useEffect, useLayoutEffect } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { View } from 'react-native-animatable';
import { UserProfile } from 'src/components/domain/user/UserProfile';
import {
  UserGetError,
  useUserProfileScreenDataQuery,
} from 'src/generated/graphql';
import { getGraphQLError } from 'src/utils';

type Props = RootNavigationScreenProp<'UserProfile'>;

export const UserProfileScreen = ({ navigation, route }: Props) => {
  const { id, previewData } = route.params;
  const { data, loading } = useUserProfileScreenDataQuery({
    variables: {
      id,
    },
    fetchPolicy: 'cache-and-network',
    onError: (e) => {
      const ge = getGraphQLError(e, 0);
      if (ge.code === UserGetError.NotFound) {
        Alert.alert('ユーザーが見つかりません', '', [
          {
            text: 'OK',
            onPress: () => {
              navigation.goBack();
            },
          },
        ]);
      }
    },
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    if (data?.user.blocking && !loading) {
      Alert.alert('ユーザーが見つかりません', '', [
        {
          text: 'OK',
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    }
  }, [data, navigation]);

  return (
    <View style={styles.container}>
      <UserProfile id={id} previewData={previewData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
