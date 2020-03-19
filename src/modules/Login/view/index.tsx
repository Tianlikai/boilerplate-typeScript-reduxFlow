import { Button } from "antd";
import _ from "lodash";
import React from "react";
import { Helmet } from "react-helmet";
import update from "immutability-helper";
import { createSelector } from "reselect";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import Particles from "react-particles-js";
import EventListener from "react-event-listener";
import { RouteComponentProps, withRouter } from "react-router";
import { updateAuthenticatedAction } from "../../Auth/action";
import { isAuthenticatedSelector } from "../../Auth/selector";
import {
  BaseForm,
  createSuperForm,
  ValidationForm,
  getDefaultValidationForm,
} from "../../../packages/type-safe-form";
import { navRoutes } from "../../../config";
import { UserLoginForm } from "./LoginForm";
import { LoginFormType } from "./interface";

import "./index.scss";

const mapStateToProps = createSelector(
  isAuthenticatedSelector,
  isAuthenticated => ({ isAuthenticated }),
);

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    { updateAuthenticated: updateAuthenticatedAction },
    dispatch,
  );

const PREFIX = "Login";
const PREFIX_FORM = "LoginFormWrapper";
const USERNAME = "admin";
const PASSWORD = "admin";

const DEFAULT_FORM_DATA = {
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

type IState = {
  errorType?: ERROR_TYPE;
  formData: LoginFormType;
  validationForm: ValidationForm<LoginFormType>;
};

class Login extends React.PureComponent<IProps, IState> {
  state: IState = {
    formData: DEFAULT_FORM_DATA,
    validationForm: getDefaultValidationForm(),
  };
  superForm: BaseForm = createSuperForm();

  componentDidMount() {
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      this.redirect();
    }
    const { formData } = this.state;
    const isRemember = localStorage.getItem("isRemember");
    const username = localStorage.getItem("username");
    if (isRemember === "1" && username) {
      this.setState({
        formData: { ...formData, username, isRemember: true },
        validationForm: { ...getDefaultValidationForm(), valid: true },
      });
    }
  }

  componentDidUpdate(prevProps: IProps) {
    if (
      this.props.isAuthenticated !== prevProps.isAuthenticated &&
      this.props.isAuthenticated
    ) {
      this.redirect();
    }
  }

  redirect() {
    const {
      location: { search },
      history,
    } = this.props;
    const from = _.split(search, "?")[1] || navRoutes[0].url;
    history.replace(from);
  }

  handleChange = (formData: LoginFormType) => this.setState({ formData });

  handleSubmit = async () => {
    const validation = await this.superForm.validate();
    if (validation.valid) {
      const {
        validationForm: { messages },
        formData: { username, password, isRemember },
      } = this.state;
      if (username !== USERNAME) {
        return this.setState({
          validationForm: {
            valid: false,
            messages: update(messages, {
              username: { $set: "用户名错误" },
            }),
          },
        });
      }
      if (password !== PASSWORD) {
        return this.setState({
          validationForm: {
            valid: false,
            messages: update(messages, {
              password: { $set: "密码错误" },
            }),
          },
        });
      }
      this.setState({
        validationForm: { ...getDefaultValidationForm(), valid: true },
      });
      localStorage.setItem("isAuthenticated", "1");
      this.props.updateAuthenticated({ isAuthenticated: true });
      if (isRemember) {
        localStorage.setItem("username", username);
        localStorage.setItem("isRemember", "1");
      } else {
        localStorage.removeItem("username");
        localStorage.removeItem("isRemember");
      }
    }
  };

  handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      this.handleSubmit();
    }
  };

  render() {
    const { formData, validationForm } = this.state;

    return (
      <div className={PREFIX}>
        <Helmet>
          <title>登录</title>
        </Helmet>
        <Particles className={`${PREFIX}-bc`} />
        <div className={PREFIX_FORM}>
          <div className={`${PREFIX_FORM}-title`}>welcome</div>
          <UserLoginForm
            parent={this.superForm}
            value={formData}
            validationForm={validationForm}
            onChange={this.handleChange}
          />
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
