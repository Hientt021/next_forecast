export const callApi = async (
  url: string,
  params: any,
  options?: RequestInit
) => {
  const api = Object.keys(params).reduce((prev: string, cur: string) => {
    if (params[cur]) return prev + "&" + cur + "=" + params[cur];
    else return prev;
  }, url + "?");
  const res = await fetch(api, { ...options, next: { revalidate: 60 } });
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    return res;
  }
};
