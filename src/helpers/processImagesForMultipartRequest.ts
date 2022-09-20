import { ReactNativeFile } from 'apollo-upload-client';
import { convertHeicToJpeg } from 'src/helpers/convertHeicToJpeg';
import { getExtention } from 'src/utils';

export const processImageForMultipartRequest = async ({
  uri,
  mime,
}: {
  uri: string;
  mime: string;
}) => {
  let fileUri = uri;
  let fileType = mime;

  const ext = getExtention(uri);

  if (ext === 'HEIC') {
    const { path: jpegPath, type: jpegType } = await convertHeicToJpeg(uri);

    fileUri = jpegPath;
    fileType = jpegType;
  }

  return new ReactNativeFile({
    uri: fileUri,
    type: fileType,
    name: `image-${Date.now()}`,
  });
};

export const processImagesForMultipartRequest = async (
  images: { uri: string; mime: string }[]
) => {
  let files: ReactNativeFile[] | undefined;
  if (images.length) {
    const promises: Promise<ReactNativeFile>[] = [];

    images.forEach((image) => {
      promises.push(processImageForMultipartRequest(image));
    });

    files = await Promise.all(promises);
  }

  return files;
};
