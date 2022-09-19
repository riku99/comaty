declare module 'react-native-heic-converter' {
  type Result = {
    path: string;
  };

  const RNHeicConverter: {
    convert: ({ path }: { path: string }) => Promise<Result>;
  };

  export default RNHeicConverter;
}
