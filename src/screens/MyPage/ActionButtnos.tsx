import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActionButton } from './ActionButton';

export const ActionButtons = () => {
  const navigation = useNavigation<RootNavigationProp<'MyPage'>>();

  return (
    <View style={styles.actionButtons1}>
      <ActionButton
        icon={
          <MaterialCommunityIcons
            name="card-text"
            size={ACTION_BUTTON_ICON_SIZE}
            color={ACTION_BUTTON_COLOR}
          />
        }
        title="マイ投稿"
        onPress={() => {
          navigation.navigate('MyPosts');
        }}
        buttonSize={ACTION_BUTTON_SIZE}
      />
      <View style={styles.editButton}>
        <ActionButton
          icon={
            <MaterialIcons
              name="edit"
              size={ACTION_BUTTON_ICON_SIZE}
              color={ACTION_BUTTON_COLOR}
            />
          }
          title="プロフィール編集"
          onPress={() => {
            navigation.navigate('EditProfileStack');
          }}
          buttonSize={ACTION_BUTTON_SIZE}
        />
      </View>

      <ActionButton
        icon={
          <MaterialIcons
            name="group"
            size={ACTION_BUTTON_ICON_SIZE}
            color={ACTION_BUTTON_COLOR}
          />
        }
        buttonSize={ACTION_BUTTON_SIZE}
        onPress={() => {
          navigation.navigate('MyGroup');
        }}
        title="グループ"
      />
    </View>
  );
};

const ACTION_BUTTON_SIZE = 60;
const ACTION_BUTTON_COLOR = '#666666';
const ACTION_BUTTON_ICON_SIZE = 24;

const styles = StyleSheet.create({
  actionButtons1: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 0,
  },
  editButton: {
    transform: [{ translateY: 18 }],
  },
});
