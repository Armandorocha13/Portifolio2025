import { Footer } from "@/apresentacao/componentes/layout/rodape";
import { Header } from "@/apresentacao/componentes/layout/cabecalho";
import { AboutSection } from "@/apresentacao/componentes/secoes/secao_sobre";
import { ContactSection } from "@/apresentacao/componentes/secoes/secao_contato";
import { HeroSection } from "@/apresentacao/componentes/secoes/secao_inicio";
import { ProjectsSection } from "@/apresentacao/componentes/secoes/secao_projetos";
import { SkillsSection } from "@/apresentacao/componentes/secoes/secao_habilidades";

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
const HomePage = () => {
  return (
    <main className="min-h-screen bg-transparent">
      <Header />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default HomePage;
