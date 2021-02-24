export const fetcher = (url: string, rest) =>
  fetch(url, { ...rest, headers: { "Content-Type": "application/json" } });
