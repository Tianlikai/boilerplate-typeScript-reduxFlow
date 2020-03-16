import { AnyAction } from "redux";

interface State {
  fetching: boolean;
  pageNumber: number;
  pageSize: number;
  innerHeight: number;
  topViewPort: number;
  bottomViewPort: number;
}

const initState: State = {
  fetching: false,
  pageNumber: 1,
  pageSize: 20,
  innerHeight: 0,
  topViewPort: 0,
  bottomViewPort: 0,
};

export const articleListReducer = (
  state = initState,
  action: AnyAction,
): State => {
  return state;
};
