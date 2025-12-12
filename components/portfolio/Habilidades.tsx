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
  Languages,
  Briefcase,
  Users,
  FileText,
} from "lucide-react";

/**
 * Array de habilidades técnicas
 * Cada habilidade contém título, descrição e ícone
 */
const dadosHabilidades = [
  // Linguagens
  {
    titulo: "Java",
    descricao: "Desenvolvimento de aplicações desktop e backend com Java, utilizando orientação a objetos e boas práticas.",
    categoria: "Linguagens",
    icone: Code,
    nivel: 85,
  },
  {
    titulo: "JavaScript (Node)",
    descricao: "Desenvolvimento frontend e backend com JavaScript e Node.js, criando aplicações interativas e dinâmicas.",
    categoria: "Linguagens",
    icone: Code,
    nivel: 80,
  },
  // Frameworks e Tecnologias
  {
    titulo: "React.js",
    descricao: "Desenvolvimento de interfaces modernas e responsivas com React, hooks e gerenciamento de estado.",
    categoria: "Frameworks e Tecnologias",
    icone: Monitor,
    nivel: 80,
  },
  {
    titulo: "Swing (JFrame)",
    descricao: "Desenvolvimento de interfaces gráficas desktop com Java Swing para aplicações desktop.",
    categoria: "Frameworks e Tecnologias",
    icone: Monitor,
    nivel: 75,
  },
  {
    titulo: "JDBC",
    descricao: "Integração de aplicações Java com bancos de dados relacionais utilizando JDBC.",
    categoria: "Frameworks e Tecnologias",
    icone: Database,
    nivel: 80,
  },
  {
    titulo: "REST API",
    descricao: "Desenvolvimento e consumo de APIs RESTful para integração entre sistemas.",
    categoria: "Frameworks e Tecnologias",
    icone: Terminal,
    nivel: 75,
  },
  {
    titulo: "Git & GitHub",
    descricao: "Controle de versão, gerenciamento de código e colaboração em projetos com Git e GitHub.",
    categoria: "Frameworks e Tecnologias",
    icone: GitBranch,
    nivel: 85,
  },
  // TI e Infraestrutura
  {
    titulo: "Suporte Técnico",
    descricao: "Prestação de suporte técnico, resolução de problemas e atendimento ao usuário.",
    categoria: "TI e Infraestrutura",
    icone: Settings,
    nivel: 85,
  },
  {
    titulo: "Redes",
    descricao: "Conhecimento em configuração e manutenção de redes de computadores.",
    categoria: "TI e Infraestrutura",
    icone: Cloud,
    nivel: 70,
  },
  {
    titulo: "Sistemas Operacionais",
    descricao: "Conhecimento em administração e configuração de sistemas operacionais.",
    categoria: "TI e Infraestrutura",
    icone: Server,
    nivel: 75,
  },
  {
    titulo: "Governança de TI",
    descricao: "Conhecimento em práticas de governança, políticas e processos de TI.",
    categoria: "TI e Infraestrutura",
    icone: Settings,
    nivel: 70,
  },
  // Soft Skills
  {
    titulo: "Comunicação",
    descricao: "Habilidade em comunicação clara e eficaz, tanto escrita quanto verbal.",
    categoria: "Soft Skills",
    icone: Users,
    nivel: 90,
  },
  {
    titulo: "Trabalho em Equipe",
    descricao: "Colaboração eficiente em equipes multidisciplinares, contribuindo para objetivos comuns.",
    categoria: "Soft Skills",
    icone: Users,
    nivel: 90,
  },
  {
    titulo: "Proatividade",
    descricao: "Iniciativa para identificar e resolver problemas, antecipando necessidades.",
    categoria: "Soft Skills",
    icone: Zap,
    nivel: 85,
  },
  {
    titulo: "Atendimento ao Cliente",
    descricao: "Excelência no atendimento ao cliente, garantindo satisfação e resolução de demandas.",
    categoria: "Soft Skills",
    icone: Users,
    nivel: 90,
  },
  {
    titulo: "Organização",
    descricao: "Capacidade de organização e planejamento para otimizar processos e resultados.",
    categoria: "Soft Skills",
    icone: Briefcase,
    nivel: 90,
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
    'Linguagens': Languages,
    'Frameworks e Tecnologias': Monitor,
    'TI e Infraestrutura': Server,
    'Soft Skills': Users,
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
            Conjunto de habilidades técnicas, ferramentas e competências que utilizo para desenvolver soluções e prestar serviços de qualidade.
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

export default Habilidades;

