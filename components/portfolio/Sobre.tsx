import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

/**
 * Componente Sobre - Seção "Sobre Mim"
 * Exibe informações pessoais e profissionais do desenvolvedor
 * Inclui animações de entrada quando a seção entra na viewport
 */
const Sobre = () => {
  // Ref para o elemento da seção (usado para detectar quando entra na viewport)
  const ref = useRef(null);
  // Detecta se a seção está visível na viewport (apenas uma vez)
  const estaVisivel = useInView(ref, { once: true, margin: "-100px" });
  // Estado para controlar se a imagem foi carregada com sucesso
  const [imagemCarregada, setImagemCarregada] = useState(false);
  const [erroImagem, setErroImagem] = useState(false);

  return (
    <section id="sobre" className="px-6 md:px-10 lg:px-24 py-8 md:py-16 lg:py-32 relative" ref={ref}>
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={estaVisivel ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="mono mb-2 block">
            <span className="text-foreground">02.</span> Sobre Mim
          </span>
          
          <h2 className="heading-lg mb-8 md:mb-12">
            Quem sou eu:<br />
            <span className="text-muted-foreground"></span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={estaVisivel ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="space-y-6"
          >
            <p className="body-lg">
              Sou um desenvolvedor apaixonado por criar soluções elegantes para 
              problemas complexos. Com mais de 5 anos de experiência, trabalho 
              com as tecnologias mais modernas do mercado.
            </p>
            
            <p className="body-md">
              Minha jornada começou com curiosidade por entender como as coisas 
              funcionam, e evoluiu para uma carreira dedicada a construir 
              experiências digitais que fazem a diferença.
            </p>

            <p className="body-md">
              Quando não estou codando, você me encontra explorando novas 
              tecnologias, contribuindo para projetos open-source ou tomando 
              um bom café.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={estaVisivel ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex items-center justify-center"
          >
            <div className="relative w-full">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-card to-muted/50 border border-border overflow-hidden glow relative flex items-center justify-center">
                {/* Imagem de perfil */}
                {!erroImagem ? (
                  <img
                    src="/imagens/Perfil.jpeg"
                    alt="Foto de perfil de Armando Rocha"
                    className={`w-full h-full object-cover transition-opacity duration-500 ${
                      imagemCarregada ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{
                      objectPosition: 'center center',
                      minWidth: '100%',
                      minHeight: '100%'
                    }}
                    onLoad={() => {
                      setImagemCarregada(true);
                      setErroImagem(false);
                    }}
                    onError={(e) => {
                      console.error('Erro ao carregar imagem:', e);
                      setErroImagem(true);
                      setImagemCarregada(false);
                    }}
                    loading="eager"
                    decoding="async"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-card to-muted/50">
                    <div className="text-center p-8">
                      <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-muted border border-border flex items-center justify-center">
                        <span className="text-4xl font-bold text-muted-foreground">AR</span>
                      </div>
                      <p className="mono text-xs">Armando Rocha</p>
                      <p className="text-muted-foreground text-sm mt-1">Full-Stack Developer</p>
                    </div>
                  </div>
                )}
                
                {/* Overlay sutil para melhorar a legibilidade */}
                {imagemCarregada && !erroImagem && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                )}
              </div>
              
              {/* Elementos decorativos */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border border-border/50 rounded-xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 border border-border/30 rounded-2xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Sobre;
