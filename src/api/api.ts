import { WEATHER_TOKEN } from "../const/token";
import { BASE_URL, weatherEndpoints } from "./endpoints";

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
  const arr = endpoint.split(" ");
  const method = arr[0];
  const endpointStr = arr[1];

  const url = Object.keys(params).reduce(
    (prev: string, cur: string, index: number) => {
      if (params[cur])
        return prev + (index ? "&" : "") + cur + "=" + params[cur];
      else return prev;
    },
    BASE_URL + endpoint + "?"
  );

  const options = {
    ...requestOptions,
    headers: {
      "Content-Type": "application/json",
    },
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
    fetchData(
      (weatherEndpoints as any)[key],
      { ...params, appid: WEATHER_TOKEN },
      options
    );
}

export default api as APIMap;
