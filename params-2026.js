/* MyPension — paramètres légaux / legal parameters
   UN SEUL fichier, daté, avec les sources officielles. Vérifié le 18.10.2026.
   ONE dated file with official sources. Verified 18 Oct 2026.
   Pour mettre à jour (nouvelle année) : ajouter l'année dans pillar3a.byYear / ahv / bvg et changer "year". */
window.MP_PARAMS = {
  verifiedOn: "2026-10-18",
  year: 2026,

  /* ---------- Pilier 3a / Pillar 3a ---------- */
  pillar3a: {
    // small = salarié affilié LPP ; large = sans LPP : 20 % du revenu de l'activité lucrative, plafonné
    byYear: {
      2025: { small: 7258, large: 36288 },
      2026: { small: 7258, large: 36288 },
      2027: { small: 7373, large: 36864 }   // annoncé le 02.10.2026
    },
    largePct: 0.20,
    retroFirstYear: 2026,       // premier rachat possible : année fiscale 2026
    retroGapFromYear: 2025,     // seules les lacunes à partir de 2025 peuvent être rachetées
    retroMaxYearsBack: 10,
    // par année de rachat : max = « petit » montant de l'année du rachat, en plus de la cotisation ordinaire
    withdrawYearsBeforeRef: 5,  // retrait au plus tôt 5 ans avant l'âge de référence
    withdrawYearsAfterRef: 5,   // au plus tard 5 ans après (si activité lucrative poursuivie)
    sources: [
      "https://www.bsv.admin.ch/de/die-dritte-saeule",
      "https://faq.bsv.admin.ch/de/berufliche-vorsorge-und-3-saeule/einkaeufe-saeule-3a/ab-wann-ist-ein-einkauf-die-saeule-3a-moeglich",
      "https://faq.bsv.admin.ch/de/berufliche-vorsorge-und-3-saeule/einkaeufe-saeule-3a/wie-hoch-ist-der-maximale-einkaufsbetrag-die",
      "https://www.bsv.admin.ch/de/newnsb/BqB41FVYi5FB"
    ]
  },

  /* ---------- AVS / AHV (1er pilier) ---------- */
  ahv: {
    byYear: {
      2026: { minMonthly: 1260, maxMonthly: 2520 },
      2027: { minMonthly: 1280, maxMonthly: 2560 }   // annoncé le 02.10.2026
    },
    // Art. 34 LAVS/AHVG : rente complète selon le revenu annuel moyen déterminant (RAM)
    formula: { lowFactor: 0.74, lowSlope: 13/600, highFactor: 1.04, highSlope: 8/600, kneeMultiple: 36, minMultiple: 12, maxMultiple: 72 },
    coupleCapPct: 1.50,          // Art. 35 : somme des deux rentes ≤ 150 % de la rente maximale
    thirteenthFrom: 2026,        // Art. 34ter : 13e rente = 1/12 de la rente annuelle, versée en décembre dès 2026
    fullYears: 44,               // durée complète de cotisation (hommes ; simplification)
    referenceAge: { men: 65, women: { 1960: 64, 1961: 64.25, 1962: 64.5, 1963: 64.75, 1964: 65 } }, // AVS 21
    earliestDrawAge: 63,         // anticipation dès 63 ans (Art. 40), ajournement jusqu'à 5 ans (Art. 39)
    sources: [
      "https://www.bsv.admin.ch/dam/de/sd-web/sAgdISSXenMT/d_Betr%C3%A4ge%202026.pdf",
      "https://www.bsv.admin.ch/dam/de/sd-web/GZplHByBJoFc/Internet_Masszahlenarticles_25_26_d.pdf",
      "https://www.fedlex.admin.ch/eli/cc/63/837_843_843/de",
      "https://www.bsv.admin.ch/de/newnsb/GfSUvYXM1WibRS3P9FOJr",
      "https://www.bsv.admin.ch/de/ahv-21"
    ]
  },

  /* ---------- LPP / BVG (2e pilier) ---------- */
  bvg: {
    byYear: {
      2026: { entryThreshold: 22680, coordination: 26460, upperLimit: 90720, minCoordinated: 3780, maxCoordinated: 64260, maxInsurable: 907200, minInterest: 0.0125 },
      2027: { entryThreshold: 23040, coordination: 26880 }   // annoncé le 02.10.2026 (autres valeurs : non reprises ici)
    },
    minConversionRate: 0.068,    // sur la part obligatoire, à l'âge de référence LPP
    ageCredits: [ [25,34,0.07], [35,44,0.10], [45,54,0.15], [55,65,0.18] ], // Art. 16 LPP/BVG (bonifications de vieillesse)
    buybackLockYears: 3,         // Art. 79b al. 3 LPP : pas de retrait en capital des prestations rachetées pendant 3 ans
    earliestEarlyRetirement: 58, // âge minimal de retraite anticipée réglementaire (art. 1i OPP 2)
    sources: [
      "https://www.bsv.admin.ch/de/newnsb/8QdyDi9kz0trzgbwDud08",
      "https://www.bsv.admin.ch/dam/de/sd-web/GZplHByBJoFc/Internet_Masszahlenarticles_25_26_d.pdf",
      "https://sozialversicherungen.admin.ch/de/d/21427/download",
      "https://bger.li/BVG_79b",
      "https://sozialversicherungen.admin.ch/de/d/6553/download",
      "https://www.fedlex.admin.ch/eli/cc/1983/797_797_797/de"
    ]
  },

  /* ---------- Impôts / Taxes ---------- */
  tax: {
    // Art. 38 LIFD/DBG : impôt fédéral sur les prestations en capital = 1/5 du barème ordinaire, imposé séparément
    federalCapitalFraction: 0.2,
    estvCalculator: "https://swisstaxcalculator.estv.admin.ch/",
    sources: [
      "https://lawbrary.ch/law/art/DBG-v2026.09-de-art-38/",
      "https://swisstaxcalculator.estv.admin.ch/"
    ]
  },

  legal: {
    // LSFin/FIDLEG art. 3 let. c ch. 4 : un simple outil de calcul n'est pas un conseil en placement
    sources: ["https://www.fedlex.admin.ch/eli/cc/2019/758/de"]
  }
};
