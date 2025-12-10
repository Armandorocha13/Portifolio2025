import { useState, useEffect } from 'react';
import PlanetaRotacionando from '@/components/ui/planeta-wireframe';

/**
 * Componente de efeito de digitação animado
 * Exibe frases em sequência com animação de digitação e apagamento
 * 
 * @param frases - Array de frases para exibir em sequência
 * @param velocidadeDigitacao - Velocidade de digitação em milissegundos (padrão: 100ms)
 * @param velocidadeApagamento - Velocidade de apagamento em milissegundos (padrão: 50ms)
 * @param tempoPausa - Tempo de pausa após completar a frase em milissegundos (padrão: 2000ms)
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
    
    // Estado de digitação: adiciona caracteres um por um
    if (!estaApagando && indiceAtual < fraseAtual.length) {
      const timeout = setTimeout(() => {
        setTextoExibido(fraseAtual.substring(0, indiceAtual + 1));
        setIndiceAtual(prev => prev + 1);
      }, velocidadeDigitacao);

      return () => clearTimeout(timeout);
    } 
    // Pausa após completar a digitação
    else if (!estaApagando && indiceAtual === fraseAtual.length) {
      const timeout = setTimeout(() => {
        setEstaApagando(true);
      }, tempoPausa);

      return () => clearTimeout(timeout);
    } 
    // Estado de apagamento: remove caracteres um por um
    else if (estaApagando && indiceAtual > 0) {
      const timeout = setTimeout(() => {
        setTextoExibido(fraseAtual.substring(0, indiceAtual - 1));
        setIndiceAtual(prev => prev - 1);
      }, velocidadeApagamento);

      return () => clearTimeout(timeout);
    } 
    // Move para a próxima frase quando terminar de apagar
    else if (estaApagando && indiceAtual === 0) {
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

/**
 * Componente Inicio - Seção principal da página inicial
 * Exibe o planeta rotacionando com efeito de digitação sobreposto
 * Responsivo e adaptável a diferentes tamanhos de tela
 */
const Inicio = () => {
  // Estado para armazenar as dimensões da janela (usado para responsividade do planeta)
  const [dimensoes, setDimensoes] = useState({ width: 1200, height: 800 });

  // Atualiza as dimensões quando a janela é redimensionada
  useEffect(() => {
    const atualizarDimensoes = () => {
      setDimensoes({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    atualizarDimensoes();
    window.addEventListener('resize', atualizarDimensoes);
    return () => window.removeEventListener('resize', atualizarDimensoes);
  }, []);

  return (
    <section className="min-h-screen relative bg-background flex items-center justify-center px-6 md:px-12 lg:px-24 py-12 md:py-20 lg:py-32 overflow-hidden">
      <div className="w-full h-full flex items-center justify-center relative">
        {/* Componente do planeta rotacionando em wireframe */}
        <PlanetaRotacionando 
          width={dimensoes.width} 
          height={dimensoes.height} 
          className="w-full h-full"
        />
        
        {/* Texto com efeito de digitação sobreposto ao planeta */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none" style={{ transform: 'translateY(-80px)' }}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground font-orbitron mb-4">
            <EfeitoDigitacao 
              frases={[
                "<AeroCode/>",
                "Transformando ideias em ",
                "Realidade Digital"
              ]} 
              velocidadeDigitacao={100}
              velocidadeApagamento={40}
              tempoPausa={1500}
            />
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Inicio;
