/**
 * Serviços da AERO. Cada item gera uma página em /servicos/:slug.
 * Textos em versão 1: revisar e aprovar antes do lançamento.
 */
export type Servico = {
  slug: string;
  nome: string;
  chamada: string;
  resumo: string;
  paraQuem: string[];
  entregas: string[];
  exemplos: string[];
};

export const SERVICOS: Servico[] = [
  {
    slug: "sites",
    nome: "Sites",
    chamada: "Um site que transforma visita em conversa",
    resumo:
      "Site institucional ou página de vendas feito sob medida, rápido no celular e pensado para o cliente entrar em contato.",
    paraQuem: [
      "Seu negócio ainda depende só do Instagram para ser encontrado",
      "O site atual é bonito, mas ninguém chama pelo WhatsApp",
      "Você precisa de uma página para lançar um serviço ou campanha",
    ],
    entregas: [
      "Layout próprio, seguindo a identidade da sua marca",
      "Versão para celular revisada tela a tela",
      "Botões de WhatsApp e formulário de orçamento",
      "Domínio, hospedagem e SEO básico configurados",
      "Métricas de visitas e de contatos recebidos",
    ],
    exemplos: ["Site institucional", "Página de vendas", "Cardápio ou catálogo online"],
  },
  {
    slug: "automacoes",
    nome: "Automações",
    chamada: "As tarefas repetitivas saem da mão da sua equipe",
    resumo:
      "Robôs e rotinas que coletam dados de portais e sistemas, organizam planilhas e enviam relatórios prontos no horário, todos os dias.",
    paraQuem: [
      "Alguém da equipe passa horas copiando dados de um sistema para outro",
      "O relatório da manhã depende de uma pessoa abrir cinco arquivos",
      "Erros de digitação aparecem só quando o cliente reclama",
    ],
    entregas: [
      "Mapeamento do processo atual, passo a passo",
      "Rotina automática agendada (robô, script ou integração)",
      "Relatório ou planilha entregue por e-mail ou painel web",
      "Aviso quando algo falhar, para ninguém ser pego de surpresa",
      "Documentação simples para a sua equipe",
    ],
    exemplos: ["Relatório diário por e-mail", "Conferência de estoque", "Consolidação de planilhas"],
  },
  {
    slug: "solucoes-sob-medida",
    nome: "Soluções sob medida",
    chamada: "Um sistema do tamanho do seu processo",
    resumo:
      "Painéis, cadastros e pequenos sistemas web que conectam o que você já usa, como Google Sheets, e-mail e bancos de dados.",
    paraQuem: [
      "A operação cresceu e a planilha não dá mais conta",
      "Cada área tem a sua versão dos números",
      "Você precisa acompanhar indicadores sem montar o relatório na mão",
    ],
    entregas: [
      "Levantamento do que o sistema precisa fazer, sem excesso",
      "Painel web com login e acesso pelo celular",
      "Integração com as planilhas e sistemas atuais",
      "Entregas em etapas curtas, com validação a cada uma",
      "Suporte e ajustes combinados na proposta",
    ],
    exemplos: ["Painel de indicadores", "Controle de estoque", "Cadastro e acompanhamento de pedidos"],
  },
];

export const buscarServico = (slug: string) => SERVICOS.find((s) => s.slug === slug);
