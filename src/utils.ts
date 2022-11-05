import { ApolloError } from '@apollo/client';
import { ErrorResponse } from '@apollo/client/link/error';
import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';

export const getGraphQLError = (
  error: ErrorResponse | ApolloError,
  index: number
) => {
  if (error?.graphQLErrors?.length) {
    const gqlError = error.graphQLErrors[index];
    if (!gqlError) {
      return null;
    }
    return {
      code: gqlError.extensions.code as string,
      message: gqlError.message as string,
    };
  } else {
    return null;
  }
};

export function* range(start: number, end: number) {
  for (let i = start; i < end; i++) {
    yield i;
  }
}

export const getExtention = (uri?: string) => {
  if (!uri) {
    return;
  }

  const length = uri.lastIndexOf('.'); // 拡張子の有無。なければ-1が返される
  const ext = length !== -1 ? uri.slice(length + 1) : null; // あれば拡張子('.'以降)を取得

  return ext;
};

export const formatAddress = (address: string) => {
  // ^　= 行の先頭, \d = [0-9], + = 直前の一回以上の繰り返し
  return address
    .replace(/^日本、/, '')
    .replace(/〒\d+-\d+/, '')
    .trim();
};

export const getTimeDiff = (date: string | number) => {
  return formatDistanceToNow(new Date(Number(date)), {
    locale: ja,
    addSuffix: true,
  });
};

// 身長リスト
export const getHeightList = () => {
  const list: number[] = [];
  for (let i = 130; i <= 230; i++) {
    list.push(i);
  }
  return list;
};

export const getImageOrVideoType = (type: string) => {
  const imgRegexp = /^image/;
  const videoRegexp = /^video/;

  if (imgRegexp.test(type)) {
    return 'image';
  } else if (videoRegexp.test(type)) {
    return 'video';
  } else {
    return null;
  }
};

export const getRandomArrayIndex = (length: number) => {
  return Math.floor(Math.random() * length);
};
