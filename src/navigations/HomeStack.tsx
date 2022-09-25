import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from 'src/screens/Home';
import { PostDetailScreen } from 'src/screens/PostDetail';
import { QuestionAndReplysScreen } from 'src/screens/QuestionAndReplys';
import { QuestionReplysScreen } from 'src/screens/QuestionReplys';

export type HomeStackParamList = {
  HomeMain: undefined;
  PostDetail: {
    id: number;
  };
  QuestionAndReplys: {
    id: number;
  };
  QuestionReplys: {
    id: number;
  };
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="PostDetail" component={PostDetailScreen} />
      <Stack.Screen
        name="QuestionAndReplys"
        component={QuestionAndReplysScreen}
      />
      <Stack.Screen name="QuestionReplys" component={QuestionReplysScreen} />
    </Stack.Navigator>
  );
};
