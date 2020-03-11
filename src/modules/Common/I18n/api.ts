import Service from "../../../api";
import { LocalesDataResponse } from "./interface";

const fetchLocalesApi = (locale: string) => {
  return Service.get<LocalesDataResponse>(`/api/locale/${locale}`);
};

export default {
  fetchLocalesApi,
};
