import { Link, Navigate, useParams } from "react-router-dom";
import { Check } from "lucide-react";

import { CabecalhoSecao, ChamadaFinal } from "@/apresentacao/componentes/aero/blocos";
import { Seo } from "@/apresentacao/componentes/seo";
import { buttonVariants } from "@/compartilhado/interface/botao";
import { SERVICOS, buscarServico } from "@/conteudo/servicos";
import { linkWhatsApp } from "@/conteudo/site";

/** Página de um serviço: /servicos/:slug (uma página gerada por serviço) */
const PaginaServico = () => {
  const { slug = "" } = useParams();
  const servico = buscarServico(slug);
  if (!servico) return <Navigate to="/servicos" replace />;

  const outros = SERVICOS.filter((s) => s.slug !== servico.slug);

  return (
    <>
      <Seo titulo={`${servico.nome} | AERO`} descricao={servico.resumo} caminho={`/servicos/${servico.slug}`} />
      <section className="section-padding pt-32 md:pt-40">
        <div className="container-narrow">
          <CabecalhoSecao nivel="h1" rotulo={servico.nome} titulo={servico.chamada} texto={servico.resumo} />
          <a
            href={linkWhatsApp(`Olá! Vim pelo site da AERO e quero saber mais sobre ${servico.nome.toLowerCase()}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ size: "lg", className: "rounded-full" })}
          >
            Conversar sobre {servico.nome.toLowerCase()}
          </a>
        </div>
      </section>

      <section className="section-padding pt-0 md:pt-0">
        <div className="container-narrow grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border p-6 md:p-8">
            <h2 className="heading-md mb-5">Faz sentido para você se…</h2>
            <ul className="space-y-3">
              {servico.paraQuem.map((item) => (
                <li key={item} className="body-md">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card/60 p-6 md:p-8">
            <h2 className="heading-md mb-5">O que você recebe</h2>
            <ul className="space-y-3">
              {servico.entregas.map((item) => (
                <li key={item} className="flex gap-3 text-base leading-relaxed">
                  <Check className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="container-narrow mt-8">
          <span className="mono mb-3 block text-xs">Exemplos</span>
          <ul className="flex flex-wrap gap-2">
            {servico.exemplos.map((item) => (
              <li key={item} className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-padding pt-0 md:pt-0">
        <div className="container-narrow">
          <span className="mono mb-4 block">Outros serviços</span>
          <div className="flex flex-wrap gap-3">
            {outros.map((s) => (
              <Link key={s.slug} to={`/servicos/${s.slug}`} className={buttonVariants({ variant: "outline", className: "rounded-full" })}>
                {s.nome}
              </Link>
            ))}
          </div>
        </div>
      </section>
      <ChamadaFinal />
    </>
  );
};

export default PaginaServico;
