import local_en from './intl_Local_files/en.json';
import local_ar from './intl_Local_files/ar.json';
import React, { createContext, useState } from 'react';
import { createIntl, IntlProvider, createIntlCache } from 'react-intl';

export const LocaleContext = createContext();

const messages = {
  en: local_en,
  ar: local_ar,
};

const LocalizationProvider = ({ children }) => {
  const [locale, setLocale] = useState(localStorage.getItem('lang') || 'en');

  const cache = createIntlCache();
  const intl = createIntl(
    {
      locale: locale,
      messages: messages[locale],
    },
    cache,
  );

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <IntlProvider locale={intl.locale} messages={intl.messages}>
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  );
};

export default LocalizationProvider;
