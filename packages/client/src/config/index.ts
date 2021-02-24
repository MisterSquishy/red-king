const prod = {
  ENDPOINT: "http://red-king.herokuapp.com",
};

const dev = {
  ENDPOINT: "http://localhost:3000",
};

export default process.env.NODE_ENV === "development" ? dev : prod;
