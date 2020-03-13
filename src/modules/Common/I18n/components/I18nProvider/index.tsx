import "dayjs/locale/zh-cn";
import "dayjs/locale/en";
import dayJs from "dayjs";
import React from "react";
import { ConfigProvider } from "antd";
import {
  createIntl,
  createIntlCache,
  RawIntlProvider,
  IntlShape,
} from "react-intl";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { Dispatch, bindActionCreators } from "redux";
import { ZH_CN, ANT_LOCALES, DAYJS_LOCALES } from "../../constant";
import { rootSelector } from "../../selector";
import { updateI18nActions, initI18nAction } from "../../action";

const mapStateToProps = createSelector(rootSelector, state => ({
  locale: state.locale,
  messages: state.messages,
}));

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    { initI18n: initI18nAction, updateI18: updateI18nActions.request },
    dispatch,
  );

dayJs.locale(DAYJS_LOCALES[ZH_CN]);

const cache = createIntlCache();

export let intlContext = createIntl(
  {
    locale: ZH_CN,
    messages: {},
    textComponent: React.Fragment,
  },
  cache,
);

type I18nProviderProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

interface I18nProviderState {
  intl: IntlShape;
}

export class UnconnectedI18nProvider extends React.Component<
  I18nProviderProps,
  I18nProviderState
> {
  state: I18nProviderState = {
    intl: intlContext,
  };

  componentDidMount() {
    this.props.initI18n();
  }

  componentDidUpdate(prevProps: I18nProviderProps) {
    const { locale, messages } = this.props;
    if (prevProps.locale !== locale || prevProps.messages !== messages) {
      intlContext = createIntl(
        {
          locale,
          messages,
        },
        cache,
      );
      dayJs.locale(DAYJS_LOCALES[locale]);
      this.setState({ intl: intlContext });
    }
  }

  render() {
    const { children, locale } = this.props;
    const { intl } = this.state;
    return (
      <RawIntlProvider key={locale} value={intl}>
        <ConfigProvider locale={ANT_LOCALES[locale]}>{children}</ConfigProvider>
      </RawIntlProvider>
    );
  }
}

export const I18nProvider = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UnconnectedI18nProvider);
