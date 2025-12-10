import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Mail, MapPin, ArrowUpRight, Linkedin, Github, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

/**
 * Componente Contato - Seção de Contato
 * Inclui formulário de contato e links para redes sociais
 * Exibe informações de contato e botões para LinkedIn, GitHub e WhatsApp
 */
const Contato = () => {
  // Ref para o elemento da seção (usado para detectar quando entra na viewport)
  const ref = useRef(null);
  // Detecta se a seção está visível na viewport (apenas uma vez)
  const estaVisivel = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  // Estado para controlar o carregamento do formulário
  const [estaEnviando, setEstaEnviando] = useState(false);

  /**
   * Handler para submissão do formulário de contato
   * @param e - Evento do formulário
   */
  const lidarComEnvio = async (e: React.FormEvent) => {
    e.preventDefault();
    setEstaEnviando(true);
    
    // Simula o envio do formulário (substituir por integração real com API)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: "Mensagem enviada!",
      description: "Obrigado pelo contato. Retornarei em breve.",
    });
    
    setEstaEnviando(false);
  };

  return (
    <section id="contato" className="section-padding bg-gradient-to-b from-background via-card/20 to-background" ref={ref}>
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={estaVisivel ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="mono mb-4 block">
            <span className="text-foreground">05.</span> Contato
          </span>

          <h2 className="heading-lg mb-6">
            Vamos trabalhar<br />
            <span className="text-muted-foreground">juntos?</span>
          </h2>

          <p className="body-lg max-w-xl mx-auto">
            Estou sempre aberto a novas oportunidades e projetos interessantes.
            Se você tem uma ideia, vamos conversar!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={estaVisivel ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <form onSubmit={lidarComEnvio} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="mono text-xs mb-2 block">Nome</label>
                  <Input
                    placeholder="Seu nome"
                    className="bg-card border-border focus:border-foreground/50"
                    required
                  />
                </div>
                <div>
                  <label className="mono text-xs mb-2 block">Email</label>
                  <Input
                    type="email"
                    placeholder="seu@email.com"
                    className="bg-card border-border focus:border-foreground/50"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mono text-xs mb-2 block">Assunto</label>
                <Input
                  placeholder="Sobre o que você gostaria de falar?"
                  className="bg-card border-border focus:border-foreground/50"
                  required
                />
              </div>

              <div>
                <label className="mono text-xs mb-2 block">Mensagem</label>
                <Textarea
                  placeholder="Conte-me mais sobre seu projeto..."
                  className="bg-card border-border focus:border-foreground/50 min-h-[150px] resize-none"
                  required
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full sm:w-auto group"
                disabled={estaEnviando}
              >
                {estaEnviando ? (
                  "Enviando..."
                ) : (
                  <>
                    Enviar Mensagem
                    <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={estaVisivel ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="space-y-8"
          >
            <div>
              <h3 className="heading-md mb-6">Informações de Contato</h3>
              
              <div className="space-y-4 mb-8">
                <a
                  href="mailto:seu@email.com"
                  className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card/50 group card-hover"
                >
                  <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="mono text-xs mb-1">Email</p>
                    <p className="text-foreground">seu@email.com</p>
                  </div>
                  <ArrowUpRight className="ml-auto h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </a>

                <div className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card/50">
                  <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="mono text-xs mb-1">Localização</p>
                    <p className="text-foreground">São Paulo, Brasil</p>
                  </div>
                </div>
              </div>

              {/* Social Media Buttons */}
              <div>
                <h4 className="mono text-xs mb-4 text-muted-foreground uppercase tracking-wider">Redes Sociais</h4>
                <div className="grid grid-cols-3 gap-3">
                  <motion.a
                    href="https://www.linkedin.com/in/seu-perfil"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outline"
                      className="w-full h-24 flex flex-col items-center justify-center gap-2 border-border bg-card/50 hover:bg-card hover:border-[#0077b5]/50 transition-all"
                    >
                      <div className="p-2 rounded-lg bg-[#0077b5]/10 group-hover:bg-[#0077b5]/20 transition-colors">
                        <Linkedin className="h-5 w-5 text-[#0077b5] group-hover:scale-110 transition-transform" />
                      </div>
                      <span className="mono text-xs font-medium">LinkedIn</span>
                    </Button>
                  </motion.a>

                  <motion.a
                    href="https://github.com/seu-usuario"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outline"
                      className="w-full h-24 flex flex-col items-center justify-center gap-2 border-border bg-card/50 hover:bg-card hover:border-foreground/50 transition-all"
                    >
                      <div className="p-2 rounded-lg bg-foreground/10 group-hover:bg-foreground/20 transition-colors">
                        <Github className="h-5 w-5 text-foreground group-hover:scale-110 transition-transform" />
                      </div>
                      <span className="mono text-xs font-medium">GitHub</span>
                    </Button>
                  </motion.a>

                  <motion.a
                    href="https://wa.me/5511999999999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outline"
                      className="w-full h-24 flex flex-col items-center justify-center gap-2 border-border bg-card/50 hover:bg-card hover:border-[#25D366]/50 transition-all"
                    >
                      <div className="p-2 rounded-lg bg-[#25D366]/10 group-hover:bg-[#25D366]/20 transition-colors">
                        <MessageCircle className="h-5 w-5 text-[#25D366] group-hover:scale-110 transition-transform" />
                      </div>
                      <span className="mono text-xs font-medium">WhatsApp</span>
                    </Button>
                  </motion.a>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-border bg-gradient-to-br from-card to-muted/30">
              <p className="text-sm text-muted-foreground mb-4">
                "A melhor maneira de prever o futuro é criá-lo."
              </p>
              <p className="mono text-xs">— Peter Drucker</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contato;
