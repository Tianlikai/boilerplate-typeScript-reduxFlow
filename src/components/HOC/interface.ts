/**
 * HOC,属性代理通过type
 * 接收一个组件,返回一个被注入了部分属性的组件
 */
export type HOC<InjectProps> = <Props extends InjectProps>(
  BaseComponent: React.ComponentType<Props>,
) => React.ComponentType<Omit<Props, keyof InjectProps>>;
