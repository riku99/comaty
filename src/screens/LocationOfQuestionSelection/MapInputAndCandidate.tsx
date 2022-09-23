import { Text } from '@rneui/themed';
import { StyleSheet, TextInput, View } from 'react-native';

type Props = {
  onFocus: () => void;
  onBlur: () => void;
  onChangeText: (text: string) => void;
  locationTitles: string[];
};

export const MapInputAndCandidate = ({
  onFocus,
  onBlur,
  locationTitles,
  onChangeText,
}: Props) => {
  return (
    <View>
      <TextInput
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
      {locationTitles.map((l, index) => {
        return (
          <View key={index} style={styles.candidateLocationBox}>
            <Text>{l}</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    paddingHorizontal: 14,
  },
  input: {
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
  },
  candidateLocationBox: {
    height: 42,
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    justifyContent: 'center',
  },
});
