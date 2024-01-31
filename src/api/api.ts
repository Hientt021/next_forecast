import { WEATHER_KEY } from "../const/token";
import { WEATHER_BASE_URL, weatherEndpoints } from "./endpoints";

type APIMap = {
  [key in keyof typeof weatherEndpoints]: (
    params?: any,
    option?: RequestInit
  ) => Promise<IApiResponse>;
};

interface IApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

const fetchData = async (
  endpoint: any,
  params: any,
  requestOptions?: RequestInit
) => {
  const url = Object.keys(params).reduce((prev: string, cur: string) => {
    if (params[cur] && cur !== "map") return prev + `&${cur}=${params[cur]}`;
    else return prev;
  }, WEATHER_BASE_URL + endpoint + "?" + `key=${WEATHER_KEY}`);

  const options = {
    ...requestOptions,
  };

  const res = await fetch(url, options);
  const data = await res.json();
  return {
    success: res.ok,
    message: data.message,
    data: res.ok ? data : undefined,
  };
};

const api: any = {};

for (const key in weatherEndpoints) {
  api[key] = (params: any, options: RequestInit) =>
    fetchData((weatherEndpoints as any)[key], params, options);
}

export default api as APIMap;
