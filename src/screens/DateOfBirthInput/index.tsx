import { Text } from '@rneui/themed';
import React, { useLayoutEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { BottomAnimatedButton } from 'src/components/BottomAnimatedButton';
import { useDateOfBirth } from 'src/hooks/initialStatus';
import { theme } from 'src/styles';

type Props = RootNavigationScreenProp<'DateOfBirthInput'>;

export const DateOfBirthInputScreen = ({ navigation }: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerShadowVisible: false,
    });
  }, [navigation]);

  const { birthDay, birthMonth, birthYear, setDateOfBirth } = useDateOfBirth();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const notCompleted = !birthDay || !birthMonth || !birthYear;

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setDateOfBirth({
      birthYear: date.getFullYear(),
      birthMonth: date.getMonth() + 1,
      birthDay: date.getDate(),
    });
    hideDatePicker();
  };

  const onSelectionPress = () => {
    setDatePickerVisibility(true);
  };

  const onNextPress = () => {
    navigation.navigate('NicknameInput');
  };

  return (
    <View style={styles.container}>
      <View style={styles.contents}>
        <Text h2 style={styles.title}>
          生年月日
        </Text>

        <Text style={styles.desc}>
          登録後は変更できせん。十分ご注意ください。
        </Text>

        <View style={styles.input}>
          {notCompleted ? (
            <Pressable
              style={styles.selectionContainer}
              onPress={onSelectionPress}
            >
              <Text style={styles.selectionTitle}>選択してください</Text>
            </Pressable>
          ) : (
            <Pressable onPress={onSelectionPress}>
              <Text style={styles.dateText}>{`${birthYear} / ${birthMonth
                .toString()
                .padStart(2, '0')} / ${birthDay
                .toString()
                .padStart(2, '0')}`}</Text>
            </Pressable>
          )}
        </View>
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        locale="ja_JP"
        cancelTextIOS="キャンセル"
        confirmTextIOS="完了"
      />

      <BottomAnimatedButton
        title="次へ"
        disabled={notCompleted}
        onPress={onNextPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    marginTop: 14,
  },
  contents: {
    paddingHorizontal: 14,
  },
  desc: {
    marginTop: 18,
    color: theme.textGray,
  },
  input: {
    marginTop: 20,
  },
  selectionContainer: {
    backgroundColor: 'rgba(204, 204, 204, 0.4)',
    width: 200,
    paddingLeft: 10,
    paddingVertical: 10,
    borderRadius: 12,
  },
  selectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#828282',
  },
  dateText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
