import auth from '@react-native-firebase/auth';
import { StatusBar } from 'expo-status-bar';
import React, { useLayoutEffect } from 'react';
import { Pressable, SafeAreaView, Text } from 'react-native';

type Props = RootNavigationScreenProp<'BottomTab'>;

export const HomeScreen = ({ navigation }: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 16 }}>
      <Pressable
        onPress={async () => {
          await auth().signOut();
        }}
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
          サインアウト
        </Text>
      </Pressable>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};
