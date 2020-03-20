import classnames from "classnames";
import { map } from "lodash";
import React from "react";
import { Button } from "antd";
import { connect } from "react-redux";
import { matchPath, RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { createSelector } from "reselect";
import { bindActionCreators, Dispatch } from "redux";
import logoSrc from "../../../assets/images/logo.svg";
import { updateAuthenticatedAction } from "../../Auth/action";
import { updateI18nActions } from "../I18n/action";
import { localeSelector } from "../I18n/selector";
import { ZH_CN, EN_US } from "../I18n/constant";
import { NavRoutesConsumer } from "./NavRouterContext";
import AppHeadOverlay from "./AppHeadOverlay";

const PREFIX = "AppHeader";

const mapStateToProps = createSelector(localeSelector, locale => ({
  locale,
}));

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      updateIn18: updateI18nActions.request,
      updateAuthenticated: updateAuthenticatedAction,
    },
    dispatch,
  );

type Props = RouteComponentProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

class AppHeader extends React.PureComponent<Props> {
  handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    this.props.updateAuthenticated({ isAuthenticated: false });
  };

  onI18nChange = () => {
    this.props.updateIn18({
      locale: this.props.locale === ZH_CN ? EN_US : ZH_CN,
    });
  };

  render() {
    const {
      locale,
      match: { url },
    } = this.props;
    return (
      <NavRoutesConsumer>
        {({ navRoutes }) => (
          <div className="BaseHeaderBox">
            <header className="BaseHeader">
              <div className={PREFIX}>
                <div className={`${PREFIX}-inlineLeft`}>
                  <div className="NavLogo">
                    <div className="NavLogo-img">
                      <img src={logoSrc} alt="logo" />
                    </div>
                  </div>
                  <div className="NavMenu">
                    {map(navRoutes, nav => (
                      <Link
                        className={classnames("NavLink", {
                          "is-active": matchPath(url, { path: nav.url }),
                        })}
                        key={nav.url}
                        to={nav.url}
                      >
                        <span className="NavLink-anchor">{nav.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
                <div className={`${PREFIX}-inlineRight`}>
                  <Button
                    className={`${PREFIX}-langBtn`}
                    size="small"
                    onClick={this.onI18nChange}
                  >
                    {locale === ZH_CN ? "english" : "中文"}
                  </Button>
                  <AppHeadOverlay logout={this.handleLogout} />
                </div>
              </div>
            </header>
          </div>
        )}
      </NavRoutesConsumer>
    );
  }
}

const ConnectedAppHeader = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppHeader);

export default ConnectedAppHeader;
