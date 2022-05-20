/**
 * @Author lester
 * @Date 2020-07-17
 */

import Axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  AxiosRequestConfig,
} from "axios";
import { message } from "ant-design-vue";
import wxLoginAuth from "./wxLoginAuth";
import { getUrlQueryParam } from "./index";

type HttpMethod = (...args: any) => Promise<any>;
type Method = "get" | "post" | "delete" | "put";

const instance: AxiosInstance = Axios.create({
  timeout: 60000,
});

/**
 * 拦截器
 */
instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config;
  },
  (err: AxiosError) => {
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  (res: AxiosResponse) => {
    return res;
  },
  (err: AxiosError) => {
    return Promise.reject(err);
  }
);

const addHeader = () => {
  const corpId: string = getUrlQueryParam("corpId");
  instance.defaults.headers.common.corpId = corpId;
};

/**
 * 处理response数据
 * @param res
 * @param resolve
 */
const handleRes = (res: AxiosResponse, resolve: Function) => {
  if (res.status === 200) {
    if (res.data.ret === 0) {
      resolve(
        res.data.retdata || typeof res.data.retdata === "boolean"
          ? res.data.retdata
          : {}
      );
    } else {
      if (res.data.ret === 1000001) {
        wxLoginAuth();
      } else {
        const { retmsg } = res.data;
        message.error(retmsg);
        resolve(null);
      }
    }
  } else {
    const { statusText } = res;
    message.error(statusText);
    resolve(null);
  }
};

const get: HttpMethod = (
  url: string,
  params?: any,
  config?: AxiosRequestConfig
) => {
  addHeader();
  return new Promise((resolve) => {
    instance
      .get(url, {
        params,
        ...config,
      })
      .then((res: AxiosResponse) => {
        handleRes(res, resolve);
      })
      .catch((err: AxiosError) => {
        console.error(err);
        resolve(null);
      });
  });
};

const deleteMethod: any = (
  url: string,
  data: any,
  config?: AxiosRequestConfig
) => {
  addHeader();
  return new Promise((resolve) => {
    instance
      .delete(url, {
        data: {
          ...data,
        },
        ...config,
      })
      .then((res: AxiosResponse) => {
        handleRes(res, resolve);
      })
      .catch((err: AxiosError) => {
        console.error(err);
        resolve(null);
      });
  });
};

type RequestMethod = "post" | "put";

const unGet = (type: RequestMethod) => {
  return (url: string, data?: any, config?: AxiosRequestConfig) => {
    addHeader();
    return new Promise((resolve) => {
      instance[type](url, data || {}, {
        ...config,
      })
        .then((res: AxiosResponse) => {
          handleRes(res, resolve);
        })
        .catch((err: AxiosError) => {
          console.error(err);
          resolve(null);
        });
    });
  };
};

const request: HttpMethod = (
  url: string,
  params?: any,
  type: Method = "get",
  config?: AxiosRequestConfig
) => {
  addHeader();
  return new Promise((resolve, reject) => {
    /**
     * 处理response数据
     * @param res
     */
    const handleRes = (res: AxiosResponse) => {
      if (res.status === 200) {
        if (res.data.ret === 0) {
          resolve(
            res.data.retdata || typeof res.data.retdata === "boolean"
              ? res.data.retdata
              : {}
          );
        } else {
          const { retmsg } = res.data;
          message.error(retmsg);
          reject(retmsg);
        }
      } else {
        const { statusText } = res;
        message.error(statusText);
        reject(statusText);
      }
    };

    if (type === "get") {
      instance
        .get(url, {
          params,
          ...config,
        })
        .then((res: AxiosResponse) => {
          handleRes(res);
        })
        .catch((err: AxiosError) => {
          console.error(err);
          reject(err);
        });
    } else if (type === "delete") {
      instance
        .delete(url, {
          data: {
            ...params,
          },
          ...config,
        })
        .then((res: AxiosResponse) => {
          handleRes(res);
        })
        .catch((err: AxiosError) => {
          console.error(err);
          reject(err);
        });
    } else {
      instance[type](url, params, {
        ...config,
      })
        .then((res: AxiosResponse) => {
          handleRes(res);
        })
        .catch((err: AxiosError) => {
          console.error(err);
          reject(err);
        });
    }
  });
};

export type HttpFunction<T extends object = any> = (param: T) => Promise<any>;

export type Void2Promise = () => Promise<any>;

export default {
  get,
  post: unGet("post"),
  delete: deleteMethod,
  put: unGet("put"),
  request,
};
