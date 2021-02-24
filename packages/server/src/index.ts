declare module "lanes";

import express from "express";
import httpServer from "http";
import socketIo from "socket.io";
import cors from "cors";
import pino from "pino";
import expressPino from "express-pino-logger";
import throng from "throng";
import Lanes from "lanes";
import dotenv from "dotenv";
import webserver from "./modules/webserver";

const logger = pino({ level: process.env.LOG_LEVEL || "info" });
const expressLogger = expressPino({ logger });
const lanes = Lanes();
dotenv.config();
const app = express();
const http = httpServer.createServer(app);
const io = socketIo(http);

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
const worker = (workerId: any) => {
  lanes.join(http, () => {
    logger.info({ port: PORT, workerId }, "worker_joined");
  });

  app.post("/users", webserver.createUser);
  app.post("/games", webserver.createGame);
  app.post("/games/:gameId", webserver.joinGame);
  app.post("/games/:gameId/draw", webserver.drawCard);
  app.post("/games/:gameId/discard", webserver.discardCard);
  app.post("/games/:gameId/end/turn", webserver.endTurn);
  app.get("/health", (req: any, res: any) => res.status(200).send("healthy"));

  io.on("connection", webserver.onSocketConnection);

  process.on("unhandledRejection", (reason: any, promise: any) => {
    logger.error(reason, "unhandled_promise_rejection");
  });

  process.on("uncaughtExceptionMonitor", (error: any, origin: any) => {
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
