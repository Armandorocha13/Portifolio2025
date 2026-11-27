import { Link } from "react-router-dom";

import { Seo } from "@/apresentacao/componentes/seo";
import { buttonVariants } from "@/compartilhado/interface/botao";

const NotFoundPage = () => (
  <section className="flex min-h-[80vh] items-center justify-center px-6 pt-24">
    <Seo titulo="Página não encontrada | AERO" descricao="A página que você procurou não existe." caminho="/404" semIndexar />
    <div className="text-center">
      <span className="mono mb-4 block">Erro 404</span>
      <h1 className="heading-lg mb-4">Esta página não existe</h1>
      <p className="body-lg mb-8">O endereço pode ter mudado. Volte para o início e siga de lá.</p>
      <Link to="/" className={buttonVariants({ size: "lg", className: "rounded-full" })}>
        Ir para o início
      </Link>
    </div>
  </section>
);

export default NotFoundPage;
