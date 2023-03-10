import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
  AgeVerificationDocumentType,
  useGetInitialStatusCompletionQuery,
} from 'src/generated/graphql';
import { useLoggedIn } from 'src/hooks/auth';
import { AgeVerificationScreen } from 'src/screens/AgeVerification';
import { AgeVerification2Screen } from 'src/screens/AgeVerification2';
import { AgeVerificationDocumentCameraScreen } from 'src/screens/AgeVerificationDocumentCamera';
import { AgeVerificationRequestScreen } from 'src/screens/AgeVerificationRequest';
import { AgeVerificationUnderReviewScreen } from 'src/screens/AgeVerificationUnderReview';
import { BlockListScreen } from 'src/screens/BlockList';
import { ConfirmAgeVerificationDocumentPhotoScreen } from 'src/screens/ConfirmAgeVerificationDocumentPhoto';
import { DateOfBirthInputScreen } from 'src/screens/DateOfBirthInput';
import { DeleteAccountAlertScreen } from 'src/screens/DeleteAccountAlert';
import { GroupMembersScreen } from 'src/screens/GroupMembers';
import { GroupQLCodeScreen } from 'src/screens/GroupQRCode';
import { GroupQRCodeScannerScreen } from 'src/screens/GroupQRCodeScanner';
import { MessageRoomScreen } from 'src/screens/MessageRoom';
import { MessageUserProfileListScreen } from 'src/screens/MessageUserProfileList';
import { NarrowingDownScreen } from 'src/screens/NarrowingDown';
import { NicknameInputScreen } from 'src/screens/NicknameInput';
import { NotoficationScreen } from 'src/screens/Notification';
import { PlanSelectionScreen } from 'src/screens/PlanSelection';
import { PostCreationScreen } from 'src/screens/PostCreation';
import { PostDetailScreen } from 'src/screens/PostDetail';
import { PostReplyCreationScreen } from 'src/screens/PostReplyCreation';
import { QuestionReplyCreationScreen } from 'src/screens/QuestionReplyCreation';
import { SexSelectionScreen } from 'src/screens/SexSelection';
import { SignUpCompletionScreen } from 'src/screens/SignUpCompletion';
import { StoriesScreen } from 'src/screens/Stories';
import { StoryViewersScreen } from 'src/screens/StoryViewers';
import { TakeStoryScreen } from 'src/screens/TakeStory';
import { UserProfileScreen } from 'src/screens/UserProfile';
import { UserPreviewData } from 'src/types';
import { AuthStack } from './AuthStack';
import { BottomTab } from './BottomTab';
import { EditProfileStack } from './EditProfileStack';
import { QuestionCreationStack } from './QuestionCreationStack';
import { SettingStack } from './SettingStack';

export type RootStackParamList = {
  BottomTab: undefined;
  Auth: undefined;
  SexSelection: undefined;
  DateOfBirthInput: undefined;
  NicknameInput: undefined;
  SignUpCompletion: undefined;
  UserProfile: {
    id: string;
    previewData?: UserPreviewData;
  };
  EditProfileStack: undefined;
  TakeStory: undefined;
  Stories: {
    // storyIdsToDisplay???????????????????????????????????????????????????????????????????????????ID???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
    storyUsers: {
      userId: string;
      storyIdsToDisplay?: number[];
    }[];
    startingIndex: number;
  };
  StoryViewers: {
    storyId: number;
  };
  PostReply: {
    postId: number;
  };
  PostCreation: undefined;
  PostDetail: {
    id: number;
  };
  MessageRoom: {
    userId: string;
    roomId: number;
  };
  GroupQRCode: undefined;
  GroupQRCodeScanner: undefined;
  GroupMembers: {
    groupId: number;
    userId: string;
  };
  Notification: undefined;
  NarrowingDown: undefined;
  AgeVerification: undefined;
  AgeVerification2: {
    selectedDocumentType: AgeVerificationDocumentType;
  };
  AgeVerificationDocumentCamera: {
    selectedDocumentType: AgeVerificationDocumentType;
  };
  ConfirmAgeVerificationDocumentPhoto: {
    selectedDocumentType: AgeVerificationDocumentType;
    imageData: {
      uri: string;
      type: string;
    };
  };
  AgeVerificationUnderReview: undefined;
  AgeVerificationRequest: undefined;
  SettingStack: undefined;
  BlockList: undefined;
  DeleteAccountAlert: undefined;
  PlanSelection: undefined;
  MessageUserProfileList: {
    ids: string[];
  };
  QuestionCreationStack: undefined;
  QuestionReplyCreation:
    | {
        replyTo: 'question';
        id: number;
        name: string;
      }
    | {
        replyTo: 'questionReply';
        id: number;
        name: string;
      };
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
          <Stack.Screen name="Stories" component={StoriesScreen} />
          <Stack.Screen
            name="EditProfileStack"
            component={EditProfileStack}
            options={{ headerShown: false, gestureEnabled: false }}
          />
          <Stack.Screen name="MessageRoom" component={MessageRoomScreen} />
          <Stack.Screen name="GroupMembers" component={GroupMembersScreen} />
          <Stack.Screen name="Notification" component={NotoficationScreen} />
          <Stack.Screen
            name="SettingStack"
            component={SettingStack}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AgeVerification"
            component={AgeVerificationScreen}
          />
          <Stack.Screen
            name="AgeVerification2"
            component={AgeVerification2Screen}
          />
          <Stack.Screen
            name="ConfirmAgeVerificationDocumentPhoto"
            component={ConfirmAgeVerificationDocumentPhotoScreen}
          />
          <Stack.Screen name="BlockList" component={BlockListScreen} />
          <Stack.Screen
            name="DeleteAccountAlert"
            component={DeleteAccountAlertScreen}
          />
          <Stack.Screen
            name="AgeVerificationUnderReview"
            component={AgeVerificationUnderReviewScreen}
          />
          <Stack.Screen
            name="AgeVerificationRequest"
            component={AgeVerificationRequestScreen}
          />
          <Stack.Screen name="PlanSelection" component={PlanSelectionScreen} />
          <Stack.Screen
            name="MessageUserProfileList"
            component={MessageUserProfileListScreen}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Group
            screenOptions={{
              presentation: 'modal',
            }}
          >
            <Stack.Screen name="StoryViewers" component={StoryViewersScreen} />
            <Stack.Screen name="GroupQRCode" component={GroupQLCodeScreen} />
            <Stack.Screen
              name="NarrowingDown"
              component={NarrowingDownScreen}
            />
          </Stack.Group>

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
              name="QuestionCreationStack"
              component={QuestionCreationStack}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="QuestionReplyCreation"
              component={QuestionReplyCreationScreen}
            />
            <Stack.Screen
              name="TakeStory"
              component={TakeStoryScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="GroupQRCodeScanner"
              component={GroupQRCodeScannerScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="AgeVerificationDocumentCamera"
              component={AgeVerificationDocumentCameraScreen}
              options={{
                headerShown: false,
              }}
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
