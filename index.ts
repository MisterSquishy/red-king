const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const cors = require("cors");
const pino = require("pino");
const expressPino = require("express-pino-logger");
const logger = pino({ level: process.env.LOG_LEVEL || "info" });
const expressLogger = expressPino({ logger });
const throng = require("throng");
const lanes = require("lanes")();

const webserver = require("./modules/webserver");

app.use(cors());
app.use(express.json());
app.use(expressLogger);

const PORT = process.env.PORT || 3000;
const CONCURRENCY = process.env.WEB_CONCURRENCY || 1;
const master = () => {
  lanes.listen(PORT, () => {
    logger.info({ port: PORT }, "started_master");
  });
};
const worker = (workerId) => {
  lanes.join(http, () => {
    logger.info({ port: PORT, workerId }, "worker_joined");
  });

  app.post("/users", webserver.createUser);
  app.post("/games", webserver.createGame);
  app.post("/games/:gameId", webserver.joinGame);
  app.post("/games/:gameId/draw", webserver.drawCard);
  app.post("/games/:gameId/discard", webserver.discardCard);

  io.on("connection", webserver.onSocketConnection);

  process.on("unhandledRejection", (reason, promise) => {
    logger.error(reason, "unhandled_promise_rejection");
  });

  process.on("uncaughtExceptionMonitor", (error, origin) => {
    logger.error(error, origin);
  });
};
throng({
  workers: CONCURRENCY,
  lifetime: Infinity,
  master,
  worker,
});

export { io, logger };
