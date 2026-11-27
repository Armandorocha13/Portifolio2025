import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight, Check } from "lucide-react";

import { BotoesContato, CartoesCases, ListaFaq } from "@/apresentacao/componentes/aero/blocos";
import { TextoRevelado } from "@/apresentacao/componentes/aero/texto_revelado";
import { Seo } from "@/apresentacao/componentes/seo";
import { MovimentoHome } from "@/compartilhado/efeitos/movimento_home";
import { useRevelar } from "@/compartilhado/ganchos/usar_revelar";
import { buttonVariants } from "@/compartilhado/interface/botao";
import { PROCESSO } from "@/conteudo/institucional";
import { SERVICOS } from "@/conteudo/servicos";
import { SITE } from "@/conteudo/site";

const MANIFESTO =
  "Sua equipe não foi contratada para copiar e colar. Cada tarefa repetitiva que a gente tira da mão dela vira tempo para atender, vender e crescer.";

const FAIXA = "Sites — Automações — Sistemas sob medida — ";

/** Rótulo + título grande que sobe palavra por palavra */
function TituloSecao({ rotulo, titulo }: { rotulo: string; titulo: string }) {
  return (
    <div className="mb-14 max-w-4xl">
      <span className="mono mb-5 block">{rotulo}</span>
      <TextoRevelado como="h2" texto={titulo} className="titulo-editorial" />
    </div>
  );
}

const PaginaInicio = () => {
  useRevelar();

  return (
    <>
      <Seo titulo={`${SITE.nome} | ${SITE.promessa}`} descricao={SITE.descricao} caminho="/" />
      <MovimentoHome />

      {/* Hero: tipografia gigante, sem desenho no fundo */}
      <section data-hero className="relative flex min-h-[100svh] flex-col justify-end px-6 pb-14 pt-32 md:px-12 lg:px-24">
        <div className="hero-conteudo">
          <span className="mono mb-6 block">Sites · Automações · Sistemas sob medida</span>
          <TextoRevelado como="h1" imediato atraso={150} texto="Seu negócio rodando sozinho." className="titulo-hero mb-12" />
          <div className="flex flex-col gap-8 border-t border-border pt-8 md:flex-row md:items-end md:justify-between">
            <p className="body-lg max-w-xl">{SITE.descricao}</p>
            <div className="flex flex-wrap gap-3">
              <Link to="/contato" className={buttonVariants({ size: "lg", className: "rounded-full" })}>
                Pedir orçamento
              </Link>
              <Link to="/servicos" className={buttonVariants({ size: "lg", variant: "outline", className: "rounded-full" })}>
                Ver serviços
              </Link>
            </div>
          </div>
        </div>
        <span className="mono absolute right-6 top-28 hidden items-center gap-2 text-xs md:flex lg:right-24">
          Role <ArrowDown className="h-3 w-3" />
        </span>
      </section>

      {/* Faixas de texto que andam com a rolagem */}
      <section data-faixa aria-hidden="true" className="overflow-hidden border-y border-border py-8">
        <div className="faixa-linha whitespace-nowrap text-[13vw] font-black uppercase leading-none tracking-tight md:text-[9vw]">
          {FAIXA.repeat(3)}
        </div>
        <div data-direcao="direita" className="faixa-linha texto-contorno whitespace-nowrap text-[13vw] font-black uppercase leading-none tracking-tight md:text-[9vw]">
          {FAIXA.repeat(3)}
        </div>
      </section>

      {/* Manifesto: palavras acendem uma a uma.
          A div de fora é do React; o GSAP prende (pin) a seção de dentro. Assim, trocar
          de página nunca tenta remover um nó que o GSAP moveu para o pin-spacer. */}
      <div>
        <section data-manifesto className="flex min-h-[100svh] items-center px-6 md:px-12 lg:px-24">
          <div className="mx-auto max-w-6xl">
            <span className="mono mb-8 block">Por que a AERO existe</span>
            <p className="text-[clamp(28px,4.6vw,68px)] font-semibold leading-[1.12] tracking-tight">
              {MANIFESTO.split(" ").map((palavra, i) => (
                <span key={i} className="mf-palavra">
                  {palavra}{" "}
                </span>
              ))}
            </p>
          </div>
        </section>
      </div>

      {/* Serviços em cartões que se empilham */}
      <section id="servicos" className="section-padding">
        <div className="container-narrow">
          <TituloSecao rotulo="Serviços" titulo="Três formas de tirar trabalho repetitivo da sua equipe" />
          <div data-pilha className="space-y-8">
            {SERVICOS.map((servico, i) => (
              <article key={servico.slug} className="pilha-cartao sticky" style={{ top: `${96 + i * 28}px` }}>
                <div className="pilha-corpo grid min-h-[68vh] gap-8 rounded-3xl border border-border bg-[#0b0b0b] p-8 md:grid-cols-[1fr_1.1fr] md:p-12">
                  <div className="flex flex-col">
                    <span className="mono mb-6 text-xs">0{i + 1} / {servico.nome}</span>
                    <h3 className="text-[clamp(30px,4vw,56px)] font-bold leading-[1.02] tracking-tight">{servico.chamada}</h3>
                    <p className="body-lg mt-6">{servico.resumo}</p>
                    <Link
                      to={`/servicos/${servico.slug}`}
                      className={buttonVariants({ variant: "outline", size: "lg", className: "mt-auto w-fit gap-2 rounded-full" })}
                    >
                      Ver {servico.nome.toLowerCase()} <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                  <ul className="flex flex-col justify-end gap-4 border-t border-border pt-6 md:border-l md:border-t-0 md:pl-10 md:pt-0">
                    {servico.entregas.slice(0, 4).map((item) => (
                      <li key={item} className="flex gap-3 text-base leading-relaxed md:text-lg">
                        <Check className="mt-1.5 h-4 w-4 shrink-0" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Processo na horizontal (mesmo cuidado do manifesto: div do React por fora) */}
      <div>
        <section id="processo" data-horizontal className="overflow-hidden py-20 md:py-0">
          <div className="flex min-h-[100svh] flex-col justify-center gap-12 px-6 md:px-12 lg:px-24">
            <TituloSecao rotulo="Como trabalhamos" titulo="Do diagnóstico ao suporte, sem surpresa" />
            <ol className="hz-trilho flex flex-col gap-6 min-[900px]:w-max min-[900px]:flex-row">
              {PROCESSO.map((etapa, i) => (
                <li
                  key={etapa.nome}
                  className="flex min-h-[300px] flex-col justify-between rounded-3xl border border-border p-8 min-[900px]:w-[38vw] md:p-10"
                >
                  <span className="text-[clamp(64px,9vw,140px)] font-black leading-none tracking-tighter text-foreground/15">0{i + 1}</span>
                  <div>
                    <h3 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">{etapa.nome}</h3>
                    <p className="body-lg">{etapa.texto}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>

      <section id="cases" className="section-padding">
        <div className="container-narrow">
          <TituloSecao rotulo="Cases" titulo="O tipo de problema que a gente resolve" />
          <CartoesCases />
        </div>
      </section>

      <section id="perguntas" className="section-padding">
        <div className="container-narrow">
          <TituloSecao rotulo="Perguntas frequentes" titulo="Antes de você perguntar" />
          <ListaFaq />
        </div>
      </section>

      {/* Fechamento: convite para conversar */}
      <section id="chamada" className="overflow-hidden px-6 pt-20 md:px-12 lg:px-24">
        <div className="container-narrow">
          <TituloSecao rotulo="Vamos conversar" titulo="Qual tarefa da sua empresa deveria rodar sozinha?" />
          <BotoesContato />
        </div>

        {/* Assinatura: o "O" entra rolando, bate no "R" e as letras quicam (movimento em movimento_home.tsx) */}
        <div data-quique role="img" aria-label="AERO" className="quique-palco">
          {["A", "E", "R", "O"].map((letra) => (
            <span key={letra} className={`qq-item qq-${letra.toLowerCase()}`} aria-hidden="true">
              <span className="qq-sombra" />
              <span className="qq-g">{letra}</span>
            </span>
          ))}
          <span className="qq-chao" aria-hidden="true" />
        </div>
        {/* Espaço calculado em movimento_home.tsx para a página terminar com o AERO no centro */}
        <div className="quique-folga" aria-hidden="true" />
      </section>
    </>
  );
};

export default PaginaInicio;
