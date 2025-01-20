"use client";
import useWebSocket, { WebSocketHook } from "@/hooks/use-websocket";
import React, { createContext, useContext, ReactNode, useEffect, useState } from "react";

interface WebSocketProviderProps {
  children: ReactNode;
}

const WebSocketContext = createContext<WebSocketHook | undefined>(undefined);

export const WebSocketProvider = ({ children }: WebSocketProviderProps) => {
  const wsEndpoint =
    process.env.NODE_ENV !== "development"
      ? "/api/v1/ws/server"
      : "ws://localhost:8084/ws";
  const ws = useWebSocket(wsEndpoint);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (ws.socket) {
      ws.socket.onerror = (event) => {
        setError("WebSocket error occurred.");
        console.error("WebSocket Error:", event);
      };

      ws.socket.onclose = (event) => {
        setError("WebSocket connection closed.");
        console.warn("WebSocket Closed:", event);
      };
    }
  }, [ws.socket]);

  return (
    <WebSocketContext.Provider value={ws}>
      {error && <div className="error">{error}</div>}
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocketContext = (): WebSocketHook => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error(
      "useWebSocketContext must be used within a WebSocketProvider",
    );
  }
  return context;
};
