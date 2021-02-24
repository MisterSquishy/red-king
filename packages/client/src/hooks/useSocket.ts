import io from "socket.io-client";
import { useState } from "react";

let singletonSocket: SocketIOClient.Socket | null = null;

const getSocket = (): SocketIOClient.Socket => {
  if (!singletonSocket) {
    singletonSocket = io("/");
  }
  return singletonSocket;
};

export default function useSocket(
  gameId: string
): [boolean, SocketIOClient.Socket] {
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
