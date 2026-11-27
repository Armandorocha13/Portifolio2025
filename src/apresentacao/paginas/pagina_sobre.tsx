import { CabecalhoSecao, ChamadaFinal, ListaProcesso } from "@/apresentacao/componentes/aero/blocos";
import { Seo } from "@/apresentacao/componentes/seo";

const PaginaSobre = () => (
  <>
    <Seo
      titulo="Sobre | AERO"
      descricao="A AERO é um estúdio de software do Rio de Janeiro focado em sites e automações para pequenas e médias empresas."
      caminho="/sobre"
    />
    <section className="section-padding pt-32 md:pt-40">
      <div className="container-narrow">
        <CabecalhoSecao
          nivel="h1"
          rotulo="Sobre"
          titulo="Tecnologia a serviço da rotina, não o contrário"
          texto="A AERO é um estúdio de software do Rio de Janeiro. Nascemos dentro de operações de campo, automatizando relatórios, conferências e planilhas que tomavam horas por dia. Hoje levamos o mesmo jeito de trabalhar para pequenas e médias empresas."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { titulo: "Simples primeiro", texto: "A solução mais simples que resolve o problema, sem sistema maior que a necessidade." },
            { titulo: "Combinado por escrito", texto: "Escopo, prazo e valor fechados antes de começar." },
            { titulo: "Você no controle", texto: "Acessos, dados e documentação ficam com você." },
          ].map((valor) => (
            <div key={valor.titulo} className="rounded-2xl border border-border p-6">
              <h2 className="heading-md mb-2">{valor.titulo}</h2>
              <p className="body-md">{valor.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    <section className="section-padding">
      <div className="container-narrow">
        <CabecalhoSecao rotulo="Como trabalhamos" titulo="Quatro etapas, do primeiro contato ao suporte" />
        <ListaProcesso />
      </div>
    </section>
    <ChamadaFinal />
  </>
);

export default PaginaSobre;
