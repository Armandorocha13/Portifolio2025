import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Briefcase, GraduationCap, MapPin } from "lucide-react";

type Experiencia = {
  cargo: string;
  empresa: string;
  periodo: string;
  local: string;
  destaques: string[];
  tecnologias: string[];
};

const experiencias: Experiencia[] = [
  {
    cargo: "Analista de Planejamento e Controle",
    empresa: "FFA Infraestrutura",
    periodo: "12/2025 – Atual",
    local: "Queimados, RJ",
    destaques: [
      "AXIS automate: liderei o desenvolvimento de um sistema em Python que automatiza a extração de dados e o envio de relatórios, otimizando rotinas operacionais recorrentes e reduzindo o trabalho manual.",
      "Automação de ETL: automatizei rotinas de extração, tratamento e consolidação com Python e n8n, incluindo LLMs locais em terminais restritos, eliminando horas de trabalho manual recorrente e reduzindo erros de consolidação.",
      "Governança de dados: reestruturei métricas corporativas críticas e atualizei as regras de negócio de controle de ativos, aumentando a rastreabilidade e reduzindo perdas.",
    ],
    tecnologias: ["Python", "n8n", "SQL", "ETL", "Star Schema", "Power BI", "DAX", "LLMs locais"],
  },
];

const formacao = {
  curso: "Análise e Desenvolvimento de Sistemas",
  instituicao: "Universidade Veiga de Almeida (UVA)",
  periodo: "Previsão de conclusão: 2026",
  destaques: ["Banco de Dados", "Análise de Dados", "Engenharia de Dados"],
};

const certificacoes = [
  { nome: "Azure Data Fundamentals", codigo: "DP-900", emissor: "Microsoft" },
];

/**
 * Componente Experiência - Experiência profissional e formação acadêmica
 */
export const ExperienceSection = () => {
  const ref = useRef(null);
  const estaVisivel = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experiencia" className="section-padding" ref={ref}>
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={estaVisivel ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="mono mb-4 block">
            <span className="text-foreground">03.</span> Experiência
          </span>

          <h2 className="heading-lg mb-12 md:mb-16">
            Trajetória<br />
            <span className="text-muted-foreground">profissional</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {experiencias.map((experiencia) => (
            <motion.article
              key={experiencia.empresa + experiencia.periodo}
              initial={{ opacity: 0, y: 50 }}
              animate={estaVisivel ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="rounded-2xl border border-white/20 bg-background/80 p-6 md:p-8 lg:col-span-2"
            >
              <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <Briefcase className="mt-1 h-5 w-5 shrink-0 text-muted-foreground" />
                  <div>
                    <h3 className="text-lg font-semibold">{experiencia.cargo}</h3>
                    <p className="text-sm text-muted-foreground">{experiencia.empresa}</p>
                  </div>
                </div>
                <div className="pl-8 text-xs text-muted-foreground sm:pl-0 sm:text-right">
                  <p className="mono">{experiencia.periodo}</p>
                  <p className="mt-1 inline-flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {experiencia.local}
                  </p>
                </div>
              </div>

              <ul className="mb-6 space-y-3">
                {experiencia.destaques.map((destaque) => (
                  <li key={destaque} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/60" />
                    <span>
                      {destaque.includes(": ") ? (
                        <>
                          <strong className="font-medium text-foreground">{destaque.split(": ")[0]}:</strong>{" "}
                          {destaque.slice(destaque.indexOf(": ") + 2)}
                        </>
                      ) : (
                        destaque
                      )}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {experiencia.tecnologias.map((tecnologia) => (
                  <span key={tecnologia} className="rounded bg-gray-100 px-2 py-1 text-xs text-black">
                    {tecnologia}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}

          <motion.article
            initial={{ opacity: 0, y: 50 }}
            animate={estaVisivel ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
            className="rounded-2xl border border-white/20 bg-background/80 p-6 md:p-8"
          >
            <div className="mb-5 flex items-start gap-3">
              <GraduationCap className="mt-1 h-5 w-5 shrink-0 text-muted-foreground" />
              <div>
                <h3 className="text-lg font-semibold">Formação</h3>
                <p className="text-sm text-muted-foreground">{formacao.instituicao}</p>
              </div>
            </div>

            <p className="mb-1 text-sm font-medium">{formacao.curso}</p>
            <p className="mono mb-6 text-xs">{formacao.periodo}</p>

            <p className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">Destaques</p>
            <div className="flex flex-wrap gap-2">
              {formacao.destaques.map((destaque) => (
                <span key={destaque} className="rounded border border-white/20 px-2 py-1 text-xs text-muted-foreground">
                  {destaque}
                </span>
              ))}
            </div>

            <div className="mt-6 border-t border-white/10 pt-5">
              <p className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">Certificações</p>
              {certificacoes.map((certificacao) => (
                <div key={certificacao.codigo} className="flex items-start gap-3">
                  <Award className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{certificacao.nome}</p>
                    <p className="text-xs text-muted-foreground">
                      <span className="mono whitespace-nowrap text-foreground">{certificacao.codigo}</span> · {certificacao.emissor}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
};
