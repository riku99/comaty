import { MotiView } from 'moti';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Easing } from 'react-native-reanimated';
import { ProfileImage } from 'src/components/domain/user/ProfileImage';
import { useLoadingWithMyProfileImageDataQuery } from 'src/generated/graphql';

export const LoadingWithMyProfileImage = () => {
  const { data } = useLoadingWithMyProfileImageDataQuery();
  const [numbers, setNumbers] = useState([1]);

  useEffect(() => {
    const timerId = setInterval(() => {
      setNumbers((currentNumbers) => {
        return [
          ...currentNumbers,
          currentNumbers[currentNumbers.length - 1] + 1,
        ];
      });
    }, 1500);

    return () => {
      clearInterval(timerId);
    };
  }, [setNumbers]);

  return (
    <View style={styles.container}>
      {numbers.map((n, index) => {
        return (
          <MotiView
            key={index}
            style={styles.wave}
            from={{
              scale: 0.25,
              opacity: 0.9,
            }}
            animate={{
              scale: 1,
              opacity: 0,
            }}
            transition={{
              duration: 3000,
              type: 'timing',
              easing: Easing.linear,
            }}
          />
        );
      })}

      {data?.me && (
        <View style={styles.imageOuter}>
          <ProfileImage
            imageData={data.me?.firstProfileImage}
            style={styles.image}
          />
        </View>
      )}
    </View>
  );
};

const IMAGE_SIZE = 94;
const WAVE_SIZE = 290;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wave: {
    width: WAVE_SIZE,
    height: WAVE_SIZE,
    borderRadius: WAVE_SIZE,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'gray',
  },
  imageOuter: {
    width: IMAGE_SIZE + 6,
    height: IMAGE_SIZE + 6,
    borderRadius: IMAGE_SIZE + 6,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: IMAGE_SIZE,
  },
});
