export enum NetworkErrorType {
  NOT_FOUND = 404,
}

export const NETWORK_ERROR_TYPE = {
  404: "未找到指定资源",
};

export interface NetworkErrorMessage {
  type: keyof typeof NETWORK_ERROR_TYPE;
  message: string;
}
