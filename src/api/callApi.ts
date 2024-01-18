export const callApi = async (
  url: string,
  params: any,
  options?: RequestInit
) => {
  const api = Object.keys(params).reduce((prev: string, cur: string) => {
    if (params[cur]) return prev + "&" + cur + "=" + params[cur];
    else return prev;
  }, url + "?");
  const res = await fetch(api, options);
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    console.log(res.statusText);
  }
};
