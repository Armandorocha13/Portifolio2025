import { Cabecalho } from "@/components/ui/cabecalho";
import Inicio from "@/components/portfolio/Inicio";
import Sobre from "@/components/portfolio/Sobre";
import Habilidades from "@/components/portfolio/Habilidades";
import Projetos from "@/components/portfolio/Projetos";
import Contato from "@/components/portfolio/Contato";
import Rodape from "@/components/portfolio/Rodape";

/**
 * Página principal (Index) - Componente raiz da aplicação
 * 
 * Orquestra todas as seções do portfólio:
 * - Cabecalho: Navegação fixa
 * - Inicio: Seção inicial com planeta e texto animado
 * - Sobre: Sobre mim
 * - Habilidades: Habilidades técnicas
 * - Projetos: Projetos em destaque
 * - Contato: Formulário de contato e redes sociais
 * - Rodape: Rodapé
 */
const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Cabecalho />
      <Inicio />
      <Sobre />
      <Habilidades />
      <Projetos />
      <Contato />
      <Rodape />
    </main>
  );
};

export default Index;
