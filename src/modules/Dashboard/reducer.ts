import update from "immutability-helper";
import { AnyAction } from "redux";
import { EChartOption } from "echarts";
import { getChartData } from "./action";

interface State {
  loading: boolean;
  option: EChartOption;
}

const initState: State = {
  loading: false,
  option: {},
};

export const dashboardReducer = (
  state = initState,
  action: AnyAction,
): State => {
  if (getChartData.request.match(action)) {
    return update(state, {
      loading: { $set: true },
    });
  }
  if (getChartData.success.match(action)) {
    return update(state, {
      loading: { $set: false },
      option: { $set: action.payload.option },
    });
  }
  if (getChartData.failure.match(action)) {
    return update(state, {
      loading: { $set: false },
    });
  }
  return state;
};
