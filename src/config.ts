const config = {
  firebase: {
    apiKey: process.env.VITE_APP_APIKEY,
    authDomain: process.env.VITE_APP_AUTHDOMAIN,
    databaseURL: process.env.VITE_APP_DATABASEURL,
    projectId: process.env.VITE_APP_PROJECTID,
    storageBucket: process.env.VITE_APP_STORAGEBUCKET,
    messagingSenderId: process.env.VITE_APP_MESSAGINGSENDERID,
    appId: process.env.VITE_APP_APPID,
    measurementId: process.env.VITE_APP_MEASUREMENTID,
  },
  google: {
    API_KEY: process.env.VITE_APP_GOOGLE_API_KEY,
    CLIENT_ID: process.env.VITE_APP_GOOGLE_CLIENT_ID,
    SECRET: process.env.VITE_APP_GOOGLE_SECRET_KEY,
  },
  facebook: {
    APP_ID: process.env.VITE_APP_FACEBOOK_APP_ID,
  },
};

export default config;
