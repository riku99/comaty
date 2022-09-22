import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useGetInitialStatusCompletionQuery } from 'src/generated/graphql';
import { useLoggedIn } from 'src/hooks/auth';
import { DateOfBirthInputScreen } from 'src/screens/DateOfBirthInput';
import { NicknameInputScreen } from 'src/screens/NicknameInput';
import { PostCreationScreen } from 'src/screens/PostCreation';
import { PostDetailScreen } from 'src/screens/PostDetail';
import { PostReplyCreationScreen } from 'src/screens/PostReplyCreation';
import { QuestionCreationScreen } from 'src/screens/QuestionCreation';
import { SexSelectionScreen } from 'src/screens/SexSelection';
import { SignUpCompletionScreen } from 'src/screens/SignUpCompletion';
import { UserProfileScreen } from 'src/screens/UserProfile';
import { AuthStack } from './AuthStack';
import { BottomTab } from './BottomTab';

export type RootStackParamList = {
  BottomTab: undefined;
  Auth: undefined;
  SexSelection: undefined;
  DateOfBirthInput: undefined;
  NicknameInput: undefined;
  SignUpCompletion: undefined;
  UserProfile: {
    id: string;
  };
  PostReply: {
    postId: number;
  };
  PostCreation: undefined;
  PostDetail: {
    id: number;
  };
  QuestionCreation: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack = () => {
  const { loggedIn } = useLoggedIn();

  const { data: initialStatusCompletionData } =
    useGetInitialStatusCompletionQuery({
      fetchPolicy: 'cache-only',
    });

  const initialStatusCompletion =
    !!initialStatusCompletionData?.me?.initialStatusCompletion;

  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: '#fff',
        },
      }}
    >
      {loggedIn ? (
        <>
          {!initialStatusCompletion && (
            <Stack.Screen
              name="SignUpCompletion"
              component={SignUpCompletionScreen}
            />
          )}
          <Stack.Screen
            name="BottomTab"
            component={BottomTab}
            options={{ headerShown: false, gestureEnabled: false }}
          />
          <Stack.Screen
            name="DateOfBirthInput"
            component={DateOfBirthInputScreen}
          />
          <Stack.Screen name="NicknameInput" component={NicknameInputScreen} />
          <Stack.Screen name="SexSelection" component={SexSelectionScreen} />
          <Stack.Screen name="UserProfile" component={UserProfileScreen} />
          <Stack.Screen name="PostDetail" component={PostDetailScreen} />

          <Stack.Group
            screenOptions={{
              presentation: 'fullScreenModal',
            }}
          >
            <Stack.Screen name="PostCreation" component={PostCreationScreen} />
            <Stack.Screen
              name="PostReply"
              component={PostReplyCreationScreen}
            />
            <Stack.Screen
              name="QuestionCreation"
              component={QuestionCreationScreen}
            />
          </Stack.Group>
        </>
      ) : (
        <>
          <Stack.Screen
            name="Auth"
            component={AuthStack}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="UserProfile" component={UserProfileScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};
