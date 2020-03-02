import Service from "../../api";
import { ChartDataResponse } from "./model";

const getChartData = () => {
  return Service.get<ChartDataResponse>("/api/dashboard/chartData");
};

export default {
  getChartData,
};
