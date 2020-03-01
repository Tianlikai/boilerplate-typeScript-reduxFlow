import qs from "qs";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { merge } from "lodash";
import { Response } from "./model";

const defaultConfig: AxiosRequestConfig = {
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
};

class Service {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create();
  }

  request<T extends Response>(config: AxiosRequestConfig): Promise<T> {
    return this.instance
      .request<T>(merge({}, defaultConfig, config))
      .then(res => res.data)
      .catch((error: AxiosError) => {
        throw error;
      });
  }

  get<T extends Response>(
    subPath: string,
    config: AxiosRequestConfig = {},
  ): Promise<T> {
    return this.request({
      ...config,
      url: subPath,
      paramsSerializer: params =>
        qs.stringify(params, {
          arrayFormat: "repeat",
          encode: false,
        }),
      method: "GET",
    });
  }

  post<T extends Response>(
    subPath: string,
    config: AxiosRequestConfig,
  ): Promise<T> {
    return this.request({ ...config, url: subPath, method: "POST" });
  }

  put<T extends Response>(
    subPath: string,
    config: AxiosRequestConfig,
  ): Promise<T> {
    return this.request({ ...config, url: subPath, method: "PUT" });
  }

  delete<T extends Response>(
    subPath: string,
    config: AxiosRequestConfig,
  ): Promise<T> {
    return this.request({ ...config, url: subPath, method: "DELETE" });
  }

  upload<T extends Response>(
    subPath: string,
    config: AxiosRequestConfig,
  ): Promise<T> {
    return this.request({ ...config, url: subPath, method: "POST" });
  }
}

const service = new Service();

export default service;
