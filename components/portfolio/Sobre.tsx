import { motion } from "framer-motion"; // Importa componente animado do Framer Motion
import { useInView } from "framer-motion"; // Hook para checar quando elemento está visível
import { useRef, useState } from "react"; // Importa hooks do React

/**
 * Componente Sobre - Seção "Sobre Mim"
 * Exibe informações pessoais e profissionais do desenvolvedor.
 * Inclui animações de entrada quando a seção entra na viewport.
 */
const Sobre = () => {
  // Cria uma referência para o elemento da seção, usada para detecção de visibilidade
  const ref = useRef(null);

  // Hook que detecta se a seção está visível na tela (apenas uma vez), e serve para disparar as animações
  const estaVisivel = useInView(ref, { once: true, margin: "-100px" });

  // Estado que indica se a imagem do perfil já foi carregada
  const [imagemCarregada, setImagemCarregada] = useState(false);
  // Estado que indica se houve erro ao carregar a imagem do perfil
  const [erroImagem, setErroImagem] = useState(false);

  return (
    <section
      id="sobre"
      className="px-6 md:px-10 lg:px-24 py-8 md:py-16 lg:py-32 relative"
      ref={ref} // Referência usada pelo useInView para checar visibilidade
    >
      <div className="container-narrow">
        {/* Título animado da seção */}
        <motion.div
          initial={{ opacity: 0, y: 50 }} // Estado inicial antes da animação (invisível e deslocado)
          animate={estaVisivel ? { opacity: 1, y: 0 } : {}} // Anima quando entra em view
          transition={{ duration: 0.8, ease: "easeOut" }} // Duração e curva da animação
        >
          <span className="mono mb-2 block">
            {/* Número da seção e nome */}
            <span className="text-foreground">02.</span> Sobre Mim
          </span>

          <h2 className="heading-lg mb-8 md:mb-12">
            Quem sou eu:
            <br />
            <span className="text-muted-foreground"></span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Bloco de texto animado com informações */}
          <motion.div
            initial={{ opacity: 0, y: 50 }} // Inicialmente invisível e deslocado
            animate={estaVisivel ? { opacity: 1, y: 0 } : {}} // Anima quando em view
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }} // Pequeno atraso para animar depois do título
            className="space-y-6"
          >
            {/* Texto de apresentação */}
            <p className="body-md">
              Meu nome é <strong>Armando rocha</strong>, sou apaixonado por tecnologias. Criar, solucionar 
              e resolver situações e problemas complexos
            </p>

            <p className="body-md">
              Minha jornada começou com curiosidade por entender como as coisas
              funcionam, e evoluiu para uma carreira dedicada a construir
              experiências digitais que fazem a diferença.
            </p>

            <p className="body-md">
              Quando não estou codando, você me encontra explorando novas
              tecnologias, contribuindo para projetos open-source ou tomando um
              bom café.
            </p>
            {/* Botão para baixar currículo */}
            <a
              href="/curriculo-armando-rocha.pdf"
              download
              className="inline-flex items-center px-5 py-2 rounded-md bg-slate-600 text-white font-thin transition-colors hover:bg-transparent/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Baixar Currículo
            </a>
          </motion.div>

          {/* Bloco da imagem de perfil animado */}
          <motion.div
            initial={{ opacity: 0, y: 50 }} // Inicialmente invisível e deslocado
            animate={estaVisivel ? { opacity: 1, y: 0 } : {}} // Anima quando em view
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }} // Mais atraso para esta coluna animar por último
            className="flex items-center justify-center"
          >
            <div className="relative w-full">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-card to-muted/50 border border-border overflow-hidden glow relative flex items-center justify-center">
                {/* Exibe a imagem de perfil OU, em caso de erro, exibe avatar alternativo */}
                {!erroImagem ? (
                  <div className="relative w-full h-full">
                    {/* Borda neon ao redor da imagem */}
                    <div
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      style={{
                        boxShadow:
                          "0 0 24px 8px #00e0ff, 0 0 64px 16px #00e0ff80, 0 0 4px 1px #5eead480",
                        zIndex: 2,
                      }}
                    ></div>
                    {/* Imagem real do perfil */}
                    <img
                      src="public\\image\\perfil.jpeg"
                      alt="Foto de perfil de Armando Rocha"
                      className={`relative w-full h-full object-cover transition-opacity duration-500 ${
                        imagemCarregada ? "opacity-100" : "opacity-0"
                      }`}
                      style={{
                        objectPosition: "center 80%", // Foca a "altura dos olhos"
                        minWidth: "100%",
                        minHeight: "100%",
                        borderRadius: "1rem", // Equivalente ao Tailwind rounded-2xl
                        zIndex: 3,
                      }}
                      // Ao carregar, atualiza o estado para mostrar imagem
                      onLoad={() => {
                        setImagemCarregada(true);
                        setErroImagem(false);
                      }}
                      // Se ocorrer erro, cai para avatar alternativo
                      onError={(e) => {
                        console.error("Erro ao carregar imagem:", e);
                        setErroImagem(true);
                        setImagemCarregada(false);
                      }}
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                ) : (
                  // Se erro, exibe avatar com iniciais + informações básicas
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-card to-muted/50">
                    <div className="text-center p-8">
                      {/* Avatar circular com iniciais */}
                      <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-muted border border-border flex items-center justify-center">
                        <span className="text-4xl font-bold text-muted-foreground">
                          AR
                        </span>
                      </div>
                      <p className="mono text-xs">Armando Rocha</p>
                      <p className="text-muted-foreground text-sm mt-1">
                        Full-Stack Developer
                      </p>
                    </div>
                  </div>
                )}

                {/* Overlay para melhorar legibilidade sobre a imagem, aparece apenas com a imagem carregada e sem erro */}
                {imagemCarregada && !erroImagem && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                )}
              </div>

              {/* Elementos decorativos fora da moldura da imagem para criar "depth" */}
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
