"use client";
import useWebSocket, { WebSocketHook } from "@/hooks/use-websocket";
import React, { createContext, useContext, ReactNode } from "react";

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
  return (
    <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
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
