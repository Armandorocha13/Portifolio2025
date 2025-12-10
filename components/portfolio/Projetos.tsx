import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, ArrowUpRight, ShoppingCart, CheckSquare, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RolagemFixa } from "@/components/ui/sticky-scroll-reveal";

/**
 * Array de projetos do portfólio
 * Projetos marcados como 'destaque: true' aparecem na seção principal
 * Outros projetos aparecem na grade secundária
 */
const projetos = [
  {
    titulo: "E-commerce Platform",
    descricao:
      "Plataforma completa de e-commerce com carrinho, pagamentos e dashboard administrativo. Arquitetura escalável e performance otimizada.",
    tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
    imagem: "/placeholder.svg",
    github: "#",
    demo: "#",
    destaque: true,
  },
  {
    titulo: "Task Management App",
    descricao:
      "Aplicativo de gerenciamento de tarefas com drag-and-drop, colaboração em tempo real e integrações com ferramentas populares.",
    tags: ["Next.js", "TypeScript", "Prisma", "WebSocket"],
    imagem: "/placeholder.svg",
    github: "#",
    demo: "#",
    destaque: true,
  },
  {
    titulo: "Social Media Dashboard",
    descricao:
      "Dashboard completo para gerenciamento de redes sociais com analytics em tempo real, agendamento de posts e métricas detalhadas de engajamento.",
    tags: ["React", "TypeScript", "Chart.js", "REST API"],
    imagem: "/placeholder.svg",
    github: "#",
    demo: "#",
    destaque: true,
  },
  {
    titulo: "Analytics Dashboard",
    descricao:
      "Dashboard de analytics com visualizações interativas, relatórios automatizados e exportação de dados.",
    tags: ["React", "D3.js", "Python", "FastAPI"],
    imagem: "/placeholder.svg",
    github: "#",
    demo: "#",
    destaque: false,
  },
  {
    titulo: "Real-time Chat",
    descricao:
      "Sistema de chat em tempo real com salas, mensagens privadas e compartilhamento de arquivos.",
    tags: ["React", "Socket.io", "Redis", "MongoDB"],
    imagem: "/placeholder.svg",
    github: "#",
    demo: "#",
    destaque: false,
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
                conteudo: (
                  <div className="h-full w-full flex flex-col items-center justify-center text-white overflow-hidden relative">
                    {/* Imagem de Fundo */}
                    <img
                      src={indice === 0 
                        ? 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&h=600&fit=crop&q=80'
                        : indice === 1 
                        ? 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80'
                        : 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80'
                      }
                      alt={projeto.titulo}
                      className="absolute inset-0 w-full h-full object-cover opacity-30"
                    />
                    {/* Overlay de Gradiente */}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/40" />
                    
                    {/* Conteúdo */}
                    <div className="relative z-10 flex flex-col items-center justify-center p-8 h-full w-full">
                      <div className="mb-4">
                        {indice === 0 && <ShoppingCart className="h-16 w-16 mx-auto mb-4" />}
                        {indice === 1 && <CheckSquare className="h-16 w-16 mx-auto mb-4" />}
                        {indice === 2 && <BarChart3 className="h-16 w-16 mx-auto mb-4" />}
                      </div>
                      <h3 className="text-2xl font-bold mb-4 text-center">{projeto.titulo}</h3>
                      <div className="flex flex-wrap gap-2 justify-center mb-4">
                        {projeto.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-xs font-mono bg-white/20 rounded-full text-white backdrop-blur-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-3 mt-4">
                        <Button size="sm" variant="outline" className="gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20">
                          <Github className="h-4 w-4" />
                          Code
                        </Button>
                        <Button size="sm" className="gap-2 bg-white text-gray-900 hover:bg-white/90">
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

        {/* Other Projects Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={estaVisivel ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <h3 className="text-center mono mb-8">Outros Projetos Notáveis</h3>

          <div className="grid md:grid-cols-2 gap-6">
            {projetos
              .filter((p) => !p.destaque)
              .map((projeto) => (
                <div
                  key={projeto.titulo}
                  className="group p-6 rounded-2xl border border-border bg-card/50 card-hover"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="font-semibold text-lg group-hover:text-foreground transition-colors">
                      {projeto.titulo}
                    </h4>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-muted"
                      >
                        <Github className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-muted"
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {projeto.descricao}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {projeto.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projetos;

