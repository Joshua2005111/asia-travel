/**
 * FOREIGNER_APP HTTP客户端
 * 基于Axios的封装
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { config } from '../config';

// 创建axios实例
const httpClient: AxiosInstance = axios.create({
  baseURL: config.api.baseURL,
  timeout: config.api.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
httpClient.interceptors.request.use(
  (requestConfig) => {
    // 添加认证token
    const token = getAuthToken();
    if (token) {
      requestConfig.headers.Authorization = `Bearer ${token}`;
    }
    
    // 开发环境打印请求
    if (config.isDev) {
      console.log(`[HTTP] ${requestConfig.method?.toUpperCase()} ${requestConfig.url}`);
    }
    
    return requestConfig;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
httpClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // 开发环境打印响应
    if (config.isDev) {
      console.log(`[HTTP] ${response.status} ${response.config.url}`);
    }
    
    // 统一处理响应
    const { status, message, data } = response.data;
    
    if (status === 0) {
      return data;
    }
    
    // 业务错误
    return Promise.reject(new APIError(message || '请求失败', status, response.data));
  },
  (error) => {
    // 处理错误
    if (error.response) {
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // 未登录，跳转登录
          handleUnauthorized();
          break;
        case 403:
          showToast('没有权限执行此操作');
          break;
        case 404:
          showToast('请求的资源不存在');
          break;
        case 500:
          showToast('服务器错误，请稍后重试');
          break;
        default:
          showToast(data?.message || '请求失败');
      }
    } else if (error.request) {
      showToast('网络连接失败，请检查网络');
    }
    
    return Promise.reject(error);
  }
);

// GET请求
export const get = async <T = any>(
  url: string,
  params?: object,
  options?: AxiosRequestConfig
): Promise<T> => {
  return httpClient.get(url, { params, ...options });
};

// POST请求
export const post = async <T = any>(
  url: string,
  data?: object,
  options?: AxiosRequestConfig
): Promise<T> => {
  return httpClient.post(url, data, options);
};

// PUT请求
export const put = async <T = any>(
  url: string,
  data?: object,
  options?: AxiosRequestConfig
): Promise<T> => {
  return httpClient.put(url, data, options);
};

// PATCH请求
export const patch = async <T = any>(
  url: string,
  data?: object,
  options?: AxiosRequestConfig
): Promise<T> => {
  return httpClient.patch(url, data, options);
};

// DELETE请求
export const del = async <T = any>(
  url: string,
  options?: AxiosRequestConfig
): Promise<T> => {
  return httpClient.delete(url, options);
};

// 上传文件
export const upload = async <T = any>(
  url: string,
  formData: FormData,
  onProgress?: (progress: number) => void
): Promise<T> => {
  return httpClient.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      if (progressEvent.total && onProgress) {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress(progress);
      }
    },
  });
};

// 错误类
export class APIError extends Error {
  code: number;
  data?: any;
  
  constructor(message: string, code: number = -1, data?: any) {
    super(message);
    this.name = 'APIError';
    this.code = code;
    this.data = data;
  }
}

// 辅助函数
let authToken: string | null = null;
const getAuthToken = () => authToken;
export const setAuthToken = (token: string) => {
  authToken = token;
};
export const clearAuthToken = () => {
  authToken = null;
};

let toastFunction: ((msg: string) => void) | null = null;
export const showToast = (msg: string) => {
  if (toastFunction) {
    toastFunction(msg);
  } else {
    console.log('[Toast]', msg);
  }
};
export const setToastFunction = (fn: (msg: string) => void) => {
  toastFunction = fn;
};

let unauthorizedHandler: (() => void) | null = null;
const handleUnauthorized = () => {
  if (unauthorizedHandler) {
    unauthorizedHandler();
  }
};
export const setUnauthorizedHandler = (fn: () => void) => {
  unauthorizedHandler = fn;
};

export default httpClient;
