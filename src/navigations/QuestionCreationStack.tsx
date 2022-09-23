import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LocationOfQuestionSelectionScreen } from 'src/screens/LocationOfQuestionSelection';
import { QuestionCreationScreen } from 'src/screens/QuestionCreation';

export type QuestionCreationStackParamList = {
  QuestionCreation: undefined;
  LocationOfQuestionSelection: undefined;
};

const Stack = createNativeStackNavigator<QuestionCreationStackParamList>();

export const QuestionCreationStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="QuestionCreation"
        component={QuestionCreationScreen}
      />
      <Stack.Screen
        name="LocationOfQuestionSelection"
        component={LocationOfQuestionSelectionScreen}
      />
    </Stack.Navigator>
  );
};
