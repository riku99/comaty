import { Text } from '@rneui/themed';
import { useLayoutEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { HeaderRightButton } from 'src/components/ui/HeaderRightButton';
import { TextInput } from 'src/components/ui/TextInput';
import { theme } from 'src/styles';

type Props = RootNavigationScreenProp<'MyTagSelection'>;

export const MyTagSelectionScreen = ({ navigation }: Props) => {
  const [text, setText] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'マイタグの編集',
      headerBackVisible: false,
      headerShadowVisible: false,
      headerRight: () => (
        <HeaderRightButton
          title="OK"
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contents}>
        <View style={styles.inputContainer}>
          <Text style={styles.hash}># </Text>
          <View
            style={{
              flex: 1,
            }}
          >
            <TextInput
              style={{
                fontSize: 16,
              }}
              value={`${text}`}
              onChangeText={setText}
            />
          </View>

          <Pressable style={styles.addButton}>
            <Text style={styles.addText}>追加</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contents: {
    paddingHorizontal: 16,
  },
  inputContainer: {
    marginTop: 34,
    width: '100%',
    borderBottomColor: theme.gray.formBorder,
    borderBottomWidth: 0.6,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 4,
  },
  hash: {
    fontSize: 16,
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  addText: {
    fontWeight: 'bold',
    color: '#fff',
  },
});
