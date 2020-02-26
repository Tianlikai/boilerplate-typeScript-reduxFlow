import update from "immutability-helper";
import { AnyAction } from "redux";
import { updateAuthenticated } from "./action";

const initState = {
  isAuthenticated: true,
};

type AuthState = typeof initState;

export const authReducer = (
  state: AuthState = initState,
  action: AnyAction,
) => {
  if (updateAuthenticated.match(action)) {
    return update(state, {
      isAuthenticated: { $set: action.payload.isAuthenticated },
    });
  }
  return state;
};
