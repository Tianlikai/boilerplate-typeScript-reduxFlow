import React from "react";
import { createIntl, createIntlCache, RawIntlProvider } from "react-intl";
import { ZH_CN } from "./constant";

const cache = createIntlCache();

export const intlContext = createIntl(
  {
    locale: ZH_CN,
    messages: {},
  },
  cache,
);

interface I18nProviderProps {
  locale: string;
}

export class I18nProvider extends React.Component<I18nProviderProps> {
  render() {
    const { children, locale } = this.props;
    return (
      <RawIntlProvider key={locale} value={intlContext}>
        {children}
      </RawIntlProvider>
    );
  }
}
