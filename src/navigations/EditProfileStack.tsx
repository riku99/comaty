import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EditProfileScreen } from 'src/screens/EditProfile';
import { MyTagSelectionScreen } from 'src/screens/MyTagSelection';

export type EditProfileStackParamList = {
  EditProfile: undefined;
  MyTagSelection: undefined;
};

const Stack = createNativeStackNavigator<EditProfileStackParamList>();

export const EditProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="MyTagSelection" component={MyTagSelectionScreen} />
    </Stack.Navigator>
  );
};
