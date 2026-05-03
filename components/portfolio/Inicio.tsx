import { useState, useEffect } from 'react';
import { IconeWireframe3D, type IconeForma } from '@/components/ui/icones-dados-wireframe';

/**
 * Componente de efeito de digitação animado
 */
const EfeitoDigitacao = ({ 
  frases, 
  velocidadeDigitacao = 100, 
  velocidadeApagamento = 50, 
  tempoPausa = 2000 
}: { 
  frases: string[]; 
  velocidadeDigitacao?: number; 
  velocidadeApagamento?: number;
  tempoPausa?: number;
}) => {
  const [textoExibido, setTextoExibido] = useState('');
  const [indiceFraseAtual, setIndiceFraseAtual] = useState(0);
  const [estaApagando, setEstaApagando] = useState(false);
  const [indiceAtual, setIndiceAtual] = useState(0);

  useEffect(() => {
    const fraseAtual = frases[indiceFraseAtual];
    if (!estaApagando && indiceAtual < fraseAtual.length) {
      const t = setTimeout(() => {
        setTextoExibido(fraseAtual.substring(0, indiceAtual + 1));
        setIndiceAtual(prev => prev + 1);
      }, velocidadeDigitacao);
      return () => clearTimeout(t);
    } else if (!estaApagando && indiceAtual === fraseAtual.length) {
      const t = setTimeout(() => setEstaApagando(true), tempoPausa);
      return () => clearTimeout(t);
    } else if (estaApagando && indiceAtual > 0) {
      const t = setTimeout(() => {
        setTextoExibido(fraseAtual.substring(0, indiceAtual - 1));
        setIndiceAtual(prev => prev - 1);
      }, velocidadeApagamento);
      return () => clearTimeout(t);
    } else if (estaApagando && indiceAtual === 0) {
      setEstaApagando(false);
      setIndiceFraseAtual(prev => (prev + 1) % frases.length);
    }
  }, [indiceAtual, estaApagando, indiceFraseAtual, frases, velocidadeDigitacao, velocidadeApagamento, tempoPausa]);

  return (
    <span>
      {textoExibido}
      <span className="animate-pulse">|</span>
    </span>
  );
};

// Sequência de ícones e frases associadas
const SEQUENCIA: { forma: IconeForma; frase: string }[] = [
  { forma: 'brain',     frase: 'Inteligência Artificial'   },
  { forma: 'gear',      frase: 'Automação de Processos'    },
  { forma: 'neural',    frase: 'Análise de Dados'          },
  { forma: 'fibonacci', frase: 'Padrões e Algoritmos'      },
  { forma: 'code',      frase: 'Desenvolvimento de Sistemas' },
];

/**
 * Componente Inicio — ícones wireframe 3D alternando com texto digitado
 */
const Inicio = () => {
  const [dimensoes, setDimensoes] = useState({ width: 1200, height: 800 });
  const [indice, setIndice] = useState(0);
  const [visivel, setVisivel] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const atualizarDimensoes = () =>
      setDimensoes({ width: window.innerWidth, height: window.innerHeight });
    
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const progress = Math.min(currentScroll / window.innerHeight, 1);
      setScrollProgress(progress);
    };

    atualizarDimensoes();
    window.addEventListener('resize', atualizarDimensoes);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('resize', atualizarDimensoes);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Alterna o ícone a cada 8s com fade, mas APENAS se estiver no topo da página
  useEffect(() => {
    if (scrollProgress > 0.05) return; // Pausa a alternância se o usuário rolar a página

    const interval = setInterval(() => {
      setVisivel(false);
      setTimeout(() => {
        setIndice(prev => (prev + 1) % SEQUENCIA.length);
        setVisivel(true);
      }, 700);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [scrollProgress]);

  const iconSize = Math.min(dimensoes.width, dimensoes.height) * 0.92;
  const { forma } = SEQUENCIA[indice];

  return (
    <section className="min-h-screen relative bg-transparent flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transform: `translateY(${scrollProgress * 200}px) scale(${1 - scrollProgress * 0.2})`,
          opacity: 1 - scrollProgress * 1.5
        }}
      >
        {/* Ícone wireframe 3D centralizado */}
        <div
          style={{
            opacity: visivel ? 1 : 0,
            transition: 'opacity 0.7s ease',
          }}
        >
          <IconeWireframe3D
            forma={forma}
            width={iconSize}
            height={iconSize}
            scrollProgress={scrollProgress}
          />
        </div>
      </div>

      {/* Texto digitado sempre visível por cima */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground font-orbitron mb-4 text-center">
          <EfeitoDigitacao
            frases={[
              "<AeroCode/>",
              "Transformando Dados em",
              "Decisões Estratégicas",
              "Inteligência e Precisão",
            ]}
            velocidadeDigitacao={100}
            velocidadeApagamento={40}
            tempoPausa={1500}
          />
        </h1>
      </div>
    </section>
  );
};

export default Inicio;
