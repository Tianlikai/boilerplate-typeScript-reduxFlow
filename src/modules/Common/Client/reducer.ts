import { AnyAction } from "redux";
import update from "immutability-helper";
import { onResizeAction } from "./action";
import { IsPC } from "../../../utils/isPc";

interface State {
  innerHeight: number;
  isPc: boolean;
}

const initState: State = {
  innerHeight: window.innerHeight,
  isPc: IsPC(),
};

export const clientReducer = (state = initState, action: AnyAction): State => {
  if (onResizeAction.match(action)) {
    return update(state, {
      innerHeight: { $set: action.payload.innerHeight },
    });
  }
  return state;
};
