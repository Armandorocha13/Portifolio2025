import type { RouteRecord } from "vite-react-ssg";

import { Raiz } from "@/aplicacao/raiz";
import { LayoutAero } from "@/apresentacao/componentes/layout/layout_aero";
import PaginaCases from "@/apresentacao/paginas/pagina_cases";
import PaginaContato from "@/apresentacao/paginas/pagina_contato";
import PaginaInicio from "@/apresentacao/paginas/pagina_inicio";
import NotFoundPage from "@/apresentacao/paginas/pagina_nao_encontrada";
import PaginaPrivacidade from "@/apresentacao/paginas/pagina_privacidade";
import PaginaServico from "@/apresentacao/paginas/pagina_servico";
import PaginaServicos from "@/apresentacao/paginas/pagina_servicos";
import PaginaSobre from "@/apresentacao/paginas/pagina_sobre";
import { SERVICOS } from "@/conteudo/servicos";

/**
 * Rotas do site. Cada uma vira um arquivo HTML no build (vite-react-ssg).
 * /servicos/:slug gera uma página por serviço; /404 gera o 404.html usado pela Vercel.
 */
export const rotas: RouteRecord[] = [
  {
    path: "/",
    element: <Raiz />,
    children: [
      {
        element: <LayoutAero />,
        children: [
          { index: true, element: <PaginaInicio /> },
          { path: "servicos", element: <PaginaServicos /> },
          {
            path: "servicos/:slug",
            element: <PaginaServico />,
            getStaticPaths: () => SERVICOS.map((s) => `servicos/${s.slug}`),
          },
          { path: "cases", element: <PaginaCases /> },
          { path: "sobre", element: <PaginaSobre /> },
          { path: "contato", element: <PaginaContato /> },
          { path: "privacidade", element: <PaginaPrivacidade /> },
          { path: "404", element: <NotFoundPage /> },
          { path: "*", element: <NotFoundPage /> },
        ],
      },
      {
        // Carregada sob demanda: o portfólio usa Framer Motion, que as páginas da AERO não precisam
        path: "armando",
        lazy: () => import("@/apresentacao/paginas/pagina_portfolio_armando").then((m) => ({ Component: m.default })),
      },
    ],
  },
];
