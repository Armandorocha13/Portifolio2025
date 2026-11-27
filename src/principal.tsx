import { ViteReactSSG } from "vite-react-ssg";

import { rotas } from "@/aplicacao/rotas";
import "@fontsource/orbitron/700.css";
import "@fontsource/inter/900.css";
import "@/estilos/global.css";

// Gera um HTML por rota no build e hidrata no navegador
export const createRoot = ViteReactSSG({ routes: rotas });
