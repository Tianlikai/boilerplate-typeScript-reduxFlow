// import { EChartOption } from "echarts";
import { Response } from "../../api/interface";

export interface ChartDataResponse extends Response {
  data: {
    option: any;
  };
}
