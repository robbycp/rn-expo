import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';

import en from './en';
import id from './id';

// Set the key-value pairs for the different languages you want to support.
const i18n = new I18n({
  en: en.translation,
  ['en-GB']: en.translation,
  id: id.translation,
});

// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;
i18n.enableFallback = true;

export default i18n;
