import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "@/apresentacao/paginas/pagina_inicial";
import NotFoundPage from "@/apresentacao/paginas/pagina_nao_encontrada";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
