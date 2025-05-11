import React, { createContext, useMemo, useContext } from "react";
import { io } from "socket.io-client";
import { apiUrl } from "../apiUrl";

const SocketContext = createContext(null);

export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};

export const SocketProvider = ({ children }) => {
  const socket = useMemo(() => io(apiUrl), []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
