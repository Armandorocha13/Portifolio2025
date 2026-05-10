import { AppProviders } from "@/aplicacao/provedores";
import { AppRouter } from "@/aplicacao/roteador";
import { VectorBackground } from "@/compartilhado/efeitos/fundo_vetorial";

const App = () => (
  <AppProviders>
    <VectorBackground />
    <AppRouter />
  </AppProviders>
);

export default App;
