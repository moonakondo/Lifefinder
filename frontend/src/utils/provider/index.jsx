import React from "react";
import { AuthContextProvider } from "../../context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SocketProvider } from "../../context/SocketProvider";

function Provider({ children }) {
  const queryclient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryclient}>
      <SocketProvider>
        <AuthContextProvider>{children}</AuthContextProvider>
      </SocketProvider>
    </QueryClientProvider>
  );
}

export default Provider;
