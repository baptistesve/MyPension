/* MyPension — configuration (facultatif / optional)
   DROPBOX_APP_KEY : clé « App key » de votre application Dropbox (accès « App folder »). Vide = synchronisation désactivée.
   TAX_RELAY_URL   : URL de votre relais Cloudflare Worker (worker.js), p. ex. "https://mypension-tax.<compte>.workers.dev".
                     Vide = estimation intégrée (tableaux précalculés, approximatifs).
   Ces valeurs ne sont pas secrètes (application publique, PKCE). */
window.MYPENSION_CONFIG = {
  DROPBOX_APP_KEY: "dytps81slrom5fc",
  TAX_RELAY_URL: ""
};
