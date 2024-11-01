import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { memo } from "react";

const queryClient = new QueryClient();

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default memo(ReactQueryProvider);
