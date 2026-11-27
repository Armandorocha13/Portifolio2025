import { Outlet } from "react-router-dom";

import { AppProviders } from "@/aplicacao/provedores";
import { VectorBackground } from "@/compartilhado/efeitos/fundo_vetorial";

/** Raiz de todas as páginas: provedores e o fundo vetorial animado */
export function Raiz() {
  return (
    <AppProviders>
      <VectorBackground />
      <Outlet />
    </AppProviders>
  );
}
