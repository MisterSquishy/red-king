import io from "socket.io-client";
import { useState } from "react";
import config from "../config";

let singletonSocket: SocketIOClient.Socket | null = null;

const getSocket = (): SocketIOClient.Socket => {
  if (!singletonSocket) {
    singletonSocket = io(config.SERVER_HOST + "/");
  }
  return singletonSocket;
};

export default function useSocket(): [boolean, SocketIOClient.Socket] {
  const [connected, setConnected] = useState(false);
  const socket = getSocket();
  socket.on("connect", () => {
    setConnected(true);
  });
  socket.on("disconnect", () => {
    setConnected(false);
  });
  return [connected, socket];
}
