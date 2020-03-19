// import { EChartOption } from "echarts";
import { AsyncGroupCreator } from "../../packages/flux-payload-action";

const NAMESPACE = "Dashboard";

export const getChartData = AsyncGroupCreator<
  void,
  {
    option: any;
  },
  void
>(`${NAMESPACE}/getChartData`);
