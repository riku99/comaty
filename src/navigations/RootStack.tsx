import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useGetInitialStatusCompletionQuery } from 'src/generated/graphql';
import { useLoggedIn } from 'src/hooks/auth';
import { DateOfBirthInputScreen } from 'src/screens/DateOfBirthInput';
import { NicknameInputScreen } from 'src/screens/NicknameInput';
import { SexSelectionScreen } from 'src/screens/SexSelection';
import { SignUpCompletionScreen } from 'src/screens/SignUpCompletion';
import { AuthStack } from './AuthStack';
import { BottomTab } from './BottomTab';

export type RootStackParamList = {
  BottomTab: undefined;
  Auth: undefined;
  SexSelection: undefined;
  DateOfBirthInput: undefined;
  NicknameInput: undefined;
  SignUpCompletion: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack = () => {
  const { loggedIn } = useLoggedIn();

  const {
    data: initialStatusCompletionData,
  } = useGetInitialStatusCompletionQuery({
    fetchPolicy: 'cache-only',
  });

  const initialStatusCompletion = !!initialStatusCompletionData?.me
    ?.initialStatusCompletion;

  return (
    <Stack.Navigator>
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
        </>
      ) : (
        <Stack.Screen
          name="Auth"
          component={AuthStack}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};
