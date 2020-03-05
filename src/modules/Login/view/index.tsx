import { Button, Checkbox, Input } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import classnames from "classnames";
import _ from "lodash";
import React from "react";
import { createSelector } from "reselect";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import Particles from "react-particles-js";
import EventListener from "react-event-listener";
import { Redirect, RouteComponentProps, withRouter } from "react-router";
import { navRoutes } from "../../../config";
import { updateAuthenticated } from "../../Auth/action";
import { isAuthenticatedSelector } from "../../Auth/selector";
import "./index.scss";

const mapStateToProps = createSelector(
  isAuthenticatedSelector,
  isAuthenticated => ({ isAuthenticated }),
);

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ updateAuthenticated }, dispatch);

const PREFIX = "Login";
const PREFIX_FORM = "LoginForm";
const USERNAME = "admin";
const PASSWORD = "admin";

const defaultState = {
  username: "",
  password: "",
  isRemember: false,
};

enum ERROR_TYPE {
  /** 用户名错误 */
  USERNAME_ERROR = 0,
  /** 密码错误 */
  PASSWORD_ERROR = 1,
}

type IProps = RouteComponentProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
type IState = typeof defaultState & {
  errorType?: ERROR_TYPE;
};

class Login extends React.PureComponent<IProps, IState> {
  readonly state: IState = defaultState;

  componentDidMount() {
    const isRemember = localStorage.getItem("isRemember");
    const username = localStorage.getItem("username");
    if (isRemember === "1" && username) {
      this.setState({ username, isRemember: true });
    }
  }

  handleUsernameChange = (e: React.FormEvent<HTMLInputElement>) =>
    this.setState({ username: e.currentTarget.value });

  handlePasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ password: e.currentTarget.value });
  };

  handleRemember = (e: CheckboxChangeEvent) =>
    this.setState({ isRemember: e.target.checked });

  handleSubmit = () => {
    const { username, password, isRemember } = this.state;
    if (username !== USERNAME) {
      return this.setState({ errorType: ERROR_TYPE.USERNAME_ERROR });
    }
    if (password !== PASSWORD) {
      return this.setState({ errorType: ERROR_TYPE.PASSWORD_ERROR });
    }
    localStorage.setItem("isAuthenticated", "1");
    this.props.updateAuthenticated({ isAuthenticated: true });
    if (isRemember) {
      localStorage.setItem("username", username);
      localStorage.setItem("isRemember", "1");
    } else {
      localStorage.removeItem("username");
      localStorage.removeItem("isRemember");
    }
  };

  handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      this.handleSubmit();
    }
  };

  render() {
    const {
      isAuthenticated,
      location: { search },
    } = this.props;
    const { username, password, isRemember, errorType } = this.state;
    const from = _.split(search, "?")[1] || navRoutes[0].url;

    return isAuthenticated ? (
      <Redirect to={from} />
    ) : (
      <div className={PREFIX}>
        <Particles className={`${PREFIX}-bc`} />
        <div className={PREFIX_FORM}>
          <div className={`${PREFIX_FORM}-title`}>welcome</div>
          <div className={`${PREFIX_FORM}-formItem`}>
            <Input
              className={`${PREFIX_FORM}-inp`}
              type="text"
              autoComplete="off"
              placeholder="用户名"
              value={username}
              onChange={this.handleUsernameChange}
            />
            <div
              className={classnames(`${PREFIX_FORM}-error`, {
                ["is-hide"]: errorType !== ERROR_TYPE.USERNAME_ERROR,
              })}
            >
              账号不存在，请重新输入
            </div>
          </div>
          <div className={`${PREFIX_FORM}-formItem`}>
            <Input
              className={`${PREFIX_FORM}-inp`}
              type="password"
              autoComplete="off"
              placeholder="密码"
              value={password}
              onChange={this.handlePasswordChange}
            />
            <div
              className={classnames(`${PREFIX_FORM}-error`, {
                ["is-hide"]: errorType !== ERROR_TYPE.PASSWORD_ERROR,
              })}
            >
              密码错误，请重新输入
            </div>
          </div>
          <div className={`${PREFIX_FORM}-checkBox`}>
            <Checkbox onChange={this.handleRemember} checked={isRemember}>
              记住我
            </Checkbox>
          </div>
          <Button
            className={`${PREFIX_FORM}-btn`}
            type="primary"
            onClick={this.handleSubmit}
          >
            登录
          </Button>
          <EventListener target={window} onKeyPress={this.handleKeyPress} />
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
