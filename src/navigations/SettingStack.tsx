import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ChangeEmailAddressScreen } from 'src/screens/ChangeEmailAddress';
import { SettingScreen } from 'src/screens/Setting';

export type SettingStackParamList = {
  SettingMain: undefined;
  ChangeEmailAddress: undefined;
};

const Stack = createNativeStackNavigator<SettingStackParamList>();

export const SettingStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen name="SettingMain" component={SettingScreen} />
      <Stack.Screen
        name="ChangeEmailAddress"
        component={ChangeEmailAddressScreen}
      />
    </Stack.Navigator>
  );
};
