import { Link } from "react-router-dom";

import { MENU, linkInstagram, linkWhatsApp } from "@/conteudo/site";

/**
 * Componente Rodape - Rodapé do site da AERO
 * Marca, menu, contato direto e link para a política de privacidade
 */
export const Footer = () => {
  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="container-narrow flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div>
          <Link to="/" className="font-mono text-sm font-semibold tracking-tight">
            <span className="text-foreground">&lt;</span>
            <span className="text-muted-foreground">AeroCode</span>
            <span className="text-foreground">/&gt;</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">Sites e automações para pequenas e médias empresas.</p>
        </div>

        <nav aria-label="Rodapé" className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {MENU.map((item) => (
            <Link key={item.href} to={item.href} className="hover:text-foreground">
              {item.rotulo}
            </Link>
          ))}
          <a href={linkWhatsApp()} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
            WhatsApp
          </a>
          <a href={linkInstagram()} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
            Instagram
          </a>
          <Link to="/privacidade" className="hover:text-foreground">
            Privacidade
          </Link>
        </nav>
      </div>
      <p className="container-narrow mt-8 text-xs text-muted-foreground">© 2026 AERO. Rio de Janeiro, Brasil.</p>
    </footer>
  );
};
