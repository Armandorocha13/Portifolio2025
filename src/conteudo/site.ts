/**
 * Dados gerais da AERO usados em todo o site.
 * Textos em versão 1: revisar e aprovar antes do lançamento.
 */
export const SITE = {
  nome: "AERO",
  url: "https://www.aero-code.tech",
  promessa: "Sites e automações para o seu negócio rodar sozinho",
  descricao:
    "A AERO cria sites que geram contato e automações que tiram as tarefas repetitivas da sua equipe: coleta de dados, planilhas e relatórios no horário.",
  cidade: "Rio de Janeiro, Brasil",
  imagemCompartilhamento: "/og-aero.png",
} as const;

/**
 * Canais de contato comercial.
 * PENDENTE: definir o e-mail comercial (ex.: contato@aero-code.tech) e confirmar o WhatsApp.
 */
export const CONTATO = {
  whatsappNumero: "5521990708854",
  whatsappMensagem: "Olá! Vim pelo site da AERO e quero conversar sobre um projeto.",
  instagram: "aero.code",
  email: null as string | null,
};

export const linkWhatsApp = (mensagem: string = CONTATO.whatsappMensagem) =>
  `https://wa.me/${CONTATO.whatsappNumero}?text=${encodeURIComponent(mensagem)}`;

export const linkInstagram = () => `https://instagram.com/${CONTATO.instagram}`;

/** Links do menu principal das páginas da AERO */
export const MENU = [
  { rotulo: "Serviços", href: "/servicos" },
  { rotulo: "Cases", href: "/cases" },
  { rotulo: "Sobre", href: "/sobre" },
  { rotulo: "Contato", href: "/contato" },
] as const;
