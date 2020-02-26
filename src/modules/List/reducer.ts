import update from "immutability-helper";
import { AnyAction } from "redux";
import { searchActions } from "./action";

interface State {
  loading: boolean;
  page: number;
  pageSize: number;
  data: any[];
  searchKeywords: string;
}

const initState: State = {
  loading: false,
  page: 1,
  pageSize: 10,
  data: [],
  searchKeywords: "",
};

export const listReducer = (state = initState, action: AnyAction): State => {
  if (searchActions.request.match(action)) {
    return update(state, {
      loading: { $set: true },
    });
  }
  if (searchActions.success.match(action)) {
    return update(state, {
      loading: { $set: false },
    });
  }
  if (searchActions.failure.match(action)) {
    return update(state, {
      loading: { $set: false },
    });
  }
  return state;
};
