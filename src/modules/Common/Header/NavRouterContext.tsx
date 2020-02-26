import { createContext } from "react";

const { Consumer, Provider } = createContext<{
  navRoutes: Array<{ label: string; url: string }>;
}>({
  navRoutes: [],
});

export const NavRoutesConsumer = Consumer;
export const NavRoutesProvider = Provider;
