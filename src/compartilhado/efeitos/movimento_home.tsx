import { useEffect } from "react";

/**
 * Movimentos da página inicial guiados pela rolagem, no estilo dos templates do Lenis.
 * Cada efeito procura o seu atributo na página:
 *  - [data-hero]        conteúdo do topo sobe mais devagar e escurece ao rolar
 *  - [data-manifesto]   seção fixa enquanto as palavras acendem uma a uma
 *  - [data-faixa]       faixas de texto andam em sentidos opostos conforme a rolagem
 *  - [data-pilha]       cartões de serviço se empilham; o de baixo recua
 *  - [data-horizontal]  processo rola na horizontal (só em telas largas)
 * GSAP, ScrollTrigger e Lenis carregam sob demanda, só nesta página.
 * Com "reduzir movimento" ativo, apenas a rolagem suave é desligada.
 */
export function MovimentoHome() {
  useEffect(() => {
    let desfazer = () => {};
    let cancelado = false;
    const reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger"), import("lenis")]).then(
      ([{ gsap }, { ScrollTrigger }, { default: Lenis }]) => {
        if (cancelado) return;
        gsap.registerPlugin(ScrollTrigger);

        const lenis = reduzirMovimento ? null : new Lenis({ lerp: 0.09 });
        const tique = (tempo: number) => lenis?.raf(tempo * 1000);
        if (lenis) {
          lenis.on("scroll", ScrollTrigger.update);
          gsap.ticker.add(tique);
          gsap.ticker.lagSmoothing(0);
        }

        const mm = gsap.matchMedia();
        const ctx = gsap.context(() => {
          // Hero: o texto fica para trás enquanto a página sobe
          const hero = document.querySelector("[data-hero]");
          if (hero) {
            gsap.fromTo(
              "[data-hero] .hero-conteudo",
              { y: 0, opacity: 1 },
              { y: -120, opacity: 0.15, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } },
            );
          }

          // Manifesto: palavras acendem com a rolagem enquanto a seção fica presa
          const manifesto = document.querySelector("[data-manifesto]");
          if (manifesto) {
            gsap.fromTo(
              manifesto.querySelectorAll(".mf-palavra"),
              { opacity: 0.14 },
              {
                opacity: 1,
                stagger: 0.08,
                ease: "none",
                scrollTrigger: { trigger: manifesto, start: "top top", end: "+=120%", scrub: true, pin: true },
              },
            );
          }

          // Faixas: cada linha anda para um lado
          document.querySelectorAll<HTMLElement>("[data-faixa] .faixa-linha").forEach((linha) => {
            const paraEsquerda = linha.dataset.direcao !== "direita";
            gsap.fromTo(
              linha,
              { xPercent: paraEsquerda ? 0 : -30 },
              {
                xPercent: paraEsquerda ? -30 : 0,
                ease: "none",
                scrollTrigger: { trigger: linha.closest("[data-faixa]"), start: "top bottom", end: "bottom top", scrub: true },
              },
            );
          });

          // Pilha de serviços: quando o próximo cartão chega, o anterior recua e escurece
          const cartoes = gsap.utils.toArray<HTMLElement>("[data-pilha] .pilha-cartao");
          cartoes.forEach((cartao, i) => {
            const proximo = cartoes[i + 1];
            if (!proximo) return;
            gsap.fromTo(
              cartao.querySelector(".pilha-corpo"),
              { scale: 1, opacity: 1 },
              {
                scale: 0.92,
                opacity: 0,
                ease: "none",
                scrollTrigger: { trigger: proximo, start: "top bottom", end: "top 25%", scrub: true },
              },
            );
          });
        });

        // Processo na horizontal só em telas largas; no celular fica em coluna
        mm.add("(min-width: 900px)", () => {
          const secao = document.querySelector<HTMLElement>("[data-horizontal]");
          const trilho = secao?.querySelector<HTMLElement>(".hz-trilho");
          if (!secao || !trilho) return;
          const distancia = () => trilho.scrollWidth - window.innerWidth + 96;
          gsap.fromTo(
            trilho,
            { x: 0 },
            {
              x: () => -distancia(),
              ease: "none",
              scrollTrigger: { trigger: secao, start: "top top", end: () => `+=${distancia()}`, scrub: true, pin: true, invalidateOnRefresh: true },
            },
          );
        });

        // Fontes e imagens mudam a altura da página: recalcula os gatilhos
        document.fonts?.ready.then(() => ScrollTrigger.refresh());

        desfazer = () => {
          mm.revert();
          ctx.revert();
          if (lenis) {
            gsap.ticker.remove(tique);
            lenis.destroy();
          }
        };
      },
    );

    return () => {
      cancelado = true;
      desfazer();
    };
  }, []);

  return null;
}
