// File: app/page.tsx
"use client";
import React, { useEffect, useState } from "react";

export default function HomePage() {
  const [logs, setLogs] = useState<string[]>([]);

  // Logger utility function to send logs to the HomePage component
  const sendLogToHomePage = (log: string) => {
    setLogs((prevLogs) => [...prevLogs, log]);
  };

  useEffect(() => {
    const source = new EventSource("/api/sns-handler");

    source.onmessage = function (event) {
      const newLog = event.data;
      sendLogToHomePage(newLog); // Send the new log to the HomePage component
    };

    return () => {
      source.close();
    };
  }, []);

  return (
    <main>
      <h1>Welcome to the Checkout System</h1>
      <div>
        <h2>Logs:</h2>
        <ul>
          {logs.map((log, index) => (
            <li key={index}>{log}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
