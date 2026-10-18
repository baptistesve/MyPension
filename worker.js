/* MyPension — relais Cloudflare Worker (offre gratuite) vers le calculateur fiscal de l'AFC/ESTV.
   Pourquoi : l'API du calculateur ESTV n'autorise pas les appels depuis un navigateur (pas d'en-têtes CORS).
   Ce relais ne transmet QUE 3 opérations publiques, en POST JSON, et seulement depuis les origines autorisées.
   Aucune donnée n'est stockée ni journalisée par ce script.
   Why: the ESTV tax-calculator API sends no CORS headers. This relay forwards only 3 public operations,
   only from allowed origins, and stores/logs nothing.

   Déploiement : voir GUIDE.md (dash.cloudflare.com › Workers & Pages › Create › Hello World › coller ce fichier › Deploy). */

const ALLOWED_ORIGINS = [
  "https://VOTRE-UTILISATEUR.github.io",   // ← remplacer par l'origine GitHub Pages (sans /MyPension)
  "http://localhost:8080"
];
const UPSTREAM = "https://swisstaxcalculator.estv.admin.ch/delegate/ost-integration/v1/lg-proxy/operation/c3b67379_ESTV/";
const OPS = new Set(["API_searchLocation", "API_calculateManyCapitalTaxes", "API_calculateSimpleTaxes"]);
const MAX_BODY = 4096;

function cors(origin) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin"
  };
}

export default {
  async fetch(request) {
    const origin = request.headers.get("Origin") || "";
    if (!ALLOWED_ORIGINS.includes(origin)) return new Response("Forbidden origin", { status: 403 });
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors(origin) });
    if (request.method !== "POST") return new Response("Method not allowed", { status: 405, headers: cors(origin) });

    const op = new URL(request.url).pathname.replace(/^\/+/, "");
    if (!OPS.has(op)) return new Response("Unknown operation", { status: 404, headers: cors(origin) });

    const body = await request.text();
    if (body.length > MAX_BODY) return new Response("Body too large", { status: 413, headers: cors(origin) });
    try { JSON.parse(body); } catch (e) { return new Response("Invalid JSON", { status: 400, headers: cors(origin) }); }

    const up = await fetch(UPSTREAM + op, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body
    });
    const txt = await up.text();
    return new Response(txt, {
      status: up.status,
      headers: { ...cors(origin), "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }
    });
  }
};
