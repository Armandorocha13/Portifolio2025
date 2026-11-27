import { CabecalhoSecao } from "@/apresentacao/componentes/aero/blocos";
import { Seo } from "@/apresentacao/componentes/seo";

/**
 * Política de privacidade (versão 1).
 * PENDENTE: revisão jurídica e dados do controlador (razão social/CNPJ e e-mail de contato).
 */
const PaginaPrivacidade = () => (
  <>
    <Seo
      titulo="Política de privacidade | AERO"
      descricao="Como a AERO coleta, usa e protege os dados enviados pelo site, de acordo com a LGPD."
      caminho="/privacidade"
    />
    <section className="section-padding pt-32 md:pt-40">
      <div className="container-narrow max-w-3xl">
        <CabecalhoSecao nivel="h1" rotulo="Privacidade" titulo="Política de privacidade" />
        <div className="space-y-8 text-base leading-relaxed text-muted-foreground">
          <div>
            <h2 className="heading-md mb-3 text-foreground">Quais dados coletamos</h2>
            <p>
              Quando você entra em contato pelo site, pelo WhatsApp ou pelo Instagram, recebemos os dados que você
              escolhe informar, como nome, e-mail, telefone e a descrição do seu projeto. O site também registra
              estatísticas de acesso agregadas, sem identificar quem visita.
            </p>
          </div>
          <div>
            <h2 className="heading-md mb-3 text-foreground">Para que usamos</h2>
            <p>
              Usamos esses dados somente para responder ao seu contato, preparar propostas e prestar os serviços
              contratados. Não vendemos nem compartilhamos seus dados para fins de marketing de terceiros.
            </p>
          </div>
          <div>
            <h2 className="heading-md mb-3 text-foreground">Por quanto tempo guardamos</h2>
            <p>
              Mantemos os dados enquanto houver conversa ou contrato em andamento e pelo prazo exigido por lei.
              Depois disso, eles são excluídos.
            </p>
          </div>
          <div>
            <h2 className="heading-md mb-3 text-foreground">Seus direitos</h2>
            <p>
              Pela Lei Geral de Proteção de Dados (Lei 13.709/2018), você pode pedir acesso, correção ou exclusão dos
              seus dados a qualquer momento pelos nossos canais de contato.
            </p>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default PaginaPrivacidade;
