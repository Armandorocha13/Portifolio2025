import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  BarChart3,
  Bot,
  Code,
  Container,
  Database,
  GitBranch,
  Layers,
  Sheet,
  Terminal,
  Workflow,
} from "lucide-react";

/**
 * Habilidades técnicas agrupadas por categoria (alinhadas ao currículo)
 */
const dadosHabilidades = [
  { titulo: "Power BI", descricao: "Painéis para suporte à decisão em operações e infraestrutura.", categoria: "Dados & BI", icone: BarChart3 },
  { titulo: "DAX", descricao: "Medidas e métricas corporativas no Power BI.", categoria: "Dados & BI", icone: BarChart3 },
  { titulo: "Modelagem Star Schema", descricao: "Modelos dimensionais que unificam fontes fragmentadas.", categoria: "Dados & BI", icone: Layers },
  { titulo: "ETL", descricao: "Extração, tratamento e consolidação de dados de várias fontes.", categoria: "Dados & BI", icone: Workflow },
  { titulo: "Excel Avançado", descricao: "Análises, INDEX/MATCH e relatórios dinâmicos.", categoria: "Dados & BI", icone: Sheet },
  { titulo: "SQL", descricao: "Consultas e manipulação de dados em bancos relacionais.", categoria: "Bancos de Dados", icone: Database },
  { titulo: "MySQL", descricao: "Bancos relacionais para aplicações e análises.", categoria: "Bancos de Dados", icone: Database },
  { titulo: "SQLite", descricao: "Bancos leves e locais para automações.", categoria: "Bancos de Dados", icone: Database },
  { titulo: "Supabase (PostgreSQL)", descricao: "Persistência em nuvem para pipelines e aplicações.", categoria: "Bancos de Dados", icone: Database },
  { titulo: "Python", descricao: "Automação de rotinas de ETL e scripts de dados.", categoria: "Automação & IA", icone: Terminal },
  { titulo: "n8n", descricao: "Orquestração de fluxos e integrações automatizadas.", categoria: "Automação & IA", icone: Workflow },
  { titulo: "Model Context Protocol (MCP)", descricao: "Integração de ferramentas e dados com agentes de IA.", categoria: "Automação & IA", icone: Bot },
  { titulo: "LLMs locais (Ollama/DeepSeek)", descricao: "Modelos locais aplicados a ETL em terminais restritos.", categoria: "Automação & IA", icone: Bot },
  { titulo: "Java (Spring Boot)", descricao: "Back-end e aplicações com lógica de negócio.", categoria: "Desenvolvimento & Ferramentas", icone: Code },
  { titulo: "REST APIs", descricao: "Desenvolvimento e consumo de serviços web.", categoria: "Desenvolvimento & Ferramentas", icone: Code },
  { titulo: "React / Next.js", descricao: "Interfaces web e painéis customizados.", categoria: "Desenvolvimento & Ferramentas", icone: Code },
  { titulo: "TypeScript", descricao: "Tipagem e manutenção de aplicações front-end.", categoria: "Desenvolvimento & Ferramentas", icone: Code },
  { titulo: "Docker", descricao: "Ambientes padronizados e reproduzíveis.", categoria: "Desenvolvimento & Ferramentas", icone: Container },
  { titulo: "Git", descricao: "Controle de versão e colaboração em código.", categoria: "Desenvolvimento & Ferramentas", icone: GitBranch },
];

/**
 * Componente Habilidades - Seção de Habilidades
 * 
 * Exibe as habilidades técnicas do desenvolvedor organizadas por categoria
 * Inclui animações de entrada quando a seção entra na viewport
 * Layout responsivo com grid adaptável
 */
export const SkillsSection = () => {
  // Ref para o elemento da seção (usado para detectar quando entra na viewport)
  const ref = useRef(null);
  // Detecta se a seção está visível na viewport (apenas uma vez)
  const estaVisivel = useInView(ref, { once: true, margin: "-100px" });
  const [cartoesVirados, setCartoesVirados] = useState<Set<string>>(new Set());

  const categorias = Array.from(new Set(dadosHabilidades.map(habilidade => habilidade.categoria)));

  const iconesCategoria: Record<string, typeof Code> = {
    'Dados & BI': BarChart3,
    'Bancos de Dados': Database,
    'Automação & IA': Bot,
    'Desenvolvimento & Ferramentas': Code,
  };

  const lidarVirarCartao = (categoria: string) => {
    setCartoesVirados(prev => {
      const novoSet = new Set(prev);
      if (novoSet.has(categoria)) {
        novoSet.delete(categoria);
      } else {
        novoSet.add(categoria);
      }
      return novoSet;
    });
  };

  return (
    <section id="habilidades" className="section-padding bg-transparent relative overflow-hidden" ref={ref}>
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={estaVisivel ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12"
        >
          <span className="mono mb-4 block">
            <span className="text-foreground">04.</span> Habilidades
          </span>
          
          <h2 className="heading-lg mb-4">
            Stack de<br />
            <span className="text-muted-foreground">dados e automação</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            Ferramentas que uso no dia a dia para consolidar dados, modelar, automatizar e entregar painéis de decisão.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {categorias.map((categoria, indiceCategoria) => {
            const habilidadesCategoria = dadosHabilidades.filter(habilidade => habilidade.categoria === categoria);
            
            const IconeCategoria = iconesCategoria[categoria] || Code;
            const estaVirado = cartoesVirados.has(categoria);

            return (
              <motion.div
                key={categoria}
                initial={{ opacity: 0, y: 30 }}
                animate={estaVisivel ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: indiceCategoria * 0.15 }}
                className="w-full h-full min-h-[220px] max-h-[350px] perspective-1000"
                style={{ perspective: '1000px' }}
              >
                <motion.div
                  className="relative w-full h-full preserve-3d"
                  animate={{ rotateY: estaVirado ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  style={{ transformStyle: 'preserve-3d' }}
                  onMouseEnter={() => setCartoesVirados(prev => new Set(prev).add(categoria))}
                  onMouseLeave={() => setCartoesVirados(prev => {
                    const novoSet = new Set(prev);
                    novoSet.delete(categoria);
                    return novoSet;
                  })}
                  onClick={() => lidarVirarCartao(categoria)}
                >
                  {/* Front Side - Icon */}
                  <div
                    className="absolute inset-0 w-full h-full backface-hidden rounded-xl cursor-pointer overflow-hidden"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(0deg)' }}
                  >
                    {/* Silver border effect */}
                    <div 
                      className="absolute inset-0 rounded-xl pointer-events-none"
                      style={{
                        background: 'linear-gradient(90deg, #94a3b8, #e2e8f0, #94a3b8)',
                        backgroundSize: '200% 100%',
                        animation: 'neon-border 3s ease infinite',
                        padding: '1px',
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        maskComposite: 'exclude',
                      }}
                    >
                      <div className="w-full h-full rounded-xl bg-card/20"></div>
                    </div>
                    
                    <div className="flex items-center justify-center h-full p-2 relative z-10">
                      <IconeCategoria className="h-12 w-12 text-foreground/40" />
                    </div>
                  </div>

                  {/* Back Side - Skills */}
                  <div
                    className="absolute inset-0 w-full h-full backface-hidden rounded-xl cursor-pointer overflow-hidden"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                    {/* Silver border effect */}
                    <div 
                      className="absolute inset-0 rounded-xl pointer-events-none"
                      style={{
                        background: 'linear-gradient(90deg, #94a3b8, #e2e8f0, #94a3b8)',
                        backgroundSize: '200% 100%',
                        animation: 'neon-border 3s ease infinite',
                        padding: '1px',
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        maskComposite: 'exclude',
                      }}
                    >
                      <div className="w-full h-full rounded-xl bg-card/20"></div>
                    </div>
                    <div className="flex flex-col h-full p-3 relative z-10">
                      <h3 className="text-sm font-semibold mb-2 text-foreground border-b border-border/50 pb-1.5">
                        {categoria}
                      </h3>
                      
                      <div className="flex flex-col gap-1.5 flex-grow overflow-y-auto">
                        {habilidadesCategoria.map((habilidade, indiceHabilidade) => {
                          return (
                            <motion.div
                              key={habilidade.titulo}
                              initial={{ opacity: 0, x: -10 }}
                              animate={estaVisivel ? { opacity: 1, x: 0 } : {}}
                              transition={{ duration: 0.4, delay: indiceCategoria * 0.15 + indiceHabilidade * 0.05 }}
                              className="flex items-center py-1 px-1.5 rounded-md hover:bg-accent/30 transition-colors"
                            >
                              <span className="text-xs font-medium text-foreground/90 leading-tight">
                                  {habilidade.titulo}
                                </span>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

