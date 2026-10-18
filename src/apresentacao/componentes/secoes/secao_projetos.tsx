import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github } from "lucide-react";
import { Button } from "@/compartilhado/interface/botao";

type ProjetoPortfolio = {
  titulo: string;
  descricao: string;
  tags: string[];
  github: string;
  imagem: string;
  imagemAlt: string;
};

const projetos: ProjetoPortfolio[] = [
  {
    titulo: "AXIS automate",
    descricao:
      "Pipeline de dados de operações de campo: robôs RPA extraem os relatórios diários dos portais operacionais, os dados são tratados e consolidados em SQLite e Google Sheets, e os relatórios gerenciais (KPIs, gráficos e Excel) são disparados por e-mail e publicados em painéis web. Inclui a geração automática dos arquivos padrão de baixa de materiais.",
    tags: ["Python", "Selenium", "pandas", "SQLite", "Google Sheets API", "Supabase", "Excel", "ETL"],
    github: "https://github.com/Armandorocha13/axis-automate",
    imagem: "/projetos/axis-automate.webp",
    imagemAlt: "Interface do AXIS automate aberta no Painel de Controle dos Robôs de extração",
  },
];

export const ProjectsSection = () => {
  const ref = useRef(null);
  const estaVisivel = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projetos" className="section-padding" ref={ref}>
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={estaVisivel ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="mono mb-4 block">
            <span className="text-foreground">05.</span> Projetos
          </span>

          <h2 className="heading-lg mb-16">
            Trabalhos<br />
            <span className="text-muted-foreground">em destaque</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={estaVisivel ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mx-auto grid max-w-4xl grid-cols-1 gap-6"
        >
          {projetos.map((projeto) => {
            return (
              <article
                key={projeto.titulo}
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/20 bg-background/80 text-center"
              >
                <a
                  href={projeto.imagem}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border-b border-white/10"
                  aria-label={`Abrir a imagem da interface do ${projeto.titulo} em tamanho real`}
                >
                  <img
                    src={projeto.imagem}
                    alt={projeto.imagemAlt}
                    width={1600}
                    height={1000}
                    loading="lazy"
                    className="aspect-[16/10] w-full object-cover object-top transition-opacity hover:opacity-90"
                  />
                </a>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-2 text-lg font-semibold">{projeto.titulo}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">{projeto.descricao}</p>

                  <div className="mb-6 flex flex-wrap justify-center gap-2">
                    {projeto.tags.map((tag) => (
                      <span key={tag} className="rounded bg-gray-100 px-2 py-1 text-xs text-black">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex justify-center">
                    <a href={projeto.github} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" variant="outline" className="gap-2">
                        <Github className="h-4 w-4" />
                        Ver repositório
                      </Button>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

