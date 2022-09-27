import MaskedView from '@react-native-masked-view/masked-view';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Text } from '@rneui/themed';
import { BlurView } from 'expo-blur';
import { useLayoutEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { SquircleView } from 'react-native-figma-squircle';
import { HeaderLeftTitle } from 'src/components/ui/HeaderLeftTitle';
import { theme } from 'src/styles';
import { Activity } from './Activity';
import { Questions } from './Questions';

type Props = RootNavigationScreenProp<'BottomTab'>;

export const HomeScreen = ({ navigation }: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
      headerLeft: () => <HeaderLeftTitle title="ホーム🦄" />,
      headerTitle: '',
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View
        style={{
          width: '48%',
          marginTop: 12,
        }}
      >
        <MaskedView
          maskElement={
            <SquircleView
              style={StyleSheet.absoluteFill}
              squircleParams={{
                cornerRadius: 36,
                cornerSmoothing: 1,
              }}
            />
          }
        >
          <FastImage
            source={{
              uri: 'https://scontent-nrt1-1.cdninstagram.com/v/t51.2885-15/302700128_776325980258650_5219257444505277210_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08&_nc_ht=scontent-nrt1-1.cdninstagram.com&_nc_cat=110&_nc_ohc=5dILAvlv9a8AX9DXVul&tn=IvOg5e0MTmVxXJmw&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=MjkxOTU3OTY1MTIxMzI0ODMyOQ%3D%3D.2-ccb7-5&oh=00_AT9kbpwvbbDe0TJM7zGKK89pRz4HJRnsa0bFS2sEKNsCwA&oe=633A7203&_nc_sid=30a2ef',
            }}
            style={styles.image}
          >
            <View
              style={{
                position: 'absolute',
                bottom: 10,
                width: '70%',
                alignItems: 'center',
                overflow: 'hidden',
                borderRadius: 100,
                borderWidth: 0.6,
                borderColor: '#D6D6D6',
              }}
            >
              <BlurView
                intensity={40}
                style={{
                  width: '100%',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                    paddingVertical: 4,
                  }}
                >
                  400m先
                </Text>
              </BlurView>
            </View>
          </FastImage>
        </MaskedView>
        <View
          style={{
            marginLeft: 4,
          }}
        >
          <Text style={styles.name}>
            ジゼル,{' '}
            <Text
              style={{
                fontSize: 18,
              }}
            >
              24
            </Text>
          </Text>
          <Text style={styles.singleWord}>渋谷で飲める人！</Text>
        </View>
      </View>
    </View>
  );
};

type TopTabParamList = {
  Activity: undefined;
  Question: undefined;
};

const TopTab = createMaterialTopTabNavigator<TopTabParamList>();

export const _HomeScreen = ({ navigation }: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
      headerLeft: () => <HeaderLeftTitle title="ホーム🦄" />,
      headerTitle: '',
    });
  }, [navigation]);

  return (
    <>
      <TopTab.Navigator
        screenOptions={{
          tabBarStyle: {
            height: 40,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
          },
          tabBarIndicatorStyle: {
            backgroundColor: theme.primary,
            width: 100,
            height: 1.5,
          },
          tabBarIndicatorContainerStyle: {
            marginLeft: screenWidth / 4,
            transform: [{ translateX: -50 }],
          },
        }}
      >
        <TopTab.Screen
          name="Activity"
          component={Activity}
          options={{
            tabBarLabel: 'アクテビティ',
          }}
        />
        <TopTab.Screen
          name="Question"
          component={Questions}
          options={{
            tabBarLabel: 'そこ質',
          }}
        />
      </TopTab.Navigator>
    </>
  );
};

const { width: screenWidth } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  image: {
    width: '100%',
    aspectRatio: 3 / 4,
    borderRadius: 16,
    transform: [{ scale: 0.97 }],
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 8,
  },
  singleWord: {
    marginTop: 6,
  },
});
