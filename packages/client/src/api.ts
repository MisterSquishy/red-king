import config from "./config";

export const fetcher = (path: string, rest: any) =>
  fetch(config.SERVER_HOST + path, {
    ...rest,
    headers: { "Content-Type": "application/json" },
  });
