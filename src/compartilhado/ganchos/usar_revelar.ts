import { useEffect } from "react";

/**
 * Liga as revelações de texto ([data-revelar]) da página:
 * marca cada uma com .rv-visivel quando entra na tela (ou na hora, se for "imediato").
 */
export function useRevelar() {
  useEffect(() => {
    const alvos = Array.from(document.querySelectorAll<HTMLElement>("[data-revelar]"));
    const mostrar = (el: Element) => el.classList.add("rv-visivel");

    alvos.filter((el) => el.dataset.revelar === "imediato").forEach((el) => requestAnimationFrame(() => mostrar(el)));

    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            mostrar(entrada.target);
            observador.unobserve(entrada.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    alvos.filter((el) => el.dataset.revelar !== "imediato").forEach((el) => observador.observe(el));
    return () => observador.disconnect();
  }, []);
}
