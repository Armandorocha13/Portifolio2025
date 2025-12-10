import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { 
  Code, 
  Database, 
  Cloud, 
  Palette, 
  Terminal, 
  GitBranch,
  Zap,
  Monitor,
  Server,
  Settings,
} from "lucide-react";

/**
 * Array de habilidades técnicas
 * Cada habilidade contém título, descrição e ícone
 */
const dadosHabilidades = [
  {
    titulo: "React",
    descricao: "Desenvolvimento de interfaces modernas e responsivas com React, hooks, context API e gerenciamento de estado avançado.",
    categoria: "Frontend",
    icone: Code,
    nivel: 95,
  },
  {
    titulo: "TypeScript",
    descricao: "TypeScript para desenvolvimento type-safe, melhorando a qualidade e manutenibilidade do código.",
    categoria: "Frontend",
    icone: Code,
    nivel: 90,
  },
  {
    titulo: "Node.js",
    descricao: "Desenvolvimento de APIs RESTful e GraphQL, microserviços e aplicações server-side escaláveis.",
    categoria: "Backend",
    icone: Terminal,
    nivel: 88,
  },
  {
    titulo: "PostgreSQL",
    descricao: "Design de bancos de dados relacionais, otimização de queries e gerenciamento de dados complexos.",
    categoria: "Backend",
    icone: Database,
    nivel: 85,
  },
  {
    titulo: "Tailwind CSS",
    descricao: "Criação de designs modernos e responsivos com utility-first CSS, design systems e componentes reutilizáveis.",
    categoria: "Frontend",
    icone: Palette,
    nivel: 92,
  },
  {
    titulo: "Docker",
    descricao: "Containerização de aplicações, orquestração e deployment em ambientes de produção.",
    categoria: "DevOps",
    icone: Cloud,
    nivel: 75,
  },
  {
    titulo: "Git",
    descricao: "Controle de versão, branching strategies, CI/CD e workflows colaborativos.",
    categoria: "DevOps",
    icone: GitBranch,
    nivel: 90,
  },
  {
    titulo: "Framer Motion",
    descricao: "Animações fluidas e interativas para criar experiências de usuário envolventes e modernas.",
    categoria: "Frontend",
    icone: Zap,
    nivel: 85,
  },
];

/**
 * Componente Habilidades - Seção de Habilidades
 * 
 * Exibe as habilidades técnicas do desenvolvedor organizadas por categoria
 * Inclui animações de entrada quando a seção entra na viewport
 * Layout responsivo com grid adaptável
 */
const Habilidades = () => {
  // Ref para o elemento da seção (usado para detectar quando entra na viewport)
  const ref = useRef(null);
  // Detecta se a seção está visível na viewport (apenas uma vez)
  const estaVisivel = useInView(ref, { once: true, margin: "-100px" });
  const [cartoesVirados, setCartoesVirados] = useState<Set<string>>(new Set());

  const categorias = Array.from(new Set(dadosHabilidades.map(habilidade => habilidade.categoria)));

  const iconesCategoria: Record<string, typeof Code> = {
    'Frontend': Monitor,
    'Backend': Server,
    'DevOps': Settings,
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
    <section id="habilidades" className="section-padding bg-background relative overflow-hidden" ref={ref}>
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={estaVisivel ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12"
        >
          <span className="mono mb-4 block">
            <span className="text-foreground">03.</span> Habilidades
          </span>
          
          <h2 className="heading-lg mb-4">
            Tecnologias que<br />
            <span className="text-muted-foreground">domino</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            Um conjunto de ferramentas e tecnologias que utilizo para criar soluções modernas e eficientes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
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
                className="w-full h-full min-h-[350px] perspective-1000"
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
                    className="absolute inset-0 w-full h-full backface-hidden rounded-2xl cursor-pointer overflow-hidden"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(0deg)' }}
                  >
                    {/* Silver border effect */}
                    <div 
                      className="absolute inset-0 rounded-2xl pointer-events-none"
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
                      <div className="w-full h-full rounded-2xl bg-card/20"></div>
                    </div>
                    
                    <div className="flex items-center justify-center h-full p-4 relative z-10">
                      <IconeCategoria className="h-24 w-24 text-foreground/40" />
                    </div>
                  </div>

                  {/* Back Side - Skills */}
                  <div
                    className="absolute inset-0 w-full h-full backface-hidden rounded-2xl cursor-pointer overflow-hidden"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                    {/* Silver border effect */}
                    <div 
                      className="absolute inset-0 rounded-2xl pointer-events-none"
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
                      <div className="w-full h-full rounded-2xl bg-card/20"></div>
                    </div>
                    <div className="flex flex-col h-full p-4 relative z-10">
                      <h3 className="text-lg font-medium mb-8 text-foreground">{categoria}</h3>
                      
                      <div className="flex flex-col gap-5 flex-grow">
                        {habilidadesCategoria.map((habilidade, indiceHabilidade) => {
                          return (
                            <div
                              key={habilidade.titulo}
                              className="space-y-1.5"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-foreground/80">
                                  {habilidade.titulo}
                                </span>
                                <span className="text-xs text-muted-foreground font-mono">
                                  {habilidade.nivel}%
                                </span>
                              </div>
                              <div className="h-0.5 bg-muted/30 rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full bg-foreground/30 rounded-full"
                                  initial={{ width: 0 }}
                                  animate={estaVisivel ? { width: `${habilidade.nivel}%` } : { width: 0 }}
                                  transition={{ duration: 1, delay: indiceCategoria * 0.15 + indiceHabilidade * 0.1 + 0.3 }}
                                />
                              </div>
                            </div>
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

export default Habilidades;

