import { CabecalhoSecao, CartoesCases, ChamadaFinal } from "@/apresentacao/componentes/aero/blocos";
import { Seo } from "@/apresentacao/componentes/seo";

const PaginaCases = () => (
  <>
    <Seo
      titulo="Cases | AERO"
      descricao="Exemplos do tipo de problema que a AERO resolve com sites, automações e sistemas sob medida."
      caminho="/cases"
    />
    <section className="section-padding pt-32 md:pt-40">
      <div className="container-narrow">
        <CabecalhoSecao
          nivel="h1"
          rotulo="Cases"
          titulo="Problema, solução e resultado"
          texto="Os projetos marcados como exemplo ilustram situações comuns; os cases de clientes entram aqui com a autorização de cada um."
        />
        <CartoesCases />
      </div>
    </section>
    <ChamadaFinal />
  </>
);

export default PaginaCases;
