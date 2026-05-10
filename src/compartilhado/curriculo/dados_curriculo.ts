export type ProjetoExperiencia = {
  titulo: string;
  descricao: string;
  tecnologias: string[];
  link_github: string;
};

export const DADOS_CURRICULO = {
  nome: "Armando de Lima Rocha",
  idade: 27,
  cidade: "Nova Iguaçu",
  estado: "Rio de Janeiro",
  email: "mandoqxo@gmail.com",
  whatsapp: "21990708854",
  resumo_profissional:
    "Profissional com foco em dados e desenvolvimento de sistemas, com atuação prática em projetos autorais de automação, integração e visualização de informações. Em transição para a área de dados, com base técnica em SQL, Java, Power BI, APIs e construção de soluções orientadas a resultado.",
  objetivo:
    "Atuar na área de dados como Analista de Dados Júnior, aplicando conhecimentos técnicos em projetos reais, automação de processos e criação de dashboards para apoiar a tomada de decisão.",
  competencias: [
    "Java",
    "SQL",
    "Power BI",
    "Excel Avançado",
    "REST API",
    "Git e GitHub",
    "Inteligência Artificial aplicada",
    "Automação de processos",
  ],
};

export const PROJETOS_COMO_EXPERIENCIA: ProjetoExperiencia[] = [
  {
    titulo: "OsX",
    descricao:
      "Conjunto de ferramentas e scripts para automação e integração de tarefas, com foco em produtividade e utilitários para desenvolvimento.",
    tecnologias: ["Node.js", "JavaScript", "Automação"],
    link_github: "https://github.com/Armandorocha13/OsX",
  },
  {
    titulo: "Finance.io",
    descricao:
      "Aplicação web para gestão financeira com dashboards interativos, controle de transações e relatórios automatizados com apoio de IA.",
    tecnologias: ["React", "TypeScript", "Supabase", "IA"],
    link_github: "https://github.com/Armandorocha13/Finance.io",
  },
  {
    titulo: "gbsite",
    descricao:
      "Site institucional responsivo e otimizado para apresentar projetos e serviços, com foco em experiência do usuário e SEO.",
    tecnologias: ["HTML", "CSS", "JavaScript", "SEO"],
    link_github: "https://github.com/Armandorocha13/gbsite",
  },
];
