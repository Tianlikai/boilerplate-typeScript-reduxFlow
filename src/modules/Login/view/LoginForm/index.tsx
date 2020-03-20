import {
  createForm,
  executorToValidator,
} from "../../../../packages/type-safe-form";
import { simpleFormFactory } from "../../../../components/Form/FormFactory";
import { InputFactory } from "../../../../components/Form/Fields/Input";
import { CheckboxFactory } from "../../../../components/Form/Fields/Checkbox";
import { LoginFormType } from "../../interface";
import "./index.scss";

const FormRenderer = simpleFormFactory<LoginFormType>({
  fields: [
    {
      label: "用户名",
      name: "username",
      render: InputFactory({ type: "text", placeholder: "请输入用户名" }),
    },
    {
      label: "密码",
      name: "password",
      render: InputFactory({ type: "password", placeholder: "请输入密码" }),
    },
    {
      label: "记住我",
      name: "isRemember",
      className: "LoginFormCheckbox",
      render: CheckboxFactory(),
    },
  ],
});

export const UserLoginForm = createForm<LoginFormType>({
  defaultValue: {
    username: "",
    password: "",
    isRemember: false,
  },
  render: FormRenderer,
  validators: {
    username: () => executorToValidator(v => v.length !== 0, "请输入用户名"),
    password: () => executorToValidator(v => v.length !== 0, "请输入密码"),
  },
});
