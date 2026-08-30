import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const fail = (file, message) => errors.push(`${path.relative(root, file) || file}: ${message}`);
const read = (file) => fs.readFileSync(file, "utf8");
const matches = (text, expression) => [...text.matchAll(expression)];

const catalogFile = path.join(root, "js", "destinations-data.js");
const context = { window: {} };
vm.runInNewContext(read(catalogFile), context, { filename: catalogFile });
const catalog = context.window.destinationCatalog;

if (!Array.isArray(catalog) || catalog.length !== 16) {
  fail(catalogFile, `el catálogo debe contener 16 destinos; contiene ${catalog?.length ?? 0}`);
}

const destinationFiles = fs.readdirSync(path.join(root, "destinations"))
  .filter((name) => name.endsWith(".html"))
  .sort();
if (destinationFiles.length !== 16) {
  fail(path.join(root, "destinations"), `debe contener 16 guías HTML; contiene ${destinationFiles.length}`);
}

const htmlFiles = ["index.html", "viaje.html", ...destinationFiles.map((name) => path.join("destinations", name))]
  .map((name) => path.join(root, name));

for (const file of htmlFiles) {
  const html = read(file);
  const ids = matches(html, /\sid="([^"]+)"/g).map((match) => match[1]);
  const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
  if (duplicateIds.length) fail(file, `identificadores duplicados: ${duplicateIds.join(", ")}`);
  if (!/^<!doctype html>/i.test(html.trimStart())) fail(file, "falta <!doctype html>");
  if (!/<html\s[^>]*lang="es"/i.test(html)) fail(file, "el idioma de la página no es español");
  if (matches(html, /<h1\b/gi).length !== 1) fail(file, "debe existir exactamente un h1");

  for (const match of matches(html, /\b(?:href|src)="([^"]+)"/gi)) {
    const value = match[1];
    if (/^(?:https?:|data:|mailto:|tel:|about:|\/\/|#)/i.test(value)) continue;
    const clean = value.split(/[?#]/, 1)[0];
    if (!clean) continue;
    const target = path.resolve(path.dirname(file), decodeURIComponent(clean));
    if (!fs.existsSync(target)) fail(file, `recurso local inexistente: ${value}`);
  }

  for (const match of matches(html, /<a\b([^>]*\btarget="_blank"[^>]*)>/gi)) {
    if (!/\brel="[^"]*noreferrer[^"]*"/i.test(match[1])) {
      fail(file, "un enlace con target=\"_blank\" no incluye rel=\"noreferrer\"");
    }
  }

  for (const match of matches(html, /<img\b([^>]*)>/gi)) {
    const attributes = match[1];
    if (!/\balt="[^"]+"/i.test(attributes)) fail(file, "una imagen no tiene texto alternativo descriptivo");
    if (!/\bwidth="\d+"/i.test(attributes) || !/\bheight="\d+"/i.test(attributes)) {
      fail(file, "una imagen no declara anchura y altura");
    }
    const source = attributes.match(/\bsrc="([^"]+)"/i)?.[1] || "";
    if (source && !source.endsWith(".webp")) fail(file, `la imagen no usa WebP: ${source}`);
  }
}

const catalogSlugs = new Set(catalog.map((destination) => destination.slug));
for (const name of destinationFiles) {
  const slug = path.basename(name, ".html");
  const file = path.join(root, "destinations", name);
  const html = read(file);
  const routeTargets = matches(html, /\bdata-route-target="([^"]+)"/g).map((match) => match[1]);
  const destination = catalog.find((item) => item.slug === slug);

  if (!catalogSlugs.has(slug)) fail(file, "la guía no está registrada en el catálogo");
  if (routeTargets.length !== 3) fail(file, `debe haber tres selectores de ruta; hay ${routeTargets.length}`);
  if (matches(html, /<article\b[^>]*class="[^"]*route-card[^"]*"[^>]*role="tabpanel"/gi).length !== 3) {
    fail(file, "debe haber tres paneles de itinerario");
  }
  if (matches(html, /class="[^"]*day-card[^"]*"/gi).length !== 12) fail(file, "debe haber cuatro días en cada una de las tres rutas");
  if (matches(html, /class="[^"]*day-mobility[^"]*"/gi).length !== 12) fail(file, "cada día debe incluir su resumen de movilidad");
  if (!/id="weather-days"/i.test(html)) fail(file, "falta el contenedor de previsión meteorológica");
  if (!/id="incidencias"/i.test(html)) fail(file, "falta la auditoría de incidencias");
  if (!/<dialog\b[^>]*id="map-dialog"[^>]*aria-labelledby="map-title"/i.test(html)) fail(file, "el diálogo de mapa no tiene nombre accesible");
  if (!/href="\.\.\/viaje\.html"/i.test(html)) fail(file, "falta el acceso al modo viaje");

  if (destination) {
    const catalogTargets = destination.routes.map((route) => route.hash);
    if (catalogTargets.join("|") !== routeTargets.join("|")) {
      fail(file, `las rutas no coinciden con el catálogo (${catalogTargets.join(", ")})`);
    }
  }
}

for (const destination of catalog) {
  const file = path.join(root, "destinations", `${destination.slug}.html`);
  if (!fs.existsSync(file)) fail(catalogFile, `falta la guía de ${destination.name}: ${destination.slug}.html`);
}

const destinationScript = read(path.join(root, "js", "destination.js"));
if (!destinationScript.includes("https://api.frankfurter.dev/v1/latest")) {
  fail(path.join(root, "js", "destination.js"), "el conversor no usa el endpoint vigente de Frankfurter");
}

const imageDir = path.join(root, "assets", "images");
const imageFiles = fs.readdirSync(imageDir);
const legacyJpegs = imageFiles.filter((name) => /\.jpe?g$/i.test(name));
if (legacyJpegs.length) fail(imageDir, `quedan imágenes JPEG sin optimizar: ${legacyJpegs.join(", ")}`);
const webpFiles = imageFiles.filter((name) => name.endsWith(".webp"));
const webpBytes = webpFiles.reduce((sum, name) => sum + fs.statSync(path.join(imageDir, name)).size, 0);
if (webpBytes > 12 * 1024 * 1024) fail(imageDir, "las imágenes WebP superan en conjunto 12 MB");

if (errors.length) {
  console.error(`Validación fallida (${errors.length} problemas):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Validación correcta: ${htmlFiles.length} páginas, ${destinationFiles.length} destinos y ${webpFiles.length} imágenes WebP (${(webpBytes / 1024 / 1024).toFixed(2)} MB).`);
