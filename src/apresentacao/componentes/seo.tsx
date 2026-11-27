import { Head } from "vite-react-ssg";

import { SITE } from "@/conteudo/site";

type SeoProps = {
  titulo: string;
  descricao: string;
  /** Caminho da página, ex.: "/servicos" */
  caminho: string;
  imagem?: string;
  /** true em páginas que não devem aparecer no Google (ex.: 404) */
  semIndexar?: boolean;
};

/** Title, description, canonical e Open Graph de cada página, gravados no HTML do build */
export function Seo({ titulo, descricao, caminho, imagem = SITE.imagemCompartilhamento, semIndexar = false }: SeoProps) {
  const url = SITE.url + (caminho === "/" ? "/" : caminho);
  const imagemAbsoluta = imagem.startsWith("http") ? imagem : SITE.url + imagem;
  return (
    <Head>
      <html lang="pt-BR" />
      <title>{titulo}</title>
      <meta name="description" content={descricao} />
      <link rel="canonical" href={url} />
      {semIndexar && <meta name="robots" content="noindex" />}
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:site_name" content={SITE.nome} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={titulo} />
      <meta property="og:description" content={descricao} />
      <meta property="og:image" content={imagemAbsoluta} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
}
