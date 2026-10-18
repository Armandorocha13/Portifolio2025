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
  { titulo: "Pipelines de ETL", categoria: "Engenharia de Dados", icone: Workflow },
  { titulo: "Integração de múltiplas fontes", categoria: "Engenharia de Dados", icone: Workflow },
  { titulo: "Python", categoria: "Engenharia de Dados", icone: Terminal },
  { titulo: "n8n", categoria: "Engenharia de Dados", icone: Workflow },
  { titulo: "REST APIs", categoria: "Engenharia de Dados", icone: Code },
  { titulo: "Docker", categoria: "Engenharia de Dados", icone: Container },
  { titulo: "Git", categoria: "Engenharia de Dados", icone: GitBranch },
  { titulo: "SQL", categoria: "Modelagem & Bancos", icone: Database },
  { titulo: "Modelagem dimensional (Star Schema)", categoria: "Modelagem & Bancos", icone: Layers },
  { titulo: "PostgreSQL (Supabase)", categoria: "Modelagem & Bancos", icone: Database },
  { titulo: "MySQL", categoria: "Modelagem & Bancos", icone: Database },
  { titulo: "SQLite", categoria: "Modelagem & Bancos", icone: Database },
  { titulo: "Power BI", categoria: "Análise & BI", icone: BarChart3 },
  { titulo: "DAX", categoria: "Análise & BI", icone: BarChart3 },
  { titulo: "Excel avançado", categoria: "Análise & BI", icone: Sheet },
  { titulo: "Métricas e indicadores", categoria: "Análise & BI", icone: BarChart3 },
  { titulo: "LLMs locais (Ollama/DeepSeek) em ETL", categoria: "IA aplicada a Dados", icone: Bot },
  { titulo: "Model Context Protocol (MCP)", categoria: "IA aplicada a Dados", icone: Bot },
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
    'Engenharia de Dados': Workflow,
    'Modelagem & Bancos': Database,
    'Análise & BI': BarChart3,
    'IA aplicada a Dados': Bot,
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
            <span className="text-muted-foreground">dados</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            Ferramentas que uso para ingerir, transformar, modelar e entregar dados prontos para decisão.
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
                className="w-full h-full min-h-[270px] max-h-[350px] perspective-1000"
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

