import { Link } from "react-router-dom";

import {
  CabecalhoSecao,
  CartoesCases,
  CartoesServicos,
  ChamadaFinal,
  ListaFaq,
  ListaProcesso,
} from "@/apresentacao/componentes/aero/blocos";
import { Seo } from "@/apresentacao/componentes/seo";
import { WireframeIcon3D } from "@/compartilhado/graficos/icones_wireframe";
import { buttonVariants } from "@/compartilhado/interface/botao";
import { SITE } from "@/conteudo/site";

const PaginaInicio = () => (
  <>
    <Seo titulo={`${SITE.nome} | ${SITE.promessa}`} descricao={SITE.descricao} caminho="/" />

    <section className="relative flex min-h-[92vh] items-center overflow-hidden px-6 md:px-12 lg:px-24">
      <div
        className="pointer-events-none absolute right-[-6%] top-1/2 hidden -translate-y-1/2 opacity-40 md:block"
        aria-hidden="true"
      >
        <WireframeIcon3D forma="gear" width={620} height={620} />
      </div>
      <div className="container-narrow relative z-10 w-full">
        <span className="mono mb-6 block">Sites · Automações · Sistemas sob medida</span>
        <h1 className="heading-xl mb-6 max-w-3xl">Seu negócio rodando sozinho.</h1>
        <p className="body-lg mb-10 max-w-xl">{SITE.descricao}</p>
        <div className="flex flex-wrap gap-3">
          <Link to="/contato" className={buttonVariants({ size: "lg", className: "rounded-full" })}>
            Pedir orçamento
          </Link>
          <Link to="/servicos" className={buttonVariants({ size: "lg", variant: "outline", className: "rounded-full" })}>
            Ver serviços
          </Link>
        </div>
      </div>
    </section>

    <section id="servicos" className="section-padding">
      <div className="container-narrow">
        <CabecalhoSecao
          rotulo="Serviços"
          titulo="Três formas de tirar trabalho repetitivo da sua equipe"
          texto="Do site que traz o cliente até o sistema que organiza a operação."
        />
        <CartoesServicos />
      </div>
    </section>

    <section id="processo" className="section-padding">
      <div className="container-narrow">
        <CabecalhoSecao
          rotulo="Como trabalhamos"
          titulo="Do diagnóstico ao suporte, sem surpresa"
          texto="Você sabe o escopo, o prazo e o valor antes de começar."
        />
        <ListaProcesso />
      </div>
    </section>

    <section id="cases" className="section-padding">
      <div className="container-narrow">
        <CabecalhoSecao rotulo="Cases" titulo="O tipo de problema que a gente resolve" />
        <CartoesCases />
      </div>
    </section>

    <section id="perguntas" className="section-padding">
      <div className="container-narrow">
        <CabecalhoSecao rotulo="Perguntas frequentes" titulo="Antes de você perguntar" />
        <ListaFaq />
      </div>
    </section>

    <ChamadaFinal />
  </>
);

export default PaginaInicio;
