import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:3000";

function App() {
  const [game, setGame] = useState({});

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("StartGame", (data: React.SetStateAction<{}>) => {
      setGame(data);
    });
    return () => { socket.close() };
  }, []);

  return (
    <p>
      The server says { JSON.stringify(game) }
    </p>
  );
}

export default App;