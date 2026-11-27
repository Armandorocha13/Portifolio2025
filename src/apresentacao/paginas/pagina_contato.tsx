import { BotoesContato, CabecalhoSecao, ListaFaq } from "@/apresentacao/componentes/aero/blocos";
import { Seo } from "@/apresentacao/componentes/seo";
import { SITE } from "@/conteudo/site";

/** Contato. O formulário de orçamento entra na Fase 4 (api/orcamento). */
const PaginaContato = () => (
  <>
    <Seo
      titulo="Contato | AERO"
      descricao="Fale com a AERO pelo WhatsApp ou Instagram e conte qual processo da sua empresa você quer automatizar."
      caminho="/contato"
    />
    <section className="section-padding pt-32 md:pt-40">
      <div className="container-narrow">
        <CabecalhoSecao
          nivel="h1"
          rotulo="Contato"
          titulo="Conte o que toma tempo da sua equipe"
          texto="Explique em poucas linhas o processo ou o site que você precisa. A gente responde, marca o diagnóstico e envia a proposta."
        />
        <BotoesContato className="mb-6" />
        <p className="text-sm text-muted-foreground">{SITE.cidade} · atendimento remoto para todo o Brasil</p>
      </div>
    </section>
    <section className="section-padding pt-0 md:pt-0">
      <div className="container-narrow">
        <CabecalhoSecao rotulo="Perguntas frequentes" titulo="Dúvidas comuns" />
        <ListaFaq />
      </div>
    </section>
  </>
);

export default PaginaContato;
