/**
 * Componente Rodape - Rodapé do site
 * 
 * Exibe logo centralizado
 */
const Rodape = () => {
  return (
    <footer className="py-8 px-6 border-t border-border">
      <div className="container-narrow">
        <div className="flex items-center justify-center">
          <div className="font-mono text-sm font-semibold tracking-tight">
            <span className="text-foreground">&lt;</span>
            <span className="text-muted-foreground">Aero Code</span>
            <span className="text-foreground">/&gt;</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Rodape;
