import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:3000";

function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("TestEvent", (data: React.SetStateAction<string>) => {
      setResponse(data);
    });
    return () => { socket.close() };
  }, []);

  return (
    <p>
      The server says { response }
    </p>
  );
}

export default App;