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
        style={styles.input}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {locationTitles.map((l, index) => {
        return (
          <View key={index}>
            <Text>{l}</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    height: 44,
    borderRadius: 22,
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
});
