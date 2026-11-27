import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Instagram, MessageCircle } from "lucide-react";

import { buttonVariants } from "@/compartilhado/interface/botao";
import { cn } from "@/compartilhado/biblioteca/utilitarios";
import { SERVICOS } from "@/conteudo/servicos";
import { CASES, FAQ, PROCESSO, type Case } from "@/conteudo/institucional";
import { linkInstagram, linkWhatsApp } from "@/conteudo/site";

/** Título de seção: rótulo em mono, título grande e texto de apoio */
export function CabecalhoSecao({
  rotulo,
  titulo,
  texto,
  nivel = "h2",
}: {
  rotulo: string;
  titulo: string;
  texto?: string;
  nivel?: "h1" | "h2";
}) {
  const Titulo = nivel;
  return (
    <div className="mb-12 max-w-3xl">
      <span className="mono mb-4 block">{rotulo}</span>
      <Titulo className={nivel === "h1" ? "heading-xl mb-6" : "heading-lg mb-4"}>{titulo}</Titulo>
      {texto && <p className="body-lg">{texto}</p>}
    </div>
  );
}

export function CartoesServicos() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {SERVICOS.map((servico) => (
        <Link
          key={servico.slug}
          to={`/servicos/${servico.slug}`}
          className="group flex flex-col rounded-2xl border border-border bg-card/60 p-6 transition-colors hover:border-foreground/40"
        >
          <span className="mono mb-3 text-xs">{servico.nome}</span>
          <h3 className="heading-md mb-3">{servico.chamada}</h3>
          <p className="body-md mb-6">{servico.resumo}</p>
          <span className="mt-auto inline-flex items-center gap-2 text-sm font-medium">
            Ver detalhes <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      ))}
    </div>
  );
}

export function ListaProcesso() {
  return (
    <ol className="grid gap-6 md:grid-cols-4">
      {PROCESSO.map((etapa, i) => (
        <li key={etapa.nome} className="rounded-2xl border border-border p-6">
          <span className="mono mb-4 block text-xs">0{i + 1}</span>
          <h3 className="heading-md mb-2">{etapa.nome}</h3>
          <p className="body-md">{etapa.texto}</p>
        </li>
      ))}
    </ol>
  );
}

export function SeloExemplo() {
  return (
    <span className="inline-block rounded-full border border-border px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
      Projeto de exemplo
    </span>
  );
}

function CartaoCase({ item }: { item: Case }) {
  return (
    <article className="flex flex-col rounded-2xl border border-border bg-card/60 p-6">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <span className="mono text-xs">{item.servico}</span>
        {item.exemplo && <SeloExemplo />}
      </div>
      <h3 className="heading-md mb-5">{item.titulo}</h3>
      <dl className="space-y-4">
        <div>
          <dt className="mono mb-1 text-xs">Problema</dt>
          <dd className="body-md">{item.problema}</dd>
        </div>
        <div>
          <dt className="mono mb-1 text-xs">Solução</dt>
          <dd className="body-md">{item.solucao}</dd>
        </div>
        <div>
          <dt className="mono mb-1 text-xs">Resultado</dt>
          <dd className="text-base leading-relaxed text-foreground">{item.resultado}</dd>
        </div>
      </dl>
    </article>
  );
}

export function CartoesCases() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {CASES.map((item) => (
        <CartaoCase key={item.slug} item={item} />
      ))}
    </div>
  );
}

export function ListaFaq() {
  return (
    <div className="divide-y divide-border rounded-2xl border border-border">
      {FAQ.map((item) => (
        <details key={item.pergunta} className="group p-6 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium">
            {item.pergunta}
            <span className="text-2xl text-muted-foreground transition-transform group-open:rotate-45" aria-hidden="true">
              +
            </span>
          </summary>
          <p className="body-md mt-4">{item.resposta}</p>
        </details>
      ))}
    </div>
  );
}

/** Botões de contato direto: WhatsApp e Instagram */
export function BotoesContato({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      <a
        href={linkWhatsApp()}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonVariants({ size: "lg", className: "gap-2 rounded-full" })}
      >
        <MessageCircle className="h-4 w-4" /> Chamar no WhatsApp
      </a>
      <a
        href={linkInstagram()}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonVariants({ size: "lg", variant: "outline", className: "gap-2 rounded-full" })}
      >
        <Instagram className="h-4 w-4" /> @aero.code <ArrowUpRight className="h-4 w-4" />
      </a>
    </div>
  );
}

/** Faixa de fechamento das páginas, levando ao contato */
export function ChamadaFinal() {
  return (
    <section className="section-padding">
      <div className="container-narrow rounded-3xl border border-border bg-gradient-to-br from-card to-background p-8 md:p-14">
        <span className="mono mb-4 block">Vamos conversar</span>
        <h2 className="heading-lg mb-4">Qual tarefa da sua empresa deveria rodar sozinha?</h2>
        <p className="body-lg mb-8 max-w-2xl">
          Conte o que toma tempo da sua equipe. A gente entende o processo e volta com uma proposta de escopo, prazo e
          valor.
        </p>
        <BotoesContato />
      </div>
    </section>
  );
}
