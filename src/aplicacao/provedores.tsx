import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type PropsWithChildren } from "react";

import { Toaster } from "@/compartilhado/interface/toaster";
import { Toaster as Sonner } from "@/compartilhado/interface/sonner";
import { TooltipProvider } from "@/compartilhado/interface/tooltip";

const queryClient = new QueryClient();

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {children}
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
