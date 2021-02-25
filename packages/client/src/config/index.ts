const getConfig = (env: string): Record<string, string> => {
  const isProd = process.env.NODE_ENV !== "development";
  return {
    SERVER_HOST: isProd
      ? "http://red-king.herokuapp.com"
      : "http://localhost:3000",
  };
};

export default getConfig(process.env.NODE_ENV);
