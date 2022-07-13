import auth from '@react-native-firebase/auth';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export const NotoficationScreen = React.memo(() => {
  return (
    <View style={styles.container}>
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
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
