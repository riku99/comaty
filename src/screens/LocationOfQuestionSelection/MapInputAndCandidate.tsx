import { AntDesign } from '@expo/vector-icons';
import { Text } from '@rneui/themed';
import { useRef } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

type Props = {
  onFocus: () => void;
  onBlur: () => void;
  onChangeText: (text: string) => void;
  locationTitles: string[];
  onInputClosePress: () => void;
  onCandidateLocationPress: (index: number) => void;
  inputText: string;
};

export const MapInputAndCandidate = ({
  onFocus,
  onBlur,
  locationTitles,
  onChangeText,
  onInputClosePress,
  onCandidateLocationPress,
  inputText,
}: Props) => {
  const inputRef = useRef<TextInput>(null);

  return (
    <View>
      <View
        style={[
          styles.inputContainer,
          {
            borderRadius: locationTitles.length ? 0 : 22,
          },
        ]}
      >
        <TextInput
          ref={inputRef}
          value={inputText}
          placeholder="マップで検索"
          onChangeText={onChangeText}
          style={[
            styles.input,
            {
              borderRadius: locationTitles.length ? 0 : 22,
            },
          ]}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {!!locationTitles.length && (
          <Pressable onPress={onInputClosePress}>
            <AntDesign name="close" size={18} color="black" />
          </Pressable>
        )}
      </View>
      {locationTitles.map((l, index) => {
        return (
          <Pressable
            key={index}
            style={styles.candidateLocationBox}
            onPress={() => {
              onCandidateLocationPress(index);
            }}
          >
            <Text>{l}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: '#fff',
    height: 44,
    paddingHorizontal: 14,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 8,
    },
    shadowOpacity: 0.24,
    shadowRadius: 22,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    width: '88%',
  },
  candidateLocationBox: {
    height: 44,
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    justifyContent: 'center',
  },
});
