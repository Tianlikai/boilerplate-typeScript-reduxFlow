import { BaseForm } from "./interface";
import { composeValidations } from "./valid";

/**
 * 创建一个顶级表单
 * 用于非表单组件从外部触发表单校验
 */
export const createSuperForm = (): BaseForm => {
  const children = new Set<BaseForm>();
  const add: BaseForm["add"] = child => children.add(child);
  const remove: BaseForm["remove"] = child => children.delete(child);
  const validate: BaseForm["validate"] = async () => {
    const validations = await Promise.all([
      ...[...children.values()].map(child => child.validate()),
    ]);
    return composeValidations(validations);
  };
  return {
    add,
    remove,
    validate,
  };
};
