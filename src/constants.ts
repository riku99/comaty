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
