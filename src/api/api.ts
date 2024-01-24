import { WEATHER_TOKEN } from "../const/token";
import { BASE_URL, weatherEndpoints } from "./endpoints";

type APIMap = {
  [key in keyof typeof weatherEndpoints]: (
    params?: any,
    option?: RequestInit
  ) => Promise<any>;
};

const fetchData = async (
  endpoint: any,
  params: any,
  requestOptions?: RequestInit
) => {
  const url = Object.keys(params).reduce(
    (prev: string, cur: string, index: number) => {
      if (params[cur])
        return prev + (index ? "&" : "") + cur + "=" + params[cur];
      else return prev;
    },
    BASE_URL + endpoint + "?"
  );

  const res = await fetch(url, requestOptions);
  const data = await res.json();

  if (res.ok) return Promise.resolve(data);
  else return Promise.reject(data.message);
};

const api: any = {};

for (const key in weatherEndpoints) {
  api[key] = (params: any, options: RequestInit) =>
    fetchData(
      (weatherEndpoints as any)[key],
      { ...params, appid: WEATHER_TOKEN },
      options
    );
}

export default api as APIMap;
