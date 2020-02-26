import { listReducer } from "./reducer";
import { rootSelectorFactory } from "../../packages/bootstrap/rootSelectorFactory";

const NAMESPACE = "List";

export const rootSelector = rootSelectorFactory<typeof listReducer>(NAMESPACE);
