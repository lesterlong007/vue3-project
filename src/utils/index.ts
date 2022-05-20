/**
 * @name index
 * @author Lester
 * @date 2022-05-20 14:11
 */
import { getQueryParam } from "lester-tools";

/**
 * 获取cookie
 * @param key
 */
export const getCookie: (key: string) => string = (key: string) => {
  if (!document.cookie || !window.navigator.cookieEnabled) {
    return "";
  }
  const regExe = new RegExp(`${key}=([\\w]+)`);
  const res = document.cookie.match(regExe) || [];
  return res[1];
};

/**
 * 获取指定Url参数
 * @param key
 */
export const getUrlQueryParam = (key: string): string => {
  const queryParam: any = JSON.parse(
    window.localStorage.getItem("queryParam") || "{}"
  );
  const sessionQueryParam: any = JSON.parse(
    window.sessionStorage.getItem("queryParam") || "{}"
  );
  return getQueryParam(key) || sessionQueryParam[key] || queryParam[key] || "";
};
