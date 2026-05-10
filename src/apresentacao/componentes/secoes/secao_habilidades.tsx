import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { 
  Code, 
  Database, 
  Cloud, 
  Terminal, 
  GitBranch,
  Zap,
  Monitor,
  Server,
  Settings,
  Languages,
  Briefcase,
  Users,
} from "lucide-react";

/**
 * Array de habilidades técnicas
 * Cada habilidade contém título, descrição e ícone
 */
const dadosHabilidades = [
  // Linguagens e Análise de Dados
  {
    titulo: "Java",
    descricao: "Linguagem principal utilizada para desenvolvimento de sistemas e lógica robusta.",
    categoria: "Habilidades de Dados",
    icone: Code,
    nivel: 90,
  },
  {
    titulo: "SQL",
    descricao: "Consultas complexas e manipulação de grandes volumes de dados em bancos relacionais.",
    categoria: "Habilidades de Dados",
    icone: Database,
    nivel: 85,
  },
  {
    titulo: "Inteligência Artificial",
    descricao: "Implementação e integração de soluções de IA no ecossistema corporativo.",
    categoria: "Habilidades de Dados",
    icone: Zap,
    nivel: 80,
  },
  {
    titulo: "Power BI",
    descricao: "Criação de dashboards de alto nível e visualização de dados para tomada de decisão.",
    categoria: "Habilidades de Dados",
    icone: Monitor,
    nivel: 90,
  },
  {
    titulo: "Excel Avançado",
    descricao: "Análise de dados complexa, automação de planilhas e relatórios dinâmicos.",
    categoria: "Habilidades de Dados",
    icone: Monitor,
    nivel: 95,
  },

  // TI e Infraestrutura
  {
    titulo: "Suporte Técnico",
    descricao: "Resolução de problemas de hardware e software e apoio ao usuário final.",
    categoria: "TI e Infraestrutura",
    icone: Settings,
    nivel: 90,
  },
  {
    titulo: "Redes",
    descricao: "Configuração e administração de redes de computadores.",
    categoria: "TI e Infraestrutura",
    icone: Cloud,
    nivel: 80,
  },
  {
    titulo: "Sistemas Operacionais",
    descricao: "Administração de ambientes Windows e Linux.",
    categoria: "TI e Infraestrutura",
    icone: Monitor,
    nivel: 85,
  },
  {
    titulo: "Governança de TI",
    descricao: "Aplicação de frameworks e melhores práticas de gestão de tecnologia.",
    categoria: "TI e Infraestrutura",
    icone: Briefcase,
    nivel: 80,
  },

  // Soft Skills
  {
    titulo: "Comunicação",
    descricao: "Capacidade de transmitir informações de forma clara e assertiva.",
    categoria: "Soft Skills",
    icone: Users,
    nivel: 95,
  },
  {
    titulo: "Trabalho em Equipe",
    descricao: "Colaboração efetiva para atingir objetivos comuns do projeto.",
    categoria: "Soft Skills",
    icone: Users,
    nivel: 90,
  },
  {
    titulo: "Proatividade",
    descricao: "Iniciativa para identificar melhorias e antecipar soluções.",
    categoria: "Soft Skills",
    icone: Zap,
    nivel: 90,
  },
  {
    titulo: "Atendimento ao Cliente",
    descricao: "Foco na satisfação do usuário e excelência no suporte.",
    categoria: "Soft Skills",
    icone: Users,
    nivel: 95,
  },

  // Frameworks e Tecnologias
  {
    titulo: "JDBC",
    descricao: "Conectividade de bancos de dados em aplicações Java.",
    categoria: "Frameworks e Tecnologias",
    icone: Database,
    nivel: 85,
  },
  {
    titulo: "MySQL",
    descricao: "Gerenciamento de bancos de dados relacionais.",
    categoria: "Frameworks e Tecnologias",
    icone: Database,
    nivel: 85,
  },
  {
    titulo: "REST API",
    descricao: "Desenvolvimento e consumo de serviços web.",
    categoria: "Frameworks e Tecnologias",
    icone: Terminal,
    nivel: 80,
  },
  {
    titulo: "Git & GitHub",
    descricao: "Controle de versão e colaboração em código.",
    categoria: "Frameworks e Tecnologias",
    icone: GitBranch,
    nivel: 85,
  },
  {
    titulo: "MCP",
    descricao: "Conhecimentos certificados pela Microsoft.",
    categoria: "Frameworks e Tecnologias",
    icone: Settings,
    nivel: 80,
  },
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
    'Habilidades de Dados': Languages,
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
    <section id="habilidades" className="section-padding bg-transparent relative overflow-hidden" ref={ref}>
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

