import { useEffect } from "react";

/**
 * Movimentos da página inicial guiados pela rolagem, no estilo dos templates do Lenis.
 * Cada efeito procura o seu atributo na página:
 *  - [data-hero]        conteúdo do topo sobe mais devagar e escurece ao rolar
 *  - [data-manifesto]   seção fixa enquanto as palavras acendem uma a uma
 *  - [data-faixa]       faixas de texto andam em sentidos opostos conforme a rolagem
 *  - [data-pilha]       cartões de serviço se empilham; o de baixo recua
 *  - [data-horizontal]  processo rola na horizontal (só em telas largas)
 *  - [data-quique]      o "O" de AERO entra rolando, bate no "R" e as letras quicam
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

        let removerFolga = () => {};
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

          // AERO: o "O" rola (ligado à rolagem) e o quique dispara no impacto (ligado ao tempo)
          const palco = document.querySelector<HTMLElement>("[data-quique]");
          if (palco) {
            const g = (letra: string) => palco.querySelector<HTMLElement>(`.qq-${letra} .qq-g`);
            const sombra = (letra: string) => palco.querySelector<HTMLElement>(`.qq-${letra} .qq-sombra`);
            const o = g("o");
            const caixaO = palco.querySelector<HTMLElement>(".qq-o"); // amassa a caixa; o giro fica na letra
            const em = () => parseFloat(getComputedStyle(palco).fontSize);
            // Distância até sair pela direita da tela e o giro que corresponde a ela (rolar sem deslizar)
            const distancia = () => {
              if (!o) return 0;
              // Posição natural da letra (sem o deslocamento que o GSAP já aplicou)
              const esquerda = o.getBoundingClientRect().left - Number(gsap.getProperty(o, "x"));
              return window.innerWidth - esquerda + 40;
            };
            const giro = () => {
              const raio = (o?.offsetWidth ?? 1) / 2;
              return Math.round(((distancia() / raio) * (180 / Math.PI)) / 360) * 360;
            };

            // A página termina junto com a animação: o espaço depois do AERO (seção + rodapé) tem que
            // ser meia tela menos meia palavra, assim no fim da rolagem a palavra fica no centro.
            // A folga completa o que faltar; os 2px garantem que a rolagem passe do fim e dispare o quique.
            const folga = document.querySelector<HTMLElement>(".quique-folga");
            const ajustarFolga = () => {
              if (!folga) return;
              const pai = palco.parentElement;
              const caixa = pai?.classList.contains("pin-spacer") ? pai : palco;
              const fimDaCaixa = caixa.getBoundingClientRect().bottom + window.scrollY;
              const depois = document.documentElement.scrollHeight - fimDaCaixa - folga.offsetHeight;
              const falta = window.innerHeight / 2 - palco.offsetHeight / 2 - depois + 2;
              folga.style.height = `${Math.max(0, Math.round(falta))}px`;
            };
            ajustarFolga();
            ScrollTrigger.addEventListener("refreshInit", ajustarFolga);
            removerFolga = () => ScrollTrigger.removeEventListener("refreshInit", ajustarFolga);

            // A assinatura fica presa no centro da tela; enquanto isso o "O" chega rolando de fora
            const rolagem = gsap.timeline({
              scrollTrigger: {
                trigger: palco,
                start: "center center",
                end: "+=90%",
                pin: true,
                scrub: true,
                invalidateOnRefresh: true,
                // Impacto no fim do trecho preso; voltar a rolagem desfaz o quique
                onLeave: () => quique.restart(),
                onEnterBack: () => quique.pause(0),
              },
            });
            rolagem
              .fromTo([o, sombra("o")], { x: () => distancia() }, { x: 0, ease: "none" }, 0)
              .fromTo(o, { rotation: () => giro() }, { rotation: 0, ease: "none" }, 0);

            const pulo = (letra: string, altura: number, inclinacao: number, atraso: number) => {
              const t = gsap.timeline();
              t.to(g(letra), { y: () => -altura * em(), rotation: inclinacao, duration: 0.16, ease: "power2.out" }, atraso)
                .to(g(letra), { y: 0, rotation: 0, duration: 0.55, ease: "bounce.out" }, atraso + 0.16)
                .to(sombra(letra), { scaleX: 0.55, opacity: 0.4, duration: 0.16, ease: "power2.out" }, atraso)
                .to(sombra(letra), { scaleX: 1, opacity: 1, duration: 0.55, ease: "bounce.out" }, atraso + 0.16);
              return t;
            };
            const quique = gsap
              .timeline({ paused: true })
              // O "O" amassa contra o "R" e volta um pouco para trás
              .to(caixaO, { scaleX: 0.84, scaleY: 1.08, transformOrigin: "0% 100%", duration: 0.07, ease: "power2.out" }, 0)
              .to(caixaO, { scaleX: 1, scaleY: 1, duration: 0.3, ease: "elastic.out(1, 0.45)" }, 0.07)
              .to(o, { x: () => 0.07 * em(), rotation: 18, duration: 0.18, ease: "power2.out" }, 0.07)
              .to(o, { x: 0, rotation: 0, duration: 0.4, ease: "bounce.out" }, 0.25)
              // Efeito dominó: R, E e A pulam em sequência, cada um menos
              .add(pulo("r", 0.2, -9, 0.02), 0)
              .add(pulo("e", 0.12, -5, 0.1), 0)
              .add(pulo("a", 0.07, -3, 0.18), 0);

          }
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

        // O pin do processo é criado depois dos gatilhos do AERO, mas fica antes dele na página:
        // ordena pela posição e recalcula, senão o AERO calcula o início sem o espaço do pin
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
        // Fontes e imagens mudam a altura da página: recalcula os gatilhos
        document.fonts?.ready.then(() => ScrollTrigger.refresh());

        desfazer = () => {
          removerFolga();
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
