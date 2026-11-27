// Gera dist/sitemap.xml e dist/robots.txt a partir dos HTML pré-renderizados
import { readdirSync, statSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";

const SITE = "https://www.aero-code.tech";
const DIST = "dist";
const IGNORAR = [/^404\.html$/, /^prototipo\//, /^index\.html$/];

function listar(dir) {
  return readdirSync(dir).flatMap((nome) => {
    const caminho = join(dir, nome);
    return statSync(caminho).isDirectory() ? listar(caminho) : [caminho];
  });
}

const paginas = listar(DIST)
  .map((arquivo) => relative(DIST, arquivo).replaceAll("\\", "/"))
  .filter((arquivo) => arquivo.endsWith(".html") && !IGNORAR.some((r) => r.test(arquivo)))
  .map((arquivo) => "/" + arquivo.replace(/\.html$/, ""))
  .sort();

const urls = ["/", ...paginas];
const hoje = new Date().toISOString().slice(0, 10);
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${SITE}${u === "/" ? "/" : u}</loc><lastmod>${hoje}</lastmod></url>`).join("\n")}
</urlset>
`;
writeFileSync(join(DIST, "sitemap.xml"), xml);
writeFileSync(join(DIST, "robots.txt"), `User-agent: *\nAllow: /\nDisallow: /prototipo/\n\nSitemap: ${SITE}/sitemap.xml\n`);
console.log(`sitemap.xml com ${urls.length} páginas`);
