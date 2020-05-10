import { dashboardReducer } from "./reducer";
import { dashboardSaga } from "./saga";

export const dashboardModule = {
  namespace: "Dashboard",
  reducer: dashboardReducer,
  saga: dashboardSaga,
};
