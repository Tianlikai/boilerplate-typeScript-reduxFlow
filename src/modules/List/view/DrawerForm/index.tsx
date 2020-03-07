import React from "react";
import { Drawer } from "antd";
import { FormProps } from "../../../../packages/type-safe-form";
// import { FormFieldWrapper } from "../../../../components/Form/FormFieldWrapper";
// import { InputFactory } from "../../../../components/Form/Fields/Input";

const PREFIX = "DrawerForm";
const WIDTH = "500PX";

interface FormData {
  name: string;
}

type Props = FormProps<FormData>;

class UnConnectDrawerForm extends React.PureComponent<Props> {
  render() {
    // const { form } = this.props;
    return (
      <Drawer className={PREFIX} title="新建" visible={true} width={WIDTH}>
        123
      </Drawer>
    );
  }
}

export default UnConnectDrawerForm;
