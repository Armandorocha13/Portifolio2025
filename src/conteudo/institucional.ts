/**
 * Processo, cases e perguntas frequentes.
 * Textos em versão 1: revisar e aprovar antes do lançamento.
 */
export const PROCESSO = [
  {
    nome: "Diagnóstico",
    texto: "Uma conversa para entender o processo, as ferramentas que você já usa e onde está o gargalo.",
  },
  {
    nome: "Proposta",
    texto: "Escopo, prazo e valor fechados por escrito, antes de qualquer linha de código.",
  },
  {
    nome: "Entrega",
    texto: "Construção em etapas curtas. Você valida cada parte antes da próxima.",
  },
  {
    nome: "Suporte",
    texto: "Acompanhamento depois da entrega, com ajustes e melhorias combinados.",
  },
] as const;

export type Case = {
  slug: string;
  titulo: string;
  servico: string;
  /** true = projeto ilustrativo, exibido com o selo "Projeto de exemplo" */
  exemplo: boolean;
  problema: string;
  solucao: string;
  resultado: string;
};

/**
 * PENDENTE: substituir por cases reais e autorizados pelos clientes.
 * Enquanto isso, os exemplos abaixo aparecem com o selo "Projeto de exemplo".
 */
export const CASES: Case[] = [
  {
    slug: "relatorio-diario-automatico",
    titulo: "Relatório diário que chega pronto",
    servico: "Automações",
    exemplo: true,
    problema:
      "Uma empresa de serviços de campo montava todo dia um relatório juntando dados de três portais diferentes, à mão.",
    solucao:
      "Um robô coleta os dados nos portais de madrugada, confere as informações e monta a planilha consolidada.",
    resultado: "O relatório chega no e-mail da gestão antes do início do expediente, sem ninguém montar.",
  },
  {
    slug: "site-negocio-local",
    titulo: "Site que leva o cliente ao WhatsApp",
    servico: "Sites",
    exemplo: true,
    problema:
      "Um negócio local dependia só do Instagram e perdia clientes que procuravam o serviço no Google.",
    solucao:
      "Um site de uma página, rápido no celular, com serviços, área de atendimento e botão de WhatsApp em cada seção.",
    resultado: "Quem procura o serviço encontra a empresa e chega ao WhatsApp com um toque.",
  },
];

export const FAQ = [
  {
    pergunta: "Quanto custa um projeto?",
    resposta:
      "Depende do escopo. Depois do diagnóstico, você recebe uma proposta com valor fechado, sem surpresa no meio do caminho.",
  },
  {
    pergunta: "Quanto tempo leva?",
    resposta:
      "O prazo entra na proposta. Sites e automações simples costumam ser entregues em poucas semanas; sistemas maiores, em etapas.",
  },
  {
    pergunta: "Preciso trocar os sistemas que já uso?",
    resposta:
      "Não. A automação trabalha com o que você já tem: planilhas, e-mail, portais e sistemas da empresa.",
  },
  {
    pergunta: "E depois da entrega?",
    resposta:
      "O suporte e os ajustes ficam combinados na proposta. Se algo falhar, você é avisado e a gente resolve.",
  },
  {
    pergunta: "Meus dados ficam seguros?",
    resposta:
      "Usamos só os acessos necessários, as credenciais continuam suas e o tratamento de dados segue a LGPD.",
  },
] as const;
