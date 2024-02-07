import * as Localization from 'expo-localization';

const languages = ['en', 'es', 'fr'];

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: (callback) => {
    const lang = Localization.locale.split('-')[0];
    if (languages.includes(lang)) {
      callback(lang);
    } else callback('en');
  },
  init: () => {},
  cacheUserLanguage: () => {}
};

export default languageDetector;
