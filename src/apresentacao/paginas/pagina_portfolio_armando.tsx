import { Footer } from "@/apresentacao/componentes/layout/rodape";
import { Header } from "@/apresentacao/componentes/layout/cabecalho";
import { ExperienceSection } from "@/apresentacao/componentes/secoes/secao_experiencia";
import { AboutSection } from "@/apresentacao/componentes/secoes/secao_sobre";
import { ContactSection } from "@/apresentacao/componentes/secoes/secao_contato";
import { HeroSection } from "@/apresentacao/componentes/secoes/secao_inicio";
import { ProjectsSection } from "@/apresentacao/componentes/secoes/secao_projetos";
import { SkillsSection } from "@/apresentacao/componentes/secoes/secao_habilidades";
import { Seo } from "@/apresentacao/componentes/seo";
import { exportar_curriculo_pdf } from "@/compartilhado/curriculo/exportar_curriculo_pdf";

const LINKS_PORTFOLIO = [
  { label: "Sobre", href: "#sobre" },
  { label: "Experiência", href: "#experiencia" },
  { label: "Habilidades", href: "#habilidades" },
  { label: "Projetos", href: "#projetos" },
  { label: "Contato", href: "#contato" },
];

/**
 * Portfólio pessoal de Armando Rocha (antiga página inicial), agora em /armando.
 * 
 * Orquestra todas as seções do portfólio:
 * - Cabecalho: Navegação fixa
 * - Inicio: Seção inicial com planeta e texto animado
 * - Sobre: Sobre mim
 * - Experiencia: Experiência profissional e formação
 * - Habilidades: Habilidades técnicas
 * - Projetos: Projetos em destaque
 * - Contato: Formulário de contato e redes sociais
 * - Rodape: Rodapé
 */
const PortfolioArmandoPage = () => {
  return (
    <main className="min-h-screen bg-transparent">
      <Seo
        titulo="Armando Rocha | Analista de Dados & Engenharia de Dados"
        descricao="Analista de Dados com atuação em Engenharia de Dados: pipelines de ETL em Python e n8n, SQL, modelagem Star Schema e Power BI."
        caminho="/armando"
        imagem="/image/perfil.jpeg"
      />
      <Header links={LINKS_PORTFOLIO} acao={{ label: "Currículo", onClick: exportar_curriculo_pdf }} numerado />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default PortfolioArmandoPage;
