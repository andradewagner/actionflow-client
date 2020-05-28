import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:3001";

function SocketIO(e) {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    
    socket.on(e.value, data => {
        setResponse(data);
    });
  });

  return (
    <p>
      It's <time dateTime={response}>{response}</time>
    </p>
  );
}

export default SocketIO;