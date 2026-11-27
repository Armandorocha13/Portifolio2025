import { useEffect, useRef } from "react";

/**
 * Fundo animado guiado pela rolagem (página inicial).
 *
 * A mesma arte do protótipo HyperFrames (/prototipo), rodando só com GSAP + ScrollTrigger:
 * cada cena acompanha a sua seção e anda para frente ou para trás conforme a rolagem.
 *  - #inicio    engrenagem em wireframe gira, sobe e some
 *  - #servicos  pontos espalhados se organizam numa grade
 *  - #processo  linha de fluxo se desenha e acende 4 etapas
 *  - #chamada   assinatura AERO se forma
 * O Lenis suaviza a rolagem. Com "reduzir movimento" ativo, o fundo fica parado.
 */

const DENTES = "M165.0 0.0 L164.7 10.4 L198.7 23.0 L193.2 51.8 L156.9 51.0 L142.9 82.5 L137.4 91.3 L160.6 119.2 L141.4 141.4 L110.4 122.6 L82.5 142.9 L73.4 147.8 L79.4 183.6 L51.8 193.2 L34.3 161.4 L0.0 165.0 L-10.4 164.7 L-23.0 198.7 L-51.8 193.2 L-51.0 156.9 L-82.5 142.9 L-91.3 137.4 L-119.2 160.6 L-141.4 141.4 L-122.6 110.4 L-142.9 82.5 L-147.8 73.4 L-183.6 79.4 L-193.2 51.8 L-161.4 34.3 L-165.0 0.0 L-164.7 -10.4 L-198.7 -23.0 L-193.2 -51.8 L-156.9 -51.0 L-142.9 -82.5 L-137.4 -91.3 L-160.6 -119.2 L-141.4 -141.4 L-110.4 -122.6 L-82.5 -142.9 L-73.4 -147.8 L-79.4 -183.6 L-51.8 -193.2 L-34.3 -161.4 L-0.0 -165.0 L10.4 -164.7 L23.0 -198.7 L51.8 -193.2 L51.0 -156.9 L82.5 -142.9 L91.3 -137.4 L119.2 -160.6 L141.4 -141.4 L122.6 -110.4 L142.9 -82.5 L147.8 -73.4 L183.6 -79.4 L193.2 -51.8 L161.4 -34.3 Z";

// Pontos com posição pseudoaleatória fixa: o HTML do build e o do navegador são iguais
const COLUNAS = 9;
const LINHAS = 8;
const PONTOS = (() => {
  let semente = 7;
  const aleatorio = () => ((semente = (semente * 16807) % 2147483647) - 1) / 2147483646;
  return Array.from({ length: COLUNAS * LINHAS }, (_, i) => ({
    x0: Math.round(1000 + aleatorio() * 700),
    y0: Math.round(120 + aleatorio() * 840),
    x1: 1110 + (i % COLUNAS) * 60,
    y1: 330 + Math.floor(i / COLUNAS) * 60,
  }));
})();

const NOS = [
  { id: "fr-no-1", cx: 1150, cy: 860 },
  { id: "fr-no-2", cx: 1550, cy: 620 },
  { id: "fr-no-3", cx: 1150, cy: 400 },
  { id: "fr-no-4", cx: 1550, cy: 220 },
];

export function FundoRolagem() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // No celular (tela em pé), enquadra só a faixa da arte
    const enquadrar = () => {
      const emPe = window.innerWidth / window.innerHeight < 0.9;
      svg.setAttribute("viewBox", emPe ? "1020 100 660 900" : "0 0 1920 1080");
    };
    enquadrar();
    window.addEventListener("resize", enquadrar);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => window.removeEventListener("resize", enquadrar);
    }

    let desfazer = () => {};
    let cancelado = false;

    // GSAP e Lenis carregam só aqui, no navegador, fora do bundle principal
    Promise.all([import("gsap"), import("gsap/ScrollTrigger"), import("lenis")]).then(
      ([{ gsap }, { ScrollTrigger }, { default: Lenis }]) => {
        if (cancelado) return;
        gsap.registerPlugin(ScrollTrigger);

        const lenis = new Lenis({ lerp: 0.1 });
        lenis.on("scroll", ScrollTrigger.update);
        const tique = (tempo: number) => lenis.raf(tempo * 1000);
        gsap.ticker.add(tique);
        gsap.ticker.lagSmoothing(0);

        const ctx = gsap.context(() => {
          // Os gatilhos são as seções da página (fora do SVG), por isso a busca é no documento
          const cena = (gatilho: string, inicio: string, fim: string) =>
            gsap.timeline({
              scrollTrigger: { trigger: document.querySelector(gatilho), start: inicio, end: fim, scrub: true },
            });

          // Cena 1: a engrenagem já aparece pronta; a rolagem gira, sobe e apaga
          cena("#inicio", "top top", "bottom top")
            .fromTo("#fr-giro", { rotation: 0, svgOrigin: "0 0" }, { rotation: 200, ease: "none" }, 0)
            .fromTo("#fr-orbita", { rotation: 0, svgOrigin: "0 0" }, { rotation: -90, ease: "none" }, 0)
            .fromTo("#fr-engrenagem", { y: 0, scale: 1, opacity: 1, svgOrigin: "0 0" }, { y: -260, scale: 0.55, opacity: 0, ease: "power1.in" }, 0);

          // Cena 2: bagunça vira ordem
          const pontos = gsap.utils.toArray<SVGCircleElement>("#fr-pontos circle");
          const grade = cena("#servicos", "top bottom", "center center");
          pontos.forEach((ponto, i) => {
            const p = PONTOS[i];
            grade.fromTo(ponto, { attr: { cx: p.x0, cy: p.y0 } }, { attr: { cx: p.x1, cy: p.y1 }, ease: "power2.inOut" }, (i % COLUNAS) * 0.02);
          });
          grade.fromTo("#fr-pontos", { opacity: 0 }, { opacity: 0.85, duration: 0.3 }, 0);
          cena("#servicos", "bottom 60%", "bottom top").fromTo("#fr-pontos-saida", { opacity: 1, y: 0 }, { opacity: 0, y: -80, ease: "power1.in" });

          // Cena 3: a linha de fluxo sobe e acende as etapas
          const fluxo = cena("#processo", "top 85%", "center 40%");
          fluxo.fromTo("#fr-linha", { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: "none", duration: 1 }, 0);
          NOS.forEach((no, i) => {
            fluxo.fromTo(`#${no.id}`, { opacity: 0, scale: 0.4, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.12, ease: "back.out(3)" }, i * 0.3);
            fluxo.to(`#${no.id}`, { attr: { fill: "#fff" }, duration: 0.08 }, i * 0.3 + 0.08);
          });
          cena("#cases", "top 70%", "top 20%").fromTo("#fr-fluxo", { opacity: 1 }, { opacity: 0, ease: "none" });

          // Cena 4: assinatura AERO na chamada final
          cena("#chamada", "top bottom", "center 60%")
            .fromTo("#fr-aero", { opacity: 0, scale: 1.12, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, ease: "power2.out" }, 0)
            .to("#fr-aero", { attr: { fill: "#fff" }, ease: "none" }, 0.6);
        }, svg);

        desfazer = () => {
          ctx.revert();
          gsap.ticker.remove(tique);
          lenis.destroy();
        };
      },
    );

    return () => {
      cancelado = true;
      window.removeEventListener("resize", enquadrar);
      desfazer();
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-40 md:opacity-70"
      viewBox="0 0 1920 1080"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <g transform="translate(1350 540)">
       <g id="fr-engrenagem">
        <g id="fr-giro">
          <path id="fr-dentes" d={DENTES} fill="none" stroke="#fff" strokeWidth="2.5" strokeLinejoin="round" />
          <circle id="fr-anel" r="110" fill="none" stroke="#fff" strokeWidth="2" />
          <circle id="fr-eixo" r="38" fill="none" stroke="#fff" strokeWidth="2" />
          <g stroke="#fff" strokeWidth="1.5">
            <line x1="0" y1="-38" x2="0" y2="-110" />
            <line x1="0" y1="38" x2="0" y2="110" />
            <line x1="-38" y1="0" x2="-110" y2="0" />
            <line x1="38" y1="0" x2="110" y2="0" />
          </g>
        </g>
        <circle id="fr-orbita" r="290" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1" strokeDasharray="4 10" />
       </g>
      </g>

      <g id="fr-pontos-saida">
        <g id="fr-pontos" opacity="0">
          {PONTOS.map((p, i) => (
            <circle key={i} cx={p.x0} cy={p.y0} r="5" fill="#fff" />
          ))}
        </g>
      </g>

      <g id="fr-fluxo">
        <path
          id="fr-linha"
          d="M1150 860 C 1150 740, 1550 740, 1550 620 S 1150 500, 1150 400 S 1550 300, 1550 220"
          fill="none"
          stroke="#fff"
          strokeWidth="3"
          pathLength={1}
          strokeDasharray="1"
          strokeDashoffset="1"
        />
        {NOS.map((no) => (
          <circle key={no.id} id={no.id} cx={no.cx} cy={no.cy} r="16" fill="#000" stroke="#fff" strokeWidth="3" opacity="0" />
        ))}
      </g>

      <text
        id="fr-aero"
        x="1350"
        y="590"
        textAnchor="middle"
        fontFamily="Inter, Arial, sans-serif"
        fontWeight="900"
        fontSize="150"
        letterSpacing="16"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        opacity="0"
      >
        AERO
      </text>
    </svg>
  );
}
