"use client";
// components/Providers.js
// Wraps app with Redux store and TanStack Query client

import { Provider }          from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useRef }            from "react";
import { store } from "../../store";

export default function Providers({ children }) {
  // useRef so QueryClient is not recreated on every render
  const queryClientRef = useRef(null);
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          retry:              1,
          refetchOnWindowFocus: false,
          staleTime:          60 * 1000, // 1 minute
        },
      },
    });
  }

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClientRef.current}>
        {children}
      </QueryClientProvider>
    </Provider>
  );
}