export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const getUrl = (url: string, params: any, options?: RequestInit) => {
  const api = Object.keys(params).reduce((prev: string, cur: string) => {
    if (params[cur]) return prev + "&" + cur + "=" + params[cur];
    else return prev;
  }, url + "?");
  return api;
};
