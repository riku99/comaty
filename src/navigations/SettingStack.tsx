import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SettingScreen } from 'src/screens/Setting';

export type SettingStackParamList = {
  SettingMain: undefined;
};

const Stack = createNativeStackNavigator<SettingStackParamList>();

export const SettingStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SettingMain" component={SettingScreen} />
    </Stack.Navigator>
  );
};
