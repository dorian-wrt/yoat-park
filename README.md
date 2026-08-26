# Yoat Park — Réservation d'amarrages de yachts

Site immersif permettant aux propriétaires de yachts de trouver et réserver une
place dans les marinas, à commencer par **Port Hercule (Monaco)**. Construit sur
**Webflow** (piloté via le MCP Webflow).

## 🌐 En ligne

**https://yoat-parks.webflow.io** — page d'accueil du projet Webflow « Yoat Parks »
(site `6a8f28f6be330c0ca07aef3d`, page Home `6a8f28fcbe330c0ca07aef76`).

### V3 — Héros cinématique (actuelle)

Nouvelle direction artistique en tête de page : **dark theme bleu élégant + doré + blanc net**.
- **Vidéo du port en fond** (asset `port-hercule-bg.mp4`, plein cadre via `yp-vhero-video`).
- **Titre sérif** (Instrument Serif) centré qui **s'écrit tout seul** (effet machine à écrire, curseur doré clignotant), puis révélation en fondu de l'accroche et du repère de scroll.
- **Body en Inter** (sans-serif « suisse »). Titres sérif / corps sans-serif.
- Script d'animation + réservation regroupé dans [`webflow/hero-and-reservation.js`](webflow/hero-and-reservation.js) (bloc Footer), fonts + keyframes dans le `<head>`.

### V2 — Sélection de place native dans Webflow

Vrais éléments Webflow (sections, div, image, boutons, champs, classes `yp-*`), éditables
dans le Designer. Seul code = un petit script de liaison dans le bloc Footer.

- **Héro** : image de marina (asset `hero-marina`) en fond + titre + **7 boutons-places**
  (`yp-pin-1`…`yp-pin-7`) positionnés en absolu ; dorés = disponibles, gris = réservées (03, 06).
  Chaque bouton porte les données de la place en attributs `data-berth / data-pont / data-len /
  data-beam / data-draft / data-price / data-status`.
- **Clic sur une place** → scroll fluide vers la section réservation + remplissage du récap.
- **Section réservation** (`yp-resv`) : récap (place, ponton, dimensions, prix/nuit) +
  champ **nombre de nuits** + **total en direct** (prix × nuits) + bouton « Demander cette place ».

**Réglages faciles dans le Designer :** déplacer un pin = changer `left`/`top` de sa classe
`yp-pin-N` ; changer un prix = attribut `data-price` du bouton ; changer l'image = remplacer
l'asset du héros. Le script de calcul lit ces attributs automatiquement.

Le script de liaison est sauvegardé dans [`webflow/reservation-glue.js`](webflow/reservation-glue.js).

### V1 — Prototype overlay (référence, `webflow/embed-port-hercule.html`)

Première version : plan interactif complet du port en un bloc de code injecté. Conservée
comme référence ; remplacée par la V2 native ci-dessus.

## Prototype V1 — détails « Vitrine immersive »

- ✅ **Intro cinématique** (mer animée, identité Yoat Park, CTA « Choisir ma place »)
- ✅ **Plan interactif de Port Hercule** : pontons A–D, Quai Antoine 1ᵉʳ, Quai Albert 1ᵉʳ,
  Digue du Large. Chaque place est cliquable → panneau latéral avec longueur/largeur max,
  tirant d'eau, tarif/nuit et statut (disponible / premium / réservée).
- ✅ **Filtres** (toutes / disponibles / premium) et compteur de disponibilités.
- ✅ **Demande de pré-réservation** (V1 sans paiement en ligne — cf. road map).

Le tout tient dans un seul bloc auto-suffisant : [`webflow/embed-port-hercule.html`](webflow/embed-port-hercule.html).

## Intégration dans Webflow

Aucune session Designer requise — tout passe par l'API Data du MCP.

1. Créer un projet Webflow « Yoat Park ».
2. Créer une page (ex. `accueil` ou `port-hercule`).
3. Coller le contenu de `webflow/embed-port-hercule.html` dans le
   **code personnalisé « Footer »** de la page (Page settings → Custom code),
   ou via l'API : `data_scripts_tool → set_page_freeform_code` (location `footer`).
4. (Optionnel) Charger la police **Poppins** dans le `<head>` du site pour la typo exacte.
5. Publier.

Le bloc se positionne en `position:fixed; inset:0` : il prend tout l'écran et fonctionne
sur une page vierge comme par-dessus une page existante.

## Modèle de données (pour la suite CMS)

Chaque place = un item CMS : `id`, `ponton/quai`, `longueur_max`, `largeur_max`,
`tirant_eau`, `tarif_nuit`, `statut`, `premium`. Actuellement généré côté client de façon
déterministe ; l'étape suivante branche ces valeurs sur une **Collection CMS Webflow**.

## Road map

| Phase | Contenu | Statut |
|-------|---------|--------|
| **1 — Vitrine immersive** | Intro + carte interactive Port Hercule | ✅ Fait |
| **2 — CMS** | Collections Marinas / Places, carte alimentée par le CMS | À faire |
| **3 — Disponibilité** | Calendrier + logique de blocage (backend : Supabase/Airtable) | À faire |
| **4 — Paiement** | Stripe Checkout + confirmation + email | À faire |
| **5 — Multi-marinas & i18n** | Autres ports, espace propriétaire (Memberstack), FR/EN/IT | À faire |
| **6 — Go-live** | Domaine, SEO, RGPD, analytics | À faire |

## Structure

```
webflow/embed-port-hercule.html   Expérience complète (intro + carte) — prête à coller dans Webflow
README.md                         Ce document
```
