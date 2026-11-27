import { Outlet } from "react-router-dom";

import { AppProviders } from "@/aplicacao/provedores";

/** Raiz de todas as páginas: provedores (o fundo de símbolos ficou só no portfólio pessoal) */
export function Raiz() {
  return (
    <AppProviders>
      <Outlet />
    </AppProviders>
  );
}
