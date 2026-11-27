import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { Footer } from "@/apresentacao/componentes/layout/rodape";
import { Header } from "@/apresentacao/componentes/layout/cabecalho";
import { MENU } from "@/conteudo/site";

const LINKS = MENU.map((item) => ({ label: item.rotulo, href: item.href }));

/** Estrutura comum das páginas da AERO: cabeçalho, conteúdo e rodapé */
export function LayoutAero() {
  const { pathname } = useLocation();

  // Ao trocar de página pela navegação interna, volta ao topo
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-transparent">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
      >
        Pular para o conteúdo
      </a>
      <Header links={LINKS} acao={{ label: "Pedir orçamento", href: "/contato" }} />
      <main id="conteudo">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
