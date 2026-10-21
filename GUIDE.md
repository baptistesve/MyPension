# MyPension v2 — guide de mise en ligne (gratuit)

MyPension est une application web statique (PWA) : simulateur de prévoyance suisse (3a, rachat 3a rétroactif, rachat LPP, retraits en capital échelonnés, AVS/LPP, retraite/FIRE), mode couple, rappels datés et lien automatique avec MyWealth.
Coût : **0 CHF** (GitHub Pages gratuit ; Dropbox Basic et Cloudflare Workers gratuits, tous deux facultatifs).

> Simulation uniquement — pas un conseil financier, fiscal ou juridique.

## Contenu (tous les fichiers à plat, à la racine du dépôt)

| Fichier | Rôle |
|---|---|
| `index.html` | l'application (FR/EN, identité Cairn, thème clair) |
| `params-2026.js` | **tous** les paramètres légaux 2026, datés, avec sources officielles |
| `tax-tables-2026.js` | tableaux fiscaux précalculés (calculateur AFC/ESTV, 26 chefs-lieux) |
| `config.js` | clé Dropbox et URL du relais fiscal (vides par défaut) — **pas inclus dans le zip v2 : gardez le vôtre** |
| `sw.js`, `manifest.webmanifest` | hors ligne + installation sur l'écran d'accueil |
| `privacy.html` | politique de confidentialité FR/EN |
| `Fraunces.woff2`, `HankenGrotesk.woff2`, `OFL-fonts.txt` | polices locales (licence SIL OFL) |
| `icon-192.png`, `icon-512.png`, `maskable-512.png`, `apple-touch-icon.png`, `favicon-32.png`, `favicon.svg` | icônes Cairn « Filigrane » |
| `worker.js` | relais Cloudflare facultatif (ne pas exécuter sur GitHub ; à coller dans Cloudflare) |
| `GUIDE.md` | ce guide |

## 1. Créer le dépôt GitHub `MyPension` (2 min)

1. Connectez-vous sur https://github.com › **New repository**.
2. **Repository name** : `MyPension` · **Public** · ne cochez rien d'autre › **Create repository**.

## 2. Déposer les fichiers (3 min)

1. Décompressez **MyPension.zip** : vous obtenez les fichiers **à plat**.
2. Sur la page du dépôt : **uploading an existing file** (ou **Add file › Upload files**).
3. Sélectionnez **tout le contenu** (pas un dossier) et glissez-le dans la page. `index.html` doit être directement à la racine.
4. **Commit changes**.

## 3. Activer GitHub Pages (2 min + attente)

1. **Settings › Pages** › **Source** : `Deploy from a branch` › **Branch** : `main`, `/ (root)` › **Save**.
2. Après 1 à 5 minutes : `https://VOTRE-NOM.github.io/MyPension/` (notez-la exactement, avec le `/` final ; la casse du chemin compte).
3. L'application fonctionne déjà (sans synchronisation, avec l'estimation fiscale intégrée).

## 4. Facultatif : synchronisation Dropbox (5 min)

1. https://www.dropbox.com/developers/apps › **Create app**.
2. **Scoped access** › **App folder** › nom unique, p. ex. `MyPension-VotreNom` › **Create app**.
3. Onglet **Permissions** : cochez `files.content.write`, `files.content.read` (et `account_info.read`, pour afficher le compte connecté) › **Submit**.
4. Onglet **Settings** :
   - **OAuth 2 › Redirect URIs** : `https://VOTRE-NOM.github.io/MyPension/` (avec le `/` final) › **Add** ;
   - **Allow public clients (Implicit Grant & PKCE)** : **Allow** ;
   - copiez l'**App key** (jamais l'App secret).
5. Le statut « Development » suffit pour un usage personnel.
6. Sur GitHub, ouvrez `config.js` › crayon ✏️ › remplacez `DROPBOX_APP_KEY: ""` par `DROPBOX_APP_KEY: "votre-app-key"` › **Commit changes**.
7. Dans l'application : **⚙ Réglages › Synchronisation Dropbox › Se connecter à Dropbox**. Le fichier `mypension-data.json` est créé dans `Applications/MyPension-VotreNom` (+ une copie par mois).

## 5. Facultatif : calcul fiscal exact via relais Cloudflare (5 min)

Pourquoi : l'API du calculateur de l'AFC/ESTV ne renvoie pas d'en-têtes CORS ; un navigateur ne peut donc pas l'appeler directement (testé le 18.10.2026 : préflight `OPTIONS` → 405, pas d'`Access-Control-Allow-Origin`). Sans relais, MyPension utilise ses tableaux précalculés (approximatifs, fourchettes affichées).

1. Créez un compte gratuit sur https://dash.cloudflare.com (offre Free : 100'000 requêtes/jour, https://developers.cloudflare.com/workers/platform/pricing/).
2. **Workers & Pages › Create › Create Worker** (modèle « Hello World ») › nom `mypension-tax` › **Deploy**.
3. **Edit code** › remplacez tout par le contenu de `worker.js`.
4. Dans `ALLOWED_ORIGINS`, remplacez `https://VOTRE-UTILISATEUR.github.io` par votre origine GitHub Pages (sans `/MyPension`) › **Deploy**.
5. Copiez l'URL du worker, p. ex. `https://mypension-tax.votre-sous-domaine.workers.dev`.
6. Dans `config.js` sur GitHub : `TAX_RELAY_URL: "https://mypension-tax.votre-sous-domaine.workers.dev"` › **Commit** — ou, sans toucher au dépôt, dans l'app : **⚙ Réglages › Calcul exact ESTV (relais)** (réglage enregistré avec vos données).
7. Onglet **Détail**, carte « Retraits en capital » : bouton **Calcul exact ESTV (via relais)**. Le relais ne transmet que 3 opérations publiques (`API_searchLocation`, `API_calculateManyCapitalTaxes`, `API_calculateSimpleTaxes`), uniquement depuis votre origine, et ne stocke rien.

> L'API ESTV n'est pas documentée officiellement et peut changer ; en cas d'échec, l'estimation intégrée reste affichée.

## 6. Installer sur le téléphone

- iPhone (Safari) : Partager › **Sur l'écran d'accueil**.
- Android (Chrome) : menu ⋮ › **Installer l'application**.

## 7. Mise à jour annuelle des paramètres

Tous les chiffres légaux sont dans `params-2026.js` (date de vérification + URL des sources). Pour une nouvelle année :
1. vérifier les montants sur les sources officielles (OFAS/BSV, AFC/ESTV) ;
2. ajouter l'année dans `byYear` (3a, AVS, LPP) et modifier `verifiedOn` ;
3. recalculer `tax-tables-AAAA.js` avec le calculateur ESTV (même méthode : chefs-lieux, célibataire/marié, sans Église) ;
4. changer `VERSION` dans `sw.js` (p. ex. `mypension-v5`) pour forcer la mise à jour des appareils.

## Dépannage

| Problème | Solution |
|---|---|
| Page 404 | Attendez 5 min ; vérifiez que `index.html` est à la racine et que Pages pointe sur `main` / `(root)`. |
| « redirect_uri mismatch » | L'URI Dropbox doit être identique à l'adresse de l'app, avec `/` final et même casse (`/MyPension/`). |
| Ancienne version affichée | Rechargez deux fois (le service worker se met à jour en arrière-plan). |
| « Échec du relais » | Vérifiez `ALLOWED_ORIGINS` dans le worker et `TAX_RELAY_URL` dans `config.js` (sans `/` final de préférence). |

---

### English summary
Create a public GitHub repo **MyPension**, upload all files flat to the root, enable **Settings › Pages** (branch `main`, root). Optional: Dropbox app (Scoped access, App folder, permissions `files.content.read/write` + `account_info.read`, redirect URI `https://YOU.github.io/MyPension/`, public clients allowed), paste the App key into `config.js`. Optional: deploy `worker.js` as a free Cloudflare Worker (set `ALLOWED_ORIGINS`), then set `TAX_RELAY_URL` in `config.js` for exact ESTV tax figures.

## 8. Lien MyWealth (automatique, lecture seule)

MyPension et MyWealth sont servis par le même site (`https://VOTRE-NOM.github.io`) : sur un **même appareil et un même navigateur**, MyPension lit les données locales de MyWealth (`mywealth.data.v3`, à défaut `patrimoine.v1`) à chaque ouverture et retour dans l'app, et met à jour l'**épargne libre** (comptes hors prévoyance + titres + crypto). Il n'écrit **jamais** dans les données de MyWealth. Réglable dans **⚙ Réglages › Lien MyWealth** ou dans la carte « Lien MyWealth » de l’onglet Données.

Si MyWealth n'a jamais été ouvert sur l'appareil, un message l'indique et la dernière valeur connue est conservée avec sa date.

**Facultatif — depuis un autre appareil** : MyPension peut lire le fichier Dropbox de MyWealth (`mywealth-donnees.json`) en **lecture seule** (autorisation séparée, gratuite). Pour cela, dans la console Dropbox de l'app **MyWealth** (pas celle de MyPension) › **Settings › OAuth 2 › Redirect URIs**, ajoutez aussi `https://VOTRE-NOM.github.io/MyPension/`. La clé de MyWealth est lue automatiquement dans `../MyWealth/config.js` (ou ajoutez `MYWEALTH_DROPBOX_APP_KEY: "..."` dans le `config.js` de MyPension). Puis **⚙ Réglages › Lien MyWealth › Autoriser (lecture seule)**.
