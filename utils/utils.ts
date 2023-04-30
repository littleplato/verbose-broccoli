export const generateURL = (
  baseURL: string,
  params: { [key: string]: string }
) => {
  const stringifiedParams = Object.keys(params)
    .map((p) => `${p}=${encodeURIComponent(params[p])}`)
    .join('&');
  return baseURL + '?' + stringifiedParams;
};

export const generateUUID = () => crypto.randomUUID();
