import { type PropsWithChildren } from "react";

import { Toaster } from "@/compartilhado/interface/sonner";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
