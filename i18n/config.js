export const fallback = 'en';

export const supportedLocales = {
  en: {
    name: 'English',
    translationFileLoader: () => require('./lang/en.json'),

    // en is default locale in Moment
    momentLocaleLoader: () => Promise.resolve()
  },
  fr: {
    name: 'Français',
    translationFileLoader: () => require('./lang/fr.json'),
    momentLocaleLoader: () => import('moment/locale/fr')
  },
  es: {
    name: 'Espanol',
    translationFileLoader: () => require('./lang/es.json'),
    momentLocaleLoader: () => import('moment/locale/es')
  }
};

export const defaultNamespace = 'landing';

export const namespaces = [

];
