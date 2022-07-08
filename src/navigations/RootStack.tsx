import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useGetInitialStatusCompletionQuery } from 'src/generated/graphql';
import { useLoggedIn } from 'src/hooks/auth';
import { SexSelectionScreen } from 'src/screens/SexSelection';
import { AuthStack } from './AuthStack';
import { BottomTab } from './BottomTab';

export type RootStackParamList = {
  BottomTab: undefined;
  Auth: undefined;
  SexSelection: undefined;
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
            <>
              <Stack.Screen
                name="SexSelection"
                component={SexSelectionScreen}
              />
            </>
          )}
          <Stack.Screen
            name="BottomTab"
            component={BottomTab}
            options={{ headerShown: false }}
          />
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
