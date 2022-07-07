import { StatusBar } from 'expo-status-bar';
import React, { useLayoutEffect } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { useGetUserQuery } from 'src/generated/graphql';

type Props = RootNavigationScreenProp<'BottomTab'>;

export const HomeScreen = ({ navigation }: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const { data } = useGetUserQuery({
    variables: {
      id: 'ij',
    },
  });

  console.log(data);

  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 16 }}>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 32,
          marginTop: 4,
          fontFamily: 'Chalkboard SE',
          color: '#0f1d61',
        }}
      >
        Home
      </Text>
      <Text
        style={{
          fontSize: 16,
          fontWeight: 'bold',
          marginTop: 20,
          color: '#262626',
        }}
      >
        This is テキスト
      </Text>
      <View
        style={{
          width: '100%',
          height: 54,
          backgroundColor: '#526eff',
          borderRadius: 6,
          position: 'absolute',
          bottom: 64,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 18 }}>
          送信
        </Text>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};
