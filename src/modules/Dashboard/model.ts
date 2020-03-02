import { EChartOption } from "echarts";
import { Response } from "../../api/model";

export interface ChartDataResponse extends Response {
  data: {
    option: EChartOption;
  };
}
