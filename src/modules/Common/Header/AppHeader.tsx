import classnames from "classnames";
import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { matchPath, RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { bindActionCreators, Dispatch } from "redux";
import logoSrc from "../../../assets/images/logo.svg";
import { updateAuthenticated } from "../../Auth/action";
import { NavRoutesConsumer } from "./NavRouterContext";
import AppHeadOverlay from "./AppHeadOverlay";

const PREFIX = "AppHeader";

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      updateAuthenticated,
    },
    dispatch,
  );

type Props = RouteComponentProps & ReturnType<typeof mapDispatchToProps>;

class AppHeader extends React.PureComponent<Props> {
  handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    this.props.updateAuthenticated({ isAuthenticated: false });
  };

  render() {
    const {
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
                    {_.map(navRoutes, nav => (
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

const ConnectedAppHeader = connect(null, mapDispatchToProps)(AppHeader);

export default ConnectedAppHeader;
