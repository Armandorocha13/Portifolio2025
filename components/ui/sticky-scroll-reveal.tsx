import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Componente RolagemFixa - Scroll sticky com cards que mudam conforme o scroll
 * 
 * Cria uma experiência de scroll onde o conteúdo do lado direito fica fixo
 * enquanto o conteúdo do lado esquerdo rola. O card ativo muda baseado na
 * posição do scroll, criando um efeito de transição suave entre cards.
 * 
 * @param conteudo - Array de objetos com titulo, descricao e conteudo para cada card
 * @param classeNomeConteudo - Classes CSS adicionais para o container do conteúdo
 */
export const RolagemFixa = ({
  conteudo,
  classeNomeConteudo,
}: {
  conteudo: {
    titulo: string;
    descricao: string;
    conteudo?: React.ReactNode | any;
  }[];
  classeNomeConteudo?: string;
}) => {
  // Estado para controlar qual card está ativo no momento
  const [cardAtivo, setCardAtivo] = React.useState(0);
  // Ref para o container scrollável
  const ref = useRef<any>(null);
  // Progresso do scroll (0 a 1) usado para determinar qual card está visível
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });
  const quantidadeCards = conteudo.length;

  useMotionValueEvent(scrollYProgress, "change", (ultimo) => {
    const pontosQuebraCards = conteudo.map((_, indice) => indice / quantidadeCards);
    const indicePontoQuebraMaisProximo = pontosQuebraCards.reduce(
      (acc, pontoQuebra, indice) => {
        const distancia = Math.abs(ultimo - pontoQuebra);
        if (distancia < Math.abs(ultimo - pontosQuebraCards[acc])) {
          return indice;
        }
        return acc;
      },
      0
    );
    setCardAtivo(indicePontoQuebraMaisProximo);
  });

  const gradientesLineares = [
    "linear-gradient(to bottom right, rgb(6 182 212), rgb(16 185 129))", // cyan-500 to emerald-500
    "linear-gradient(to bottom right, rgb(236 72 153), rgb(99 102 241))", // pink-500 to indigo-500
    "linear-gradient(to bottom right, rgb(249 115 22), rgb(234 179 8))", // orange-500 to yellow-500
  ];

  const [gradienteFundo, setGradienteFundo] = useState(
    gradientesLineares[0]
  );

  useEffect(() => {
    setGradienteFundo(gradientesLineares[cardAtivo % gradientesLineares.length]);
  }, [cardAtivo]);

  return (
    <motion.div
      className="h-[30rem] overflow-y-auto custom-scrollbar flex justify-center relative space-x-10 rounded-md p-10 bg-black"
      ref={ref}
    >
      <div className="div relative flex items-start px-4">
        <div className="max-w-2xl">
          {conteudo.map((item, indice) => (
            <div key={item.titulo + indice} className="my-20">
              <motion.h2
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: cardAtivo === indice ? 1 : 0.3,
                }}
                className="text-2xl font-bold text-slate-100"
              >
                {item.titulo}
              </motion.h2>
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: cardAtivo === indice ? 1 : 0.3,
                }}
                className="text-lg text-slate-300 max-w-sm mt-10"
              >
                {item.descricao}
              </motion.p>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      <div
        style={{ background: gradienteFundo }}
        className={cn(
          "hidden lg:block h-60 w-80 rounded-md bg-white sticky top-10 overflow-hidden",
          classeNomeConteudo
        )}
      >
        {conteudo[cardAtivo].conteudo ?? null}
      </div>
    </motion.div>
  );
};

