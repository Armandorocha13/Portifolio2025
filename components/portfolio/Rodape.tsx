import { Github, Linkedin, Twitter, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Componente Rodape - Rodapé do site
 * 
 * Exibe logo, links para redes sociais e copyright
 * Layout responsivo com flexbox
 */
const Rodape = () => {
  return (
    <footer className="py-8 px-6 border-t border-border">
      <div className="container-narrow">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="font-mono text-sm font-semibold tracking-tight"
            >
              <span className="text-foreground">&lt;</span>
              <span className="text-muted-foreground">dev</span>
              <span className="text-foreground">/&gt;</span>
            </a>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-muted">
              <Github className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-muted">
              <Linkedin className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-muted">
              <Twitter className="h-4 w-4" />
            </Button>
          </div>

          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Feito com <Heart className="h-3 w-3 text-red-500" /> em 2024
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Rodape;
