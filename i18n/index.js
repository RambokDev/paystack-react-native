import i18next from 'i18next';
import * as config from './config';
import date from './date';
import languageDetector from './language-detector';
import translationLoader from './translation-loader';
import moment from 'moment';

const i18n = {
  init: () => {
    return new Promise((resolve, reject) => {
      i18next
        .use(languageDetector)
        .use(translationLoader)
        .init(
          {
            compatibilityJSON: 'v3',
            fallbackLng: config.fallback,
            ns: config.namespaces,
            defaultNS: config.defaultNamespace,
            interpolation: {
              escapeValue: false,
              format(value, format) {
                if (value instanceof Date) {
                  return date.format(value, format);
                }
              }
            }
          },
          (error) => {
            if (error) {
              return reject(error);
            }

            date
              .init(i18next.language)
              .then(resolve)
              .catch((error) => reject(error));
          }
        );
    });
  },

  /**
   * @param {string} key
   * @param {Object} options
   * @returns {string}
   */
  t: (key, options) => i18next.t(key, options),

  /**
   * @returns {string}
   */
  get locale() {
    return i18next.language;
  }
};

export const changeLanguage = (languageKey, callback) => {
  i18next.changeLanguage(languageKey, callback());
};

export const t = i18n.t;

export function formatDate(type, dateTemp) {
  const date = new Date(moment(dateTemp));
  if (type == 'L') {
    return t('dates:date_L', { date });
  } else if (type == 'LL') {
    return t('dates:date_LL', { date });
  } else if (type == 'LT') {
    return t('dates:date_LT', { date });
  } else if (type == 'll') {
    return t('dates:date_ll', { date });
  } else if (type == 'short') {
    return t('dates:date_short', { date });
  } else {
    return t('dates:date_full', { date });
  }
}

export default i18n;
