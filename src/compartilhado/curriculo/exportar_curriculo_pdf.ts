/**
 * Abre o currículo atualizado (PDF estático em /public) em uma nova aba.
 * Para atualizar o currículo, basta substituir o arquivo public/curriculo-armando-rocha.pdf.
 */
export const CAMINHO_CURRICULO = "/curriculo-armando-rocha.pdf";

export function exportar_curriculo_pdf() {
  window.open(CAMINHO_CURRICULO, "_blank", "noopener,noreferrer");
}
