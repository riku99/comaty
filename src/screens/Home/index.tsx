import { Text } from '@rneui/themed';
import { MotiView } from 'moti';
import React, { useCallback, useLayoutEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { UserCard } from 'src/components/UserCard';

type Props = RootNavigationScreenProp<'BottomTab'>;

export const HomeScreen = ({ navigation }: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerShadowVisible: false,
      headerLeft: () => <Text style={styles.headerTitle}>近くのユーザー</Text>,
    });
  }, [navigation]);

  const renderUser = useCallback(
    ({ item, index }: { item: any; index: number }) => {
      return (
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            type: 'timing',
            duration: 1500,
          }}
          delay={index * 150}
        >
          <UserCard
            containerStyle={{
              marginTop: index % 2 !== 0 ? 45 : 0,
            }}
          />
        </MotiView>
      );
    },
    []
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={u}
        renderItem={renderUser}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
        }}
        contentContainerStyle={{
          paddingHorizontal: '8%',
          paddingTop: 20,
        }}
        ItemSeparatorComponent={() => <View style={{ height: 26 }} />}
        ListFooterComponent={() => <View style={{ height: 26 }} />}
      />
    </View>
  );
};

const u = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 22,
    marginLeft: 16,
  },
});

const tags = [
  '3人でいます✌️',
  '184㌢',
  'ビール好き🍺',
  '奢ります🆗',
  'よく喋る😏',
  '新宿Love💜',
];
