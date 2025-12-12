import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RolagemFixa } from "@/components/ui/sticky-scroll-reveal";

/**
 * Array de projetos do portfólio
 * Projetos marcados como 'destaque: true' aparecem na seção principal
 * Outros projetos aparecem na grade secundária
 */
const projetos = [
  {
    titulo: "Finance.io",
    descricao:
      "Aplicação web moderna para gerenciamento financeiro pessoal. Funcionalidades: gestão de transações (entradas e saídas), dashboard com gráficos interativos, categorias personalizadas, relatórios com IA e controle de artilharia (gols).",
    tags: ["React", "TypeScript", "Supabase", "Dashboard"],
    imagem: "/placeholder.svg",
    github: "#",
    demo: "#",
    destaque: true,
  },
  {
    titulo: "Sistema de Ordem de Serviço (OS) " ,
    descricao:
      "Sistema completo de gerenciamento de Ordens de Serviço para loja de informática. Inclui CRUD de clientes, produtos e ordens de serviço, login com validação, relatórios e controle de acesso por perfil de usuário.",
    tags: ["Java", "Maven", "MySQL", "JDBC", "Swing", "JFrame"],
    imagem: "/placeholder.svg",
    github: "#",
    demo: "#",
    destaque: true,
    emManutencao: true,
  },
];

/**
 * Componente Projetos - Seção de Projetos
 * 
 * Exibe projetos em destaque com scroll sticky interativo
 * Mostra outros projetos em uma grade abaixo
 * Inclui animações de entrada quando a seção entra na viewport
 */
const Projetos = () => {
  // Ref para o elemento da seção (usado para detectar quando entra na viewport)
  const ref = useRef(null);
  // Detecta se a seção está visível na viewport (apenas uma vez)
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

        {/* Featured Projects with StickyScroll */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={estaVisivel ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mb-20"
        >
          <RolagemFixa
            conteudo={projetos
              .filter((p) => p.destaque)
              .map((projeto, indice) => ({
                titulo: projeto.titulo,
                descricao: projeto.descricao,
                tags: projeto.tags,
                emManutencao: projeto.emManutencao || false,
                conteudo: (
                  <div className="h-full w-full flex flex-col bg-background overflow-hidden relative">
                    {/* Badge de Manutenção no card */}
                    {projeto.emManutencao && (
                      <div className="absolute top-4 right-4 z-10 px-3 py-1.5 text-xs font-semibold bg-amber-500/20 text-amber-400 rounded-full border border-amber-500/30 flex items-center gap-1.5 backdrop-blur-sm">
                        <Wrench className="h-3 w-3" />
                        <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse"></span>
                        Em Manutenção
                      </div>
                    )}
                    
                    {/* Imagem Limpa */}
                    <div className="relative w-full h-64 overflow-hidden">
                      <img
                        src={indice === 0 
                          ? 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop&q=80'
                          : 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80'
                        }
                        alt={projeto.titulo}
                        className="w-full h-full object-cover"
                      />
                      {projeto.emManutencao && (
                        <div className="absolute inset-0 bg-black/40"></div>
                      )}
                    </div>
                    
                    {/* Conteúdo abaixo da imagem */}
                    <div className="flex flex-col flex-1 p-6 justify-end">
                      {/* Botões */}
                      <div className="flex gap-3">
                        <Button size="sm" variant="outline" className="gap-2" disabled={projeto.emManutencao}>
                          <Github className="h-4 w-4" />
                          Code
                        </Button>
                        <Button size="sm" className="gap-2" disabled={projeto.emManutencao}>
                          <ExternalLink className="h-4 w-4" />
                          Demo
                        </Button>
                      </div>
                    </div>
                  </div>
                ),
              }))}
            classeNomeConteudo="border border-white/20"
          />
        </motion.div>

      </div>
    </section>
  );
};

export default Projetos;

