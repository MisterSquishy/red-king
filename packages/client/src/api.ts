export const fetcher = (url: string, rest: any) =>
  fetch(url, { ...rest, headers: { "Content-Type": "application/json" } });
