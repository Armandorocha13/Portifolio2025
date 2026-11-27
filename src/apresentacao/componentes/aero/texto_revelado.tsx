import { createElement, Fragment, type ElementType } from "react";

import { cn } from "@/compartilhado/biblioteca/utilitarios";

type TextoReveladoProps = {
  texto: string;
  como?: ElementType;
  className?: string;
  /** Atraso inicial em ms antes da primeira palavra */
  atraso?: number;
  /** Revela assim que a página carrega (hero), sem esperar entrar na tela */
  imediato?: boolean;
};

/**
 * Título que sobe palavra por palavra ao entrar na tela.
 * As palavras já saem no HTML do build (bom para SEO); só o movimento depende de JS.
 * Estilos em global.css (.rv, .rv-palavra, .rv-in); quem liga é o gancho useRevelar.
 */
export function TextoRevelado({ texto, como = "span", className, atraso = 0, imediato = false }: TextoReveladoProps) {
  const palavras = texto.split(" ");
  return createElement(
    como,
    { className: cn("rv", className), "data-revelar": imediato ? "imediato" : "", "aria-label": texto },
    palavras.map((palavra, i) => (
      // O espaço fica fora da palavra: dentro de um inline-block ele seria descartado
      <Fragment key={i}>
        <span className="rv-palavra" aria-hidden="true">
          <span className="rv-in" style={{ transitionDelay: `${atraso + i * 45}ms` }}>
            {palavra}
          </span>
        </span>
        {i < palavras.length - 1 ? " " : null}
      </Fragment>
    )),
  );
}
