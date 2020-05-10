import Service from "../../api";
import { ChartDataResponse } from "./interface";

const getChartData = () => {
  return Service.get<ChartDataResponse>("/api/dashboard/chartData");
};

export default {
  getChartData,
};
