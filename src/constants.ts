import { Dimensions } from 'react-native';
import Config from 'react-native-config';

export const loginProviders = {
  apple: 'Apple',
  google: 'Google',
  email: 'Email',
};

export const ERROR_TOAST_DURATION = 2500;

export const POST_MAX_TEXT_COUNT = 300;

export const QUESTION_MAX_TEXT_COUNT = 300;

export const GOOGLE_GEOCOODING_API_URL = `https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=${Config.GOOGLE_GEOCOODING_API_KEY}`;

export const recommendedTags = [
  '気軽に会いましょう〜',
  'お酒好き',
  '少しだけ話したい',
  'ビール好き🍺',
  'コーヒー好き',
  'カフェでまったり☺️',
  '学生',
  'よく喋る',
  'まったりが好き',
  'ワイワイが好き',
  '旅行よく行く',
  'カラオケ好き',
  '仕事マン',
  '人類',
];

const dimensions = Dimensions.get('screen');

export const IPHONE_X_HEIGHT = 812;
export const isMoreRecentThanXDevice = dimensions.height >= IPHONE_X_HEIGHT;

export const MESSAGE_REPLY_LIMIT_TIME = 25;
