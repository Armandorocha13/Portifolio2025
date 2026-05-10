import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/compartilhado/interface/botao";

type ProjetoPortfolio = {
  titulo: string;
  descricao: string;
  tags: string[];
  github: string;
  demo: string;
};

const projetos: ProjetoPortfolio[] = [
  {
    titulo: "OsX",
    descricao:
      "Conjunto de ferramentas e scripts para automação e integração de tarefas, focado em produtividade e utilitários para desenvolvedores.",
    tags: ["Java", "Maven", "MySQL Connector"],
    github: "https://github.com/Armandorocha13/OsX",
    demo: "#",
  },
  {
    titulo: "Finance.io",
    descricao:
      "Aplicação web para gestão financeira pessoal com dashboards interativos, controle de transações e relatórios automatizados via IA.",
    tags: ["React", "TypeScript", "Supabase", "Tailwind CSS", "Recharts", "shadcn/ui"],
    github: "https://github.com/Armandorocha13/Finance.io",
    demo: "#",
  },
  {
    titulo: "gbsite",
    descricao:
      "Site institucional responsivo e otimizado para apresentar projetos e serviços, com foco em experiência do usuário e SEO.",
    tags: ["HTML", "CSS", "Font Awesome", "Google Fonts"],
    github: "https://github.com/Armandorocha13/gbsite",
    demo: "#",
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
          <span className="mono mb- block">
            <span className="text-foreground">04.</span> Projetos
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
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {projetos.map((projeto) => {
            const link_demo = projeto.demo === "#" ? projeto.github : projeto.demo;

            return (
              <article
                key={projeto.titulo}
                className="flex h-full flex-col rounded-2xl border border-white/20 bg-background/80 p-6"
              >
                <h3 className="mb-2 text-lg font-semibold">{projeto.titulo}</h3>
                <p className="mb-4 text-sm text-muted-foreground">{projeto.descricao}</p>

                <div className="mb-6 flex flex-wrap gap-2">
                  {projeto.tags.map((tag) => (
                    <span key={tag} className="rounded bg-gray-100 px-2 py-1 text-xs text-black">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex gap-3">
                  <a href={projeto.github} target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Button size="sm" variant="outline" className="w-full gap-2">
                      <Github className="h-4 w-4" />
                      Repositório
                    </Button>
                  </a>
                  <a href={link_demo} target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Button size="sm" className="w-full gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Demo
                    </Button>
                  </a>
                </div>
              </article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

