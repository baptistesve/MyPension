# MyPension v4 — mise à jour

## Ce qui change
MyPension devient un **simulateur à trois scénarios** : trois âges de départ côte à côte, pour une personne seule ou pour un couple marié saisi sur le même appareil.

- **5 onglets :** Simulation · Détail · Objectif · Données · Hypothèses. La langue, Dropbox, le lien MyWealth, l’export/import et la réinitialisation sont dans le menu ⚙.
- **Simulation :** trois curseurs d’âge (A, B, C) et, pour un couple, l’option « même année de départ » (activée par défaut). Vue en **capital** par défaut, avec bascule Rente / Mixte. Montants en **CHF réels** (bascule nominal), **avant impôt** sur le revenu. Vous pouvez afficher le ménage ou chaque personne.
- **Détail :** les étapes (arrêts, début de l’AVS), le graphique des revenus par mois, la comparaison rente ou capital avec le point d’équilibre, et les retraits en capital. Ces retraits sont **échelonnés automatiquement** sur des années différentes et restent ajustables. Vous y trouvez aussi l’AVS du couple : splitting, plafond de 150 % et 13e rente. Le calcul exact ESTV via le relais reste disponible.
- **AVS :** si vous arrêtez avant 63 ans, l’AVS est anticipée à 63 ans (−6.8 %/an). L’option « attendre 65 ans » se trouve dans Hypothèses.
- **Objectif :** indiquez un revenu mensuel souhaité. MyPension calcule dès quand il est atteignable (pour un couple : même année, même âge ou âges fixés) et propose des leviers : travailler plus longtemps, épargner davantage ou faire un rachat LPP.
- **Données :** une saisie guidée en 3 étapes (4 pour un couple marié). Les cotisations LPP se saisissent par mois, par an ou en %. Si vous les ignorez, MyPension applique l’échelle légale 7/10/15/18 %. Les fonctions avancées sont repliées : rachats LPP, plusieurs comptes 3a, 3a rétroactif, comparaison des cantons, lacunes AVS, autres capitaux et revenu imposable.
- **Hypothèses :** les valeurs par défaut sont sourcées (BNS, OFS, OFAS, Swisscanto, Pictet…) et toutes modifiables : inflation 1.0 %, salaires réels +0.5 %, intérêt LPP 2.0 %, 3a 2.5 %, conversion 5.2 % à 65 ans (−0.13 pt par année d’anticipation), horizon 90 ans du plus jeune. Un bouton rétablit les valeurs par défaut.
- **Moteur de calcul :** c’est le modèle Python validé, porté en JavaScript. Il a été vérifié sur 37 profils fictifs (4 758 valeurs, aucun écart).

## Vos données
- **Reprise automatique et sans perte** des données v3 et v1. Les anciens champs sont conservés.
- Avant la reprise, une **copie intacte** est gardée sur l’appareil (`mypension.backup.v3`, ou `mypension.backup.v1`). Dans Dropbox, la copie est le fichier `mypension-data-v3-sauvegarde.json`, écrit une seule fois.
- Si une ancienne version de l’app s’ouvre encore sur un appareil, elle **n’écrase pas** les données v4. Elle affiche un message et passe en lecture seule.
- Ce qui est repris :
  - âge de départ → scénario sélectionné ;
  - dépenses → objectif mensuel ;
  - rendements et inflation modifiés → Hypothèses ;
  - bonifications LPP → cotisations par an (moitié vous, moitié employeur), ou échelle légale si elles étaient nulles.
- **À vérifier après la mise à jour :** les cotisations LPP dans Données. Un bandeau le rappelle une fois.
- Une nouvelle installation démarre **vide**, sans données d’exemple.

## Installation
1. Remplacez les fichiers du dossier MyPension par ceux du zip : mêmes noms, structure plate.
2. **Gardez votre `config.js`.** Il ne fait pas partie du zip.
3. Le service worker passe à `mypension-v4`. Il supprime seulement les anciens caches MyPension, sans toucher à MyWealth. Rechargez deux fois si l’ancienne version s’affiche encore.

## Limites connues
- Le concubinage est simulé comme une personne seule (pas d’AVS de couple ni d’impôt commun).
- Les impôts sont estimés à partir de barèmes 2026 interpolés, et les rendements sont des hypothèses. Il s’agit d’une simulation, pas d’un conseil.
