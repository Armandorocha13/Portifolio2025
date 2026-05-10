import { DADOS_CURRICULO, PROJETOS_COMO_EXPERIENCIA } from "@/compartilhado/curriculo/dados_curriculo";

const formatar_whatsapp = (whatsapp: string) => {
  const numeros = whatsapp.replace(/\D/g, "");
  if (numeros.length !== 11) return whatsapp;
  return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
};

const escapar_html = (valor: string) =>
  valor
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const montar_html_curriculo = () => {
  const competencias = DADOS_CURRICULO.competencias
    .map((competencia) => `<li>${escapar_html(competencia)}</li>`)
    .join("");

  const projetos = PROJETOS_COMO_EXPERIENCIA.map(
    (projeto) => `
      <article class="projeto">
        <h3>${escapar_html(projeto.titulo)}</h3>
        <p>${escapar_html(projeto.descricao)}</p>
        <p><strong>Tecnologias:</strong> ${escapar_html(projeto.tecnologias.join(", "))}</p>
        <p><strong>GitHub:</strong> ${escapar_html(projeto.link_github)}</p>
      </article>
    `,
  ).join("");

  const localizacao = `${DADOS_CURRICULO.cidade}, ${DADOS_CURRICULO.estado}`;

  return `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Currículo - ${escapar_html(DADOS_CURRICULO.nome)}</title>
    <style>
      * { box-sizing: border-box; }
      body {
        font-family: Arial, Helvetica, sans-serif;
        margin: 0;
        padding: 32px;
        color: #0f172a;
        background: #fff;
        line-height: 1.5;
      }
      .container { max-width: 900px; margin: 0 auto; }
      h1 { margin: 0 0 8px; font-size: 30px; }
      h2 {
        margin: 24px 0 8px;
        font-size: 16px;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        border-bottom: 1px solid #cbd5e1;
        padding-bottom: 6px;
      }
      h3 { margin: 0 0 6px; font-size: 15px; }
      p { margin: 0 0 8px; }
      ul { margin: 0; padding-left: 20px; }
      .dados { margin-bottom: 16px; color: #334155; }
      .dados span { display: inline-block; margin-right: 16px; margin-bottom: 4px; }
      .projeto { margin-bottom: 14px; }
      .resumo {
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        padding: 14px;
      }
      @media print {
        body { padding: 18mm 14mm; }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <header>
        <h1>${escapar_html(DADOS_CURRICULO.nome)}</h1>
        <div class="dados">
          <span><strong>Idade:</strong> ${DADOS_CURRICULO.idade} anos</span>
          <span><strong>Localização:</strong> ${escapar_html(localizacao)}</span>
          <span><strong>Email:</strong> ${escapar_html(DADOS_CURRICULO.email)}</span>
          <span><strong>WhatsApp:</strong> ${escapar_html(formatar_whatsapp(DADOS_CURRICULO.whatsapp))}</span>
        </div>
      </header>

      <section>
        <h2>Resumo Profissional</h2>
        <div class="resumo">
          <p>${escapar_html(DADOS_CURRICULO.resumo_profissional)}</p>
        </div>
      </section>

      <section>
        <h2>Objetivo</h2>
        <p>${escapar_html(DADOS_CURRICULO.objetivo)}</p>
      </section>

      <section>
        <h2>Experiência Prática em Projetos</h2>
        ${projetos}
      </section>

      <section>
        <h2>Competências Técnicas</h2>
        <ul>${competencias}</ul>
      </section>
    </div>
    <script>
      window.addEventListener("load", () => {
        setTimeout(() => window.print(), 180);
      });
    </script>
  </body>
</html>`;
};

export function exportar_curriculo_pdf() {
  const html_curriculo = montar_html_curriculo();
  const blob = new Blob([html_curriculo], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.click();

  setTimeout(() => URL.revokeObjectURL(url), 60_000);
}
