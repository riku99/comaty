import { Text } from '@rneui/themed';
import { useLayoutEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { HeaderRightButton } from 'src/components/ui/HeaderRightButton';
import { TextInput } from 'src/components/ui/TextInput';
import {
  useCreateMyTagMutation,
  useMyTagSelectionScreenDataQuery,
} from 'src/generated/graphql';
import { theme } from 'src/styles';
import { TagWithOption } from './TagWithOption';

type Props = RootNavigationScreenProp<'MyTagSelection'>;

export const MyTagSelectionScreen = ({ navigation }: Props) => {
  const { data } = useMyTagSelectionScreenDataQuery();
  const [text, setText] = useState('');
  const [createMyTagMutation] = useCreateMyTagMutation();

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

  const onAddPress = async () => {
    if (!text) {
      return;
    }

    const { data: createTagData } = await createMyTagMutation({
      variables: {
        input: {
          text,
        },
      },
    });
  };

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

          <Pressable style={styles.addButton} onPress={onAddPress}>
            <Text style={styles.addText}>追加</Text>
          </Pressable>
        </View>

        <View style={styles.currentMyTagsContainer}>
          <Text style={styles.labelStyle}>設定されているマイタグ</Text>
          <View
            style={{
              marginTop: 12,
            }}
          >
            {data?.me ? (
              <View style={styles.tags}>
                {data.me.myTags.map((tag) => {
                  return (
                    <View
                      key={tag.id}
                      style={{
                        marginLeft: 14,
                      }}
                    >
                      <TagWithOption text={tag.text} onOptionPress={() => {}} />
                    </View>
                  );
                })}
              </View>
            ) : (
              <ActivityIndicator />
            )}
          </View>
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
  currentMyTagsContainer: {
    marginTop: 42,
  },
  labelStyle: {
    fontWeight: 'bold',
    color: theme.gray.text,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    transform: [{ translateX: -14 }],
  },
});
