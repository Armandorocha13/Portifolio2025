import { CabecalhoSecao, CartoesServicos, ChamadaFinal, ListaProcesso } from "@/apresentacao/componentes/aero/blocos";
import { Seo } from "@/apresentacao/componentes/seo";

const PaginaServicos = () => (
  <>
    <Seo
      titulo="Serviços | AERO"
      descricao="Sites que geram contato, automações de rotina e sistemas sob medida para pequenas e médias empresas."
      caminho="/servicos"
    />
    <section className="section-padding pt-32 md:pt-40">
      <div className="container-narrow">
        <CabecalhoSecao
          nivel="h1"
          rotulo="Serviços"
          titulo="O que a AERO faz"
          texto="Escolha pelo problema que você quer resolver. Se não souber qual, a conversa de diagnóstico ajuda a descobrir."
        />
        <CartoesServicos />
      </div>
    </section>
    <section className="section-padding">
      <div className="container-narrow">
        <CabecalhoSecao rotulo="Como trabalhamos" titulo="O mesmo processo em todo projeto" />
        <ListaProcesso />
      </div>
    </section>
    <ChamadaFinal />
  </>
);

export default PaginaServicos;
