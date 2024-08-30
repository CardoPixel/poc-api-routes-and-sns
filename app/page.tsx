"use client";
import React, { useEffect, useState } from 'react';
import Redirector from '@/components/Redirector';

export default function HomePage() {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const source = new EventSource('/api/sns-handlers/logs'); // Establishing a connection to stream logs

    source.onmessage = function (event) {
      const newLog = event.data;
      setLogs(prevLogs => [...prevLogs, newLog]); // Update logs with the new log message
    };

    return () => {
      source.close(); // Closing the connection when the component unmounts
    };
  }, []);

  return (
    <main>
      <h1>Welcome to the Checkout System</h1>
      <Redirector />
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